import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const FIXES = [
    {
        slug: 'pl-maltanskie-jedzenie-uliczne',
        image: '/images/monika/page/experience_food.png' // Swapping to the premium "Experience Food" asset
    },
    {
        slug: 'porady-malta-pierwsza-wizyta',
        image: '/images/monika/page/experience_sightseeing.png' // Using "Experience Sightseeing" as a high-quality fallback
    },
    {
        slug: 'gozo-kompletny-przewodnik',
        image: '/images/monika/articles/victoria.png' // Using the Citadel image (Victoria)
    }
];

async function applyImageFixes() {
    for (const fix of FIXES) {
        const { error } = await supabase
            .from('articles')
            .update({
                cover_image: fix.image,
                updated_at: new Date().toISOString()
            })
            .eq('slug', fix.slug);

        if (error) {
            console.error('Failed image update for ' + fix.slug + ':', error);
        } else {
            console.log(`✅ Fixed Image: ${fix.slug} -> ${fix.image}`);
        }
    }
}

applyImageFixes();
