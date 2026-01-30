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

const TARGET_IMAGE = '/images/monika/articles/grand_master_palace.png';

const ARTICLES_TO_FIX = [
    'pl-rycerze-maltanscy-historia',
    'en-knights-of-malta-history'
];

async function fixKnightsImage() {
    const { data, error } = await supabase
        .from('articles')
        .update({
            cover_image: TARGET_IMAGE,
            updated_at: new Date().toISOString()
        })
        .in('slug', ARTICLES_TO_FIX)
        .select();

    if (error) {
        console.error('Failed to update Knights image:', error);
    } else {
        console.log(`✅ Updated ${data.length} articles to use image: ${TARGET_IMAGE}`);
        data.forEach(a => console.log(`   - ${a.slug}`));
    }
}

fixKnightsImage();
