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

const MAPPINGS = [
    {
        image: '/images/monika/articles/unesco.png',
        keywords: ['UNESCO', 'Zabytki']
    },
    {
        image: '/images/monika/articles/street_food.png',
        keywords: ['Jedzenie Uliczne', 'Pastizzi']
    },
    {
        image: '/images/monika/articles/mdina_night.png',
        keywords: ['Mdina', 'Ciche Miasto', 'Nocne']
    },
    {
        image: '/images/monika/articles/fort_st_angelo.png',
        keywords: ['Fort św. Anioła', 'Birgu']
    },
    {
        image: '/images/monika/articles/victoria.png',
        keywords: ['Victoria', 'Cytadela']
    },
    {
        image: '/images/monika/articles/gozo_ferry.png',
        keywords: ['Prom na Gozo']
    },
    {
        image: '/images/monika/articles/st_john_cathedral.png',
        keywords: ['Konkatedra', 'Caravaggio']
    },
    {
        image: '/images/monika/articles/siege_bell.png',
        keywords: ['Wielkie Oblężenie', 'Rycerze']
    },
    {
        image: '/images/monika/articles/hagar_qim.png',
        keywords: ['Świątynie', '7000 Lat']
    },
    {
        image: '/images/monika/articles/diving_boat.png',
        keywords: ['Nurkowanie']
    },
    {
        image: '/images/monika/articles/popeye_village.png',
        keywords: ['Popeye Village', 'Filmowa']
    },
    {
        image: '/images/monika/articles/strait_street.png',
        keywords: ['Strait Street', 'Nocne']
    },
    {
        image: '/images/monika/articles/fort_st_elmo.png',
        keywords: ['Fort St Elmo', 'Fort św. Elma']
    },
    {
        image: '/images/monika/articles/wine_tasting.png',
        keywords: ['Wino']
    },
    {
        image: '/images/monika/articles/catacombs.png',
        keywords: ['Katakumby']
    },
    {
        image: '/images/monika/articles/game_of_thrones.png',
        keywords: ['Game of Thrones', 'Gra o Tron']
    },
    {
        image: '/images/monika/articles/sliema_shopping.png',
        keywords: ['Zakupy', 'Sliema']
    },
    {
        image: '/images/monika/articles/grand_master_palace.png',
        keywords: ['Pałac Wielkiego Mistrza']
    },
    {
        image: '/images/monika/articles/blue_lagoon.png',
        keywords: ['Blue Lagoon', 'Comino']
    },
    {
        image: '/images/monika/articles/golden_bay.png',
        keywords: ['Golden Bay', 'Plaże', 'Zachód Słońca']
    }
];

async function main() {
    console.log('Updating article images...');

    for (const map of MAPPINGS) {
        console.log(`Searching for articles matching: ${map.keywords.join(', ')}`);

        // Find articles matching any keyword
        const { data: articles, error } = await supabase
            .from('articles')
            .select('id, title')
            .or(map.keywords.map(k => `title.ilike.%${k}%`).join(','));

        if (error) {
            console.error(`Error searching for ${map.keywords}:`, error.message);
            continue;
        }

        if (articles && articles.length > 0) {
            console.log(`Found ${articles.length} matches. Updating...`);
            for (const article of articles) {
                const { error: updateError } = await supabase
                    .from('articles')
                    .update({ cover_image: map.image })
                    .eq('id', article.id);

                if (updateError) {
                    console.error(`Failed to update article ${article.title}:`, updateError.message);
                } else {
                    console.log(`✅ Updated "${article.title}" -> ${map.image}`);
                }
            }
        } else {
            console.log(`No articles found for ${map.keywords}`);
        }
    }
    console.log('Done!');
}

main();
