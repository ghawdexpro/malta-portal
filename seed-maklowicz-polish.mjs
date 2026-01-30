#!/usr/bin/env node
/**
 * Add Polish translations + missing cover images for all 16 maklowicz_stops
 *
 * 1. Adds columns: description_pl, location_name_pl, episode_pl (via SQL)
 * 2. Updates each stop with Polish content and missing cover images
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

// Step 1: Add Polish columns via SQL
async function addPolishColumns() {
  console.log("Adding Polish columns...");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: "POST",
    headers,
    body: JSON.stringify({}),
  });
  // Columns may already exist, we'll use ALTER TABLE IF NOT EXISTS via direct SQL
  // Instead, let's just proceed - the columns will be added via migration or manually
  console.log("Columns should be added via migration 002. Proceeding with data updates...");
}

const updates = [
  {
    location_name: "Valletta - Old Town",
    location_name_pl: "Valletta — Stare Miasto",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl: "Makłowicz rozpoczyna swoją maltańską podróż w twierdzy stołecznej Valletty, założonej przez Wielkiego Mistrza Jeana de Valette po Wielkim Oblężeniu w 1565 roku. Spaceruje ulicą Republiki, podziwia budynki z miodowego wapienia i przedstawia Maltę jako skrzyżowanie, gdzie arabskie, normańskie, aragońskie i brytyjskie wpływy zderzają się na każdym talerzu i w każdym kamieniu.",
  },
  {
    location_name: "St. John's Co-Cathedral",
    location_name_pl: "Współkatedra św. Jana",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl: "Za zwodniczo prostą fasadą kryje się jedno z najbardziej zapierających dech w piersiach barokowych wnętrz w Europie. Makłowicz zachwyca się arcydziełem Caravaggia 'Ścięcie św. Jana Chrzciciela' — największym obrazem, jaki artysta kiedykolwiek namalował i jedynym, który podpisał. Podłoga wyłożona jest 400 marmurowymi płytami nagrobnymi Kawalerów z całej Europy.",
  },
  {
    location_name: "Grand Master's Palace",
    location_name_pl: "Pałac Wielkiego Mistrza",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl: "Siedziba władzy 21 kolejnych Wielkich Mistrzów Zakonu Kawalerów św. Jana, ten pałac jest dziś rezydencją Prezydenta Malty. Makłowicz przechodzi przez Sale Reprezentacyjne i Zbrojownię — jedną z największych kolekcji średniowiecznej broni na świecie, z ponad 5000 eksponatami broni i zbroi z XVI–XVIII wieku.",
    cover_image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
  },
  {
    location_name: "Upper Barrakka Gardens",
    location_name_pl: "Ogrody Górnej Barrakki",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl: "Z tych eleganckich arkadowych ogrodów Makłowicz pokazuje nam najbardziej ikoniczny widok na Malcie — Wielki Port, Trzy Miasta i Fort św. Anioła lśniący w śródziemnomorskim słońcu. Ogląda południowy strzał z armaty, tradycję sięgającą czasów kolonii brytyjskiej, i zastanawia się, jak ten port kształtował historię Morza Śródziemnego przez tysiąclecia.",
  },
  {
    location_name: "Valletta Restaurants",
    location_name_pl: "Restauracje w Valletcie",
    episode_pl: "Odcinek 260 — Malta — Valletta",
    description_pl: "Makłowicz odkrywa scenę restauracyjną Valletty, od skromnych pastizzerii po eleganckie winiarnie. Próbuje kapunatę — maltańską kuzynkę ratatouille z bakłażana, oliwek i kaparów — i tłumaczy, jak kuchnia maltańska łączy sycylijską hojność, arabskie przyprawy i brytyjski pragmatyzm. Punkt kulminacyjny: tradycyjny maltański talerz z suszonymi pomidorami, bigillą (pasta z bobu), serem gbejniet i lokalnymi oliwkami.",
    cover_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  },
  {
    location_name: "Birgu (Vittoriosa)",
    location_name_pl: "Birgu (Vittoriosa)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl: "Przeprawiając się przez Wielki Port tradycyjną łodzią dghajsa, Makłowicz dociera do Birgu — pierwotnej siedziby Kawalerów św. Jana, starszej od Valletty o kilkadziesiąt lat. Wędruje wąskimi, klimatycznymi uliczkami najstarszego ufortyfikowanego miasta na Malcie, odwiedza Pałac Inkwizytora (jeden z zaledwie trzech zachowanych na świecie) i odkrywa miasto, które czas potraktował łagodniej niż jego słynną sąsiadkę.",
  },
  {
    location_name: "St. Paul's Bay",
    location_name_pl: "Zatoka św. Pawła",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl: "Makłowicz podąża śladem Apostoła Pawła, którego statek rozbił się u wybrzeży Malty w 60 roku naszej ery. Według tradycji Paweł przeżył ukąszenie żmii, uzdrowił ojca rzymskiego namiestnika i osobiście nawrócił Maltańczyków na chrześcijaństwo podczas swojego trzymiesięcznego pobytu. Zatoka nazwana jego imieniem jest dziś tętniącym życiem kurortem, ale spuścizna świętego wpleciona jest w każdy aspekt maltańskiej tożsamości.",
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2ead1?w=800&q=80",
  },
  {
    location_name: "Gozo Ferry Terminal (Cirkewwa)",
    location_name_pl: "Terminal Promowy na Gozo (Ċirkewwa)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl: "Makłowicz wsiada na prom na Gozo z północno-zachodniego krańca Malty w Ċirkewwie. Dwudziestopięciominutowa przeprawa oferuje zapierające dech widoki na wyspę Comino i słynną Błękitną Lagunę. Opisuje Gozo jako 'to, czym Malta była pięćdziesiąt lat temu' — zieleńsze, cichsze i bardziej tradycyjne. Napięcie rośnie, gdy wapienne klify Gozo stają się coraz bliższe.",
    cover_image: "https://images.unsplash.com/photo-1602519060498-d761efde0086?w=800&q=80",
  },
  {
    location_name: "Gozo - Victoria (Rabat)",
    location_name_pl: "Gozo — Victoria (Rabat)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl: "W uroczej stolicy Gozo Makłowicz zanurza się w kulinarnych tradycjach wyspy. Odwiedza kryty targ, gdzie rolnicy sprzedają świeże produkty, próbuje ręcznie robionej kiełbasy gozitańskiej i lokalnego sera owczego (gbejniet), po czym zasiada w tradycyjnej restauracji do miecznika w sosie pomidorowym z czarnymi oliwkami — dania, które doskonale oddaje fuzję morza i lądu na Gozo.",
  },
  {
    location_name: "Citadella (Gozo)",
    location_name_pl: "Cytadela (Gozo)",
    episode_pl: "Odcinek 261 — Malta — Birgu i Gozo",
    description_pl: "Wspinając się na ufortyfikowaną koronę Gozo, Makłowicz zwiedzał starożytną Cytadelę — naturalną twierdzę zamieszkaną od ponad 5000 lat. Wchodzi do Katedry Wniebowzięcia, której sufit to mistrzowski trompe l'oeil (planowana kopuła nigdy nie powstała z braku funduszy). Z murów obronnych rozciąga się widok na całą wyspę — tarasowe wzgórza, kopulaste kościoły i błękitne Morze Śródziemne we wszystkich kierunkach.",
    cover_image: "https://images.unsplash.com/photo-1599922407878-c3483cba5640?w=800&q=80",
  },
  {
    location_name: "Rabat",
    location_name_pl: "Rabat",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl: "Wracając na główną wyspę, Makłowicz odkrywa Rabat — miasto okalające mury starożytnej Mdiny. Odwiedza wspaniały klasztor dominikanów ze światowej klasy kolekcją obrazów barokowych (w tym dzieła Mattii Pretiego), zwiedzał Willę Rzymską z pięknymi podłogami mozaikowymi i rozpoczyna poszukiwania idealnych pastizzi — ukochanych maltańskich ciastek z ciasta francuskiego.",
  },
  {
    location_name: "St. Paul's Catacombs",
    location_name_pl: "Katakumby św. Pawła",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl: "Schodząc pod ulice Rabatu, Makłowicz wchodzi do jednego z najwspanialszych wczesnochrześcijańskich stanowisk w Europie — katakumb z III wieku naszej ery, gdzie pierwsi maltańscy chrześcijanie chowali swoich zmarłych. Podziemne komnaty ciągną się labiryntem połączonych pomieszczeń, z kamiennymi stołami, przy których żałobnicy urządzali uczty pogrzebowe. Tradycja głosi, że sam św. Paweł nauczał w tych jaskiniach podczas pobytu na Malcie.",
    cover_image: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?w=800&q=80",
  },
  {
    location_name: "Pastizzi Shop in Rabat",
    location_name_pl: "Sklep z Pastizzi w Rabacie",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl: "Makłowicz znajduje to, czego szukał — autentyczny sklep z pastizzi, gdzie chrupiące, diamentowe ciastka wypiekane są świeżo przez cały dzień. Próbuje obu odmian: rikotta (z ricottą) i piżelli (z musem z groszku) i ogłasza je jednym z wielkich ulicznych dań kuchni śródziemnomorskiej. Za zaledwie 50 centów pastizzi to demokratyczne jedzenie Malty — jedzone zarówno przez robotników budowlanych, jak i ministrów.",
    cover_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
  },
  {
    location_name: "Mdina - The Silent City",
    location_name_pl: "Mdina — Ciche Miasto",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl: "Wchodząc przez wspaniałą barokową bramę, Makłowicz wkracza do Mdiny — 'Cichego Miasta' i dawnej stolicy Malty, położonej na wzgórzu i otoczonej średniowiecznymi murami. W obrębie murów nie wolno jeździć samochodami (tylko mieszkańcy), co tworzy niemal nadprzyrodzoną ciszę. Odkrywa wąskie uliczki otoczone arystokratycznymi pałacami, odwiedza średniowieczną katedrę i znajduje butikowy hotel w przebudowanym normańskim palazzo. Mdina o zmierzchu, jak mówi, to najbardziej klimatyczne miejsce na Malcie.",
  },
  {
    location_name: "Restaurant in Rabat",
    location_name_pl: "Restauracja w Rabacie",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl: "Na swój ostatni maltański posiłek Makłowicz zasiada do narodowego dania wyspy — fenku (królika), wolno duszonego w bogatym sosie z wina, czosnku i pomidorów. Tłumaczy, że królik jest dla Malty tym, czym pierogi dla Polski — daniem definiującym narodowe podniebienie. Przepis sięga wieków wstecz, pierwotnie kłusowany z prywatnych łowisk Kawalerów przez zbuntowanych rolników. Królikowa rewolucja, jak zauważa Makłowicz z uśmiechem, była jednym z pierwszych aktów niepodległości Malty.",
    cover_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    location_name: "Mdina by Night",
    location_name_pl: "Mdina nocą",
    episode_pl: "Odcinek 262 — Malta — Rabat i Mdina",
    description_pl: "Gdy zapada zmrok, Makłowicz wraca do Mdiny na ostatnią, magiczną sekwencję. Ciche Miasto naprawdę zasługuje na swoją nazwę po zmroku — wąskie uliczki oświetlone są kutymi latarniami, kroki odbijają się echem od wapienianych ścian, a miasto odsłania swoje najbardziej romantyczne oblicze. Z bastionów migoczą światła Malty, a Morze Śródziemne rozciąga się ciemne i nieskończone aż po horyzont. To idealne zakończenie niezapomnianej podróży po 7000 lat historii, wiary i jedzenia na wyspie.",
    cover_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
];

async function run() {
  console.log("Updating maklowicz_stops with Polish translations and missing cover images...\n");

  // First, add the Polish columns via SQL RPC
  console.log("Step 1: Adding Polish columns via SQL...");
  const sqlRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        ALTER TABLE maklowicz_stops ADD COLUMN IF NOT EXISTS description_pl TEXT;
        ALTER TABLE maklowicz_stops ADD COLUMN IF NOT EXISTS location_name_pl TEXT;
        ALTER TABLE maklowicz_stops ADD COLUMN IF NOT EXISTS episode_pl TEXT;
      `
    }),
  });
  // This RPC call may not work — we'll run ALTER TABLE manually if needed

  let success = 0;
  let failed = 0;

  for (const update of updates) {
    const { location_name, ...fields } = update;

    // Build patch body - only include non-undefined fields
    const patch = {};
    if (fields.description_pl) patch.description_pl = fields.description_pl;
    if (fields.location_name_pl) patch.location_name_pl = fields.location_name_pl;
    if (fields.episode_pl) patch.episode_pl = fields.episode_pl;
    if (fields.cover_image) patch.cover_image = fields.cover_image;

    const url = `${SUPABASE_URL}/rest/v1/maklowicz_stops?location_name=eq.${encodeURIComponent(location_name)}`;

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(patch),
      });

      if (res.ok) {
        console.log(`  ✅ ${location_name} → ${fields.location_name_pl}`);
        success++;
      } else {
        const text = await res.text();
        console.error(`  ❌ ${location_name}: ${res.status} ${text}`);
        failed++;
      }
    } catch (err) {
      console.error(`  ❌ ${location_name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed`);
}

run().catch(console.error);
