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

const UPDATES = [
    {
        slug: 'en-grand-masters-palace',
        title: 'The Grand Master\'s Palace: Malta\'s White House',
        subtitle: 'Politics, armour, and ghosts. Inside the building that ruled the Mediterranean.',
        body_html: `
<p>This building has seen everything. It housed the Grand Masters (the Kings of their time), Napoleon (for 6 days), the British Governors, and now the President of Malta.</p>

<p>It sits right in the middle of Valletta. You can't miss it. It's the one with the guards out front who change shifts every hour (watch them, it's a fun show).</p>

<h2>The Armoury</h2>
<p>This is the highlight. It's one of the world's largest collections of arms and armour. You'll see thousands of muskets, swords, and massive suits of armour. Some have dents in them – proof that they actually stopped bullets.</p>

<h2>The State Rooms</h2>
<p>Walk through the corridors where history was made. The <strong>Gobelin Tapestries</strong> are priceless. They were a gift from a wealthy Grand Master and are the only complete set of their kind in the world.</p>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Look at the floor. No, seriously. The marble coats of arms are inlaid into the floor. But watch out – in some rooms, you are not allowed to walk on the marble (heels damage it), so stick to the carpets!
</div>
`
    },
    {
        slug: 'en-caravaggio-in-malta',
        title: 'Caravaggio: The Bad Boy of Baroque',
        subtitle: 'He came, he painted, he murdered (almost). The wild story of Art\'s greatest rebel in Malta.',
        body_html: `
<p>Caravaggio wasn't just a painter. He was a fugitive. He came to Malta running from a death sentence in Rome (he killed a guy over a tennis match). The Knights welcomed him because they wanted his talent.</p>

<h2>The Masterpiece</h2>
<p>He painted <strong>"The Beheading of St. John the Baptist"</strong> for the Co-Cathedral. It's his largest work. It's dark, brutal, and terrifyingly realistic. It's the only painting he ever signed – and he signed it <em>in the blood</em> spilling from the saint's neck.</p>

<h2>The Fall</h2>
<p>He couldn't stay out of trouble. He got into a brawl with a Knight, was thrown into the dungeon at Fort St. Angelo, and managed to escape (which is impossible, so he definitely had help). The Knights expelled him in disgrace.</p>

<blockquote class="monika-quote">
<strong>Where to see it:</strong> St. John's Co-Cathedral in Valletta. Go early to avoid the crowds. Standing in front of that painting is a spiritual experience, even if you're an atheist.
</blockquote>
`
    },
    {
        slug: 'en-maltese-wine-revolution',
        title: 'Maltese Wine: A Hidden Gem',
        subtitle: 'Forget what you heard. Maltese wine is now winning awards. Here is what to drink.',
        body_html: `
<p>Twenty years ago, Maltese wine was used for cooking or getting a headache. Today? It's excellent. The soil is rich, the sun is hot, and the winemakers have upped their game.</p>

<h2>Grape Varieties (The Local Stuff)</h2>
<ul>
<li><strong>Girgentina (White):</strong> Crisp, light, and citrusy. It pairs perfectly with local fish.</li>
<li><strong>Gellewza (Red/Rose):</strong> Often made into a sparkling wine ("Frizzante"). It tastes like strawberries and summer. Excellent with pizza or a Maltese platter.</li>
</ul>

<h2>Wineries to Visit</h2>
<ul>
<li><strong>Meridiana (Ta' Qali):</strong> Located next to Mdina on an old airfield. Their "Isis" (Chardonnay) and "Nexus" (Merlot) are world-class.</li>
<li><strong>Marsovin:</strong> They have 400-year-old cellars under Valletta. Book a tour and tasting.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
In a restaurant, don't be afraid to ask for the "House Wine" if it's local. It's often surprisingly good and much cheaper than imported Italian bottles.
</div>
`
    },
    {
        slug: 'en-pastizzi-malta-street-food',
        title: 'Pastizzi: The 50-Cent Miracle',
        subtitle: 'Greasy, flaky, and absolutely delicious. The snack that powers the island.',
        body_html: `
<p>You haven't been to Malta until you've burned your tongue on a pastizz.</p>

<h2>What Is It?</h2>
<p>It's a diamond-shaped pastry made of phyllo dough (like a croissant but crunchier), filled with either:</p>
<ul>
<li><strong>Ricotta (Cheese):</strong> Soft, creamy, slightly salty.</li>
<li><strong>Pizelli (Peas):</strong> Mushy curry peas. Savory and hearty.</li>
</ul>

<h2>The Culture</h2>
<p>Pastizzi are everywhere. "Going for tea and pastizzi" is a national pastime. They are cheap (around €0.50), high in calories, and zero in health benefits. But who cares?</p>

<div class="monika-tip">
<strong>💡 WHERE TO GET THE BEST:</strong>
<strong>Crystal Palace (Is-Serkin)</strong> in Rabat. It's an institution. It's open nearly 24/7. Grab a couple, a glass of tea (served in a glass, British style), and sit on the bench outside watching the world go by.
</div>
`
    },
    {
        slug: 'en-strait-street-the-gut',
        title: 'Strait Street: From Sin to Gin',
        subtitle: 'Valletta\'s most infamous street is now its coolest nightlife spot.',
        body_html: `
<p>They called it "The Gut". For decades, Strait Street was where British and American sailors went for prostitutes, booze, and fights. Proper Maltese ladies would cross themselves before walking near it.</p>

<h2>The Transformation</h2>
<p>Today, the brothels are gone (mostly). In their place are trendy wine bars, jazz clubs, and restaurants. The street is narrow – barely wide enough for two people – which creates an incredible, intimate atmosphere.</p>

<h2>Where to Go</h2>
<ul>
<li><strong>Tico Tico:</strong> The pioneer of the revival. Great cocktails, retro vibe.</li>
<li><strong>Carmen's Bar:</strong> Named after a famous... hostess... from the old days. Now serves craft beer.</li>
<li><strong>Alchemy:</strong> High-end molecular cocktails. Expensive but a show.</li>
</ul>

<blockquote class="monika-quote">
<strong>Best for:</strong> A date night. It's dark, romantic, and has a "forbidden" history that adds to the charm.
</blockquote>
`
    },
    {
        slug: 'en-malta-fortifications',
        title: 'Fortress Malta: The Island of Walls',
        subtitle: '7,000 years of people trying to kill each other result in some impressive architecture.',
        body_html: `
<p>Malta is one giant castle. It looks like it was designed for a siege video game. Romans, Arabs, Knights, British – everyone added a layer of stone.</p>

<h2>Top 3 Fortified Walks</h2>

<h3>1. The Victoria Lines</h3>
<p>Known as the "Great Wall of Malta". The British built it in the 19th century to cut the island in half. It runs along the Great Fault line. The hike from <strong>Gharghur</strong> to <strong>Bingemma</strong> offers insane views.</p>

<h3>2. The Cottonera Lines (Three Cities)</h3>
<p>Massive bastions surrounding Birgu, Senglea, and Cospicua. They are less restored than Valletta, which makes them feel more authentic. You can find old gates and tunnels.</p>

<h3>3. Fort St. Elmo</h3>
<p>The star-shaped fort at the tip of Valletta. It held out for 28 days against the Turks in 1565. Today it houses the <strong>National War Museum</strong>. You can see the "Faith", one of the three planes that defended Malta in WWII.</p>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Walk the perimeter of Valletta at sunset. Start at Fort St. Elmo and walk towards Upper Barrakka. The golden light hitting the honey-colored limestone walls is unforgettable.
</div>
`
    }
];

async function updateFixes() {
    for (const update of UPDATES) {
        const { error } = await supabase
            .from('articles')
            .update({
                title: update.title,
                subtitle: update.subtitle,
                body_html: update.body_html,
                updated_at: new Date().toISOString()
            })
            .eq('slug', update.slug);

        if (error) {
            console.error('Failed update for ' + update.slug + ':', error);
        } else {
            console.log('✅ Updated (Expanded): ' + update.slug);
        }
    }
}

updateFixes();
