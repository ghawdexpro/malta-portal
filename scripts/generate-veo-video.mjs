/**
 * Generate TikTok Video via Veo 3.1
 * Uses NanoBanana Pro keyframe → Veo 3.1 animation with native audio
 * Run: node scripts/generate-veo-video.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'primal-turbine-478412-k9';
const LOCATION = 'us-central1';
const MODEL = 'veo-3.1-generate-001';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'videos');

// Keyframe: the Pro party scene of Monika
const KEYFRAME_PATH = path.join(__dirname, '..', 'public', 'images', 'monika', 'monika-party_pro_1769787126041.png');

async function getAccessToken() {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    let creds;
    try { creds = JSON.parse(credsJson); } catch { creds = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
    const auth = new GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    return (await client.getAccessToken()).token;
}

async function startVideoGeneration(prompt, keyframeB64, keyframeMime) {
    const token = await getAccessToken();
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predictLongRunning`;

    const instance = { prompt };

    // Attach keyframe as start image (image-to-video)
    if (keyframeB64) {
        instance.image = {
            bytesBase64Encoded: keyframeB64,
            mimeType: keyframeMime || 'image/png'
        };
    }

    const body = {
        instances: [instance],
        parameters: {
            aspectRatio: '9:16',       // TikTok vertical
            sampleCount: 1,
            durationSeconds: 8,        // Max for Veo 3.1
            personGeneration: 'allow_adult',
            generateAudio: true,       // Veo 3.1 native audio
        }
    };

    console.log('[Veo] Starting video generation...');
    console.log(`[Veo] Model: ${MODEL} @ ${LOCATION}`);
    console.log(`[Veo] Aspect: 9:16 | Duration: 8s | Audio: ON`);

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Veo API error: ${res.status} - ${err.substring(0, 400)}`);
    }

    const result = await res.json();
    if (!result.name) throw new Error('No operation name returned');

    console.log(`[Veo] Operation started: ${result.name}`);
    return result.name;
}

async function pollVideoGeneration(operationName) {
    const token = await getAccessToken();

    // Extract model ID from operation name for the poll endpoint
    const modelMatch = operationName.match(/models\/([^/]+)\/operations/);
    const modelId = modelMatch ? modelMatch[1] : MODEL;

    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${modelId}:fetchPredictOperation`;

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Poll error: ${res.status} - ${err.substring(0, 200)}`);
    }

    const result = await res.json();

    if (!result.done) return { done: false };

    if (result.error) {
        return { done: true, error: result.error.message || 'Generation failed' };
    }

    const videos = result.response?.videos || [];
    if (videos.length === 0) return { done: true, error: 'No videos generated' };

    return {
        done: true,
        videoBase64: videos[0].bytesBase64Encoded,
        videoUrl: videos[0].gcsUri,
        mimeType: videos[0].mimeType || 'video/mp4',
    };
}

async function waitForVideo(operationName, maxWaitMs = 600000, pollIntervalMs = 15000) {
    const startTime = Date.now();
    let pollCount = 0;

    while (Date.now() - startTime < maxWaitMs) {
        pollCount++;
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`[Veo] Polling #${pollCount}... (${elapsed}s elapsed)`);

        try {
            const result = await pollVideoGeneration(operationName);
            if (result.done) return result;
        } catch (e) {
            console.log(`[Veo] Poll error: ${e.message.substring(0, 100)}`);
        }

        await new Promise(r => setTimeout(r, pollIntervalMs));
    }

    return { done: false, error: 'Timed out after 10 minutes' };
}

async function main() {
    console.log('═'.repeat(60));
    console.log('  VEO 3.1 — First TikTok Video');
    console.log('  Monika Party Scene → 8s Animated Video');
    console.log('═'.repeat(60));

    // Load keyframe
    if (!fs.existsSync(KEYFRAME_PATH)) {
        console.error(`Keyframe not found: ${KEYFRAME_PATH}`);
        process.exit(1);
    }
    const keyframeB64 = fs.readFileSync(KEYFRAME_PATH).toString('base64');
    console.log(`\nKeyframe: ${(keyframeB64.length / 1024).toFixed(0)} KB base64`);

    // Video prompt — Monika at a Malta party, animated from the keyframe
    const prompt = `A stunning copper-ginger haired woman with intense blue eyes at a rooftop party in Malta at night. She is wearing a tight black mini dress and holding a cocktail glass. She turns toward the camera with a confident, flirty smile, her hair catching the warm neon light. City lights of St. Julian's twinkle in the background. She raises her glass slightly as if toasting, then tilts her head playfully. The camera slowly pushes in on her face. Warm party atmosphere, subtle bass music in background, ambient crowd noise. Cinematic quality, shallow depth of field.`;

    console.log(`\nPrompt: ${prompt.substring(0, 100)}...`);

    try {
        // Start generation
        const operationName = await startVideoGeneration(prompt, keyframeB64, 'image/png');

        // Wait for completion (up to 10 minutes)
        console.log('\n[Veo] Waiting for video generation (up to 10 min)...\n');
        const result = await waitForVideo(operationName);

        if (result.error) {
            console.error(`\n❌ Video generation failed: ${result.error}`);
            process.exit(1);
        }

        // Save video
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        const filename = `monika-party-tiktok_${Date.now()}.mp4`;
        const filepath = path.join(OUTPUT_DIR, filename);

        if (result.videoBase64) {
            const buf = Buffer.from(result.videoBase64, 'base64');
            fs.writeFileSync(filepath, buf);
            console.log(`\n✅ Video saved: ${filepath}`);
            console.log(`   Size: ${(buf.length / 1024 / 1024).toFixed(1)} MB`);
        } else if (result.videoUrl) {
            console.log(`\n✅ Video available at GCS: ${result.videoUrl}`);
            console.log('   Download manually from Google Cloud Storage');
        }

        console.log('\n' + '═'.repeat(60));
        console.log('  DONE! First TikTok video generated!');
        console.log('═'.repeat(60));

    } catch (e) {
        console.error(`\n❌ Error: ${e.message}`);
        process.exit(1);
    }
}

main();
