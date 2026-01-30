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

async function inspectArticle() {
    const { data: article, error } = await supabase
        .from('articles')
        .select('title, body_html')
        .ilike('title', '%Valletta%')
        .limit(1)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    console.log(`--- Title: ${article.title} ---`);
    console.log(article.body_html);
}

inspectArticle();
