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

// Based on previous audit, these are the remaining English ones
const BATCH_2_SLUGS = [
    'best-restaurants-malta-locals-recommend',
    'malta-beaches-complete-guide',
    'getting-around-malta-transport-guide',
    'where-to-stay-malta-accommodation',
    'malta-prices-budget-guide-2026',
    'malta-sightseeing-must-see-attractions',
    'malta-events-festivals-calendar',
    'malta-practical-tips-first-time',
    'gozo-complete-travel-guide',
    'en-temples-older-than-pyramids',
    'en-strait-street-the-gut',
    'en-malta-fortifications',
    'en-diving-malta-crystal-waters',
    'en-pastizzi-malta-street-food',
    'en-malta-film-locations',
    'en-maltese-wine-revolution',
    'en-caravaggio-in-malta',
    'en-grand-masters-palace',
    'en-st-pauls-catacombs'
];

async function fetchBatch() {
    for (const slug of BATCH_2_SLUGS) {
        const { data: article, error } = await supabase
            .from('articles')
            .select('slug, title, subtitle, body_html')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error(`Error fetching ${slug}:`, error);
            continue;
        }

        console.log(`\n--- START ARTICLE: ${article.slug} ---`);
        console.log(`TITLE: ${article.title}`);
        console.log(`SUBTITLE: ${article.subtitle}`);
        console.log('--- BODY HTML ---');
        console.log(article.body_html);
        console.log('--- END ARTICLE ---');
    }
}

fetchBatch();
