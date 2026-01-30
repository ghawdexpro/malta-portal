/**
 * Generate Monika Master v2 — younger, bolder, full body
 * Run: node scripts/generate-monika-v2.mjs
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
const MODEL = 'gemini-3-pro-image-preview';
const LOCATION = 'global';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika');

async function getAccessToken() {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    let credentials;
    try { credentials = JSON.parse(credsJson); } catch { credentials = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
    const auth = new GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
}

async function retryWithBackoff(fn, retries = 6, initialDelay = 8000) {
    let delay = initialDelay;
    for (let i = 0; i < retries; i++) {
        try { return await fn(); } catch (error) {
            if (i === retries - 1) throw error;
            if (!error.message?.includes('429') && !error.message?.includes('RESOURCE_EXHAUSTED')) throw error;
            console.log(`  Rate limit. Retry in ${delay/1000}s... (${i+1}/${retries})`);
            await new Promise(r => setTimeout(r, delay));
            delay *= 2;
        }
    }
}

async function generateImage(prompt, aspectRatio = '9:16') {
    const accessToken = await getAccessToken();
    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    return retryWithBackoff(async () => {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio } }
            }),
        });
        if (!response.ok) throw new Error(`API Error: ${response.status} - ${await response.text()}`);
        const result = await response.json();
        const images = [];
        for (const part of (result.candidates?.[0]?.content?.parts || [])) {
            if (part.inlineData?.data) images.push(Buffer.from(part.inlineData.data, 'base64'));
        }
        return images;
    });
}

async function main() {
    console.log('MONIKA v2 — Younger, Bolder, Full Body\n');

    const prompts = [
        {
            name: 'monika-v2a',
            prompt: `Generate an ultra-photorealistic full-body photograph of Monika, a stunning 24-year-old Polish woman on vacation in Malta.

FACE: Young, fresh, gorgeous. High cheekbones, full lips, bright green eyes, perfect skin. Light tan. Playful confident expression — she knows she looks amazing. Big natural smile showing teeth.

HAIR: Long platinum blonde, beach waves, some strands blowing in the breeze. Sun-catching highlights.

BODY: Hourglass figure — full bust, narrow waist, curvy hips. Fit and toned. She takes care of herself.

OUTFIT: Short flowy summer skirt (white, mid-thigh), cropped fitted tank top in terracotta showing midriff. Strappy sandals. Gold anklet. Oversized sunglasses pushed up on head.

POSE: Full body shot. Walking confidently down a Valletta street, one hand adjusting sunglasses on her head, looking back at camera over her shoulder with a playful smile. Dynamic, caught-in-motion feel.

SETTING: Valletta limestone street, colorful Maltese balconies overhead, golden hour sunlight.

CAMERA: Full body, slight low angle. Shot on Sony A7IV, 35mm f/1.8. Golden hour warm light. Fashion street photography style.

QUALITY: 8K, ultra photorealistic, must look like a real Instagram photo. Warm Mediterranean color grading. No AI artifacts.`
        },
        {
            name: 'monika-v2b',
            prompt: `Generate an ultra-photorealistic full-body photograph of Monika, a gorgeous 24-year-old Polish influencer exploring Malta.

FACE: Youthful Slavic beauty. Striking green eyes, pouty full lips, defined cheekbones, flawless golden-tan skin. Confident, magnetic expression — slight smirk, one eyebrow raised. She has personality.

HAIR: Long honey blonde with lighter balayage ends. Loose waves past her shoulders. Volume and movement.

BODY: Curvy hourglass silhouette — full chest, slim waist, shapely hips. Athletic but feminine. Long toned legs.

OUTFIT: Fitted mini dress in warm coral/terracotta, square neckline showing décolletage, thin straps, hugging her curves. White sneakers for that casual-chic contrast. Small crossbody bag. Delicate gold layered necklaces.

POSE: Full body. Standing at a stone railing overlooking the Grand Harbour. One hip cocked, hand on railing, looking directly at camera with that confident "I own this" energy. Wind catching her hair and dress slightly.

SETTING: Upper Barrakka Gardens viewpoint, Valletta. Grand Harbour and Three Cities in background. Golden hour.

CAMERA: Full body shot from chest-height angle. 50mm f/1.4, shallow DOF on background. Fashion editorial meets travel content creator.

QUALITY: 8K photorealistic. Looks like a professional Instagram photoshoot. Warm, golden, aspirational. Zero AI artifacts.`
        },
        {
            name: 'monika-v2c',
            prompt: `Generate an ultra-photorealistic full-body photograph of Monika, a head-turning 24-year-old Polish woman who is the face of a Malta travel brand.

FACE: Drop-dead gorgeous young Polish face. Piercing green-hazel eyes, full natural lips with a touch of gloss, high cheekbones, small nose, perfect symmetry. Dewy glowing skin with a sun-kissed tan. Expression: playful, inviting, like she's about to tell you the best secret.

HAIR: Long flowing platinum-honey blonde, voluminous beach waves. Hair looks like she just came from the beach — effortless and sexy.

BODY: Show-stopping hourglass figure. Full bust, tiny waist, wide hips, long toned legs. The kind of body that makes people stop scrolling.

OUTFIT: High-waisted very short denim cutoffs showing long legs. White cropped off-shoulder top revealing toned stomach and shoulders. Wedge espadrilles adding height. Gold belly chain barely visible. Layered gold necklaces.

POSE: Full body, standing in a narrow Maltese side street. Leaning back slightly against a honey-colored limestone wall. One knee bent, foot against wall. Arms relaxed at sides. Head tilted slightly, looking at camera with a warm, magnetic smile — confident, sexy, approachable all at once.

SETTING: Narrow picturesque Maltese street, limestone walls, green shuttered windows, potted plants. Warm afternoon sun creating beautiful shadows.

CAMERA: Full body shot, slight upward angle emphasizing her legs and figure. 35mm f/1.4 for environment context. Golden warm natural lighting. Shot like a premium fashion/travel influencer photo.

QUALITY: 8K ultra photorealistic. Absolutely must look like a real photograph — zero AI tells. Professional color grading, warm Mediterranean tones. This is a brand campaign photo.`
        }
    ];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    for (const { name, prompt } of prompts) {
        console.log(`Generating: ${name}...`);
        try {
            const images = await generateImage(prompt, '9:16');
            if (images.length > 0) {
                const filepath = path.join(OUTPUT_DIR, `${name}_${Date.now()}.png`);
                fs.writeFileSync(filepath, images[0]);
                console.log(`✅ ${name}: ${filepath} (${(images[0].length/1024).toFixed(0)} KB)\n`);
            } else {
                console.error(`❌ ${name}: No image returned\n`);
            }
        } catch (e) {
            console.error(`❌ ${name}: ${e.message}\n`);
        }
        await new Promise(r => setTimeout(r, 5000)); // cooldown between requests
    }

    console.log('Done! Check public/images/monika/');
}

main();
