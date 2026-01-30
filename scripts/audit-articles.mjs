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

async function auditArticles() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title, lang');

    if (error) {
        console.error(error);
        return;
    }

    // Filter out the 32 we know we did
    const PROCESSED_PREFIXES = [
        'pl-valletta', 'pl-gozo', 'pl-upper-barrakka', 'pl-malta-filmowa', 'pl-barok',
        'pl-birgu', 'pl-caravaggio', 'pl-mdina-ciche', 'pl-rycerze', 'pl-palac',
        'pl-strait', 'pl-fenek', 'pl-kuchnia', 'pl-porady', 'pl-st-pauls',
        'pl-nurkowanie', 'pl-wielkie-oblezenie', 'pl-7000', 'pl-cytadela', 'pl-rabat',
        'pl-victoria', 'pl-pastizzi', 'pl-unesco', 'pl-fort-sw-aniola', 'pl-prom',
        'pl-konkatedra', 'pl-fortyfikacje', 'pl-swiatynie', 'pl-maltanskie-jedzenie',
        'pl-maltanskie-wino', 'pl-katakumby', 'pl-mdina-noca'
    ];

    const processed = articles.filter(a => PROCESSED_PREFIXES.some(p => a.slug.startsWith(p)));
    const remaining = articles.filter(a => !PROCESSED_PREFIXES.some(p => a.slug.startsWith(p)));

    console.log(`--- Audit Summary ---`);
    console.log(`Total Articles: ${articles.length}`);
    console.log(`Processed (Polish Monikas): ${processed.length}`);
    console.log(`Remaining: ${remaining.length}`);

    console.log(`\n--- Remaining Articles ---`);
    remaining.forEach(a => console.log(`[${a.lang || '??'}] ${a.slug} | ${a.title}`));
}

auditArticles();
