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

async function findMaklowicz() {
    // Fetch all Polish articles (assuming slug starts with 'pl-' or strictly not starting with 'en-')
    // We'll broaden the search to be safe.
    const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, title, subtitle, body_html')
        // We can't easily filter by "starts with pl-" efficiently in one go if slugs vary, 
        // but we can fetch them all and filter in JS for the "Makłowicz" check.
        // Given the count (around 70), this is cheap.
        .not('slug', 'ilike', 'en-%');

    if (error) {
        console.error(error);
        return;
    }

    const keyword = 'Makłowicz';
    const keywordLower = keyword.toLowerCase();

    const offenders = [];

    for (const article of articles) {
        const inTitle = article.title?.toLowerCase().includes(keywordLower);
        const inSubtitle = article.subtitle?.toLowerCase().includes(keywordLower);
        const inBody = article.body_html?.toLowerCase().includes(keywordLower);

        if (inTitle || inSubtitle || inBody) {
            offenders.push({
                slug: article.slug,
                foundIn: [
                    inTitle ? 'TITLE' : '',
                    inSubtitle ? 'SUBTITLE' : '',
                    inBody ? 'BODY' : ''
                ].filter(Boolean).join(', ')
            });
        }
    }

    if (offenders.length > 0) {
        console.log(`\n🚨 FOUND 'Makłowicz' IN ${offenders.length} ARTICLES:`);
        offenders.forEach(o => console.log(`- [${o.foundIn}] ${o.slug}`));

        // Also export the full content of offenders so we can see context if needed, 
        // but listing slugs is enough to trigger the rewrite.
    } else {
        console.log('\n✅ NO "Makłowicz" references found in Polish articles.');
    }
}

findMaklowicz();
