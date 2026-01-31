import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { ASPECT_RATIOS, type AspectRatioKey } from '@/lib/tiktok-config';
import { TOPN_TEMPLATES, type TopNTemplate, type TopNItem } from '@/lib/topn-templates';
import { buildNumberOverlayFilter, buildTitleOverlayFilter } from '@/lib/ffmpeg-utils';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { sessionId, items, intro, template: templateKey, aspectRatio: ratioKey } = await request.json();

    if (!sessionId || !items || !items.length) {
      return NextResponse.json({ error: 'sessionId and items required' }, { status: 400 });
    }

    const ar = (ratioKey && ASPECT_RATIOS[ratioKey as AspectRatioKey]) || ASPECT_RATIOS['9:16'];
    const { width, height } = ar;
    const tmpl = TOPN_TEMPLATES[(templateKey as TopNTemplate) || 'countdown'];

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'topn', `session_${sessionId}`);
    const outputDir = path.join(process.cwd(), 'public', 'videos', 'topn');
    fs.mkdirSync(sessionDir, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });

    const segmentVideos: string[] = [];

    // === INTRO SCENE ===
    if (intro) {
      const introImagePath = path.join(sessionDir, 'intro_0_image.png');
      const introAudioPath = path.join(sessionDir, 'intro_0_audio.mp3');
      const introVideoPath = path.join(sessionDir, 'intro.mp4');

      if (fs.existsSync(introImagePath) && fs.existsSync(introAudioPath)) {
        const introFilters: string[] = [];
        introFilters.push(`scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`);

        // Darken slightly for text readability
        introFilters.push('colorchannelmixer=aa=0.7');

        // Topic title (big, center-top)
        if (intro.topic) {
          introFilters.push(buildTitleOverlayFilter({
            title: intro.topic,
            position: 'top',
            fontSize: tmpl.introTitleFontSize || 72,
            color: 'white',
            width,
            height,
          }));
        }

        // Hook text (below title, center)
        if (intro.hook) {
          introFilters.push(buildTitleOverlayFilter({
            title: intro.hook,
            position: 'center',
            fontSize: tmpl.introHookFontSize || 48,
            color: '#FFD700',
            width,
            height,
          }));
        }

        const introFilterChain = introFilters.join(',');
        const introCmd = `ffmpeg -y -loop 1 -i "${introImagePath}" -i "${introAudioPath}" -c:v libx264 -t 5 -pix_fmt yuv420p -vf "${introFilterChain}" -shortest "${introVideoPath}"`;

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

      // Build filter chain
      const filters: string[] = [];

      // Base scale
      filters.push(`scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`);

      // Optional background blur for countdown template
      if (tmpl.backgroundFilter && tmpl.numberPosition === 'center') {
        // Apply a subtle darkening to make the number readable
        filters.push('colorchannelmixer=aa=0.7');
      }

      // Number overlay
      filters.push(buildNumberOverlayFilter({
        rank: item.rank,
        position: tmpl.numberPosition,
        fontSize: tmpl.numberFontSize,
        color: tmpl.numberColor,
        borderWidth: tmpl.numberBorderWidth,
        borderColor: tmpl.numberBorderColor,
        width,
        height,
      }));

      // Title overlay
      if (tmpl.showTitle && item.title) {
        filters.push(buildTitleOverlayFilter({
          title: item.title,
          position: tmpl.titlePosition,
          fontSize: tmpl.titleFontSize,
          color: 'white',
          width,
          height,
        }));
      }

      const filterChain = filters.join(',');
      const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -t 8 -pix_fmt yuv420p -vf "${filterChain}" -shortest "${videoPath}"`;

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
      const cmd = `ffmpeg -y ${inputs} -filter_complex "${filterComplex}" -map "[outv]" -map "[outa]" -c:v libx264 -preset fast -crf 23 -c:a aac "${finalOutput}"`;

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
