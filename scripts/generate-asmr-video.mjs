/**
 * Generate Monika ASMR Video
 * Orchestrates Script (Gemini) -> Audio (ElevenLabs) -> Images (Vertex AI) -> Video (FFmpeg)
 * Usage: node scripts/generate-asmr-video.mjs --topic "A walk in Mdina"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';
import { generateSpeech } from './lib/elevenlabs.mjs';
import { generateWithReference, retryWithBackoff } from './generate-page-assets.mjs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'videos', 'asmr');
const REF_IMAGE_PATH = path.join(__dirname, '..', 'public', 'images', 'monika', 'monika-master-ref.jpg');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const TEXT_MODEL = 'anthropic/claude-4.5-opus';

// Ensure output dir
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateScript(topic) {
    console.log(`📝 Generating script for topic: "${topic}"...`);

    const prompt = `You are a scriptwriter for "Monika", a beautiful Polish travel host in Malta.
    Write a short, relaxing ASMR-style video script about: "${topic}".
    
    TONE: Calm, intimate, whispering, "girlfriend experience", warm.
    LANGUAGE: Polish (with occasional English words).
    Structure: divide into 3-5 short segments.
    
    IMPORTANT: You must output VALID JSON only.
    - Start each Polish text segment with "[whispers] " to cue the voice actor.
    - Do not use markdown code blocks.
    - NEVER use double quotes (") inside the text strings. Use single quotes (') instead for emphasis or dialogue.
    - Example: "text": "[whispers] This is 'great'..."
    
    Output format:
    {
        "script": [
            {
                "text": "Polish narration text here...",
                "visual_prompt": "Description of the visual scene for image generator (English)"
            }
        ]
    }`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://malta-portal-production.up.railway.app',
            'X-Title': 'Malta Portal ASMR'
        },
        body: JSON.stringify({
            model: TEXT_MODEL,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        throw new Error(`Script Gen Error: ${response.status} - ${await response.text()}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;
    console.log("DEBUG: Raw Text:", text);

    let parsed;
    try {
        // Strip markdown if present
        let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // DeepSeek sometimes escapes quotes like \"script\"
        if (jsonStr.includes('\\"')) {
            jsonStr = jsonStr.replace(/\\"/g, '"');
        }

        parsed = JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to parse JSON script:", text);
        throw e;
    }

    if (Array.isArray(parsed)) return parsed;
    if (parsed.segments) return parsed.segments; // common fallback
    if (parsed.script) return parsed.script;

    console.log("DEBUG: Parsed keys:", Object.keys(parsed));
    // Try to find any array value
    for (const key of Object.keys(parsed)) {
        if (Array.isArray(parsed[key])) return parsed[key];
    }

    // Fallback: wrap in array
    return [parsed];
}

async function main() {
    const args = process.argv.slice(2);
    const topicArgIdx = args.indexOf('--topic');
    const topic = topicArgIdx !== -1 ? args[topicArgIdx + 1] : 'Relaxing evening in Valletta';

    console.log('═'.repeat(60));
    console.log(`  MONIKA ASMR VIDEO GENERATOR`);
    console.log(`  Topic: ${topic}`);
    console.log('═'.repeat(60));

    // 1. Generate Script
    let script = [];
    try {
        script = await retryWithBackoff(() => generateScript(topic));
        console.log(`✅ Script generated (${script.length} segments)`);
    } catch (e) {
        console.error("❌ Failed to generate script:", e);
        process.exit(1);
    }

    // Load Ref Image
    if (!fs.existsSync(REF_IMAGE_PATH)) {
        console.error(`❌ Reference image not found at ${REF_IMAGE_PATH}`);
        process.exit(1);
    }
    const refImageB64 = fs.readFileSync(REF_IMAGE_PATH).toString('base64');

    const segments = [];
    const timestamp = Date.now();
    const sessionDir = path.join(OUTPUT_DIR, `session_${timestamp}`);
    fs.mkdirSync(sessionDir, { recursive: true });

    console.log(`\n🚀 Starting Asset Generation...`);

    // Voice ID: Sara Martin - Sensual & Intimate (multilingual, handles Polish well)
    const VOICE_ID = 'Ir1QNHvhaJXbAGhT50w3';

    for (let i = 0; i < script.length; i++) {
        const seg = script[i];
        console.log(`\n🔹 Segment ${i + 1}/${script.length}`);

        // Audio
        let audioPath = path.join(sessionDir, `seg_${i}_audio.mp3`);
        try {
            console.log(`   🎤 Generating speech for: "${seg.text.substring(0, 30)}..."`);
            await retryWithBackoff(async () => {
                try {
                    await generateSpeech({
                        text: seg.text,
                        voiceId: VOICE_ID,
                        outputPath: audioPath
                    });
                } catch (e) {
                    // Don't retry on 401/403 (Auth/Quota issues)
                    if (e.message.includes('401') || e.message.includes('403')) {
                        e.noRetry = true;
                    }
                    throw e;
                }
            }, 3, 5000); // Reduce retries/delay for faster feedback
        } catch (err) {
            console.error(`   ❌ Audio generation failed for segment ${i + 1}: ${err.message}`);
            console.log(`   Skipping segment (no dummy files).`);
            continue;
        }

        // Image
        const imagePath = path.join(sessionDir, `seg_${i}_image.png`);
        console.log(`   🎨 Generating Image: ${seg.visual_prompt.substring(0, 50)}...`);
        const fullPrompt = `${seg.visual_prompt}. 
        KEEP IDENTICAL: The woman from reference image (Monika). 
        STYLE: Photorealistic 8K, cinematic lighting, shallow depth of field.`;

        try {
            const imgBuffer = await retryWithBackoff(() => generateWithReference(fullPrompt, refImageB64, '16:9'));
            if (imgBuffer) {
                fs.writeFileSync(imagePath, imgBuffer);
                console.log(`   ✅ Image saved.`);
            } else {
                throw new Error("Image buffer null");
            }
        } catch (e) {
            console.error(`   ❌ Image generation failed: ${e.message}`);
            // Fallback? skip?
            continue;
        }

        // Create Video Segment (Image + Audio)
        // We use ffmpeg to loop the image for the duration of the audio
        const videoPath = path.join(sessionDir, `seg_${i}.mp4`);
        console.log(`   🎬 creating video segment...`);

        // Get audio duration (rough estimate or use ffmpeg to handle it)
        // ffmpeg -loop 1 -i image.png -i audio.mp3 -c:v libx264 -tune stillimage -c:a copy -shortest out.mp4
        const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -t 30 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -shortest "${videoPath}"`;

        await execAsync(cmd);
        segments.push(videoPath);
    }

    // 3. Assemble
    if (segments.length > 0) {
        console.log('\n🎞️  Assembling final video...');
        const listPath = path.join(sessionDir, 'list.txt');
        const fileContent = segments.map(p => `file '${p}'`).join('\n');
        fs.writeFileSync(listPath, fileContent);

        const finalOutput = path.join(OUTPUT_DIR, `monika_asmr_${timestamp}.mp4`);
        // Concat
        await execAsync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${finalOutput}"`);

        console.log('═'.repeat(60));
        console.log(`✅ DONE! Video saved to:`);
        console.log(`   ${finalOutput}`);
        console.log('═'.repeat(60));
    } else {
        console.log('❌ No segments generated.');
        // Clean up empty session directory
        try {
            fs.rmSync(sessionDir, { recursive: true, force: true });
            console.log(`🧹 Cleaned up empty session: ${sessionDir}`);
        } catch {}
    }
}

main();
