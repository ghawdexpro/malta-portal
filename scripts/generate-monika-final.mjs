/**
 * Generate Monika Final — based on v2a with blue eyes, ginger tones, more sex appeal
 * Run: node scripts/generate-monika-final.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-2.5-flash-image';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'monika');

async function generateImage(prompt, name) {
    console.log(`Generating: ${name}...`);
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
            provider: { order: ['google-ai-studio'], allow_fallbacks: false }
        }),
    });

    if (!response.ok) {
        console.error(`  Error: ${response.status} - ${(await response.text()).substring(0, 200)}`);
        return null;
    }

    const result = await response.json();
    const message = result.choices?.[0]?.message;
    if (!message) return null;

    for (const img of (message.images || [])) {
        if (img.type === 'image_url' && img.image_url?.url?.startsWith('data:image')) {
            return Buffer.from(img.image_url.url.split(',')[1], 'base64');
        }
    }
    const mc = message.content;
    if (typeof mc === 'string' && mc.includes('data:image')) {
        const m = mc.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
        if (m) return Buffer.from(m[1], 'base64');
    }
    console.log(`  No image found`);
    return null;
}

async function main() {
    console.log('MONIKA FINAL — Blue Eyes, Ginger, Sex Appeal\n');

    const prompts = [
        {
            name: 'monika-final-v1',
            prompt: `Generate a photorealistic full-body fashion photograph of Monika, a breathtakingly sexy 24-year-old Polish woman on vacation in Malta.

FACE: Young, stunning Slavic beauty. INTENSE PIERCING BLUE EYES — vivid, electric blue, captivating. Full pouty lips with a hint of gloss. High cheekbones, small nose, perfect jawline. Flawless sun-kissed tan skin. Seductive playful expression — she's looking back at camera with a "follow me" look.

HAIR: Long flowing strawberry blonde / light ginger — copper-gold tones with sun-bleached highlights. Beach waves, thick and voluminous, catching golden light. Wind blowing through it.

BODY: Incredible hourglass figure — full bust, very narrow waist, wide curvy hips. Long toned legs. She is absolutely stunning.

OUTFIT: Very short flowy white mini skirt (mid-thigh, flirty, moving with breeze). Fitted cropped terracotta tank top showing toned flat midriff. Strappy wedge sandals showing tanned feet. Gold anklet. Layered gold necklaces on tanned décolletage. Oversized sunglasses pushed up in ginger hair.

POSE: Full body shot. Walking down a Valletta limestone street. She's looking back over her shoulder at the camera with a seductive, inviting smile. One hand running through her ginger hair. Hips swaying. Back slightly arched. The pose says "come with me, I'll show you something amazing." Confident, sexy, magnetic.

SETTING: Narrow Valletta street, honey limestone walls, colorful traditional Maltese balconies above, golden hour warm sunlight casting long shadows. Mediterranean dream.

CAMERA: Full body, shot from slightly below hip level for elongated legs. 35mm f/1.8, wide enough for environment context. Golden hour warm backlighting with rim light on her hair and skin edges. Professional fashion/travel photography.

QUALITY: 8K ultra photorealistic. Must look like a real professional Instagram photo from a top travel influencer. Warm Mediterranean color grading. Skin texture visible, natural, real. Zero AI artifacts.`
        },
        {
            name: 'monika-final-v2',
            prompt: `Generate a photorealistic full-body photograph of Monika, a jaw-droppingly beautiful 24-year-old Polish woman exploring Malta.

EYES: BRIGHT VIVID BLUE — intense, piercing, electric cobalt blue eyes that are immediately striking. This is her most distinctive feature.

FACE: Young Polish/Slavic perfection. Full natural lips, defined high cheekbones, delicate features, golden-tan flawless skin. Expression: confident smirk mixed with flirty warmth. She knows the effect she has.

HAIR: Strawberry blonde / copper-ginger. Long, past shoulders, with golden-red tones. Natural beach waves, voluminous, sun-catching. Some strands blowing across her face.

BODY: Showstopper hourglass — full chest, tiny cinched waist, shapely wide hips, long lean legs. Athletic but very feminine. She turns every head on the street.

OUTFIT: Short white flowy skirt barely reaching mid-thigh, moves in the breeze. Cropped rust/terracotta fitted top hugging her curves, showing her toned stomach. Wedge espadrilles. Gold body chain visible at waist. Delicate gold layered necklaces. Small hoop earrings catching light.

POSE: Full body. She's mid-stride walking through a Malta street, looking back at the camera over her bare shoulder. Her back is slightly arched, hips tilted. One hand pushing ginger hair behind her ear. The other touching her hip. Effortlessly seductive. The pose of a woman who owns every room she enters.

SETTING: Sun-drenched Valletta street, limestone buildings, traditional green shutters, potted flowers. Late afternoon golden hour flooding the scene.

CAMERA: Full body from just below eye level. 50mm f/1.4. Gorgeous golden hour backlight creating rim light on her hair and body contour. Warm, dreamy, magazine quality.

QUALITY: 8K photorealistic. Looks like it belongs on the cover of a luxury travel magazine. Professional retouching level quality but natural — real skin, real light. No AI tells whatsoever.`
        },
        {
            name: 'monika-final-v3',
            prompt: `Generate an ultra-photorealistic full-body photograph of Monika, a 24-year-old Polish bombshell who is the face of a Malta travel brand.

MOST IMPORTANT: She has STRIKING INTENSE BLUE EYES — deep vivid blue, the first thing you notice. Combined with her ginger-toned hair, it's an unforgettable combination.

FACE: Gorgeous young Slavic features. Full lips, high cheekbones, feminine jawline, lightly freckled nose from the sun. Warm golden tan. Her expression is the perfect mix of playful and seductive — she's biting her lower lip slightly with a hint of a smile, looking over her shoulder at camera.

HAIR: Long copper-strawberry blonde. Rich warm ginger-gold tones. Thick natural waves, windswept, some strands across her face. Sun creates a golden halo effect.

BODY: Jaw-dropping curves — ample bust, wasp waist, full round hips, endless toned legs. She has the kind of figure that stops traffic.

OUTFIT: Tiny white flowy mini skirt (showing maximum leg), cropped off-shoulder terracotta top revealing toned shoulders, collarbones, and midriff. Wedge heels. Thin gold belly chain at her narrow waist. Layered gold necklaces on sun-kissed chest. Small gold earrings.

POSE: Full body. Standing in a Valletta street, half-turned. Looking back over her bare shoulder directly at camera. Her weight on one leg, hip pushed out to the side, creating an S-curve silhouette. One hand in her ginger hair, other hand lightly touching the limestone wall. Spine curved gracefully. The ultimate "follow me" pose — inviting, confident, incredibly attractive.

SETTING: Picturesque Valletta side street. Warm honey limestone, colorful wooden balconies, afternoon golden light streaming between buildings, creating beautiful shadow patterns on her skin and the walls.

CAMERA: Full body, slightly below eye level. 35mm f/1.4 for environmental portrait with shallow background. Golden hour sidelighting sculpting her figure. Warm color temperature. Shot like a premium brand campaign.

QUALITY: 8K, absolutely photorealistic. This needs to look like a real photo by a professional fashion photographer shooting in Malta. Real skin texture, real light physics, real fabric movement. Not a single AI artifact. Magazine print quality.`
        }
    ];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    for (const { name, prompt } of prompts) {
        const buf = await generateImage(prompt, name);
        if (buf) {
            const fp = path.join(OUTPUT_DIR, `${name}_${Date.now()}.png`);
            fs.writeFileSync(fp, buf);
            console.log(`✅ ${name}: ${fp} (${(buf.length/1024).toFixed(0)} KB)\n`);
        } else {
            console.error(`❌ ${name}: Failed\n`);
        }
        await new Promise(r => setTimeout(r, 5000));
    }

    console.log('Done! Opening in Chrome...');

    // List generated files
    const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith('monika-final')).sort();
    for (const f of files) {
        console.log(`  ${f}`);
    }
}

main();
