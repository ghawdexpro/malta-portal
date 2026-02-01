import { NextRequest, NextResponse } from 'next/server';
import { ASPECT_RATIOS, type AspectRatioKey, VEO_ANIMATION_PRESETS, type VeoAnimationPreset } from '@/lib/tiktok-config';
import { submitVeoJob, pollVeoJob } from '@/lib/veo-client';
import fs from 'fs';
import path from 'path';

/**
 * POST — Submit a Veo image-to-video job
 * Body: { sessionId, segmentIndex, animationPrompt, preset, duration, aspectRatio, generateAudio }
 * Returns: { operationName }
 */
export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      segmentIndex,
      animationPrompt,
      preset,
      duration,
      aspectRatio: ratioKey,
      generateAudio,
    } = await request.json();

    if (!sessionId || segmentIndex === undefined) {
      return NextResponse.json({ error: 'sessionId, segmentIndex required' }, { status: 400 });
    }

    // Read source image
    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'veo', `session_${sessionId}`);
    const imagePath = path.join(sessionDir, `seg_${segmentIndex}_image.png`);

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: `Image not found: seg_${segmentIndex}_image.png` }, { status: 404 });
    }

    const imageBase64 = fs.readFileSync(imagePath).toString('base64');

    // Build prompt with preset suffix
    const presetConfig = VEO_ANIMATION_PRESETS[(preset as VeoAnimationPreset) || 'cinematic'];
    const fullPrompt = [animationPrompt || '', presetConfig.promptSuffix].filter(Boolean).join(' ');

    // Map aspect ratio
    const ar = (ratioKey && ASPECT_RATIOS[ratioKey as AspectRatioKey]) || ASPECT_RATIOS['9:16'];
    const veoAspect = ar.width < ar.height ? '9:16' : ar.width === ar.height ? '1:1' : '16:9';

    const operationName = await submitVeoJob({
      imageBase64,
      prompt: fullPrompt,
      aspectRatio: veoAspect as '9:16' | '16:9' | '1:1',
      durationSeconds: duration || 4,
      generateAudio: generateAudio ?? true,
    });

    return NextResponse.json({ operationName, sessionId, segmentIndex });
  } catch (error) {
    return NextResponse.json(
      { error: 'Veo submit failed', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET — Poll a Veo job and save result when done
 * Params: ?operationName=...&sessionId=...&segmentIndex=...
 * Returns: { status: 'pending'|'done'|'error', videoUrl?, error? }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const operationName = searchParams.get('operationName');
    const sessionId = searchParams.get('sessionId');
    const segmentIndex = searchParams.get('segmentIndex');

    if (!operationName || !sessionId || segmentIndex === null) {
      return NextResponse.json({ error: 'operationName, sessionId, segmentIndex required' }, { status: 400 });
    }

    const jobStatus = await pollVeoJob(operationName);

    if (!jobStatus.done) {
      return NextResponse.json({ status: 'pending' });
    }

    if (jobStatus.error) {
      return NextResponse.json({ status: 'error', error: jobStatus.error });
    }

    if (!jobStatus.videoBase64) {
      return NextResponse.json({ status: 'error', error: 'No video data returned' });
    }

    // Save video clip to session directory
    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'veo', `session_${sessionId}`);
    fs.mkdirSync(sessionDir, { recursive: true });

    const clipPath = path.join(sessionDir, `seg_${segmentIndex}_clip.mp4`);
    const videoBuffer = Buffer.from(jobStatus.videoBase64, 'base64');
    fs.writeFileSync(clipPath, videoBuffer);

    const videoUrl = `/api/tiktok/files?path=videos/veo/session_${sessionId}/seg_${segmentIndex}_clip.mp4`;

    return NextResponse.json({
      status: 'done',
      videoUrl,
      size: videoBuffer.byteLength,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Veo poll failed', details: String(error) },
      { status: 500 }
    );
  }
}
