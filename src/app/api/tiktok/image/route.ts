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
    const { visualPrompt, sessionId, segmentIndex } = await request.json();

    if (!visualPrompt || sessionId === undefined || segmentIndex === undefined) {
      return NextResponse.json({ error: 'visualPrompt, sessionId, segmentIndex required' }, { status: 400 });
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

    const accessToken = await getAccessToken();
    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${GOOGLE_PROJECT_ID}/locations/${IMAGE_LOCATION}/publishers/google/models/${IMAGE_MODEL}:generateContent`;

    const body = {
      contents: [{
        role: 'user',
        parts: [
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

    fs.writeFileSync(imagePath, imageBuffer);
    const imageUrl = `/videos/asmr/session_${sessionId}/seg_${segmentIndex}_image.png`;

    return NextResponse.json({ imageUrl, size: imageBuffer.byteLength });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
