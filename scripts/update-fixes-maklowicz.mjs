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
        slug: 'pl-malta-filmowa-game-of-thrones',
        title: 'Malta Filmowa: Hollywood na Skale',
        subtitle: 'Od Gry o Tron po Gladiatora. Zobacz miejsca, gdzie kręcili Twoje ulubione filmy.',
        body_html: `
<p>Malta to kameleon. Raz jest Rzymem, raz Grecją, a raz Królewską Przystanią. Hollywood kocha tę wyspę, bo podatki są niskie, a plenery epickie. Oto gdzie pójść, żeby poczuć się jak na planie.</p>

<h2>Gra o Tron (Sezon 1)</h2>
<ul>
<li><strong>Brama Mdiny:</strong> To tutaj Catelyn Stark wjeżdżała do Królewskiej Przystani. Most wygląda identycznie (tylko bez strażników Lannisterów).</li>
<li><strong>Fort Ricasoli:</strong> Czerwona Twierdza (Red Keep). Niestety zamknięty dla zwiedzających, ale widać go świetnie z ogrodów Upper Barrakka.</li>
<li><strong>Klify Mtahleb:</strong> To tutaj Daenerys wyszła z ognia ze smokami. Jest dziko, wietrznie i pięknie.</li>
</ul>

<h2>Gladiator</h2>
<p>Ridley Scott zbudował replikę Koloseum w Forcie Ricasoli. Russell Crowe pił piwo w pubie "The Pub" w Valletcie (tam gdzie zmarł Oliver Reed - legenda głosi, że wciąż tam straszy).</p>

<h2>Troja</h2>
<p>Kiedy Brad Pitt (Achilles) błyszczał klatą na plaży, to była <strong>Blue Lagoon</strong> na Comino. Woda naprawdę jest tak turkusowa, to nie CGI.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Chcesz zobaczyć wioskę z filmu "Popeye" z 1980 roku? Stoi do dziś w Anchor Bay. Jest cukierkowa, drewniana i trochę kiczowata. Najlepiej wygląda z klifu naprzeciwko (punkt widokowy). Wchodzenie do środka polecam tylko, jeśli masz dzieci.
</div>
`
    },
    {
        slug: 'pl-upper-barrakka-najlepszy-widok',
        title: 'Upper Barrakka: Widok za Milion Dolarów',
        subtitle: 'Jeśli masz zrobić na Malcie tylko jedno zdjęcie, zrób je tutaj.',
        body_html: `
<p>To jest ten widok z pocztówek. Stoisz na tarasie, a przed Tobą rozciąga się Grand Harbour – największy naturalny port na Morzu Śródziemnym. Po drugiej stronie widzisz Trójmiasto (Birgu, Senglea, Cospicua) i wielki Fort St. Angelo.</p>

<h2>Armaty o 12:00</h2>
<p>Poniżej tarasu znajduje się <strong>Saluting Battery</strong>. Codziennie w południe (i o 16:00) żołnierze w mundurach z epoki ładują armaty i strzelają. Jest huk, jest dym, turyści piszczą. Warto być 10 minut wcześniej, żeby zająć miejsce przy barierce.</p>

<h2>Winda Barrakka</h2>
<p>Jak się tu dostać z poziomu morza (np. z promu)? <strong>Barrakka Lift</strong>. Wielka, betonowa wieża, która w 25 sekund wywiezie Cię 58 metrów w górę. Kosztuje €1 (powrót w dół darmowy). Jeśli masz bilet na prom, winda jest za darmo.</p>

<blockquote class="monika-quote">
<strong>Rada:</strong> Przyjdź tu o zachodzie słońca. Mury Trójmiasta robią się złote. To "Golden Hour" w najczystszej postaci.
</blockquote>
`
    },
    {
        slug: 'pl-gozo-zielona-wyspa-maklowicza',
        title: 'Gozo: Zielona Wyspa Spokoju', // REMOVED NAME FROM SLUG/TITLE CONTEXT (slug stays for SEO, title changes)
        subtitle: 'Gdzie czas płynie wolniej, a jedzenie smakuje lepiej. Ucieczka z hałaśliwej Malty.',
        body_html: `
<p>Mówi się, że na Maltę jedzie się zwiedzać, a na Gozo odpoczywać. To prawda. Ta wyspa jest inna. Jest bardziej wiejska, zielona (zimą) i dzika. Ludzie (Gozytanie) są inni - bardziej wyluzowani.</p>

<h2>Dojazd (Prom)</h2>
<p>Prom z Cirkewwa płynie 25 minut. Płacisz dopiero <strong>wracając</strong>! To taki lokalny trik, żebyś łatwiej przyjechała, a trudniej wyjechała.</p>

<h2>Co Zobaczyć?</h2>
<ul>
<li><strong>Cytadela w Victorii:</strong> Odnowiona twierdza, z której widać całą wyspę. Wstęp na mury jest darmowy.</li>
<li><strong>Dwejra (Inland Sea):</strong> Po Lazurowym Oknie (runęło w 2017) została piękna zatoka i wewnętrzne morze połączone tunelem.</li>
<li><strong>Domki solne (Salt Pans):</strong> Wykute w skale szachownice na północy wyspy. Wyglądają jak z Marsa.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Gozo słynie z owczego sera (Gbejna). Kup świeży (miękki) i suszony (twardy, z pieprzem). Najlepiej smakuje z lokalnym chlebem i oliwą.
</div>
`
    },
    {
        slug: 'pl-valletta-sladami-maklowicza',
        title: 'Valletta: Miasto Twierdza', // REMOVED NAME
        subtitle: 'Najmniejsza stolica UE. Zbudowana przez dżentelmenów dla dżentelmenów (i turystów).',
        body_html: `
<p>Valletta to muzeum bez dachu. Całe miasto jest na liście UNESCO. Ma tylko kilometr długości, ale jest tak napakowane historią, że głowa pęka.</p>

<h2>Jak Zwiedzać?</h2>
<p>Nie bierz mapy. Po prostu idź. Valletta to szachownica ulic. W końcu i tak dojdziesz do morza. Główna ulica (Republic Street) to sklepy i tłumy. Skręć w bok, żeby zobaczyć prawdziwe życie.</p>

<h2>Must-See</h2>
<ul>
<li><strong>Konkatedra św. Jana:</strong> Z zewnątrz bunkier, w środku złoto. Musisz wejść.</li>
<li><strong>Pałac Wielkiego Mistrza:</strong> Siedziba władzy od 400 lat. Zbrojownia robi wrażenie.</li>
<li><strong>Strait Street:</strong> Kiedyś ulica czerwonych latarni ("The Gut"), dziś centrum nocnego życia z knajpkami.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Patrz w górę na balkony (Gallarija). Są drewniane, kolorowe i zabudowane. To symbol Malty.
</div>
`
    },
    {
        slug: 'pl-barok-maltanski-koscioly',
        title: 'Barok na Malcie: Teatr w Kamieniu',
        subtitle: 'Dlaczego maltańskie kościoły są tak przesadnie bogate? O przepychu i wierze.',
        body_html: `
<p>Na Malcie jest 365 kościołów. Jeden na każdy dzień roku. I prawie wszystkie to barok. Dlaczego? Bo Rycerze mieli kasę i ego. Chcieli pokazać, że Katolicyzm jest potężny, bogaty i piękny. Udało im się.</p>

<h2>Co to jest "Maltański Barok"?</h2>
<p>To barok na sterydach. Złoto, marmur, rzeźby, malowidła iluzjonistyczne (trompe l'oeil - oszukujące oko). Wejdź do jakiegokolwiek kościoła parafialnego (np. w Naxxar czy Mosta), a szczęka Ci opadnie. To budowały małe wioski z własnych składek!</p>

<h2>Najlepsze Przykłady</h2>
<ul>
<li><strong>Konkatedra św. Jana (Valletta):</strong> Absolutny szczyt. Podłoga z marmurowych nagrobków to arcydzieło.</li>
<li><strong>Katedra w Mdinie:</strong> Elegancka, arystokratyczna. Jej bliźniacza wieża ma zegar, który pokazuje złą godzinę (żeby zmylić diabła).</li>
</ul>

<blockquote class="monika-quote">
<strong>Ciekawostka:</strong> Wiele kościołów ma dwa zegary na wieżach. Jeden pokazuje dobry czas, drugi zły. To stara tradycja, żeby śmierć nie wiedziała, kiedy dokładnie przyjść po duszę.
</blockquote>
`
    },
    {
        slug: 'pl-birgu-vittoriosa-ukryta-perla',
        title: 'Birgu: Tam, Gdzie Historia Jest Żywa',
        subtitle: 'Zapomnij o Valletcie na chwilę. Birgu jest starsze, cichsze i bardziej autentyczne.',
        body_html: `
<p>Birgu to najstarsze z Trójmiasta. To tutaj Rycerze mieszkali, zanim zbudowali Vallettę. To tutaj bronili się podczas Wielkiego Oblężenia w 1565 roku. Każdy kamień tutaj krwawił historią.</p>

<h2>Dlaczego Warto?</h2>
<p>Bo tu nie ma tłumów (jeszcze). Ulice są pełne doniczek z kwiatami, pranie wisi nad głowami, a sąsiedzi gadają przez otwarte drzwi. Tak wyglądała Malta 50 lat temu.</p>

<h2>Co Zobaczyć?</h2>
<ul>
<li><strong>Fort St. Angelo:</strong> Potwór. Wielka twierdza na cyplu. Widać ją z Valletty, ale od środka robi jeszcze większe wrażenie.</li>
<li><strong>Pałac Inkwizytora:</strong> Jedyne takie miejsce na świecie otwarte dla turystów. Zobacz cele więzienne i salę tortur. Ciarki gwarantowane.</li>
<li><strong>Przystań Jachtowa:</strong> Kontrast totalny. Stare mury i super-jachty milionerów.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Najlepiej przypłynąć tu łódką (Dghajsa) z Valletty. Kosztuje €2, a widoki są niesamowite. Wysiądziesz prosto w centrum akcji.
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
            console.log('✅ Updated (Cleaned): ' + update.slug);
        }
    }
}

updateFixes();
