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
        slug: 'pl-barok-maltanski-koscioly',
        subtitle: 'Dlaczego na Malcie jest więcej złota niż w Watykanie i gdzie zrobić najlepsze zdjęcie.',
        body_html: `
<p>Na Malcie jest <strong>365 kościołów</strong>. Tak, jeden na każdy dzień roku (i jeden na rok przestępny, jeśli dobrze poszukasz). Ale spokojnie, nie będę Cię ciągnąć do wszystkich. Większość z nich jest piękna, ale kilka... kilka to absolutny kosmos.</p>

<p>Maltański barok to nie jest nudna lekcja historii. To teatr. To przepych. To rycerze, którzy mieli za dużo pieniędzy i za duże ego, więc ścigali się, kto zbuduje lepszą kaplicę.</p>

<h2>Konkatedra św. Jana: Złoto, Które Oślepia</h2>
<p>Z zewnątrz wygląda jak forteca. Nuda. Ale wchodzisz do środka i... zbierasz szczękę z podłogi. Każdy centymetr ściany, sufitu i podłogi jest pokryty złotem, marmurem albo sztuką. To nie kościół, to skarbiec.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Nie patrz tylko w górę. Spójrz pod nogi. Podłoga to 400 marmurowych nagrobków rycerzy. Każdy to dzieło sztuki z symbolami śmierci (czaszki, kości), które mają przypominać "MEMENTO MORI". Trochę upiorne, bardzo piękne.
</div>

<h3>Caravaggio: Morderca w Katedrze</h3>
<p>W oratorium wisi <strong>"Ścięcie św. Jana Chrzciciela"</strong>. To jedyny obraz, który Caravaggio kiedykolwiek podpisał (swoją krwią, bo czemu nie?). Facet był geniuszem, ale też mordercą, który uciekł na Maltę przed wyrokiem śmierci. Rycerze go przyjęli, zrobili rycerzem, a potem wtrącili do lochu. Typowa maltańska gościnność.</p>

<h2>Rotunda w Mosta: Cud czy Przypadek?</h2>
<p>Trzecia największa kopuła w Europie (po Rzymie i Londynie). Robi wrażenie, ale najlepsza historia zdarzyła się podczas II wojny światowej. Niemiecka bomba przebiła kopułę w czasie mszy, spadła między ludzi i... nie wybuchła. Cud? Wadliwy zapalnik? Nieważne. Maltańczycy wiedzą swoje.</p>

<blockquote class="monika-quote">
W zakrystii możesz zobaczyć replikę tej bomby. Wygląda niewinnie, ale pomyśl, że miała zrównać to miejsce z ziemią.
</blockquote>

<h2>Festa: Kiedy Święci Imprezują</h2>
<p>Jeśli jesteś na Malcie latem, trafisz na <strong>Festę</strong>. To nie jest procesja. To religijne techno-party. Orkiestry dęte, fajerwerki, konfetti i figura świętego niesiona przez tłum. </p>

<div class="monika-tip">
<strong>💡 CZEGO SZUKAĆ:</strong>
Sprawdź kalendarz "Festa Malta". Jeśli w pobliżu jest festa, idź tam wieczorem. Zobaczysz kościół oświetlony tysiącami żarówek i napijesz się piwa z proboszczem (no, prawie).
</div>
`
    },
    {
        slug: 'pl-birgu-vittoriosa-ukryta-perla',
        subtitle: 'Zapomnij o Valletcie. Prawdziwa historia Rycerzy (i najlepsze wino) jest tutaj.',
        body_html: `
<p>Wszyscy jadą do Valletty. I dobrze, niech jadą. Dzięki temu <strong>Birgu</strong> (Vittoriosa) zostaje dla nas. To tutaj tak naprawdę zaczęła się historia Rycerzy na Malcie. Zanim zbudowali Vallettę, mieszkali tutaj. Zanim odparli Turków, walczyli tutaj.</p>

<p>Birgu jest starsze, bardziej autentyczne i — nie bójmy się tego słowa — ładniejsze niż stolica. To labirynt uliczek, w którym chcesz się zgubić.</p>

<h2>Fort St. Angelo: Twierdza Nie do Zdobycia</h2>
<p>Ten kolos na końcu cypla to powód, dla którego Malta w ogóle istnieje. Gdyby padł w 1565 roku, historia Europy wyglądałaby inaczej. Dziś możesz go zwiedzać.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Wejdź na samą górę. Widok na Grand Harbour z tej strony jest lepszy niż z Valletty. Dlaczego? Bo z Birgu WIDZISZ Vallettę w całej okazałości. A turystów jest garstka.
</div>

<h2>Spacer po "Collachio"</h2>
<p>Stara dzielnica rycerska to <strong>Collachio</strong>. Tutaj czas się zatrzymał. Ludzie nadal wieszają pranie nad ulicą, a drzwi domów są otwarte. Cicho, spokojnie, magicznie.</p>

<h3>Inkwizytor w Pałacu</h3>
<p>W Birgu stoi <strong>Pałac Inkwizytora</strong>. Jedyny na świecie udostępniony do zwiedzania. Możesz zobaczyć salę sądową, cele więzienne (z oryginalnymi graffitti więźniów z XVII wieku!) i salę tortur. Brzmi mrocznie? Jest. Ale fascynująco.</p>

<h2>Dgħajsa: Wodne Taxi</h2>
<p>Jak dostać się do Birgu? Zapomnij o autobusie. W Valletcie (przy windzie Barrakka) zejdź na dół do portu i złap <strong>Dgħajsa</strong> (czyt. daj-sa). To tradycyjna mała łódka, taka maltańska gondola, ale z silnikiem.</p>

<blockquote class="monika-quote">
Za €2 przepłyniesz przez Grand Harbour. Wiatr we włosach, ręka w wodzie (żartuję, nie wkładaj ręki do portu). To najlepiej wydane 2 euro na Malcie.
</blockquote>

<h3>Gdzie Zjeść?</h3>
<p>Rynek w Birgu (Victory Square) jest pełen knajpek. Ale jeśli chcesz czegoś ekstra, idź na nabrzeże mariny. Jachty milionerów, stare mury i Ty z kieliszkiem Prosecco. Życie jest piękne.</p>
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
