import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { ENCODING_PRESETS, type QualityPreset, type VeoAudioMode } from '@/lib/tiktok-config';

const execAsync = promisify(exec);

async function getDuration(filePath: string): Promise<number> {
  const { stdout } = await execAsync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`
  );
  return parseFloat(stdout.trim()) || 4;
}

export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      clipCount,
      quality: qualityKey,
      audioMode,
      transition,
    } = await request.json();

    if (!sessionId || !clipCount) {
      return NextResponse.json({ error: 'sessionId and clipCount required' }, { status: 400 });
    }

    const enc = ENCODING_PRESETS[(qualityKey as QualityPreset) || 'high'];
    const mode: VeoAudioMode = audioMode || 'veo-native';
    const transitionType = transition?.type || 'fade';
    const transitionDuration = transition?.duration ?? 0.5;

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'veo', `session_${sessionId}`);
    const outputDir = path.join(process.cwd(), 'public', 'videos', 'veo');
    fs.mkdirSync(outputDir, { recursive: true });

    // Gather clip files
    const clipPaths: string[] = [];
    for (let i = 0; i < clipCount; i++) {
      const clipPath = path.join(sessionDir, `seg_${i}_clip.mp4`);
      if (fs.existsSync(clipPath)) {
        clipPaths.push(clipPath);
      }
    }

    if (clipPaths.length === 0) {
      return NextResponse.json({ error: 'No clips found' }, { status: 400 });
    }

    let finalOutput = path.join(outputDir, `veo_${sessionId}.mp4`);

    // Step 1: Concatenate video clips (with or without transitions)
    let concatVideoPath: string;

    if (transitionType === 'none' || clipPaths.length < 2) {
      // Simple concat
      const listPath = path.join(sessionDir, 'list.txt');
      fs.writeFileSync(listPath, clipPaths.map((p) => `file '${p}'`).join('\n'));
      concatVideoPath = path.join(sessionDir, 'concat_video.mp4');
      await execAsync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${concatVideoPath}"`);
    } else {
      // xfade transitions
      const durations: number[] = [];
      for (const clip of clipPaths) {
        durations.push(await getDuration(clip));
      }

      const inputs = clipPaths.map((v) => `-i "${v}"`).join(' ');
      const filterParts: string[] = [];
      const audioFilterParts: string[] = [];
      let lastVideoLabel = '[0:v]';
      let lastAudioLabel = '[0:a]';
      let offset = durations[0] - transitionDuration;

      for (let i = 1; i < clipPaths.length; i++) {
        const outLabel = i < clipPaths.length - 1 ? `[v${i}]` : '[outv]';
        const aOutLabel = i < clipPaths.length - 1 ? `[a${i}]` : '[outa]';

        filterParts.push(
          `${lastVideoLabel}[${i}:v]xfade=transition=fade:duration=${transitionDuration}:offset=${Math.max(0, offset)}${outLabel}`
        );
        audioFilterParts.push(
          `${lastAudioLabel}[${i}:a]acrossfade=d=${transitionDuration}${aOutLabel}`
        );

        lastVideoLabel = outLabel;
        lastAudioLabel = aOutLabel;
        if (i < clipPaths.length - 1) {
          offset += durations[i] - transitionDuration;
        }
      }

      concatVideoPath = path.join(sessionDir, 'concat_video.mp4');
      const filterComplex = [...filterParts, ...audioFilterParts].join(';');

      try {
        await execAsync(
          `ffmpeg -y ${inputs} -filter_complex "${filterComplex}" -map "[outv]" -map "[outa]" -c:v libx264 -preset ${enc.preset} -crf ${enc.crf} -c:a aac "${concatVideoPath}"`
        );
      } catch {
        // Fallback to simple concat
        const listPath = path.join(sessionDir, 'list.txt');
        fs.writeFileSync(listPath, clipPaths.map((p) => `file '${p}'`).join('\n'));
        await execAsync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${concatVideoPath}"`);
      }
    }

    // Step 2: Handle audio mode
    if (mode === 'veo-native') {
      // Just use the concatenated video as-is (Veo clips already have audio)
      fs.copyFileSync(concatVideoPath, finalOutput);
    } else if (mode === 'elevenlabs') {
      // Replace Veo audio entirely with ElevenLabs TTS
      const ttsAudioPaths: string[] = [];
      for (let i = 0; i < clipCount; i++) {
        const audioPath = path.join(sessionDir, `seg_${i}_audio.mp3`);
        if (fs.existsSync(audioPath)) {
          ttsAudioPaths.push(audioPath);
        }
      }

      if (ttsAudioPaths.length === 0) {
        // No TTS audio, just use video as-is
        fs.copyFileSync(concatVideoPath, finalOutput);
      } else {
        // Concat TTS audio
        const audioListPath = path.join(sessionDir, 'audio_list.txt');
        fs.writeFileSync(audioListPath, ttsAudioPaths.map((p) => `file '${p}'`).join('\n'));
        const concatAudioPath = path.join(sessionDir, 'concat_tts.mp3');
        await execAsync(`ffmpeg -y -f concat -safe 0 -i "${audioListPath}" -c copy "${concatAudioPath}"`);

        // Replace audio track
        await execAsync(
          `ffmpeg -y -i "${concatVideoPath}" -i "${concatAudioPath}" -map 0:v -map 1:a -c:v copy -c:a aac -shortest "${finalOutput}"`
        );
      }
    } else if (mode === 'both') {
      // Mix Veo native audio (low volume) with ElevenLabs TTS (full volume)
      const ttsAudioPaths: string[] = [];
      for (let i = 0; i < clipCount; i++) {
        const audioPath = path.join(sessionDir, `seg_${i}_audio.mp3`);
        if (fs.existsSync(audioPath)) {
          ttsAudioPaths.push(audioPath);
        }
      }

      if (ttsAudioPaths.length === 0) {
        fs.copyFileSync(concatVideoPath, finalOutput);
      } else {
        const audioListPath = path.join(sessionDir, 'audio_list.txt');
        fs.writeFileSync(audioListPath, ttsAudioPaths.map((p) => `file '${p}'`).join('\n'));
        const concatAudioPath = path.join(sessionDir, 'concat_tts.mp3');
        await execAsync(`ffmpeg -y -f concat -safe 0 -i "${audioListPath}" -c copy "${concatAudioPath}"`);

        // Mix: Veo audio at 30%, TTS at 100%
        await execAsync(
          `ffmpeg -y -i "${concatVideoPath}" -i "${concatAudioPath}" -filter_complex "[0:a]volume=0.3[bg];[1:a]volume=1.0[fg];[bg][fg]amix=inputs=2:duration=shortest[outa]" -map 0:v -map "[outa]" -c:v copy -c:a aac "${finalOutput}"`
        );
      }
    }

    // Clean up temp files
    const concatPath = path.join(sessionDir, 'concat_video.mp4');
    if (fs.existsSync(concatPath) && concatPath !== finalOutput) {
      fs.unlinkSync(concatPath);
    }

    const videoUrl = `/api/tiktok/files?path=videos/veo/veo_${sessionId}.mp4`;
    const stats = fs.statSync(finalOutput);

    return NextResponse.json({
      videoUrl,
      size: stats.size,
      clipCount: clipPaths.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Veo assembly failed', details: String(error) },
      { status: 500 }
    );
  }
}
