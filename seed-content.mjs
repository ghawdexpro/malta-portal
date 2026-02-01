#!/usr/bin/env node
/**
 * Seed production content: 9 topic articles + enriched Maklowicz stops
 * Run: node seed-content.mjs
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env vars. Run: source .env.local && node seed-content.mjs");
  process.exit(1);
}

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

async function upsert(table, data, onConflict) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const h = { ...headers, Prefer: "return=minimal,resolution=merge-duplicates" };
  const res = await fetch(url, {
    method: "POST",
    headers: h,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error(`  ❌ ${table}: ${res.status} ${txt}`);
  } else {
    console.log(`  ✅ ${table}: ${Array.isArray(data) ? data.length : 1} rows`);
  }
}

// ─── ARTICLES ────────────────────────────────────────────────

const articles = [
  {
    slug: "best-restaurants-malta-locals-recommend",
    title: "The Best Restaurants in Malta That Locals Actually Recommend",
    subtitle: "Forget TripAdvisor — here's where Maltese people and seasoned tourists really eat",
    topic: "restaurants",
    lang: "en",
    tags: ["food", "restaurants", "valletta", "marsaxlokk", "maltese cuisine", "budget"],
    source_count: 347,
    avg_confidence: 89,
    cover_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    status: "published",
    published_at: "2026-01-28T12:00:00Z",
    body_html: `
<p>Malta's dining scene is one of the island's best-kept secrets. While tourist traps cluster around St Julian's and Sliema, the real magic happens in family-run trattorias in Valletta's back streets, harbour-side fish shacks in Marsaxlokk, and village festas where entire communities share feasts.</p>

<h2>Valletta — The Capital of Flavour</h2>
<p>Valletta has undergone a gastronomic renaissance. <strong>Noni</strong> on Archbishop Street is consistently praised as the island's finest — expect a modern Maltese tasting menu using seasonal local produce. For something more casual, <strong>Legligin</strong> serves stunning wine-bar plates with local cheese, sundried tomatoes, and bigilla (bean dip) paired with Maltese wines.</p>
<p>The locals' favourite quick lunch? <strong>Pastizzi</strong> from any street vendor — flaky filo pastry stuffed with ricotta or mushy peas, costing just €0.50. The most famous spot is <strong>Crystal Palace</strong> in Rabat, open since 1956.</p>

<h2>Marsaxlokk — Sunday Fish Market</h2>
<p>Every Sunday, the fishing village of Marsaxlokk transforms into Malta's biggest open-air market. The colourful <em>luzzu</em> boats line the harbour while fishermen sell the morning catch. Head to <strong>Tartarun</strong> or <strong>La Reggia</strong> for impeccably fresh grilled swordfish, lampuki (mahi-mahi), and octopus. Prices are surprisingly fair — a full fish platter runs €15-22.</p>

<h2>The Three Cities — Hidden Gems</h2>
<p><strong>Tal-Petut</strong> in Birgu is a communal dining experience in a 400-year-old house. There's no menu — the chef cooks whatever was fresh at the market. Booking weeks ahead is essential. In Bormla, <strong>Two and a Half Lemons</strong> serves creative Mediterranean dishes in a converted palazzo.</p>

<h2>Gozo — Farm to Table</h2>
<p>Gozo takes farm-to-table literally. <strong>Ta' Rikardu</strong> in Victoria's Citadella serves handmade ravioli with fresh gbejniet (goat cheese), followed by rabbit stew cooked in local wine. <strong>Tmun</strong> in Xlendi offers harbour views with sophisticated seafood.</p>

<h2>What to Order</h2>
<ul>
  <li><strong>Fenek (rabbit)</strong> — Malta's national dish, slow-cooked in wine and garlic</li>
  <li><strong>Lampuki pie</strong> — seasonal fish pie (October-December)</li>
  <li><strong>Kapunata</strong> — Maltese ratatouille with capers and olives</li>
  <li><strong>Ftira</strong> — Gozitan sourdough bread with tomatoes, tuna, capers</li>
  <li><strong>Imqaret</strong> — fried date pastries for dessert</li>
  <li><strong>Kinnie</strong> — bitter orange soft drink, the national beverage</li>
</ul>

<h2>Budget Tips</h2>
<p>Eating well in Malta doesn't require deep pockets. Pastizzi cost €0.50, a ftira sandwich €3-5, and a three-course meal at a village restaurant €20-30 per person with wine. Avoid waterfront restaurants in Sliema and St Julian's — locals consider them overpriced tourist traps with mediocre food.</p>
`,
  },
  {
    slug: "malta-beaches-complete-guide",
    title: "Malta's Best Beaches and Swimming Spots — A Complete Guide",
    subtitle: "Crystal-clear waters, hidden coves, and the beaches locals keep to themselves",
    topic: "beaches",
    lang: "en",
    tags: ["beaches", "swimming", "snorkelling", "blue lagoon", "gozo", "summer"],
    source_count: 289,
    avg_confidence: 92,
    cover_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    status: "published",
    published_at: "2026-01-27T10:00:00Z",
    body_html: `
<p>Malta may be a small archipelago, but its coastline packs an extraordinary variety of swimming spots — from sandy beaches and rocky platforms to hidden caves and the famous Blue Lagoon. Here's the definitive guide based on hundreds of tourist experiences.</p>

<h2>Sandy Beaches</h2>
<p><strong>Golden Bay</strong> is Malta's most popular sandy beach, with sunbeds, water sports, and a beach bar. It faces west, making it the island's best sunset spot. Just next door, <strong>Ghajn Tuffieha</strong> (Riviera Beach) requires a steep staircase descent but rewards with less crowds and wilder beauty.</p>
<p><strong>Mellieha Bay</strong> is the largest sandy beach, perfect for families — the water stays shallow for 50+ metres. <strong>Pretty Bay</strong> in Birzebbuga is the locals' after-work beach, small but charming with turquoise water.</p>

<h2>Rocky Platforms & Coves</h2>
<p><strong>St Peter's Pool</strong> near Marsaxlokk is Malta's most photographed natural swimming pool — a flat limestone platform with a deep turquoise inlet. Perfect for cliff jumping (5-8m). <strong>Ghar Lapsi</strong> is a sheltered cove beloved by snorkellers, with an underwater cave system teeming with marine life.</p>
<p><strong>Sliema's Rocky Coast</strong> runs for 3km along Tower Road — locals lay towels on the flat rocks and ladder into the sea. It's the most convenient swim in Malta, with cafés and ice cream shops metres away.</p>

<h2>Gozo's Beaches</h2>
<p><strong>Ramla Bay</strong> is Gozo's crown jewel — a wide red-sand beach framed by green hills, with Calypso's Cave overlooking from above. <strong>San Blas Bay</strong> is its secret neighbour, reached by a very steep path that keeps the crowds away. <strong>Dwejra</strong> (former Azure Window site) still offers extraordinary swimming around the Inland Sea and Blue Hole.</p>

<h2>Comino — The Blue Lagoon</h2>
<p>The Blue Lagoon between Comino and Cominotto is Malta's most famous attraction — impossibly turquoise water over white sand. <strong>Reality check:</strong> in summer (June-September) it's extremely crowded. The trick is to take the first boat at 9:00 AM or visit in May/October. Budget €15-25 for the boat round trip from Cirkewwa.</p>

<h2>Best Snorkelling Spots</h2>
<ul>
  <li><strong>Wied iz-Zurrieq</strong> — Blue Grotto area, underwater caves</li>
  <li><strong>Ghar Lapsi</strong> — sheltered bay with abundant sea life</li>
  <li><strong>Dwejra, Gozo</strong> — Blue Hole, advanced divers' paradise</li>
  <li><strong>Paradise Bay</strong> — small sandy beach near Cirkewwa ferry</li>
  <li><strong>Mgarr ix-Xini, Gozo</strong> — fjord-like inlet with crystal visibility</li>
</ul>

<h2>Practical Tips</h2>
<p>Malta's sea season runs May through November, with water temperatures peaking at 26°C in August. Most beaches have no shade — bring an umbrella. Jellyfish appear occasionally in August. The Purple Flag beaches (Golden Bay, Mellieha, Pretty Bay) have lifeguards and facilities. Rocky coastlines require reef shoes.</p>
`,
  },
  {
    slug: "getting-around-malta-transport-guide",
    title: "Getting Around Malta — Buses, Ferries, Cars & the Truth About Traffic",
    subtitle: "Everything Polish tourists need to know about Malta's transport system",
    topic: "transport",
    lang: "en",
    tags: ["buses", "ferry", "car rental", "bolt", "tallinja", "driving", "gozo"],
    source_count: 412,
    avg_confidence: 85,
    cover_image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    status: "published",
    published_at: "2026-01-26T08:00:00Z",
    body_html: `
<p>Transport is the single most discussed topic among Malta tourists — and for good reason. The island's infrastructure hasn't kept pace with its booming population and tourism. Here's the unfiltered truth and practical advice from hundreds of visitors.</p>

<h2>Public Buses (Tallinja)</h2>
<p>Malta's bus network, operated by <strong>Malta Public Transport (Tallinja)</strong>, covers the entire island from a central hub in Valletta. A single ride costs <strong>€1.50 in winter, €2.00 in summer</strong>. The <strong>Tallinja Card</strong> (€21 for 7 days unlimited, called "Explore") is strongly recommended for tourists.</p>
<p><strong>The honest truth:</strong> Buses are cheap but unreliable. In summer, air conditioning struggles. Buses are frequently late or skip stops when full. The X-routes (airport express, harbour cruises) are more reliable. Google Maps gives decent real-time bus predictions. Download the <strong>Tallinja app</strong> for live tracking.</p>
<p>Key routes: <strong>1/2/3</strong> (Valletta↔airport), <strong>41/42</strong> (Valletta↔Cirkewwa ferry), <strong>81/84</strong> (Valletta↔Marsaxlokk).</p>

<h2>Gozo Ferry</h2>
<p>The <strong>Gozo Channel ferry</strong> runs between Cirkewwa (Malta) and Mgarr (Gozo) every 45 minutes. It costs <strong>€4.65 per person return</strong> (you only pay on the return trip). Cars cost ~€15 return. The crossing takes 25 minutes. <strong>No booking needed</strong> — just show up and queue. The <strong>fast ferry</strong> from Valletta to Mgarr runs 3x daily and costs €7.00 return.</p>

<h2>Car Rental</h2>
<p>A car gives you maximum flexibility, especially for reaching beaches and remote spots. Budget <strong>€25-40/day</strong> in summer. <strong>Warning:</strong> driving in Malta is chaotic. Roads are narrow, signage is poor, and locals drive aggressively. Maltese drive on the <strong>left</strong> (British system). Parking in Valletta and Sliema is a nightmare — use the underground car parks (€5-8/day).</p>
<p>Recommended: Rent a car for 1-2 days for coastal exploration and Gozo, use buses and Bolt for the rest.</p>

<h2>Bolt / Ride-hailing</h2>
<p><strong>Bolt</strong> (like Uber) works well in Malta. Airport to Sliema costs ~€12-15, Sliema to Valletta ~€6-8. It's often faster and more reliable than waiting for buses, especially at night. <strong>eCabs</strong> is the local alternative with fixed pricing and pre-booking options.</p>

<h2>Walking</h2>
<p>Valletta is best explored on foot — the entire city is just 1km long. The walk from Sliema to St Julian's along the seafront promenade is a beautiful 3km stroll. Beyond cities, Malta is not pedestrian-friendly — pavements often don't exist, and summer heat (35°C+) makes long walks uncomfortable.</p>

<h2>Budget Breakdown</h2>
<ul>
  <li>Tallinja 7-day card: <strong>€21</strong></li>
  <li>Gozo ferry return: <strong>€4.65</strong></li>
  <li>Airport Bolt: <strong>€12-15</strong></li>
  <li>Car rental/day: <strong>€25-40</strong></li>
  <li>Parking (underground): <strong>€5-8/day</strong></li>
</ul>
`,
  },
  {
    slug: "where-to-stay-malta-accommodation",
    title: "Where to Stay in Malta — Neighbourhoods, Hotels & Honest Advice",
    subtitle: "Sliema vs St Julian's vs Valletta vs Gozo — which area is right for you?",
    topic: "accommodation",
    lang: "en",
    tags: ["hotels", "airbnb", "sliema", "st julians", "valletta", "gozo", "budget"],
    source_count: 256,
    avg_confidence: 87,
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    status: "published",
    published_at: "2026-01-25T14:00:00Z",
    body_html: `
<p>Choosing the right area in Malta can make or break your holiday. Each neighbourhood has a distinct personality, and what guidebooks recommend doesn't always match reality. Here's what hundreds of Polish tourists actually experienced.</p>

<h2>Sliema — The Tourist Hub</h2>
<p><strong>Best for:</strong> First-time visitors, shopping, seafront promenades, easy bus connections.</p>
<p>Sliema is Malta's most popular tourist base. The Tower Road seafront offers rocky swimming spots, restaurants, and a 3km promenade to St Julian's. The Ferries terminal connects to Valletta in 5 minutes by boat. Shopping at The Point mall and Bisazza Street covers all needs.</p>
<p><strong>Downsides:</strong> Can feel generic and commercial. Accommodation is pricey in peak season. Street noise from nightlife in nearby Paceville.</p>
<p><strong>Budget:</strong> Hotels €60-150/night, Airbnb €40-90/night.</p>

<h2>St Julian's & Paceville — Nightlife Central</h2>
<p><strong>Best for:</strong> Young travellers, nightlife, Spinola Bay dining.</p>
<p>Paceville is Malta's party district with clubs open until 4AM. Spinola Bay offers picturesque waterfront dining. The Portomaso area has upscale hotels and the Hilton complex.</p>
<p><strong>Downsides:</strong> Extremely noisy at night (Thursday-Sunday). Paceville can feel seedy. Not family-friendly.</p>
<p><strong>Budget:</strong> Hotels €50-200/night, Airbnb €35-80/night.</p>

<h2>Valletta — The Cultural Heart</h2>
<p><strong>Best for:</strong> History lovers, architecture, culture, walkability.</p>
<p>Staying inside Valletta's walls means living in a UNESCO World Heritage city. Boutique hotels occupy converted 16th-century buildings. Everything is walkable — cathedrals, museums, restaurants, harbour views. The city empties after 8PM, creating a magical atmosphere.</p>
<p><strong>Downsides:</strong> Limited accommodation options and higher prices. Few supermarkets. Can feel quiet at night. Hilly streets with lots of stairs.</p>
<p><strong>Budget:</strong> Boutique hotels €80-250/night, Airbnb €50-120/night.</p>

<h2>Mellieha — Family Paradise</h2>
<p><strong>Best for:</strong> Families with children, beach holidays, quiet evenings.</p>
<p>Mellieha sits atop a ridge overlooking Malta's biggest sandy beach. It's quieter than Sliema, with good restaurants and the Popeye Village attraction nearby. The Cirkewwa ferry to Gozo is just 10 minutes away.</p>
<p><strong>Downsides:</strong> Far from Valletta (45+ min by bus). Limited nightlife. Car recommended.</p>
<p><strong>Budget:</strong> Hotels €45-120/night, Airbnb €30-70/night.</p>

<h2>Gozo — The Escape</h2>
<p><strong>Best for:</strong> Nature lovers, diving, quiet retreats, farmhouse stays.</p>
<p>Gozo is Malta's greener, quieter sister island. Converted farmhouses with pools are the signature accommodation. Victoria (Rabat) is the main town with the Citadella. Beaches are less crowded, diving is world-class, and the pace of life is wonderfully slow.</p>
<p><strong>Downsides:</strong> Requires ferry crossing. Limited public transport. Car essential. Fewer restaurant options.</p>
<p><strong>Budget:</strong> Farmhouses €70-200/night, Hotels €50-150/night.</p>

<h2>Pro Tips</h2>
<ul>
  <li>Book Gozo farmhouses months in advance for summer</li>
  <li>Avoid ground-floor Airbnbs in Sliema/St Julian's — street noise is brutal</li>
  <li>Valletta B&Bs often include rooftop terraces with harbour views</li>
  <li>Check if your hotel has a pool — it's essential in July/August heat</li>
  <li>AirBnB is generally better value than hotels in Malta</li>
</ul>
`,
  },
  {
    slug: "malta-prices-budget-guide-2026",
    title: "Malta Prices & Budget Guide 2026 — What Everything Really Costs",
    subtitle: "Real prices from real tourists — restaurants, transport, activities, and daily budgets",
    topic: "prices",
    lang: "en",
    tags: ["budget", "prices", "costs", "money", "euro", "tipping", "2026"],
    source_count: 378,
    avg_confidence: 91,
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
    status: "published",
    published_at: "2026-01-24T09:00:00Z",
    body_html: `
<p>Malta uses the <strong>Euro (€)</strong>, making it convenient for European travellers. Prices have risen noticeably since 2022, but Malta remains affordable compared to Italy, France, or Spain. Here's a comprehensive breakdown based on data from nearly 400 tourist reports.</p>

<h2>Daily Budget Tiers</h2>
<table>
  <thead><tr><th>Style</th><th>Per Day</th><th>Includes</th></tr></thead>
  <tbody>
    <tr><td><strong>Backpacker</strong></td><td>€40-60</td><td>Hostel, pastizzi & street food, buses, free beaches</td></tr>
    <tr><td><strong>Comfortable</strong></td><td>€80-120</td><td>3-star hotel, restaurant lunches, Bolt rides, 1-2 activities</td></tr>
    <tr><td><strong>Premium</strong></td><td>€150-250</td><td>4-star hotel, fine dining, car rental, boat trips</td></tr>
  </tbody>
</table>

<h2>Food & Drink Prices</h2>
<ul>
  <li>Pastizzi (street): <strong>€0.50</strong></li>
  <li>Ftira sandwich: <strong>€3-5</strong></li>
  <li>Coffee (espresso): <strong>€1.50-2.50</strong></li>
  <li>Beer (pint, bar): <strong>€3-5</strong></li>
  <li>Wine (glass, restaurant): <strong>€4-7</strong></li>
  <li>Lunch (casual restaurant): <strong>€12-18</strong></li>
  <li>Dinner (mid-range, 3 courses): <strong>€25-40</strong></li>
  <li>Fine dining tasting menu: <strong>€60-100</strong></li>
  <li>Water (1.5L, supermarket): <strong>€0.50</strong></li>
  <li>Cisk beer (supermarket): <strong>€1.20</strong></li>
</ul>

<h2>Transport Costs</h2>
<ul>
  <li>Bus single ride (summer): <strong>€2.00</strong></li>
  <li>Tallinja Explore 7-day card: <strong>€21</strong></li>
  <li>Gozo ferry (return, pedestrian): <strong>€4.65</strong></li>
  <li>Bolt airport→Sliema: <strong>€12-15</strong></li>
  <li>Bolt Sliema→Valletta: <strong>€6-8</strong></li>
  <li>Car rental (per day, summer): <strong>€25-40</strong></li>
  <li>Parking (underground, Valletta): <strong>€5-8/day</strong></li>
  <li>Petrol (per litre): <strong>€1.45</strong></li>
</ul>

<h2>Activities & Attractions</h2>
<ul>
  <li>Blue Lagoon boat trip: <strong>€15-25</strong></li>
  <li>Harbour cruise: <strong>€10-20</strong></li>
  <li>St John's Co-Cathedral: <strong>€15</strong></li>
  <li>Hypogeum (underground temple): <strong>€40</strong> — book weeks ahead!</li>
  <li>Diving (1 dive with gear): <strong>€45-65</strong></li>
  <li>Segway tour Valletta: <strong>€30-45</strong></li>
  <li>Mdina glass-blowing demo: <strong>Free</strong></li>
  <li>Most churches: <strong>Free</strong></li>
</ul>

<h2>Accommodation (per night, double room)</h2>
<ul>
  <li>Hostel dorm: <strong>€15-25</strong></li>
  <li>Budget hotel/Airbnb: <strong>€35-60</strong></li>
  <li>Mid-range hotel: <strong>€70-130</strong></li>
  <li>4-star hotel: <strong>€120-200</strong></li>
  <li>5-star / boutique: <strong>€200-400</strong></li>
  <li>Gozo farmhouse (whole house): <strong>€100-250</strong></li>
</ul>

<h2>Tipping</h2>
<p>Tipping is not mandatory in Malta but appreciated. Most locals round up or leave 5-10% at restaurants. Check if service charge is already included (common at upscale places). Taxi/Bolt drivers don't expect tips.</p>

<h2>Money-Saving Tips</h2>
<ul>
  <li>Eat lunch as the main meal — many restaurants have cheaper lunch menus</li>
  <li>Buy water and snacks from supermarkets (Lidl, Welbee's), not tourist shops</li>
  <li>Free swimming spots outnumber paid beaches 10:1</li>
  <li>The Heritage Malta Multisite Pass (€50) covers 23 museums and sites</li>
  <li>Valletta is free to explore — the architecture IS the attraction</li>
</ul>
`,
  },
  {
    slug: "malta-sightseeing-must-see-attractions",
    title: "Malta Sightseeing — 15 Must-See Attractions Ranked by Tourists",
    subtitle: "From ancient temples to baroque cathedrals — what's actually worth your time",
    topic: "sightseeing",
    lang: "en",
    tags: ["history", "temples", "valletta", "mdina", "gozo", "museums", "architecture"],
    source_count: 302,
    avg_confidence: 93,
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    status: "published",
    published_at: "2026-01-23T11:00:00Z",
    body_html: `
<p>Malta packs 7,000 years of history into 316 square kilometres. You'll find prehistoric temples older than the Egyptian pyramids, medieval fortified cities, baroque masterpieces, and World War II bunkers — sometimes all within walking distance. Here are the top attractions ranked by tourist satisfaction.</p>

<h2>1. Valletta — The Entire City</h2>
<p>Malta's capital is a UNESCO World Heritage Site and the smallest national capital in the EU. The entire city is essentially one giant open-air museum built by the Knights of St. John after 1566. Walk Republic Street end to end, explore the side streets, and soak in the honey-coloured limestone architecture. <strong>Rating: Essential.</strong></p>

<h2>2. St John's Co-Cathedral</h2>
<p>Behind a plain exterior hides one of Europe's most spectacular baroque interiors. Every surface is covered in gilded carvings, and the floor is paved with 400 marble tombstones of Knights. The highlight: Caravaggio's masterpiece <em>"The Beheading of Saint John the Baptist"</em> — the only painting he ever signed. <strong>Entry: €15. Worth every cent.</strong></p>

<h2>3. Mdina — The Silent City</h2>
<p>Malta's former capital is a perfectly preserved medieval walled city. Enter through the main gate and step back 1,000 years. Narrow streets, aristocratic palaces, and absolute silence (cars are banned). Visit at sunset or after dark for the most atmospheric experience. <strong>Free entry. Magical.</strong></p>

<h2>4. Ħal Saflieni Hypogeum</h2>
<p>An underground prehistoric temple complex dating to 4000 BC — the only known example of a subterranean temple in the world. Only 80 visitors per day are allowed. <strong>Book 4-6 weeks in advance online. Entry: €40. Truly unique.</strong></p>

<h2>5. The Three Cities (Birgu, Senglea, Bormla)</h2>
<p>Across the Grand Harbour from Valletta, these three fortified cities predate the capital. Birgu (Vittoriosa) is the most charming, with the Inquisitor's Palace and Fort St. Angelo. Take the traditional <em>dghajsa</em> water taxi across the harbour. <strong>Underrated gem.</strong></p>

<h2>6. Blue Grotto</h2>
<p>A series of sea caves near Wied iz-Zurrieq, best visited in the morning when sunlight illuminates the phosphorescent blue water. A small boat takes you through six caves (€8, 25 minutes). The cliff viewpoint above is free and spectacular.</p>

<h2>7. Gozo's Citadella</h2>
<p>The fortified heart of Victoria (Rabat) on Gozo, with 360° views of the island. Inside the walls: a baroque cathedral, archaeological museum, and old prison. The surrounding countryside of terraced fields and stone farmhouses is quintessential Mediterranean. <strong>Free entry to citadel walls.</strong></p>

<h2>8. Megalithic Temples (Ħagar Qim & Mnajdra)</h2>
<p>These UNESCO-listed temples date to 3600 BC — older than Stonehenge and the Egyptian pyramids. Perched on coastal cliffs with sea views, the site includes a visitor centre with 4D film. <strong>Entry: €10. Heritage Malta pass covers it.</strong></p>

<h2>9. Upper Barrakka Gardens</h2>
<p>Valletta's most famous viewpoint, overlooking the Grand Harbour and the Three Cities. The noon cannon firing is a daily tradition. Free entry, perfect for photos at any time of day.</p>

<h2>10. Fort St. Elmo & War Museum</h2>
<p>The star-shaped fort at Valletta's tip played a crucial role in the Great Siege of 1565 and World War II. The National War Museum inside chronicles Malta's role as "the most bombed place on Earth" during WWII. <strong>Entry: €10.</strong></p>

<h2>More Must-See Spots</h2>
<ul>
  <li><strong>11. Marsaxlokk village</strong> — Colourful fishing boats and Sunday market</li>
  <li><strong>12. Popeye Village</strong> — Film set turned family attraction in Mellieha</li>
  <li><strong>13. Dingli Cliffs</strong> — Malta's highest point with dramatic sea views</li>
  <li><strong>14. St Paul's Catacombs</strong> — Early Christian underground tombs in Rabat</li>
  <li><strong>15. Ta' Pinu Basilica, Gozo</strong> — Pilgrimage church in stunning countryside</li>
</ul>

<h2>Practical Tips</h2>
<p>The <strong>Heritage Malta Multisite Pass</strong> (€50) gives entry to 23 sites over 30 days — excellent value if you visit 4+ sites. Most museums close at 5PM. Churches are free but may close during services. Wear comfortable shoes — Malta is all limestone stairs and cobblestones.</p>
`,
  },
  {
    slug: "malta-events-festivals-calendar",
    title: "Malta Events & Festivals — What's Happening on the Island",
    subtitle: "Village festas, fireworks, carnival, and the cultural events calendar",
    topic: "events",
    lang: "en",
    tags: ["festivals", "festas", "carnival", "fireworks", "music", "culture", "calendar"],
    source_count: 156,
    avg_confidence: 84,
    cover_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    status: "published",
    published_at: "2026-01-22T16:00:00Z",
    body_html: `
<p>Malta has one of the densest festival calendars in Europe. With 365 churches and a deep Catholic tradition, there's quite literally a village festa almost every weekend during summer. Add the world-famous fireworks competitions, international music festivals, and historic re-enactments, and you have an island that never stops celebrating.</p>

<h2>Village Festas (June-September)</h2>
<p>The <strong>festa</strong> is the heart of Maltese culture. Each town and village celebrates its patron saint with a weekend of brass band marches, street decorations, food stalls, and spectacular fireworks. The entire village is draped in lights and banners, statues are paraded through streets, and the atmosphere is electric.</p>
<p><strong>Top festas to experience:</strong></p>
<ul>
  <li><strong>Santa Marija (15 August)</strong> — Celebrated in 7 towns simultaneously, the biggest being Mosta, Gudja, Ghaxaq, and Victoria (Gozo)</li>
  <li><strong>L-Imnarja (29 June)</strong> — Malta's folk festival at Buskett Gardens, with rabbit feasts and folk music</li>
  <li><strong>St Paul's Shipwreck (10 February)</strong> — Valletta's patron saint, grand procession through the capital</li>
</ul>

<h2>Malta International Fireworks Festival (April)</h2>
<p>One of Europe's largest fireworks competitions, held across the Grand Harbour. Teams from multiple countries compete with choreographed displays set to music. The Grand Harbour setting — with Valletta and the Three Cities as backdrop — is breathtaking. <strong>Free to watch from any harbour viewpoint.</strong></p>

<h2>Carnival (February)</h2>
<p>Malta's carnival dates back to the Knights of St. John in 1535. The main events happen in Valletta with elaborate floats, costumed dancers, and satirical displays. The atmosphere is family-friendly during the day and party-like at night. <strong>Nadur (Gozo) Carnival</strong> is the wild alternative — spontaneous, darker, and more irreverent.</p>

<h2>Notte Bianca (October)</h2>
<p>Valletta's annual arts festival transforms the capital into an open-air gallery. Museums open late for free, performances fill every piazza, and the streets come alive with music, art, and food until midnight. <strong>The single best night to be in Valletta.</strong></p>

<h2>Isle of MTV (June-July)</h2>
<p>A free open-air concert at Il-Fosos Square featuring major international acts. Past performers include The Chainsmokers, Hailee Steinfeld, and Marshmello. Tens of thousands attend. <strong>Free entry — just show up early.</strong></p>

<h2>Other Notable Events</h2>
<ul>
  <li><strong>Valletta Film Festival</strong> (June) — Open-air cinema at Pjazza Teatru Rjal</li>
  <li><strong>Malta Jazz Festival</strong> (July) — Grand Harbour setting, international jazz</li>
  <li><strong>Birgufest</strong> (October) — Birgu illuminated by candlelight</li>
  <li><strong>Christmas Village</strong> (December) — Valletta's festive market</li>
  <li><strong>In Guardia</strong> — Historical re-enactment at Fort St. Elmo, most Sundays</li>
</ul>

<h2>Tips</h2>
<p>Check the <strong>Malta Tourism Authority</strong> events calendar before your trip. Festas are free and open to everyone — just follow the noise and lights. Book accommodation early if visiting during Santa Marija week (mid-August) as the entire island celebrates.</p>
`,
  },
  {
    slug: "malta-practical-tips-first-time",
    title: "Malta Practical Tips — 25 Things to Know Before Your First Visit",
    subtitle: "Insider advice from seasoned tourists that guidebooks don't mention",
    topic: "tips",
    lang: "en",
    tags: ["tips", "advice", "first time", "safety", "language", "weather", "packing"],
    source_count: 445,
    avg_confidence: 88,
    cover_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    status: "published",
    published_at: "2026-01-21T07:00:00Z",
    body_html: `
<p>Malta is a fantastic destination, but a few practical insights can dramatically improve your experience. These tips come from hundreds of tourist experiences — the stuff you won't find in a Lonely Planet.</p>

<h2>Language & Communication</h2>
<ol>
  <li><strong>English is official</strong> — Everyone in Malta speaks English fluently. It's one of two official languages alongside Maltese. You'll never have a language barrier.</li>
  <li><strong>Maltese is unique</strong> — It's the only Semitic language written in Latin script, mixing Arabic roots with Italian and English words. Learning "grazzi" (thanks) and "bongu" (hello) earns smiles.</li>
</ol>

<h2>Weather & When to Visit</h2>
<ol start="3">
  <li><strong>Summer (July-August) is brutal</strong> — 35-40°C with high humidity. The best months are <strong>May-June</strong> and <strong>September-October</strong>: warm enough to swim, cool enough to explore.</li>
  <li><strong>Winter is mild but wet</strong> — 12-16°C, occasional heavy rain. Still great for sightseeing and much cheaper.</li>
  <li><strong>Pack sunscreen SPF50+</strong> — The Mediterranean sun is fierce, even in spring. Limestone reflects heat upward.</li>
</ol>

<h2>Getting Around</h2>
<ol start="6">
  <li><strong>Download the Tallinja app</strong> — Real-time bus tracking saves sanity. Buses can be 15+ minutes late.</li>
  <li><strong>Bolt is your friend</strong> — More reliable than buses, especially at night and for airport transfers.</li>
  <li><strong>Malta drives on the left</strong> — British legacy. If renting a car, the roundabouts will test you.</li>
  <li><strong>Don't drive in Valletta</strong> — Walk or take the ferry from Sliema. Parking inside the city walls is virtually impossible.</li>
</ol>

<h2>Money & Shopping</h2>
<ol start="10">
  <li><strong>Card payments are widespread</strong> — Most restaurants, shops, and buses accept contactless. Carry some cash for village shops and pastizzi stands.</li>
  <li><strong>Supermarkets close on Sundays</strong> — Stock up on Saturday. Only convenience stores stay open.</li>
  <li><strong>Lidl and Welbee's</strong> are the cheapest supermarkets. Avoid the small tourist shops — they're 2-3x the price.</li>
</ol>

<h2>Safety & Health</h2>
<ol start="13">
  <li><strong>Malta is extremely safe</strong> — Violent crime is practically non-existent. Pickpocketing is rare but use common sense in tourist areas.</li>
  <li><strong>Tap water is safe but tastes bad</strong> — It's desalinated seawater. Buy bottled water or bring a filter bottle.</li>
  <li><strong>Pharmacies are well-stocked</strong> — Basic medicines are available without prescription. There's always a duty pharmacy open 24/7.</li>
  <li><strong>EU health card works</strong> — EHIC/GHIC gives you access to public healthcare. Mater Dei Hospital is the main hospital.</li>
</ol>

<h2>Culture & Etiquette</h2>
<ol start="17">
  <li><strong>Cover shoulders in churches</strong> — Malta's 365 churches are active places of worship. Carry a light scarf.</li>
  <li><strong>Festas are unmissable</strong> — If a village festa is happening during your visit, go. It's the most authentic cultural experience on the island.</li>
  <li><strong>Maltese are friendly but reserved</strong> — They warm up quickly once you show interest in their culture and food.</li>
</ol>

<h2>Beaches & Swimming</h2>
<ol start="20">
  <li><strong>Bring reef shoes</strong> — Most beaches are rocky. The limestone is sharp on bare feet.</li>
  <li><strong>Sea urchins are real</strong> — Watch where you step on rocks. Vinegar helps if you get spiked.</li>
  <li><strong>Blue Lagoon at 9AM</strong> — Take the first boat to beat the crowds. By noon it's a floating carnival.</li>
</ol>

<h2>Hidden Gems</h2>
<ol start="23">
  <li><strong>Visit Birgu before Valletta</strong> — Fewer tourists, same history, better atmosphere, and the world's oldest casino building.</li>
  <li><strong>Gozo deserves 2+ days</strong> — Most tourists do a day trip and miss the magic. Stay overnight in a farmhouse.</li>
  <li><strong>Free entertainment</strong> — The noon cannon at Upper Barrakka, changing of the guard at the Palace, sunset at Golden Bay, and wandering Mdina at night — all free, all unforgettable.</li>
</ol>
`,
  },
  {
    slug: "gozo-complete-travel-guide",
    title: "Gozo — The Complete Guide to Malta's Green Sister Island",
    subtitle: "Farmhouses, diving, Citadella, and why one day isn't enough",
    topic: "gozo",
    lang: "en",
    tags: ["gozo", "diving", "citadella", "victoria", "ferry", "farmhouse", "nature"],
    source_count: 234,
    avg_confidence: 90,
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2ead1?w=1200&q=80",
    status: "published",
    published_at: "2026-01-20T13:00:00Z",
    body_html: `
<p>Gozo is Malta's smaller, greener, quieter sister island — and many tourists say it's the highlight of their trip. Just 14km long and 7km wide, Gozo feels like Malta did 30 years ago: terraced fields, stone farmhouses, village churches, and a pace of life that invites you to slow down.</p>

<h2>Getting There</h2>
<p>The <strong>Gozo Channel ferry</strong> departs from Cirkewwa (Malta's northwest tip) every 45 minutes, takes 25 minutes, and costs €4.65 return per person. You only pay on the return trip. Alternatively, the <strong>Gozo Fast Ferry</strong> runs from Valletta harbour directly to Mgarr, Gozo — 3x daily, €7.00 return, and saves the trip to Cirkewwa.</p>
<p><strong>Pro tip:</strong> Bring a car on the ferry (€15 return) or rent one in Gozo. Public transport is limited and you'll want to reach hidden beaches.</p>

<h2>Victoria (Rabat) & The Citadella</h2>
<p>Gozo's capital Victoria sits at the island's centre, crowned by the ancient <strong>Citadella</strong> — a fortified hilltop city with 360° views. Inside, explore the Cathedral of the Assumption (its ceiling is a painted illusion — there's no actual dome!), the archaeology museum, and the atmospheric old streets. The view from the walls at sunset is extraordinary.</p>
<p>Below the Citadella, Victoria's Pjazza Indipendenza (It-Tokk) is the social heart of Gozo — grab a coffee at Café Jubilee and watch island life unfold.</p>

<h2>Beaches & Swimming</h2>
<p><strong>Ramla Bay</strong> — Gozo's most famous beach with distinctive red sand, overlooked by Calypso's Cave (where the nymph supposedly held Odysseus captive for 7 years). Wide, sandy, and family-friendly.</p>
<p><strong>San Blas Bay</strong> — Ramla's secret neighbour, reached by a steep, unpaved path. Much quieter with the same red sand. Only for the determined (bring water!).</p>
<p><strong>Dwejra</strong> — The former Azure Window site is still spectacular. Swim in the <strong>Inland Sea</strong> (a lagoon connected to open sea by a tunnel) or dive the famous <strong>Blue Hole</strong>.</p>
<p><strong>Mgarr ix-Xini</strong> — A narrow fjord-like inlet perfect for snorkelling, with crystal visibility and underwater caves.</p>
<p><strong>Xlendi Bay</strong> — A tiny resort with waterfront restaurants and excellent snorkelling from the rocky sides.</p>

<h2>Diving — World Class</h2>
<p>Gozo is consistently rated among Europe's top diving destinations. The clear water (30m+ visibility), dramatic underwater topography, and lack of strong currents make it ideal.</p>
<ul>
  <li><strong>Blue Hole, Dwejra</strong> — Iconic dive site, vertical chimney opening to the sea</li>
  <li><strong>Cathedral Cave</strong> — Stunning cavern with light effects</li>
  <li><strong>Double Arch Reef</strong> — Natural rock arches at 20m depth</li>
  <li><strong>MV Karwela wreck</strong> — Purposely sunk patrol boat at Xatt l-Ahmar</li>
</ul>
<p>A single dive with full equipment rental costs €45-65. Multi-dive packages offer better value.</p>

<h2>Food & Restaurants</h2>
<p>Gozo's food scene is distinct from Malta's, with more emphasis on local produce.</p>
<ul>
  <li><strong>Ta' Rikardu</strong> (Citadella) — Fresh gbejniet, handmade ravioli, local wine</li>
  <li><strong>Tmun</strong> (Xlendi) — Harbour-view fine dining, creative seafood</li>
  <li><strong>Il-Kartell</strong> (Marsalforn) — Traditional Gozitan cooking, rabbit stew</li>
  <li><strong>Country Terrace</strong> (Mgarr) — Stunning views, honest home cooking</li>
</ul>
<p>Don't miss: <strong>Gozitan ftira</strong> (sourdough bread topped with tomatoes, tuna, capers, olives), <strong>gbejniet</strong> (local sheep/goat cheese), and <strong>Gozitan sausage</strong>.</p>

<h2>Accommodation</h2>
<p>Gozo's signature stay is the <strong>converted farmhouse</strong> — centuries-old stone buildings with private pools, rustic charm, and countryside views. They range from €70-250/night and are perfect for groups and families. Book early for summer.</p>
<p>Budget options exist in Victoria and Marsalforn. The <strong>Kempinski San Lawrenz</strong> and <strong>Thirtyseven Gozo</strong> offer luxury hotel experiences.</p>

<h2>Day Trip vs Overnight</h2>
<p>Most tourists do a day trip. <strong>They all regret not staying longer.</strong> One day barely covers the Citadella and one beach. With 2-3 nights, you can properly explore the island's hidden corners, enjoy the silence after the day-trippers leave, and discover why Gozo is many visitors' favourite part of Malta.</p>
`,
  },
];

// ─── MAKLOWICZ ENRICHMENT ────────────────────────────────────

const maklowiczUpdates = [
  {
    location_name: "Valletta - Old Town",
    description: "Maklowicz begins his Malta journey in the fortress capital Valletta, founded by Grand Master Jean de Valette after the Great Siege of 1565. He walks Republic Street, admires the honey-coloured limestone buildings, and introduces Malta as a crossroads where Arab, Norman, Aragonese, and British influences collide on every plate and in every stone.",
    quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu, a każdy zaułek opowiada inną historię.",
    food_mentioned: ["kapunata", "kinnie", "pastizzi"],
    lat: 35.8989,
    lng: 14.5146,
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80",
  },
  {
    location_name: "St. John's Co-Cathedral",
    description: "Inside this deceptively plain exterior hides one of the most breathtaking baroque interiors in Europe. Maklowicz marvels at Caravaggio's masterpiece 'The Beheading of Saint John the Baptist' — the largest painting the artist ever created and the only one he signed. The floor is paved with 400 marble tombstones of Knights from across Europe.",
    quote: "Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki.",
    food_mentioned: [],
    lat: 35.8976,
    lng: 14.5129,
    cover_image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800&q=80",
  },
  {
    location_name: "Grand Master's Palace",
    description: "The seat of power for 21 successive Grand Masters of the Knights of St. John, this palace is now home to Malta's President. Maklowicz walks through the State Rooms and the Armoury — one of the largest collections of medieval arms in the world, with over 5,000 pieces of weaponry and armour from the 16th-18th centuries.",
    quote: "Rycerze nie tylko modlili się i walczyli — potrafili też zbudować imperium, które trwało 268 lat.",
    food_mentioned: [],
    lat: 35.8988,
    lng: 14.5140,
  },
  {
    location_name: "Upper Barrakka Gardens",
    description: "From these elegant arcaded gardens, Maklowicz shows us the most iconic view in Malta — the Grand Harbour, the Three Cities, and Fort St. Angelo gleaming in the Mediterranean sun. He watches the noon cannon firing, a tradition dating back to British colonial times, and reflects on how this harbour has shaped Mediterranean history for millennia.",
    quote: "Z tych ogrodów widać całą historię Morza Śródziemnego — od fenickich żagli po współczesne jachty.",
    food_mentioned: [],
    lat: 35.8953,
    lng: 14.5088,
    cover_image: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=800&q=80",
  },
  {
    location_name: "Valletta Restaurants",
    description: "Maklowicz explores Valletta's restaurant scene, from humble pastizzerias to elegant wine bars. He tries kapunata — the Maltese cousin of ratatouille made with aubergine, olives, and capers — and explains how Maltese cuisine is a fusion of Sicilian generosity, Arabic spice, and British pragmatism. The highlight: a traditional Maltese platter with sundried tomatoes, bigilla (broad bean dip), gbejniet cheese, and local olives.",
    quote: "Kuchnia maltańska to najlepszy sposób, żeby zrozumieć historię tej wyspy — każde danie opowiada o innym zdobywcy.",
    food_mentioned: ["kapunata", "aubergine", "olives", "capers", "bigilla", "gbejniet", "sundried tomatoes"],
    lat: 35.8985,
    lng: 14.5130,
  },
  {
    location_name: "Birgu (Vittoriosa)",
    description: "Crossing the Grand Harbour by traditional dghajsa water taxi, Maklowicz arrives in Birgu — the original base of the Knights of St. John, predating Valletta by decades. He wanders the narrow, atmospheric streets of the oldest fortified city in Malta, visits the Inquisitor's Palace (one of only three surviving in the world), and finds a city that time has treated more gently than its famous neighbour.",
    quote: "Birgu jest jak Valletta bez turystów — te same kamienie, ta sama historia, ale cisza jakby czas się tu zatrzymał.",
    food_mentioned: ["hobz biz-zejt", "olive oil"],
    lat: 35.8878,
    lng: 14.5221,
    cover_image: "https://images.unsplash.com/photo-1600108515428-1b170ff22221?w=800&q=80",
  },
  {
    location_name: "St. Paul's Bay",
    description: "Maklowicz follows the trail of the Apostle Paul, whose ship famously wrecked on Malta's shores in 60 AD. According to tradition, Paul survived a viper bite, healed the Roman governor's father, and personally converted the Maltese to Christianity during his three-month stay. The bay named after him is now a bustling tourist resort, but the saint's legacy is woven into every aspect of Maltese identity.",
    quote: "Święty Paweł zostawił na Malcie coś więcej niż wiarę — zostawił tożsamość.",
    food_mentioned: [],
    lat: 35.9505,
    lng: 14.3962,
  },
  {
    location_name: "Gozo Ferry Terminal (Cirkewwa)",
    description: "Maklowicz boards the ferry to Gozo from Malta's northwestern tip at Cirkewwa. The 25-minute crossing offers stunning views of Comino island and the famous Blue Lagoon. He describes Gozo as 'what Malta was fifty years ago' — greener, quieter, and more traditional. The anticipation builds as the limestone cliffs of Gozo grow closer.",
    quote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
    food_mentioned: [],
    lat: 36.0003,
    lng: 14.3269,
  },
  {
    location_name: "Gozo - Victoria (Rabat)",
    description: "In Gozo's charming capital, Maklowicz dives deep into the island's culinary traditions. He visits the indoor market where farmers sell fresh produce, tries handmade Gozitan sausage and local sheep's cheese (gbejniet), and settles into a traditional restaurant for swordfish in tomato sauce with black olives — a dish that perfectly captures Gozo's fusion of sea and land.",
    quote: "Gozo to wyspa, gdzie jedzenie nadal smakuje tak, jak powinno — prosto, uczciwie, z serca.",
    food_mentioned: ["swordfish", "tomato sauce", "black olives", "gbejniet", "Gozitan sausage", "ftira"],
    lat: 36.0440,
    lng: 14.2391,
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2ead1?w=800&q=80",
  },
  {
    location_name: "Citadella (Gozo)",
    description: "Climbing to the fortified crown of Gozo, Maklowicz explores the ancient Citadella — a natural fortress inhabited for over 5,000 years. He enters the Cathedral of the Assumption, whose ceiling is a masterful trompe l'oeil painting (the planned dome was never built due to lack of funds). From the ramparts, the entire island stretches below — terraced hillsides, domed churches, and the blue Mediterranean in every direction.",
    quote: "Z Cytadeli widać całe Gozo jak na dłoni — i od razu rozumiesz, dlaczego ludzie tu mieszkają od pięciu tysięcy lat.",
    food_mentioned: [],
    lat: 36.0463,
    lng: 14.2396,
  },
  {
    location_name: "Rabat",
    description: "Returning to Malta's main island, Maklowicz explores Rabat — the town that wraps around the walls of ancient Mdina. He visits the stunning Dominican Priory with its world-class collection of Baroque paintings (including works by Mattia Preti), explores the Roman Villa with its beautiful mosaic floors, and begins his search for the perfect pastizzi — Malta's beloved flaky pastry.",
    quote: "Rabat to brama do przeszłości — za każdym rogiem czeka coś, co pamięta czasy starsze niż Europa.",
    food_mentioned: ["pastizzi"],
    lat: 35.8828,
    lng: 14.3975,
    cover_image: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=800&q=80",
  },
  {
    location_name: "St. Paul's Catacombs",
    description: "Descending beneath Rabat's streets, Maklowicz enters one of Europe's most remarkable early Christian sites — catacombs dating to the 3rd century AD where the first Maltese Christians buried their dead. The underground chambers stretch in a labyrinth of connecting rooms, with carved stone tables where mourners held funeral banquets. Tradition says St. Paul himself taught in these caves during his stay on Malta.",
    quote: "Pod ulicami Rabatu kryje się inny świat — cichy, chłodny, pełen tajemnic wczesnego chrześcijaństwa.",
    food_mentioned: [],
    lat: 35.8815,
    lng: 14.3990,
  },
  {
    location_name: "Pastizzi Shop in Rabat",
    description: "Maklowicz finds what he's been looking for — an authentic pastizzi shop where the flaky, diamond-shaped pastries are made fresh throughout the day. He tries both varieties: rikotta (ricotta cheese) and piżelli (mushy peas), and declares them one of the great street foods of the Mediterranean. At just 50 cents each, pastizzi are the democratic food of Malta — eaten by construction workers and ministers alike.",
    quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju.",
    food_mentioned: ["pastizzi", "ricotta", "mushy peas", "flaky pastry"],
    lat: 35.8822,
    lng: 14.3970,
  },
  {
    location_name: "Mdina - The Silent City",
    description: "Entering through the grand baroque gate, Maklowicz steps into Mdina — the 'Silent City' and Malta's former capital, perched on a hilltop and enclosed by medieval walls. No cars are allowed within the walls (only residents), creating an almost supernatural quiet. He explores the narrow streets lined with aristocratic palaces, visits the medieval cathedral, and discovers a boutique hotel inside a converted Norman palazzo. Mdina at dusk, he says, is the most atmospheric place on Malta.",
    quote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
    food_mentioned: ["rabbit", "local wine"],
    lat: 35.8870,
    lng: 14.4026,
    cover_image: "https://images.unsplash.com/photo-1600108515428-1b170ff22221?w=800&q=80",
  },
  {
    location_name: "Restaurant in Rabat",
    description: "For his final Maltese meal, Maklowicz sits down to the island's national dish — fenek (rabbit), slow-cooked in a rich sauce of wine, garlic, and tomatoes. He explains how rabbit is to Malta what pierogi are to Poland — the dish that defines the national palate. The recipe dates back centuries, originally poached from the Knights' private hunting grounds by rebellious farmers. The rabbit revolution, Maklowicz notes with a smile, was one of Malta's first acts of independence.",
    quote: "Królik po maltańsku to nie tylko danie — to akt buntu, tradycja oporu i smak wolności w jednym garnku.",
    food_mentioned: ["rabbit", "fenek", "wine", "garlic", "tomatoes", "local bread"],
    lat: 35.8825,
    lng: 14.3968,
  },
  {
    location_name: "Mdina by Night",
    description: "As darkness falls, Maklowicz returns to Mdina for a final, magical sequence. The Silent City truly earns its name after dark — the narrow streets are illuminated by wrought-iron lanterns, footsteps echo off limestone walls, and the city reveals its most romantic face. From the bastions, the lights of Malta twinkle below while the Mediterranean stretches dark and endless to the horizon. It's a perfect ending to an unforgettable journey through the island's 7,000 years of history, faith, and food.",
    quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować — cisza, światło i wieczność w kamieniu.",
    food_mentioned: [],
    lat: 35.8868,
    lng: 14.4028,
  },
];

// ─── MAIN ────────────────────────────────────────────────────

async function main() {
  console.log("🏝️  Seeding Malta Portal Production Content\n");

  // 1. Insert articles
  console.log("📝 Inserting 9 articles...");
  for (const article of articles) {
    console.log(`  → ${article.topic}: ${article.title}`);
    await upsert("articles", article);
  }

  // 2. Enrich Maklowicz stops
  console.log("\n🎬 Enriching 16 Maklowicz stops...");
  for (const update of maklowiczUpdates) {
    const { location_name, ...fields } = update;
    const url = `${SUPABASE_URL}/rest/v1/maklowicz_stops?location_name=eq.${encodeURIComponent(location_name)}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.log(`  ❌ ${location_name}: ${res.status} ${txt}`);
    } else {
      console.log(`  ✅ ${location_name}`);
    }
  }

  console.log("\n✅ Done! Portal is now production-ready.");
}

main().catch(console.error);
