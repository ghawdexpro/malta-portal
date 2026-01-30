/**
 * Generate Monika via OpenRouter (bypasses Vertex rate limits)
 * Run: node scripts/generate-monika-openrouter.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-2.5-flash-image'; // Flash image gen via OpenRouter
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika');

async function generateImage(prompt, name) {
    console.log(`\nGenerating via OpenRouter: ${name}...`);

    // Match exact working pattern from outlet-system/nanobanana.ts
    const content = [{ type: 'text', text: prompt }];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://malta-portal-production.up.railway.app',
            'X-Title': 'Malta Portal TikTok'
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'user', content }],
            modalities: ['image', 'text'],
            // Force google-ai-studio provider (faster than vertex)
            provider: {
                order: ['google-ai-studio'],
                allow_fallbacks: false
            }
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        console.error(`  OpenRouter error: ${response.status} - ${err.substring(0, 200)}`);
        return null;
    }

    const result = await response.json();
    const message = result.choices?.[0]?.message;

    if (!message) {
        console.error('  No message in response');
        return null;
    }

    // Extract from message.images (OpenRouter image gen format)
    const messageImages = message.images || [];
    for (const img of messageImages) {
        if (img.type === 'image_url' && img.image_url?.url?.startsWith('data:image')) {
            const b64 = img.image_url.url.split(',')[1];
            console.log(`  ✅ Got image from OpenRouter!`);
            return Buffer.from(b64, 'base64');
        }
    }

    // Fallback: check content for inline images
    const msgContent = message.content;
    if (typeof msgContent === 'string' && msgContent.includes('data:image')) {
        const match = msgContent.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
        if (match) {
            console.log(`  ✅ Got image from content string!`);
            return Buffer.from(match[1], 'base64');
        }
    }

    console.log(`  No image found. Keys: ${Object.keys(message).join(', ')}`);
    if (message.content) console.log(`  Content preview: ${String(message.content).substring(0, 200)}`);
    return null;
}

// Try Vertex AI directly with Flash model (more quota)
async function generateImageVertex(prompt, name) {
    console.log(`\nGenerating via Vertex Flash: ${name}...`);

    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (!credsJson) { console.error('  No Google credentials'); return null; }

    const { GoogleAuth } = await import('google-auth-library');
    let credentials;
    try { credentials = JSON.parse(credsJson); } catch { credentials = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
    const auth = new GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'primal-turbine-478412-k9';

    // Try Flash model first (higher quota)
    const models = [
        { id: 'gemini-2.5-flash-image', location: 'us-central1' },
        { id: 'gemini-3-pro-image-preview', location: 'global' },
    ];

    for (const model of models) {
        console.log(`  Trying model: ${model.id} @ ${model.location}`);
        const prefix = model.location === 'global' ? '' : `${model.location}-`;
        const endpoint = `https://${prefix}aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${model.location}/publishers/google/models/${model.id}:generateContent`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseModalities: ['TEXT', 'IMAGE'],
                        imageConfig: { aspectRatio: '9:16' }
                    }
                }),
            });

            if (!response.ok) {
                const err = await response.text();
                console.log(`  ${model.id}: ${response.status} - ${err.substring(0, 100)}`);
                continue;
            }

            const result = await response.json();
            for (const part of (result.candidates?.[0]?.content?.parts || [])) {
                if (part.inlineData?.data) {
                    console.log(`  ✅ Got image from ${model.id}!`);
                    return Buffer.from(part.inlineData.data, 'base64');
                }
            }
            console.log(`  ${model.id}: No image in response`);
        } catch (e) {
            console.log(`  ${model.id}: ${e.message}`);
        }
    }
    return null;
}

async function main() {
    console.log('MONIKA v2 — Full Body, Young, Catchy\n');

    const prompts = [
        {
            name: 'monika-v2a-fullbody',
            prompt: `Generate a photorealistic full-body fashion photograph of a stunning 24-year-old Polish woman named Monika on vacation in Malta.

She has: high cheekbones, full lips, bright green eyes, golden tan skin, long platinum-honey blonde beach waves.

Body: Hourglass figure — full bust, narrow waist, curvy hips. Long toned legs. She's fit and feminine.

Outfit: Very short flowy white skirt (mid-thigh), fitted cropped terracotta tank top showing toned midriff. Strappy wedge sandals. Gold anklet. Oversized sunglasses pushed up in her hair. Layered gold necklaces.

Pose: Full body. Walking down a Valletta limestone street. Looking back at camera over her shoulder with a big playful smile. One hand in her hair. Dynamic, confident, catching the moment.

Setting: Narrow Valletta street, colorful Maltese balconies, golden hour warm light, long shadows.

Style: High-end travel influencer Instagram photo. Shot on 35mm f/1.8. Warm golden color grading. 8K photorealistic. Must look like a real photo.`
        },
        {
            name: 'monika-v2b-fullbody',
            prompt: `Generate a photorealistic full-body photograph of Monika, a head-turning 24-year-old Polish woman at Upper Barrakka Gardens, Malta.

Face: Young, gorgeous Slavic features. Green eyes, full pouty lips, defined cheekbones, flawless tan skin. Confident smirk.

Body: Curvy hourglass — full chest, tiny waist, shapely hips. Long legs. She's a showstopper.

Outfit: Fitted short coral sundress, square neckline, thin straps, hugging every curve. Stops well above the knee. White sneakers. Small crossbody bag. Delicate gold layered necklaces.

Pose: Full body. Standing at stone railing, Grand Harbour behind her. One hip cocked out. Hand on railing. Looking directly at camera with confident magnetic energy. Wind in her hair.

Lighting: Golden hour, warm backlight creating hair glow and rim light on her skin.

Quality: 8K photorealistic full body photo. Professional fashion/travel photography. Warm Mediterranean tones. Zero AI artifacts. Looks like a real brand campaign photo.`
        },
        {
            name: 'monika-v2c-fullbody',
            prompt: `Generate a photorealistic full-body photograph of Monika, a gorgeous 24-year-old Polish influencer in a Maltese side street.

Face: Stunning young Polish beauty. Green-hazel eyes, full natural lips with gloss, high cheekbones, golden sun-kissed skin. Big warm inviting smile showing perfect teeth. She has personality and charm.

Body: Perfect hourglass silhouette — full bust, slim waist, wide hips, long toned legs. Athletic yet very feminine.

Outfit: High-waisted very short denim cutoff shorts showing her long legs. White off-shoulder cropped top revealing toned stomach and bare shoulders. Wedge espadrilles. Gold belly chain. Layered gold necklaces. Small hoop earrings.

Pose: Full body shot. Leaning against a honey-colored limestone wall. One knee bent, foot against wall. Relaxed and confident. Looking at camera with that warm, magnetic, come-explore-with-me smile. Head tilted slightly.

Setting: Narrow picturesque Maltese street, limestone walls, green wooden shutters, potted bougainvillea. Warm afternoon sun creating beautiful shadows across the scene.

Camera: Full body, shot from slightly below eye level. 35mm lens, f/1.4. Golden warm natural light. Premium fashion/travel influencer aesthetic.

Quality: 8K ultra photorealistic. Must be indistinguishable from a real professional photograph. Warm Mediterranean color grading. This is a brand hero photo.`
        }
    ];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    for (const { name, prompt } of prompts) {
        // Try OpenRouter first (faster, avoids Vertex rate limits)
        let imageBuffer = await generateImage(prompt, name);

        // Fallback to Vertex AI
        if (!imageBuffer) {
            console.log(`  OpenRouter failed, trying Vertex AI...`);
            imageBuffer = await generateImageVertex(prompt, name);
        }

        if (imageBuffer) {
            const filepath = path.join(OUTPUT_DIR, `${name}_${Date.now()}.png`);
            fs.writeFileSync(filepath, imageBuffer);
            console.log(`✅ Saved: ${filepath} (${(imageBuffer.length/1024).toFixed(0)} KB)`);
        } else {
            console.error(`❌ ${name}: All methods failed`);
        }

        await new Promise(r => setTimeout(r, 5000));
    }

    console.log('\nDone! Check public/images/monika/');
}

main();
