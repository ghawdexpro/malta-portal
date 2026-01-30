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

// Using the premium food experience image which is verified high quality
const PREMIUM_FOOD_IMAGE = '/images/monika/page/experience_food.png';

const ARTICLES_TO_FIX = [
    'pl-pastizzi-street-food-malty',
    'en-pastizzi-malta-street-food'
];

async function fixPastizziImage() {
    const { data, error } = await supabase
        .from('articles')
        .update({
            cover_image: PREMIUM_FOOD_IMAGE,
            updated_at: new Date().toISOString()
        })
        .in('slug', ARTICLES_TO_FIX)
        .select();

    if (error) {
        console.error('Failed to update Pastizzi image:', error);
    } else {
        console.log(`✅ Updated ${data.length} articles to use premium food image: ${PREMIUM_FOOD_IMAGE}`);
        data.forEach(a => console.log(`   - ${a.slug}`));
    }
}

fixPastizziImage();
