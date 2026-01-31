import { NextRequest, NextResponse } from 'next/server';
import { IMAGE_MODEL } from '@/lib/tiktok-config';
import fs from 'fs';
import path from 'path';

const REF_IMAGE_PATH = path.join(process.cwd(), 'public', 'images', 'monika', 'monika-master-ref.jpg');
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 5000;

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, options);
    if (response.status === 429 && attempt < retries) {
      const retryAfter = response.headers.get('retry-after');
      const waitMs = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : INITIAL_BACKOFF_MS * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }
    return response;
  }
  throw new Error('Max retries exceeded');
}

export async function POST(request: NextRequest) {
  try {
    const { visualPrompt, sessionId, segmentIndex } = await request.json();

    if (!visualPrompt || sessionId === undefined || segmentIndex === undefined) {
      return NextResponse.json({ error: 'visualPrompt, sessionId, segmentIndex required' }, { status: 400 });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
    }

    if (!fs.existsSync(REF_IMAGE_PATH)) {
      return NextResponse.json({ error: 'Reference image not found' }, { status: 500 });
    }

    const sessionDir = path.join(process.cwd(), 'public', 'videos', 'asmr', `session_${sessionId}`);
    fs.mkdirSync(sessionDir, { recursive: true });

    const imagePath = path.join(sessionDir, `seg_${segmentIndex}_image.png`);

    const refImageB64 = fs.readFileSync(REF_IMAGE_PATH).toString('base64');
    const fullPrompt = `${visualPrompt}.
        KEEP IDENTICAL: The woman from reference image (Monika).
        STYLE: Photorealistic 8K, cinematic lighting, shallow depth of field.`;

    const response = await fetchWithRetry('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://malta-portal-production.up.railway.app',
        'X-Title': 'Malta Portal TikTok Creator',
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        modalities: ['text', 'image'],
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${refImageB64}`,
                },
              },
              {
                type: 'text',
                text: fullPrompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `OpenRouter error: ${response.status}`, details: err.substring(0, 500) },
        { status: 502 }
      );
    }

    const result = await response.json();

    // Extract image from OpenRouter response (OpenAI-compatible format)
    let imageBuffer: Buffer | null = null;
    const message = result.choices?.[0]?.message;

    if (message?.content) {
      // Content can be string or array of parts
      const parts = Array.isArray(message.content) ? message.content : [];

      for (const part of parts) {
        // Check for inline_data format (Gemini-style through OpenRouter)
        if (part.type === 'image_url' && part.image_url?.url) {
          const dataUrl = part.image_url.url;
          if (dataUrl.startsWith('data:')) {
            const b64 = dataUrl.split(',')[1];
            if (b64) {
              imageBuffer = Buffer.from(b64, 'base64');
              break;
            }
          }
        }
        // Check for inline_data directly
        if (part.inline_data?.data) {
          imageBuffer = Buffer.from(part.inline_data.data, 'base64');
          break;
        }
      }
    }

    if (!imageBuffer) {
      return NextResponse.json(
        { error: 'No image returned from Nanobana Pro', raw: JSON.stringify(result).substring(0, 500) },
        { status: 502 }
      );
    }

    fs.writeFileSync(imagePath, imageBuffer);
    const imageUrl = `/api/tiktok/files?path=videos/asmr/session_${sessionId}/seg_${segmentIndex}_image.png`;

    return NextResponse.json({ imageUrl, size: imageBuffer.byteLength });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
