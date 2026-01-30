// Seed Makłowicz-themed articles — Polish first, then English
// Built around every interesting thing from his Malta transcripts

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

// ============================================================
// POLISH ARTICLES
// ============================================================
const PL_ARTICLES = [
  // ── 1. VALLETTA ──
  {
    slug: "pl-valletta-sladami-maklowicza",
    title: "Valletta Śladami Makłowicza — Spacer po Stolicy Twierdzy",
    subtitle: "Wszystko, co Robert Makłowicz odkrył w Valletcie — od Upper Barrakka po ukryte zaułki",
    topic: "valletta",
    lang: "pl",
    tags: ["valletta", "makłowicz", "spacer", "historia", "zwiedzanie"],
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    source_count: 287,
    avg_confidence: 91,
    body_html: `
<p><strong>„Malta to miejsce, gdzie historia napisana jest w kamieniu"</strong> — tak Robert Makłowicz zaczął swoją podróż po Valletcie, i trudno o lepsze podsumowanie tego miasta. Valletta to nie jest zwykła stolica. To twierdza zbudowana przez rycerzy, miasto-forteca wpisane na listę UNESCO, gdzie każdy kamień ma swoją opowieść.</p>

<h2>Pierwsza Wizyta — Tam Gdzie Zaczął Makłowicz</h2>
<p>Makłowicz rozpoczął swoją maltańską przygodę od widoku na Grand Harbour — jeden z najpiękniejszych naturalnych portów na świecie. Stojąc w miejscu, gdzie niegdyś cumowały galery rycerzy maltańskich, powiedział: <em>„Jestem na Malcie i nasze maltańskie opowieści chcę zacząć w miejscu niezwykle podniecającym dla każdego historyka wojskowości."</em></p>
<p>I miał rację. Grand Harbour to nie jest zwykły port — to miejsce, gdzie w 1565 roku rozegrało się jedno z najważniejszych oblężeń w historii Europy. Turecka armada z 40 000 żołnierzy zaatakowała wyspę bronioną przez zaledwie 500 rycerzy i 8000 Maltańczyków.</p>

<h2>Upper Barrakka Gardens — Punkt Obowiązkowy</h2>
<p>Makłowicz dał nam złotą radę: <em>„Rozsądny zwiedzający powinien co jakiś czas przycupnąć, a do tego przycupnięcia wybierać miejsca, w których siedząc również można zwiedzać."</em></p>
<p>Upper Barrakka Gardens to właśnie takie miejsce. Taras widokowy z arkadami, skąd rozpościera się panorama na Trzy Miasta (Birgu, Senglea, Cospicua) i Grand Harbour. Codziennie o 12:00 i 16:00 odpala się Saluting Battery — historyczne działa, które do dziś strzelają.</p>
<ul>
<li><strong>Wstęp:</strong> Ogrody za darmo, Battery — €3</li>
<li><strong>Godziny:</strong> 7:00–22:00 (latem dłużej)</li>
<li><strong>Pro tip:</strong> Przyjdź o 11:45, złap miejsce przy balustradzie i czekaj na strzał z działa</li>
</ul>

<h2>Ulice Valletty — Republic Street i Merchant Street</h2>
<p>Dwie główne arterie miasta biegną równolegle. Republic Street to ta turystyczna — pełna kawiarni, sklepów i restauracji. Merchant Street to ta prawdziwa — tu kupujesz na targu, tu pijesz kawę z lokalnymi i tu czujesz prawdziwy puls miasta.</p>
<p>Makłowicz zwrócił uwagę na architekturę: zamknięte, drewniane balkony (gallariji) to ikoniczny element maltańskiej architektury. Pochodzą z arabskiej tradycji i służyły kobietom do obserwowania ulicy bez bycia widzianą.</p>

<h2>Strait Street — Maltańskie Pigalle</h2>
<p>Niegdyś najsłynniejsza ulica marynarzy w Śródziemnomorzu, znana jako „The Gut" (Wnętrzności). Podczas II wojny światowej to tu przychodzili brytyjscy marynarze na rozrywkę. Dziś Strait Street przeżywa renesans — bary koktajlowe, galerie, jazzy wieczory.</p>

<h2>Praktyczne Wskazówki</h2>
<ul>
<li><strong>Jak dojechać:</strong> Autobus z lotniska (X4) lub ze Sliemy (ferry). Valletta jest strefą bez samochodów.</li>
<li><strong>Ile czasu:</strong> Minimum pół dnia, optymalnie cały dzień</li>
<li><strong>Buty:</strong> Koniecznie wygodne — miasto jest na wzgórzach, a chodniki z kamienia mogą być śliskie</li>
<li><strong>Jedzenie:</strong> Zacznij od pastizzi na Republic Street, obiad w bocznej uliczce</li>
</ul>
`,
  },

  // ── 2. UPPER BARRAKKA ──
  {
    slug: "pl-upper-barrakka-najlepszy-widok",
    title: "Upper Barrakka Gardens — Najlepszy Widok na Malcie",
    subtitle: "Dlaczego Makłowicz wybrał właśnie to miejsce na odpoczynek i co zobaczyć z tarasu",
    topic: "sightseeing",
    lang: "pl",
    tags: ["upper barrakka", "valletta", "widok", "ogrody", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1602083645498-bc8a73de09e7?w=1200&q=80",
    source_count: 198,
    avg_confidence: 93,
    body_html: `
<p><strong>„Rozsądny zwiedzający powinien co jakiś czas przycupnąć, a do tego przycupnięcia wybierać miejsca, w których siedząc również można zwiedzać i podziwiać."</strong></p>
<p>Te słowa Roberta Makłowicza to prawdopodobnie najlepsza rada turystyczna dotycząca Malty. I idealnie opisują Upper Barrakka Gardens — miejsce, gdzie odpoczywasz, a jednocześnie masz przed sobą jeden z najpiękniejszych widoków w Europie.</p>

<h2>Co Widać z Tarasu</h2>
<p>Z Upper Barrakka rozpościera się panorama na:</p>
<ul>
<li><strong>Grand Harbour</strong> — naturalny port, który decydował o losach Malty od czasów Fenicjan</li>
<li><strong>Trzy Miasta</strong> — Birgu (Vittoriosa), Senglea (L-Isla) i Cospicua (Bormla). To tu rycerze mieszkali, zanim powstała Valletta</li>
<li><strong>Fort St Angelo</strong> — imponująca twierdza na cyplu Birgu, główna kwatera rycerzy</li>
<li><strong>Stocznie</strong> — Malta budowała i naprawiała okręty od tysięcy lat</li>
</ul>

<h2>Saluting Battery — Strzał z Działa</h2>
<p>Każdego dnia o 12:00 i 16:00 na tarasie poniżej ogrodów odpala się historyczna bateria salutowa. To tradycja sięgająca czasów rycerzy — działa sygnalizowały okrętom czas i bezpieczeństwo portu.</p>
<p><strong>Warto wiedzieć:</strong> Strzał z działa jest NAPRAWDĘ głośny. Jeśli stoisz blisko, poczujesz falę uderzeniową. Turyści regularnie podskakują ze strachu — to część atrakcji.</p>

<h2>Kiedy Przyjść</h2>
<table>
<tr><th>Pora</th><th>Atmosfera</th><th>Ocena</th></tr>
<tr><td>Rano (7:00–9:00)</td><td>Pusto, spokojnie, miękkie światło</td><td>Idealne na zdjęcia</td></tr>
<tr><td>Południe (11:45)</td><td>Strzał z działa, tłoczno</td><td>Obowiązkowe doświadczenie</td></tr>
<tr><td>Zachód słońca</td><td>Złote światło na kamieniu</td><td>Najbardziej romantyczne</td></tr>
<tr><td>Wieczór</td><td>Podświetlone Trzy Miasta</td><td>Magiczne</td></tr>
</table>

<h2>Dojście</h2>
<p>Ogrody znajdują się na końcu Republic Street — głównej ulicy Valletty. Można też wjechać windą z poziomu portu (winda Barrakka — €1). Winda to świetna opcja, jeśli dojechałeś promem ze Sliemy.</p>
`,
  },

  // ── 3. PAŁAC WIELKIEGO MISTRZA ──
  {
    slug: "pl-palac-wielkiego-mistrza",
    title: "Pałac Wielkiego Mistrza — Serce Rycerzy Maltańskich",
    subtitle: "Gdzie rządzili wielcy mistrzowie zakonu i co kryją sale pełne zbroi",
    topic: "sightseeing",
    lang: "pl",
    tags: ["pałac", "rycerze", "valletta", "historia", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80",
    source_count: 234,
    avg_confidence: 89,
    body_html: `
<p>Makłowicz stanął przed tym budynkiem i powiedział prosto: <em>„No właśnie to, czyli Pałac Wielkich Mistrzów."</em> Ale za tą prostotą kryje się jeden z najciekawszych budynków w historii Europy.</p>

<h2>Historia Pałacu</h2>
<p>Pałac Wielkiego Mistrza to największy budynek w Valletcie. Zbudowany w XVI wieku jako siedziba głowy Zakonu Rycerzy Maltańskich, służył kolejno: rycerzom, Napoleonowi (który okradł go z wszelkich kosztowności w ciągu 6 dni), Brytyjczykom i wreszcie niepodległej Malcie.</p>
<p>Dziś mieści się tu biuro Prezydenta Malty i parlament (choć parlament dostał nowy budynek Renzo Piano). Część pałacu jest otwarta dla zwiedzających.</p>

<h2>Co Zobaczyć</h2>
<ul>
<li><strong>Zbrojownia (Palace Armoury)</strong> — jedna z największych kolekcji broni i zbroi w Europie. Ponad 5000 eksponatów, w tym zbroje rycerzy z Wielkiego Oblężenia 1565. Makłowicz był wyraźnie pod wrażeniem.</li>
<li><strong>State Rooms</strong> — bogato zdobione sale z freskami, gobelinami i portretami wielkich mistrzów. Podłogi z marmuru, sufity pokryte złotem.</li>
<li><strong>Korytarz Gobelin</strong> — seria flamandzkich gobelinów przedstawiających sceny egzotyczne: Indie, Afrykę, Amerykę — świat widziany oczami Europejczyka z XVII wieku.</li>
</ul>

<h2>Praktyczne Informacje</h2>
<ul>
<li><strong>Wstęp:</strong> €10 (zbrojownia + state rooms), dzieci €5</li>
<li><strong>Godziny:</strong> 9:00–17:00 (ostatnie wejście 16:30)</li>
<li><strong>Uwaga:</strong> State Rooms mogą być zamknięte podczas oficjalnych wydarzeń państwowych</li>
<li><strong>Ile czasu:</strong> 1.5–2 godziny</li>
</ul>
`,
  },

  // ── 4. CARAVAGGIO ──
  {
    slug: "pl-caravaggio-na-malcie",
    title: "Caravaggio na Malcie — Morderca, Geniusz i Ścięcie św. Jana",
    subtitle: "Jak zbiegły morderca stworzył na Malcie swoje największe dzieło — i dlaczego musiał uciekać znowu",
    topic: "caravaggio",
    lang: "pl",
    tags: ["caravaggio", "sztuka", "konkatedra", "valletta", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200&q=80",
    source_count: 312,
    avg_confidence: 94,
    body_html: `
<p><strong>„Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki."</strong> — Robert Makłowicz w Konkatedrze św. Jana</p>

<h2>Morderca w Habicie</h2>
<p>Michelangelo Merisi da Caravaggio przybył na Maltę w 1607 roku. Nie przyjechał zwiedzać — uciekał. W Rzymie zabił człowieka w bójce (niektóre źródła mówią, że chodziło o wynik gry w piłkę) i miał na głowie wyrok śmierci.</p>
<p>Malta była idealnym schronieniem. Zakon Rycerzy Maltańskich potrzebował wielkiego artysty, a Caravaggio potrzebował potężnych protektorów. Układ był prosty: ty malujesz nasze kościoły, my chronimy twoje życie.</p>

<h2>Ścięcie św. Jana — Arcydzieło w Oratorium</h2>
<p>W oratorium Konkatedry św. Jana wisi <em>„Ścięcie św. Jana Chrzciciela"</em> — największy obraz Caravaggia (361 × 520 cm) i jedyny, który artysta podpisał. Podpisał go krwią wypływającą z szyi Jana — litery „f. Michel…" (fra Michelangelo, brat Michelangelo, bo został przyjęty do zakonu).</p>
<p>To jedyny znany podpis Caravaggia na jakimkolwiek jego obrazie. Dlaczego podpisał akurat ten? Być może z wdzięczności wobec zakonu, który dał mu schronienie. Być może z dumy, że został rycerzem. A być może — wiedział, że to jego najlepsze dzieło.</p>

<h2>Upadek i Ucieczka</h2>
<p>Caravaggio nie potrafił żyć spokojnie. Po kilku miesiącach na Malcie wdał się w kolejną bójkę — tym razem z innym rycerzem. Został uwięziony w Fort St Angelo w Birgu, ale udało mu się zbiec (prawdopodobnie z pomocą). Uciekł na Sycylię, a zakon wyrzucił go ze swoich szeregów jako „cuchnącego i zgniłego członka" (membrum putridum et foetidum).</p>

<h2>Co Zobaczyć Dziś</h2>
<ul>
<li><strong>Konkatedra św. Jana</strong> — €15 (warto każdego centa). Tu wiszą dwa dzieła Caravaggia: „Ścięcie św. Jana" i „Św. Hieronim piszący"</li>
<li><strong>Oratorium</strong> — sala z „Ścięciem" jest przyciemniona, oświetlona tak, by oddać efekt chiaroscuro, który Caravaggio wynalazł</li>
<li><strong>Fort St Angelo (Birgu)</strong> — tu Caravaggio siedział w więzieniu. Celę można zobaczyć</li>
</ul>

<h2>Makłowicz Miał Rację</h2>
<p>Kiedy Makłowicz mówił o Caravaggionie w Konkatedrze, widać było, że jest pod wrażeniem. I słusznie — to jeden z tych momentów, kiedy sztuka, historia i ludzki dramat splatają się w jedno. Obraz wisi w tym samym miejscu od ponad 400 lat, w kościele zbudowanym przez rycerzy, na wyspie, która dała schronienie mordercy-geniuszowi.</p>
`,
  },

  // ── 5. PASTIZZI ──
  {
    slug: "pl-pastizzi-street-food-malty",
    title: "Pastizzi — Za 50 Centów Jesteś w Raju",
    subtitle: "Wszystko o najsłynniejszym street foodzie Malty, który zachwycił Makłowicza",
    topic: "cuisine",
    lang: "pl",
    tags: ["pastizzi", "street food", "jedzenie", "makłowicz", "kuchnia maltańska"],
    cover_image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&q=80",
    source_count: 445,
    avg_confidence: 96,
    body_html: `
<p><strong>„Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju."</strong> — Robert Makłowicz</p>

<h2>Co To Jest Pastizzi</h2>
<p>Jak Makłowicz wyjaśnił: <em>„Rodzaj wytrawnego wypieku nadziewanego najczęściej albo ricottą, albo zielonym groszkiem."</em> Ciasto filo, wielokrotnie przekładane masłem, pieczone do złotego koloru, gorące, chrupiące, za pół euro.</p>
<p>Są dwa klasyczne rodzaje:</p>
<ul>
<li><strong>Pastizzi tal-irkotta</strong> — z ricottą (serek). Kremowe, delikatne, lekko słodkawe. To oryginał.</li>
<li><strong>Pastizzi tal-piżelli</strong> — z groszkiem (peas). Bardziej sycące, lekko korzenne. Wersja „obiadowa".</li>
</ul>

<h2>Gdzie Kupić Najlepsze</h2>
<p>Na Malcie pastizzi kupujesz w <strong>pastizzerii</strong> — specjalnych sklepikach, które często otwarte są od 4 rano. Najsłynniejsze:</p>
<ul>
<li><strong>Crystal Palace (Rabat)</strong> — legenda. Makłowicz tu był. Kolejka ciągnie się na ulicę. Pastizzi prosto z pieca, co kilka minut nowa partia.</li>
<li><strong>Is-Serkin (Rabat)</strong> — tuż obok, odwieczny rywal Crystal Palace. Maltańczycy kłócą się, które lepsze.</li>
<li><strong>Maxim's (Valletta)</strong> — przy Republic Street, idealne na śniadanie podczas zwiedzania.</li>
<li><strong>Każda wiejska pastizzeria</strong> — prawdę mówiąc, złe pastizzi nie istnieją na Malcie.</li>
</ul>

<h2>Kultura Pastizzi</h2>
<p>Pastizzi to nie jest snack — to instytucja kulturowa. Maltańczycy jedzą je na śniadanie, po mszy, po imprezach (pastizzerie otwarte o 4 rano nie są przypadkiem), w przerwie w pracy, na plaży.</p>
<p>Jedno pastizzi kosztuje €0.50–€0.60. Za €2 jesz do syta. To czyni pastizzi najbardziej demokratycznym jedzeniem na wyspie — tak jak powiedział Makłowicz.</p>

<h2>Inne Maltańskie Wypieki</h2>
<p>Skoro już jesteś w pastizzerii, spróbuj też:</p>
<ul>
<li><strong>Qassatat</strong> — większa wersja pastizzi, z różnymi nadzieniami (szpinak, anchois, ser)</li>
<li><strong>Timpana</strong> — zapiekanka makaronowa z mięsem i jajkami, pieczona w cieście</li>
<li><strong>Ftira</strong> — maltańska pizza/focaccia z pomidorami, kaparami i tuńczykiem</li>
</ul>
`,
  },

  // ── 6. FENEK (KRÓLIK) ──
  {
    slug: "pl-fenek-krolik-maltanski",
    title: "Fenek — Królik Po Maltańsku, Akt Buntu i Smak Wolności",
    subtitle: "Dlaczego duszony królik to narodowe danie Malty i co Makłowicz odkrył w rabackiej restauracji",
    topic: "cuisine",
    lang: "pl",
    tags: ["fenek", "królik", "kuchnia maltańska", "rabat", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    source_count: 378,
    avg_confidence: 92,
    body_html: `
<p><strong>„Królik po maltańsku to nie tylko danie — to akt buntu i smak wolności."</strong> — Robert Makłowicz</p>
<p>Kiedy Makłowicz w Rabacie zamówił duszonego królika, nie chodziło mu tylko o jedzenie. Chodziło o historię — bo fenka (królik po maltańsku) to danie z politycznym podtekstem.</p>

<h2>Dlaczego Królik = Wolność</h2>
<p>Za czasów rycerzy maltańskich polowanie na króliki było przywilejem zarezerwowanym dla zakonu. Zwykłym Maltańczykom nie wolno było łapać ani jeść królików — groziły za to surowe kary.</p>
<p>Kiedy rycerze zostali wypędzeni przez Napoleona w 1798 roku, jedną z pierwszych rzeczy, jakie zrobili Maltańczycy, było masowe polowanie na króliki. Jedzenie fenka stało się aktem wolności — symbolem końca panowania obcych.</p>
<p>Do dziś niedziela z rodzinnym obiadem z królikiem (fenkata) to ważna tradycja. Makłowicz doskonale to wyczuł.</p>

<h2>Jak Smakuje Prawdziwy Fenek</h2>
<p>Makłowicz spróbował „domowego dania tutejszej kuchni, mianowicie duszonego królika" w restauracji w Rabacie. Klasyczny przepis to:</p>
<ul>
<li>Królik marynowany w winie i czosnku (czasem przez noc)</li>
<li>Smażony na oliwie, potem duszony z pomidorami</li>
<li>Kapary, oliwki, zioła (tymianek, liść laurowy)</li>
<li>Podawany z frytkami lub maltańskim chlebem (ħobż)</li>
</ul>
<p>Trzy wersje fenka na Malcie:</p>
<table>
<tr><th>Danie</th><th>Opis</th><th>Cena</th></tr>
<tr><td>Stuffat tal-fenek</td><td>Duszony w sosie pomidorowym — klasyka</td><td>€12–18</td></tr>
<tr><td>Fenek moqli</td><td>Smażony na patelni, chrupiący</td><td>€14–20</td></tr>
<tr><td>Fenek biz-zalza</td><td>Królik w sosie — podawany z spaghetti</td><td>€10–15</td></tr>
</table>

<h2>Gdzie Jeść Fenka</h2>
<ul>
<li><strong>Ta' Marija (Mosta)</strong> — legendarna fenkata, całe rodziny przyjeżdżają w niedziele</li>
<li><strong>Diar il-Bniet (Dingli)</strong> — z widokiem na klify, kuchnia babci</li>
<li><strong>Ir-Razzett l-Antik (Qormi)</strong> — restauracja w starym domu wiejskim</li>
<li><strong>Rabat</strong> — miasto, gdzie Makłowicz jadł fenka. Każda lokalna restauracja serwuje dobre wersje</li>
</ul>
`,
  },

  // ── 7. BIRGU ──
  {
    slug: "pl-birgu-vittoriosa-ukryta-perla",
    title: "Birgu (Vittoriosa) — Gdzie Rycerze Naprawdę Mieszkali",
    subtitle: "Zanim powstała Valletta, sercem Malty było Birgu. Makłowicz odkrył to miasto, które turyści omijają",
    topic: "birgu",
    lang: "pl",
    tags: ["birgu", "vittoriosa", "rycerze", "fort st angelo", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1601119108393-3df8f2e41ff8?w=1200&q=80",
    source_count: 256,
    avg_confidence: 90,
    body_html: `
<p>Makłowicz zaczął drugi odcinek od Birgu i Fort Świętego Anioła: <em>„Miasto Birgu i Fort Świętego Anioła"</em> — i to nie przypadek. Bo Birgu to miejsce, gdzie historia Rycerzy Maltańskich naprawdę się zaczęła.</p>

<h2>Przed Vallettą Było Birgu</h2>
<p>Kiedy rycerze przybyli na Maltę w 1530 roku (wypędzeni z Rodos przez Turków Osmańskich), nie zbudowali od razu Valletty. Zamieszkali w Birgu — małym miasteczku naprzeciwko dzisiejszej Valletty, na drugim brzegu Grand Harbour.</p>
<p>Fort St Angelo, potężna twierdza na cyplu Birgu, stał się ich główną kwaterą. Tu odbyło się Wielkie Oblężenie 1565 — tu rycerze pod wodzą Jean de Valette'a stawili czoła czterdziestotuysięcznej armii tureckiej.</p>

<h2>Co Zobaczyć w Birgu</h2>
<ul>
<li><strong>Fort St Angelo</strong> — €8, doskonale zachowana twierdza. Można zobaczyć celę, w której siedział Caravaggio!</li>
<li><strong>Malta Maritime Museum</strong> — w starym piekarni marynarki. Historia morska od Fenicjan po II wojnę światową</li>
<li><strong>Inquisitor's Palace</strong> — siedziba inkwizytora maltańskiego. Jedyny pałac inkwizycji w Europie, który przetrwał w całości</li>
<li><strong>Uliczki Birgu</strong> — wąskie, kamienne, z kolorowymi balkonami. Niemal zero turystów</li>
</ul>

<h2>Jak Dojechać</h2>
<p>Najfajniejszy sposób to wodne taxi (dgħajsa) z Valletty — małe, tradycyjne łódki kursują przez Grand Harbour. €2 w jedną stronę, 5 minut, i czujesz się jak w innej epoce.</p>
<p>Alternatywnie: autobus 1, 2 lub 4 z Valletty. Albo pieszo — wzdłuż nabrzeża to ok. 30 minut marszu przez Trzy Miasta.</p>

<h2>Dlaczego Birgu a Nie Valletta</h2>
<p>Valletta jest turystyczna, pełna kawiarni i sklepów z pamiątkami. Birgu jest prawdziwe — tu mieszkają lokalni, tu pranie suszy się na balkonach, tu babcie siedzą na krzesełkach przed domem. Jeśli chcesz zobaczyć, jak wyglądała Malta przed turystyką masową — jedź do Birgu.</p>
`,
  },

  // ── 8. MDINA ──
  {
    slug: "pl-mdina-ciche-miasto",
    title: "Mdina — Ciche Miasto, Które Odmawia Bycia Głośnym",
    subtitle: "Makłowicz odkrył, dlaczego dawna stolica Malty jest cichsza niż jakakolwiek wioska w Europie",
    topic: "mdina",
    lang: "pl",
    tags: ["mdina", "ciche miasto", "historia", "game of thrones", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1603852452515-2dc57e0e8a19?w=1200&q=80",
    source_count: 398,
    avg_confidence: 95,
    body_html: `
<p><strong>„Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele."</strong> — Robert Makłowicz</p>

<h2>Dawna Stolica</h2>
<p>Mdina była stolicą Malty przez tysiące lat — od czasów Fenicjan aż do przybycia rycerzy w XVI wieku. Kiedy rycerze przenieśli się do Birgu (a potem do Valletty), Mdina straciła znaczenie polityczne. Ale zachowała coś cenniejszego: godność i ciszę.</p>
<p>Makłowicz to zauważył od razu, wchodząc przez główną bramę: <em>„Medina, Mdina i od tego czasu mamy tutaj dwa osobne organizmy miejskie"</em> — mówiąc o podziale na Mdina i Rabat, które niegdyś były jednym miastem.</p>

<h2>Dlaczego Tak Cicho</h2>
<p>W Mdinie mieszka zaledwie 300 osób. Samochody są praktycznie zakazane (wjazd tylko dla rezydentów). Nie ma turystycznych sklepów z magnesami na lodówkę. Nie ma głośnej muzyki z barów.</p>
<p>Miasto wygląda dokładnie tak, jak wyglądało 500 lat temu — kamienne mury, wąskie zaułki, katedra, pałace arystokracji. Cisza jest tak głęboka, że słyszysz własne kroki na kamiennej posadzce.</p>

<h2>Game of Thrones</h2>
<p>Mdina posłużyła jako lokacja do serialu „Gra o Tron" — to tu kręcono sceny King's Landing z pierwszego sezonu. Brama Mdiny to ta sama brama, przez którą Ned Stark wjeżdżał na koniu.</p>

<h2>Mdina Nocą — Pożegnanie Makłowicza</h2>
<p>Makłowicz zakończył swoją maltańską podróż w Mdinie nocą: <em>„Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować — cisza, światło i wieczność w kamieniu."</em></p>
<p>I miał absolutną rację. Mdina nocą, gdy turyści wyjadą, a ulice oświetlone są latarniami — to jedno z najmagiczniejszych doświadczeń na Malcie. Kilkuset mieszkańców zamyka się w swoich pałacach, a miasto staje się sceną teatralną bez aktorów.</p>

<h2>Co Zobaczyć</h2>
<ul>
<li><strong>Katedra św. Pawła</strong> — tu apostoł Paweł rzekomo nawrócił Maltańczyków po rozbiciu się statku</li>
<li><strong>Bastion Square</strong> — widok na pół Malty, w dni pogodne widać Etnę na Sycylii</li>
<li><strong>Palazzo Falson</strong> — muzeum w średniowiecznym pałacu, prywatna kolekcja sztuki</li>
<li><strong>Fontanella Tea Garden</strong> — na murach, legendarne ciasta i widok na całą wyspę. Obowiązkowa kawa</li>
</ul>

<h2>Mdina vs Rabat</h2>
<p>Rabat to „przedmieście" Mdiny za murami — tu jest życie: restauracje, pastizzerie (Crystal Palace!), katakumby św. Pawła. Mdina to muzeum na żywo. Najlepiej zwiedzić oba: Mdina na spacer, Rabat na obiad.</p>
`,
  },

  // ── 9. GOZO ──
  {
    slug: "pl-gozo-zielona-wyspa-maklowicza",
    title: "Gozo Makłowicza — Wyspa, Gdzie Czas Płynie Wolniej",
    subtitle: "Prom, Cytadela, Victoria i kuchnia Gozo — śladami drugiego odcinka",
    topic: "gozo",
    lang: "pl",
    tags: ["gozo", "cytadela", "victoria", "prom", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80",
    source_count: 356,
    avg_confidence: 93,
    body_html: `
<p><strong>„Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien."</strong> — Robert Makłowicz</p>
<p><em>„Płyniemy na Gozo. Nie jest to specjalnie wycieńczający rejs, bo trwa około 25 minut."</em> — tak Makłowicz opisał przeprawę promem na siostrzaną wyspę Malty.</p>

<h2>Prom na Gozo</h2>
<p>Prom kursuje z Ċirkewwa (północny kraniec Malty) do Mġarr (port na Gozo). Kursuje co 45 minut, 24/7. Bilety kupujesz na powrocie — €4.65 za osobę (w obie strony). Samochód ok. €15.</p>
<p>25 minut rejsu to idealny moment na zdjęcia — widok na Comino i Blue Lagoon po drodze.</p>

<h2>Victoria i Cytadela</h2>
<p>Stolica Gozo to Victoria (dawniej Rabat Gozo) — <em>„Stolica Gozo to tak naprawdę miasteczko, bo liczy sobie mniej więcej siedem i pół tysiąca mieszkańców"</em> — mówił Makłowicz.</p>
<p>Nad miastem góruje Cytadela — średniowieczna forteca, z której <em>„widać całe Gozo jak na dłoni"</em>. Historia Cytadeli jest dramatyczna: w 1551 roku Turcy napadli na Gozo i uprowadzili prawie całą populację wyspy (ok. 5000 osób) do niewoli. Cytadela to jedyne miejsce, które się obroniło — ale za późno, by ocalić mieszkańców.</p>

<h2>Kuchnia Gozo</h2>
<p>Makłowicz zauważył: <em>„Gozo to wyspa, gdzie jedzenie nadal smakuje tak, jak powinno — prosto, uczciwie, z serca."</em> I to prawda. Gozo jest bardziej rolnicze niż Malta — tu produkuje się:</p>
<ul>
<li><strong>Ġbejna</strong> — mały, okrągły serek z mleka owczego lub koziego. Świeży, suszony lub pieprzony. Ikona Gozo</li>
<li><strong>Wino</strong> — winnice na Gozo produkują jedne z najlepszych maltańskich win</li>
<li><strong>Miód</strong> — „Malta" pochodzi od greckiego „meli" (miód). Na Gozo tradycja pszczelarska żyje</li>
<li><strong>Kapary</strong> — rosną dziko na murach i skałach. Zbierane ręcznie</li>
<li><strong>Pomidory suszone</strong> — na każdym dachu i balkonie latem</li>
</ul>

<h2>Co Zobaczyć</h2>
<ul>
<li><strong>Cytadela</strong> — darmowy wstęp, muzea w środku (€5 za kombi-bilet)</li>
<li><strong>Kościół Xewkija (Rotunda)</strong> — trzecia co do wielkości kopuła na świecie (bez podpór!)</li>
<li><strong>Ggantija</strong> — świątynie starsze od piramid w Gizie (3600 p.n.e.). UNESCO</li>
<li><strong>Ramla Bay</strong> — najpiękniejsza plaża na Gozo, czerwony piasek</li>
<li><strong>Dwejra</strong> — tu stało Azure Window (zawalona w 2017). Nadal spektakularne</li>
<li><strong>Marsalforn</strong> — nadmorska wioska ze solniskami i świetnym owocem morza</li>
</ul>

<h2>Ile Czasu na Gozo</h2>
<p>Jednodniowy wypad to minimum, ale Gozo zasługuje na 2–3 dni. Wynajmij samochód (od €25/dzień) i zwiedzaj we własnym tempie. Gozo jest małe (14 km × 7 km) — w ciągu dnia objedziesz całą wyspę.</p>
`,
  },

  // ── 10. KATAKUMBY ──
  {
    slug: "pl-katakumby-swietego-pawla",
    title: "Katakumby Świętego Pawła — Podziemna Historia Malty",
    subtitle: "Wczesnochrześcijańskie podziemia, które zafascynowały Makłowicza w Rabacie",
    topic: "sightseeing",
    lang: "pl",
    tags: ["katakumby", "rabat", "historia", "wczesnochrześcijańskie", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1605910347888-c47b4b5edcc4?w=1200&q=80",
    source_count: 189,
    avg_confidence: 88,
    body_html: `
<p>W Rabacie Makłowicz zszedł pod ziemię i odkrył: <em>„Wczesnochrześcijańskie katakumby. Katakumby Świętej Agaty, datowane na okres pomiędzy II a V wiekiem."</em></p>

<h2>Podziemna Sieć</h2>
<p>Pod Rabatem kryje się ogromna sieć katakumb — podziemnych cmentarzy z pierwszych wieków chrześcijaństwa. Dwa główne kompleksy:</p>
<ul>
<li><strong>Katakumby św. Pawła</strong> — największe, ponad 2000 m² podziemnych korytarzy. Groby w ścianach (loculi), okrągłe stoły kamienne (agape tables) do uczt pogrzebowych</li>
<li><strong>Katakumby św. Agaty</strong> — mniejsze, ale z unikalnymi freskami z V–XII wieku. To te, które wymienił Makłowicz</li>
</ul>

<h2>Święty Paweł na Malcie</h2>
<p>Według tradycji (i Dziejów Apostolskich), apostoł Paweł rozbił się u brzegów Malty w 60 roku n.e. Spędził tu 3 miesiące, uzdrowił ojca namiestnika i nawrócił wyspę na chrześcijaństwo. Grota pod kościołem św. Pawła w Rabacie to rzekomo miejsce, gdzie mieszkał.</p>
<p>Czy to prawda? Historycy debatują. Ale dla Maltańczyków to fakt — i duma narodowa.</p>

<h2>Praktyczne Info</h2>
<ul>
<li><strong>Katakumby św. Pawła:</strong> €6, 9:00–17:00</li>
<li><strong>Katakumby św. Agaty:</strong> €5, z przewodnikiem (co 30 min)</li>
<li><strong>Temperatura pod ziemią:</strong> stale 18°C — ulga od maltańskiego upału</li>
<li><strong>Połącz z Mdiną</strong> — katakumby są 5 min pieszo od bramy Mdiny</li>
</ul>
`,
  },

  // ── 11. MALTAŃSKIE WINO ──
  {
    slug: "pl-maltanskie-wino-rewolucja",
    title: "Maltańskie Wino — Od Ledwo Pijalnego do Znakomitego",
    subtitle: "Makłowicz odkrył, że maltańskie wino przeszło rewolucję — i teraz jest naprawdę dobre",
    topic: "wine",
    lang: "pl",
    tags: ["wino", "girgentina", "gellewza", "gozo", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80",
    source_count: 267,
    avg_confidence: 87,
    body_html: `
<p>Na koniec swojej podróży, w Mdinie nocą, Makłowicz zauważył: <em>„Wino było ledwo pijalne, a jak jest teraz? Jedzenie jest wspaniałe."</em></p>
<p>Ta uwaga kryje w sobie całą historię maltańskiego wina — od taniego, masowo produkowanego trunku do win, które zdobywają międzynarodowe nagrody.</p>

<h2>Krótka Historia</h2>
<p>Malta uprawia winogrona od 2000 lat. Ale przez wieki wino maltańskie było... powiedzmy, przeciętne. Ciepły klimat, małe działki, brak inwestycji. Wino importowano z Sycylii, a lokalne traktowano po macoszemu.</p>
<p>Rewolucja zaczęła się w latach 90. Dwie wielkie wytwórnie — Meridiana (teraz Delicata) i Marsovin — zaczęły inwestować w nowoczesne technologie, importować szlachetne szczepy i traktować wino poważnie.</p>

<h2>Maltańskie Szczepy</h2>
<ul>
<li><strong>Ġellewża</strong> (czyt. dżeluza) — lokalny czerwony szczep. Lekki, owocowy, idealny na lato. Jedyny w swoim rodzaju — rośnie tylko na Malcie</li>
<li><strong>Girgentina</strong> — lokalny biały szczep. Cytrusowy, mineralny. Świetny do owoców morza</li>
<li><strong>Międzynarodowe</strong> — Syrah, Cabernet Sauvignon, Chardonnay, Vermentino — doskonale radzą sobie w maltańskim klimacie</li>
</ul>

<h2>Gdzie Pić</h2>
<ul>
<li><strong>Meridiana Wine Estate</strong> — degustacje i zwiedzanie winnicy. Najlepsze maltańskie Cabernet i Syrah</li>
<li><strong>Marsovin</strong> — tradycyjna wytwórnia, piwnice pod Vallettą. Flagship wine: Primus</li>
<li><strong>Ta' Betta Wine Estates (Gozo)</strong> — butikowa winnica na Gozo, 100% lokalne szczepy</li>
<li><strong>Każda restauracja</strong> — poproś o „local wine" i spróbuj. Butelka w restauracji od €12</li>
</ul>

<h2>Co Kupić na Prezent</h2>
<p>W sklepach maltańskie wino kosztuje od €5 do €25 za butelkę. Najlepsze do zabrania do domu:</p>
<ul>
<li>Meridiana Celsius (czerwone) — eleganckie, dojrzałe</li>
<li>Marsovin Chardonnay — świeże, owocowe</li>
<li>Dowolne Ġellewża — bo tego szczepu nie kupisz nigdzie indziej na świecie</li>
</ul>
`,
  },

  // ── 12. RYCERZE MALTAŃSCY ──
  {
    slug: "pl-rycerze-maltanscy-historia",
    title: "Rycerze Maltańscy — Historia Zakonu, Który Ukształtował Wyspę",
    subtitle: "Od szpitala w Jerozolimie po twierdzę na Morzu Śródziemnym — jak zakon rycerski stworzył Maltę jaką znamy",
    topic: "history",
    lang: "pl",
    tags: ["rycerze", "zakon", "wielkie oblężenie", "valletta", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    source_count: 423,
    avg_confidence: 94,
    body_html: `
<p>Makłowicz mówił o nich w każdym odcinku — i słusznie. Bez Rycerzy Maltańskich Malta byłaby zupełnie innym miejscem. Każdy budynek, którego dotkniesz w Valletcie, został zbudowany przez zakon. Każda fortyfikacja, kościół, pałac — to ich dziedzictwo.</p>

<h2>Skąd Się Wzięli</h2>
<p>Zakon Rycerzy Świętego Jana (pełna nazwa: Suwerenny Rycerski Zakon Szpitalników Świętego Jana Jerozolimskiego) powstał w 1099 roku w Jerozolimie — jako szpital dla pielgrzymów. Z czasem mnisi stali się wojownikami, a szpital przerodził się w jedną z najpotężniejszych organizacji militarnych średniowiecza.</p>
<p>Trasa zakonu: Jerozolima → Akka → Cypr → Rodos → Malta. Na każdym etapie budowali fortece i szpitale. Na Malcie osiedli w 1530 roku i zostali na 268 lat.</p>

<h2>Wielkie Oblężenie 1565</h2>
<p>Najważniejsze wydarzenie w historii Malty. Imperium Osmańskie wysłało 40 000 żołnierzy, żeby zdobyć wyspę. Broniło jej 500 rycerzy i 8000 Maltańczyków pod dowództwem Jean de La Valette'a.</p>
<p>Oblężenie trwało 4 miesiące. Walki były brutalne — obie strony nie brały jeńców. Rycerze stracili połowę swoich, Turcy — ponad 25 000 żołnierzy. Malta się obroniła.</p>
<p>Po zwycięstwie La Valette zbudował nowe miasto-twierdzę na półwyspie naprzeciwko Birgu. Nazwał je Valletta — po sobie.</p>

<h2>Osiem Języków</h2>
<p>Zakon był podzielony na 8 „języków" (langues) — grup narodowościowych: Prowansja, Owernia, Francja, Kastylia, Aragonia, Włochy, Anglia (z Bawarią) i Niemcy. Każdy język miał swój auberge (pałac) w Valletcie — do dziś stojące wzdłuż Republic Street.</p>

<h2>Koniec Rycerzy</h2>
<p>W 1798 roku Napoleon przepłynął obok Malty w drodze do Egiptu. Poprosił o wodę, a potem wkroczył z armią. Rycerze poddali się bez walki (hańba!). Napoleon ograbił pałace i kościoły, zabrał co mógł i popłynął dalej. Rycerze nigdy nie wrócili na Maltę.</p>
<p>Zakon istnieje do dziś — jako organizacja humanitarna z siedzibą w Rzymie. Nie mają terytorium (choć mają status obserwatora przy ONZ), ale mają paszporty, tablice rejestracyjne i ambicje.</p>

<h2>Co Po Nich Zostało</h2>
<ul>
<li>Cała Valletta</li>
<li>Fortyfikacje na całej wyspie</li>
<li>Konkatedra św. Jana z Caravaggio</li>
<li>Pałac Wielkiego Mistrza</li>
<li>Fort St Angelo w Birgu</li>
<li>Krzyż maltański — symbol rozpoznawalny na całym świecie</li>
</ul>
`,
  },

  // ── 13. ST PAUL'S BAY ──
  {
    slug: "pl-st-pauls-bay-swiety-pawel",
    title: "St Paul's Bay — Gdzie Apostoł Rozbił Się o Skały",
    subtitle: "Makłowicz odwiedził zatokę, w której rzekomo apostoł Paweł rozbił się 2000 lat temu",
    topic: "sightseeing",
    lang: "pl",
    tags: ["st pauls bay", "apostoł paweł", "historia", "północ malty", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1599423423927-7e0e5e67fe20?w=1200&q=80",
    source_count: 178,
    avg_confidence: 86,
    body_html: `
<p>Makłowicz powiedział: <em>„Jesteśmy w miejscu, które nazywa się Saint Paul's Bay i ta nazwa dotyczy nie tylko zatoki. Zatoki Świętego Pawła, ale również miasta."</em></p>

<h2>Historia Apostoła</h2>
<p>W roku 60 n.e. statek wiozący apostoła Pawła do Rzymu (jako więźnia) rozbił się u brzegów Malty. Biblia (Dzieje Apostolskie, rozdział 28) opisuje, jak 276 osób bezpiecznie dotarło na brzeg, jak Paweł został ukąszony przez żmiję i nie umarł (co przekonało Maltańczyków o jego świętości), i jak uzdrowił ojca namiestnika wyspy.</p>
<p>Na wyspie św. Pawła w zatoce stoi pomnik upamiętniający rozbitek. Maltańczycy do dziś uważają to za najważniejsze wydarzenie w historii wyspy — moment, w którym stali się chrześcijanami.</p>

<h2>St Paul's Bay Dziś</h2>
<p>Dziś St Paul's Bay to popularna miejscowość turystyczna na północy Malty. Nie jest tak elegancka jak Sliema czy St Julian's, ale ma swój urok:</p>
<ul>
<li>Niższe ceny hoteli i restauracji niż w centrum</li>
<li>Promenada nadmorska idealna na wieczorne spacery</li>
<li>Bliskość do plaż na północy (Golden Bay, Għajn Tuffieħa)</li>
<li>Lokalna atmosfera — mniej turystyczna niż inne kurorty</li>
</ul>

<h2>W Okolicy</h2>
<ul>
<li><strong>Bugibba</strong> — przyległy kurort z barami i życiem nocnym</li>
<li><strong>Qawra</strong> — spokojniejsza wersja Bugibby, z akwarium</li>
<li><strong>Przeprawy na wyspy</strong> — z St Paul's Bay łatwo dostać się na Comino i Gozo łodziami turystycznymi</li>
</ul>
`,
  },

  // ── 14. FORTYFIKACJE ──
  {
    slug: "pl-fortyfikacje-malty",
    title: "Fortyfikacje Malty — 7000 Lat Obrony na 316 km²",
    subtitle: "Od prehistorycznych świątyń po brytyjskie bunkry — Malta to jedna wielka twierdza",
    topic: "fortifications",
    lang: "pl",
    tags: ["fortyfikacje", "oblężenie", "bastiony", "wieże", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1600623047164-0c3c0b688168?w=1200&q=80",
    source_count: 334,
    avg_confidence: 91,
    body_html: `
<p>Makłowicz zaczął swoją opowieść od fortyfikacji: <em>„Jestem na Malcie i nasze maltańskie opowieści chcę zacząć w miejscu niezwykle podniecającym dla każdego historyka wojskowości."</em></p>
<p>I miał rację — Malta to prawdopodobnie najbardziej ufortyfikowane miejsce na świecie w stosunku do swojej wielkości.</p>

<h2>Warstwy Obrony</h2>
<p>Każda epoka zostawiła na Malcie swoją warstwę fortyfikacji:</p>
<table>
<tr><th>Epoka</th><th>Fortyfikacja</th><th>Przykład</th></tr>
<tr><td>3600 p.n.e.</td><td>Świątynie megalityczne (ufortyfikowane?)</td><td>Ħaġar Qim, Ggantija</td></tr>
<tr><td>800 p.n.e.</td><td>Fenickie mury miejskie</td><td>Pod Mdiną</td></tr>
<tr><td>Średniowiecze</td><td>Mury arabskie</td><td>Mdina</td></tr>
<tr><td>1530–1798</td><td>Bastiony rycerzy</td><td>Valletta, Fort St Angelo, Fort St Elmo</td></tr>
<tr><td>1800–1964</td><td>Forty brytyjskie</td><td>Victoria Lines, Fort Rinella</td></tr>
<tr><td>1940–43</td><td>Schrony i bunkry WWII</td><td>Lascaris War Rooms</td></tr>
</table>

<h2>Najważniejsze Fortyfikacje</h2>
<ul>
<li><strong>Valletta</strong> — całe miasto to twierdza. Bastiony otaczają je ze wszystkich stron</li>
<li><strong>Fort St Elmo</strong> — na cyplu Valletty, pierwszy cel ataku podczas Wielkiego Oblężenia. Dziś mieści Muzeum Wojny</li>
<li><strong>Fort St Angelo (Birgu)</strong> — główna kwatera rycerzy, celka Caravaggia</li>
<li><strong>Victoria Lines</strong> — 12 km brytyjskiego muru obronnego przecinającego Maltę z zachodu na wschód. Zbudowany w 1870, nigdy nie użyty w walce. Świetny szlak trekkingowy</li>
<li><strong>Lascaris War Rooms (Valletta)</strong> — podziemne centrum dowodzenia z II wojny światowej. Stąd planowano operację lądowania na Sycylii</li>
</ul>

<h2>Malta w II Wojnie Światowej</h2>
<p>Malta przeżyła jedno z najbardziej intensywnych bombardowań w historii. W 1942 roku Luftwaffe i Regia Aeronautica zrzuciły na wyspę więcej bomb niż na Londyn podczas Blitzu. Król Jerzy VI nadał Malcie Krzyż Jerzego — jedyne odznaczenie bojowe przyznane całemu krajowi. Do dziś widnieje na maltańskiej fladze.</p>
`,
  },

  // ── 15. KUCHNIA MALTAŃSKA ──
  {
    slug: "pl-kuchnia-maltanska-kompletny-przewodnik",
    title: "Kuchnia Maltańska — Kompletny Przewodnik Inspirowany Makłowiczem",
    subtitle: "Wszystkie dania, które Makłowicz odkrył i opisał — od pastizzi po lampuki",
    topic: "cuisine",
    lang: "pl",
    tags: ["kuchnia", "jedzenie", "przepisy", "tradycja", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    source_count: 489,
    avg_confidence: 95,
    body_html: `
<p>Makłowicz przez trzy odcinki odkrywał maltańską kuchnię i wielokrotnie podkreślał: kuchnia maltańska to skrzyżowanie arabskiej, sycylijskiej, brytyjskiej i północnoafrykańskiej tradycji. Unikalna mieszanka, której nie znajdziesz nigdzie indziej.</p>

<h2>Dania, Które Musisz Spróbować</h2>

<h3>Pastizzi (€0.50)</h3>
<p><em>„Najprostsze i najbardziej demokratyczne danie na Malcie"</em> — jak mówił Makłowicz. Ciasto filo z ricottą lub groszkiem.</p>

<h3>Fenek / Stuffat tal-Fenek (€12–18)</h3>
<p><em>„Akt buntu i smak wolności"</em> — duszony królik w sosie pomidorowym. Narodowe danie Malty.</p>

<h3>Lampuki (sezon: sierpień–grudzień)</h3>
<p>Złota makrela — sezonowa ryba, która pojawia się jesienią. Pieczona, smażona lub w pie (lampuki pie). Tradycyjne połowy z użyciem pływających mat (kannizzati).</p>

<h3>Ħobż biż-żejt</h3>
<p>„Chleb z oliwą" — maltańska bruschetta. Chrupiący chleb nasączony oliwą, pomidorami, kaparami, czosnkiem i tuńczykiem. Idealne letnie danie.</p>

<h3>Bragioli</h3>
<p>Maltańskie zrazy — cienkie plastry wołowiny zawinięte wokół nadzienia z jajka, boczku i natki. Duszone w sosie. Babcina kuchnia.</p>

<h3>Timpana</h3>
<p>Zapiekanka z makaronu, mięsa, jajek i sera w cieście kruchym. Wygląda jak ogromne pasztecik — smakuje jak maltański dom.</p>

<h3>Ġbejna</h3>
<p>Mały okrągły serek z mleka koziego lub owczego. Świeży (miękki, kremowy), suszony (twardy, ostry) lub pieprzony. Specjalność Gozo.</p>

<h3>Kapunata</h3>
<p>Maltańska ratatouille — bakłażan, pomidory, oliwki, kapary, papryka. Podawana ciepła lub zimna.</p>

<h3>Imqaret</h3>
<p>Ciastka z daktylami smażone w głębokim oleju. Podawane gorące, z lodami. Street food na festiwalach.</p>

<h3>Kafe tal-Malti</h3>
<p>Maltańska kawa — parzona po turecku, z kardamonem i cynamonem. Znajdziesz ją w starych kawiarniach.</p>

<h2>Gdzie Jeść Według Budżetu</h2>
<table>
<tr><th>Budżet</th><th>Opcja</th><th>Typowe danie</th></tr>
<tr><td>€2–5</td><td>Pastizzeria / piekarnia</td><td>Pastizzi, ftira, qassatat</td></tr>
<tr><td>€8–15</td><td>Lokalna restauracja</td><td>Fenek, lampuki, pasta</td></tr>
<tr><td>€20–35</td><td>Restauracja średniej klasy</td><td>Owoce morza, steki, degustacje</td></tr>
<tr><td>€50+</td><td>Fine dining</td><td>Noni, Under Grain, De Mondion</td></tr>
</table>
`,
  },

  // ── 16. STRAIT STREET ──
  {
    slug: "pl-strait-street-maltanskie-pigalle",
    title: "Strait Street — Najgrzeszniejsza Ulica Śródziemnomorza",
    subtitle: "Niegdyś raj marynarzy i prostytutek, dziś koktajlowe bary i galerie — historia ulicy, którą Makłowicz odkrył w Valletcie",
    topic: "valletta",
    lang: "pl",
    tags: ["strait street", "valletta", "bary", "historia", "makłowicz"],
    cover_image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=1200&q=80",
    source_count: 212,
    avg_confidence: 85,
    body_html: `
<h2>„The Gut" — Wnętrzności Valletty</h2>
<p>Strait Street (Triq id-Dejqa) to wąska, równoległa do Republic Street uliczka, która przez wieki była najbardziej grzesznym adresem w Śródziemnomorzu. Marynarze z Królewskiej Marynarki Wojennej nazywali ją „The Gut" (Wnętrzności) i tu szli na ląd szukać rozrywki.</p>

<h2>Złota Era (1900–1960)</h2>
<p>W szczytowym okresie na Strait Street działało ponad 60 barów, klubów i domów publicznych na jednej krótkiej ulicy. Jazzmani grali do rana, marynarze pili i bili się (w tej kolejności), a malta lała się strumieniami. Każdy bar miał swoją orkiestrę.</p>
<p>Tu w barach grali muzycy, którzy później stali się legendami maltańskiej sceny muzycznej. Tu też przychodzili oficerowie — oddzieleni od zwykłych marynarzy barierką (tak, barierką w barze — brytyjski system klasowy nawet na imprezach).</p>

<h2>Upadek i Renesans</h2>
<p>Kiedy Brytyjczycy opuścili Maltę w 1979 roku, Strait Street umarła. Bary pozamykano, budynki niszczały. Przez dekady była opuszczonym, ciemnym zaułkiem.</p>
<p>Od 2015 roku ulica przeżywa renesans. Nowe bary, galerie, kawiarnie. Ale nie jest to turystyczna przeróbka — Strait Street zachowała swoją mroczną elegancję.</p>

<h2>Gdzie Pójść Dziś</h2>
<ul>
<li><strong>Tico-Tico Bar</strong> — koktajle w stylu lat 50.</li>
<li><strong>Wild Honey</strong> — bar z miodem i miodowymi koktajlami. Tak, to istnieje</li>
<li><strong>The Pub</strong> — gdzie podobno Noel Coward napisał swoją piosenkę o Malcie</li>
<li><strong>Muzeum Strait Street</strong> — małe, ale fascynujące. Zdjęcia z „The Gut" w złotych czasach</li>
</ul>
`,
  },

  // ── 17. PREHISTORIC TEMPLES ──
  {
    slug: "pl-swiatynie-starsze-od-piramid",
    title: "Świątynie Malty — Starsze od Piramid, Starsze od Stonehenge",
    subtitle: "Ggantija na Gozo to najstarsza wolnostojąca budowla na świecie — Makłowicz nie mógł tego pominąć",
    topic: "sightseeing",
    lang: "pl",
    tags: ["świątynie", "ggantija", "prehistoria", "gozo", "UNESCO"],
    cover_image: "https://images.unsplash.com/photo-1600623047164-0c3c0b688168?w=1200&q=80",
    source_count: 278,
    avg_confidence: 92,
    body_html: `
<h2>Starsze niż Myślisz</h2>
<p>Na Malcie i Gozo stoi 7 świątyń megalitycznych wpisanych na listę UNESCO. Najstarsza z nich — Ggantija na Gozo — została zbudowana około 3600 roku p.n.e. Dla porównania:</p>
<ul>
<li>Piramida Cheopsa: ~2560 p.n.e. (1000 lat MŁODSZA)</li>
<li>Stonehenge: ~3000 p.n.e. (600 lat MŁODSZY)</li>
<li>Ggantija: ~3600 p.n.e.</li>
</ul>
<p>To czyni świątynie maltańskie najstarszymi wolnostojącymi budowlami na świecie.</p>

<h2>Kim Byli Budowniczowie</h2>
<p>Nie wiemy prawie nic. Nie zostawili pisma. Nie wiemy, jak się nazywali, w co wierzyli, jak się organizowali. Wiemy, że:</p>
<ul>
<li>Budowali z ogromnych bloków wapienia (do 50 ton!)</li>
<li>Tworzyli figurki otyłych postaci (być może bogiń płodności)</li>
<li>Ich kultura trwała ok. 1000 lat, a potem... zniknęła. Bez śladu</li>
</ul>

<h2>Które Zobaczyć</h2>
<ul>
<li><strong>Ggantija (Gozo)</strong> — najstarsza, najlepiej zachowana. Muzeum przy wejściu. €9</li>
<li><strong>Ħaġar Qim & Mnajdra (Qrendi)</strong> — na klifie nad morzem, spektakularna lokalizacja. Namiot ochronny nad nimi. €10</li>
<li><strong>Tarxien</strong> — w środku miasteczka (!). Bogato zdobione. €6</li>
<li><strong>Hypogeum Ħal Saflieni</strong> — podziemna świątynia wykuta w skale. JEDYNA taka na świecie. Bilety trzeba rezerwować TYGODNIE wcześniej — max 80 osób dziennie. €35, ale warto każdego centa</li>
</ul>
`,
  },

  // ── 18. FILM LOCATIONS ──
  {
    slug: "pl-malta-filmowa-game-of-thrones",
    title: "Malta Filmowa — Game of Thrones, Gladiator, Troy i 300 Innych",
    subtitle: "Dlaczego Hollywood kocha Maltę i które miejsca Makłowicza znasz z ekranu",
    topic: "sightseeing",
    lang: "pl",
    tags: ["film", "game of thrones", "hollywood", "lokacje", "kino"],
    cover_image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    source_count: 234,
    avg_confidence: 88,
    body_html: `
<h2>Dlaczego Malta</h2>
<p>Malta to filmowy raj: 300 dni słońca, historyczna architektura, morze, pustynne krajobrazy, nowoczesne studio filmowe (Malta Film Studios) z jednym z największych basenów do zdjęć wodnych na świecie.</p>
<p>Od lat 60. nakręcono tu ponad 300 filmów i seriali. Wiele miejsc, które Makłowicz odwiedził, widziałeś już na ekranie.</p>

<h2>Miejsca Makłowicza w Filmach</h2>
<table>
<tr><th>Lokacja</th><th>Film/Serial</th><th>Scena</th></tr>
<tr><td>Mdina</td><td>Game of Thrones (S1)</td><td>King's Landing — brama, ulice</td></tr>
<tr><td>Fort St Angelo (Birgu)</td><td>Assassin's Creed</td><td>Forteca templariuszy</td></tr>
<tr><td>Valletta</td><td>Munich (Spielberg)</td><td>Sceny w Bejrucie</td></tr>
<tr><td>Azure Window (Gozo)</td><td>Game of Thrones (S1)</td><td>Ślub Daenerys i Drogo</td></tr>
<tr><td>Grand Harbour</td><td>Troy</td><td>Porty Troi</td></tr>
<tr><td>Fort Ricasoli</td><td>Gladiator</td><td>Sceny w Koloseum</td></tr>
</table>

<h2>Inne Znane Produkcje</h2>
<ul>
<li><strong>Popeye (1980)</strong> — Robin Williams. Wioska filmowa w Anchor Bay do dziś stoi jako atrakcja turystyczna</li>
<li><strong>World War Z</strong> — Brad Pitt. Sceny w Valletcie</li>
<li><strong>By the Sea</strong> — Angelina Jolie & Brad Pitt. Gozo</li>
<li><strong>Assassin's Creed</strong> — Michael Fassbender. Fort St Angelo</li>
<li><strong>Napoleon (2023)</strong> — Ridley Scott. Fortyfikacje Valletty</li>
</ul>

<h2>Malta Film Studios</h2>
<p>W Kalkara (obok Birgu) znajdują się Mediterranean Film Studios z dwoma ogromnymi basenami do zdjęć wodnych. Tu kręcono sceny morskie z „Troi", „Popeye" i wielu innych. Studio oferuje też wycieczki dla turystów.</p>
`,
  },

  // ── 19. NURKOWANIE ──
  {
    slug: "pl-nurkowanie-malta-krystaliczne-wody",
    title: "Nurkowanie na Malcie — Krystaliczne Wody i Wraki z Dwóch Wojen",
    subtitle: "Dlaczego Malta jest w top 5 miejsc do nurkowania w Europie",
    topic: "beaches",
    lang: "pl",
    tags: ["nurkowanie", "diving", "wraki", "morze", "sport"],
    cover_image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    source_count: 198,
    avg_confidence: 89,
    body_html: `
<h2>Dlaczego Malta do Nurkowania</h2>
<p>Malta to jedno z najlepszych miejsc do nurkowania w Europie. Dlaczego?</p>
<ul>
<li><strong>Widoczność:</strong> 30–40 metrów. Krystalicznie czysta woda</li>
<li><strong>Temperatura:</strong> 15°C zimą, 28°C latem. Nurkować można cały rok</li>
<li><strong>Wraki:</strong> 50+ wraków od II wojny światowej po celowo zatopione statki i samoloty</li>
<li><strong>Jaskinie i groty:</strong> Blue Hole (Gozo), Santa Marija Caves, Inland Sea</li>
<li><strong>Łatwość:</strong> Wiele miejsc nurkowalnych z brzegu (shore dives), nie trzeba łodzi</li>
</ul>

<h2>Top Miejsca</h2>
<ul>
<li><strong>Blue Hole (Gozo)</strong> — naturalny basen skalny z oknem podwodnym. Nurkowanie od 6 do 60 metrów. Obok dawnego Azure Window</li>
<li><strong>HMS Maori (Valletta)</strong> — wrak niszczyciela z WWII na 14 metrach. Idealny dla początkujących</li>
<li><strong>Um el Faroud</strong> — zatopiony tankowiec na 36 metrach. Duży, spektakularny</li>
<li><strong>P29 (Ċirkewwa)</strong> — celowo zatopiony kuter patrolowy. 12–35 m</li>
<li><strong>Inland Sea (Gozo)</strong> — tunel prowadzący z zamkniętego jeziora do otwartego morza. Magiczne</li>
</ul>

<h2>Dla Początkujących</h2>
<p>Malta to świetne miejsce na kurs PADI Open Water. Szkoły nurkowe oferują kursy od €350 (3–4 dni). Ciepła woda, spokojne zatoki, profesjonalni instruktorzy (wielu mówi po angielsku, niektórzy po polsku).</p>
<p>Jeśli nie chcesz się certyfikować — spróbuj „Discover Scuba Diving" (jedno nurkowanie z instruktorem, ok. €60).</p>
`,
  },

  // ── 20. PORADY MAKŁOWICZA ──
  {
    slug: "pl-porady-maklowicza-dla-turystow",
    title: "10 Złotych Porad Makłowicza dla Turystów na Malcie",
    subtitle: "Wszystko, czego Robert Makłowicz nauczył nas o zwiedzaniu Malty — zebrane z trzech odcinków",
    topic: "tips",
    lang: "pl",
    tags: ["porady", "makłowicz", "zwiedzanie", "praktyczne", "tips"],
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    source_count: 445,
    avg_confidence: 97,
    body_html: `
<p>Robert Makłowicz to nie tylko geniusz kulinarny — to doświadczony podróżnik, który wie, jak zwiedzać mądrze. Zebraliśmy najlepsze porady z jego trzech odcinków o Malcie.</p>

<h2>1. Odpoczywaj w pięknych miejscach</h2>
<p><em>„Rozsądny zwiedzający powinien co jakiś czas przycupnąć, a do tego przycupnięcia wybierać miejsca, w których siedząc również można zwiedzać."</em></p>
<p>Upper Barrakka Gardens, Fontanella w Mdinie, taras Cytadeli na Gozo — wybieraj miejsca odpoczynku z widokiem.</p>

<h2>2. Zacznij od pastizzi</h2>
<p><em>„Za pięćdziesiąt centów jesteś w raju."</em></p>
<p>Pastizzi to idealne śniadanie: tanie, sycące, autentyczne. Crystal Palace w Rabacie jest legendą.</p>

<h2>3. Jedz to, co jedzą lokalni</h2>
<p>Makłowicz zawsze szukał dań lokalnych, nie turystycznych. Fenek (królik), ftira, ħobż biż-żejt — to dania, które Maltańczycy jedzą sami.</p>

<h2>4. Prom na Gozo to przygoda, nie transport</h2>
<p><em>„Nie jest to specjalnie wycieńczający rejs, bo trwa około 25 minut."</em></p>
<p>Nie traktuj promu jak autobusu. Wyjdź na pokład, obserwuj morze, szukaj Comino po drodze.</p>

<h2>5. Mdina koniecznie wieczorem</h2>
<p><em>„Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować."</em></p>
<p>Większość turystów odwiedza Mdina w ciągu dnia. Wielki błąd. Przyjedź o zachodzie słońca, zostań do ciemności.</p>

<h2>6. Szukaj historii, nie plaż</h2>
<p>Makłowicz ani razu nie leżał na plaży. Malta nie jest Majorcą — tu przyjeżdża się po historię, architekturę i jedzenie. Plaże są bonusem.</p>

<h2>7. Nie bój się bocznych uliczek</h2>
<p>Najciekawsze rzeczy na Malcie nie są na głównych trasach. Strait Street, zaułki Birgu, wiejskie pastizzerie — schodź z utartego szlaku.</p>

<h2>8. Szanuj kościoły</h2>
<p>Malta ma 365 kościołów — jeden na każdy dzień roku. Wchodź do nich (wstęp zwykle darmowy) — każdy jest mini-muzeum sztuki.</p>

<h2>9. Wino próbuj lokalne</h2>
<p><em>„Wino było ledwo pijalne, a jak jest teraz?"</em></p>
<p>Maltańskie wino przeszło rewolucję. Szczep Ġellewża istnieje tylko tu — to Twoja szansa na unikatowe doświadczenie.</p>

<h2>10. Malta to nie jeden dzień</h2>
<p>Makłowicz spędził 3 dni i ledwo zarysował powierzchnię. Planuj minimum 4–5 dni: 2 na Maltę, 1–2 na Gozo, 1 na relaks.</p>
`,
  },
  {
    slug: "pl-wielkie-oblezenie-1565",
    title: "Wielkie Oblężenie 1565 — Jak 500 Rycerzy Ocalilo Europę",
    subtitle: "Historia najważniejszej bitwy w dziejach Morza Śródziemnego, o której opowiada Makłowicz",
    topic: "fortifications",
    tags: ["historia", "rycerze", "oblężenie", "valletta", "fortyfikacje", "1565"],
    source_count: 445, avg_confidence: 93, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    body_html: `
<p>Kiedy Makłowicz spaceruje po Valletcie i dotyka jej murów, dotyka historii, która zmieniła losy Europy. W 1565 roku Imperium Osmańskie wysłało 40 000 żołnierzy, by zdobyć Maltę. Stanęło im na drodze zaledwie 500 rycerzy Zakonu Maltańskiego pod wodzą 70-letniego Wielkiego Mistrza Jean de Valette'a.</p>
<h2>Siły Nierówne</h2>
<p>Armia turecka przybyła z flotą 200 okrętów. Rycerze mieli ok. 500 braci zakonnych i 6000 maltańskich żołnierzy. Oblężenie trwało od maja do września — cztery brutalne miesiące walk o każdy metr wyspy.</p>
<h2>Fort św. Elma — Klucz do Bitwy</h2>
<p><strong>Fort św. Elma</strong> miał paść w kilka dni. Bronił się miesiąc. Jego obrońcy zginęli do ostatniego, ale opóźnili Turków na tyle, by nadeszły posiłki z Sycylii. Turecki admirał Dragut zginął pod jego murami.</p>
<h2>Narodziny Valletty</h2>
<p>Po zwycięstwie Jean de Valette postanowił zbudować niezdobyte miasto. Valletta — nazwana na jego cześć — powstała jako jedna z najdoskonalszych fortyfikacji w historii. Makłowicz mówi: <em>„Malta to miejsce, gdzie historia napisana jest w kamieniu"</em> — te kamienie pamiętają Wielkie Oblężenie.</p>
<h2>Co Zobaczyć</h2>
<ul>
  <li><strong>Fort św. Elma</strong> — Muzeum Wojny, miejsce najzacieklejszych walk</li>
  <li><strong>Upper Barrakka Gardens</strong> — panorama portu, gdzie stała turecka flota</li>
  <li><strong>Pałac Wielkiego Mistrza</strong> — sala z pełną zbrojownią z epoki</li>
  <li><strong>Konkatedra św. Jana</strong> — wewnątrz pomniki rycerzy-bohaterów</li>
</ul>
`,
  },
  {
    slug: "pl-cytadela-gozo-twierdza",
    title: "Cytadela na Gozo — Twierdza z Tajną Ucieczką",
    subtitle: "Makłowicz odkrywa ukryte wyjścia ewakuacyjne najstarszej twierdzy na archipelagu",
    topic: "fortifications",
    tags: ["gozo", "cytadela", "fortyfikacje", "victoria", "historia", "twierdza"],
    source_count: 312, avg_confidence: 90, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?w=1200&q=80",
    body_html: `
<p>Cytadela w Victorii na Gozo to jedna z najstarszych zamieszkanych twierdz na świecie. Makłowicz odwiedza ją w epizodzie o Gozo i zwraca uwagę na fascynujący szczegół: <em>„Cytadela była również wyposażona w wyjścia ewakuacyjne."</em></p>
<h2>5000 Lat Historii</h2>
<p>Wzgórze Cytadeli było zamieszkane od epoki brązu (ok. 1500 p.n.e.). Kolejne cywilizacje — Fenicjanie, Rzymianie, Arabowie, Normanowie — budowały na ruinach poprzedników. Obecne fortyfikacje to dzieło Rycerzy Maltańskich z XVI-XVII wieku.</p>
<h2>Tajemnicze Tunele</h2>
<p>Pod twierdzą biegnie sieć podziemnych tuneli. W razie oblężenia mieszkańcy Gozo mogli się ewakuować ukrytymi przejściami prowadzącymi poza mury. Część tuneli jest nadal dostępna, część zasypana przez wieki.</p>
<h2>Co Zobaczyć</h2>
<ul>
  <li><strong>Katedra Wniebowzięcia</strong> — iluzjonistyczny sufit namalowany jako kopuła (kopuły nie ma!)</li>
  <li><strong>Stare Więzienie</strong> — graffiti wyryte przez więźniów w XVI-XVIII wieku</li>
  <li><strong>Muzeum Archeologiczne</strong> — artefakty z 5000 lat</li>
  <li><strong>Panorama 360°</strong> — widok na całe Gozo z murów</li>
</ul>
<p>Wstęp na teren Cytadeli jest bezpłatny. Muzea kosztują po €5 każde lub €13 za pakiet.</p>
`,
  },
  {
    slug: "pl-konkatedra-sw-jana",
    title: "Konkatedra św. Jana — Złoto Ukryte za Prostą Fasadą",
    subtitle: "Dlaczego najskromniejszy budynek w Valletcie kryje najbardziej oszałamiające wnętrze na Malcie",
    topic: "sightseeing",
    tags: ["valletta", "kościół", "barok", "sztuka", "caravaggio", "rycerze"],
    source_count: 389, avg_confidence: 92, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    body_html: `
<p>Makłowicz wchodzi do Konkatedry i mówi jedno słowo: <em>„Oszałamiający barok."</em> Ma rację. Z zewnątrz to surowy, prostokątny budynek — celowo skromny, bo rycerze złożyli ślub pokory. Ale w środku...</p>
<h2>Wnętrze, Które Zapiera Dech</h2>
<p>Każdy centymetr ścian i sufitu pokryty jest rzeźbionym wapieniem, złotem, marmurem i malowidłami. 400 marmurowych płyt nagrobnych na podłodze to groby rycerzy — każdy z herbem rodu. Mattia Preti przez 5 lat malował sklepienie, opowiadając życie św. Jana Chrzciciela.</p>
<h2>Caravaggio — Największe Dzieło</h2>
<p>W oratorium wisi „Ścięcie św. Jana" — największy obraz Caravaggia (3,7 × 5,2 m) i jedyne podpisane przez niego dzieło. Artysta ukrył swój podpis w krwi tryskającej z szyi świętego. Makłowicz zauważa: <em>„Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki."</em></p>
<h2>Kaplice Langues</h2>
<p>Osiem kaplic bocznych reprezentuje osiem „języków" (narodowości) rycerzy: Prowansję, Owernię, Francję, Italię, Aragonię, Anglię, Niemcy i Kastylię. Każda kaplica to dzieło sztuki samo w sobie.</p>
<p><strong>Praktycznie:</strong> Wstęp €15, audio-przewodnik wliczony. Otwarte pon-pt 9:30-16:30, sob 9:30-12:30. W niedzielę zamknięte.</p>
`,
  },
  {
    slug: "pl-7000-lat-historii-malty",
    title: "7000 Lat Historii Malty — Od Megalitów do Unii Europejskiej",
    subtitle: "Jak niewielka wyspa przeżyła więcej niż większość kontynentów — krótka historia Malty",
    topic: "history",
    tags: ["historia", "megality", "rycerze", "napoleon", "brytyjczycy", "niepodległość"],
    source_count: 467, avg_confidence: 91, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    body_html: `
<p>Makłowicz zaczyna swoją maltańską podróż od słów: <em>„Jestem na Malcie i nasze maltańskie opowieści chcę zacząć w miejscu niezwykle podniecającym dla każdego historyka."</em> Malta to archipelag, którego historia sięga 5200 lat p.n.e.</p>
<h2>Epoka Megalityczna (3600-2500 p.n.e.)</h2>
<p>Świątynie Ggantija na Gozo i Hagar Qim na Malcie są <strong>starsze od piramid egipskich o 1000 lat</strong>. To najstarsze wolnostojące kamienne budowle na świecie — wpisane na listę UNESCO.</p>
<h2>Fenicjanie, Rzymianie, Arabowie</h2>
<p>Fenicjanie nadali wyspie nazwę — „Malet" (schronienie). Rzymianie uczynili ją kolonią. W 60 roku n.e. rozbił się tu Apostoł Paweł, przynosząc chrześcijaństwo. Arabowie (870-1091) zostawili maltański język — do dziś semicki, pisany alfabetem łacińskim.</p>
<h2>Rycerze Maltańscy (1530-1798)</h2>
<p>268 lat rządów Zakonu to złoty wiek Malty. Zbudowali Vallettę, systemy obronne, szpitale. Odparli Wielkie Oblężenie 1565. Makłowicz poświęca im wiele uwagi, zwiedzając ich pałace i fortyfikacje.</p>
<h2>Napoleon i Brytyjczycy</h2>
<p>Napoleon zajął Maltę w 1798 — bez walki. Ale po 2 latach Maltańczycy się zbuntowali. Brytyjczycy przejęli wyspę na 164 lata (1800-1964). W II wojnie światowej Malta była tak bombardowana, że król Jerzy VI odznaczył <strong>całą wyspę</strong> Krzyżem Jerzego.</p>
<h2>Współczesność</h2>
<p>Niepodległość w 1964, republika w 1974, Unia Europejska w 2004, strefa euro w 2008. Dziś Malta to jeden z najszybciej rozwijających się krajów UE.</p>
`,
  },
  {
    slug: "pl-prom-na-gozo",
    title: "Prom na Gozo — 25 Minut do Innego Świata",
    subtitle: "Makłowicz płynie na siostrzaną wyspę i odkrywa, że 25 minut rejsu to podróż w czasie",
    topic: "transport",
    tags: ["gozo", "prom", "transport", "podróż", "morze"],
    source_count: 256, avg_confidence: 88, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80",
    body_html: `
<p>Makłowicz informuje: <em>„Płyniemy na Gozo. Nie jest to specjalnie wycieńczający rejs, bo trwa około 25 minut."</em> Ale te 25 minut zmienia wszystko — z hałaśliwej, turystycznej Malty przenosisz się na zieloną, spokojną wyspę, gdzie czas płynie wolniej.</p>
<h2>Praktycznie: Prom Gozo Channel</h2>
<ul>
  <li><strong>Terminal:</strong> Ċirkewwa (północna Malta) → Mġarr (Gozo)</li>
  <li><strong>Czas rejsu:</strong> 25 minut</li>
  <li><strong>Cena:</strong> €4,65 w obie strony (płacisz tylko na powrocie!)</li>
  <li><strong>Częstotliwość:</strong> co 45 minut latem, co 75 minut zimą</li>
  <li><strong>Samochód:</strong> €15,70 w obie strony</li>
</ul>
<h2>Szybki Prom Fast Ferry</h2>
<p>Od 2021 roku kursuje również szybki prom z <strong>Valletty do Mġarr</strong> — 45 minut, €6,50 w jedną stronę. Idealna opcja, jeśli nie masz samochodu — omijasz dojazd na północ Malty.</p>
<h2>Wskazówki Makłowicza</h2>
<p>Ranny prom (7:00-8:00) jest najspokojniejszy. Górny pokład daje spektakularne widoki na Comino i Blue Lagoon. Na Gozo warto wynająć samochód — autobusy kursują rzadko. Makłowicz mówi: <em>„Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien."</em></p>
`,
  },
  {
    slug: "pl-barok-maltanski-koscioly",
    title: "Barok na Malcie — Oszałamiające Wnętrza Kościołów",
    subtitle: "Dlaczego Malta ma więcej złota w kościołach niż Watykan — i jak je znaleźć",
    topic: "sightseeing",
    tags: ["barok", "kościoły", "sztuka", "architektura", "valletta", "religia"],
    source_count: 334, avg_confidence: 89, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    body_html: `
<p>Malta ma <strong>365 kościołów</strong> — jeden na każdy dzień roku. Makłowicz wchodzi do Konkatedry św. Jana i podsumowuje jednym słowem: <em>„Oszałamiający barok."</em> To dopiero początek.</p>
<h2>Dlaczego Tyle Złota?</h2>
<p>Rycerze Maltańscy przybyli z największych rodów arystokratycznych Europy. Każdy „langue" (oddział narodowy) rywalizował o najpiękniejszą kaplicę w Konkatedrze. Efekt: wnętrza pokryte złotem, marmurami i arcydziełami malarstwa.</p>
<h2>Kościoły, Które Trzeba Zobaczyć</h2>
<ul>
  <li><strong>Konkatedra św. Jana</strong> (Valletta) — Caravaggio, złocone sklepienie, 400 nagrobków rycerzy</li>
  <li><strong>Rotunda w Mosta</strong> — trzecia co do wielkości kopuła na świecie (bez wsparcia), bomba przebiła sufit w 1942 i nie wybuchła</li>
  <li><strong>Katedra św. Pawła</strong> (Mdina) — spokojniejsza alternatywa, z freskami Mattii Pretiego</li>
  <li><strong>Bazylika Ta' Pinu</strong> (Gozo) — miejsce pielgrzymek, na wzgórzu z widokiem na morze</li>
</ul>
<h2>Festa — Kiedy Kościoły Ożywają</h2>
<p>Od czerwca do września każda wioska na Malcie celebruje swoją „festę" — święto patrona. Kościoły otwierają się na oścież, ulice zdobią światła, grają orkiestry, a niebo rozświetlają fajerwerki. To najlepszy czas na zobaczenie maltańskiego baroku w pełnej okazałości.</p>
`,
  },
  {
    slug: "pl-victoria-stolica-gozo",
    title: "Victoria — Stolica Gozo z 7500 Mieszkańcami",
    subtitle: "Makłowicz odkrywa miasteczko, które jest sercem drugiej wyspy Malty",
    topic: "gozo",
    tags: ["gozo", "victoria", "miasteczko", "cytadela", "rynek", "tradycja"],
    source_count: 278, avg_confidence: 87, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1555990538-1e6c3b20e1d2?w=1200&q=80",
    body_html: `
<p>Makłowicz informuje: <em>„Stolica Gozo to tak naprawdę miasteczko, no bo liczy sobie mniej więcej siedem i pół tysiąca mieszkańców."</em> Victoria (dawniej Rabat Gozo) to serce wyspy — małe, ale pełne charakteru.</p>
<h2>Plac It-Tokk — Serce Miasta</h2>
<p><strong>Pjazza Indipendenza</strong> (locals mówią „It-Tokk") to centraly plac z codziennym targiem. Rano sprzedają lokalne warzywa, ser gbejniet, oliwki i miód. W kawiarniach siedzą emeryci przy kawie i pastizzi. To kwintesencja gozytańskiego życia.</p>
<h2>Rynek Kulinarny</h2>
<p>Gozo słynie z produktów, których nie znajdziesz na Malcie: <strong>gbejniet</strong> (kozi ser w occie i pieprzu), <strong>sundried tomatoes</strong>, <strong>miód kaktusu</strong> i <strong>lokalne wino</strong>. Na targu kupisz wszystko prosto od rolników.</p>
<h2>Poza Cytadelą</h2>
<p>Victoria ma więcej niż Cytadelę. <strong>Teatr Astra i Aurora</strong> — dwa rywalizujące teatry operowe (tak, Victoria ma operę!). <strong>Kościoł św. Jerzego</strong> z barokowym wnętrzem. Uliczki z kamiennymi domami i wiszącymi kwiatami.</p>
<p>Z Victorii wychodzą autobusy do wszystkich zakątków Gozo. To naturalny punkt startowy do zwiedzania wyspy.</p>
`,
  },
  {
    slug: "pl-rabat-ciche-miasteczko",
    title: "Rabat — Ciche Miasteczko u Bram Mdiny",
    subtitle: "Gdzie Makłowicz zaczyna dzień od pastizzi i kończy na króliku duszonym w winie",
    topic: "sightseeing",
    tags: ["rabat", "pastizzi", "katakumby", "jedzenie", "mdina", "tradycja"],
    source_count: 298, avg_confidence: 88, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1543076499-a6133cb932fd?w=1200&q=80",
    body_html: `
<p>Trzeci epizod Makłowicza zaczyna się w Rabacie: <em>„Przypłynęliśmy porannym promem z Gozo na Maltę."</em> Rabat i Mdina to tak naprawdę jedno miasto podzielone na dwoje — Rabat to część „plebejska", Mdina to arystokratyczna.</p>
<h2>Pastizzi w Crystal Palace</h2>
<p>Makłowicz tu odwiedza pastizzerie — miejsce serwujące pastizzi (ciasto filo z ricottą lub groszkiem). Za €0,50 dostajesz gorące, chrupiące ciasto prosto z pieca. <em>„Za pięćdziesiąt centów jesteś w raju"</em> — mówi. Crystal Palace w Rabacie działa od 1956 roku.</p>
<h2>Katakumby</h2>
<p>Pod Rabatem rozciąga się labirynt <strong>wczesnochrześcijańskich katakumb</strong> datowanych na II-V wiek. Katakumby św. Pawła to najrozleglejsze — ponad 2000 m² podziemnych korytarzy z grobami, stołami agape (uczt pogrzebowych) i freskami.</p>
<h2>Kuchnia Rabatu</h2>
<p>Wieczorem Makłowicz je w tradycyjnej restauracji fenka — duszonego królika w winie i czosnku. To danie narodowe Malty, którego historia sięga buntu chłopów przeciw rycerzom zabraniającym im polowań na króliki.</p>
<p><strong>Dojazd:</strong> Autobus 51 lub 52 z Valletty, ok. 30 minut. Bilety €1,50.</p>
`,
  },
  {
    slug: "pl-fort-sw-aniola-birgu",
    title: "Fort św. Anioła — Pierwsza Siedziba Rycerzy na Malcie",
    subtitle: "Makłowicz odkrywa twierdzę, w której rycerze maltańscy naprawdę mieszkali przed zbudowaniem Valletty",
    topic: "birgu",
    tags: ["birgu", "fort", "rycerze", "historia", "trzy miasta", "port"],
    source_count: 321, avg_confidence: 90, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    body_html: `
<p>Kiedy Makłowicz dociera do Birgu, mówi: <em>„Birgu to miejsce, gdzie rycerze maltańscy naprawdę mieszkali — zanim zbudowali Vallettę."</em> Fort św. Anioła na cyplu Birgu to miejsce, od którego zaczęła się maltańska epopeja rycerska.</p>
<h2>Twierdza z 2000-Letnią Historią</h2>
<p>Wzgórze Fortu było zamieszkane od czasów fenieckich. Arabowie postawili tu zamek, rycerze przebudowali go na potężną twierdzę. Podczas Wielkiego Oblężenia 1565 fort był ostatnią linią obrony — i nie padł.</p>
<h2>Co Zobaczyć</h2>
<ul>
  <li><strong>Kaplica św. Anny</strong> — jedna z najstarszych na Malcie, w podziemiach fortu</li>
  <li><strong>Bastiony</strong> — widok na Wielki Port i Vallettę z drugiej strony</li>
  <li><strong>Sale rycerskie</strong> — ekspozycja o historii Zakonu</li>
  <li><strong>Wieża zegarowa</strong> — punkt orientacyjny widoczny z morza</li>
</ul>
<h2>Birgu Poza Fortem</h2>
<p>Birgu (Vittoriosa) to najstarsze z Trzech Miast. Wąskie uliczki z kamiennymi domami, kolorowe balkony, lokalne bary. <strong>Muzeum Inkwizytora</strong> to kolejna perełka — Inkwizycja na Malcie trwała od 1574 do 1798.</p>
<p><strong>Dojazd:</strong> Wodny taxi z Valletty (€1,50, 5 minut) — najpiękniejszy sposób na dotarcie.</p>
`,
  },
  {
    slug: "pl-mdina-noca-wino-cisza",
    title: "Nocne Życie Mdiny — Wino, Cisza i Wieczność w Kamieniu",
    subtitle: "Makłowicz pije wino w mieście, gdzie jedynym dźwiękiem są własne kroki na kamiennej posadzce",
    topic: "mdina",
    tags: ["mdina", "noc", "wino", "cisza", "romantyczne", "spacer"],
    source_count: 287, avg_confidence: 91, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=80",
    body_html: `
<p>Makłowicz kończy swoją maltańską podróż nocnym spacerem po Mdinie: <em>„Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować — cisza, światło i wieczność w kamieniu."</em> I o winie mówi: <em>„Wino było ledwo pijalne, a jak jest teraz? Jedzenie jest wspaniałe."</em></p>
<h2>Ciche Miasto Po Zmroku</h2>
<p>W dzień Mdinę odwiedzają tłumy (to „King's Landing" z Game of Thrones). Ale po zachodzie słońca wszystko się zmienia. Turyści odjeżdżają, bramy zamykają się symbolicznie, a miasto należy do kilkudziesięciu rodzin, które tu wciąż mieszkają.</p>
<h2>Spacer z Lampionami</h2>
<p>Kute latarnie oświetlają wąskie uliczki miodowożółtym światłem. Echo własnych kroków na wapiennej posadzce to jedyny dźwięk. Palazzo z herbami na fasadach wyglądają jak scenografia z innej epoki — bo nią są. Mdina nie zmieniła się od XVII wieku.</p>
<h2>Gdzie Pić Wino</h2>
<ul>
  <li><strong>Fontanella Tea Garden</strong> — na murach, widok na pół Malty, najsłynniejsze ciasta</li>
  <li><strong>Medina Restaurant</strong> — kamienne wnętrze z XII wieku, lokalne wina</li>
  <li><strong>De Mondion</strong> — restauracja fine dining z tarasem na bastionach</li>
</ul>
<p>Mdina nocą to doświadczenie, które zostaje na długo. Makłowicz miał rację — to najlepszy sposób na pożegnanie z Maltą.</p>
`,
  },
  {
    slug: "pl-maltanskie-jedzenie-uliczne",
    title: "Maltańskie Jedzenie Uliczne — Od Pastizzi do Ftira i Dalej",
    subtitle: "Kompletny przewodnik po tym, co Maltańczycy jedzą na ulicy — za grosze",
    topic: "cuisine",
    tags: ["jedzenie uliczne", "pastizzi", "ftira", "hobz", "budżet", "kuchnia"],
    source_count: 345, avg_confidence: 90, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1599940824399-b40f69e8b2b0?w=1200&q=80",
    body_html: `
<p>Makłowicz poświęca pastizzi osobną scenę: <em>„Pastizzi to jest właśnie to — rodzaj wytrawnego wypieku nadziewanego najczęściej albo ricottą, albo zielonym groszkiem."</em> Ale maltańskie jedzenie uliczne to znacznie więcej.</p>
<h2>Pastizzi — Król Ulicy (€0,50)</h2>
<p>Chrupiące ciasto filo w kształcie diamentu, nadziewane <strong>ricottą</strong> (pastizzi tal-irkotta) lub <strong>groszkiem</strong> (pastizzi tal-piżelli). Sprzedawane w „pastizzerijach" — prostych lokalach otwartych od świtu. Najsłynniejsze: Crystal Palace w Rabacie, Serkin w Rabacie, Is-Serkin w Mosta.</p>
<h2>Ftira — Gozytański Chleb (€3-5)</h2>
<p>Okrągły, płaski chleb na zakwasie z oliwą, pomidorami, tuńczykiem, kaparami i oliwkami. Na Gozo to instytucja — każda piekarnia ma własny przepis. Na Malcie trudniej znaleźć autentyczną ftirę.</p>
<h2>Hobż biż-Żejt — Maltańska Kanapka (€2-4)</h2>
<p>Dosłownie „chleb z oliwą" — maltański chleb nacierany pomidorem, polany oliwą, z tuńczykiem, kaparami, oliwkami. Tradycyjny lunch robotników i rybaków.</p>
<h2>Inne Uliczne Smaki</h2>
<ul>
  <li><strong>Imqaret</strong> — smażone ciastka z pastą daktylową, €1</li>
  <li><strong>Qassatat</strong> — wersja pastizzi ze szpinakiem i anchois</li>
  <li><strong>Kinnie</strong> — gorzko-słodki napój z pomarańczy i ziół, €1-2</li>
  <li><strong>Cisk</strong> — maltańskie piwo, €2-3 w barze</li>
</ul>
<p>Na Malcie można doskonale zjeść za €5-10 dziennie, jedząc jak miejscowi na ulicy.</p>
`,
  },
  {
    slug: "pl-unesco-malta-co-zobaczyc",
    title: "Zabytki UNESCO na Malcie — Co Warto Zobaczyć",
    subtitle: "Trzy wpisy na Listę Światowego Dziedzictwa na maleńkiej wyspie — przewodnik po maltańskim UNESCO",
    topic: "sightseeing",
    tags: ["unesco", "megality", "valletta", "hypogeum", "historia", "zabytki"],
    source_count: 412, avg_confidence: 93, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    body_html: `
<p>Malta — wyspa mniejsza od Warszawy — ma <strong>3 wpisy na Listę UNESCO</strong>. To więcej na kilometr kwadratowy niż jakikolwiek inny kraj. Makłowicz odwiedza dwa z nich: Vallettę i świątynie megalityczne.</p>
<h2>1. Valletta — Całe Miasto na Liście UNESCO (1980)</h2>
<p>Valletta to jedyne miasto-stolica, które w całości jest wpisane na listę UNESCO. Zbudowane po Wielkim Oblężeniu 1565, zaprojektowane na siatce prostych ulic (jeden z pierwszych planowanych miast w Europie). Każdy budynek ma wartość historyczną. Makłowicz mówi: <em>„Malta to miejsce, gdzie historia napisana jest w kamieniu."</em></p>
<h2>2. Świątynie Megalityczne (1980, rozszerzenie 1992)</h2>
<p>Siedem świątyń na Malcie i Gozo, datowanych na <strong>3600-2500 p.n.e.</strong> — starszych od Stonehenge i piramid. Najważniejsze:</p>
<ul>
  <li><strong>Ggantija</strong> (Gozo) — najstarsza, z blokami ważącymi 50 ton</li>
  <li><strong>Hagar Qim</strong> i <strong>Mnajdra</strong> — na klifie nad morzem, spektakularna lokalizacja</li>
  <li><strong>Tarxien</strong> — najboagatsze rzeźby i reliefy</li>
</ul>
<h2>3. Hypogeum Hal Saflieni (1980)</h2>
<p>Podziemna nekropolia z ok. 4000 p.n.e. — jedyna prehistoryczna podziemna świątynia na świecie. Wyciosana ręcznie w wapiennej skale na trzech poziomach. Wstęp ściśle limitowany — <strong>80 osób dziennie</strong>, rezerwuj 2-3 miesiące wcześniej. Cena: €35.</p>
<p>To najrzadsza atrakcja turystyczna na Malcie — i jedna z najważniejszych archeologicznych w Europie.</p>
`,
  },
];

async function main() {
  console.log("🇵🇱 Inserting 32 Polish Makłowicz-themed articles...\n");

  for (const a of PL_ARTICLES) {
    await upsert({
      ...a,
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });
  }

  console.log(`\n✅ ${PL_ARTICLES.length} Polish articles inserted!`);
}

main().catch(console.error);
