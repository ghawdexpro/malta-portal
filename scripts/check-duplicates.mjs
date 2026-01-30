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

async function checkDuplicates() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title, cover_image')
        .order('cover_image');

    if (error) {
        console.error(error);
        return;
    }

    const map = {};
    articles.forEach(a => {
        const img = a.cover_image || 'NO_IMAGE';
        if (!map[img]) map[img] = [];
        map[img].push(a.slug);
    });

    console.log('\n--- IMAGE DISTRIBUTION ---');
    for (const [img, slugs] of Object.entries(map)) {
        if (slugs.length > 2) { // Show where more than 2 articles share an image (EN + PL = 2 is fine)
            console.log(`\n❌ [${slugs.length} uses] ${img}`);
            slugs.forEach(s => console.log(`   - ${s}`));
        }
    }
}

checkDuplicates();
