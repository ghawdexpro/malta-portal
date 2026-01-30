# NanoBanana Pro — Malta Portal Image Generation Bible

> Google's state-of-the-art image generation via Vertex AI, adapted for Malta Portal TikTok & social content production.

## Quick Reference

| Feature | Nano Banana (Flash) | Nano Banana Pro | Imagen 4.0 |
|---------|---------------------|-----------------|------------|
| Model ID | `gemini-2.5-flash-image` | `gemini-3-pro-image-preview` | `imagen-4.0-generate-001` |
| Max Resolution | 1024px | 4096px (4K native) | Up to 4096px |
| Max Input Images | 3 | 14 | 1-5 |
| Price (per 1M tokens) | ~$60 | ~$120 | ~$30-60 |
| Location | us-central1 | **global** (required) | us-central1 or global |
| Best For | Fast iterations, concepts | Character consistency, Monika | Photorealism, landscapes |

---

## Our Use Case: Malta Portal TikTok Content

We use NanoBanana to generate:
1. **Monika keyframes** — consistent character images for Veo video generation
2. **Article cover images** — Malta landscapes, food, historical scenes
3. **TikTok thumbnails** — hook images that stop the scroll
4. **Social media assets** — Instagram, Facebook, TikTok static posts

---

## API Configuration

### Environment Variables
```bash
GOOGLE_CLOUD_PROJECT=primal-turbine-478412-k9
GOOGLE_CLOUD_LOCATION=us-central1  # or "global" for Pro
GOOGLE_APPLICATION_CREDENTIALS_JSON=<service-account-json>
```

### Model IDs
```typescript
// Fast & affordable — use for iterations
const NANOBANANA_FLASH = 'gemini-2.5-flash-image'

// Character consistency & quality — use for Monika
const NANOBANANA_PRO = 'gemini-3-pro-image-preview'  // REQUIRES location="global"

// Photorealism — use for Malta landscapes
const IMAGEN_4 = 'imagen-4.0-generate-001'
```

### OpenRouter Alternative
```typescript
const OPENROUTER_FLASH = 'google/gemini-2.5-flash-image'
const OPENROUTER_PRO = 'google/gemini-3-pro-image-preview'
```

---

## REST API Usage

### Endpoint
```
https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/{MODEL}:generateContent
```

### Text-to-Image (Basic)
```bash
curl -X POST \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/gemini-2.5-flash-image:generateContent" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"role": "user", "parts": [{"text": "Maltese limestone street in Mdina at golden hour, cinematic, 4K"}]}],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": { "aspectRatio": "9:16" }
    }
  }'
```

### Character-Consistent Generation (Monika)
```bash
# Uses reference image + prompt for character consistency
curl -X POST \
  "https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [
        {"inlineData": {"mimeType": "image/png", "data": "<MONIKA_MASTER_BASE64>"}},
        {"text": "Generate using EXACT facial features from reference. Monika standing in Valletta street..."}
      ]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": { "aspectRatio": "9:16" }
    }
  }'
```

---

## TypeScript Implementation

```typescript
import { GoogleAuth } from 'google-auth-library';
import * as fs from 'fs';

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT!;

interface GenerationConfig {
  prompt: string;
  model?: 'flash' | 'pro' | 'imagen4';
  aspectRatio?: '16:9' | '9:16' | '1:1';
  referenceImage?: string; // path to Monika master image
}

export async function generateImage(config: GenerationConfig) {
  const model = config.model === 'pro' ? 'gemini-3-pro-image-preview'
    : config.model === 'imagen4' ? 'imagen-4.0-generate-001'
    : 'gemini-2.5-flash-image';

  const location = config.model === 'pro' ? 'global' : 'us-central1';
  const endpoint = `https://${location === 'global' ? '' : location + '-'}aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${location}/publishers/google/models/${model}:generateContent`;

  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const parts: any[] = [];

  // Add reference image for character consistency
  if (config.referenceImage) {
    const refBuffer = fs.readFileSync(config.referenceImage);
    parts.push({
      inlineData: {
        mimeType: 'image/png',
        data: refBuffer.toString('base64')
      }
    });
  }

  parts.push({ text: config.prompt });

  const body = {
    contents: [{ role: 'user', parts }],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig: { aspectRatio: config.aspectRatio || '9:16' }
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  const result = await response.json() as any;
  const images: Buffer[] = [];
  const candidate = result.candidates?.[0];

  if (candidate?.content?.parts) {
    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        images.push(Buffer.from(part.inlineData.data, 'base64'));
      }
    }
  }

  return images;
}
```

---

## Best Practices for Malta Portal

1. **Character Consistency**: Always provide `monika-master.png` as reference for any Monika generation
2. **Workflow**: Flash (concepts) → Pro (refine for Monika) → Veo (animate to video)
3. **Aspect Ratios**: Use 9:16 for TikTok/Reels, 1:1 for Instagram, 16:9 for YouTube
4. **Malta Lighting**: Specify "Mediterranean golden hour" or "Maltese limestone warm tones" for authentic look
5. **Batch API**: Reduces costs by 50% — use for bulk thumbnail generation
6. **Rate Limits**: Implement exponential backoff (5s → 10s → 20s → 40s → 80s) for 429 errors

---

## Pricing

| Model | Per Image (est.) | Best For |
|-------|-----------------|----------|
| Flash | ~$0.08 | Quick iterations, thumbnails |
| Pro | ~$0.16 | Monika keyframes, quality |
| Imagen 4 | ~$0.04-0.08 | Photorealistic Malta scenes |

*Batch API: 50% cost reduction*

---

*See also: [VEO-PROMPTING-GUIDE.md](./VEO-PROMPTING-GUIDE.md) | [MONIKA-BIBLE.md](./MONIKA-BIBLE.md) | [TIKTOK-STRATEGY.md](../TIKTOK-STRATEGY.md)*
