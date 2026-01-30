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
        slug: 'pl-prom-na-gozo',
        title: 'Prom na Gozo: Instrukcja Obsługi Raju',
        subtitle: 'Jak dostać się na siostrzaną wyspę Malty i nie zwariować w kolejce. Poradnik dla niecierpliwych.',
        body_html: `
<p>Rejs na Gozo trwa 25 minut. Tylko tyle dzieli Cię od miejsca, gdzie czas płynie wolniej, a pomidory smakują lepiej. Ale żeby tam dotrzeć, musisz pokonać "Final Boss'a" maltańskiej turystyki: <strong>Terminal Promowy w Cirkewwa</strong>.</p>

<h2>Dwie Opcje, Jeden Cel</h2>
<h3>1. Gozo Channel (Prom Samochodowy)</h3>
<p>To klasyk. Wielki, biały statek. Zabiera samochody i pieszych. Pływa 24/7 (nawet w nocy, co 45 minut).</p>
<ul>
<li><strong>Gdzie:</strong> Cirkewwa (północny koniec Malty).</li>
<li><strong>Cena:</strong> €4.65 (pieszy) / 15.70 (samochód + kierowca).</li>
<li><strong>Trik:</strong> <strong>Płacisz dopiero WRACAJĄC z Gozo!</strong> Wjaz na Gozo jest za darmo. Serio. Bramki są tylko w drodze powrotnej.</li>
</ul>

<h3>2. Gozo Fast Ferry (Szybki Prom)</h3>
<p>Dla tych bez auta. Pływa z <strong>Valletty</strong> prosto na Gozo. Trwa 45 minut.</p>
<ul>
<li><strong>Gdzie:</strong> Lascaris Wharf w Valletcie (zjedź windą Barrakka na dół).</li>
<li><strong>Zaleta:</strong> Omijasz korki i autobusy. Płyniesz 35 węzłów (szybko!).</li>
<li><strong>Wada:</strong> Jak wieje, to buja. Bardzo buja. Jeśli masz chorobę morską – weź tabletkę albo klasyczny prom.</li>
</ul>

<h2>Co Robić na Promie?</h2>
<p>Nie siedź w środku w kafeterii (śmierdzi starym olejem i nuda). Idź na górny pokład. Po drodze miniesz <strong>Comino</strong> i słynną (niegdyś) Blue Lagoon. To najlepszy darmowy rejs wycieczkowy, jaki będziesz miała.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Wracasz z Gozo w niedzielę wieczorem? Błąd. Cała Malta wraca wtedy z weekendu. Kolejka do promu samochodowego potrafi ciągnąć się kilometrami. Wracaj w poniedziałek rano albo w niedzielę przed południem.
</div>
`
    },
    {
        slug: 'pl-konkatedra-sw-jana',
        title: 'Konkatedra św. Jana: Złota Pułapka',
        subtitle: 'Z zewnątrz wygląda jak bunkier. W środku oślepia złotem. Najważniejszy kościół na Malcie.',
        body_html: `
<p>Kiedy stoisz przed Konkatedrą w Valletcie, myślisz: "Okej, nuda. Kamienna ściana". To celowy zabieg. Rycerze wyznawali zasadę: skromność na zewnątrz, przepych w środku. I wzięli to sobie bardzo do serca.</p>

<p>Wchodzisz i BAM. Złoto. Wszędzie złoto. Na ścianach, na suficie, na ołtarzu. To nie jest kościół, to jest szkatułka z biżuterią wielkości hangaru.</p>

<h2>Dlaczego "Kon-katedra"?</h2>
<p>Bo Malta miała już katedrę w Mdinie. Ale Rycerze (którzy mieszkali w Valletcie) chcieli mieć swoją, lepszą. Biskup się nie zgadzał, żeby przenieść stolicę biskupią, więc poszli na kompromis: "Konkatedra" (współ-katedra). Taki kościelny "związek partnerski".</p>

<h2>Co Musisz Zobaczyć (Żeby Nie Wyjść na Ignoranta)</h2>
<ul>
<li><strong>Podłoga:</strong> To nie są zwykłe płytki. To 400 nagrobków Rycerzy wykonanych z kolorowego marmuru. Są na nich czaszki, szkielety i aniołki. Chodzisz po grobach arystokracji Europy.</li>
<li><strong>Caravaggio:</strong> W Oratorium wisi "Ścięcie św. Jana". Jedyny podpisany obraz mistrza. Jest mroczny, krwawy i genialny.</li>
<li><strong>Sufit:</strong> Malowany przez Mattia Preti. Przedstawia życie św. Jana. Malował go przez 6 lat (leżąc na plecach, jak Michał Anioł, tylko w lepszych warunkach).</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Bilet kosztuje €15. Nie szkoda kasy. Przyjdź tuż po otwarciu (9:30) albo godzinę przed zamknięciem (15:30). W środku dnia są tłumy z wycieczkowców, które zasłaniają wszystko selfie-stickami. Pamiętaj: ramiona i kolana muszą być zakryte (dają chusty przy wejściu, ale lepiej ubrać się godnie).
</div>
`
    },
    {
        slug: 'pl-fortyfikacje-malty',
        title: 'Mury, Które Widziały Wszystko',
        subtitle: 'Malta to jedna wielka twierdza. Gdzie wejść, żeby poczuć się jak Rycerz (i zrobić najlepsze zdjęcia).',
        body_html: `
<p>Malta była najbardziej ufortyfikowanym miejscem na Ziemi. Serio. Przez 300 lat Rycerze nie robili nic innego, tylko budowali mury, bastiony i forty. Bali się Turków, piratów, Francuzów... każdego.</p>
<p>Dziś dzięki ich paranoi mamy najpiękniejsze plenery zdjęciowe w Europie.</p>

<h2>Top 3 Miejsca na Spacer po Murach</h2>

<h3>1. Victoria Lines (Wielki Mur Maltański)</h3>
<p>Malta ma swój Mur Chiński. Brytyjczycy zbudowali go w XIX wieku, żeby oddzielić cywilizowaną północ od dzikiej reszty wyspy (czy jakoś tak). Ciągnie się przez 12 km. Najlepszy spacer? Z <strong>Gharghur</strong> do <strong>Bingemma</strong>. Widoki na całą północną Maltę.</p>

<h3>2. Mury Mdiny</h3>
<p>Spacer fosą wokół Mdiny (teraz jest tam park) to relaks w czystej postaci. A widok z murów na górze? Widać stąd wszystko aż do morza. W pogodne dni widać nawet Etnę na Sycylii (jeśli mrużysz oczy i bardzo chcesz).</p>

<h3>3. Fort St. Elmo i Mury Valletty</h3>
<p>Idź wzdłuż obwodu Valletty. Zobaczysz wejście do Grand Harbour, falochron i Fort Ricasoli (tam gdzie kręcili "Gladiatora"). Wiatr urywa głowę, ale czujesz potęgę tego miejsca.</p>

<blockquote class="monika-quote">
Ciekawostka: Wiele murów na Malcie jest "krzywych" lub pochylonych. To nie błąd budowlany. To technika obronna – kule armatnie ześlizgiwały się po nich zamiast uderzać prosto. Sprytne.
</blockquote>
`
    },
    {
        slug: 'pl-swiatynie-starsze-od-piramid',
        title: 'Świątynie Starsze Niż Myślisz',
        subtitle: 'Stonehenge to przy nich młodzieniaszek. Maltańskie świątynie mają 5500 lat i nadal stoją.',
        body_html: `
<p>Kiedy w Egipcie dopiero uczyli się układać kamienie w piramidy, na Malcie stały już gotowe świątynie. <strong>Ggantija</strong>, <strong>Hagar Qim</strong>, <strong>Mnajdra</strong>. Mają ponad 5000 lat. Zbudowali je ludzie, którzy nie znali koła ani metalu.</p>

<h2>Jak Oni To Zrobili?</h2>
<p>Nie wiemy. Serio. Używali kamiennych kul jako łożysk, żeby przesuwać 50-tonowe blok. Legenda mówi o gigantach (Ggantija = Wieża Gigantów). Nauka mówi o cholernie zmotywowanych rolnikach.</p>

<h2>Czego Szukać?</h2>
<ul>
<li><strong>Ołtarze:</strong> Widać na nich ślady po ogniu i... zwierzętach. Tak, składali ofiary.</li>
<li><strong>Grube Kobiety:</strong> Figurki "Fat Ladies" (Wielka Bogini Matka). Symbol płodności. Maltańczycy od zawsze lubili krągłości – to znak dobrobytu.</li>
<li><strong>Wschód Słońca:</strong> Świątynie są idealnie zorientowane astronomicznie. W przesilenie (21 czerwca i 21 grudnia) słońce wpada idealnie przez drzwi i oświetla ołtarz. Magia.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Bilet do Hagar Qim i Mnajdra jest łączony. Te dwie świątynie są obok siebie na klifie. Idź tam przed zachodem słońca. Turyści znikają, a kamienie nabierają złotego koloru. To jedno z najbardziej mistycznych miejsc na wyspie.
</div>
`
    },
    {
        slug: 'pl-maltanskie-jedzenie-uliczne',
        title: 'Street Food: Tłusto, Tanio i Pysznie',
        subtitle: 'Zapomnij o Macu. Prawdziwe jedzenie na Malcie kupuje się w budce na rogu.',
        body_html: `
<p>Maltański street food to nie są jakieś wymyślne burgery z jarmużem. To jedzenie dla ludzi pracy. Ma dawać energię (czytaj: kalorie) i smakować. I robi to doskonale.</p>

<h2>Święta Trójca</h2>
<h3>1. Pastizzi</h3>
<p>Król. Ciasto francuskie z ricottą lub groszkiem. Pisałam o nich osobny poemat, więc tu tylko przypomnę: jedz gorące.</p>

<h3>2. Qassatat</h3>
<p>Mniejsza popularność, ale większy rozmiar. Wygląda jak sakiewka z kruchego ciasta, otwarta u góry. Nadzienie: Ricotta, groszek albo szpinak z tuńczykiem i anchois (mój faworyt). Bardziej sycące niż pastizzi.</p>

<h3>3. Imqaret (Daktylowe Szczęście)</h3>
<p>Smażone ciastka z nadzieniem z daktyli, anyżu i cytrusów. Kupisz je na straganach w Valletcie (przy bramie wjazdowej). Są tłuste, słodkie i pachnące.</p>

<h2>Ftira: Kanapka Gigant</h2>
<p>Jeśli jesteś głodna, kup <strong>Ftirę</strong>. To chleb w kształcie opony, posmarowany koncentratem pomidorowym (kunserva), z tuńczykiem, oliwkami, kaparami, fasolą, cebulą... właściwie ze wszystkim. </p>

<div class="monika-tip">
<strong>💡 GDZIE ZJEŚĆ?</strong>
Nie w restauracji. Ftirę kupuje się w małych barach ("Snack Bar"). Najlepszą robią w <strong>Buchman's</strong> w Gzira albo w <strong>Olympic Bar</strong> w Mosta. Kosztuje grosze, a najesz się na pół dnia.
</div>
`
    },
    {
        slug: 'pl-maltanskie-wino-rewolucja',
        title: 'Wino Maltańskie: Od Octu do Złota',
        subtitle: 'Kiedyś nadawało się tylko do sałatek. Dziś wygrywa medale. Czego spróbować?',
        body_html: `
<p>Jeszcze 20 lat temu "wino maltańskie" było synonimem bólu głowy. Robili je rolnicy w szopach, smakowało jak ocet i miało woltaż paliwa rakietowego. Ale to przeszłość.</p>
<p>Dzisiaj Malta robi świetne wina. Poważnie. Mamy słońce, mamy glebę, mamy pasję.</p>

<h2>Szczepy Lokalne (Unikaty!)</h2>
<p>Jeśli chcesz pić Cabernet, jedź do Francji. Na Malcie pijemy to, co rośnie tylko tutaj:</p>
<ul>
<li><strong>Girgentina (Białe):</strong> Lekkie, owocowe, trochę kwiatowe. Idealne na upał, do ryby.</li>
<li><strong>Ġellewża (Czerwone/Różowe):</strong> Często robią z niego wina musujące (frizzante). Słodkawe, śliwkowe, bardzo pijalne.</li>
</ul>

<h2>Winnice Warto Odwiedzenia</h2>
<ul>
<li><strong>Meridiana (Ta' Qali):</strong> Robią wina w stylu włoskim. Ich "Isis" (Chardonnay) to klasa światowa.</li>
<li><strong>Ta' Mena (Gozo):</strong> Bardziej wiejskie, tradycyjne klimaty. Degustacja u nich to uczta z serem i kiełbasą.</li>
<li><strong>Delicata i Marsovin:</strong> Dwaj giganci. Organizują festiwale wina w Valletcie (lato). Idź tam koniecznie!</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
W restauracji zawsze pytaj o <em>lokalne wino</em>. Często mają świetne butelki, których nie ma w karcie. A jak chcesz kupić do domu: szukaj "Gran Cavalier" (Meridiana) albo "Antonin" (Marsovin). Nie zawiedziesz się.
</div>
`
    },
    {
        slug: 'pl-katakumby-swietego-pawla',
        title: 'Podziemia Rabatu: Miasto Umarłych',
        subtitle: 'Kilometry tuneli, grobów i tajemnic pod ulicami miasta. Klaustrofobicy, uwaga.',
        body_html: `
<p>Pod Rabatem jest drugie miasto. Wykute w skale, ciemne i ciche. To <strong>Katakumby św. Pawła</strong>. Nie mają nic wspólnego ze św. Pawłem (poza nazwą), ale są fascynujące. To cmentarz z czasów rzymskich.</p>

<h2>Dlaczego Pod Ziemią?</h2>
<p>Rzymianie mieli zasadę: nie chowa się zmarłych w mieście. Więc chowano ich pod miastem (albo tuż za murami Mdiny). Przez setki lat wykuto tu labirynt grobowców.</p>

<h2>Co Zobaczysz?</h2>
<ul>
<li><strong>Stoły Agape:</strong> Okrągłe stoły wykute w skale. Rodziny siadały tu na stypę, żeby zjeść pożegnalny posiłek ze zmarłym. Trochę makabryczny piknik, ale taka tradycja.</li>
<li><strong>Groby Żydowskie, Chrześcijańskie i Pogańskie:</strong> Wszyscy leżeli obok siebie. W śmierci nie ma podziałów. Poznasz je po symbolach (menora, krzyż, narzędzia pracy).</li>
</ul>

<blockquote class="monika-quote">
Można się tam zgubić? Nie, są trasy. Ale jest chłodno i wilgotno. Latem to najlepsza ucieczka przed upałem.
</blockquote>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Bilet kosztuje €6. Jeśli masz Heritage Malta Pass, wchodzisz za darmo. Po zwiedzaniu idź na ciasto do <strong>Parruccan</strong> w Rabacie – to dosłownie 2 minuty spacerem, a ciasto z kruszonką mają boskie.
</div>
`
    },
    {
        slug: 'pl-mdina-noca-wino-cisza',
        title: 'Mdina Nocą: Inny Wymiar',
        subtitle: 'Zapomnij o Mdinie w dzień. Prawdziwa magia dzieje się, gdy gasną światła.',
        body_html: `
<p>W dzień Mdina jest piękna, ale pełna wycieczek szkolnych i grup z przewodnikami krzyczącymi przez megafony. Ale po 19:00? Miasto zmienia się w scenografię filmową. Turyści wyjeżdżają. Sklepy zamykają. Zostaje cisza.</p>

<p>Słychać tylko Twoje kroki na kamieniach. Latarnie dają żółte, ciepłe światło. Cienie na murach wyglądają jak duchy rycerzy (albo koty, których jest tu sporo).</p>

<h2>Co Robić w Nocy?</h2>
<ul>
<li><strong>Spacer:</strong> Po prostu idź. Zgub się. To małe miasto, zawsze w końcu trafisz na mury albo bramę.</li>
<li><strong>Wino:</strong> Vinum Wine Bar na murach. Siedzisz na balkonie, pod Tobą przepaść i widok na całą wyspę, w ręku kieliszek. Czego chcieć więcej?</li>
<li><strong>Zdjęcia:</strong> Bez ludzi. Mdina nocą to raj dla fotografów. Brama główna, Katedra, puste uliczki.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Jeśli masz samochód, zaparkuj na parkingu publicznym przed bramą (darmowy wieczorem). Wejdź pieszo. Poczujesz się jakbyś wchodziła do Narnii przez szafę. To idealne miejsce na randkę. 10/10 punktów za romantyzm.
</div>
`
    }
];

async function updateBatch3() {
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

updateBatch3();
