# Veo 3.1 — Malta Portal Video Generation Guide

> 8-second AI video clips with native audio. Our engine for TikTok content production.

---

## What Veo 3.1 Does
- 8-second video clips, 720p/1080p
- Native audio generation (voice dialogue, ambient sound, music)
- Image-to-video with keyframes (start frame, end frame, or both)
- Reference images for character consistency (up to 3)
- Vertical 9:16 format native support (perfect for TikTok)

---

## The Prompt Formula

Every Veo prompt needs:
```
[CAMERA] + [SUBJECT] + [ACTION] + [ENVIRONMENT] + [VISUALS] + [AUDIO] + [NEGATIVES]
```

---

## 1. Camera

**Movements:** dolly, tracking, crane, pan, tilt, zoom, gimbal, handheld, drone, whip pan

**Shots:**
| Code | Shot | Best For |
|------|------|----------|
| ECU | Extreme close-up (eyes) | Emotion, food texture |
| CU | Close-up (face) | Monika speaking |
| MCU | Head + shoulders | Monika presenting |
| MS | Waist up | Monika in location |
| LS | Full body | Monika walking |
| ELS | Vast landscape | Malta establishing shots |

**Angles:** eye-level, high, low, Dutch, bird's eye, worm's eye

---

## 2. Subject + Action

```
[Who/What] + [Doing what] + [With what quality/emotion]
```

Malta Portal examples:
- `Monika walking through Mdina's limestone streets with wonder`
- `steaming fenkata rabbit stew in rustic clay pot, close-up`
- `Valletta harbour at sunrise, golden light on limestone`
- `pastizzi being pulled fresh from stone oven, steam rising`

---

## 3. Environment

```
[Where] + [When] + [Atmosphere]
```

Malta locations:
- `Valletta streets, golden hour, warm Mediterranean breeze`
- `Mdina at night, lantern-lit, mysterious silence`
- `St. John's Co-Cathedral interior, baroque gold, reverent`
- `Gozo countryside, rolling hills, rustic charm`
- `Crystal Palace pastizzeria, Rabat, bustling morning`

---

## 4. Visuals

```
[Lighting] + [Colors] + [Texture] + [Style reference]
```

Malta palette:
- `warm golden hour, honey limestone tones, 35mm grain, cinematic`
- `dramatic chiaroscuro (for Caravaggio content), deep shadows, museum lighting`
- `soft Mediterranean light, azure and gold, travel documentary quality`
- `night lantern light, warm amber, mysterious, shallow DOF`

---

## 5. Audio

```
[Ambient] + [SFX] + [Music] + [Dialogue]
```

Malta audio design:
- `Mediterranean ambient, distant church bells, gentle breeze, no dialogue`
- `bustling street market, cooking sounds, local chatter`
- `dramatic orchestral, building suspense (for history content)`
- `Her voice says in Polish: "[MONIKA DIALOGUE]"`
- `silence, single footstep echoing on limestone (Mdina at night)`

---

## 6. Negatives (Always Include)

**Essential:**
```
No text, no watermarks, no jitter, no morphing, no extra limbs
```

**Extended (for Monika shots):**
```
no subtitles, no frame drops, no face distortion, no physics violations, no identity drift, no extra fingers
```

---

## API Implementation

