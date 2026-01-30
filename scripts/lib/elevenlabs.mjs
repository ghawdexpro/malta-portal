/**
 * ElevenLabs API Helper
 * Text-to-Speech generation
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env from .env.local if not already loaded
// Assuming this is called from project root or scripts folder
// We'll try to resolve .env.local from likely locations
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading .env.local from project root (up 2 levels from scripts/lib)
const envPath = path.resolve(__dirname, '../../.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    dotenv.config(); // fallback
}

const API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

// Default Voice ID (Monika placeholder - needs to be set in ENV or passed)
// "21m00Tcm4TlvDq8ikWAM" is "Rachel" (default stable), usually good to have a default
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';

export async function generateSpeech({ text, voiceId = DEFAULT_VOICE_ID, outputPath }) {
    if (!API_KEY) {
        throw new Error('ELEVENLABS_API_KEY is missing in environment variables.');
    }

    console.log(`🎤 Generating speech for: "${text.substring(0, 30)}..."`);
    console.log(`   Voice ID: ${voiceId}`);

    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2", // Updated for free tier compatibility
            voice_settings: {
                stability: 0.35,
                similarity_boost: 0.80
            }
        })
    });

    if (!response.ok) {
        let errDetails = '';
        try {
            errDetails = await response.text();
        } catch (e) { }
        throw new Error(`ElevenLabs API Error: ${response.status} ${response.statusText} - ${errDetails}`);
    }

    const audioBuffer = await response.arrayBuffer();

    if (outputPath) {
        fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
        console.log(`✅ Saved audio to: ${outputPath}`);
    }

    return Buffer.from(audioBuffer);
}
