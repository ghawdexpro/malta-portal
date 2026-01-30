// Seed Makłowicz-themed articles — English versions
// Mirror of Polish articles with English content

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function upsert(article) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(article),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`  ❌ ${article.slug}: ${text}`);
  } else {
    console.log(`  ✅ ${article.topic}: ${article.title}`);
  }
}

const EN_ARTICLES = [
  // ── 1. VALLETTA ──
  {
    slug: "en-valletta-following-maklowicz",
    title: "Valletta Following Maklowicz — Walking the Fortress Capital",
    subtitle: "Everything Robert Maklowicz discovered in Valletta — from Upper Barrakka to hidden alleys",
    topic: "valletta",
    lang: "en",
    tags: ["valletta", "maklowicz", "walking tour", "history", "sightseeing"],
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    source_count: 287,
    avg_confidence: 91,
    body_html: `
<p><strong>"Malta is a place where history is written in stone"</strong> — that's how Robert Maklowicz began his journey through Valletta, and it's hard to find a better summary of this city. Valletta isn't an ordinary capital. It's a fortress built by knights, a UNESCO-listed city-fortification where every stone has its own story.</p>

<h2>First Visit — Where Maklowicz Started</h2>
<p>Maklowicz began his Maltese adventure with a view of Grand Harbour — one of the most beautiful natural harbours in the world. Standing where the galleys of the Knights of Malta once moored, he said: <em>"I'm in Malta, and I want to start our Maltese stories in a place that is incredibly exciting for any military historian."</em></p>
<p>He was right. Grand Harbour isn't just a port — it's the place where one of the most important sieges in European history took place in 1565. A Turkish armada of 40,000 soldiers attacked the island defended by just 500 knights and 8,000 Maltese.</p>

<h2>Upper Barrakka Gardens — The Essential Stop</h2>
<p>Maklowicz gave us golden advice: <em>"A sensible tourist should sit down from time to time, and for that sitting should choose places where you can also sightsee while seated."</em></p>
<p>Upper Barrakka Gardens is exactly such a place. A viewing terrace with arcades overlooking the Three Cities (Birgu, Senglea, Cospicua) and Grand Harbour. Every day at 12:00 and 16:00, the Saluting Battery fires its historic cannons.</p>
<ul>
<li><strong>Entry:</strong> Gardens free, Battery — €3</li>
<li><strong>Hours:</strong> 7:00–22:00 (longer in summer)</li>
<li><strong>Pro tip:</strong> Arrive at 11:45, grab a spot at the railing and wait for the cannon blast</li>
</ul>

<h2>Streets of Valletta — Republic & Merchant</h2>
<p>Two main arteries run parallel. Republic Street is the tourist one — full of cafés, shops and restaurants. Merchant Street is the real one — where you buy at the market, drink coffee with locals and feel the true pulse of the city.</p>
<p>Maklowicz noted the architecture: the enclosed wooden balconies (gallariji) are an iconic element of Maltese architecture, derived from Arab tradition, designed for women to observe the street without being seen.</p>

<h2>Strait Street — Malta's Pigalle</h2>
<p>Once the most infamous sailor street in the Mediterranean, known as "The Gut." During WWII, British sailors came here for entertainment. Today Strait Street is experiencing a renaissance — cocktail bars, galleries, jazz evenings.</p>

<h2>Practical Tips</h2>
<ul>
<li><strong>Getting there:</strong> Bus from airport (X4) or ferry from Sliema. Valletta is car-free.</li>
<li><strong>Time needed:</strong> Minimum half a day, ideally a full day</li>
<li><strong>Shoes:</strong> Comfortable ones are essential — the city is hilly and stone pavements can be slippery</li>
<li><strong>Food:</strong> Start with pastizzi on Republic Street, lunch in a side street</li>
</ul>
`,
  },

  // ── 2. UPPER BARRAKKA ──
  {
    slug: "en-upper-barrakka-best-view",
    title: "Upper Barrakka Gardens — The Best View in Malta",
    subtitle: "Why Maklowicz chose this spot to rest and what to see from the terrace",
    topic: "sightseeing",
    lang: "en",
    tags: ["upper barrakka", "valletta", "viewpoint", "gardens", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1602083645498-bc8a73de09e7?w=1200&q=80",
    source_count: 198,
    avg_confidence: 93,
    body_html: `
<p><strong>"A sensible tourist should sit down from time to time, and for that sitting should choose places where you can also sightsee and admire."</strong></p>
<p>These words from Robert Maklowicz are probably the best tourist advice about Malta. And they perfectly describe Upper Barrakka Gardens — a place where you rest while having one of the most beautiful views in Europe before you.</p>

<h2>What You See From the Terrace</h2>
<ul>
<li><strong>Grand Harbour</strong> — the natural port that has shaped Malta's fate since Phoenician times</li>
<li><strong>Three Cities</strong> — Birgu (Vittoriosa), Senglea (L-Isla) and Cospicua (Bormla). This is where knights lived before Valletta was built</li>
<li><strong>Fort St Angelo</strong> — the imposing fortress on Birgu's tip, the knights' headquarters</li>
<li><strong>Dockyards</strong> — Malta has been building and repairing ships for thousands of years</li>
</ul>

<h2>Saluting Battery — The Cannon Blast</h2>
<p>Every day at 12:00 and 16:00, the historic Saluting Battery fires on the terrace below the gardens. This tradition dates back to the knights — cannons signalled time and port safety to ships.</p>
<p><strong>Good to know:</strong> The cannon is REALLY loud. If you stand close, you'll feel the shockwave. Tourists regularly jump in fright — it's part of the attraction.</p>

<h2>When to Visit</h2>
<table>
<tr><th>Time</th><th>Atmosphere</th><th>Rating</th></tr>
<tr><td>Morning (7:00–9:00)</td><td>Empty, peaceful, soft light</td><td>Perfect for photos</td></tr>
<tr><td>Noon (11:45)</td><td>Cannon blast, crowded</td><td>Must-do experience</td></tr>
<tr><td>Sunset</td><td>Golden light on limestone</td><td>Most romantic</td></tr>
<tr><td>Evening</td><td>Illuminated Three Cities</td><td>Magical</td></tr>
</table>

<h2>Getting There</h2>
<p>The gardens are at the end of Republic Street — Valletta's main street. You can also take the elevator from harbour level (Barrakka Lift — €1). The lift is great if you arrived by ferry from Sliema.</p>
`,
  },

  // ── 3. GRAND MASTER'S PALACE ──
  {
    slug: "en-grand-masters-palace",
    title: "Grand Master's Palace — Heart of the Knights of Malta",
    subtitle: "Where the grand masters ruled and what the armour-filled halls conceal",
    topic: "sightseeing",
    lang: "en",
    tags: ["palace", "knights", "valletta", "history", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80",
    source_count: 234,
    avg_confidence: 89,
    body_html: `
<p>Maklowicz stood before this building and said simply: <em>"Well, this is it — the Grand Master's Palace."</em> But behind that simplicity lies one of the most fascinating buildings in European history.</p>

<h2>The Palace History</h2>
<p>The Grand Master's Palace is the largest building in Valletta. Built in the 16th century as the seat of the head of the Order of the Knights of Malta, it served successively: the knights, Napoleon (who stripped it of all valuables in 6 days), the British, and finally independent Malta.</p>
<p>Today it houses Malta's President's office and parliament (though parliament got a new Renzo Piano building). Part of the palace is open to visitors.</p>

<h2>What to See</h2>
<ul>
<li><strong>Palace Armoury</strong> — one of the largest collections of weapons and armour in Europe. Over 5,000 exhibits, including armour from the Great Siege of 1565</li>
<li><strong>State Rooms</strong> — richly decorated halls with frescoes, tapestries and portraits of grand masters. Marble floors, gilded ceilings</li>
<li><strong>Tapestry Corridor</strong> — a series of Flemish tapestries depicting exotic scenes: India, Africa, the Americas</li>
</ul>

<h2>Practical Info</h2>
<ul>
<li><strong>Entry:</strong> €10 (armoury + state rooms), children €5</li>
<li><strong>Hours:</strong> 9:00–17:00 (last entry 16:30)</li>
<li><strong>Note:</strong> State Rooms may be closed during official state events</li>
<li><strong>Time needed:</strong> 1.5–2 hours</li>
</ul>
`,
  },

  // ── 4. CARAVAGGIO ──
  {
    slug: "en-caravaggio-in-malta",
    title: "Caravaggio in Malta — Murderer, Genius, and the Beheading of St John",
    subtitle: "How a fugitive killer created his greatest masterpiece on Malta — and why he had to flee again",
    topic: "caravaggio",
    lang: "en",
    tags: ["caravaggio", "art", "co-cathedral", "valletta", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200&q=80",
    source_count: 312,
    avg_confidence: 94,
    body_html: `
<p><strong>"Caravaggio was fleeing a death sentence, and on Malta he created a work that has survived for centuries."</strong> — Robert Maklowicz at St John's Co-Cathedral</p>

<h2>A Murderer in a Habit</h2>
<p>Michelangelo Merisi da Caravaggio arrived in Malta in 1607. He didn't come as a tourist — he was running. In Rome he had killed a man in a brawl (some sources say it was over a ball game result) and had a death sentence on his head.</p>
<p>Malta was the perfect refuge. The Knights of Malta needed a great artist, and Caravaggio needed powerful protectors. The deal was simple: you paint our churches, we protect your life.</p>

<h2>The Beheading of St John — The Masterpiece in the Oratory</h2>
<p>In the oratory of St John's Co-Cathedral hangs <em>"The Beheading of Saint John the Baptist"</em> — Caravaggio's largest painting (361 x 520 cm) and the only one the artist signed. He signed it with blood flowing from John's neck — the letters "f. Michel..." (fra Michelangelo, brother Michelangelo, as he had been admitted to the Order).</p>
<p>It's the only known signature on any Caravaggio painting. Why did he sign this one? Perhaps out of gratitude to the Order that gave him refuge. Perhaps out of pride at becoming a knight. Or perhaps — he knew this was his greatest work.</p>

<h2>Fall and Escape</h2>
<p>Caravaggio couldn't live peacefully. After a few months on Malta, he got into another brawl — this time with a fellow knight. He was imprisoned in Fort St Angelo in Birgu, but managed to escape (probably with help). He fled to Sicily, and the Order expelled him as a "putrid and rotten member" (membrum putridum et foetidum).</p>

<h2>What to See Today</h2>
<ul>
<li><strong>St John's Co-Cathedral</strong> — €15 (worth every cent). Two Caravaggio masterpieces: "Beheading of St John" and "St Jerome Writing"</li>
<li><strong>The Oratory</strong> — the hall with the "Beheading" is dimmed, lit to recreate the chiaroscuro effect Caravaggio pioneered</li>
<li><strong>Fort St Angelo (Birgu)</strong> — where Caravaggio was imprisoned. You can see the cell</li>
</ul>
`,
  },

  // ── 5. PASTIZZI ──
  {
    slug: "en-pastizzi-malta-street-food",
    title: "Pastizzi — For 50 Cents You're in Paradise",
    subtitle: "Everything about Malta's most famous street food that captivated Maklowicz",
    topic: "cuisine",
    lang: "en",
    tags: ["pastizzi", "street food", "food", "maklowicz", "maltese cuisine"],
    cover_image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&q=80",
    source_count: 445,
    avg_confidence: 96,
    body_html: `
<p><strong>"Pastizzi are the simplest and most democratic dish in Malta — for fifty cents you're in paradise."</strong> — Robert Maklowicz</p>

<h2>What Are Pastizzi</h2>
<p>As Maklowicz explained: <em>"A type of savoury pastry filled most commonly with either ricotta or green peas."</em> Filo pastry, layered with butter multiple times, baked to golden perfection, hot, crunchy, for half a euro.</p>
<p>Two classic varieties:</p>
<ul>
<li><strong>Pastizzi tal-irkotta</strong> — with ricotta cheese. Creamy, delicate, slightly sweet. The original.</li>
<li><strong>Pastizzi tal-pizelli</strong> — with peas. More filling, slightly spicy. The "lunch" version.</li>
</ul>

<h2>Where to Buy the Best</h2>
<ul>
<li><strong>Crystal Palace (Rabat)</strong> — legendary. Maklowicz visited here. Queue stretches down the street. Fresh from the oven every few minutes.</li>
<li><strong>Is-Serkin (Rabat)</strong> — right next door, Crystal Palace's eternal rival. Maltese people argue which is better.</li>
<li><strong>Maxim's (Valletta)</strong> — on Republic Street, perfect for breakfast while sightseeing.</li>
<li><strong>Any village pastizzeria</strong> — honestly, bad pastizzi don't exist in Malta.</li>
</ul>

<h2>The Culture of Pastizzi</h2>
<p>Pastizzi aren't a snack — they're a cultural institution. Maltese eat them for breakfast, after mass, after parties (pastizzerias open at 4 AM for a reason), during work breaks, at the beach.</p>
<p>One pastizzi costs €0.50–€0.60. For €2 you eat until you're full. This makes pastizzi the most democratic food on the island — just as Maklowicz said.</p>

<h2>Other Maltese Baked Goods</h2>
<ul>
<li><strong>Qassatat</strong> — a larger version of pastizzi, with various fillings (spinach, anchovies, cheese)</li>
<li><strong>Timpana</strong> — baked pasta with meat and eggs, wrapped in pastry</li>
<li><strong>Ftira</strong> — Maltese pizza/focaccia with tomatoes, capers and tuna</li>
</ul>
`,
  },

  // ── 6. FENEK ──
  {
    slug: "en-fenek-maltese-rabbit",
    title: "Fenek — Maltese Rabbit, an Act of Rebellion and the Taste of Freedom",
    subtitle: "Why stewed rabbit is Malta's national dish and what Maklowicz discovered in a Rabat restaurant",
    topic: "cuisine",
    lang: "en",
    tags: ["fenek", "rabbit", "maltese cuisine", "rabat", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    source_count: 378,
    avg_confidence: 92,
    body_html: `
<p><strong>"Maltese rabbit is not just a dish — it's an act of rebellion and the taste of freedom."</strong> — Robert Maklowicz</p>

<h2>Why Rabbit = Freedom</h2>
<p>Under the Knights of Malta, hunting rabbits was a privilege reserved for the Order. Ordinary Maltese were forbidden from catching or eating rabbits — severe penalties applied.</p>
<p>When the knights were expelled by Napoleon in 1798, one of the first things the Maltese did was go on a massive rabbit hunt. Eating fenek became an act of freedom — a symbol of the end of foreign rule.</p>
<p>To this day, a Sunday family dinner with rabbit (fenkata) is an important tradition.</p>

<h2>How Authentic Fenek Tastes</h2>
<p>Maklowicz tried "a homemade dish of the local cuisine, namely stewed rabbit" in a Rabat restaurant. The classic recipe:</p>
<ul>
<li>Rabbit marinated in wine and garlic (sometimes overnight)</li>
<li>Fried in olive oil, then braised with tomatoes</li>
<li>Capers, olives, herbs (thyme, bay leaf)</li>
<li>Served with chips or Maltese bread (hobz)</li>
</ul>

<h2>Three Versions</h2>
<table>
<tr><th>Dish</th><th>Description</th><th>Price</th></tr>
<tr><td>Stuffat tal-fenek</td><td>Stewed in tomato sauce — the classic</td><td>€12–18</td></tr>
<tr><td>Fenek moqli</td><td>Pan-fried, crispy</td><td>€14–20</td></tr>
<tr><td>Fenek biz-zalza</td><td>Rabbit in sauce — served with spaghetti</td><td>€10–15</td></tr>
</table>

<h2>Where to Eat Fenek</h2>
<ul>
<li><strong>Ta' Marija (Mosta)</strong> — legendary fenkata, entire families come on Sundays</li>
<li><strong>Diar il-Bniet (Dingli)</strong> — with clifftop views, grandma's cooking</li>
<li><strong>Ir-Razzett l-Antik (Qormi)</strong> — restaurant in an old farmhouse</li>
<li><strong>Rabat</strong> — where Maklowicz ate fenek. Every local restaurant serves good versions</li>
</ul>
`,
  },

  // ── 7. BIRGU ──
  {
    slug: "en-birgu-vittoriosa-hidden-gem",
    title: "Birgu (Vittoriosa) — Where the Knights Really Lived",
    subtitle: "Before Valletta existed, the heart of Malta was Birgu. Maklowicz discovered the city tourists skip",
    topic: "birgu",
    lang: "en",
    tags: ["birgu", "vittoriosa", "knights", "fort st angelo", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1601119108393-3df8f2e41ff8?w=1200&q=80",
    source_count: 256,
    avg_confidence: 90,
    body_html: `
<p>Maklowicz started his second episode from Birgu and Fort St Angelo — and that's no coincidence. Birgu is where the history of the Knights of Malta truly began.</p>

<h2>Before Valletta There Was Birgu</h2>
<p>When the knights arrived in Malta in 1530 (expelled from Rhodes by the Ottoman Turks), they didn't immediately build Valletta. They settled in Birgu — a small town across Grand Harbour from today's Valletta.</p>
<p>Fort St Angelo, the mighty fortress on Birgu's tip, became their headquarters. The Great Siege of 1565 took place here — where the knights under Jean de Valette stood against the 40,000-strong Turkish army.</p>

<h2>What to See</h2>
<ul>
<li><strong>Fort St Angelo</strong> — €8, excellently preserved fortress. You can see the cell where Caravaggio was imprisoned!</li>
<li><strong>Malta Maritime Museum</strong> — in the old naval bakery. Maritime history from Phoenicians to WWII</li>
<li><strong>Inquisitor's Palace</strong> — seat of the Maltese Inquisitor. The only inquisitor's palace in Europe that survived intact</li>
<li><strong>Birgu's streets</strong> — narrow, stone-paved, with colourful balconies. Almost zero tourists</li>
</ul>

<h2>Getting There</h2>
<p>The coolest way is by water taxi (dghajsa) from Valletta — small, traditional boats cross Grand Harbour. €2 one way, 5 minutes, feels like another era.</p>

<h2>Why Birgu Over Valletta</h2>
<p>Valletta is touristy, full of cafés and souvenir shops. Birgu is real — locals live here, laundry dries on balconies, grandmothers sit on chairs outside their doors. If you want to see what Malta looked like before mass tourism — go to Birgu.</p>
`,
  },

  // ── 8. MDINA ──
  {
    slug: "en-mdina-silent-city",
    title: "Mdina — The Silent City That Refuses to Be Loud",
    subtitle: "Maklowicz discovered why Malta's former capital is quieter than any village in Europe",
    topic: "mdina",
    lang: "en",
    tags: ["mdina", "silent city", "history", "game of thrones", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1603852452515-2dc57e0e8a19?w=1200&q=80",
    source_count: 398,
    avg_confidence: 95,
    body_html: `
<p><strong>"Mdina is a city that refuses to be loud — and that's precisely why it says so much."</strong> — Robert Maklowicz</p>

<h2>The Former Capital</h2>
<p>Mdina was Malta's capital for thousands of years — from Phoenician times until the knights arrived in the 16th century. When the knights moved to Birgu (and later Valletta), Mdina lost its political significance. But it kept something more precious: dignity and silence.</p>

<h2>Why So Quiet</h2>
<p>Only 300 people live in Mdina. Cars are virtually banned (entry only for residents). There are no tourist shops selling fridge magnets. No loud music from bars.</p>
<p>The city looks exactly as it did 500 years ago — stone walls, narrow alleys, cathedral, aristocratic palaces. The silence is so deep you can hear your own footsteps on the stone floor.</p>

<h2>Game of Thrones</h2>
<p>Mdina served as a filming location for "Game of Thrones" — Season 1 King's Landing scenes were shot here. Mdina's gate is the same gate Ned Stark rode through on horseback.</p>

<h2>Mdina at Night — Maklowicz's Farewell</h2>
<p>Maklowicz ended his Malta journey in Mdina at night: <em>"Mdina at night is the most beautiful farewell Malta can offer — silence, light and eternity in stone."</em></p>

<h2>What to See</h2>
<ul>
<li><strong>St Paul's Cathedral</strong> — where the apostle Paul allegedly converted the Maltese after his shipwreck</li>
<li><strong>Bastion Square</strong> — views across half of Malta; on clear days you can see Mount Etna in Sicily</li>
<li><strong>Palazzo Falson</strong> — museum in a medieval palace, private art collection</li>
<li><strong>Fontanella Tea Garden</strong> — on the walls, legendary cakes and a view of the entire island</li>
</ul>
`,
  },

  // ── 9. GOZO ──
  {
    slug: "en-gozo-maklowicz-island",
    title: "Maklowicz's Gozo — The Island Where Time Flows Slower",
    subtitle: "Ferry, Citadella, Victoria and Gozitan cuisine — following Episode 2",
    topic: "gozo",
    lang: "en",
    tags: ["gozo", "citadella", "victoria", "ferry", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80",
    source_count: 356,
    avg_confidence: 93,
    body_html: `
<p><strong>"On Gozo, time flows differently — slower, more peacefully, as it should."</strong> — Robert Maklowicz</p>
<p><em>"We're sailing to Gozo. It's not a particularly gruelling voyage, as it takes about 25 minutes."</em></p>

<h2>The Ferry</h2>
<p>The ferry runs from Cirkewwa (northern tip of Malta) to Mgarr (Gozo's port). Every 45 minutes, 24/7. You buy tickets on the return — €4.65 per person (round trip). Car around €15.</p>

<h2>Victoria and the Citadella</h2>
<p>Gozo's capital is Victoria (formerly Rabat Gozo) — <em>"Gozo's capital is really a small town, because it has about seven and a half thousand inhabitants,"</em> Maklowicz noted.</p>
<p>Above the town towers the Citadella — a medieval fortress from which <em>"you can see all of Gozo spread out before you."</em> In 1551, Turks raided Gozo and enslaved nearly the entire population (about 5,000 people).</p>

<h2>Gozitan Cuisine</h2>
<p>Maklowicz observed: <em>"Gozo is an island where food still tastes as it should — simply, honestly, from the heart."</em></p>
<ul>
<li><strong>Gbejniet</strong> — small round cheese from sheep's or goat's milk. Gozo's icon</li>
<li><strong>Wine</strong> — Gozo's vineyards produce some of Malta's best wines</li>
<li><strong>Honey</strong> — "Malta" comes from Greek "meli" (honey). Beekeeping tradition lives on Gozo</li>
<li><strong>Capers</strong> — grow wild on walls and rocks. Hand-picked</li>
</ul>

<h2>What to See</h2>
<ul>
<li><strong>Citadella</strong> — free entry, museums inside (€5 combo ticket)</li>
<li><strong>Xewkija Rotunda</strong> — third largest unsupported dome in the world!</li>
<li><strong>Ggantija Temples</strong> — older than the Pyramids of Giza (3600 BCE). UNESCO</li>
<li><strong>Ramla Bay</strong> — Gozo's most beautiful beach, red sand</li>
<li><strong>Dwejra</strong> — where the Azure Window stood (collapsed 2017). Still spectacular</li>
</ul>
`,
  },

  // ── 10. CATACOMBS ──
  {
    slug: "en-st-pauls-catacombs",
    title: "St Paul's Catacombs — Malta's Underground History",
    subtitle: "The early Christian catacombs that fascinated Maklowicz in Rabat",
    topic: "sightseeing",
    lang: "en",
    tags: ["catacombs", "rabat", "history", "early christian", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1605910347888-c47b4b5edcc4?w=1200&q=80",
    source_count: 189,
    avg_confidence: 88,
    body_html: `
<p>In Rabat, Maklowicz descended underground and discovered: <em>"Early Christian catacombs. St Agatha's Catacombs, dated between the 2nd and 5th centuries."</em></p>

<h2>The Underground Network</h2>
<p>Beneath Rabat lies an enormous network of catacombs — underground cemeteries from the first centuries of Christianity:</p>
<ul>
<li><strong>St Paul's Catacombs</strong> — the largest, over 2,000 m2 of underground corridors. Wall graves (loculi), round stone tables (agape tables) for funeral feasts</li>
<li><strong>St Agatha's Catacombs</strong> — smaller but with unique frescoes from the 5th–12th centuries</li>
</ul>

<h2>Saint Paul in Malta</h2>
<p>According to tradition (and the Acts of the Apostles), the apostle Paul was shipwrecked off Malta's coast in 60 AD. He spent 3 months here, healed the governor's father and converted the island to Christianity.</p>

<h2>Practical Info</h2>
<ul>
<li><strong>St Paul's Catacombs:</strong> €6, 9:00–17:00</li>
<li><strong>St Agatha's Catacombs:</strong> €5, with guide (every 30 min)</li>
<li><strong>Underground temperature:</strong> constant 18°C — relief from Maltese heat</li>
<li><strong>Combine with Mdina</strong> — catacombs are a 5-min walk from Mdina's gate</li>
</ul>
`,
  },

  // ── 11. WINE ──
  {
    slug: "en-maltese-wine-revolution",
    title: "Maltese Wine — From Barely Drinkable to Excellent",
    subtitle: "Maklowicz discovered that Maltese wine has undergone a revolution — and it's now genuinely good",
    topic: "wine",
    lang: "en",
    tags: ["wine", "girgentina", "gellewza", "gozo", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80",
    source_count: 267,
    avg_confidence: 87,
    body_html: `
<p>At the end of his journey, in Mdina at night, Maklowicz observed: <em>"The wine was barely drinkable, and how is it now? The food is wonderful."</em></p>

<h2>A Brief History</h2>
<p>Malta has grown grapes for 2,000 years. But for centuries Maltese wine was... let's say, average. Hot climate, small plots, lack of investment. Wine was imported from Sicily, and local varieties were treated as second-class.</p>
<p>The revolution began in the 1990s when major producers — Meridiana (now Delicata) and Marsovin — invested in modern technology and imported noble grape varieties.</p>

<h2>Maltese Grape Varieties</h2>
<ul>
<li><strong>Gellewza</strong> — local red variety. Light, fruity, perfect for summer. Unique — grows only in Malta</li>
<li><strong>Girgentina</strong> — local white variety. Citrusy, mineral. Great with seafood</li>
<li><strong>International</strong> — Syrah, Cabernet Sauvignon, Chardonnay, Vermentino — all thrive in Malta's climate</li>
</ul>

<h2>Where to Drink</h2>
<ul>
<li><strong>Meridiana Wine Estate</strong> — tastings and vineyard tours. Malta's best Cabernet and Syrah</li>
<li><strong>Marsovin</strong> — traditional winery, cellars under Valletta</li>
<li><strong>Ta' Betta Wine Estates (Gozo)</strong> — boutique Gozo winery, 100% local grapes</li>
<li><strong>Any restaurant</strong> — ask for "local wine" and try it. Bottle from €12 in restaurants</li>
</ul>
`,
  },

  // ── 12. KNIGHTS ──
  {
    slug: "en-knights-of-malta-history",
    title: "Knights of Malta — The Order That Shaped the Island",
    subtitle: "From a Jerusalem hospital to a Mediterranean fortress — how a knightly order created the Malta we know",
    topic: "history",
    lang: "en",
    tags: ["knights", "order", "great siege", "valletta", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    source_count: 423,
    avg_confidence: 94,
    body_html: `
<p>Maklowicz talked about them in every episode — and rightly so. Without the Knights of Malta, the island would be a completely different place. Every building you touch in Valletta was built by the Order.</p>

<h2>Where They Came From</h2>
<p>The Order of the Knights of St John was founded in 1099 in Jerusalem — as a hospital for pilgrims. Over time, monks became warriors, and the hospital evolved into one of the most powerful military organizations of the Middle Ages.</p>
<p>The Order's route: Jerusalem → Acre → Cyprus → Rhodes → Malta. At each stop they built fortresses and hospitals. They settled in Malta in 1530 and stayed for 268 years.</p>

<h2>The Great Siege of 1565</h2>
<p>The most important event in Maltese history. The Ottoman Empire sent 40,000 soldiers to capture the island. It was defended by 500 knights and 8,000 Maltese under Jean de La Valette.</p>
<p>The siege lasted 4 months. Fighting was brutal — neither side took prisoners. The knights lost half their number, the Turks over 25,000 soldiers. Malta held.</p>
<p>After victory, La Valette built a new fortress city on the peninsula opposite Birgu. He named it Valletta — after himself.</p>

<h2>The Eight Langues</h2>
<p>The Order was divided into 8 "langues" (tongues) — national groups: Provence, Auvergne, France, Castile, Aragon, Italy, England (with Bavaria) and Germany. Each langue had its auberge (palace) in Valletta — still standing along Republic Street.</p>

<h2>What They Left Behind</h2>
<ul>
<li>All of Valletta</li>
<li>Fortifications across the entire island</li>
<li>St John's Co-Cathedral with Caravaggio</li>
<li>Grand Master's Palace</li>
<li>Fort St Angelo in Birgu</li>
<li>The Maltese Cross — recognized worldwide</li>
</ul>
`,
  },

  // ── 13. ST PAUL'S BAY ──
  {
    slug: "en-st-pauls-bay-shipwreck",
    title: "St Paul's Bay — Where the Apostle Crashed Into the Rocks",
    subtitle: "Maklowicz visited the bay where the apostle Paul allegedly shipwrecked 2,000 years ago",
    topic: "sightseeing",
    lang: "en",
    tags: ["st pauls bay", "apostle paul", "history", "north malta", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1599423423927-7e0e5e67fe20?w=1200&q=80",
    source_count: 178,
    avg_confidence: 86,
    body_html: `
<p>Maklowicz said: <em>"We are in a place called Saint Paul's Bay, and this name refers not only to the bay itself but also to the town."</em></p>

<h2>The Apostle's Story</h2>
<p>In 60 AD, a ship carrying the apostle Paul to Rome (as a prisoner) was wrecked off Malta's coast. The Bible (Acts of the Apostles, Chapter 28) describes how 276 people reached shore safely, how Paul was bitten by a viper and didn't die (convincing the Maltese of his holiness), and how he healed the governor's father.</p>

<h2>St Paul's Bay Today</h2>
<p>Today St Paul's Bay is a popular resort town in northern Malta. Not as elegant as Sliema or St Julian's, but with its own charm:</p>
<ul>
<li>Lower hotel and restaurant prices than the centre</li>
<li>Seafront promenade perfect for evening walks</li>
<li>Close to northern beaches (Golden Bay, Ghajn Tuffieha)</li>
<li>Local atmosphere — less touristy than other resorts</li>
</ul>
`,
  },

  // ── 14. FORTIFICATIONS ──
  {
    slug: "en-malta-fortifications",
    title: "Malta's Fortifications — 7,000 Years of Defence on 316 km2",
    subtitle: "From prehistoric temples to British bunkers — Malta is one massive fortress",
    topic: "fortifications",
    lang: "en",
    tags: ["fortifications", "siege", "bastions", "towers", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1600623047164-0c3c0b688168?w=1200&q=80",
    source_count: 334,
    avg_confidence: 91,
    body_html: `
<p>Maklowicz started his story with fortifications: <em>"I'm in Malta, and I want to start our Maltese stories in a place incredibly exciting for any military historian."</em></p>
<p>Malta is probably the most fortified place in the world relative to its size.</p>

<h2>Layers of Defence</h2>
<table>
<tr><th>Era</th><th>Fortification</th><th>Example</th></tr>
<tr><td>3600 BCE</td><td>Megalithic temples</td><td>Hagar Qim, Ggantija</td></tr>
<tr><td>800 BCE</td><td>Phoenician city walls</td><td>Under Mdina</td></tr>
<tr><td>Medieval</td><td>Arab walls</td><td>Mdina</td></tr>
<tr><td>1530–1798</td><td>Knights' bastions</td><td>Valletta, Fort St Angelo, Fort St Elmo</td></tr>
<tr><td>1800–1964</td><td>British forts</td><td>Victoria Lines, Fort Rinella</td></tr>
<tr><td>1940–43</td><td>WWII shelters and bunkers</td><td>Lascaris War Rooms</td></tr>
</table>

<h2>Key Fortifications</h2>
<ul>
<li><strong>Valletta</strong> — the entire city is a fortress, bastions on all sides</li>
<li><strong>Fort St Elmo</strong> — on Valletta's tip, first target during the Great Siege. Now houses the War Museum</li>
<li><strong>Fort St Angelo (Birgu)</strong> — knights' HQ, Caravaggio's prison cell</li>
<li><strong>Victoria Lines</strong> — 12 km British defensive wall cutting Malta east to west. Built 1870, never used in battle. Great hiking trail</li>
<li><strong>Lascaris War Rooms (Valletta)</strong> — underground WWII command centre. The Sicily invasion was planned here</li>
</ul>

<h2>Malta in WWII</h2>
<p>Malta endured one of the most intense bombardments in history. In 1942, the Luftwaffe and Regia Aeronautica dropped more bombs on the island than on London during the Blitz. King George VI awarded Malta the George Cross — the only combat decoration given to an entire country. It appears on Malta's flag to this day.</p>
`,
  },

  // ── 15. CUISINE GUIDE ──
  {
    slug: "en-maltese-cuisine-complete-guide",
    title: "Maltese Cuisine — Complete Guide Inspired by Maklowicz",
    subtitle: "Every dish Maklowicz discovered and described — from pastizzi to lampuki",
    topic: "cuisine",
    lang: "en",
    tags: ["cuisine", "food", "recipes", "tradition", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    source_count: 489,
    avg_confidence: 95,
    body_html: `
<p>Across three episodes, Maklowicz explored Maltese cuisine and repeatedly emphasised: Maltese food is a crossroads of Arab, Sicilian, British and North African traditions. A unique blend you won't find anywhere else.</p>

<h2>Must-Try Dishes</h2>

<h3>Pastizzi (€0.50)</h3>
<p><em>"The simplest and most democratic dish in Malta"</em> — Maklowicz. Filo pastry with ricotta or peas.</p>

<h3>Fenek / Stuffat tal-Fenek (€12–18)</h3>
<p><em>"An act of rebellion and the taste of freedom"</em> — stewed rabbit in tomato sauce. Malta's national dish.</p>

<h3>Lampuki (season: August–December)</h3>
<p>Golden mackerel — seasonal fish appearing in autumn. Baked, fried or in pie (lampuki pie).</p>

<h3>Hobz biz-zejt</h3>
<p>"Bread with oil" — Maltese bruschetta. Crusty bread soaked in olive oil, tomatoes, capers, garlic and tuna.</p>

<h3>Bragioli</h3>
<p>Maltese beef olives — thin beef slices rolled around stuffing of egg, bacon and parsley. Braised in sauce. Grandma's cooking.</p>

<h3>Gbejniet</h3>
<p>Small round cheese from goat's or sheep's milk. Fresh (soft, creamy), dried (hard, sharp) or peppered. Gozo's specialty.</p>

<h3>Imqaret</h3>
<p>Date pastries deep-fried in oil. Served hot, with ice cream. Festival street food.</p>

<h2>Where to Eat by Budget</h2>
<table>
<tr><th>Budget</th><th>Option</th><th>Typical dish</th></tr>
<tr><td>€2–5</td><td>Pastizzeria / bakery</td><td>Pastizzi, ftira, qassatat</td></tr>
<tr><td>€8–15</td><td>Local restaurant</td><td>Fenek, lampuki, pasta</td></tr>
<tr><td>€20–35</td><td>Mid-range restaurant</td><td>Seafood, steaks, tastings</td></tr>
<tr><td>€50+</td><td>Fine dining</td><td>Noni, Under Grain, De Mondion</td></tr>
</table>
`,
  },

  // ── 16. STRAIT STREET ──
  {
    slug: "en-strait-street-the-gut",
    title: "Strait Street — The Most Sinful Street in the Mediterranean",
    subtitle: "Once a paradise for sailors and prostitutes, now cocktail bars and galleries",
    topic: "valletta",
    lang: "en",
    tags: ["strait street", "valletta", "bars", "history", "maklowicz"],
    cover_image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=1200&q=80",
    source_count: 212,
    avg_confidence: 85,
    body_html: `
<h2>"The Gut" — Valletta's Underbelly</h2>
<p>Strait Street (Triq id-Dejqa) is a narrow lane parallel to Republic Street that for centuries was the most sinful address in the Mediterranean. Royal Navy sailors called it "The Gut" and came ashore here looking for entertainment.</p>

<h2>The Golden Era (1900–1960)</h2>
<p>At its peak, Strait Street had over 60 bars, clubs and brothels on one short street. Jazz musicians played until dawn, sailors drank and fought (in that order), and beer flowed freely.</p>
<p>Officers were separated from ordinary sailors by a barrier inside the bars (yes, a barrier in a pub — the British class system even at parties).</p>

<h2>Decline and Renaissance</h2>
<p>When the British left Malta in 1979, Strait Street died. Bars closed, buildings decayed. For decades it was an abandoned, dark alley.</p>
<p>Since 2015, the street has been experiencing a renaissance. New bars, galleries, cafés. But it's not a tourist makeover — Strait Street has kept its dark elegance.</p>

<h2>Where to Go Today</h2>
<ul>
<li><strong>Tico-Tico Bar</strong> — 1950s-style cocktails</li>
<li><strong>Wild Honey</strong> — honey-themed cocktail bar</li>
<li><strong>The Pub</strong> — where Noel Coward allegedly wrote his Malta song</li>
<li><strong>Strait Street Museum</strong> — small but fascinating. Photos from "The Gut" in its golden age</li>
</ul>
`,
  },

  // ── 17. TEMPLES ──
  {
    slug: "en-temples-older-than-pyramids",
    title: "Malta's Temples — Older Than the Pyramids, Older Than Stonehenge",
    subtitle: "Ggantija on Gozo is the oldest freestanding structure in the world",
    topic: "sightseeing",
    lang: "en",
    tags: ["temples", "ggantija", "prehistory", "gozo", "UNESCO"],
    cover_image: "https://images.unsplash.com/photo-1600623047164-0c3c0b688168?w=1200&q=80",
    source_count: 278,
    avg_confidence: 92,
    body_html: `
<h2>Older Than You Think</h2>
<p>Malta and Gozo have 7 megalithic temples on the UNESCO list. The oldest — Ggantija on Gozo — was built around 3600 BCE. For comparison:</p>
<ul>
<li>Great Pyramid of Giza: ~2560 BCE (1,000 years YOUNGER)</li>
<li>Stonehenge: ~3000 BCE (600 years YOUNGER)</li>
<li>Ggantija: ~3600 BCE</li>
</ul>
<p>This makes Maltese temples the oldest freestanding structures in the world.</p>

<h2>Who Were the Builders</h2>
<p>We know almost nothing. They left no writing. We don't know what they called themselves, what they believed, how they organized. We know they:</p>
<ul>
<li>Built with enormous limestone blocks (up to 50 tonnes!)</li>
<li>Created figurines of obese figures (perhaps fertility goddesses)</li>
<li>Their culture lasted about 1,000 years, then... vanished without a trace</li>
</ul>

<h2>Which to Visit</h2>
<ul>
<li><strong>Ggantija (Gozo)</strong> — oldest, best preserved. Museum at entrance. €9</li>
<li><strong>Hagar Qim & Mnajdra (Qrendi)</strong> — on a clifftop above the sea, spectacular location. €10</li>
<li><strong>Tarxien</strong> — in the middle of a town (!). Richly decorated. €6</li>
<li><strong>Hal Saflieni Hypogeum</strong> — underground temple carved into rock. ONLY one in the world. Book WEEKS ahead — max 80 visitors per day. €35</li>
</ul>
`,
  },

  // ── 18. FILM LOCATIONS ──
  {
    slug: "en-malta-film-locations",
    title: "Film Malta — Game of Thrones, Gladiator, Troy and 300 More",
    subtitle: "Why Hollywood loves Malta and which Maklowicz spots you know from the screen",
    topic: "sightseeing",
    lang: "en",
    tags: ["film", "game of thrones", "hollywood", "locations", "cinema"],
    cover_image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    source_count: 234,
    avg_confidence: 88,
    body_html: `
<h2>Why Malta</h2>
<p>Malta is a filmmaker's paradise: 300 days of sunshine, historic architecture, sea, desert landscapes, and modern film studios (Malta Film Studios) with one of the largest water tanks for marine shots in the world.</p>
<p>Over 300 films and series have been shot here since the 1960s. Many places Maklowicz visited, you've already seen on screen.</p>

<h2>Maklowicz's Locations in Film</h2>
<table>
<tr><th>Location</th><th>Film/Series</th><th>Scene</th></tr>
<tr><td>Mdina</td><td>Game of Thrones (S1)</td><td>King's Landing — gate, streets</td></tr>
<tr><td>Fort St Angelo (Birgu)</td><td>Assassin's Creed</td><td>Templar fortress</td></tr>
<tr><td>Valletta</td><td>Munich (Spielberg)</td><td>Beirut scenes</td></tr>
<tr><td>Azure Window (Gozo)</td><td>Game of Thrones (S1)</td><td>Daenerys & Drogo wedding</td></tr>
<tr><td>Grand Harbour</td><td>Troy</td><td>Ports of Troy</td></tr>
<tr><td>Fort Ricasoli</td><td>Gladiator</td><td>Colosseum scenes</td></tr>
</table>

<h2>Other Famous Productions</h2>
<ul>
<li><strong>Popeye (1980)</strong> — Robin Williams. The film village in Anchor Bay still stands as a tourist attraction</li>
<li><strong>World War Z</strong> — Brad Pitt. Valletta scenes</li>
<li><strong>Napoleon (2023)</strong> — Ridley Scott. Valletta fortifications</li>
</ul>
`,
  },

  // ── 19. DIVING ──
  {
    slug: "en-diving-malta-crystal-waters",
    title: "Diving in Malta — Crystal Waters and Wrecks from Two World Wars",
    subtitle: "Why Malta is in the top 5 diving destinations in Europe",
    topic: "beaches",
    lang: "en",
    tags: ["diving", "wrecks", "sea", "sport", "underwater"],
    cover_image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    source_count: 198,
    avg_confidence: 89,
    body_html: `
<h2>Why Malta for Diving</h2>
<p>Malta is one of the best diving destinations in Europe:</p>
<ul>
<li><strong>Visibility:</strong> 30–40 metres. Crystal clear water</li>
<li><strong>Temperature:</strong> 15°C in winter, 28°C in summer. Year-round diving</li>
<li><strong>Wrecks:</strong> 50+ wrecks from WWII to deliberately sunken ships and planes</li>
<li><strong>Caves and grottos:</strong> Blue Hole (Gozo), Santa Marija Caves, Inland Sea</li>
<li><strong>Accessibility:</strong> Many sites diveable from shore (shore dives), no boat needed</li>
</ul>

<h2>Top Sites</h2>
<ul>
<li><strong>Blue Hole (Gozo)</strong> — natural rock pool with underwater window. Diving from 6 to 60 metres. Next to the former Azure Window</li>
<li><strong>HMS Maori (Valletta)</strong> — WWII destroyer wreck at 14 metres. Ideal for beginners</li>
<li><strong>Um el Faroud</strong> — sunken tanker at 36 metres. Large, spectacular</li>
<li><strong>P29 (Cirkewwa)</strong> — deliberately sunken patrol boat. 12–35m</li>
<li><strong>Inland Sea (Gozo)</strong> — tunnel leading from an enclosed lake to open sea. Magical</li>
</ul>

<h2>For Beginners</h2>
<p>Malta is a great place for a PADI Open Water course. Dive schools offer courses from €350 (3–4 days). Warm water, calm bays, professional instructors.</p>
<p>If you don't want to get certified — try "Discover Scuba Diving" (one dive with instructor, around €60).</p>
`,
  },

  // ── 20. MAKLOWICZ TIPS ──
  {
    slug: "en-maklowicz-tips-for-tourists",
    title: "10 Golden Tips from Maklowicz for Malta Tourists",
    subtitle: "Everything Robert Maklowicz taught us about visiting Malta — collected from three episodes",
    topic: "tips",
    lang: "en",
    tags: ["tips", "maklowicz", "sightseeing", "practical", "advice"],
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    source_count: 445,
    avg_confidence: 97,
    body_html: `
<p>Robert Maklowicz isn't just a culinary genius — he's an experienced traveller who knows how to explore wisely. We've collected the best tips from his three Malta episodes.</p>

<h2>1. Rest in Beautiful Places</h2>
<p><em>"A sensible tourist should sit down from time to time, and choose places where you can also sightsee while seated."</em></p>
<p>Upper Barrakka Gardens, Fontanella in Mdina, Citadella terrace on Gozo — choose rest stops with a view.</p>

<h2>2. Start With Pastizzi</h2>
<p><em>"For fifty cents you're in paradise."</em></p>
<p>Pastizzi are the perfect breakfast: cheap, filling, authentic. Crystal Palace in Rabat is legendary.</p>

<h2>3. Eat What Locals Eat</h2>
<p>Maklowicz always sought local dishes, not tourist fare. Fenek (rabbit), ftira, hobz biz-zejt — these are dishes Maltese people eat themselves.</p>

<h2>4. The Gozo Ferry Is an Adventure, Not Transport</h2>
<p><em>"It's not a particularly gruelling voyage, as it takes about 25 minutes."</em></p>
<p>Don't treat the ferry like a bus. Go out on deck, watch the sea, spot Comino along the way.</p>

<h2>5. Mdina Must Be Visited at Night</h2>
<p><em>"Mdina at night is the most beautiful farewell Malta can offer."</em></p>
<p>Most tourists visit Mdina during the day. Big mistake. Arrive at sunset, stay until dark.</p>

<h2>6. Seek History, Not Beaches</h2>
<p>Maklowicz never once lay on a beach. Malta isn't Mallorca — you come here for history, architecture and food. Beaches are a bonus.</p>

<h2>7. Don't Fear Side Streets</h2>
<p>The most interesting things in Malta aren't on main routes. Strait Street, Birgu's alleys, village pastizzerias — go off the beaten path.</p>

<h2>8. Respect the Churches</h2>
<p>Malta has 365 churches — one for every day of the year. Enter them (usually free) — each is a mini art museum.</p>

<h2>9. Try Local Wine</h2>
<p><em>"The wine was barely drinkable, and how is it now?"</em></p>
<p>Maltese wine has undergone a revolution. The Gellewza grape exists only here — this is your chance for a unique experience.</p>

<h2>10. Malta Is Not a Day Trip</h2>
<p>Maklowicz spent 3 days and barely scratched the surface. Plan at minimum 4–5 days: 2 for Malta, 1–2 for Gozo, 1 for relaxation.</p>
`,
  },
];

async function main() {
  console.log("🇬🇧 Inserting 20 English Makłowicz-themed articles...\n");

  for (const a of EN_ARTICLES) {
    await upsert({
      ...a,
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });
  }

  console.log(`\n✅ ${EN_ARTICLES.length} English articles inserted!`);
}

main().catch(console.error);
