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
        slug: 'pl-gozo-zielona-wyspa-maklowicza',
        subtitle: 'Prom, Cytadela i czas, który płynie wolniej. Przewodnik po mniejszej siostrze Malty.',
        body_html: `
<p>Jeśli Malta to głośna, imprezowa starsza siostra, to Gozo jest tą spokojniejszą, ładniejszą i bardziej tajemniczą. Czas płynie tu inaczej — wolniej, leniwiej, dokładnie tak, jak powinien na urlopie. Miejscowi mówią, że na Gozo przyjeżdża się po to, żeby usłyszeć własne myśli.</p>

<p>To nie jest "Malta w miniaturze". To zupełnie inny świat. Bardziej zielony, bardziej wiejski i — co najważniejsze — z lepszym jedzeniem. Pokażę Ci, jak wycisnąć z niej to, co najlepsze.</p>

<h2>Prom: Twoja Przepustka do Raju</h2>
<p>Rejs promem to pierwsze 25 minut terapii antystresowej. Płyniesz z Ċirkewwa na Malcie do portu Mġarr na Gozo. Widok na Comino i Blue Lagoon po drodze? W cenie biletu.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Bilet kupujesz dopiero WRACAJĄC z Gozo. Serio. Na Gozo wjeżdżasz za darmo, płacisz przy wyjeździe (€4.65/osoba, ok. €15/auto). Taka lokalna ciekawostka, która zawsze dziwi turystów.
</div>

<h2>Victoria i Cytadela: Władca Pierścieni na Żywo</h2>
<p>Stolica wyspy to Victoria (miejscowi wciąż mówią Rabat — powodzenia w pytaniu o drogę!). Nad miastem góruje <strong>Cytadela</strong>. Wygląda jak scenografia do "Gry o Tron", ale jest w 100% prawdziwa.</p>

<blockquote class="monika-quote">
Cytadela to jedyne miejsce, które ocalało, gdy w 1551 roku piraci porwali WSZYSTKICH mieszkańców Gozo w niewolę. Dziś spacerujesz tam za darmo i masz najlepszy widok na całą wyspę.
</blockquote>

<h2>Smaki Gozo: Prosto z Serca</h2>
<p>Na Gozo jedzenie jest religią. Jest prościej niż na Malcie, ale smaczniej. Tutaj pomidory pachną słońcem, a ser <strong>Ġbejna</strong> robi się ręcznie według receptury prababci.</p>

<div class="monika-tip">
<strong>💡 CZEGO SPRÓBOWAĆ:</strong>
<ul>
<li><strong>Ġbejna:</strong> Małe krążki sera owczego/koziego. Świeże (miękkie) są do sałatek, suszone (twarde) z pieprzem — idealne do wina.</li>
<li><strong>Ftira Għawdxija:</strong> Gozańska wersja pizzy. Ziemniaki, kapary, tuńczyk, anchois. Lepsza niż włoska. Nie dyskutuj.</li>
<li><strong>Sól morska:</strong> Kupowana prosto z solnisk w Xwejni. Smakuje morzem, nie chemią.</li>
</ul>
</div>

<h2>Co Musisz Zobaczyć (Bez Ściemy)</h2>
<ul>
<li><strong>Cytadela:</strong> Obowiązkowo. Najlepiej o zachodzie słońca.</li>
<li><strong>Ramla Bay:</strong> Plaża z czerwonym (naprawdę czerwonym!) piaskiem.</li>
<li><strong>Dwejra:</strong> Azure Window runęło do morza w 2017 roku (RIP), ale Blue Hole i Inland Sea nadal robią wrażenie.</li>
<li><strong>Wied il-Għasri:</strong> Wąwóz wrzynający się w ląd. Wygląda jak fiord, woda jest krystaliczna. Zejście po schodach — warto.</li>
</ul>

<h3>Ile Czasu?</h3>
<p>Jednodniowa wycieczka to absolutne minimum, żeby "zaliczyć" główne punkty. Ale jeśli chcesz poczuć ten słynny luz, zostań na noc. Wieczór w Victorii, kiedy odpłyną "jednodniowi" turyści, to magia.</p>
`
    },
    {
        slug: 'pl-upper-barrakka-najlepszy-widok',
        subtitle: 'Najlepszy taras widokowy na Malcie. Gdzie stanąć, o której przyjść i dlaczego strzelają z armat.',
        body_html: `
<p>W każdym mieście jest takie miejsce, które jest "turystyczną pułapką", ale i tak trzeba tam iść. Upper Barrakka Gardens to wyjątek. Są turystyczne, są zatłoczone, ale... są absolutnie fenomenalne. To po prostu najpiękniejszy balkon śródziemnomorski, jaki znajdziesz.</p>

<h2>Widok za Milion Dolarów (Za Darmo)</h2>
<p>Wchodzisz, podchodzisz do balustrady i... wow. Przed Tobą Grand Harbour — największy naturalny port Europy. Naprzeciwko: <strong>Trzy Miasta</strong> (Birgu, Senglea, Cospicua). Wyglądają jak makieta filmowa, a ludzie mieszkają tam od stuleci.</p>

<blockquote class="monika-quote">
To tutaj kręcono "Grę o Tron", "Troję" i "Gladiatora". Stojąc na tym tarasie, patrzysz na tę samą wodę, po której pływał Brad Pitt.
</blockquote>

<h2>Saluting Battery: Hałas w Południe</h2>
<p>Codziennie o 12:00 i 16:00 na dolnym tarasie dzieje się magia (i hałas). Żołnierze w historycznych mundurach ładują armaty i oddają strzał honorowy. Tradycja z czasów, gdy nie było zegarków i rybacy musieli wiedzieć, która godzina.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Nie kupuj biletu na dolny taras (€3). Z górnego (darmowego) widać dokładnie to samo, a masz lepszą perspektywę na całą ceremonię. Przyjdź 15 minut wcześniej, żeby zająć miejsce przy barierce po prawej stronie (patrząc na morze).
</div>

<h2>Kiedy Najlepiej?</h2>
<ul>
<li><strong>Rano (przed 10:00):</strong> Pusto, cisza, idealne światło do zdjęć.</li>
<li><strong>Południe (12:00):</strong> Tłum, armaty, dym. Fajne show, ale ciasno.</li>
<li><strong>Zachód słońca:</strong> Kamienne mury Trzech Miast naprzeciwko łapią złoty kolor. Najbardziej romantyczny moment dnia.</li>
</ul>

<h3>Jak Tu Trafić?</h3>
<p>Ogrody są na samym końcu Valletty. Jeśli przypłynęłaś promem ze Sliemy, wjedź na górę windą <strong>Barrakka Lift</strong> (€1 za wjazd, zjazd darmowy). Jeśli idziesz pieszo, kieruj się na Castille Place (ten wielki budynek, gdzie urzęduje premier) i skręć w prawo.</p>
`
    },
    {
        slug: 'pl-malta-filmowa-game-of-thrones',
        subtitle: 'Gra o Tron, Gladiator, Troja. Gdzie kręcono Twoje ulubione filmy na Malcie?',
        body_html: `
<p>Malta to jedno wielkie studio filmowe pod gołym niebem. 300 dni słońca, podatki przyjazne dla Hollywood i twierdze, które grają wszystko — od starożytnego Rzymu po Westeros. Jeśli masz wrażenie, że "gdzieś już to widziałeś", to pewnie masz rację.</p>

<h2>Miejsca, Które Znasz z Ekranu</h2>

<h3>1. Gra o Tron (Game of Thrones)</h3>
<p>Zanim produkcja przeniosła się do Chorwacji, to Malta była Królewską Przystanią (King's Landing). I to tutaj Daenerys brała ślub (i traciła ubrania).</p>
<ul>
<li><strong>Brama Mdiny:</strong> To tędy Catelyn Stark wjeżdżała do King's Landing w 1. sezonie.</li>
<li><strong>Fort Ricasoli:</strong> Czerwona Twierdza (Red Keep).</li>
<li><strong>San Anton Gardens:</strong> Ogrody Czerwonej Twierdzy (tam, gdzie Joffrey był... sobą).</li>
<li><strong>Azure Window (Gozo):</strong> Tło ślubu Daenerys i Khal Drogo. Niestety, okno runęło do morza, ale miejsce wciąż jest magiczne.</li>
</ul>

<h3>2. Gladiator</h3>
<p>Pamiętasz sceny na arenie? "Are you not entertained?!" — krzyczał Russell Crowe. Część z nich (te w "Rzymie") kręcono w <strong>Fort Ricasoli</strong> przy wejściu do Grand Harbour. Zbudowano tam replikę Koloseum (częściowo cyfrową, ale jednak).</p>

<h3>3. Troja (Troy)</h3>
<p>Brad Pitt biegał po <strong>Fort Ricasoli</strong> (znowu!), który udawał mury Troi. A plaża, na której lądowali Grecy? To <strong>Golden Bay</strong> i <strong>Blue Lagoon</strong>. Tak, Achilles plażował na Comino.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Jeśli jesteś fanem "Gry o Tron", jedź do Mdiny. To tam najłatwiej poczuć klimat serialu. Wąskie uliczki, kamienne mury — to gotowe scenografie. Nawet bez smoków robią wrażenie.
</div>

<h2>Malta Film Studios: Woda na Życzenie</h2>
<p>W Kalkara znajdują się słynne <strong>Mediterranean Film Studios</strong>. Mają dwa ogromne baseny, które łączą się optycznie z horyzontem morza. Dzięki temu można kręcić sceny sztormów, bitew morskich i katastrof w kontrolowanych warunkach. Tu kręcono "Kapitana Phillipsa" i "Sztorm".</p>

<blockquote class="monika-quote">
Jeśli widzisz na filmie epicką bitwę morską, jest duża szansa, że tak naprawdę odbyła się w basenie na Malcie. Magia kina.
</blockquote>
`
    }
];

async function updateArticles() {
    for (const update of UPDATES) {
        const { error } = await supabase
            .from('articles')
            .update({
                body_html: update.body_html,
                subtitle: update.subtitle,
                updated_at: new Date().toISOString()
            })
            .eq('slug', update.slug);

        if (error) {
            console.error(\`Failed update for \${update.slug}:\`, error);
    } else {
      console.log(\`✅ Updated: \${update.slug}\`);
    }
  }
}

updateArticles();
