import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { ASPECT_RATIOS, type AspectRatioKey, AUDIO_PADDING_S, ENCODING_PRESETS, type QualityPreset } from '@/lib/tiktok-config';
import { TOPN_TEMPLATES, type TopNTemplate, type TopNItem } from '@/lib/topn-templates';
import { buildNumberOverlayFilter, buildTitleOverlayFilter, buildProgressBarFilters } from '@/lib/ffmpeg-utils';
import { compileSegmentFilters } from '@/lib/topn-ffmpeg-compiler';
import type { SegmentComposition } from '@/lib/topn-composition';
import type { ProgressBarStyle } from '@/lib/topn-templates';

const execAsync = promisify(exec);

/** Get audio duration in seconds using ffprobe */
async function getAudioDuration(audioPath: string): Promise<number> {
  const { stdout } = await execAsync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${audioPath}"`
  );
  return parseFloat(stdout.trim()) || 3;
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, items, intro, template: templateKey, aspectRatio: ratioKey, quality: qualityKey, fontId: fontIdOverride, progressBar: progressBarConfig, composition } = await request.json();

    if (!sessionId || !items || !items.length) {
      return NextResponse.json({ error: 'sessionId and items required' }, { status: 400 });
    }

    const ar = (ratioKey && ASPECT_RATIOS[ratioKey as AspectRatioKey]) || ASPECT_RATIOS['9:16'];
    const { width, height } = ar;
    const tmpl = TOPN_TEMPLATES[(templateKey as TopNTemplate) || 'countdown'];
    const enc = ENCODING_PRESETS[(qualityKey as QualityPreset) || 'high'];
    const fontId = fontIdOverride || tmpl.fontId;
    const pbStyle: ProgressBarStyle = progressBarConfig?.style || tmpl.progressBar?.style || 'none';
    const pbEnabled = pbStyle !== 'none' && (progressBarConfig?.enabled ?? tmpl.progressBar?.enabled ?? false);
    const pbColor = progressBarConfig?.color || tmpl.progressBar?.color || 'white';
    const pbHeight = progressBarConfig?.height || tmpl.progressBar?.height || 8;
    const pbPosition = progressBarConfig?.position || tmpl.progressBar?.position || 'bottom';

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'topn', `session_${sessionId}`);
    const outputDir = path.join(process.cwd(), 'public', 'videos', 'topn');
    fs.mkdirSync(sessionDir, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });

    const segmentVideos: string[] = [];

    // Parse composition segments if provided
    const compSegs: SegmentComposition[] | null = composition && Array.isArray(composition) ? composition : null;

    // Helper: build filter chain for a segment, using composition compiler or legacy template
    function buildLegacyIntroFilters(introData: { topic?: string; hook?: string }, dur: number): string {
      const f: string[] = [];
      f.push(`scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`);
      f.push('colorchannelmixer=aa=0.7');
      if (introData.topic) {
        f.push(buildTitleOverlayFilter({ title: introData.topic, position: 'top', fontSize: tmpl.introTitleFontSize || 72, color: 'white', width, height, fontId }));
      }
      if (introData.hook) {
        f.push(buildTitleOverlayFilter({ title: introData.hook, position: 'center', fontSize: tmpl.introHookFontSize || 48, color: '#FFD700', width, height, fontId }));
      }
      if (pbEnabled) {
        f.push(...buildProgressBarFilters({ style: pbStyle as 'bar' | 'countdown' | 'both', duration: dur, color: pbColor, height: pbHeight, position: pbPosition, fontId }));
      }
      return f.join(',');
    }

    function buildLegacyRankFilters(item: TopNItem, dur: number): string {
      const f: string[] = [];
      f.push(`scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`);
      if (tmpl.backgroundFilter && tmpl.numberPosition === 'center') {
        f.push('colorchannelmixer=aa=0.7');
      }
      f.push(buildNumberOverlayFilter({ rank: item.rank, position: tmpl.numberPosition, fontSize: tmpl.numberFontSize, color: tmpl.numberColor, borderWidth: tmpl.numberBorderWidth, borderColor: tmpl.numberBorderColor, width, height, fontId }));
      if (tmpl.showTitle && item.title) {
        f.push(buildTitleOverlayFilter({ title: item.title, position: tmpl.titlePosition, fontSize: tmpl.titleFontSize, color: 'white', width, height, fontId }));
      }
      if (pbEnabled) {
        f.push(...buildProgressBarFilters({ style: pbStyle as 'bar' | 'countdown' | 'both', duration: dur, color: pbColor, height: pbHeight, position: pbPosition, fontId }));
      }
      return f.join(',');
    }

    // === INTRO SCENE ===
    if (intro) {
      const introImagePath = path.join(sessionDir, 'intro_0_image.png');
      const introAudioPath = path.join(sessionDir, 'intro_0_audio.mp3');
      const introVideoPath = path.join(sessionDir, 'intro.mp4');

      if (fs.existsSync(introImagePath) && fs.existsSync(introAudioPath)) {
        const introDuration = await getAudioDuration(introAudioPath) + AUDIO_PADDING_S;
        const introCompSeg = compSegs?.find((s) => s.isIntro || s.segmentId === 'intro_0');
        const filterChain = introCompSeg
          ? compileSegmentFilters(introCompSeg, introDuration, width, height)
          : buildLegacyIntroFilters(intro, introDuration);

        const introCmd = `ffmpeg -y -loop 1 -i "${introImagePath}" -i "${introAudioPath}" -c:v libx264 -preset ${enc.preset} -crf ${enc.crf} -t ${introDuration.toFixed(2)} -pix_fmt yuv420p -vf "${filterChain}" "${introVideoPath}"`;
        await execAsync(introCmd);
        segmentVideos.push(introVideoPath);
      }
    }

    // === RANK ITEMS ===
    for (const item of items as TopNItem[]) {
      const imagePath = path.join(sessionDir, `rank_${item.rank}_image.png`);
      const audioPath = path.join(sessionDir, `rank_${item.rank}_audio.mp3`);
      const videoPath = path.join(sessionDir, `rank_${item.rank}.mp4`);

      if (!fs.existsSync(imagePath) || !fs.existsSync(audioPath)) {
        continue;
      }

      const segDuration = await getAudioDuration(audioPath) + AUDIO_PADDING_S;
      const compSeg = compSegs?.find((s) => s.rank === item.rank || s.segmentId === `rank_${item.rank}`);
      const filterChain = compSeg
        ? compileSegmentFilters(compSeg, segDuration, width, height)
        : buildLegacyRankFilters(item, segDuration);

      const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -preset ${enc.preset} -crf ${enc.crf} -t ${segDuration.toFixed(2)} -pix_fmt yuv420p -vf "${filterChain}" "${videoPath}"`;
      await execAsync(cmd);
      segmentVideos.push(videoPath);
    }

    if (segmentVideos.length === 0) {
      return NextResponse.json({ error: 'No complete items to assemble' }, { status: 400 });
    }

    // If template uses transitions, apply xfade; otherwise simple concat
    let finalOutput: string;

    if (tmpl.transitionType !== 'fade' && tmpl.transitionType !== 'slideleft' || segmentVideos.length < 2) {
      // Simple concatenation
      const listPath = path.join(sessionDir, 'list.txt');
      fs.writeFileSync(listPath, segmentVideos.map((p) => `file '${p}'`).join('\n'));
      finalOutput = path.join(outputDir, `topn_${sessionId}.mp4`);
      await execAsync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${finalOutput}"`);
    } else {
      // Use xfade transitions between segments
      // For xfade, we need to know durations. Get them with ffprobe.
      const durations: number[] = [];
      for (const vid of segmentVideos) {
        const { stdout } = await execAsync(
          `ffprobe -v error -show_entries format=duration -of csv=p=0 "${vid}"`
        );
        durations.push(parseFloat(stdout.trim()) || 5);
      }

      // Build xfade filter_complex
      const inputs = segmentVideos.map((v, i) => `-i "${v}"`).join(' ');
      let filterParts: string[] = [];
      let audioFilterParts: string[] = [];
      let lastVideoLabel = '[0:v]';
      let lastAudioLabel = '[0:a]';
      let offset = durations[0] - tmpl.transitionDuration;

      for (let i = 1; i < segmentVideos.length; i++) {
        const outLabel = i < segmentVideos.length - 1 ? `[v${i}]` : '[outv]';
        const aOutLabel = i < segmentVideos.length - 1 ? `[a${i}]` : '[outa]';

        filterParts.push(
          `${lastVideoLabel}[${i}:v]xfade=transition=${tmpl.transitionType}:duration=${tmpl.transitionDuration}:offset=${Math.max(0, offset)}${outLabel}`
        );
        audioFilterParts.push(
          `${lastAudioLabel}[${i}:a]acrossfade=d=${tmpl.transitionDuration}${aOutLabel}`
        );

        lastVideoLabel = outLabel;
        lastAudioLabel = aOutLabel;

        if (i < segmentVideos.length - 1) {
          offset += durations[i] - tmpl.transitionDuration;
        }
      }

      finalOutput = path.join(outputDir, `topn_${sessionId}.mp4`);
      const filterComplex = [...filterParts, ...audioFilterParts].join(';');
      const cmd = `ffmpeg -y ${inputs} -filter_complex "${filterComplex}" -map "[outv]" -map "[outa]" -c:v libx264 -preset ${enc.preset} -crf ${enc.crf} -c:a aac "${finalOutput}"`;

      try {
        await execAsync(cmd);
      } catch {
        // Fallback to simple concat if xfade fails
        const listPath = path.join(sessionDir, 'list.txt');
        fs.writeFileSync(listPath, segmentVideos.map((p) => `file '${p}'`).join('\n'));
        finalOutput = path.join(outputDir, `topn_${sessionId}.mp4`);
        await execAsync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${finalOutput}"`);
      }
    }

    const videoUrl = `/api/tiktok/files?path=videos/topn/topn_${sessionId}.mp4`;
    const stats = fs.statSync(finalOutput);

    return NextResponse.json({
      videoUrl,
      size: stats.size,
      itemCount: segmentVideos.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Assembly failed', details: String(error) },
      { status: 500 }
    );
  }
}
