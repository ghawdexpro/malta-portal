/**
 * Generate Monika Scene Pack — 5 Malta locations with monika-master.png reference
 * Run: node scripts/generate-monika-scenes.mjs
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
const MASTER_REF = path.join(OUTPUT_DIR, 'monika-master.png');

async function generateWithReference(prompt, name) {
    console.log(`Generating: ${name}...`);

    // Load master reference image
    const refBuffer = fs.readFileSync(MASTER_REF);
    const refBase64 = refBuffer.toString('base64');

    const content = [
        {
            type: 'image_url',
            image_url: { url: `data:image/png;base64,${refBase64}` }
        },
        { type: 'text', text: prompt }
    ];

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
    console.log('MONIKA SCENE PACK — 5 Malta Locations\n');
    console.log(`Using master reference: ${MASTER_REF}\n`);

    const scenes = [
        {
            name: 'monika-scene-party',
            prompt: `Generate a photorealistic full-body photograph using the EXACT same woman from the reference image — same face, same blue eyes, same copper-ginger hair, same features. This is Monika.

SCENE: PARTY NIGHT in Paceville / St Julian's, Malta.

FACE: IDENTICAL to reference — piercing blue eyes, copper-ginger hair, high cheekbones, full lips, gorgeous young Slavic features. Smoky eye makeup for the night. Glossy lips. She looks absolutely stunning.

HAIR: Same copper-ginger as reference but styled for nightlife — voluminous blow-out waves, bouncy, glamorous.

BODY: Same incredible hourglass figure from reference — full bust, tiny waist, curvy hips, long legs. She's the hottest woman in the club.

OUTFIT: Tight black mini dress — very short, strapless or thin straps, hugging every curve. Shows maximum cleavage and legs. Strappy high heels elongating her legs. Statement gold earrings. Gold bracelet. Small clutch bag.

POSE: Full body. Standing outside a Paceville nightclub/bar with neon lights. One hand on hip, the other holding her hair. Weight on one leg, hip pushed out. Looking at camera with a sultry, confident party-ready smile. She owns the night.

SETTING: Paceville Malta at night. Neon club lights, warm ambient glow, other people blurred in background. Night energy, Mediterranean nightlife vibe.

CAMERA: Full body, low angle emphasizing legs and figure. Night photography, neon backlighting, warm tones. 35mm f/1.4. 8K photorealistic. Must look like a real nightlife photo.`
        },
        {
            name: 'monika-scene-date',
            prompt: `Generate a photorealistic photograph using the EXACT same woman from the reference image — same face, same piercing blue eyes, same copper-ginger hair. This is Monika.

SCENE: ROMANTIC DATE at a waterfront restaurant in Valletta / Marsaxlokk harbour.

FACE: IDENTICAL to reference — blue eyes, copper-ginger hair, high cheekbones, full lips. Soft natural makeup with warm lip color. She's glowing, radiant.

HAIR: Same copper-ginger as reference, loose soft waves, tucked behind one ear revealing gold earring. Candlelight reflecting in her hair.

BODY: Same hourglass figure — the dress reveals her curves beautifully. Décolletage prominently on display.

OUTFIT: Elegant but sexy — low-cut wrap dress in deep burgundy/wine color, plunging neckline showing ample cleavage, cinched at her tiny waist. Thin gold chain necklace drawing the eye down. Gold hoop earrings. Bare tanned shoulders.

POSE: Seated at a candlelit table on a restaurant terrace overlooking the harbour. Leaning forward slightly on her elbows (enhancing décolletage), chin resting on one hand. Looking directly at camera with warm, intimate, seductive eyes and a gentle smile — the look she gives across the table on a perfect date.

SETTING: Waterfront restaurant terrace in Malta. Candlelight, wine glasses on table, Mediterranean harbour with traditional Maltese boats (luzzu) blurred in background. Warm evening golden-blue hour light.

CAMERA: Upper body and table (waist up), eye level seated shot. Candlelight as key light, harbour ambient as fill. Shallow DOF. 85mm f/1.4. Intimate, romantic. 8K photorealistic.`
        },
        {
            name: 'monika-scene-beach',
            prompt: `Generate a photorealistic full-body photograph using the EXACT same woman from the reference image — same face, same piercing blue eyes, same copper-ginger hair. This is Monika.

SCENE: BEACH DAY at Golden Bay or Blue Lagoon, Malta.

FACE: IDENTICAL to reference — blue eyes even more vivid against the azure sea, copper-ginger hair, sun-kissed freckles across her nose and cheeks. Natural beach glow, no makeup except waterproof mascara making her blue eyes pop. Radiant happy smile.

HAIR: Same copper-ginger as reference — wet and tousled from the sea, slicked back and dripping, some strands across her face. Sun catching the copper tones.

BODY: Same incredible hourglass figure on full display — full bust, flat toned stomach, narrow waist, wide curvy hips, long toned legs. Sun-kissed golden tan all over. She's breathtaking in a bikini.

OUTFIT: Two-piece bikini — terracotta/rust colored to complement her copper hair. Triangle top showing maximum cleavage. High-cut bottoms accentuating her hips and long legs. Thin gold belly chain across her flat stomach. Gold anklet. That's it — maximum skin, maximum impact.

POSE: Full body. Standing at the water's edge, crystal clear turquoise Maltese water behind her. One hand running through her wet ginger hair, the other on her hip. Body angled slightly — classic model pose showing her S-curve silhouette. Looking at camera with a big, joyful, sun-soaked smile. She's living her best life.

SETTING: Maltese beach — crystal clear turquoise water, golden sand, dramatic limestone cliffs in background. Bright Mediterranean midday sun with vivid colors.

CAMERA: Full body, slightly low angle shot from the sand. Bright natural sunlight, vivid turquoise water backdrop. Wide angle 24mm for landscape context. 8K photorealistic. Summer lifestyle photography.`
        },
        {
            name: 'monika-scene-sports',
            prompt: `Generate a photorealistic full-body photograph using the EXACT same woman from the reference image — same face, same piercing blue eyes, same copper-ginger hair. This is Monika.

SCENE: ACTIVE/SPORTS — morning jog or yoga on the Sliema Promenade with Valletta skyline.

FACE: IDENTICAL to reference — blue eyes, copper-ginger hair, high cheekbones. Fresh, glowing, no makeup. Dewy skin glistening with light perspiration. Energized, vibrant smile.

HAIR: Same copper-ginger as reference — pulled up in a high messy ponytail, some loose strands framing her face. Sun catching the ginger highlights.

BODY: Same hourglass figure but now athletic mode — toned abs fully visible, defined arms, strong legs. Sports outfit showcases her fit body perfectly.

OUTFIT: Tight matching sports set — tiny crop sports bra in coral/terracotta (matching her hair) showing her full toned midriff, sculpted abs, and bust from the side. Very short high-waisted running shorts (or fitted bike shorts) hugging her curves. White running shoes. AirPods. Fitness watch. Everything tight, showing every curve of her athletic hourglass body.

POSE: Full body. Mid-stride jogging on the Sliema seaside promenade, OR standing stretching with arms overhead (showing full torso). Body in athletic motion — dynamic, powerful, sexy. Looking at camera with an energized, confident smile. One earphone out like she's pausing to say hi.

SETTING: Sliema Promenade, Malta. Mediterranean sea on one side, Valletta skyline across the harbour in golden morning light. Early morning sun, fresh clean atmosphere.

CAMERA: Full body, dynamic angle. Warm morning golden light. Action photography style, slightly frozen motion. 35mm f/2. 8K photorealistic. Fitness influencer meets travel content.`
        },
        {
            name: 'monika-scene-formal',
            prompt: `Generate a photorealistic full-body photograph using the EXACT same woman from the reference image — same face, same piercing blue eyes, same copper-ginger hair. This is Monika.

SCENE: FORMAL EVENT at the Palazzo / Casino Malta / Grand Master's Palace, Valletta.

FACE: IDENTICAL to reference — piercing blue eyes dramatically enhanced with elegant makeup, copper-ginger hair, full lips in red. She looks like a movie star walking the red carpet. Glamorous but classy.

HAIR: Same copper-ginger as reference — styled in elegant Hollywood waves cascading over one shoulder. Shiny, volumous, red-carpet ready. One side pinned back with a delicate gold hair clip.

BODY: Same hourglass figure — the gown is designed to showcase her curves. She is the most beautiful woman in the room.

OUTFIT: Floor-length emerald green silk evening gown — the color makes her blue eyes electric. Deep V-neckline plunging to show cleavage. Cinched at her tiny waist. High thigh slit on one side revealing her full toned leg and strappy gold heels. Backless or low-back design showing her toned back. Statement gold drop earrings. Matching gold clutch. She's dressed to kill.

POSE: Full body. Standing on the grand limestone staircase or baroque hallway of a Maltese palazzo. One leg forward through the thigh slit. One hand lightly touching the baroque stone railing. Chin slightly raised, confident. Looking at camera with a commanding, elegant, subtly seductive expression. She's powerful and beautiful.

SETTING: Grand baroque interior — Maltese palazzo or Grand Master's Palace, Valletta. Ornate stone staircase, warm chandelier lighting, gilded frames, limestone walls. Old-world European elegance.

CAMERA: Full body, slight low angle for grandeur. Warm chandelier lighting mixed with natural window light. Fashion editorial composition. 85mm f/1.4, shallow DOF on background architecture. 8K photorealistic. Vogue-level quality.`
        }
    ];

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    for (const { name, prompt } of scenes) {
        const buf = await generateWithReference(prompt, name);
        if (buf) {
            const fp = path.join(OUTPUT_DIR, `${name}_${Date.now()}.png`);
            fs.writeFileSync(fp, buf);
            console.log(`✅ ${name}: saved (${(buf.length/1024).toFixed(0)} KB)\n`);
        } else {
            console.error(`❌ ${name}: Failed\n`);
        }
        await new Promise(r => setTimeout(r, 5000));
    }

    console.log('\nDone! All scenes in public/images/monika/');
}

main();
