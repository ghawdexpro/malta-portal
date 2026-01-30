/**
 * Generate Page Assets for Malta Portal (Monika)
 * Uses Vertex AI Gemini 3 Pro (NanoBanana Pro) with Reference Image
 * Run: node scripts/generate-page-assets.mjs
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
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika', 'page');

// Compressed reference image
const REF_IMAGE_PATH = path.join(__dirname, '..', 'public', 'images', 'monika', 'monika-master-ref.jpg');

async function getAccessToken() {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    let credentials;
    try { credentials = JSON.parse(credsJson); } catch { credentials = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
    const auth = new GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
}

async function retryWithBackoff(fn, retries = 5, initialDelay = 30000) {
    let delay = initialDelay;
    for (let i = 0; i < retries; i++) {
        try { return await fn(); } catch (error) {
            if (i === retries - 1) throw error;
            console.log(`  ⏳ Retry in ${delay/1000}s... (${i+1}/${retries}) - ${error.message}`);
            await new Promise(r => setTimeout(r, delay));
            delay = Math.min(delay * 1.5, 120000);
        }
    }
}

async function generateWithReference(prompt, refImageB64, aspect = '16:9') {
    const accessToken = await getAccessToken();
    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    console.log(`  Model: ${MODEL} @ ${LOCATION}`);

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
            imageConfig: { aspectRatio: aspect }
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

async function main() {
    console.log('═'.repeat(60));
    console.log('  PAGE ASSETS GENERATOR — Monika (Gemini 3 Pro)');
    console.log('═'.repeat(60));

    if (!fs.existsSync(REF_IMAGE_PATH)) {
        console.error(`❌ Reference not found: ${REF_IMAGE_PATH}`);
        process.exit(1);
    }
    const refImageB64 = fs.readFileSync(REF_IMAGE_PATH).toString('base64');
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const scenes = [
        {
            name: 'hero_harbour',
            aspect: '16:9',
            prompt: `This is my reference photo. Generate a NEW photorealistic cinematographic WIDESCREEN photo of THIS EXACT SAME WOMAN in Malta.
            
            KEEP IDENTICAL: Her face, copper-ginger hair (glowing in sun), intense blue eyes, facial features.
            
            SCENE: Standing on a high vantage point (Upper Barrakka Gardens) overlooking the Grand Harbour in Valletta at sunset.
            OUTFIT: Elegant white linen dress blowing in the gentle wind. Golden hour lighting illuminating her face.
            POSE: Looking out toward the sea, then turning head slightly to smile warmly at camera. Wind in hair.
            BACKGROUND: The stunning panoramic view of the Three Cities, blue sea, golden limestone fortifications, sunset sky.
            QUALITY: 8K, cinematic wide shot, detailed background, travel magazine cover quality.`
        },
        {
            name: 'experience_food',
            aspect: '4:3',
            prompt: `This is my reference photo. Generate a NEW photorealistic photo of THIS EXACT SAME WOMAN eating at a rustic Maltese restaurant.
            
            KEEP IDENTICAL: Facial features, copper-ginger hair.
            
            SCENE: Sitting at an outdoor table in a narrow limestone street.
            ACTION: Enjoying a plate of local food (fresh seafood or rabbit), holding a fork, smiling naturally.
            OUTFIT: Casual chic, colorful blouse.
            QUALITY: 8K, food photography aesthetic, warm and inviting, shallow depth of field.`
        },
        {
            name: 'experience_beach',
            aspect: '4:3',
            prompt: `This is my reference photo. Generate a NEW photorealistic photo of THIS EXACT SAME WOMAN at a Maltese beach.
            
            KEEP IDENTICAL: Facial features, copper-ginger hair.
            
            SCENE: Blue Lagoon or Golden Bay. Turquoise water in background.
            ACTION: Standing in shallow water or relaxing on sand, looking happy and relaxed.
            OUTFIT: Tasteful bikini with a sarong or summer beach dress. Sun hat held in hand.
            QUALITY: 8K, bright, vibrant colors, summer travel vibes.`
        },
        {
            name: 'experience_sightseeing',
            aspect: '4:3',
            prompt: `This is my reference photo. Generate a NEW photorealistic photo of THIS EXACT SAME WOMAN sightseeing in Mdina.
            
            KEEP IDENTICAL: Facial features, copper-ginger hair.
            
            SCENE: Ancient narrow street of Mdina (The Silent City). Limestone walls, colorful door.
            ACTION: Walking away from camera but turning back to smile/beckon.
            OUTFIT: Stylish comfortable travel wear, crossbody bag.
            QUALITY: 8K, architectural beauty, golden sunlight.`
        },
        {
            name: 'experience_transport',
            aspect: '4:3',
            prompt: `This is my reference photo. Generate a NEW photorealistic photo of THIS EXACT SAME WOMAN near transport in Malta.
            
            KEEP IDENTICAL: Facial features, copper-ginger hair.
            
            SCENE: Near a vintage colorful Maltese bus or on a ferry deck with wind in hair.
            ACTION: leaning on railing or standing near bus, travel ready.
            OUTFIT: Casual travel outfit, sunglasses.
            QUALITY: 8K, adventurous, dynamic.`
        },
        {
            name: 'experience_accommodation',
            aspect: '4:3',
            prompt: `This is my reference photo. Generate a NEW photorealistic photo of THIS EXACT SAME WOMAN relaxing at a boutique hotel.
            
            KEEP IDENTICAL: Facial features, copper-ginger hair.
            
            SCENE: Traditional Maltese balcony (Gallarija) or terrace with view.
            ACTION: Drinking coffee or wine, looking relaxed.
            OUTFIT: Cozy morning robe or casual loungewear.
            QUALITY: 8K, lifestyle, comfortable, luxury vibes.`
        },
        {
            name: 'experience_prices',
            aspect: '4:3',
            prompt: `This is my reference photo. Generate a NEW photorealistic photo of THIS EXACT SAME WOMAN shopping at a local market.
            
            KEEP IDENTICAL: Facial features, copper-ginger hair.
            
            SCENE: Marsaxlokk fish market or a local vegetable market. Colorful stalls.
            ACTION: Looking at fresh produce or souvenir, engaging with vendor.
            OUTFIT: Casual summer dress.
            QUALITY: 8K, vibrant, busy market atmosphere.`
        }
    ];

    for (const scene of scenes) {
        console.log(`\n🎬 Generating: ${scene.name} (${scene.aspect})...`);
        try {
            const imageBuffer = await retryWithBackoff(() => 
                generateWithReference(scene.prompt, refImageB64, scene.aspect)
            );
            
            if (imageBuffer) {
                const filepath = path.join(OUTPUT_DIR, `${scene.name}.png`);
                fs.writeFileSync(filepath, imageBuffer);
                console.log(`✅ Saved: ${filepath}`);
            } else {
                console.error(`❌ Failed to get image for ${scene.name}`);
            }
        } catch (e) {
            console.error(`❌ Error generating ${scene.name}: ${e.message}`);
        }
        
        console.log('  ⏳ Cooldown (30s)...');
        await new Promise(r => setTimeout(r, 30000));
    }
}

main();
