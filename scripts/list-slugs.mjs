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

async function listSlugs() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title')
        .ilike('slug', 'pl-%')
        .neq('slug', 'pl-valletta-sladami-maklowicza')
        .limit(10);

    if (error) {
        console.error(error);
        return;
    }

    console.log('--- Top 10 Polish Articles to Rewrite ---');
    articles.forEach(a => console.log(`${a.slug} | ${a.title}`));
}

listSlugs();
