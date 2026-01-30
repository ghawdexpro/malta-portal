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

const FIXES = [
    // 1. Knights: Use Siege Bell (War Memorial) to free up Fort St Elmo for "Siege"
    {
        slugs: ['en-knights-of-malta-history', 'pl-rycerze-maltanscy-historia'],
        image: '/images/monika/articles/siege_bell.png'
    },

    // 2. Fortifications: Use Game of Thrones (Fort Ricasoli) to free up Fort St Angelo
    {
        slugs: ['pl-fortyfikacje-malty', 'en-malta-fortifications'],
        image: '/images/monika/articles/game_of_thrones.png'
    },

    // 3. Birgu: Use Hero Harbour (The view OF Birgu) to free up Fort St Angelo
    {
        slugs: ['pl-birgu-vittoriosa-ukryta-perla', 'en-birgu-vittoriosa-hidden-gem'],
        image: '/images/monika/page/hero_harbour.png'
    },

    // 4. History (7000 Years): Use Hagar Qim (Ancient) to free up Mdina Night
    {
        slugs: ['pl-7000-lat-historii-malty'],
        image: '/images/monika/articles/hagar_qim.png'
    },

    // 5. Street Food (General): Use the original Street Food image (Pastizzi kept the Premium one)
    {
        slugs: ['pl-maltanskie-jedzenie-uliczne'],
        image: '/images/monika/articles/street_food.png'
    },

    // 6. Tips: Use Shopping/Lifestyle to free up Transport
    {
        slugs: ['pl-porady-maklowicza-dla-turystow', 'en-maklowicz-tips-for-tourists'],
        image: '/images/monika/articles/sliema_shopping.png'
    }
];

async function fixFinalDuplicates() {
    for (const fix of FIXES) {
        const { error } = await supabase
            .from('articles')
            .update({
                cover_image: fix.image,
                updated_at: new Date().toISOString()
            })
            .in('slug', fix.slugs);

        if (error) {
            console.error('Failed update for ' + fix.slugs + ':', error);
        } else {
            console.log(`✅ Fixed: ${fix.slugs.join(', ')} -> ${fix.image}`);
        }
    }
}

fixFinalDuplicates();
