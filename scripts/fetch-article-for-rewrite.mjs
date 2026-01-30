import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// import { GoogleGenerativeAI } from '@google/generative-ai'; // We don't have this, we use the tool

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const geminiKey = process.env.GEMINI_API_KEY; // Not using direct API

const supabase = createClient(supabaseUrl, supabaseServiceKey);
// const genAI = new GoogleGenerativeAI(geminiKey);

// We need to output the content for the KEY articles.
// To avoid complexity of calling LLM from node here without the library installed or key configured in the env for the library
// I will instead output the CONTENT of the article to the console, 
// and the AGENT (me) will physically rewrite it using my internal LLM and then UPDATE it via a second script or SQL.
// THIS IS SAFER and ensures I control the voice perfectly.

async function fetchArticle(slug) {
    const { data: article, error } = await supabase
        .from('articles')
        .select('id, title, body_html, subtitle')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(error);
        process.exit(1);
    }

    console.log(`--- START ARTICLE: ${article.title} ---`);
    console.log(`SUBTITLE_CURRENT: ${article.subtitle}`);
    console.log('--- BODY HTML ---');
    console.log(article.body_html);
    console.log('--- END ARTICLE ---');
}

// Default to Valletta if no arg
const slug = process.argv[2] || 'valletta-sladami-maklowicza-spacer-po-stolicy-twierdzy';
fetchArticle(slug);
