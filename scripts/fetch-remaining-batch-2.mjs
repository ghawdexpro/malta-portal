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

const BATCH_2_SLUGS = [
    'pl-7000-lat-historii-malty',
    'pl-cytadela-gozo-twierdza',
    'pl-rabat-ciche-miasteczko',
    'pl-victoria-stolica-gozo',
    'pl-pastizzi-street-food-malty',
    'pl-unesco-malta-co-zobaczyc',
    'pl-fort-sw-aniola-birgu'
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
