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

async function listEnglish() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title')
        .ilike('slug', 'en-%'); // Assuming English slugs start with en- or similar pattern based on audit

    // The previous audit showed mostly 'en-...' but some 'best-restaurants...'
    // Let's grab everything that DOESN'T start with 'pl-'

    const { data: allArticles } = await supabase
        .from('articles')
        .select('slug, title');

    const english = allArticles.filter(a => !a.slug.startsWith('pl-'));

    console.log(`--- English Articles: ${english.length} ---`);
    english.forEach(a => console.log(`${a.slug} | ${a.title}`));
}

listEnglish();
