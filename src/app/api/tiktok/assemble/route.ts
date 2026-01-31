import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { sessionId, segmentCount } = await request.json();

    if (!sessionId || !segmentCount) {
      return NextResponse.json({ error: 'sessionId and segmentCount required' }, { status: 400 });
    }

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'asmr', `session_${sessionId}`);
    const outputDir = path.join(process.cwd(), 'public', 'videos', 'asmr');

    if (!fs.existsSync(sessionDir)) {
      return NextResponse.json({ error: 'Session directory not found' }, { status: 404 });
    }

    const segmentVideos: string[] = [];

    // Create video segments from image + audio pairs
    for (let i = 0; i < segmentCount; i++) {
      const imagePath = path.join(sessionDir, `seg_${i}_image.png`);
      const audioPath = path.join(sessionDir, `seg_${i}_audio.mp3`);
      const videoPath = path.join(sessionDir, `seg_${i}.mp4`);

      if (!fs.existsSync(imagePath) || !fs.existsSync(audioPath)) {
        continue; // Skip segments missing assets
      }

      const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -t 30 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -shortest "${videoPath}"`;
      await execAsync(cmd);
      segmentVideos.push(videoPath);
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
