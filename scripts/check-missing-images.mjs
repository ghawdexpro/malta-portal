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

async function checkMissing() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title, cover_image')
        .eq('status', 'published');

    if (error) {
        console.error(error);
        return;
    }

    console.log('--- Articles with OLD/MISSING images ---');
    for (const article of articles) {
        if (!article.cover_image || article.cover_image.startsWith('http')) {
            console.log(`[MISSING] ${article.title} (Current: ${article.cover_image})`);
        } else {
            // console.log(`[OK] ${article.title}`);
        }
    }
}

checkMissing();
