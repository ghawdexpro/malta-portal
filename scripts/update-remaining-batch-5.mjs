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
        slug: 'najlepsze-restauracje-malta',
        title: 'Gdzie Zjeść na Malcie (i Nie Zbankrutować)',
        subtitle: 'Omiń pułapki na turystów. Oto lista miejsc, gdzie karmią miejscowych. Sprawdzone żołądkiem.',
        body_html: `
<p>Zasada numer 1 na Malcie: Jeśli przed restauracją stoi naganiacz i macha menu ze zdjęciami potraw – uciekaj. To pułapka. Jedzenie będzie mrożone, drogie i smutne.</p>

<p>Maltańska kuchnia to złoto, ale trzeba wiedzieć, gdzie szukać. Oto moja subiektywna lista miejsc, gdzie zjesz uczciwie, tłusto i pysznie.</p>

<h2>Dla Mięsożerców (Fenek & Bragioli)</h2>
<ul>
<li><strong>United Restaurant (Mgarr):</strong> Wygląda jak stołówka z lat 90. Obrusy w kratę, zero designu. Ale ich królik (Fenek) i ślimaki to mistrzostwo świata. Tu jedzą maltańskie rodziny w niedzielę.</li>
<li><strong>Gululu (St. Julian's):</strong> Jedno z niewielu miejsc w turystycznym centrum, które trzyma poziom. Mają świetne Ftiry i lokalne przystawki. Widok na zatokę w cenie.</li>
</ul>

<h2>Dla Fanów Ryb (Prosto z Morza)</h2>
<ul>
<li><strong>Tartarun (Marsaxlokk):</strong> Drogo, ale warto. Jeśli chcesz zjeść rybę, która rano jeszcze pływała, idź tutaj. Ich tatar z tuńczyka śni mi się po nocach.</li>
<li><strong>Roots (Marsaxlokk):</strong> Bardziej luzacka opcja. Stoliki na chodniku, widok na kolorowe łódki Luzzu. Bierz "Catch of the Day".</li>
</ul>

<h2>Street Food & Tanie Jedzenie</h2>
<ul>
<li><strong>Crystal Palace (Rabat):</strong> Królestwo Pastizzi. Otwarte prawie całą dobę. 50 centów za kawałek nieba.</li>
<li><strong>Buchman’s Snack Bar (Gzira):</strong> Najlepsza Ftira z tuńczykiem na wyspie. Kosztuje grosze, a najesz się na cały dzień.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
W wielu restauracjach porcje są GIGANTYCZNE. Często "przystawka" (starter) jest wielkości dania głównego w Polsce. Zanim zamówisz 3 dania, rozejrzyj się po sali i zobacz, co mają ludzie na talerzach. Serio.
</div>
`
    },
    {
        slug: 'noclegi-malta-przewodnik',
        title: 'Gdzie Spać na Malcie? (Szczery Przewodnik)',
        subtitle: 'Sliema dla imprezowiczów, Valletta dla romantyków, a Gozo dla uciekinierów. Wybierz mądrze.',
        body_html: `
<p>Wybór bazy na Malcie to klucz do udanego urlopu. Wybierzesz źle – utkniesz w korkach albo umrzesz z nudów. Oto szybka ściąga.</p>

<h2>1. Sliema i St. Julian's: Dżungla i Impreza</h2>
<p>To tutaj są hotele, bary, kluby i promenada. Jest głośno, tłoczno i drogo.</p>
<ul>
<li><strong>Dla kogo:</strong> Dla tych, co chcą mieć wszędzie blisko, lubią imprezy (Paceville) i nie przeszkadza im beton.</li>
<li><strong>Minusy:</strong> Brak plaż (tylko skały), hałas, korki.</li>
</ul>

<h2>2. Valletta: Historia w Wersji Premium</h2>
<p>Stolica. Piękna, klimatyczna, droga. Nocleg w kamienicy z XVI wieku to przeżycie samo w sobie.</p>
<ul>
<li><strong>Dla kogo:</strong> Dla par, fanów architektury i tych, co mają większy budżet.</li>
<li><strong>Minusy:</strong> Mało sklepów spożywczych, wieczorem bywa cicho (choć to się zmienia).</li>
</ul>

<h2>3. St. Paul's Bay (Bugibba/Qawra): Budżetowo i Rodzinnie</h2>
<p>Turystyczne blokowiska na północy. Mniej urokliwe, ale tańsze i blisko piaszczystych plaż.</p>
<ul>
<li><strong>Dla kogo:</strong> Dla rodzin z dziećmi i oszczędnych.</li>
<li><strong>Minusy:</strong> Wygląda trochę jak klocki Lego, daleko do Valletty (godzina autobusem).</li>
</ul>

<h2>4. Mellieha: Plażing</h2>
<p>Północ wyspy. Blisko największej piaszczystej plaży.</p>
<ul>
<li><strong>Dla kogo:</strong> Dla plażowiczów.</li>
<li><strong>Minusy:</strong> Wszędzie pod górę (miasto jest na wzgórzu), wieczorem nuda.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Jeśli jedziesz na dłużej niż 4 dni, zrób "split stay". 3 dni na Malcie (np. Valletta/Sliema) i 2 dni na Gozo (w jakimś gospodarstwie agroturystycznym z basenem). Gozo to inny świat. Warto tam zostać na noc, żeby zobaczyć gwiazdy (na Malcie jest za jasno).
</div>
`
    },
    {
        slug: 'porady-malta-pierwsza-wizyta',
        title: '25 Rzeczy, Których Nikt Ci Nie Powie o Malcie',
        subtitle: 'Od gniazdek elektrycznych po meduzy. Przeczytaj, zanim kupisz bilet.',
        body_html: `
<p>Przewodniki pokażą Ci ładne zdjęcia. Ja powiem Ci, jak jest naprawdę. Oto survival guide po Malcie.</p>

<h2>Transport i Logistyka</h2>
<ol>
<li><strong>Ruch lewostronny:</strong> Pamiątka po Brytyjczykach. Patrz w PRAWĄ, zanim wejdziesz na pasy!</li>
<li><strong>Gniazdka:</strong> Też brytyjskie (typ G, trzy bolce). Weź przejściówkę, bo w recepcji może braknąć.</li>
<li><strong>Autobusy:</strong> Zatrzymują się tylko "na machnięcie". Machaj ręką jak szalona, bo kierowca Cię ominie. I naciśnij guzik "STOP" przed wysiadaniem.</li>
<li><strong>Korki:</strong> Są straszne. 5 km jedzie się czasem 40 minut. Planuj z zapasem.</li>
</ol>

<h2>Życie i Obyczaje</h2>
<ol start="5">
<li><strong>Sjesta:</strong> Małe sklepy zamykają się między 13:00 a 16:00.</li>
<li><strong>Woda:</strong> Z kranu jest bezpieczna, ale niesmaczna (odsalana z morza). Kupuj butelkowaną.</li>
<li><strong>Napiwki:</strong> Nie są obowiązkowe, ale 5-10% to miły gest. Kelnerzy zarabiają mało.</li>
<li><strong>Kościoły:</strong> Zakryj ramiona i kolana. Serio, pilnują tego.</li>
</ol>

<h2>Natura i Pogoda</h2>
<ol start="9">
<li><strong>Słońce:</strong> W lecie zabija. Krem z filtrem 50 to konieczność, nie opcja.</li>
<li><strong>Meduzy:</strong> Bywają plagą. Sprawdź stronę "Malta Weather" na FB, często piszą, gdzie są meduzy (zależy od wiatru).</li>
<li><strong>Karaluchy:</strong> Są duże i latają. Na ulicach latem to norma. Nie panikuj, one boją się Ciebie bardziej.</li>
</ol>

<blockquote class="monika-quote">
Najważniejsza rada: Wrzuć na luz. Maltańczycy są głośni, czasem chaotyczni, ale bardzo pomocni. Uśmiechnij się, powiedz "Mela" i ciesz się wyspą.
</blockquote>
`
    },
    {
        slug: 'gozo-kompletny-przewodnik',
        title: 'Gozo: Dlaczego Warto Uciec z Głównej Wyspy?',
        subtitle: 'Malta to hałas i historia. Gozo to cisza i natura. Przewodnik po mniejszej siostrze.',
        body_html: `
<p>Wielu turystów wpada na Gozo na jeden dzień. "Zaliczyć" Cytadelę, Azure Window (którego nie ma) i wrócić. Błąd. Gozo to miejsce, gdzie trzeba zwolnić.</p>

<h2>Co Zobaczyć (Poza Oczywistościami)?</h2>
<ul>
<li><strong>Wied il-Ghasri:</strong> Wąwóz zalany morzem. Wygląda jak fiord. Zejdź schodami na dół na małą plażę. Woda jest tam turkusowa.</li>
<li><strong>Bazylika Ta' Pinu:</strong> Samotny kościół pośrodku niczego. Wygląda jak z Włoch. W środku jest ściana z wotami dziękczynnymi - gipsy, kule, listy. Robi wrażenie.</li>
<li><strong>Klify Sanap:</strong> Mniej znane niż te w Dingli, a piękniejsze. Zachód słońca tutaj to magia.</li>
<li><strong>Xwejni Salt Pans:</strong> Panwie solne. Wykute w skale baseny do zbierania soli morskiej. Wyglądają jak szachownica.</li>
</ul>

<h2>Jak Się Poruszać?</h2>
<p>Autobusy na Gozo są... rzadkie. Najlepiej wynająć auto (można przewieźć promem z Malty) albo quada. Quady są tu super popularne.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Zjedz pizzę w <strong>Mekren Bakery</strong> w Nadur. To właściwie piekarnia, nie restauracja. Kupujesz pizzę (lub ftirę) na wynos i jesz na ławce z widokiem na morze. Ich ciasto jest grube, wiejskie i pyszne.
</div>
`
    },
    {
        slug: 'wydarzenia-malta-festiwale',
        title: 'Imprezy na Malcie: Kiedy Strzelają Fajerwerki?',
        subtitle: 'Festy, fajerwerki i karnawał. Maltańczycy znajdą każdy powód, żeby świętować.',
        body_html: `
<p>Jeśli myślisz, że Polacy lubią świętować, nie widziałaś Malty. Tutaj każda wioska ma swojego świętego (Patrona) i raz w roku robi mu imprezę, jakby jutra miało nie być.</p>

<h2>1. Festa (Lato)</h2>
<p>Od maja do września, w każdy weekend gdzieś jest Festa. Co to znaczy?
<ul>
<li>Ulice udekorowane jak na Boże Narodzenie (tylko w lecie).</li>
<li>Procesja z figurą świętego (noszą ją na ramionach, waży tonę).</li>
<li>Orkiestry dęte grające marsze.</li>
<li><strong>FAJERWERKI.</strong> Dużo fajerwerków. Maltańczycy mają obsesję na punkcie pirotechniki. Walą głośno i kolorowo.</li>
</ul>
</p>

<h2>2. Karnawał (Luty)</h2>
<p>Głównie w Valletcie i Nadur (Gozo). W Valletcie są parady kolorowych platform (dla dzieci). W Nadur... cóż. Karnawał w Nadur jest "specyficzny". Mroczny, satyryczny, bez zasad. Dla dorosłych.</p>

<h2>3. Isle of MTV (Czerwiec/Lipiec)</h2>
<p>Wielki, darmowy koncert na placu we Florianie. Przyjeżdżają gwiazdy pop (Lady Gaga, Snoop Dogg byli kiedyś). Tłumy nastolatków.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Chcesz zobaczyć prawdziwą Festę? Jedź na <strong>Santa Marija (15 sierpnia)</strong>. To największe święto na wyspie (szczególnie w Mosta). Albo na Festę św. Pawła w Valletcie (luty), gdzie sypią konfetti z balkonów.
</div>
`
    },
    {
        slug: 'zwiedzanie-malta-atrakcje',
        title: 'Co Zobaczyć na Malcie: 15 Hitów i Kitów',
        subtitle: 'Nie trać czasu na nudne muzea. Oto lista tego, co naprawdę robi wrażenie.',
        body_html: `
<p>Masz mało czasu, a lista w przewodniku długa? Pomogę Ci przesiać ziarno od plew.</p>

<h2>HITY (Musisz Zobaczyć)</h2>
<ol>
<li><strong>Valletta:</strong> Cała. Po prostu chodź ulicami, patrz w górę na balkony i w dół na morze.</li>
<li><strong>Rejs łódką (Dghajsa) po Grand Harbour:</strong> Kosztuje parę euro, a widok Fortu St. Angelo z wody jest bezcenny.</li>
<li><strong>Mdina wieczorem:</strong> Kiedy wyjadą wycieczki. Cisza dzwoni w uszach.</li>
<li><strong>Blue Grotto (punkt widokowy):</strong> Nie musisz płynąć łódką (chyba że chcesz). Widok z góry na łuk skalny jest darmowy i spektakularny.</li>
<li><strong>Konkatedra św. Jana:</strong> Nawet jak nie lubisz kościołów. To czyste złoto.</li>
</ol>

<h2>KITY (Można Odpuścić)</h2>
<ol>
<li><strong>Popeye Village:</strong> Wioska zbudowana do filmu w latach 80. Wygląda fajnie z klifu naprzeciwko (punkt widokowy). Wchodzenie do środka? Tylko dla małych dzieci. Drogo i plastikowo.</li>
<li><strong>Paceville:</strong> Dzielnica imprezowa. Jeśli masz więcej niż 25 lat, będziesz się czuła staro i brudno. Lepiej idź na drinka do Valletty.</li>
<li><strong>Akwarium (Qawra):</strong> Jest okej, ale bez szału. Jak pada deszcz – spoko. Jak jest słońce – szkoda dnia.</li>
</ol>

<blockquote class="monika-quote">
Pamiętaj: Malta jest mała, ale czasochłonna w dojazdach. Nie planuj więcej niż 2 duże atrakcje na dzień.
</blockquote>
`
    },
    {
        slug: 'plaze-malta-kompletny-przewodnik',
        title: 'Plaże na Malcie: Gdzie Jest Piasek? (Bo To Nie Oczywiste)',
        subtitle: 'Szukasz rajskiej plaży? Możesz się zdziwić. Malta to głównie skały. Ale piasek też jest, jak wiesz gdzie szukać.',
        body_html: `
<p>Większość "plaż" na Malcie to po prostu kamienie, z których skacze się do wody. Ma to swój urok (nie masz piasku w majtkach), ale jeśli marzysz o leżingu na piasku, masz 3 opcje.</p>

<h2>Złota Trójca (Piasek)</h2>
<ol>
<li><strong>Golden Bay:</strong> Duża, złoty piasek, łatwy dojazd. Są hotele, knajpy i tłumy. Zachody słońca są tu epickie.</li>
<li><strong>Ghajn Tuffieha (Riviera):</strong> Obok Golden Bay, ale trzeba zejść po 200 schodach. Dzięki temu jest mniej ludzi (leniwym się nie chce) i jest dziko. Mój faworyt.</li>
<li><strong>Mellieha Bay (Ghadira):</strong> Najdłuższa plaża. Płytka woda przez kilometr. Idealna dla dzieci. W weekendy ciasno jak w puszce sardynek.</li>
</ol>

<h2>Skały i Klify (Dla Pływaków)</h2>
<ul>
<li><strong>St. Peter's Pool:</strong> Naturalny basen w skale. Skacze się z kilku metrów do turkusowej wody. Super, ale nie ma cienia. Ani grama.</li>
<li><strong>Ghar Lapsi:</strong> Mała zatoczka dla rybaków. Woda jest tam niesamowicie czysta. Świetne na snorkeling.</li>
</ul>

<h2>Blue Lagoon: Oczekiwania vs Rzeczywistość</h2>
<p>Woda jest turkusowa jak na Instagramie. Ale plaża ma 5 metrów szerokości i są na niej Tysiące ludzi. Serio. Ludzie leżą na skałach, na ścieżce, na sobie. Warto zobaczyć, ale popłyń tam rano (przed 9:00) albo po 16:00. W środku dnia to koszmar.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Kup buty do wody (takie gumowe). Na Malcie jest dużo skał i jeżowców. Przydadzą się bardziej niż klapki.
</div>
`
    },
    {
        slug: 'ceny-malta-przewodnik-2026',
        title: 'Ceny na Malcie: Ile To Kosztuje? (Bez Ściemy)',
        subtitle: 'Czy Malta jest droga? To zależy, czy jesz pastizzi czy homary. Przykładowy budżet.',
        body_html: `
<p>Malta nie jest już tanim krajem (te czasy minęły z 5 lat temu), ale nadal jest tańsza niż Włochy czy Francja. Waluta to <strong>Euro (€)</strong>.</p>

<h2>Przykładowe Ceny (2026)</h2>

<h3>Jedzenie i Picie</h3>
<ul>
<li>Pastizzi (przekąska): €0.50 - €0.70</li>
<li>Kawa (Cappuccino): €2.00 - €3.00</li>
<li>Piwo w barze (Pint): €3.50 - €5.00</li>
<li>Obiad w restauracji (makaron/pizza): €12 - €16</li>
<li>Danie główne (ryba/królik): €20 - €28</li>
<li>Butelka wody w sklepie: €0.80</li>
</ul>

<h3>Transport</h3>
<ul>
<li>Bilet na autobus (2h): €2.50 (lato) / €2.00 (zima)</li>
<li>Karta tygodniowa na autobus: €21</li>
<li>Prom na Gozo (pieszy): €4.65 (powrotny!)</li>
<li>Bolt (3-5 km): €7 - €10</li>
</ul>

<h3>Atrakcje</h3>
<ul>
<li>Muzea (średnio): €6 - €10</li>
<li>Konkatedra św. Jana: €15</li>
<li>Rejs na Blue Lagoon: €20 - €30</li>
</ul>

<div class="monika-tip">
<strong>💡 JAK OSZCZĘDZIĆ?</strong>
1. <strong>Pij wodę z kranu?</strong> Nie polecam smaku. Ale kupuj baniaki 5L w markecie, wychodzi taniej.
2. <strong>Happy Hour:</strong> Wiele barów (zwłaszcza w Sliemie) ma "Buy 1 Get 1 Free" między 16:00 a 19:00.
3. <strong>Heritage Malta Pass:</strong> Jeśli planujesz dużo zwiedzać, kup karnet na wszystkie muzea. Zwraca się po 3-4 wejściach.
</div>
`
    },
    {
        slug: 'transport-malta-przewodnik',
        title: 'Transport na Malcie: Jak Przetrwać?',
        subtitle: 'Autobusy, które się spóźniają, i taksówki, które ratują życie. Poradnik mobilności.',
        body_html: `
<p>Malta jest mała, więc wydaje się, że wszędzie jest blisko. Błąd. Przez korki i wąskie drogi, podróż 10 km może trwać godzinę. Jak się po tym poruszać?</p>

<h2>1. Autobusy (Tallinja)</h2>
<p>Są tanie i klimatyzowane. Dojeżdżają wszędzie. ALE. Spóźniają się. Często. A jak są pełne, to kierowca po prostu się nie zatrzyma na przystanku. Nie polegaj na rozkładzie jazdy co do minuty.</p>
<p><strong>Aplikacja:</strong> Ściągnij "Tallinja App". Pokazuje (teoretyczny) czas przyjazdu.</p>

<h2>2. Aplikacje Przewozowe (Bolt / Uber / eCabs)</h2>
<p>Działają świetnie. Ceny są rozsądne. To najlepsza opcja, jeśli jesteś w grupie 2-3 osób (często wychodzi podobnie jak autobus, a 3x szybciej). <strong>eCabs</strong> to lokalna firma, też mają apkę i są solidni.</p>

<h2>3. Promy (Sliema - Valletta - Trójmiasto)</h2>
<p>To jest lifehack. Zamiast stać w korku w autobusie dookoła zatoki, płyń promem.
<ul>
<li>Sliema -> Valletta: 5 minut.</li>
<li>Valletta -> Trójmiasto (Cospicua): 5 minut.</li>
</ul>
Widoki piękne, wiatr we włosach, zero stresu. Bilet wchodzi w kartę autobusową (tygodniową).</p>

<h2>4. Wynajem Auta</h2>
<p>Tylko dla odważnych. Ruch lewostronny, wąskie uliczki, agresywni kierowcy. I brak miejsc parkingowych. Serio, parkowanie w Sliemie/Valletcie to misja niemożliwa. Jeśli nie musisz, nie bierz auta.</p>

<blockquote class="monika-quote">
Moja rada: Mieszkasz w Sliemie/Valletcie? Używaj promów i nóg. Jedziesz na plażę/klify? Weź Bolta albo uzbrój się w cierpliwość w autobusie.
</blockquote>
`
    }
];

async function updateBatch5() {
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

updateBatch5();
