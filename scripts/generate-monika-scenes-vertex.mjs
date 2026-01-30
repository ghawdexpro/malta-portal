/**
 * Generate Monika Scene Pack via Vertex AI (with reference image)
 * Uses compressed reference + exponential backoff retry
 * Run: node scripts/generate-monika-scenes-vertex.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'primal-turbine-478412-k9';
const MODEL = 'gemini-3-pro-image-preview'; // NanoBanana Pro — highest quality
const LOCATION = 'global';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika');

// Compressed reference image (768x768 JPEG, ~131KB vs 1565KB PNG)
const REF_IMAGE_PATH = path.join(OUTPUT_DIR, 'monika-master-ref.jpg');

async function getAccessToken() {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    let credentials;
    try { credentials = JSON.parse(credsJson); } catch { credentials = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
    const auth = new GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
}

async function retryWithBackoff(fn, retries = 8, initialDelay = 30000) {
    let delay = initialDelay;
    for (let i = 0; i < retries; i++) {
        try { return await fn(); } catch (error) {
            if (i === retries - 1) throw error;
            const msg = error.message || '';
            const isRateLimit = msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('Resource exhausted');
            if (!isRateLimit) throw error;
            console.log(`  ⏳ Rate limit. Retry in ${delay/1000}s... (${i+1}/${retries})`);
            await new Promise(r => setTimeout(r, delay));
            delay = Math.min(delay * 1.5, 180000); // Cap at 3 min
        }
    }
}

async function generateWithReference(prompt, refImageB64, modelId, location) {
    const accessToken = await getAccessToken();
    const prefix = location === 'global' ? '' : `${location}-`;
    const endpoint = `https://${prefix}aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${location}/publishers/google/models/${modelId}:generateContent`;

    console.log(`  Model: ${modelId} @ ${location}`);

    const body = {
        contents: [{
            role: 'user',
            parts: [
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: refImageB64
                    }
                },
                { text: prompt }
            ]
        }],
        generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            imageConfig: { aspectRatio: '9:16' }
        }
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`${response.status} - ${err.substring(0, 200)}`);
    }

    const result = await response.json();
    for (const part of (result.candidates?.[0]?.content?.parts || [])) {
        if (part.inlineData?.data) {
            return Buffer.from(part.inlineData.data, 'base64');
        }
    }
    return null;
}

async function generateScene(prompt, name, refImageB64) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`🎬 ${name}`);
    console.log(`${'─'.repeat(50)}`);

    // NanoBanana Pro only — highest quality, no fallback to lesser models
    try {
        const imageBuffer = await retryWithBackoff(() =>
            generateWithReference(prompt, refImageB64, 'gemini-3-pro-image-preview', 'global')
        );
        if (imageBuffer) return imageBuffer;
        console.log(`  Pro: No image in response`);
    } catch (e) {
        console.log(`  Pro failed: ${e.message.substring(0, 150)}`);
    }
    return null;
}

async function main() {
    console.log('═'.repeat(60));
    console.log('  MONIKA SCENE PACK — Vertex AI + Reference Image');
    console.log('  Compressed ref: 768x768 JPEG (~131KB)');
    console.log('═'.repeat(60));

    // Load compressed reference
    if (!fs.existsSync(REF_IMAGE_PATH)) {
        console.error(`❌ Reference not found: ${REF_IMAGE_PATH}`);
        console.log('Run: sips -s format jpeg -s formatOptions 80 -z 768 768 public/images/monika/monika-master.png --out public/images/monika/monika-master-ref.jpg');
        process.exit(1);
    }
    const refImageB64 = fs.readFileSync(REF_IMAGE_PATH).toString('base64');
    console.log(`📸 Reference loaded: ${(refImageB64.length / 1024).toFixed(0)} KB base64\n`);

    const scenes = [
        {
            name: 'monika-party',
            prompt: `This is my reference photo. Generate a NEW photorealistic full-body photo of THIS EXACT SAME WOMAN at a Paceville nightlife party in Malta.

KEEP IDENTICAL: Her face, copper-ginger hair, intense blue eyes, facial features, body type (hourglass — full bust, narrow waist, curvy hips).

NEW SCENE: Night club / rooftop bar party in Paceville, Malta.
OUTFIT: Tight black mini dress, very short, deep V-neckline showing cleavage. Strappy high heels. Gold statement earrings. Hair styled sleek and straight. Red lipstick.
POSE: Full body. Dancing or holding a cocktail glass. One hip cocked. Looking at camera with confident, flirty party energy. Neon lights reflecting on her skin.
SETTING: Rooftop bar, city lights of St. Julian's behind her. Warm neon lighting, party atmosphere.
QUALITY: 9:16 portrait, 8K photorealistic. Looks like a real nightlife Instagram photo.`
        },
        {
            name: 'monika-date',
            prompt: `This is my reference photo. Generate a NEW photorealistic full-body photo of THIS EXACT SAME WOMAN on a romantic dinner date at a Valletta waterfront restaurant in Malta.

KEEP IDENTICAL: Her face, copper-ginger hair, intense blue eyes, facial features, body type (hourglass figure).

NEW SCENE: Romantic dinner at a candlelit waterfront restaurant.
OUTFIT: Elegant fitted emerald green satin slip dress, thin straps, low back, mid-thigh length. Nude heeled sandals. Delicate gold jewelry. Hair in soft loose waves over one shoulder.
POSE: Full body. Sitting at a beautifully set table, wine glass in hand, leaning forward slightly. Warm smile, intimate eye contact with camera. One bare shoulder visible.
SETTING: Outdoor waterfront restaurant, Valletta harbour lights reflected on water. Candles on table. Warm golden ambient light.
QUALITY: 9:16 portrait, 8K photorealistic. Premium date-night Instagram aesthetic.`
        },
        {
            name: 'monika-beach',
            prompt: `This is my reference photo. Generate a NEW photorealistic full-body photo of THIS EXACT SAME WOMAN at the Blue Lagoon beach in Comino, Malta.

KEEP IDENTICAL: Her face, copper-ginger hair, intense blue eyes, facial features, body type (hourglass — full bust, narrow waist, curvy hips, long legs).

NEW SCENE: Blue Lagoon beach, crystal turquoise water.
OUTFIT: Stylish two-piece bikini in white with gold accents. High-waisted bottoms accentuating her waist. Sheer white sarong loosely tied at hip. Oversized sunglasses on head. Gold body chain.
POSE: Full body. Standing at water's edge, turquoise water at her feet. Walking toward camera. Hair windswept. Confident beach goddess energy.
SETTING: Blue Lagoon, Comino — famous crystal clear turquoise water, rocky Mediterranean coastline, bright sunny day.
QUALITY: 9:16 portrait, 8K photorealistic. Premium beach/swimwear influencer photo.`
        },
        {
            name: 'monika-sports',
            prompt: `This is my reference photo. Generate a NEW photorealistic full-body photo of THIS EXACT SAME WOMAN jogging along the Sliema waterfront promenade in Malta.

KEEP IDENTICAL: Her face, copper-ginger hair, intense blue eyes, facial features, body type (athletic hourglass).

NEW SCENE: Morning jog on Sliema promenade.
OUTFIT: Tight matching sports set — cropped sports bra in dusty rose showing toned midriff, matching high-waisted short running shorts showing long legs. White running shoes. Hair in high ponytail, AirPods in ears. Fitness tracker on wrist.
POSE: Full body. Mid-jog, dynamic running pose. Glowing with a light sweat. Big energetic smile. Looking at camera mid-stride.
SETTING: Sliema seafront promenade, Mediterranean sea sparkling in morning light. Valletta skyline across the harbour in background.
QUALITY: 9:16 portrait, 8K photorealistic. Fitness influencer / athleisure brand photo.`
        },
        {
            name: 'monika-formal',
            prompt: `This is my reference photo. Generate a NEW photorealistic full-body photo of THIS EXACT SAME WOMAN at the Grand Master's Palace in Valletta, Malta, dressed for a formal gala.

KEEP IDENTICAL: Her face, copper-ginger hair, intense blue eyes, facial features, body type (hourglass — full bust, narrow waist, curvy hips).

NEW SCENE: Formal gala evening at Grand Master's Palace.
OUTFIT: Floor-length fitted burgundy velvet gown with a thigh-high slit showing one leg. Off-shoulder neckline. Statement diamond earrings. Hair in elegant updo with loose tendrils framing her face. Classic red lip.
POSE: Full body. Standing on grand marble staircase. One hand on ornate stone balustrade. Looking over shoulder at camera with sophisticated, powerful elegance. The slit revealing a toned leg.
SETTING: Grand Master's Palace interior — ornate baroque architecture, marble floors, warm chandelier lighting, rich historical Maltese grandeur.
QUALITY: 9:16 portrait, 8K photorealistic. Red carpet / high fashion editorial quality.`
        }
    ];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    let successCount = 0;
    for (const { name, prompt } of scenes) {
        const imageBuffer = await generateScene(prompt, name, refImageB64);

        if (imageBuffer) {
            const filepath = path.join(OUTPUT_DIR, `${name}_${Date.now()}.png`);
            fs.writeFileSync(filepath, imageBuffer);
            console.log(`✅ Saved: ${filepath} (${(imageBuffer.length/1024).toFixed(0)} KB)`);
            successCount++;
        } else {
            console.error(`❌ ${name}: All models failed`);
        }

        // 60-second cooldown between scenes — Pro has tight per-minute quota
        console.log('  ⏳ 60s cooldown before next scene...');
        await new Promise(r => setTimeout(r, 60000));
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  DONE! ${successCount}/${scenes.length} scenes generated`);
    console.log(`  Check: public/images/monika/`);
    console.log(`${'═'.repeat(60)}`);
}

main();
