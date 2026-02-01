import { NextRequest, NextResponse } from 'next/server';
import { IMAGE_MODEL, ASPECT_RATIOS, type AspectRatioKey } from '@/lib/tiktok-config';
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
    const { visualPrompt, sessionId, segmentIndex, aspectRatio: ratioKey, prefix, referenceImages, subDir: subDirOverride } = await request.json();
    const filePrefix = prefix || 'seg';

    if (!visualPrompt || sessionId === undefined || segmentIndex === undefined) {
      return NextResponse.json({ error: 'visualPrompt, sessionId, segmentIndex required' }, { status: 400 });
    }

    const ar = (ratioKey && ASPECT_RATIOS[ratioKey as AspectRatioKey]) || ASPECT_RATIOS['9:16'];

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
    }

    if (!fs.existsSync(REF_IMAGE_PATH)) {
      return NextResponse.json({ error: 'Reference image not found' }, { status: 500 });
    }

    const subDir = subDirOverride || ((filePrefix === 'rank' || filePrefix === 'intro') ? 'topn' : 'asmr');
    const sessionDir = path.join(process.cwd(), 'public', 'videos', subDir, `session_${sessionId}`);
    fs.mkdirSync(sessionDir, { recursive: true });

    const imagePath = path.join(sessionDir, `${filePrefix}_${segmentIndex}_image.png`);

    const refImageB64 = fs.readFileSync(REF_IMAGE_PATH).toString('base64');

    const orientationHint = ar.width < ar.height
      ? `Generate this image in VERTICAL portrait orientation (${ar.width}x${ar.height}, ${ratioKey || '9:16'} aspect ratio).`
      : ar.width === ar.height
      ? `Generate this image in SQUARE format (${ar.width}x${ar.height}, 1:1 aspect ratio).`
      : `Generate this image in HORIZONTAL landscape orientation (${ar.width}x${ar.height}, ${ratioKey || '16:9'} aspect ratio).`;

    // Build reference image labels for the prompt
    const extraRefs: Array<{ label: string; b64: string }> = [];
    if (referenceImages && Array.isArray(referenceImages)) {
      for (const ref of referenceImages.slice(0, 5)) {
        if (ref.path) {
          const refPath = path.join(process.cwd(), 'public', ref.path);
          if (fs.existsSync(refPath)) {
            const ext = refPath.endsWith('.png') ? 'png' : 'jpeg';
            extraRefs.push({ label: ref.label || 'style reference', b64: `data:image/${ext};base64,${fs.readFileSync(refPath).toString('base64')}` });
          }
        }
      }
    }

    const refLabels = extraRefs.length > 0
      ? `\nAdditional reference images provided: ${extraRefs.map((r, i) => `Image ${i + 2} is a ${r.label}`).join('. ')}.`
      : '';

    const fullPrompt = `${visualPrompt}.
        KEEP IDENTICAL from the reference image 1 (Monika): her face, hairstyle, body type, and figure (slim, fit, attractive physique). Only change her OUTFIT to match the scene described above. Each scene should have a DIFFERENT outfit appropriate for the context.${refLabels}
        STYLE: Photorealistic 8K, cinematic lighting, shallow depth of field.
        FRAMING: ${orientationHint}`;

    // Build content array with all reference images
    const contentParts: Array<Record<string, unknown>> = [
      {
        type: 'image_url',
        image_url: { url: `data:image/jpeg;base64,${refImageB64}` },
      },
    ];
    for (const ref of extraRefs) {
      contentParts.push({
        type: 'image_url',
        image_url: { url: ref.b64 },
      });
    }
    contentParts.push({ type: 'text', text: fullPrompt });

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
            content: contentParts,
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

    // Extract image from OpenRouter response
    let imageBuffer: Buffer | null = null;
    const message = result.choices?.[0]?.message;

    // Check message.images[] (OpenRouter's native image response format)
    if (message?.images && Array.isArray(message.images)) {
      for (const img of message.images) {
        const dataUrl = img?.image_url?.url;
        if (dataUrl && dataUrl.startsWith('data:')) {
          const b64 = dataUrl.split(',')[1];
          if (b64) {
            imageBuffer = Buffer.from(b64, 'base64');
            break;
          }
        }
      }
    }

    // Fallback: check message.content[] (OpenAI-compatible format)
    if (!imageBuffer && message?.content) {
      const parts = Array.isArray(message.content) ? message.content : [];

      for (const part of parts) {
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
    const imageUrl = `/api/tiktok/files?path=videos/${subDir}/session_${sessionId}/${filePrefix}_${segmentIndex}_image.png`;

    return NextResponse.json({ imageUrl, size: imageBuffer.byteLength });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
