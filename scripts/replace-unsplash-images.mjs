import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map every Unsplash article to a Monika image
const MAPPINGS = [
  // EN articles
  { slug: 'en-diving-malta-crystal-waters', image: '/images/monika/articles/diving_boat.png' },
  { slug: 'en-temples-older-than-pyramids', image: '/images/monika/articles/hagar_qim.png' },
  { slug: 'en-st-pauls-catacombs', image: '/images/monika/articles/catacombs.png' },
  { slug: 'en-maltese-wine-revolution', image: '/images/monika/articles/wine_tasting.png' },
  { slug: 'en-grand-masters-palace', image: '/images/monika/articles/grand_master_palace.png' },
  { slug: 'en-maltese-cuisine-complete-guide', image: '/images/monika/page/experience_food.png' },
  { slug: 'malta-beaches-complete-guide', image: '/images/monika/articles/golden_bay.png' },
  { slug: 'getting-around-malta-transport-guide', image: '/images/monika/page/experience_transport.png' },
  { slug: 'malta-prices-budget-guide-2026', image: '/images/monika/page/experience_prices.png' },
  { slug: 'where-to-stay-malta-accommodation', image: '/images/monika/page/experience_accommodation.png' },
  { slug: 'malta-sightseeing-must-see-attractions', image: '/images/monika/page/experience_sightseeing.png' },
  { slug: 'malta-events-festivals-calendar', image: '/images/monika/articles/festivals.png' },
  { slug: 'malta-practical-tips-first-time', image: '/images/monika/page/experience_sightseeing.png' },
  { slug: 'gozo-complete-travel-guide', image: '/images/monika/articles/gozo_ferry.png' },
  { slug: 'best-restaurants-malta-locals-recommend', image: '/images/monika/articles/restaurants.png' },
  // PL articles
  { slug: 'najlepsze-restauracje-malta', image: '/images/monika/articles/restaurants.png' },
  { slug: 'pl-kuchnia-maltanska-kompletny-przewodnik', image: '/images/monika/page/experience_food.png' },
];

let success = 0;
let failed = 0;

for (const { slug, image } of MAPPINGS) {
  const { error } = await supabase
    .from('articles')
    .update({ cover_image: image, updated_at: new Date().toISOString() })
    .eq('slug', slug);
  
  if (error) {
    console.error(`FAIL ${slug}:`, error.message);
    failed++;
  } else {
    console.log(`OK ${slug} → ${image}`);
    success++;
  }
}

console.log(`\nDone: ${success} updated, ${failed} failed`);
