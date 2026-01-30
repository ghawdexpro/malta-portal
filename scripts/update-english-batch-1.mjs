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
        slug: 'en-valletta-following-maklowicz',
        title: 'Valletta: The Fortress City Guide',
        subtitle: 'More than just history. It\'s where Michelin stars meet street food and centuries of drama.',
        body_html: `
<p>Valletta isn't your typical capital city. It's a fortress built by gentlemen for gentlemen (or so the Knights claimed). It's a UNESCO site packed into less than 1 square kilometre. You can walk across it in 15 minutes, but you'll need a lifetime to understand it.</p>

<h2>The Vibe</h2>
<p>In the morning, it's business. Lawyers rushing to court, politicians grabbing coffee. By noon, it's tourists. By evening? It's magic. The lights come on, the wine bars open, and the city feels like a movie set.</p>

<h2>Must-Dos (Monika Approved)</h2>
<ul>
<li><strong>Upper Barrakka Gardens:</strong> Yes, it's touristy. But the view of the Grand Harbour is unbeatable. Go at 12:00 or 16:00 to see the cannons fire (and watch tourists jump).</li>
<li><strong>St. John's Co-Cathedral:</strong> Don't let the plain exterior fool you. Inside, it's blindingly gold. And it houses Caravaggio's masterpiece. It's the one church you absolutely cannot skip.</li>
<li><strong>Strait Street:</strong> Once the "Gut" of Valletta where sailors got drunk and worse. Now? It's the coolest place for a cocktail.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Valletta is hilly. Seriously hilly. Wear comfortable shoes or be prepared to suffer. If you're tired, take the <strong>Barrakka Lift</strong> from the harbour up to the gardens (€1). It saves your legs perfectly.
</div>

<blockquote class="monika-quote">
Don't just stick to Republic Street. The real Valletta is in the side streets. Walk down to <strong>St. Ursula Street</strong> for those Instagram-perfect steps and balconies.
</blockquote>
`
    },
    {
        slug: 'en-gozo-maklowicz-island',
        title: 'Gozo: The Slow Living Guide',
        subtitle: 'Malta\'s sister island is greener, quieter, and arguably better. Here is why you need to go.',
        body_html: `
<p>If Malta is the busy, loud big sister, Gozo is the chilled-out middle child who grows their own vegetables and does yoga. Time moves differently here. 25 minutes on the ferry and your blood pressure drops instantly.</p>

<h2>Why Gozo?</h2>
<p>It's rural. It's rugged. It's what Malta used to be 30 years ago. The cliffs are higher, the grass is greener (in winter), and the food is fresher.</p>

<h2>The Highlights</h2>
<ul>
<li><strong>The Citadel (Victoria):</strong> The fortress in the center. Walking the walls gives you a 360-degree view of the whole island.</li>
<li><strong>Dwejra & The Inland Sea:</strong> The Azure Window is gone (RIP), but Dwejra is still spectacular. The Inland Sea is a lagoon connected to the ocean by a tunnel. Take a boat trip through it.</li>
<li><strong>Ramla Bay:</strong> A beach with red sand. Actual red sand. It's wild and beautiful.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Eat at a local bakery. <strong>Mekren</strong> or <strong>Maxokk</strong> in Nadur. They make traditional Gozitan ftira (it looks like pizza but the dough is different and it has potatoes on top). Grab one and eat it on the cliffs. Life goals.
</div>
`
    },
    {
        slug: 'en-maltese-cuisine-complete-guide',
        title: 'Maltese Cuisine: What to Eat (And What to Avoid)',
        subtitle: 'Rabbit, pastry, and bread. The holy trinity of Maltese food. A no-nonsense guide.',
        body_html: `
<p>Maltese food is peasant food. And I mean that as a compliment. It's hearty, seasonal, and designed to keep you full for cheap. It's a mix of Italian (pasta, tomatoes), Arab (spices, pastry), and British (pies, tea) influences.</p>

<h2>The Big Three</h2>
<h3>1. Pastizzi</h3>
<p>Diamond-shaped pastries filled with ricotta or mushy peas. They cost around 50 cents. They are greasy, flaky, and addictive. If you leave Malta without eating one, did you even visit?</p>

<h3>2. Fenek (Rabbit)</h3>
<p> The national dish. Usually fried in garlic and wine or stewed with tomato sauce. It's tender and gamey. Don't be squeamish, it's delicious.</p>

<h3>3. Ftira</h3>
<p>The Maltese bread ring. Crusty on the outside, airy on the inside. Filled with tuna, capers, olives, onions, and tomato paste (kunserva). UNESCO listed it as cultural heritage. Yes, a sandwich is heritage here.</p>

<div class="monika-tip">
<strong>💡 WHERE TO EAT:</strong>
Avoid restaurants with photos of food outside. Look for places full of loud locals. For <strong>Fenek</strong>, go to <strong>Mgarr</strong>. For <strong>Pastizzi</strong>, go to <strong>Crystal Palace</strong> in Rabat.
</div>
`
    },
    {
        slug: 'en-maklowicz-tips-for-tourists',
        title: '10 Practical Tips: Don\'t Be a Tourist',
        subtitle: 'How to survive the buses, the heat, and the tourist traps. An honest survival guide.',
        body_html: `
<p>Malta is small but intense. Here is how to navigate it without losing your mind (or your wallet).</p>

<h2>1. The Bus Situation</h2>
<p>Buses are cheap (€2) but famously unreliable. They run on "Maltese time." If a bus is full, it won't stop. Wave frantically if you want to get on. Download the <strong>Tallinja App</strong> to see when they might arrive.</p>

<h2>2. Siesta is Real</h2>
<p>Shops in villages close between 13:00 and 16:00. Don't fight it. Go for a long lunch.</p>

<h2>3. Tap Water</h2>
<p>It's safe to drink but tastes like a swimming pool (desalinated sea water). Stick to bottled water for drinking, use tap for brushing teeth.</p>

<h2>4. Taxis</h2>
<p>White taxis can be pricey. Use apps like <strong>Bolt</strong>, <strong>Uber</strong>, or <strong>eCabs</strong>. They are reliable and the price is fixed.</p>

<h2>5. Gozo Ferry</h2>
<p>You only pay on the way BACK from Gozo. The ride there is free. Don't look for a ticket booth on the way in.</p>

<blockquote class="monika-quote">
<strong>Golden Rule:</strong> Avoid Paceville unless you are 18 and love sticky floors. For a good night out, go to Valletta or St. Julian's waterfront.
</blockquote>
`
    },
    {
        slug: 'en-fenek-maltese-rabbit',
        title: 'Fenek: Why You Must Eat Rabbit in Malta',
        subtitle: 'It’s not a pet, it’s dinner. And it’s a symbol of resistance.',
        body_html: `
<p>In most countries, rabbits are cute fluffy pets. In Malta, they are a national obsession on a plate. <strong>Fenek</strong> (rabbit) is more than food; it's cultural heritage.</p>

<h2>A Bite of History</h2>
<p>Historically, the Knights of Malta banned locals from hunting rabbits (keeping the fun for themselves). When the French kicked the Knights out, the Maltese started hunting and eating rabbits en masse as a celebration of freedom. That's right, eating rabbit is an act of rebellion.</p>

<h2>How is it Served?</h2>
<ul>
<li><strong>Stuffat tal-fenek (Stew):</strong> Slow-cooked for hours in tomato, red wine, and garlic sauce. Usually served with spaghetti first, then the meat.</li>
<li><strong>Fenek Moqli (Fried):</strong> Marinated in wine and garlic, then fried in olive oil. Crispy and intense.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Rabbit has lots of small bones. Don't be shy — use your hands. It's the only polite way to eat it.
</div>
`
    },
    {
        slug: 'en-knights-of-malta-history',
        title: 'Knights of Malta: The Real Game of Thrones',
        subtitle: 'Pirates, aristocrats, and holy warriors. The Order was cooler than fiction.',
        body_html: `
<p>The Knights of St. John (Knights of Malta) weren't just boring monks. They were the original European elite force. They were rich, dangerous, and they transformed this rock into a powerhouse.</p>

<h2>The Great Siege (1565)</h2>
<p>The defining moment. 500 Knights and a few thousand Maltese held off 40,000 Ottoman Turks for months. It was a bloodbath. When the Turks finally left, Europe hailed Malta as its savior.</p>

<h2>What They Built</h2>
<p>They gave us <strong>Valletta</strong>, the first planned city in Europe since Roman times. They built the massive fortifications you see everywhere. They built hospitals that were centuries ahead of their time (they used silver plates for hygiene!).</p>

<blockquote class="monika-quote">
To understand the Knights, visit the <strong>Grand Master's Palace</strong> in Valletta. The Armoury is full of their gear. These guys meant business.
</blockquote>
`
    },
    {
        slug: 'en-mdina-silent-city',
        title: 'Mdina: The Silent City Guide',
        subtitle: 'Game of Thrones filmed here for a reason. Ancient, noble, and breathtakingly quiet.',
        body_html: `
<p>Mdina is the old capital. It sits on a hill in the middle of the island, looking down on everything else. When the Knights built Valletta, the aristocracy stayed here. They call it the "Silent City" and they aren't joking. Cars are restricted, and noise is frowned upon.</p>

<h2>Why Visit?</h2>
<p>It's like stepping into a time machine. The streets are a labyrinth of honey-colored stone. The palaces are massive. It feels untouched by the modern world.</p>

<h2>Key Spots</h2>
<ul>
<li><strong>The Main Gate:</strong> You'll recognize it from Game of Thrones (King's Landing gate).</li>
<li><strong>St. Paul's Cathedral:</strong> A masterpiece of baroque.</li>
<li><strong>Fontanella Tea Garden:</strong> Famous for chocolate cake and sweeping views. Go for the view, stay for the sugar rush.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Visit in the evening. Most tourists leave by 5 PM. At night, the lamps are lit, the streets are empty, and the atmosphere is incredibly romantic (or spooky, depending on your company).
</div>
`
    },
    {
        slug: 'en-st-pauls-bay-shipwreck',
        title: 'St. Paul\'s Bay: More Than Just a Shipwreck',
        subtitle: 'Where biblical history meets modern tourism. The spot that changed Malta forever.',
        body_html: `
<p>According to the Bible (Acts 28), St. Paul shipwrecked here in 60 AD. He swam ashore, got bitten by a snake, survived, and converted the island to Christianity. Not a bad weekend trip.</p>

<p>Today, <strong>St. Paul\'s Bay</strong> (along with Bugibba and Qawra) is a major tourist hub. It's not as posh as Sliema, but it has character.</p>

<h2>What to See</h2>
<ul>
<li><strong>St. Paul's Island:</strong> A small islet in the bay with a huge statue of the saint. You can take a boat trip there.</li>
<li><strong>Wignacourt Tower:</strong> The oldest coastal watchtower on the island, built by the Knights.</li>
<li><strong>The Promenade:</strong> Miles of walkway along the sea. Perfect for a sunset stroll with gelato.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
If you want to swim, head to nearby <strong>Mistra Bay</strong> or take a bus to the sandy beaches like <strong>Golden Bay</strong> which are close by. The coast here is mostly rock, but good for snorkeling.
</div>
`
    },
    {
        slug: 'en-upper-barrakka-best-view',
        title: 'Upper Barrakka: The Best View in the Mediterranean',
        subtitle: 'If you take only one photo in Malta, take it here.',
        body_html: `
<p>This is the postcard shot. The view from <strong>Upper Barrakka Gardens</strong> over the Grand Harbour is legendary. You see the deep blue water, the massive Fort St. Angelo, and the Three Cities across the bay. It's overwhelming in the best way.</p>

<h2>The Cannons</h2>
<p>Below the garden terrace is the <strong>Saluting Battery</strong>. Originally used to salute visiting naval vessels. Now, they fire a cannon every day at 12:00 noon and 4:00 PM. It's loud, smoky, and fun.</p>

<h2>The Gardens</h2>
<p>The gardens themselves were created in the 16th century as a private exercise ground for Italian knights. Now they are public, full of flowers, statues, and weary tourists resting their feet.</p>

<blockquote class="monika-quote">
Go just before sunset. The light hits the yellow limestone of the Three Cities and turns everything gold. It's magic hour.
</blockquote>
`
    },
    {
        slug: 'en-birgu-vittoriosa-hidden-gem',
        title: 'Birgu: The Real Authentic Malta',
        subtitle: 'Forget Valletta for a second. Birgu is older, quieter, and arguably more charming.',
        body_html: `
<p>Birgu (also called Vittoriosa) is the oldest of the Three Cities. This was the HQ of the Knights before they built Valletta. It bore the brunt of the Great Siege. It's soaked in history but feels like a living village, not a museum.</p>

<h2>Why Go?</h2>
<p>It's authentically Maltese. You'll see locals chatting on doorsteps, laundry hanging across narrow alleys, and fewer tour groups. The marina is full of superyachts, creating a crazy contrast between ancient walls and modern billions.</p>

<h2>Must See</h2>
<ul>
<li><strong>Fort St. Angelo:</strong> The giant fortress at the tip. Exploring it is like walking through a history book.</li>
<li><strong>Inquisitor's Palace:</strong> One of the few surviving palaces of the Inquisition. Creepy dungeons included.</li>
<li><strong>The Marina:</strong> Walk along the water, admire the boats, and grab a coffee.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA'S TIP:</strong>
Take the <strong>Dghajsa</strong> (traditional water taxi) from Valletta to Birgu. It costs €2 per person and it's the coolest way to travel. You cross the Grand Harbour in a tiny wooden boat. Unforgettable.
</div>
`
    }
];

async function updateBatch() {
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

updateBatch();
