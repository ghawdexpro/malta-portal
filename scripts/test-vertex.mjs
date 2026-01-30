import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const creds = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON, 'base64').toString('utf8'));
const auth = new GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
const PROJECT = 'primal-turbine-478412-k9';

async function getToken() {
    const client = await auth.getClient();
    const t = await client.getAccessToken();
    return t.token;
}

async function test() {
    const token = await getToken();

    // TEST 1: Flash text-only
    console.log('--- TEST 1: Flash (us-central1) text-only ---');
    try {
        const r = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/gemini-2.5-flash-image:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: 'A beautiful sunset over Malta harbour, photorealistic' }] }],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } }
            })
        });
        const data = await r.json();
        const hasImage = data.candidates?.[0]?.content?.parts?.some(p => p.inlineData);
        console.log('Status:', r.status, '| Has image:', hasImage);
        if (!hasImage) console.log('Response:', JSON.stringify(data).substring(0, 300));
    } catch(e) { console.log('Error:', e.message); }

    // TEST 2: Pro text-only
    console.log('\n--- TEST 2: Pro (global) text-only ---');
    try {
        const r = await fetch(`https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: 'A beautiful sunset over Malta harbour, photorealistic' }] }],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } }
            })
        });
        const data = await r.json();
        const hasImage = data.candidates?.[0]?.content?.parts?.some(p => p.inlineData);
        console.log('Status:', r.status, '| Has image:', hasImage);
        if (!hasImage) console.log('Response:', JSON.stringify(data).substring(0, 300));
    } catch(e) { console.log('Error:', e.message); }

    // TEST 3: Pro WITH reference image
    console.log('\n--- TEST 3: Pro (global) WITH reference image ---');
    try {
        const refImg = fs.readFileSync(path.join(__dirname, '..', 'public/images/monika/monika-master.png'));
        const refB64 = refImg.toString('base64');
        console.log('Reference image size:', (refImg.length / 1024).toFixed(0), 'KB');

        const r = await fetch(`https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [
                    { inlineData: { mimeType: 'image/png', data: refB64 } },
                    { text: 'Generate a new photorealistic image of the EXACT same woman from the reference image. Same face, same piercing blue eyes, same copper-ginger hair. She is standing at a Malta beach wearing a terracotta bikini. Full body, 9:16 vertical, 8K photorealistic.' }
                ] }],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } }
            })
        });

        console.log('Status:', r.status);
        const data = await r.json();
        const hasImage = data.candidates?.[0]?.content?.parts?.some(p => p.inlineData);
        console.log('Has image:', hasImage);

        if (hasImage) {
            const imgPart = data.candidates[0].content.parts.find(p => p.inlineData);
            const buf = Buffer.from(imgPart.inlineData.data, 'base64');
            const outPath = path.join(__dirname, '..', 'public/images/monika/vertex-ref-test.png');
            fs.writeFileSync(outPath, buf);
            console.log('SAVED:', outPath, `(${(buf.length/1024).toFixed(0)} KB)`);
        } else {
            console.log('Full response:', JSON.stringify(data).substring(0, 500));
        }
    } catch(e) { console.log('Error:', e.message); }

    // TEST 4: Flash WITH reference image
    console.log('\n--- TEST 4: Flash (us-central1) WITH reference image ---');
    try {
        const refImg = fs.readFileSync(path.join(__dirname, '..', 'public/images/monika/monika-master.png'));
        const refB64 = refImg.toString('base64');

        const r = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/gemini-2.5-flash-image:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [
                    { inlineData: { mimeType: 'image/png', data: refB64 } },
                    { text: 'Generate a new photorealistic image of the EXACT same woman from the reference image. Same face, same piercing blue eyes, same copper-ginger hair. She is standing at a Malta beach wearing a terracotta bikini. Full body, 9:16 vertical, 8K photorealistic.' }
                ] }],
                generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } }
            })
        });

        console.log('Status:', r.status);
        const data = await r.json();
        const hasImage = data.candidates?.[0]?.content?.parts?.some(p => p.inlineData);
        console.log('Has image:', hasImage);

        if (hasImage) {
            const imgPart = data.candidates[0].content.parts.find(p => p.inlineData);
            const buf = Buffer.from(imgPart.inlineData.data, 'base64');
            const outPath = path.join(__dirname, '..', 'public/images/monika/flash-ref-test.png');
            fs.writeFileSync(outPath, buf);
            console.log('SAVED:', outPath, `(${(buf.length/1024).toFixed(0)} KB)`);
        } else {
            console.log('Full response:', JSON.stringify(data).substring(0, 500));
        }
    } catch(e) { console.log('Error:', e.message); }
}

test();
