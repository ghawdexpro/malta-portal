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
        slug: 'pl-7000-lat-historii-malty',
        title: '7000 Lat Historii w 5 Minut (Bez Nudzenia)',
        subtitle: 'Od świątyń starszych niż piramidy po Grę o Tron. Jak ta mała wyspa przetrwała wszystko?',
        body_html: `
<p>Malta to taki historyczny Forrest Gump. Była wszędzie i widziała wszystko. Fenicjanie, Rzymianie, Arabowie, Rycerze, Napoleon, Brytyjczycy... Wszyscy tu byli, wszyscy coś zostawili (głównie jedzenie i mury), a potem sobie poszli. A Maltańczycy? Stoją i patrzą.</p>

<h2>Epoka Kamienia: Giganci na Wyspie?</h2>
<p>Zacznijmy od "Grubego Kalibru". Świątynie Ggantija na Gozo są <strong>starsze niż Piramidy w Egipcie</strong>. Serio. O 1000 lat. Zbudowano je z kamieni ważących 50 ton, kiedy ludzie nie znali koła. Legenda mówi, że zbudowała je gigantka Sansuna (nosząc kamienie na głowie, jedząc bób i karmiąc dziecko... szacunek dla pracujących matek).</p>

<h2>Rycerze: Złoty Wiek</h2>
<p>W 1530 roku przybyli Rycerze Szpitalnicy (wywaleni z Rodos). Dostali Maltę za darmo (plus jednego sokoła rocznie dla Cesarza). Przekształcili jałową skałę w najpotężniejszą twierdzę Morza Śródziemnego. Zbudowali Vallettę, szpitale i system obronny, który zatrzymał Turków. To im zawdzięczamy ten cały barokowy przepych.</p>

<h2>II Wojna Światowa: Niezatapialny Lotniskowiec</h2>
<p>Malta była najbardziej bombardowanym miejscem na Ziemi. W 1942 roku spadało tu więcej bomb niż na Londyn w czasie Blitzu. Ludzie żyli w tunelach wykutych w skale. Za odwagę Król Jerzy VI odznaczył <strong>całą wyspę</strong> Krzyżem Jerzego (masz go na fladze Malty, w lewym górnym rogu).</p>

<div class="monika-tip">
<strong>💡 MONIKA TŁUMACZY:</strong>
Dlaczego Maltańczycy mówią po angielsku? Bo byli brytyjską kolonią do 1964 roku. Mamy tu ruch lewostronny, gniazdka z trzema bolcami i czerwoną budkę telefoniczną w Valletcie. Ale temperament mamy zdecydowanie śródziemnomorski.
</div>
`
    },
    {
        slug: 'pl-cytadela-gozo-twierdza',
        title: 'Cytadela na Gozo: Twierdza, Która Pamięta Piratów',
        subtitle: 'Widok 360 stopni na całą wyspę i mury, które widziały największą tragedię w historii Gozo.',
        body_html: `
<p>Wchodzisz do Victorii, patrzysz w górę i widzisz JĄ. Cytadela. Wygląda jak korona na głowie miasta. Ale ta korona ma krwawą historię.</p>

<h2>Dzień, w Którym Gozo Zniknęło</h2>
<p>Jest rok 1551. Piraci (pod wodzą Draguta) atakują Gozo. Mieszkańcy chowają się w Cytadeli. Mury nie wytrzymują. Piraci biorą w niewolę <strong>całą populację wyspy</strong> (5000 osób). Wywożą ich na targi niewolników w Afryce. Na Gozo zostaje tylko garstka starców, których piraci nie chcieli.</p>

<p>To trauma, która tkwi w DNA tej wyspy. Dlatego Cytadelę odbudowano tak, żeby była nie do zdobycia. Do XIX wieku każdy mieszkaniec Gozo miał obowiązek spędzać noc wewnątrz jej murów.</p>

<h2>Co Zobaczyć Dziś?</h2>
<ul>
<li><strong>Katedra Wniebowzięcia NMP:</strong> Ma oszukaną kopułę! Wejdź do środka i spójrz w sufit. Wygląda jak kopuła, ale to płaski malunek (trompe l'oeil). Brakło pieniędzy na prawdziwą.</li>
<li><strong>Muzeum Katedralne:</strong> Skarbiec pełen srebra i szat liturgicznych.</li>
<li><strong>Silosy na Zboże:</strong> Wykute w skale dziury, w których trzymano zapasy na wypadek oblężenia.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Wejdź na mury obronne (wstęp darmowy). Z każdego rogu widać inny kawałek wyspy - morze, wzgórza, kopułę w Xewkija. Najlepsze miejsce na selfie na Gozo (tylko uważaj na wiatr, potrafi urwać głowę).
</div>
`
    },
    {
        slug: 'pl-rabat-ciche-miasteczko',
        title: 'Rabat: Tam Gdzie Mdina Chodzi na Kawę',
        subtitle: 'W cieniu "Cichego Miasta" tętni prawdziwe życie. Katakumby, pastizzi i klimatyczne zaułki.',
        body_html: `
<p>Mdina to muzeum. Rabat to dom. Te dwa miasta stykają się ze sobą (dzieli je tylko fosa i park), ale są zupełnie inne. Mdina jest arystokratyczna i cicha. Rabat jest swojski, głośny i pachnie jedzeniem.</p>

<h2>Katakumby: Podziemne Miasto</h2>
<p>Rabat stoi na dziurawym serze. Pod miastem ciągną się kilometry tuneli – to grobowce z czasów rzymskich (Katakumby św. Pawła i św. Agaty). Ludzie chowali tu zmarłych, ukrywali się w czasie wojen, a nawet... mieszkali.</p>

<blockquote class="monika-quote">
Wstęp do Katakumb św. Pawła: €6. Warto? Tak. To labirynt. Jest ciemno, wilgotno i fascynująco.
</blockquote>

<h2>Co Robić w Rabacie?</h2>
<ol>
<li><strong>Zjedz Pastizzi w Crystal Palace:</strong> Pisałam o tym sto razy, ale napiszę sto pierwszy. To kultowe miejsce naprzeciwko rzymskiej willi. Bierz z ricottą (ser) i z groszkiem (piżelli).</li>
<li><strong>Domus Romana:</strong> Ruiny rzymskiej willi z pięknymi mozaikami (jeśli lubisz te klimaty).</li>
<li><strong>Wignacourt Museum:</strong> Podziemia, schron z II wojny światowej i grota, w której rzekomo mieszkał św. Paweł.</li>
</ol>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
W niedzielę rano w Rabacie jest targ. Można kupić wszystko: od świerzych warzyw po ubrania. Potem idź na kawę do "Chalk Cafe" albo na ciasto do "Parruccan". Tak robią lokalsi.
</div>
`
    },
    {
        slug: 'pl-victoria-stolica-gozo',
        title: 'Victoria (Rabat): Serce Gozo, Które Bije Wolniej',
        subtitle: 'Stolica, która jest wielkości polskiej wsi, ale ma dumę metropolii.',
        body_html: `
<p>Victoria to geograficzny i duchowy środek Gozo. Wszystkie drogi prowadzą tutaj (dosłownie, autobusy też). Miejscowi nazywają ją <strong>Rabat</strong> (stara nazwa), a nazwę Victoria nadali jej Brytyjczycy w 1887 roku na cześć królowej (wiadomo, podlizywanie się władzy).</p>

<h2>It-Tokk: Rynek Główny</h2>
<p>Plac Niepodległości (Independence Square) to salon miasta. Rano jest tu targowisko (sprzedają wszystko, od obrusów po pamiątki wątpliwej urody). Wieczorem stoliki kawiarni zajmują każdy centymetr. Siadasz, zamawiasz Cisk (piwo) i obserwujesz życie.</p>

<h2>St. George's Square</h2>
<p>Idź labiryntem wąskich uliczek za rynkiem, a trafisz na placyk z Bazyliką św. Jerzego. To jest teatr! Kościół jest cały ze złota i marmuru (nazywają go "Złotą Bazyliką"). Wokół są knajpki, w których kelnerzy znają wszystkich po imieniu.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Zgub się. Serio. Uliczki starej Victorii (za kościołem św. Jerzego) są niesamowite. Są tak wąskie, że sąsiedzi mogą podać sobie rękę przez okno. Nie ma tu mapy, po prostu idź przed siebie.
</div>

<blockquote class="monika-quote">
Jeśli chcesz kupić pamiątki, szukaj sklepików z koronkami (bizzilla). To specjalność Gozo. Starsze panie robią je, siedząc w progu domu. Kupujesz u źródła.
</blockquote>
`
    },
    {
        slug: 'pl-pastizzi-street-food-malty',
        title: 'Pastizzi: Twoja Nowa Kaloryczna Miłość',
        subtitle: 'Kosztują 50 centów, tuczą od samego patrzenia i są absolutnie wspaniałe.',
        body_html: `
<p>Jeśli wyjedziesz z Malty bez zjedzenia pastizzi, to tak, jakbyś była w Paryżu i nie zobaczyła Wieży Eiffla. Tylko że Wieża Eiffla nie smakuje jak niebo.</p>

<h2>Co To Jest?</h2>
<p>Pastizz (l.mn. pastizzi) to ciastko z ciasta francuskiego (filo), wypełnione gorącym nadzieniem. Oryginalnie ma kształt diamentu (ricotta) lub muszli (groszek).</p>

<h3>Dwa Klasyczne Smaki:</h3>
<ul>
<li><strong>Pastizzi tal-irkotta:</strong> Z serem ricotta. Delikatne, kremowe, lekko słone.</li>
<li><strong>Pastizzi tal-piżelli:</strong> Z groszkiem (curry peas). Lekko pikantne, sycące.</li>
</ul>

<p>Są też wersje nowoczesne (z kurczakiem, z Nutellą), ale to dla turystów. Prawdziwy Maltańczyk wybiera klasykę.</p>

<h2>Wskaźnik Pastizzi</h2>
<p>Pastizzi to najtańsze jedzenie na wyspie. Cena wzrosła ostatnio z 30 centów na 50-60 centów i wywołało to niemal rewolucję narodową. To nie jest przekąska - to podstawa piramidy żywieniowej studentów i robotników.</p>

<div class="monika-tip">
<strong>💡 JAK JEŚĆ?</strong>
Uwaga: SĄ GORĄCE. Nadzienie ma temperaturę lawy. Nadgryź róg, poczekaj, dmuchaj. I przygotuj się na to, że okruchy ciasta będziesz miała wszędzie. To część doświadczenia. Popijaj herbatą z mlekiem w szklance (brzmi dziwnie, smakuje dobrze).
</div>
`
    },
    {
        slug: 'pl-unesco-malta-co-zobaczyc',
        title: 'UNESCO na Malcie: 3 Miejsca, Które Musisz Zobaczyć',
        subtitle: 'Lista Światowego Dziedzictwa na Malcie jest krótka, ale treściwa. Oto Twoja ściąga.',
        body_html: `
<p>Malta jest mała (mieści się w połowie Warszawy), ale ma aż 3 wpisy na liście UNESCO. I to nie są jakieś tam "stare kamienie". To waga ciężka historii.</p>

<h2>1. Miasto Valletta</h2>
<p>Całe miasto jest wpisane na listę. Jest to "jedno z najbardziej zagęszczonych obszarów zabytkowych na świecie". 320 zabytków na powierzchni 55 hektarów. Spacerując po Valletcie, chodzisz po muzeum.</p>

<h2>2. Świątynie Megalityczne</h2>
<p>Siedem świątyń na wyspach Malta i Gozo. <strong>Ggantija, Hagar Qim, Mnajdra, Tarxien...</strong> Powstały między 3600 a 2500 p.n.e. Są starsze niż Stonehenge. Starsze niż piramidy. Ciągle nie wiemy na 100%, jak je zbudowano bez maszyn.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Jedź do <strong>Mnajdra i Hagar Qim</strong> (są obok siebie). Stoją na klifie, z widokiem na morze i wysepkę Filfla. O zachodzie słońca to miejsce ma taką energię, że ciarki przechodzą.
</div>

<h2>3. Hypogeum Ħal-Saflieni</h2>
<p>To jest prawdziwy hit. Podziemna świątynia/nekropolia wykuta w skale na trzech poziomach w dół. Odkryta przypadkiem, kiedy robotnik wpadł do dziury w podłodze.</p>

<blockquote class="monika-quote">
<strong>WAŻNE:</strong> Do Hypogeum wpuszczają tylko 80 osób dziennie (żeby wilgoć z oddechu nie zniszczyła malowideł). Bilety trzeba rezerwować z 2-3 miesięcznym wyprzedzeniem! Kosztują €35, ale to jedyne takie miejsce na świecie. Jeśli nie masz biletu, idź na film VR w centrum turystycznym - też fajne.
</blockquote>
`
    },
    {
        slug: 'pl-fort-sw-aniola-birgu',
        title: 'Fort St. Angelo: Strażnik Portu',
        subtitle: 'Najpotężniejszy fort na Malcie. Więził Caravaggia, odparł Turków i wygląda jak okręt wojenny.',
        body_html: `
<p>Stojąc na Upper Barrakka w Valletcie, widzisz go naprzeciwko. Wielki, kamienny kolos na cyplu Birgu. To <strong>Fort St. Angelo</strong>. Jeśli Valletta jest tarczą Malty, to ten fort jest jej mieczem.</p>

<h2>Historia w Pigułce (Bez Nudzenia)</h2>
<ul>
<li><strong>Średniowiecze:</strong> Był tu zamek (Castrum Maris), zanim ktokolwiek słyszał o Rycerzach.</li>
<li><strong>1530:</strong> Przypływają Rycerze i robią tu swoją siedzibę. Wielki Mistrz mieszka w forcie.</li>
<li><strong>1565 (Wielkie Oblężenie):</strong> Fort jest centrum dowodzenia. To stąd Jean de Valette kierował obroną.</li>
<li><strong>II Wojna Światowa:</strong> Oberwał 69 bezpośrednimi trafieniami bomb. I stoi dalej.</li>
<li><strong>Royal Navy:</strong> Przez lata był bazą brytyjską, nazywaną "HMS St Angelo" (traktowali fort jak statek na lądzie).</li>
</ul>

<h2>Co Tam Zobaczyć?</h2>
<p>Fort jest ogromny. Możesz wejść na górne bastiony (fantastyczny widok), zobaczyć kaplicę św. Anny (z grobowcami rycerzy) i... więzienie.</p>

<h3>Cela Caravaggia (Guva)</h3>
<p>W skale wykuta jest dziura w kształcie butelki (wąska u góry, szeroka na dole). Wrzucali tam więźniów i zapominali o nich. Caravaggio tam trafił. I uciekł. Jak? To jedna z największych zagadek. Prawdopodobnie ktoś mu podał linę. Kto? Może sam Wielki Mistrz, który chciał się go pozbyć po cichu.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
W forcie jest świetna kawiarnia z tarasem. Widok na Vallettę z perspektywy wody - bezcenny. Kawa smakuje tu lepiej, bo pijesz ją w miejscu, gdzie decydowały się losy Europy.
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
