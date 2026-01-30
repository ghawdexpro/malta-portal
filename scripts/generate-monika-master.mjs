/**
 * Generate Monika Master Reference Image
 * Uses NanoBanana Pro (Gemini 3 Pro Image) via Vertex AI
 *
 * Run: node scripts/generate-monika-master.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Config
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'primal-turbine-478412-k9';
const MODEL = 'gemini-3-pro-image-preview';
const LOCATION = 'global';

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika');

async function getAccessToken() {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    let auth;

    if (credsJson) {
        let credentials;
        try {
            credentials = JSON.parse(credsJson);
        } catch {
            credentials = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8'));
        }
        auth = new GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
    } else {
        auth = new GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
    }

    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token || '';
}

async function retryWithBackoff(fn, retries = 5, initialDelay = 5000) {
    let delay = initialDelay;
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            const isRateLimit = error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED');
            if (!isRateLimit) throw error;
            console.log(`[NanoBanana] Rate limit hit. Retrying in ${delay / 1000}s... (${i + 1}/${retries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error('Max retries exceeded');
}

async function generateImage(prompt, aspectRatio = '3:4') {
    const accessToken = await getAccessToken();
    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    console.log(`[NanoBanana Pro] Model: ${MODEL} | Location: ${LOCATION} | Ratio: ${aspectRatio}`);

    const body = {
        contents: [{
            role: 'user',
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            imageConfig: { aspectRatio }
        }
    };

    return retryWithBackoff(async () => {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error: ${response.status} - ${error}`);
        }

        const result = await response.json();
        const images = [];
        const candidate = result.candidates?.[0];

        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData?.data) {
                    images.push(Buffer.from(part.inlineData.data, 'base64'));
                }
            }
        }

        return images;
    });
}

async function main() {
    console.log('='.repeat(60));
    console.log('  MONIKA MASTER REFERENCE — Generation');
    console.log('  Malta Portal | Face of the Brand');
    console.log('='.repeat(60));

    const prompts = [
        {
            name: 'monika-master-v1',
            prompt: `Generate a photorealistic editorial portrait of Monika, a stunningly beautiful 28-year-old Polish woman.

FACE: Classic Slavic beauty — high cheekbones, defined jawline, full natural lips, green-hazel eyes with flecks of gold, fair porcelain skin with a light warm Mediterranean tan. Strong, elegant features. Natural beauty, minimal makeup — just a touch of warm lip color.

HAIR: Long honey blonde hair with natural sun-kissed highlights from living in the Mediterranean. Loose natural waves, some strands catching the light.

EXPRESSION: Warm, confident, magnetic smile. Intelligent eyes that draw you in. The look of someone who knows a secret she's about to share.

BUILD: Fit, elegant posture, graceful.

ATTIRE: White linen blouse (slightly open at collar), thin gold chain necklace. Effortlessly chic.

BACKGROUND: Soft bokeh of warm Mediterranean tones — honey limestone, blue sky hints. Out of focus.

QUALITY: 8K, photorealistic, natural golden hour lighting from the side. Fashion editorial quality. Shot on Canon R5, 85mm f/1.4, shallow DOF.

STYLE: Vogue editorial meets travel photography. Warm, golden, aspirational. This is the face of a premium travel brand.`
        },
        {
            name: 'monika-master-v2',
            prompt: `Generate a photorealistic portrait of an exceptionally beautiful 28-year-old Polish woman named Monika.

ESSENTIAL FEATURES: Distinctly Polish/Slavic beauty. High sculpted cheekbones, strong defined jawline, symmetrical face, full natural lips, captivating green-hazel eyes. Fair skin with golden Mediterranean warmth. She is objectively stunning — the kind of face that stops you mid-scroll.

HAIR: Long, thick honey blonde with natural lighter streaks from sun exposure. Soft waves, windswept by a gentle breeze. Some strands across her face.

EXPRESSION: Radiant, genuine smile — not posed, caught mid-laugh. Eyes sparkling with life and intelligence. Approachable, magnetic.

BUILD: Athletic yet feminine, confident posture.

ATTIRE: Cream colored flowing sundress with thin straps. Small gold hoop earrings. Sun-kissed bare shoulders.

SETTING: On a rooftop or terrace overlooking something beautiful (blurred). Golden hour backlight creating a rim of light around her hair.

CAMERA: 85mm f/1.2, eye-level, golden hour. Backlit hair glow. Sharp focus on eyes. Shallow depth of field.

QUALITY: 8K ultra photorealistic. NO AI artifacts. Must look like a real photograph from a fashion magazine shoot in Malta.`
        },
        {
            name: 'monika-master-v3',
            prompt: `Generate an ultra-photorealistic portrait of Monika — a breathtaking Polish woman, 28 years old, living in Malta.

LOOK: The definition of "solid Polish beauty." Strong Slavic bone structure — pronounced cheekbones, angular jawline, straight nose, full lips. Green-hazel eyes that change color in different light. Flawless fair skin kissed by Mediterranean sun. She turns heads without trying.

HAIR: Rich honey blonde, long past shoulders, with natural golden highlights. Perfectly imperfect — some strands moved by wind.

EXPRESSION: Looking directly at camera with a subtle, knowing half-smile. One eyebrow slightly raised. Confident, intelligent, seductive in an understated way. "I know something you don't."

BODY: Fit, feminine silhouette. Great posture.

ATTIRE: Off-shoulder white top, bare golden shoulders. Thin gold pendant necklace resting on collarbone. Minimal but perfect.

LIGHTING: Golden hour side-light. Warm tones. One side of face beautifully lit, other in soft shadow. Caravaggio-meets-fashion-photography.

BACKGROUND: Completely blurred warm tones (Maltese limestone palette).

TECHNICAL: Shot on Sony A7RV, 85mm GM f/1.4, ISO 100. Magazine cover quality. 8K resolution. Zero AI artifacts — must be indistinguishable from real photography.`
        }
    ];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    for (const { name, prompt } of prompts) {
        console.log(`\n${'─'.repeat(50)}`);
        console.log(`Generating: ${name}`);
        console.log(`${'─'.repeat(50)}`);

        try {
            const images = await generateImage(prompt, '3:4');

            if (images.length > 0) {
                const filename = `${name}_${Date.now()}.png`;
                const filepath = path.join(OUTPUT_DIR, filename);
                fs.writeFileSync(filepath, images[0]);
                console.log(`✅ Saved: ${filepath}`);
                console.log(`   Size: ${(images[0].length / 1024).toFixed(0)} KB`);
            } else {
                console.error(`❌ No images returned for ${name}`);
            }
        } catch (e) {
            console.error(`❌ Error generating ${name}:`, e.message);
        }

        // Delay between generations
        await new Promise(r => setTimeout(r, 3000));
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('  DONE! Check images in: public/images/monika/');
    console.log('  Pick your favorite → rename to monika-master.png');
    console.log(`${'='.repeat(60)}`);
}

main();
