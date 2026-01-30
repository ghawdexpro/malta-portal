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
        slug: 'pl-caravaggio-na-malcie',
        subtitle: 'Morderca, geniusz i rycerz. Gdzie znaleźć jedyny podpisany obraz Caravaggia na świecie.',
        body_html: `
<p>Caravaggio na Malcie to gotowy scenariusz na Netflixa. Uciekł z Rzymu przed wyrokiem śmierci (zabił człowieka w bójce o... tenisa? Mniej więcej). Potrzebował protekcji, a Zakon Maltański potrzebował celebryty malarza. Układ idealny.</p>

<p>Malta go przyjęła, zrobiła rycerzem, a on w podzięce namalował arcydzieło. A potem? Znowu się pobił, trafił do lochu, uciekł na Sycylię i został wyrzucony z Zakonu jako "członek zgniły i śmierdzący". Serio, tak to zapisali w kronikach.</p>

<h2>"Ścięcie św. Jana": Obraz, Który Krzyczy</h2>
<p>Wchodzisz do <strong>Oratorium konkatedry św. Jana</strong> i nagle robi się cicho. Na ścianie wisi gigantyczne płótno (ponad 5 metrów szerokości). To <em>"Ścięcie św. Jana Chrzciciela"</em>.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Zwróć uwagę na podpis. To jedyny obraz, który Caravaggio kiedykolwiek podpisał. Gdzie? W kałuży krwi wypływającej z szyi świętego. Podpisał się "f. Michelang..." (fra Michelangelo - brat zakonny). To był jego moment triumfu i pokory jednocześnie.
</div>

<h2>Gdzie Go Szukać?</h2>
<ul>
<li><strong>Konkatedra św. Jana (Valletta):</strong> Tu wiszą dwa obrazy: "Ścięcie" (Oratorium) i "Święty Hieronim piszący" (w tej samej sali). Bilet €15, ale to najlepiej wydane pieniądze na kulturę na Malcie.</li>
<li><strong>Fort St. Angelo (Birgu):</strong> Tutaj Caravaggio siedział w celi (Guva). Możesz zobaczyć dziurę w skale, w której go trzymali. Jak uciekł? Do dziś nikt nie jest pewien na 100%, ale liny i łódka były grane.</li>
</ul>

<blockquote class="monika-quote">
Stojąc przed tym obrazem, pamiętaj: patrzysz na dzieło mordercy, który malował świętych, używając prostytutek i żebraków jako modeli. To właśnie to napięcie między sacrum a profanum robi taką robotę.
</blockquote>
`
    },
    {
        slug: 'pl-mdina-ciche-miasto',
        subtitle: 'Miasto, w którym słychać Twoje myśli. Cisza, arystokracja i najlepsze ciasto czekoladowe na wyspie.',
        body_html: `
<p>Mdina to "Ciche Miasto" (Silent City). I to nie jest chwyt marketingowy. Tu naprawdę jest cicho. Samochody mają zakaz wjazdu (chyba że mieszkasz w pałacu), a na murach wiszą tabliczki proszące o ciszę.</p>

<p>Kiedyś była stolicą Malty. Kiedy przyszli Rycerze i wybrali port (Birgu/Valletta), arystokracja została w Mdinie, obrażona na cały świat. I tak im zostało. Do dziś mieszkają tu najstarsze rody na Malcie.</p>

<h2>Spacer w Przeszłość</h2>
<p>Mdina wygląda jak plan filmowy. Wąskie, kręte uliczki (zbudowane tak, żeby strzały łuczników nie mogły latać prosto — serio!), kamienne mury w kolorze miodu i te drzwi... Każde drzwi w Mdinie to dzieło sztuki.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Przyjedź tu wieczorem. Po 19:00 turyści jednokudniowi znikają. Latarnie gazowe (teraz elektryczne, ale wyglądają na stare) rzucają cienie, a Ty masz całe miasto dla siebie. To najbardziej romantyczne miejsce na wyspie.
</div>

<h2>Brama do Westeros</h2>
<p>Fani "Gry o Tron", poznajecie? Główna brama Mdiny to brama do King's Landing w 1. sezonie. To tędy Catelyn Stark wjeżdżała do miasta. Zrób sobie zdjęcie, ale błagam, nie blokuj mostu na pół godziny.</p>

<h2>Fontanella: Czekoladowa Rozpusta</h2>
<p>Nie można być w Mdinie i nie iść do <strong>Fontanella Tea Garden</strong>. To instytucja. Siedzi się na murach obronnych, patrząc na połowę wyspy, i je ciasto.</p>

<blockquote class="monika-quote">
Ich ciasto czekoladowe jest legendarne. Jest wielkie, słodkie i wchodzi w biodra od samego patrzenia. Warto.
</blockquote>

<h2>Rabat: Życie za Murami</h2>
<p>Zaraz za bramą Mdiny jest <strong>Rabat</strong> (przedmieście). Tu toczy się normalne życie. Tu zjesz najlepsze pastizzi na Malcie w <strong>Crystal Palace (Serkin)</strong>. Otwarta prawie całą dobę, zawsze pełna taksówkarzy i polityków. To znak jakości.</p>
`
    },
    {
        slug: 'pl-rycerze-maltanscy-historia',
        subtitle: 'Kim byli faceci z krzyżem na piersiach? Szpitalnicy, piraci i budowniczowie w jednym.',
        body_html: `
<p>Nie da się zrozumieć Malty bez Rycerzy. Byli tu przez 268 lat i zmienili jałową skałę w twierdzę, której bała się cała Europa (i Imperium Osmańskie). Zostawili po sobie Vallettę, szpitale i ten słynny ośmioramienny krzyż.</p>

<h2>Szpital czy Armia? Jedno i Drugie</h2>
<p>Zaczynali w Jerozolimie jako szpitalnicy – opiekowali się chorymi pielgrzymami. Ale szybko zrozumieli, że w Ziemi Świętej trzeba umieć machać mieczem. Skutek? Stali się elitarną jednostką specjalną średniowiecza.</p>

<p>Na Maltę trafili trochę z przymusu (Cesarz Karol V dał im wyspę w zamian za... jednego sokoła rocznie. Najlepszy deal w historii nieruchomości). Maltańczycy nie byli zachwyceni, ale Rycerze szybko pokazali, że potrafią się bić.</p>

<h2>Wielkie Oblężenie 1565: High Noon Europy</h2>
<p>To tutaj Rycerze przeszli do legendy. 40 tysięcy Turków kontra 700 rycerzy i garstka Maltańczyków. Szanse? Żadne. A jednak wytrzymali 4 miesiące piekła.</p>

<blockquote class="monika-quote">
Jean de Valette, Wielki Mistrz (miał wtedy 70 lat!), walczył w pierwszym szeregu na moście w Birgu. Taki to był typ człowieka.
</blockquote>

<h2>Koniec Imprezy</h2>
<p>Po latach chwały Rycerze trochę... zgnuśnieli. Zaczęli żyć luksusowo, pili, grali w karty i piracili na morzu (tak, oficjalnie nazywali to "corso", ale to było piractwo). Kiedy Napoleon przypłynął w 1798 roku, poddali się bez walki. Wielki Mistrz Hompesch spakował walizki i Rycerze zniknęli z wyspy.</p>

<h2>Co Po Nich Zostało?</h2>
<ul>
<li><strong>Auberges (Zajazdy):</strong> W Valletcie każdy "język" (narodowość) miał swój pałac. Dziś Auberge de Castille to biuro premiera.</li>
<li><strong>Szpitale:</strong> Sacra Infermeria (dziś centrum konferencyjne) w Valletcie miała najnowocześniejszy szpital w Europie. Jedli tam ze srebrnych naczyń, żeby było higieniczniej!</li>
<li><strong>Krzyż Maltański:</strong> Symbol 8 błogosławieństw... albo 8 cnot. Dziś znajdziesz go na każdym magnesie, autobusie i monecie euro.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA TŁUMACZY:</strong>
Zakon istnieje do dziś! Mają siedzibę w Rzymie, wydają własne paszporty i znaczki, ale nie mają państwa. To taki suwerenny byt bez ziemi. Czasem można spotkać Kawalerów Maltańskich w czarnych pelerynach na oficjalnych uroczystościach w Valletcie.
</div>
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
            console.error('Failed update for ' + update.slug + ':', error);
        } else {
            console.log('✅ Updated: ' + update.slug);
        }
    }
}

updateArticles();
