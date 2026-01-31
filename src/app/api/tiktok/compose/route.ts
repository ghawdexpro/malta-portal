import { NextRequest, NextResponse } from 'next/server';
import { IMAGE_MODEL } from '@/lib/tiktok-config';
import fs from 'fs';
import path from 'path';

const REF_IMAGE_PATH = path.join(process.cwd(), 'public', 'images', 'monika', 'monika-master-ref.jpg');

export async function POST(request: NextRequest) {
  try {
    const { backgroundImage, prompt } = await request.json();

    if (!backgroundImage || !prompt) {
      return NextResponse.json({ error: 'backgroundImage (base64) and prompt required' }, { status: 400 });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
    }

    if (!fs.existsSync(REF_IMAGE_PATH)) {
      return NextResponse.json({ error: 'Monika reference image not found' }, { status: 500 });
    }

    const refImageB64 = fs.readFileSync(REF_IMAGE_PATH).toString('base64');

    const fullPrompt = `You have TWO reference images:
1. First image: The BACKGROUND SCENE (a real photo from Malta)
2. Second image: MONIKA - a reference photo of a woman

YOUR TASK: ${prompt}

CRITICAL RULES:
- Use the background photo as the base scene
- Place Monika (from the reference photo) naturally into this scene
- Keep Monika's face, hair color (copper-ginger), and features IDENTICAL to the reference
- Make it look like a natural photograph, not a composite
- Match lighting and perspective between Monika and the background
- Photorealistic 8K quality, cinematic travel photography aesthetic`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
                  url: `data:image/jpeg;base64,${backgroundImage}`,
                },
              },
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

    // Save to composed directory
    const outputDir = path.join(process.cwd(), 'public', 'images', 'monika', 'composed');
    fs.mkdirSync(outputDir, { recursive: true });
    const filename = `composed_${Date.now()}.png`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, imageBuffer);

    return NextResponse.json({
      imageUrl: `/api/tiktok/files?path=images/monika/composed/${filename}`,
      size: imageBuffer.byteLength,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Composition failed', details: String(error) },
      { status: 500 }
    );
  }
}
