import { NextRequest, NextResponse } from 'next/server';
import { MONIKA_VOICE_ID } from '@/lib/tiktok-config';
import fs from 'fs';
import path from 'path';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

export async function POST(request: NextRequest) {
  try {
    const { text, sessionId, segmentIndex, voiceSettings, prefix } = await request.json();
    const filePrefix = prefix || 'seg';

    if (!text || sessionId === undefined || segmentIndex === undefined) {
      return NextResponse.json({ error: 'text, sessionId, segmentIndex required' }, { status: 400 });
    }

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: 'ELEVENLABS_API_KEY not configured' }, { status: 500 });
    }

    const subDir = (filePrefix === 'rank' || filePrefix === 'intro') ? 'topn' : 'asmr';
    const sessionDir = path.join(process.cwd(), 'public', 'videos', subDir, `session_${sessionId}`);
    fs.mkdirSync(sessionDir, { recursive: true });

    // Find next available take number for this segment
    const existingFiles = fs.readdirSync(sessionDir);
    const takePattern = new RegExp(`^${filePrefix}_${segmentIndex}_audio_take(\\d+)\\.mp3$`);
    let maxTake = 0;
    for (const f of existingFiles) {
      const match = f.match(takePattern);
      if (match) {
        maxTake = Math.max(maxTake, parseInt(match[1], 10));
      }
    }
    const takeNum = maxTake + 1;

    // Save as numbered take
    const audioPath = path.join(sessionDir, `${filePrefix}_${segmentIndex}_audio_take${takeNum}.mp3`);
    // Also save/overwrite as the "current" version
    const currentPath = path.join(sessionDir, `${filePrefix}_${segmentIndex}_audio.mp3`);

    // Build voice settings from request (with defaults)
    const settings = {
      stability: voiceSettings?.stability ?? 0.25,
      similarity_boost: voiceSettings?.similarity_boost ?? 0.85,
      style: voiceSettings?.style ?? 0.5,
      use_speaker_boost: voiceSettings?.use_speaker_boost ?? true,
    };

    const bodyPayload: Record<string, unknown> = {
      text,
      model_id: voiceSettings?.model_id || 'eleven_flash_v2_5',
      voice_settings: settings,
    };

    // Speed is a top-level param, not inside voice_settings
    if (voiceSettings?.speed !== undefined && voiceSettings.speed !== 1.0) {
      bodyPayload.speed = Math.max(0.7, Math.min(1.2, voiceSettings.speed));
    }

    const response = await fetch(`${BASE_URL}/text-to-speech/${MONIKA_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      let errDetails = '';
      try { errDetails = await response.text(); } catch {}
      return NextResponse.json(
        { error: `ElevenLabs error: ${response.status}`, details: errDetails },
        { status: 502 }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    const buf = Buffer.from(audioBuffer);
    fs.writeFileSync(audioPath, buf);
    fs.writeFileSync(currentPath, buf);

    // Return all takes for this segment
    const takes: { take: number; url: string }[] = [];
    const updatedFiles = fs.readdirSync(sessionDir);
    for (const f of updatedFiles) {
      const match = f.match(takePattern);
      if (match) {
        takes.push({
          take: parseInt(match[1], 10),
          url: `/api/tiktok/files?path=videos/${subDir}/session_${sessionId}/${f}`,
        });
      }
    }
    takes.sort((a, b) => a.take - b.take);

    const audioUrl = `/api/tiktok/files?path=videos/${subDir}/session_${sessionId}/${filePrefix}_${segmentIndex}_audio_take${takeNum}.mp3`;

    return NextResponse.json({
      audioUrl,
      size: audioBuffer.byteLength,
      take: takeNum,
      takes,
      settings,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
