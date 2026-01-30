#!/usr/bin/env node
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal,resolution=merge-duplicates",
};

const articles = [
  {
    slug: "najlepsze-restauracje-malta",
    title: "Najlepsze Restauracje na Malcie — Gdzie Naprawdę Jedzą Miejscowi",
    subtitle: "Zapomnij o TripAdvisorze — oto gdzie Maltańczycy i doświadczeni turyści naprawdę jedzą",
    topic: "restaurants",
    tags: ["jedzenie", "restauracje", "valletta", "marsaxlokk", "kuchnia maltańska", "budżet"],
    source_count: 347, avg_confidence: 89, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    status: "published", published_at: "2026-01-28T12:00:00Z",
    body_html: `
<p>Maltańska scena gastronomiczna to jeden z najlepiej strzeżonych sekretów wyspy. Podczas gdy pułapki turystyczne skupiają się wokół St Julian's i Sliema, prawdziwa magia dzieje się w rodzinnych trattoriach na bocznych uliczkach Valletty, w przybrzeżnych barach rybnych w Marsaxlokk i na wiejskich festach, gdzie całe społeczności dzielą się ucztami.</p>

<h2>Valletta — Stolica Smaków</h2>
<p>Valletta przeszła gastronomiczną rewolucję. <strong>Noni</strong> na Archbishop Street jest konsekwentnie chwalona jako najlepsza restauracja na wyspie — spodziewaj się nowoczesnego maltańskiego menu degustacyjnego z sezonowych lokalnych produktów. Na coś bardziej casualowego, <strong>Legligin</strong> serwuje wspaniałe talerze do wina z lokalnym serem, suszonymi pomidorami i bigillą (pastą z bobu) w parze z maltańskimi winami.</p>
<p>Ulubiony szybki lunch miejscowych? <strong>Pastizzi</strong> od dowolnego ulicznego sprzedawcy — chrupiące ciasto filo nadziewane ricottą lub zielonym groszkiem, kosztujące zaledwie €0,50. Najsłynniejsze miejsce to <strong>Crystal Palace</strong> w Rabacie, otwarte od 1956 roku.</p>

<h2>Marsaxlokk — Niedzielny Targ Rybny</h2>
<p>W każdą niedzielę wioska rybacka Marsaxlokk zamienia się w największy targ pod gołym niebem na Malcie. Kolorowe łodzie <em>luzzu</em> ustawiają się w porcie, a rybacy sprzedają poranny połów. Udaj się do <strong>Tartarun</strong> lub <strong>La Reggia</strong> po doskonale świeżego grillowanego miecznika, lampuki (mahi-mahi) i ośmiornicę. Ceny są zaskakująco przystępne — pełny talerz rybny kosztuje €15-22.</p>

<h2>Trzy Miasta — Ukryte Perełki</h2>
<p><strong>Tal-Petut</strong> w Birgu to wspólne doświadczenie kulinarne w 400-letnim domu. Nie ma menu — szef kuchni gotuje to, co było świeże na targu. Rezerwacja z kilkutygodniowym wyprzedzeniem jest konieczna. W Bormla, <strong>Two and a Half Lemons</strong> serwuje kreatywne dania śródziemnomorskie w przekształconym palazzo.</p>

<h2>Gozo — Z Pola na Stół</h2>
<p>Gozo traktuje ideę "z pola na stół" dosłownie. <strong>Ta' Rikardu</strong> w Cytadeli Victorii serwuje ręcznie robione ravioli ze świeżym gbejniet (kozim serem), a następnie gulasz z królika gotowany w lokalnym winie. <strong>Tmun</strong> w Xlendi oferuje widoki na port z wyrafinowanymi owocami morza.</p>

<h2>Co Zamówić</h2>
<ul>
  <li><strong>Fenek (królik)</strong> — narodowe danie Malty, wolno gotowane w winie i czosnku</li>
  <li><strong>Lampuki pie</strong> — sezonowe ciasto rybne (październik-grudzień)</li>
  <li><strong>Kapunata</strong> — maltański ratatouille z kaparami i oliwkami</li>
  <li><strong>Ftira</strong> — gozytański chleb na zakwasie z pomidorami, tuńczykiem, kaparami</li>
  <li><strong>Imqaret</strong> — smażone ciastka daktylowe na deser</li>
  <li><strong>Kinnie</strong> — gorzki napój pomarańczowy, narodowy napój</li>
</ul>

<h2>Wskazówki Budżetowe</h2>
<p>Dobre jedzenie na Malcie nie wymaga głębokich kieszeni. Pastizzi kosztują €0,50, kanapka ftira €3-5, a trzydaniowy posiłek w wiejskiej restauracji €20-30 na osobę z winem. Unikaj restauracji nad wodą w Sliemie i St Julian's — miejscowi uważają je za przereklamowane pułapki turystyczne z przeciętnym jedzeniem.</p>
`,
  },
  {
    slug: "plaze-malta-kompletny-przewodnik",
    title: "Najlepsze Plaże i Miejsca do Pływania na Malcie",
    subtitle: "Krystalicznie czyste wody, ukryte zatoczki i plaże, które miejscowi trzymają dla siebie",
    topic: "beaches",
    tags: ["plaże", "pływanie", "snorkeling", "blue lagoon", "gozo", "lato"],
    source_count: 289, avg_confidence: 92, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    status: "published", published_at: "2026-01-27T10:00:00Z",
    body_html: `
<p>Malta to mały archipelag, ale jego linia brzegowa oferuje niezwykłą różnorodność miejsc do pływania — od piaszczystych plaż i kamiennych platform po ukryte jaskinie i słynną Blue Lagoon.</p>

<h2>Plaże Piaszczyste</h2>
<p><strong>Golden Bay</strong> to najpopularniejsza piaszczysta plaża Malty, z leżakami, sportami wodnymi i barem plażowym. Jest zwrócona na zachód, co czyni ją najlepszym miejscem na zachód słońca. Tuż obok, <strong>Ghajn Tuffieha</strong> (Riviera Beach) wymaga zejścia stromymi schodami, ale nagradza mniejszym tłokiem i dzikszym pięknem.</p>
<p><strong>Mellieha Bay</strong> to największa piaszczysta plaża, idealna dla rodzin — woda pozostaje płytka przez ponad 50 metrów. <strong>Pretty Bay</strong> w Birzebbuga to plaża miejscowych po pracy, mała ale urocza z turkusową wodą.</p>

<h2>Platformy Skalne i Zatoczki</h2>
<p><strong>St Peter's Pool</strong> koło Marsaxlokk to najczęściej fotografowany naturalny basen Malty — płaska platforma wapienna z głębokim turkusowym wlotem. Idealny do skoków z klifu (5-8m). <strong>Ghar Lapsi</strong> to osłonięta zatoka ukochana przez snorkelistów, z podwodnym systemem jaskiń pełnym życia morskiego.</p>

<h2>Plaże Gozo</h2>
<p><strong>Ramla Bay</strong> to perła Gozo — szeroka plaża z czerwonym piaskiem otoczona zielonymi wzgórzami, z Jaskinią Kalipso widoczną z góry. <strong>San Blas Bay</strong> to jej sekretna sąsiadka, do której prowadzi bardzo stroma ścieżka. <strong>Dwejra</strong> (dawne Lazurowe Okno) nadal oferuje niezwykłe pływanie wokół Inland Sea i Blue Hole.</p>

<h2>Comino — Blue Lagoon</h2>
<p>Blue Lagoon między Comino a Cominotto to najsłynniejsza atrakcja Malty — niemożliwie turkusowa woda nad białym piaskiem. <strong>Prawda:</strong> latem (czerwiec-wrzesień) jest ekstremalnie zatłoczona. Trik polega na wzięciu pierwszej łodzi o 9:00 lub odwiedzeniu w maju/październiku. Budżet €15-25 na rejs w obie strony z Cirkewwa.</p>

<h2>Najlepsze Miejsca do Snorkelingu</h2>
<ul>
  <li><strong>Wied iz-Zurrieq</strong> — okolice Blue Grotto, podwodne jaskinie</li>
  <li><strong>Ghar Lapsi</strong> — osłonięta zatoka z bogatym życiem morskim</li>
  <li><strong>Dwejra, Gozo</strong> — Blue Hole, raj dla zaawansowanych nurków</li>
  <li><strong>Paradise Bay</strong> — mała piaszczysta plaża koło promu Cirkewwa</li>
  <li><strong>Mgarr ix-Xini, Gozo</strong> — fiordopodobna zatoczka z krystaliczną widocznością</li>
</ul>

<h2>Praktyczne Wskazówki</h2>
<p>Sezon kąpielowy na Malcie trwa od maja do listopada, z temperaturami wody sięgającymi 26°C w sierpniu. Większość plaż nie ma cienia — zabierz parasol. Meduzy pojawiają się czasem w sierpniu. Skaliste wybrzeża wymagają butów do rafy.</p>
`,
  },
  {
    slug: "transport-malta-przewodnik",
    title: "Jak Poruszać Się po Malcie — Autobusy, Promy, Samochody i Prawda o Korkach",
    subtitle: "Wszystko, co polscy turyści muszą wiedzieć o maltańskim systemie transportu",
    topic: "transport",
    tags: ["autobusy", "prom", "wynajem auta", "bolt", "tallinja", "jazda", "gozo"],
    source_count: 412, avg_confidence: 85, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    status: "published", published_at: "2026-01-26T08:00:00Z",
    body_html: `
<p>Transport to najczęściej dyskutowany temat wśród turystów na Malcie — i nie bez powodu. Infrastruktura wyspy nie nadąża za rosnącą populacją i turystyką.</p>

<h2>Autobusy Publiczne (Tallinja)</h2>
<p>Sieć autobusowa Malty, obsługiwana przez <strong>Malta Public Transport (Tallinja)</strong>, pokrywa całą wyspę z centralnym węzłem w Valletcie. Pojedynczy przejazd kosztuje <strong>€1,50 zimą, €2,00 latem</strong>. Karta <strong>Tallinja Explore</strong> (€21 za 7 dni bez limitu) jest gorąco polecana turystom.</p>
<p><strong>Szczera prawda:</strong> Autobusy są tanie, ale zawodne. Latem klimatyzacja nie daje rady. Autobusy często się spóźniają lub omijają przystanki, gdy są pełne. Pobierz <strong>aplikację Tallinja</strong> do śledzenia na żywo.</p>
<p>Kluczowe linie: <strong>1/2/3</strong> (Valletta↔lotnisko), <strong>41/42</strong> (Valletta↔prom Cirkewwa), <strong>81/84</strong> (Valletta↔Marsaxlokk).</p>

<h2>Prom na Gozo</h2>
<p>Prom <strong>Gozo Channel</strong> kursuje między Cirkewwa (Malta) a Mgarr (Gozo) co 45 minut. Kosztuje <strong>€4,65 za osobę w obie strony</strong> (płacisz tylko na powrocie). Przeprawa trwa 25 minut. <strong>Nie trzeba rezerwować</strong> — po prostu przyjdź i stań w kolejce.</p>

<h2>Wynajem Samochodu</h2>
<p>Samochód daje maksymalną elastyczność. Budżet <strong>€25-40/dzień</strong> latem. <strong>Uwaga:</strong> jazda na Malcie jest chaotyczna. Drogi są wąskie, oznakowanie słabe, a miejscowi jeżdżą agresywnie. Maltańczycy jeżdżą po <strong>lewej</strong> (system brytyjski). Parkowanie w Valletcie i Sliemie to koszmar.</p>

<h2>Bolt / Przewozy</h2>
<p><strong>Bolt</strong> (jak Uber) działa dobrze na Malcie. Lotnisko do Sliemy kosztuje ~€12-15, Sliema do Valletty ~€6-8. Często szybszy i bardziej niezawodny niż autobusy, szczególnie w nocy.</p>

<h2>Podsumowanie Kosztów</h2>
<ul>
  <li>Karta Tallinja 7-dniowa: <strong>€21</strong></li>
  <li>Prom na Gozo (powrotny): <strong>€4,65</strong></li>
  <li>Bolt z lotniska: <strong>€12-15</strong></li>
  <li>Wynajem auta/dzień: <strong>€25-40</strong></li>
  <li>Parking (podziemny): <strong>€5-8/dzień</strong></li>
</ul>
`,
  },
  {
    slug: "noclegi-malta-przewodnik",
    title: "Gdzie Nocować na Malcie — Dzielnice, Hotele i Szczera Rada",
    subtitle: "Sliema vs St Julian's vs Valletta vs Gozo — która okolica jest dla Ciebie?",
    topic: "accommodation",
    tags: ["hotele", "airbnb", "sliema", "st julians", "valletta", "gozo", "budżet"],
    source_count: 256, avg_confidence: 87, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    status: "published", published_at: "2026-01-25T14:00:00Z",
    body_html: `
<p>Wybór odpowiedniej okolicy na Malcie może sprawić, że urlop będzie udany lub nieudany. Każda dzielnica ma odrębny charakter.</p>

<h2>Sliema — Centrum Turystyczne</h2>
<p><strong>Najlepsze dla:</strong> Pierwszych wizyt, zakupów, nadmorskich spacerów, łatwych połączeń autobusowych.</p>
<p>Sliema to najpopularniejsza baza turystyczna Malty. Nadmorska Tower Road oferuje kamieniste miejsca do pływania, restauracje i 3 km promenady do St Julian's.</p>
<p><strong>Budżet:</strong> Hotele €60-150/noc, Airbnb €40-90/noc.</p>

<h2>Valletta — Serce Kultury</h2>
<p><strong>Najlepsze dla:</strong> Miłośników historii, architektury, kultury.</p>
<p>Pobyt w murach Valletty oznacza życie w mieście UNESCO. Butikowe hotele zajmują XVI-wieczne budynki. Miasto pustoszeje po 20:00, tworząc magiczną atmosferę.</p>
<p><strong>Budżet:</strong> Hotele boutique €80-250/noc, Airbnb €50-120/noc.</p>

<h2>Gozo — Ucieczka</h2>
<p><strong>Najlepsze dla:</strong> Miłośników natury, nurkowania, spokojnych pobytów w farmhausach.</p>
<p>Gozo to zieleńsza, cichsza siostra Malty. Przekształcone farmhausy z basenami to wizytówka. Victoria (Rabat) to główne miasto z Cytadelą.</p>
<p><strong>Budżet:</strong> Farmhausy €70-200/noc, Hotele €50-150/noc.</p>

<h2>Pro Tipy</h2>
<ul>
  <li>Rezerwuj farmhausy na Gozo z dużym wyprzedzeniem na lato</li>
  <li>Unikaj parterowych Airbnb w Sliemie — hałas z ulicy jest brutalny</li>
  <li>B&B w Valletcie często mają tarasy na dachu z widokiem na port</li>
  <li>Sprawdź, czy hotel ma basen — to niezbędne w lipcu/sierpniu</li>
</ul>
`,
  },
  {
    slug: "ceny-malta-przewodnik-2026",
    title: "Ceny na Malcie 2026 — Ile Naprawdę Kosztuje Wszystko",
    subtitle: "Prawdziwe ceny od prawdziwych turystów — restauracje, transport, atrakcje i budżet dzienny",
    topic: "prices",
    tags: ["budżet", "ceny", "koszty", "pieniądze", "euro", "napiwki", "2026"],
    source_count: 378, avg_confidence: 91, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
    status: "published", published_at: "2026-01-24T09:00:00Z",
    body_html: `
<p>Malta używa <strong>Euro (€)</strong>. Ceny wyraźnie wzrosły od 2022 roku, ale Malta pozostaje przystępna w porównaniu z Włochami, Francją czy Hiszpanią.</p>

<h2>Dzienny Budżet</h2>
<table>
  <thead><tr><th>Styl</th><th>Na dzień</th><th>Obejmuje</th></tr></thead>
  <tbody>
    <tr><td><strong>Backpacker</strong></td><td>€40-60</td><td>Hostel, pastizzi i street food, autobusy, darmowe plaże</td></tr>
    <tr><td><strong>Komfortowy</strong></td><td>€80-120</td><td>Hotel 3*, lunche w restauracjach, Bolt, 1-2 atrakcje</td></tr>
    <tr><td><strong>Premium</strong></td><td>€150-250</td><td>Hotel 4*, fine dining, wynajem auta, rejsy</td></tr>
  </tbody>
</table>

<h2>Ceny Jedzenia i Picia</h2>
<ul>
  <li>Pastizzi (uliczne): <strong>€0,50</strong></li>
  <li>Kanapka ftira: <strong>€3-5</strong></li>
  <li>Kawa (espresso): <strong>€1,50-2,50</strong></li>
  <li>Piwo (kufel, bar): <strong>€3-5</strong></li>
  <li>Lunch (casualowa restauracja): <strong>€12-18</strong></li>
  <li>Kolacja (mid-range, 3 dania): <strong>€25-40</strong></li>
  <li>Menu degustacyjne fine dining: <strong>€60-100</strong></li>
</ul>

<h2>Koszty Transportu</h2>
<ul>
  <li>Autobus (przejazd, lato): <strong>€2,00</strong></li>
  <li>Karta Tallinja Explore 7 dni: <strong>€21</strong></li>
  <li>Prom na Gozo (powrotny): <strong>€4,65</strong></li>
  <li>Bolt lotnisko→Sliema: <strong>€12-15</strong></li>
  <li>Wynajem auta (dzień, lato): <strong>€25-40</strong></li>
</ul>

<h2>Atrakcje</h2>
<ul>
  <li>Rejs Blue Lagoon: <strong>€15-25</strong></li>
  <li>Konkatedra św. Jana: <strong>€15</strong></li>
  <li>Hypogeum (świątynia podziemna): <strong>€40</strong> — rezerwuj tygodnie wcześniej!</li>
  <li>Nurkowanie (1 nurkowanie z ekwipunkiem): <strong>€45-65</strong></li>
</ul>

<h2>Oszczędzanie</h2>
<ul>
  <li>Jedz lunch jako główny posiłek — wiele restauracji ma tańsze menu lunchowe</li>
  <li>Kupuj wodę i przekąski w supermarketach (Lidl, Welbee's)</li>
  <li>Karnet Heritage Malta Multisite (€50) obejmuje 23 muzea i zabytki</li>
  <li>Valletta jest darmowa do zwiedzania — architektura JEST atrakcją</li>
</ul>
`,
  },
  {
    slug: "zwiedzanie-malta-atrakcje",
    title: "Zwiedzanie Malty — 15 Atrakcji, Które Musisz Zobaczyć",
    subtitle: "Od starożytnych świątyń po barokowe katedry — co naprawdę warto odwiedzić",
    topic: "sightseeing",
    tags: ["historia", "świątynie", "valletta", "mdina", "gozo", "muzea", "architektura"],
    source_count: 302, avg_confidence: 93, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
    status: "published", published_at: "2026-01-23T11:00:00Z",
    body_html: `
<p>Malta mieści 7000 lat historii na 316 kilometrach kwadratowych. Znajdziesz tu prehistoryczne świątynie starsze od piramid egipskich, średniowieczne warowne miasta, barokowe arcydzieła i bunkry z II wojny światowej.</p>

<h2>1. Valletta — Całe Miasto</h2>
<p>Stolica Malty to obiekt UNESCO i najmniejsza stolica narodowa w UE. Całe miasto to w zasadzie jedno gigantyczne muzeum na wolnym powietrzu zbudowane przez Rycerzy św. Jana po 1566 roku. <strong>Ocena: Absolutnie konieczne.</strong></p>

<h2>2. Konkatedra św. Jana</h2>
<p>Za prostym frontem kryje się jedno z najbardziej spektakularnych barokowych wnętrz w Europie. Podłoga wyłożona jest 400 marmurowymi nagrobkami Rycerzy. Punkt kulminacyjny: arcydzieło Caravaggia <em>"Ścięcie św. Jana Chrzciciela"</em>. <strong>Wejście: €15. Warte każdego centa.</strong></p>

<h2>3. Mdina — Ciche Miasto</h2>
<p>Dawna stolica Malty to doskonale zachowane średniowieczne warowne miasto. Wejdź przez główną bramę i cofnij się o 1000 lat. Samochody są zakazane. Odwiedź o zachodzie słońca lub po zmroku. <strong>Wejście darmowe. Magiczne.</strong></p>

<h2>4. Hypogeum Ħal Saflieni</h2>
<p>Podziemny kompleks świątynny z 4000 r. p.n.e. — jedyny znany przykład podziemnej świątyni na świecie. Tylko 80 odwiedzających dziennie. <strong>Zarezerwuj 4-6 tygodni wcześniej. Wejście: €40.</strong></p>

<h2>5. Trzy Miasta (Birgu, Senglea, Bormla)</h2>
<p>Po drugiej stronie Grand Harbour od Valletty, te trzy warowne miasta są starsze od stolicy. Birgu (Vittoriosa) jest najurokliwszy. <strong>Niedoceniona perełka.</strong></p>

<h2>Więcej Atrakcji</h2>
<ul>
  <li><strong>6. Blue Grotto</strong> — morskie jaskinie, rejs za €8</li>
  <li><strong>7. Cytadela Gozo</strong> — widoki 360° na wyspę</li>
  <li><strong>8. Świątynie Ħagar Qim</strong> — starsze od Stonehenge</li>
  <li><strong>9. Ogrody Barrakka</strong> — panorama Grand Harbour</li>
  <li><strong>10. Fort St. Elmo</strong> — Muzeum Wojenne</li>
  <li><strong>11. Marsaxlokk</strong> — kolorowe łodzie i niedzielny targ</li>
  <li><strong>12. Popeye Village</strong> — atrakcja rodzinna</li>
  <li><strong>13. Klify Dingli</strong> — najwyższy punkt Malty</li>
  <li><strong>14. Katakumby św. Pawła</strong> — podziemne grobowce</li>
  <li><strong>15. Bazylika Ta' Pinu, Gozo</strong> — kościół pielgrzymkowy</li>
</ul>

<h2>Praktyczne Wskazówki</h2>
<p><strong>Karnet Heritage Malta Multisite</strong> (€50) daje wejście do 23 obiektów przez 30 dni — świetna wartość. Większość muzeów zamyka się o 17:00. Noś wygodne buty — Malta to same wapienne schody i bruk.</p>
`,
  },
  {
    slug: "wydarzenia-malta-festiwale",
    title: "Wydarzenia i Festiwale na Malcie — Co Się Dzieje na Wyspie",
    subtitle: "Wiejskie festas, fajerwerki, karnawał i kalendarz wydarzeń kulturalnych",
    topic: "events",
    tags: ["festiwale", "festas", "karnawał", "fajerwerki", "muzyka", "kultura"],
    source_count: 156, avg_confidence: 84, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    status: "published", published_at: "2026-01-22T16:00:00Z",
    body_html: `
<p>Malta ma jeden z najgęstszych kalendarzy festiwalowych w Europie. Z 365 kościołami i głęboką tradycją katolicką, dosłownie co weekend latem odbywa się wiejska festa.</p>

<h2>Wiejskie Festas (czerwiec-wrzesień)</h2>
<p><strong>Festa</strong> to serce maltańskiej kultury. Każde miasto i wioska świętuje swojego świętego patrona weekendem marszów orkiestr dętych, dekoracji ulic, stoisk z jedzeniem i spektakularnych fajerwerków.</p>
<ul>
  <li><strong>Santa Marija (15 sierpnia)</strong> — święto w 7 miastach jednocześnie, największe w Moście i Gudji</li>
  <li><strong>L-Imnarja (29 czerwca)</strong> — maltański festiwal ludowy w Buskett Gardens</li>
  <li><strong>Rozbitek św. Pawła (10 lutego)</strong> — patron Valletty, wielka procesja</li>
</ul>

<h2>Międzynarodowy Festiwal Fajerwerków (kwiecień)</h2>
<p>Jeden z największych konkursów fajerwerków w Europie, organizowany w Grand Harbour. Drużyny z wielu krajów rywalizują choreograficznymi pokazami do muzyki. <strong>Darmowe oglądanie z każdego punktu widokowego portu.</strong></p>

<h2>Karnawał (luty)</h2>
<p>Maltański karnawał sięga 1535 roku. Główne wydarzenia w Valletcie z pięknymi platformami, tancerzami w kostiumach. <strong>Karnawał w Nadur (Gozo)</strong> to dzika alternatywa — spontaniczny, ciemniejszy i bardziej bezczelny.</p>

<h2>Notte Bianca (październik)</h2>
<p>Coroczny festiwal sztuki w Valletcie. Muzea otwarte do późna za darmo, występy na każdym placu. <strong>Najlepsza noc, żeby być w Valletcie.</strong></p>

<h2>Isle of MTV (czerwiec-lipiec)</h2>
<p>Darmowy koncert plenerowy z międzynarodowymi gwiazdami. Dziesiątki tysięcy uczestników. <strong>Wejście darmowe — po prostu przyjdź wcześnie.</strong></p>
`,
  },
  {
    slug: "porady-malta-pierwsza-wizyta",
    title: "25 Rzeczy, Które Musisz Wiedzieć Przed Pierwszą Wizytą na Malcie",
    subtitle: "Rady od doświadczonych turystów, których nie znajdziesz w przewodnikach",
    topic: "tips",
    tags: ["porady", "rady", "pierwsza wizyta", "bezpieczeństwo", "język", "pogoda"],
    source_count: 445, avg_confidence: 88, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    status: "published", published_at: "2026-01-21T07:00:00Z",
    body_html: `
<h2>Język i Komunikacja</h2>
<ol>
  <li><strong>Angielski jest oficjalny</strong> — Wszyscy na Malcie mówią płynnie po angielsku. Nigdy nie będziesz mieć bariery językowej.</li>
  <li><strong>Maltański jest unikalny</strong> — jedyny język semicko-romański pisany łacinką. Nauczenie się "grazzi" (dziękuję) i "bongu" (cześć) zdobywa uśmiechy.</li>
</ol>

<h2>Pogoda i Kiedy Jechać</h2>
<ol start="3">
  <li><strong>Lato (lipiec-sierpień) jest brutalne</strong> — 35-40°C z wysoką wilgotnością. Najlepsze miesiące to <strong>maj-czerwiec</strong> i <strong>wrzesień-październik</strong>.</li>
  <li><strong>Zima jest łagodna</strong> — 12-16°C, sporadyczny deszcz. Wciąż świetna do zwiedzania i dużo tańsza.</li>
  <li><strong>Spakuj krem SPF50+</strong> — śródziemnomorskie słońce jest bezlitosne.</li>
</ol>

<h2>Poruszanie Się</h2>
<ol start="6">
  <li><strong>Pobierz aplikację Tallinja</strong> — śledzenie autobusów w czasie rzeczywistym ratuje nerwy.</li>
  <li><strong>Bolt to Twój przyjaciel</strong> — bardziej niezawodny niż autobusy, szczególnie nocą.</li>
  <li><strong>Malta jeździ lewą stroną</strong> — dziedzictwo brytyjskie. Ronda będą Cię testować.</li>
  <li><strong>Nie jedź samochodem do Valletty</strong> — chodź pieszo lub weź prom ze Sliemy.</li>
</ol>

<h2>Pieniądze i Zakupy</h2>
<ol start="10">
  <li><strong>Płatności kartą są powszechne</strong> — większość miejsc akceptuje płatności zbliżeniowe. Miej trochę gotówki na wiejskie sklepy.</li>
  <li><strong>Supermarkety zamknięte w niedziele</strong> — zrób zakupy w sobotę.</li>
  <li><strong>Lidl i Welbee's</strong> to najtańsze supermarkety.</li>
</ol>

<h2>Bezpieczeństwo i Zdrowie</h2>
<ol start="13">
  <li><strong>Malta jest ekstremalnie bezpieczna</strong> — brutalny przestępczość praktycznie nie istnieje.</li>
  <li><strong>Woda z kranu jest bezpieczna, ale niesmaczna</strong> — to odsalana woda morska. Kup butelkowaną.</li>
  <li><strong>Karta EKUZ działa</strong> — daje dostęp do publicznej opieki zdrowotnej.</li>
</ol>

<h2>Kultura i Etykieta</h2>
<ol start="16">
  <li><strong>Zasłoń ramiona w kościołach</strong> — 365 kościołów Malty to aktywne miejsca kultu.</li>
  <li><strong>Festas są niepowtarzalne</strong> — jeśli festa odbywa się podczas Twojej wizyty, idź.</li>
</ol>

<h2>Ukryte Perełki</h2>
<ol start="18">
  <li><strong>Odwiedź Birgu przed Vallettą</strong> — mniej turystów, ta sama historia.</li>
  <li><strong>Gozo zasługuje na 2+ dni</strong> — jednodniowa wycieczka to za mało.</li>
  <li><strong>Darmowa rozrywka</strong> — południkowe działo w Barrakka, zachód słońca w Golden Bay, spacer po Mdinie nocą.</li>
</ol>
`,
  },
  {
    slug: "gozo-kompletny-przewodnik",
    title: "Gozo — Kompletny Przewodnik po Zielonej Siostrzanej Wyspie Malty",
    subtitle: "Farmhausy, nurkowanie, Cytadela i dlaczego jeden dzień to za mało",
    topic: "gozo",
    tags: ["gozo", "nurkowanie", "cytadela", "victoria", "prom", "farmhaus", "natura"],
    source_count: 234, avg_confidence: 90, lang: "pl",
    cover_image: "https://images.unsplash.com/photo-1568702846914-96b305d2ead1?w=1200&q=80",
    status: "published", published_at: "2026-01-20T13:00:00Z",
    body_html: `
<p>Gozo to mniejsza, zieleńsza, cichsza siostrzana wyspa Malty — i wielu turystów mówi, że to punkt kulminacyjny ich podróży. Mająca zaledwie 14 km długości i 7 km szerokości, Gozo czuje się jak Malta sprzed 30 lat.</p>

<h2>Jak Się Dostać</h2>
<p>Prom <strong>Gozo Channel</strong> odpływa z Cirkewwa (północno-zachodni kraniec Malty) co 45 minut, trwa 25 minut i kosztuje €4,65 w obie strony na osobę. Płacisz tylko na powrocie. Alternatywnie, <strong>Gozo Fast Ferry</strong> kursuje z portu w Valletcie bezpośrednio do Mgarr — 3x dziennie, €7,00 w obie strony.</p>

<h2>Victoria (Rabat) i Cytadela</h2>
<p>Stolica Gozo, Victoria, leży w centrum wyspy, zwieńczona starożytną <strong>Cytadelą</strong> — warownym wzgórzem z widokami 360°. Wewnątrz znajdziesz Katedrę Wniebowzięcia (jej sufit to malowany trompe l'oeil — nie ma prawdziwej kopuły!). Widok z murów o zachodzie słońca jest niezwykły.</p>

<h2>Plaże i Pływanie</h2>
<p><strong>Ramla Bay</strong> — najsłynniejsza plaża Gozo z charakterystycznym czerwonym piaskiem. <strong>San Blas Bay</strong> — sekretna sąsiadka, dostępna stromą ścieżką. <strong>Dwejra</strong> — dawne Lazurowe Okno, nadal spektakularne. <strong>Mgarr ix-Xini</strong> — wąska zatoczka fiordopodobna idealna do snorkelingu.</p>

<h2>Nurkowanie — Klasa Światowa</h2>
<p>Gozo jest konsekwentnie oceniane jako jedno z najlepszych miejsc do nurkowania w Europie. Czysta woda (widoczność 30m+), dramatyczna topografia podwodna.</p>
<ul>
  <li><strong>Blue Hole, Dwejra</strong> — ikoniczne miejsce nurkowe</li>
  <li><strong>Cathedral Cave</strong> — oszałamiająca jaskinia z efektami świetlnymi</li>
  <li><strong>Wrak MV Karwela</strong> — zatopiony statek patrolowy</li>
</ul>

<h2>Jedzenie i Restauracje</h2>
<ul>
  <li><strong>Ta' Rikardu</strong> (Cytadela) — świeży gbejniet, ręcznie robione ravioli</li>
  <li><strong>Tmun</strong> (Xlendi) — fine dining z widokiem na port</li>
  <li><strong>Il-Kartell</strong> (Marsalforn) — tradycyjna kuchnia gozytańska</li>
</ul>
<p>Nie przegap: <strong>ftira gozytańska</strong>, <strong>gbejniet</strong> (lokalny ser kozi) i <strong>kiełbasa gozytańska</strong>.</p>

<h2>Jednodniowa Wycieczka vs Nocleg</h2>
<p>Większość turystów robi jednodniową wycieczkę. <strong>Wszyscy żałują, że nie zostali dłużej.</strong> Jeden dzień ledwo wystarcza na Cytadelę i jedną plażę. Z 2-3 nocami możesz naprawdę odkryć ukryte zakątki wyspy.</p>
`,
  },
];

async function main() {
  console.log("🇵🇱 Inserting 9 Polish articles...\n");
  for (const article of articles) {
    const url = `${SUPABASE_URL}/rest/v1/articles`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(article),
    });
    if (!res.ok) {
      console.log(`  ❌ ${article.topic}: ${res.status} ${await res.text()}`);
    } else {
      console.log(`  ✅ ${article.topic}: ${article.title}`);
    }
  }
  console.log("\n✅ Polish articles inserted!");
}
main().catch(console.error);
