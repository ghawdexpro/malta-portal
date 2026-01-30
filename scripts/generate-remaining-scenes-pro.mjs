/**
 * Generate remaining 4 Monika scenes with NanoBanana Pro
 * One at a time, 60s cooldown between each
 * Run: node scripts/generate-remaining-scenes-pro.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const PROJECT_ID = 'primal-turbine-478412-k9';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika');
const REF_PATH = path.join(OUTPUT_DIR, 'monika-master-ref.jpg');

async function getToken() {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    let creds;
    try { creds = JSON.parse(credsJson); } catch { creds = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
    const auth = new GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    return (await client.getAccessToken()).token;
}

async function generatePro(prompt, refB64) {
    const token = await getToken();
    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent`;

    // Retry with backoff for rate limits
    let delay = 30000;
    for (let attempt = 0; attempt < 8; attempt++) {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: refB64 } },
                    { text: prompt }
                ]}],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } }
            })
        });

        if (res.ok) {
            const result = await res.json();
            for (const p of (result.candidates?.[0]?.content?.parts || [])) {
                if (p.inlineData?.data) return Buffer.from(p.inlineData.data, 'base64');
            }
            return null;
        }

        const errText = await res.text();
        if (res.status === 429 || errText.includes('RESOURCE_EXHAUSTED')) {
            console.log(`    Rate limit. Retry in ${delay/1000}s... (${attempt+1}/8)`);
            await new Promise(r => setTimeout(r, delay));
            delay = Math.min(delay * 1.5, 180000);
            continue;
        }
        throw new Error(`${res.status}: ${errText.substring(0, 200)}`);
    }
    throw new Error('Max retries exceeded');
}

async function main() {
    console.log('MONIKA SCENES — NanoBanana Pro + Reference\n');

    const refB64 = fs.readFileSync(REF_PATH).toString('base64');
    console.log(`Reference: ${(refB64.length/1024).toFixed(0)} KB base64\n`);

    const scenes = [
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

    for (let i = 0; i < scenes.length; i++) {
        const { name, prompt } = scenes[i];
        console.log(`\n[${ i+1}/${scenes.length}] ${name}`);

        try {
            const buf = await generatePro(prompt, refB64);
            if (buf) {
                const fp = path.join(OUTPUT_DIR, `${name}_pro_${Date.now()}.png`);
                fs.writeFileSync(fp, buf);
                console.log(`  ✅ ${fp} (${(buf.length/1024).toFixed(0)} KB)`);
            } else {
                console.log(`  ❌ No image returned`);
            }
        } catch (e) {
            console.log(`  ❌ ${e.message.substring(0, 150)}`);
        }

        if (i < scenes.length - 1) {
            console.log('  ⏳ 60s cooldown...');
            await new Promise(r => setTimeout(r, 60000));
        }
    }

    console.log('\nDONE! Check public/images/monika/');
}

main();
