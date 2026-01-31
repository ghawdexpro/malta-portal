import { NextRequest, NextResponse } from 'next/server';
import { GOOGLE_PROJECT_ID, IMAGE_MODEL, IMAGE_LOCATION } from '@/lib/tiktok-config';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

const REF_IMAGE_PATH = path.join(process.cwd(), 'public', 'images', 'monika', 'monika-master-ref.jpg');

async function getAccessToken() {
  const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credsJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON missing');
  let credentials;
  try {
    credentials = JSON.parse(credsJson);
  } catch {
    credentials = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8'));
  }
  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

export async function POST(request: NextRequest) {
  try {
    const { backgroundImage, prompt } = await request.json();

    if (!backgroundImage || !prompt) {
      return NextResponse.json({ error: 'backgroundImage (base64) and prompt required' }, { status: 400 });
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

    const accessToken = await getAccessToken();
    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${GOOGLE_PROJECT_ID}/locations/${IMAGE_LOCATION}/publishers/google/models/${IMAGE_MODEL}:generateContent`;

    const body = {
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: backgroundImage } },
          { inlineData: { mimeType: 'image/jpeg', data: refImageB64 } },
          { text: fullPrompt },
        ],
      }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: { aspectRatio: '16:9' },
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Vertex AI error: ${response.status}`, details: err.substring(0, 300) },
        { status: 502 }
      );
    }

    const result = await response.json();
    let imageBuffer: Buffer | null = null;
    for (const part of (result.candidates?.[0]?.content?.parts || [])) {
      if (part.inlineData?.data) {
        imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        break;
      }
    }

    if (!imageBuffer) {
      return NextResponse.json({ error: 'No image returned from Vertex AI' }, { status: 502 });
    }

    // Save to composed directory
    const outputDir = path.join(process.cwd(), 'public', 'images', 'monika', 'composed');
    fs.mkdirSync(outputDir, { recursive: true });
    const filename = `composed_${Date.now()}.png`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, imageBuffer);

    return NextResponse.json({
      imageUrl: `/images/monika/composed/${filename}`,
      size: imageBuffer.byteLength,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Composition failed', details: String(error) },
      { status: 500 }
    );
  }
}
