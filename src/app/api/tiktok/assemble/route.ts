import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { ASPECT_RATIOS, type AspectRatioKey } from '@/lib/tiktok-config';
import { buildSegmentFilter, type EditorSegment } from '@/lib/ffmpeg-builder';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { sessionId, segmentCount, aspectRatio: ratioKey, editorState } = await request.json();

    if (!sessionId || !segmentCount) {
      return NextResponse.json({ error: 'sessionId and segmentCount required' }, { status: 400 });
    }

    const ar = (ratioKey && ASPECT_RATIOS[ratioKey as AspectRatioKey]) || ASPECT_RATIOS['9:16'];
    const { width, height } = ar;

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'asmr', `session_${sessionId}`);
    const outputDir = path.join(process.cwd(), 'public', 'videos', 'asmr');

    if (!fs.existsSync(sessionDir)) {
      return NextResponse.json({ error: 'Session directory not found' }, { status: 404 });
    }

    const segmentVideos: string[] = [];

    if (editorState && Array.isArray(editorState) && editorState.length > 0) {
      // Editor-enhanced assembly: use editor segments with effects
      const sorted = [...(editorState as EditorSegment[])].sort((a, b) => a.order - b.order);

      for (const seg of sorted) {
        const imagePath = path.join(sessionDir, `seg_${sorted.indexOf(seg)}_image.png`);
        const audioPath = path.join(sessionDir, `seg_${sorted.indexOf(seg)}_audio.mp3`);
        const videoPath = path.join(sessionDir, `seg_${seg.order}_edited.mp4`);

        if (!fs.existsSync(imagePath) || !fs.existsSync(audioPath)) {
          continue;
        }

        const filter = buildSegmentFilter(seg, width, height);
        const duration = Math.max(1, (seg.audioDuration || 30) - (seg.trimStart || 0) - (seg.trimEnd || 0));

        const trimArgs = (seg.trimStart || 0) > 0
          ? `-ss ${seg.trimStart}`
          : '';
        const trimEnd = (seg.trimEnd || 0) > 0
          ? `-to ${(seg.audioDuration || 30) - seg.trimEnd}`
          : '';

        const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" ${trimArgs} ${trimEnd} -i "${audioPath}" -c:v libx264 -t ${Math.ceil(duration)} -pix_fmt yuv420p -vf "${filter}" -shortest "${videoPath}"`;
        await execAsync(cmd);
        segmentVideos.push(videoPath);
      }
    } else {
      // Simple assembly (no editor state)
      for (let i = 0; i < segmentCount; i++) {
        const imagePath = path.join(sessionDir, `seg_${i}_image.png`);
        const audioPath = path.join(sessionDir, `seg_${i}_audio.mp3`);
        const videoPath = path.join(sessionDir, `seg_${i}.mp4`);

        if (!fs.existsSync(imagePath) || !fs.existsSync(audioPath)) {
          continue;
        }

        const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -t 30 -pix_fmt yuv420p -vf "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2" -shortest "${videoPath}"`;
        await execAsync(cmd);
        segmentVideos.push(videoPath);
      }
    }

    if (segmentVideos.length === 0) {
      return NextResponse.json({ error: 'No complete segments to assemble' }, { status: 400 });
    }

    // Concatenate segments
    const listPath = path.join(sessionDir, 'list.txt');
    fs.writeFileSync(listPath, segmentVideos.map((p) => `file '${p}'`).join('\n'));

    const finalOutput = path.join(outputDir, `monika_asmr_${sessionId}.mp4`);
    await execAsync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${finalOutput}"`);

    const videoUrl = `/api/tiktok/files?path=videos/asmr/monika_asmr_${sessionId}.mp4`;
    const stats = fs.statSync(finalOutput);

    return NextResponse.json({
      videoUrl,
      size: stats.size,
      segmentCount: segmentVideos.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Assembly failed', details: String(error) },
      { status: 500 }
    );
  }
}
