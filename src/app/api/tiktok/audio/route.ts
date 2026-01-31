import { NextRequest, NextResponse } from 'next/server';
import { MONIKA_VOICE_ID, VOICE_SETTINGS } from '@/lib/tiktok-config';
import fs from 'fs';
import path from 'path';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

export async function POST(request: NextRequest) {
  try {
    const { text, sessionId, segmentIndex } = await request.json();

    if (!text || sessionId === undefined || segmentIndex === undefined) {
      return NextResponse.json({ error: 'text, sessionId, segmentIndex required' }, { status: 400 });
    }

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: 'ELEVENLABS_API_KEY not configured' }, { status: 500 });
    }

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'asmr', `session_${sessionId}`);
    fs.mkdirSync(sessionDir, { recursive: true });

    const audioPath = path.join(sessionDir, `seg_${segmentIndex}_audio.mp3`);

    const response = await fetch(`${BASE_URL}/text-to-speech/${MONIKA_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        ...VOICE_SETTINGS,
      }),
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
    fs.writeFileSync(audioPath, Buffer.from(audioBuffer));

    const audioUrl = `/videos/asmr/session_${sessionId}/seg_${segmentIndex}_audio.mp3`;

    return NextResponse.json({ audioUrl, size: audioBuffer.byteLength });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
