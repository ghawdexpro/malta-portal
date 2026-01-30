/**
 * Test single NanoBanana Pro generation with reference image
 * Run: node scripts/test-pro-single.mjs
 */
import fs from 'fs';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
let creds;
try { creds = JSON.parse(credsJson); } catch { creds = JSON.parse(Buffer.from(credsJson, 'base64').toString('utf8')); }
const auth = new GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
const client = await auth.getClient();
const token = await client.getAccessToken();

const refB64 = fs.readFileSync('public/images/monika/monika-master-ref.jpg').toString('base64');
console.log('Ref size:', (refB64.length / 1024).toFixed(0), 'KB base64');
console.log('Testing NanoBanana Pro with reference...\n');

const res = await fetch('https://aiplatform.googleapis.com/v1/projects/primal-turbine-478412-k9/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token.token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
        contents: [{ role: 'user', parts: [
            { inlineData: { mimeType: 'image/jpeg', data: refB64 } },
            { text: 'This is my reference photo. Generate a NEW photorealistic full-body photo of THIS EXACT SAME WOMAN at a party in Malta. Keep her face, copper-ginger hair, blue eyes identical. She wears a tight black mini dress at a Paceville rooftop bar. Full body, 8K photorealistic.' }
        ]}],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } }
    })
});

console.log('Status:', res.status);
if (!res.ok) {
    console.log('Error:', (await res.text()).substring(0, 400));
    process.exit(1);
}

const result = await res.json();
const parts = result.candidates?.[0]?.content?.parts || [];
let saved = false;
for (const p of parts) {
    if (p.inlineData?.data) {
        const buf = Buffer.from(p.inlineData.data, 'base64');
        const fp = `public/images/monika/monika-party_pro_${Date.now()}.png`;
        fs.writeFileSync(fp, buf);
        console.log('SUCCESS! Saved:', fp, `(${(buf.length / 1024).toFixed(0)} KB)`);
        saved = true;
    }
}
if (!saved) console.log('No image in response. Parts:', parts.map(p => Object.keys(p)));