### Start Video Generation
```typescript
const LOCATION = 'us-central1';
const MODEL = 'veo-3.1-generate-001';

async function startVideoGeneration(request: {
  prompt: string;
  imageBase64?: string;      // keyframe from NanoBanana
  imageMimeType?: string;
  durationSeconds?: number;  // 5-8 seconds
  aspectRatio?: '16:9' | '9:16';
  generateAudio?: boolean;
  negativePrompt?: string;
}): Promise<string> {
  const accessToken = await getAccessToken();
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predictLongRunning`;

  const instance: Record<string, unknown> = { prompt: request.prompt };

  if (request.imageBase64) {
    instance.image = {
      bytesBase64Encoded: request.imageBase64,
      mimeType: request.imageMimeType || 'image/png',
    };
  }

  const body = {
    instances: [instance],
    parameters: {
      aspectRatio: request.aspectRatio || '9:16',
      sampleCount: 1,
      durationSeconds: request.durationSeconds || 8,
      personGeneration: 'allow_adult',
      generateAudio: request.generateAudio ?? true,
      ...(request.negativePrompt && { negativePrompt: request.negativePrompt }),
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

  const result = await response.json() as { name?: string };
  return result.name!; // operation name for polling
}
```

### Poll for Completion
```typescript
async function pollVideoGeneration(operationName: string) {
  const accessToken = await getAccessToken();
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:fetchPredictOperation`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operationName }),
  });

  const result = await response.json() as any;
  if (!result.done) return { done: false };

  const video = result.response?.videos?.[0];
  return {
    done: true,
    videoBase64: video?.bytesBase64Encoded,
    videoUrl: video?.gcsUri,
  };
}
```

### Wait with Polling (10 min timeout)
```typescript
async function waitForVideo(operationName: string, maxWaitMs = 600000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const result = await pollVideoGeneration(operationName);
    if (result.done) return result;
    await new Promise(r => setTimeout(r, 15000)); // poll every 15s
  }
  throw new Error('Timeout waiting for video');
}
```

---

## Two-Stage Video Production Pipeline

### Stage 1: Keyframe (NanoBanana Pro)
Generate a photorealistic starting frame:
```
NanoBanana Pro + monika-master.png reference → keyframe.png
```

### Stage 2: Animation (Veo 3.1)
Animate the keyframe into an 8-second video:
```
Veo 3.1 + keyframe.png + motion prompt → video.mp4
```

This ensures **character consistency** — Monika looks the same across all videos.

---

## Malta TikTok Shot Templates

### Monika Presenting (MCU)
```
Medium close-up of Monika, a beautiful Polish woman with [HAIR], [EYES].
She speaks directly to camera with [EMOTION].
Setting: [MALTA LOCATION], golden hour, warm Mediterranean light.
Audio: Her voice says in Polish: "[DIALOGUE]"
Camera: Stationary with very subtle handheld movement.
No text, no watermarks, no jitter, no face distortion.
```

### Malta Landscape (ELS)
```
Slow drone shot establishing [LOCATION].
[TIME OF DAY], [ATMOSPHERE].
Warm honey limestone tones, cinematic quality, 35mm grain.
Audio: [AMBIENT SOUND], gentle Mediterranean music.
No text, no watermarks, no jitter.
```

### Food Close-Up (ECU)
```
Extreme close-up of [DISH], [ACTION].
[LOCATION/SETTING], warm natural light.
Shallow depth of field, food photography quality.
Audio: [COOKING SOUNDS], subtle ambient.
No text, no watermarks, no jitter.
```

### History Dramatic (MS)
```
Medium shot of [HISTORICAL SCENE].
[LOCATION], [ERA LIGHTING].
Dramatic chiaroscuro, rich warm tones, cinematic.
Audio: Dramatic orchestral build, [AMBIENT].
No text, no watermarks, no jitter.
```

---

## Pre-Flight Checklist

- [ ] Purpose/emotion clear?
- [ ] Subject specific (Monika? Food? Location?)
- [ ] Action fits 8 seconds?
- [ ] Malta environment detailed?
- [ ] Camera movement chosen?
- [ ] Lighting specified (golden hour, dramatic, night)?
- [ ] Audio designed (dialogue, ambient, music)?
- [ ] Negatives listed?
- [ ] Keyframe generated from NanoBanana? (for Monika shots)

---

## Technical Specs

| Parameter | TikTok Value |
|-----------|-------------|
| Aspect Ratio | 9:16 |
| Resolution | 1080x1920 |
| Duration | 8 seconds |
| Audio | Generated (Polish dialogue) |
| Format | MP4 H.264 |
| Person Gen | `allow_adult` |

---

*See also: [NANOBANANA-BIBLE.md](./NANOBANANA-BIBLE.md) | [MONIKA-BIBLE.md](./MONIKA-BIBLE.md) | [TIKTOK-STRATEGY.md](../TIKTOK-STRATEGY.md)*
