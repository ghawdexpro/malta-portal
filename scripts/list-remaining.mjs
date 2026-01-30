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

const PROCESSED = [
    'pl-valletta-sladami-maklowicza',
    'pl-gozo-zielona-wyspa-maklowicza',
    'pl-upper-barrakka-najlepszy-widok',
    'pl-malta-filmowa-game-of-thrones',
    'pl-barok-maltanski-koscioly',
    'pl-birgu-vittoriosa-ukryta-perla',
    'pl-caravaggio-na-malcie',
    'pl-mdina-ciche-miasto',
    'pl-rycerze-maltanscy-historia',
    'pl-palac-wielkiego-mistrza'
];

async function listRemaining() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title')
        .ilike('slug', 'pl-%');

    if (error) {
        console.error(error);
        return;
    }

    const remaining = articles.filter(a => !PROCESSED.includes(a.slug));

    console.log(`--- Total Remaining Polish Articles: ${remaining.length} ---`);
    remaining.forEach(a => console.log(`${a.slug} | ${a.title}`));
}

listRemaining();
