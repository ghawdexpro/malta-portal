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

async function verifyEnglish() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title, body_html')
        .ilike('slug', 'en-%') // English slugs usually start with en-
        .limit(5);

    if (error) {
        console.error(error);
        return;
    }

    // Also check a few that might not start with en- but are English
    const { data: otherEnglish } = await supabase
        .from('articles')
        .select('slug, title, body_html')
        .in('slug', ['best-restaurants-malta-locals-recommend', 'malta-prices-budget-guide-2026']);

    const allToCheck = [...articles, ...otherEnglish];

    console.log('--- Checking English Articles for Monika Style ---');
    for (const article of allToCheck) {
        console.log(`\nSLUG: ${article.slug}`);
        console.log(`TITLE: ${article.title}`);
        console.log(`Snippet: ${article.body_html?.substring(0, 150)}...`);

        if (article.body_html?.includes('monika-tip')) {
            console.log('✅ Found Monika Tip');
        } else {
            console.log('❌ NO Monika Tip found');
        }
    }
}

verifyEnglish();
