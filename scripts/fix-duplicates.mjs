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
    // 1. Knights & Fortifications -> diversify from Palace
    {
        slugs: ['en-knights-of-malta-history', 'pl-rycerze-maltanscy-historia'],
        image: '/images/monika/articles/fort_st_elmo.png' // Knights defended St Elmo.
    },
    {
        slugs: ['pl-fortyfikacje-malty', 'en-malta-fortifications'],
        image: '/images/monika/articles/fort_st_angelo.png' // The other great fort.
    },

    // 2. Gozo -> diversify from Victoria/Citadel
    {
        slugs: ['gozo-kompletny-przewodnik'],
        image: '/images/monika/articles/gozo_ferry.png' // The journey
    },
    {
        slugs: ['pl-gozo-zielona-wyspa-maklowicza', 'en-gozo-maklowicz-island'],
        image: '/images/monika/articles/blue_lagoon.png' // Nature/Green aspect
    },

    // 3. Valletta -> diversify from UNESCO
    {
        slugs: ['pl-valletta-sladami-maklowicza', 'en-valletta-following-maklowicz'],
        image: '/images/monika/articles/baroque.png' // City of Baroque
    },
    // UNESCO article keeps unesco.png

    // 4. Tips -> diversify
    {
        slugs: ['pl-porady-maklowicza-dla-turystow', 'en-maklowicz-tips-for-tourists'],
        image: '/images/monika/page/experience_transport.png' // Practical tips asset
    },

    // 5. History -> diversify from Hagar Qim
    {
        slugs: ['pl-7000-lat-historii-malty'],
        image: '/images/monika/articles/mdina_night.png' // History = Silent City? Or maybe just keep sharing if needed.
        // Actually, Mdina Night is distinct.
    }
];

async function fixDuplicates() {
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
            console.log(`✅ Updated: ${fix.slugs.join(', ')} -> ${fix.image}`);
        }
    }
}

fixDuplicates();
