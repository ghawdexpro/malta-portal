import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SPECIFIC_MAPPINGS = [
    // Deduplication: Force "Valletta" article to use UNESCO image (since Valletta is UNESCO)
    // so it doesn't clash with "Upper Barrakka" (which uses hero_harbour)
    {
        titleKeywords: ['Valletta', 'Spacer'],
        image: '/images/monika/articles/unesco.png'
    },
    // Upper Barrakka keeps the Hero Harbour view (it IS that view)
    {
        titleKeywords: ['Upper Barrakka'],
        image: '/images/monika/page/hero_harbour.png'
    },
    // Birgu gets Fort St Angelo (it's in Birgu)
    {
        titleKeywords: ['Birgu'],
        image: '/images/monika/articles/fort_st_angelo.png'
    },
    // Siege gets Fort St Elmo (key defense point) so it doesn't share Siege Bell
    {
        titleKeywords: ['Wielkie Oblężenie'],
        image: '/images/monika/articles/fort_st_elmo.png'
    },
    // Knights get Siege Bell (Memorial to fallen)
    {
        titleKeywords: ['Rycerze Maltańscy'],
        image: '/images/monika/articles/siege_bell.png'
    },
    // Fortifications gets Citadel (Victoria) or Hagar Qim? Let's use St Elmo shared actually, it fits best.
    // Or Hagar Qim for "7000 Years".
    {
        titleKeywords: ['Fortyfikacje'],
        image: '/images/monika/articles/fort_st_elmo.png'
    },
    {
        titleKeywords: ['Świątynie', '7000'],
        image: '/images/monika/articles/hagar_qim.png'
    }
];

const GENERAL_MAPPINGS = [
    { image: '/images/monika/articles/street_food.png', keywords: ['Jedzenie Uliczne', 'Pastizzi'] },
    { image: '/images/monika/articles/mdina_night.png', keywords: ['Mdina', 'Ciche Miasto'] },
    { image: '/images/monika/articles/victoria.png', keywords: ['Victoria', 'Cytadela'] }, // Gozo Citadel
    { image: '/images/monika/articles/gozo_ferry.png', keywords: ['Prom na Gozo'] },
    { image: '/images/monika/articles/st_john_cathedral.png', keywords: ['Konkatedra', 'Caravaggio'] },
    { image: '/images/monika/articles/diving_boat.png', keywords: ['Nurkowanie'] },
    { image: '/images/monika/articles/popeye_village.png', keywords: ['Popeye Village', 'Filmowa'] }, // Filmowa might be GoT now?
    { image: '/images/monika/articles/game_of_thrones.png', keywords: ['Game of Thrones', 'Gra o Tron', 'Film Malta'] }, // Explicit GoT
    { image: '/images/monika/articles/strait_street.png', keywords: ['Strait Street', 'Nocne'] },
    { image: '/images/monika/articles/wine_tasting.png', keywords: ['Wino'] },
    { image: '/images/monika/articles/catacombs.png', keywords: ['Katakumby'] },
    { image: '/images/monika/articles/sliema_shopping.png', keywords: ['Zakupy', 'Sliema'] },  // Might not match anything yet
    { image: '/images/monika/articles/grand_master_palace.png', keywords: ['Pałac Wielkiego Mistrza'] },
    // { image: '/images/monika/articles/blue_lagoon.png', keywords: ['Blue Lagoon', 'Comino'] }, // No article match yet
    { image: '/images/monika/articles/golden_bay.png', keywords: ['Plaże', 'Zachód Słońca'] },

    // Practical Guides (Page Assets)
    { image: '/images/monika/page/experience_transport.png', keywords: ['Jak Poruszać Się', 'Autobusy', 'Transport'] },
    { image: '/images/monika/page/experience_accommodation.png', keywords: ['Gdzie Nocować', 'Hotele'] },
    { image: '/images/monika/page/experience_prices.png', keywords: ['Ceny na Malcie', 'Ile Naprawdę Kosztuje'] },
    { image: '/images/monika/page/experience_sightseeing.png', keywords: ['Zwiedzanie Malty', 'Atrakcje'] },

    // New batch
    { image: '/images/monika/articles/fenek_rabbit.png', keywords: ['Fenek', 'Królik'] },
    { image: '/images/monika/articles/st_pauls_bay.png', keywords: ['St Paul\'s Bay', 'Apostoł'] },
    { image: '/images/monika/articles/festivals.png', keywords: ['Wydarzenia', 'Festiwale'] },
    { image: '/images/monika/articles/rabat.png', keywords: ['Rabat'] },
    { image: '/images/monika/articles/baroque.png', keywords: ['Barok'] }
];

async function main() {
    console.log('Updating article images (Refined)...');

    // 1. Specific Mappings (Exact Title Matches)
    console.log('Applying SPECIFIC overrides...');
    for (const map of SPECIFIC_MAPPINGS) {
        // Build an OR query for title contains ANY of the specific keywords (must match ALL in a real exact system, but here we perform a specific search)
        // Actually, let's search where title ILIKE %Keyword1% AND title ILIKE %Keyword2% if possible, or just basic search.
        // Simplified: Loop through and use the first keyword to find, then filter in memory if needed, or just trust the unique keywords provided.

        // We will simple search by the first keyword to be safe, then check client side or just update founds.
        // The arrays in SPECIFIC_MAPPINGS are designed to be unique enough.

        const { data: articles, error } = await supabase
            .from('articles')
            .select('id, title')
            .or(map.titleKeywords.map(k => `title.ilike.%${k}%`).join(','));

        if (error) { console.error(error); continue; }

        for (const article of articles) {
            // Update
            const { error: updateError } = await supabase
                .from('articles')
                .update({ cover_image: map.image })
                .eq('id', article.id);

            if (!updateError) console.log(`✅ [OVERRIDE] "${article.title}" -> ${map.image}`);
        }
    }

    // 2. General Mappings (Fallback/Broad)
    console.log('Applying GENERAL mappings...');
    for (const map of GENERAL_MAPPINGS) {
        const { data: articles, error } = await supabase
            .from('articles')
            .select('id, title, cover_image') // Select cover_image to check if we should overwrite? 
            // Actually, we want to overwrite unless it was just set by specific? 
            // Since this runs second, it might overwrite specific. 
            // We should filtering: only update if it currently looks like a placeholder or we just want to enforce.
            // But we can't easily track "just set".
            // Strategy: The General Mappings should NOT contain the vague keywords that capture the Specific ones.
            // I removed 'Valletta', 'Upper Barrakka', 'Birgu' from General Mappings in the previous step (clean up).
            // Let's rely on that.
            .or(map.keywords.map(k => `title.ilike.%${k}%`).join(','));

        if (error) { console.error(error); continue; }

        if (articles) {
            for (const article of articles) {
                // Update
                const { error: updateError } = await supabase
                    .from('articles')
                    .update({ cover_image: map.image })
                    .eq('id', article.id);
                if (!updateError) console.log(`✅ [GENERAL] "${article.title}" -> ${map.image}`);
            }
        }
    }
    console.log('Done!');
}

main();
