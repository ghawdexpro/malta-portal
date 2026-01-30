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
        slug: 'best-restaurants-malta-locals-recommend',
        title: 'Where Locals Eat: A No-Nonsense Restaurant Guide',
        subtitle: 'Avoid the tourist traps with photos of food outside. Eat here instead.',
        body_html: `
<p>Malta is full of tourist traps serving frozen pizza and "traditional" rabbit that tastes like shoe leather. But if you know where to go, the food here is incredible. Here is my list of places that won't rip you off.</p>

<h2>For Maltese Food (The Real Deal)</h2>
<ul>
<li><strong>United Restaurant (Mgarr):</strong> It looks like a wedding venue from 1995. But the rabbit (Fenek) and snails are legendary. It's where Maltese families go for Sunday lunch.</li>
<li><strong>Gululu (St. Julian's):</strong> A rare gem in a tourist area that serves actual good local food. Great ftira and views of Spinola Bay.</li>
</ul>

<h2>For Seafood</h2>
<ul>
<li><strong>Tartarun (Marsaxlokk):</strong> High-end, expensive, worth it. The tuna tartare is life-changing.</li>
<li><strong>Roots (Marsaxlokk):</strong> Casual, right on the waterfront. Get the catch of the day.</li>
</ul>

<h2>Street Food & Cheap Eats</h2>
<ul>
<li><strong>Crystal Palace (Rabat):</strong> The Holy Grail of pastizzi. Open almost 24/7. 50 cents of pure joy.</li>
<li><strong>Buchman’s Snack Bar (Gzira):</strong> The best tuna ftira on the island. Massive portion for peanuts.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Portions in Malta are huge. I mean it. A "starter" of pasta is often a full meal elsewhere. Check other tables before you order three courses.
</div>
`
    },
    {
        slug: 'malta-beaches-complete-guide',
        title: 'The Truth About Beaches in Malta',
        subtitle: 'Looking for endless white sand? You might be disappointed. Here is where to actually swim.',
        body_html: `
<p>Spoiler alert: Malta is a rock. Most "beaches" are flat rocks. But that's actually better – no sand in your swimsuit and the water is crystal clear.</p>

<h2>Sandy Beaches (If You Must)</h2>
<ul>
<li><strong>Golden Bay:</strong> Beautiful, golden sand, easy parking. Crowded but classic.</li>
<li><strong>Ghajn Tuffieha (Riviera):</strong> Right next to Golden Bay but down 200 stairs. Fewer people, better vibe, wilder. Go here.</li>
<li><strong>Mellieha Bay:</strong> Huge, shallow for 50 meters. Great for kids, boring for adults.</li>
</ul>

<h2>Rocky Spots (The Local Way)</h2>
<ul>
<li><strong>St. Peter's Pool:</strong> A natural swimming pool carved into the rock. Jump from the cliffs. No shade, bring water.</li>
<li><strong>Ghar Lapsi:</strong> A fisherman's cove with incredibly blue water. Great for snorkeling.</li>
</ul>

<h2>The Blue Lagoon Trap</h2>
<p>It looks like paradise on Instagram. In reality, it's packed with 5,000 people fighting for a square inch of rock. Go at 8:00 AM or after 4:00 PM. In the middle of the day? Forget it.</p>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Buy "reef shoes" (ugly rubber shoes). The rocks are sharp and there are sea urchins. You will look uncool, but your feet will thank you.
</div>
`
    },
    {
        slug: 'getting-around-malta-transport-guide',
        title: 'Maltese Transport: A Survival Guide',
        subtitle: 'Buses, ferries, and why you probably shouldn\'t rent a car.',
        body_html: `
<p>Getting around Malta is... an experience. The distances are short, but the traffic is biblical.</p>

<h2>1. The Bus (Tallinja)</h2>
<p>Pros: Cheap (€2). Air-conditioned. Cons: They are never on time. If they are full, they don't stop.
<br><strong>Pro tip:</strong> Always wave at the driver. If you stand still, he will drive past you.</p>

<h2>2. Ride Apps (Bolt / Uber / eCabs)</h2>
<p>The savior. Bolt is everywhere. Prices are reasonable. If you are a group of 2-3, it's often cheaper than the bus and 10x faster.</p>

<h2>3. The Ferry (Valletta-Sliema / Valletta-Three Cities)</h2>
<p>The best way to travel. 5 minutes across the harbour. Beautiful views, fresh air, no traffic. Use it.</p>

<h2>4. Renting a Car</h2>
<p>Maltese drive on the <strong>left</strong>. They drive aggressively. The roads are narrow. Parking doesn't exist. Unless you are going to Gozo or remote cliffs, skip the rental. It's more stress than freedom.</p>

<blockquote class="monika-quote">
<strong>Don't trust Google Maps travel times.</strong> If it says 15 minutes, it means 30 minutes. If it rains? It means an hour.
</blockquote>
`
    },
    {
        slug: 'where-to-stay-malta-accommodation',
        title: 'Where to Stay: Sliema vs Valletta vs St. Paul\'s',
        subtitle: 'Choosing your base is crucial. Choose wrong, and you\'ll spend your holiday in traffic.',
        body_html: `
<p>Malta looks small, but location matters. Here is the breakdown.</p>

<h2>1. Sliema & St. Julian's (The Hub)</h2>
<p><strong>Vibe:</strong> Busy, modern, lots of bars, restaurants, and shopping.
<br><strong>Best for:</strong> People who want action, nightlife, and good transport links (ferry to Valletta).
<br><strong>Cons:</strong> Concrete jungle, noisy, no sandy beaches.</p>

<h2>2. Valletta (The Romance)</h2>
<p><strong>Vibe:</strong> History, wine bars, boutique hotels.
<br><strong>Best for:</strong> Couples, culture lovers, luxury.
<br><strong>Cons:</strong> Expensive. Can be quiet late at night.</p>

<h2>3. St. Paul's Bay / Bugibba (The Budget)</h2>
<p><strong>Vibe:</strong> Tourist resort, British pubs, English breakfasts.
<br><strong>Best for:</strong> Families on a budget.
<br><strong>Cons:</strong> Far from Valletta (1 hour by bus), architecture is ugly.</p>

<h2>4. Mellieha (The Beach)</h2>
<p><strong>Vibe:</strong> Relaxed, hilltop village near the sand.
<br><strong>Best for:</strong> Beach bums and families.
<br><strong>Cons:</strong> You need a car (it's hilly), far from everything else.</p>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Split your stay. Do 3 nights in Malta (Sliema/Valletta) and 2 nights in Gozo (rent a farmhouse with a pool). Gozo is magic at night.
</div>
`
    },
    {
        slug: 'malta-prices-budget-guide-2026',
        title: 'Malta Prices 2026: Is It Expensive?',
        subtitle: 'What things really cost, from coffee to hotels. Plan your budget.',
        body_html: `
<p>Malta isn't the budget destination it was 10 years ago. Prices have gone up, but it's still cheaper than London or Paris.</p>

<h2>The Index (2026 Prices)</h2>
<ul>
<li><strong>Coffee:</strong> €2.50</li>
<li><strong>Pastizzi:</strong> €0.50 - €0.70</li>
<li><strong>Pint of Beer:</strong> €3.50 - €5.00</li>
<li><strong>Bus Ticket:</strong> €2.50</li>
<li><strong>Pizza/Pasta:</strong> €12 - €16</li>
<li><strong>Main Course (Rabbit/Fish):</strong> €22 - €28</li>
<li><strong>Entry to Museum:</strong> €6 - €10</li>
</ul>

<h2>Budget Tips</h2>
<p>1. <strong>Drink local wine/beer:</strong> Cisk (beer) and local wine are cheaper than imported stuff.
<br>2. <strong>Eat street food:</strong> Pastizzi and Ftira are dirt cheap and filling.
<br>3. <strong>Get the Heritage Pass:</strong> If you plan to visit 3+ museums, it saves you money.</p>

<blockquote class="monika-quote">
<strong>Tap water caveat:</strong> Bottled water adds up. Buy huge 6-packs from supermarkets (Lidl/Welbee's) instead of small bottles at tourist kiosks.
</blockquote>
`
    },
    {
        slug: 'malta-sightseeing-must-see-attractions',
        title: 'Sightseeing: Top 5 Hits (And 3 Misses)',
        subtitle: 'Don\'t waste your time. Here is what is actually worth seeing.',
        body_html: `
<p>You can't see everything. Here is my curated list.</p>

<h2>The HITS (Do Not Miss)</h2>
<ol>
<li><strong>Valletta City Gate to St. Elmo:</strong> Just walk. Look up at the balconies. It's an open-air museum.</li>
<li><strong>Mdina at Night:</strong> During the day it's crowded. At night it's empty and hauntingly beautiful.</li>
<li><strong>Upper Barrakka Gardens:</strong> The view. Just go.</li>
<li><strong>Blue Grotto Viewpoint:</strong> You don't even need to take the boat. The view from the top is spectacular (and free).</li>
<li><strong>St. John's Co-Cathedral:</strong> The only church you need to pay for. It's mind-blowing.</li>
</ol>

<h2>The MISSES (Skip It)</h2>
<ol>
<li><strong>Popeye Village:</strong> Cute from the cliff opposite (free view). Inside? Expensive and childish. Unless you have toddlers.</li>
<li><strong>Paceville at Night:</strong> Unless you are 18 and wasted. It's dirty and loud.</li>
<li><strong>The Aquarium:</strong> It's fine. But you're on an island surrounded by real sea. Go snorkeling instead.</li>
</ol>
`
    },
    {
        slug: 'malta-events-festivals-calendar',
        title: 'Festivals: Why Malta Is Always Partying',
        subtitle: 'Fireworks, saints, and wine. The Maltese know how to celebrate.',
        body_html: `
<p>Summer in Malta means <strong>Festa</strong> season. Every weekend, a different village celebrates its patron saint. It involves:</p>
<ul>
<li>Huge statues carried through the streets.</li>
<li>Marching bands.</li>
<li>Confetti cannons.</li>
<li><strong>Fireworks.</strong> Insane amounts of fireworks.</li>
</ul>

<h2>Key Dates</h2>
<ul>
<li><strong>Carnival (Feb):</strong> Colourful floats in Valletta. Weird, macabre costumes in Nadur (Gozo).</li>
<li><strong>Santa Marija (Aug 15):</strong> The biggest festa of the year. The island shuts down.</li>
<li><strong>Notte Bianca (Oct):</strong> All museums in Valletta sparkle open for free all night. Fantastic vibe.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
If you hear bombs exploding at 8:00 AM, don't panic. It's just the village celebrating. Yes, they love fireworks that much.
</div>
`
    },
    {
        slug: 'malta-practical-tips-first-time',
        title: '25 Things No One Tells You About Malta',
        subtitle: 'Survival tips for first-timers. Read this before you pack.',
        body_html: `
<p>1. <strong>Three-pin plugs:</strong> Malta uses British style plugs (Type G). Bring an adapter.
<br>2. <strong>Driving:</strong> Left side. Roundabouts are fierce. Look right!
<br>3. <strong>Shops on Sunday:</strong> Most supermarkets close early or are closed. Plan ahead.
<br>4. <strong>Dress Code:</strong> Churches are strict. Cover shoulders and knees or buy a shawl at the door.
<br>5. <strong>Cockroaches:</strong> In summer, big flying ones appear on streets. They are harmless but gross. Locals call them "cucarachas".
<br>6. <strong>English:</strong> Everyone speaks it. It's an official language.
<br>7. <strong>Safety:</strong> Malta is incredibly safe. Violent crime is rare.</p>

<blockquote class="monika-quote">
<strong>Politeness:</strong> Maltese people are loud. They aren't fighting, they are just chatting. Don't be alarmed by the volume.
</blockquote>
`
    },
    {
        slug: 'gozo-complete-travel-guide',
        title: 'Gozo Guide: The Island of Calypso',
        subtitle: 'Why you should spend more than one day on Malta\'s sister island.',
        body_html: `
<p>Most people day-trip to Gozo. Big mistake. Gozo deserves amazing 2-3 days.</p>

<h2>What is Different?</h2>
<p>Everything is greener, slower, and steeper. The dialect is different. The bread is different. Even the cheese is different (Gbejna – try the peppered ones).</p>

<h2>Must See</h2>
<ul>
<li><strong>Wied il-Ghasri:</strong> A sea cayon/fjord. Stunning swimming spot.</li>
<li><strong>Salt Pans (Xwejni):</strong> Roman-era salt pans cut into the rock. Looks like an alien landscape.</li>
<li><strong>Ta' Pinu Basilica:</strong> A massive church in the middle of nowhere. A place of miracles.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Rent a Quad Bike. Gozo's roads are rough and hilly. A quad is the most fun way to explore the hidden cliffs where cars can't go.
</div>
`
    },
    {
        slug: 'en-temples-older-than-pyramids',
        title: 'Temples Older Than the Pyramids',
        subtitle: 'Malta had civilization when the rest of Europe was still figuring out sticks.',
        body_html: `
<p><strong>Ggantija</strong>. <strong>Hagar Qim</strong>. <strong>Mnajdra</strong>. Hard to pronounce, harder to believe. These temples are 5,500 years old. That's older than the Pyramids of Giza. Older than Stonehenge.</p>

<h2>The Mystery</h2>
<p>Who built them? A peaceful society of farmers? Giants (as legends say)? We call them "Temple People". They moved 50-ton stones without wheels. And then, around 2500 BC, they just vanished.</p>

<h2>Which One to Visit?</h2>
<p>If you only see one site, make it <strong>Hagar Qim & Mnajdra</strong>. They sit on a cliff overlooking the sea. The setting is dramatic, the stones are massive, and the museum is excellent.</p>

<blockquote class="monika-quote">
<strong>Hypogeum:</strong> The underground temple. It's UNESCO protected and allows only 80 people a day. Tickets sell out 3 months in advance. If you want to see it, book NOW.
</blockquote>
`
    },
    {
        slug: 'en-strait-street-the-gut',
        title: 'Strait Street: The Sin City of Valletta',
        subtitle: 'From brothels and brawls to wine bars and jazz. The resurrection of "The Gut".',
        body_html: `
<p>For decades, no respectable specialist would walk down Strait Street. It was "The Gut" – the place where British sailors came to drink, fight, and find female company.</p>

<h2>The Renaissance</h2>
<p>Today, Strait Street is the coolest address in town. The old brothels are now trendy whiskey bars. The cellars are jazz clubs. But the vibe remains – narrow, dark, and full of stories.</p>

<h2>Where to Drink</h2>
<ul>
<li><strong>Tico Tico:</strong> Iconic. Sit on the steps outside with a cocktail.</li>
<li><strong>StrEm:</strong> Great for whisky lovers.</li>
<li><strong>Yard 32:</strong> Gin & Tapas bar. Hundreds of gins to choose from.</li>
</ul>
`
    },
    {
        slug: 'en-malta-fortifications',
        title: 'Fortress Malta: 7000 Years of Defense',
        subtitle: 'Why Malta looks like one giant castle. Walking the walls.',
        body_html: `
<p>Malta is the most fortified place on Earth. Everywhere you look: walls, bastions, towers, forts. Why? Because everyone wanted to own this rock. Romans, Arabs, Knights, French, British.</p>

<h2>Best Fort Walks</h2>
<ul>
<li><strong>Victoria Lines:</strong> The "Great Wall of Malta". Built by Brits effectively cutting the island in half. Great for hiking.</li>
<li><strong>Valletta Circuit:</strong> Walk the perimeter of the capital. You will pass Fort St. Elmo and see the massive scale of the defenses.</li>
<li><strong>The Three Cities:</strong> The Cottonera Lines are massive and largely unexplored by tourists.</li>
</ul>
`
    },
    {
        slug: 'en-diving-malta-crystal-waters',
        title: 'Diving in Malta: Wrecks and Caves',
        subtitle: 'Voted the best diving destination in Europe. Here is why.',
        body_html: `
<p>The water here is insanely clear (30m visibility). And because of the wars, the seabed is littered with cool stuff to look at.</p>

<h2>Top Dives</h2>
<ul>
<li><strong>The Blue Hole (Gozo):</strong> A vertical chimney that leads into the open sea. World famous.</li>
<li><strong>HMS Maori (Valletta):</strong> A WWII destroyer in shallow water (14m). Easy dive for beginners.</li>
<li><strong>Um El Faroud (Zurrieq):</strong> An oil tanker scuttled as a reef. Massive engine room penetration.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Not a diver? Try a "Discovery Dive". It costs around €50, takes 3 hours, and you get to breathe underwater with an instructor. Be careful – it's addictive.
</div>
`
    },
    {
        slug: 'en-pastizzi-malta-street-food',
        title: 'Pastizzi: 50 Cents of Happiness',
        subtitle: 'The greasy, flaky, calorie-bomb that fuels the nation.',
        body_html: `
<p>You cannot understand Malta without understanding the Pastizz.</p>

<h2>What is it?</h2>
<p>Diamond-shaped phyllo pastry. Stuffed with hot Ricotta (cheese) or Mushy Peas (pizelli). That's it.</p>

<h2>The Rules</h2>
<p>1. Eat it hot (burn your tongue slightly).
<br>2. Eat it with a glass of tea in a glass (yes, tea in a glass).
<br>3. Prepare to get flakes all over your clothes. It's inevitable.</p>

<p><strong>Cost:</strong> Approx €0.50 - €0.70.
<br><strong>Calories:</strong> Don't ask. Just enjoy.</p>
`
    },
    {
        slug: 'en-malta-film-locations',
        title: 'Hollywood on the Rock: Filmed in Malta',
        subtitle: 'Gladiator, Troy, Game of Thrones. Walk the sets of your favorite movies.',
        body_html: `
<p>Malta is the chameleon of cinema. It has played Rome, Greece, Jerusalem, and King's Landing.</p>

<h2> The List</h2>
<ul>
<li><strong>Game of Thrones (Season 1):</strong> Mdina Gate was King's Landing Gate. Azure Window (Gone) was the Dothraki Wedding. Fort Ricasoli was the Red Keep.</li>
<li><strong>Gladiator:</strong> The Colosseum was built (partially) at Fort Ricasoli.</li>
<li><strong>Troy:</strong> The Blue Lagoon was where Brad Pitt walked on the beach.</li>
<li><strong>Popeye:</strong> They built a whole cartoon village in Anchor Bay. It's still there.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
The nicest film location is <strong>Mtaħleb Cliffs</strong> (where Khaleesi emerged from the fire with dragons). It's remote, scenic, and epic for sunsets.
</div>
`
    },
    {
        slug: 'en-maltese-wine-revolution',
        title: 'Maltese Wine: Surprisingly Good',
        subtitle: 'It used to be vinegar. Now it wins awards. Here is what to drink.',
        body_html: `
<p>Don't turn your nose up. Maltese winemaking has exploded in quality.</p>

<h2>Grape Varieties</h2>
<p>Look for the indigenous grapes you can't find elsewhere:</p>
<ul>
<li><strong>Girgentina (White):</strong> Crisp, light, fruity. Perfect for hot days.</li>
<li><strong>Gellewza (Red/Rose):</strong> Often made Frizzante (sparkling). Sweet, strawberry notes.</li>
</ul>

<h2>Wineries</h2>
<p><strong>Meridiana</strong> (Ta' Qali) makes world-class wines (try the Isis Chardonnay). <strong>Ta' Mena</strong> (Gozo) offers rustic, farmhouse-style wines.</p>
`
    },
    {
        slug: 'en-caravaggio-in-malta',
        title: 'Caravaggio: The Murderer Who Painted God',
        subtitle: 'He came, he painted, he escaped prison. The drama of Caravaggio in Malta.',
        body_html: `
<p>Caravaggio was a genius. He was also a violent thug on the run from a death sentence in Rome. The Knights of Malta took him in.</p>

<h2>The Masterpiece</h2>
<p>In St. John's Co-Cathedral hangs <strong>"The Beheading of St. John the Baptist"</strong>. It is huge. It is brutal. And it is the only painting he ever signed (in the blood of the saint). Seeing it in person gives you chills.</p>

<h2>The Escape</h2>
<p>He couldn't behave. He beat up a Knight and was thrown into the dungeon at Fort St. Angelo. He escaped (impossible without help) and fled to Sicily. The Knights expelled him in disgrace. typical rockstar behavior.</p>
`
    },
    {
        slug: 'en-grand-masters-palace',
        title: 'The Grand Master\'s Palace',
        subtitle: 'Armour, gold, and power. Inside the Knights\' HQ.',
        body_html: `
<p>This was the White House of the Mediterranean for 250 years. The Grand Master ruled from here.</p>

<h2>What to See</h2>
<ul>
<li><strong>The Armoury:</strong> Rows of polished suits of armour. Some have bullet dents (proof testing). It shows you these guys weren't just for show.</li>
<li><strong>The State Rooms:</strong> Currently the office of the President. The tapestries and frescoes are overwhelming.</li>
</ul>
`
    },
    {
        slug: 'en-st-pauls-catacombs',
        title: 'St. Paul\'s Catacombs: Underground City',
        subtitle: 'A labyrinth of tombs beneath the streets of Rabat.',
        body_html: `
<p>Before cemeteries, we had catacombs. Miles of tunnels cut into the rock where Romans, Christians, and Jews buried their dead together.</p>

<p>It's cool, dark, and slightly spooky. You can walk through the tunnels and see the "Agape Tables" – round stone tables where families ate meals with their dead ancestors. (Yes, really).</p>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
It's a great escape from the summer heat. Down there, it's always a cool 18 degrees.
</div>
`
    }
];

async function updateBatch2() {
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
            console.log('✅ Updated: ' + update.slug);
        }
    }
}

updateBatch2();
