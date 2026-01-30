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
        slug: 'pl-strait-street-maltanskie-pigalle',
        title: 'Strait Street — Najgrzeszniejsza Ulica Śródziemnomorza',
        subtitle: 'Kiedyś raj dla marynarzy, dziś mekka dla fanów koktajli. Historia ulicy, która nigdy nie śpi.',
        body_html: `
<p>Jeśli mury mogłyby mówić, te na <strong>Strait Street</strong> (Triq id-Dejqa) musiałyby zostać ocenzurowane. To najwęższa ulica w Valletcie, ale z najszerszą historią. Przez lata była znana jako "The Gut" (Wnętrzności) — miejsce, gdzie brytyjscy marynarze szukali... hm, rozrywki.</p>

<p>Dziś? To najbardziej hipsterski adres w mieście. Ale spokojnie, duch dawnej rozpusty wciąż tu jest, tylko teraz podają go w kieliszku do martini.</p>

<h2>Od Burdelu do Galerii Sztuki</h2>
<p>W latach 50. było tu ponad 60 barów i klubów. Jazz grał do rana, a whisky lała się strumieniami. Marynarze bili się o kobiety, a kobiety biły się o pieniądze. To był Dziki Zachód, tyle że na Morzu Śródziemnym.</p>

<p>Kiedy Brytyjczycy wyjechali w 1979 roku, ulica umarła. Stała się ciemnym zaułkiem, którego wszyscy unikali. Aż do teraz. Ktoś mądry stwierdził: "Hej, ta historia jest genialna, zróbmy tu biznes". I zrobili.</p>

<h2>Gdzie Warto Być (i Pić)</h2>
<ul>
<li><strong>Tico Tico:</strong> Legenda. Siedzi się na schodach na zewnątrz, pije wino i patrzy na tłum. Klimat jak z filmu Almodovara.</li>
<li><strong>Yard 32:</strong> Gin & Tapas bar. Mają chyba 200 rodzajów ginu. Jeśli powiesz, że nie lubisz ginu, to znaczy, że nie piłaś go tutaj.</li>
<li><strong>The Pub:</strong> Miejsce kultowe z innego powodu. To tutaj aktor Oliver Reed zmarł na zawał serca po wypiciu 8 piw, 12 podwójnych rumów i połowy butelki whisky (i wygraniu w siłowaniu na rękę z marynarzami). Szacunek.</li>
</ul>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Strait Street ożywa po 21:00. Wcześniej jest tu pusto. Przyjdź na kolację w okolicy (np. w Nenu the Artisan Baker na ftirę), a potem chodź tutaj na drinka. To idealne miejsce na "bar hopping" — jeden drink w jednym barze, drugi w kolejnym.
</div>
`
    },
    {
        slug: 'pl-fenek-krolik-maltanski',
        title: 'Fenek — Królik Po Maltańsku. Dlaczego Musisz Go Spróbować?',
        subtitle: 'Narodowe danie Malty to nie ryba, to królik. I smakuje jak... wolność. Serio.',
        body_html: `
<p>Na wyspie otoczonej morzem narodowym daniem powinna być ryba, prawda? A guzik. Na Malcie rządzi <strong>królik (Fenek)</strong>. I nie chodzi tylko o smak. Chodzi o politykę.</p>

<p>Kiedyś Rycerze zabronili Maltańczykom polować na króliki (zostawili je dla siebie, egoiści). Kiedy Rycerze zniknęli, naród rzucił się na króliki z widelcami w rękach. Do dziś zjedzenie "fenkata" (uczty z królika) to trochę taki środkowy palec pokazany historii.</p>

<h2>Jak To Smakuje?</h2>
<p>Zapomnij o suchym mięsie, które kojarzysz z dietetycznych obiadów. Maltański królik jest marynowany w winie, czosnku i ziołach, a potem duszony godzinami, aż sam spada z kości. Jest delikatny, aromatyczny i boski.</p>

<h3>3 Wersje Królika, Które Spotkasz:</h3>
<ol>
<li><strong>Stuffat tal-fenek (Gulasz):</strong> Królik w gęstym sosie pomidorowym z groszkiem i ziemniakami. Najbardziej klasyczna wersja. Sos jest tak dobry, że najpierw podają go z makaronem (spaghetti), a dopiero potem wjeżdża mięso.</li>
<li><strong>Fenek Moqli (Smażony):</strong> Marynowany w winie, a potem smażony na oliwie z gigantyczną ilością czosnku. Chrupiący i uzależniający.</li>
<li><strong>Spaghetti z sosem z królika:</strong> Opcja dla mniej odważnych, ale wciąż pyszna.</li>
</ol>

<div class="monika-tip">
<strong>💡 GDZIE ZJEŚĆ NAJLEPSZEGO?</strong>
Nie w Valletcie. Jedź do <strong>Mġarr</strong> (to taka wioska na północy, słynie z truskawek i królików) albo do <strong>Rabatu</strong>.
Polecam restaurację <em>United Restaurant</em> w Mġarr — wygląda jak stołówka z lat 90., ale jedzenie powala. Albo <em>Crystal Palace</em> w Rabacie (mają pastizzi, ale obok są świetne knajpy z królikiem).
</div>

<blockquote class="monika-quote">
Wskazówka: Fenek ma sporo małych kostek. To nie jest danie na pierwszą randkę, chyba że chcesz sprawdzić, jak Twój wybranek radzi sobie w trudnych sytuacjach.
</blockquote>
`
    },
    {
        slug: 'pl-kuchnia-maltanska-kompletny-przewodnik',
        title: 'Kuchnia Maltańska — Przewodnik Moniki (Nie Dla Tych na Diecie)',
        subtitle: 'Co zjeść na Malcie, żeby poczuć się jak lokalny? Pastizzi, ftira i owoce morza.',
        body_html: `
<p>Powiedzmy to sobie szczerze: na Maltę nie przyjeżdża się chudnąć. Kuchnia maltańska to dziecko kuchni włoskiej i arabskiej, które zostało adoptowane przez brytyjską babcię. Jest tłusto, jest węglowodanowo i jest pysznie.</p>

<h2>Święta Trójca Maltańskiego Street Foodu</h2>

<h3>1. Pastizzi</h3>
<p>To religia. Kruche ciasto francuskie (filo) nadziewane ricottą (serem) albo groszkiem (curry peas). Kosztuje ok. 50-60 centów. Jest tłuste, gorące i genialne.</p>
<div class="monika-tip"><strong>💡 Gdzie:</strong> Crystal Palace w Rabacie (niedaleko Mdiny). Biorą je tam politycy i taksówkarze.</div>

<h3>2. Ftira</h3>
<p>To nie jest zwykła kanapka. To okrągły chleb (jak opona), chrupiący z zewnątrz, miękki w środku, posmarowany "kunserva" (słodka pasta pomidorowa), z tuńczykiem, oliwkami, kaparami i cebulą. Wpisana na listę UNESCO. Serio, kanapka w UNESCO.</p>

<h3>3. Qassatat</h3>
<p>Kuzyn pastizzi, ale z kruchego ciasta (jak tarta). Wygląda jak mała sakiewka. Nadzienie: szpinak z tuńczykiem albo ricotta.</p>

<h2>Dania Główne</h2>
<ul>
<li><strong>Aljotta:</strong> Zupa rybna. Dużo czosnku, pomidorów, ryżu i oczywiście ryb. Kwintesencja morza w misce.</li>
<li><strong>Bragioli (Beef Olives):</strong> Myląca nazwa, bo nie ma tam oliwek. To zrazy wołowe nadziewane... mięsem mielonym, jajkiem i boczkiem. Mięso w mięsie.</li>
<li><strong>Lampuki (Dorado):</strong> Ryba narodowa. Dostępna jesienią. Najlepsza w cieście (Lampuki Pie).</li>
</ul>

<h2>A na Deser? Imqaret</h2>
<p>Smażone na głębokim tłuszczu ciastka z daktylami. Pachną anyżem i grzechem. Kupisz je na każdym targu i feście.</p>

<blockquote class="monika-quote">
Wskazówka: Zamawiając wodę w restauracji, zawsze proś o "local water". Inaczej dostaniesz importowaną (drogą) wodę, która smakuje tak samo. Oszczędzasz euro, ratujesz planetę.
</blockquote>
`
    },
    {
        slug: 'pl-porady-maklowicza-dla-turystow',
        title: '10 Praktycznych Porad: Jak Nie Zostać "Typowym Turystą"',
        subtitle: 'Omijaj pułapki, oszczędzaj euro i zwiedzaj Malter prosto z serca (i żołądka).',
        body_html: `
<p>Malta jest mała, ale łatwo się tu naciąć. Tłumy, upał i "turystyczne menu". Zebrałam dla Was 10 zasad, które uratują Wasz urlop.</p>

<h2>1. Wstawaj Rano. Serio.</h2>
<p>O 12:00 w Valletcie jest tłum i skwar. O 8:00 rano masz to miasto dla siebie. Zdjęcia bez ludzi? Tylko rano. Kawa w spokoju? Tylko rano.</p>

<h2>2. Autobusy są tanie, ale powolne</h2>
<p>Karta "Tallinja Card" (12 przejazdów za €15) to złoto. Ale uwaga: 5 km na mapie to czasem 40 minut jazdy autobusem. Bądź cierpliwa. Klimatyzacja zwykle działa tak mocno, że można zamarznąć. Weź bluzę.</p>

<h2>3. Nie jedz na Republic Street</h2>
<p>Główna ulica Valletty = ceny x2, jakość /2. Skręć w boczną uliczkę. Zejdź po schodach. Tam, gdzie siedzą dziadkowie w kaszkietach, tam dają dobrze jeść.</p>

<h2>4. Prom na Gozo</h2>
<p>Nie kupuj biletu, jak płyniesz NA Gozo. Płacisz dopiero WRACAJĄC. Taka niespodzianka. (€4.65 za osobę).</p>

<h2>5. Sjesta istnieje</h2>
<p>Mniejsze sklepy (poza marketami) zamykają się między 13:00 a 16:00. Nie walcz z tym. Idź na kawę.</p>

<h2>6. Gniazdka elektryczne</h2>
<p>Są brytyjskie (typ G, te z trzema bolcami). Weź przejściówkę! W hotelach często są USB, ale w Airbnb bywa różnie.</p>

<h2>7. Woda z kranu</h2>
<p>Jest bezpieczna, ale smakuje... dyskusyjnie (jest odsalana z morza). Do mycia zębów OK, do kawy kup butelkowaną.</p>

<h2>8. Napiwki</h2>
<p>Nie są obowiązkowe, ale mile widziane. 5-10% to standard, jeśli obsługa była miła. A Maltańczycy są zazwyczaj przemili.</p>

<h2>9. Uważaj na "białe taksówki"</h2>
<p>Tradycyjne białe taxi bywają drogie. Używaj aplikacji: <strong>Bolt</strong>, <strong>Uber</strong> albo <strong>eCabs</strong> (lokalna apka). Znasz cenę z góry i nie ma niespodzianek.</p>

<h2>10. Nie spiesz się ("Mela!")</h2>
<p>"Mela" to najważniejsze słowo na Malcie. Znaczy wszystko: "tak", "okej", "no dobra". Ale też oddaje filozofię życia. Powoli. Zdążysz. Jesteś na wakacjach.</p>
`
    },
    {
        slug: 'pl-st-pauls-bay-swiety-pawel',
        title: 'St. Paul’s Bay: Gdzie Apostoł Rozbił Statek (i Imprezę)',
        subtitle: 'Historia biblijnej katastrofy, która zmieniła Maltę w najbardziej katolicki kraj świata.',
        body_html: `
<p>Wyobraź sobie: jest rok 60 n.e. Sztorm jak diabli. Statek z 276 osobami na pokładzie rozbija się o skały. Wszyscy przeżywają (cud?), a na brzeg wychodzi facet, którego kąsi żmija, a on... otrzepuje rękę i idzie dalej. Tak św. Paweł wylądował na Malcie.</p>

<p>Dziś <strong>St. Paul's Bay</strong> (Zatoka św. Pawła) to turystyczne centrum Malty (Bugibba i Qawra), ale historia wciąż tu jest.</p>

<h2>Wyspa św. Pawła (St. Paul's Island)</h2>
<p>Na środku zatoki stoi mała wysepka z gigantycznym posągiem apostoła. To tam rzekomo osiadł statek. Możesz tam popłynąć łódką ("Luzzu") z portu w Bugibbie. Warto? Dla widoków tak. Wyspa jest pusta, surowa i fotogeniczna.</p>

<h2>Miejscowość vs. Zatoka</h2>
<p>Dzisiejsze miasteczko St. Paul's Bay to spokojniejsza część wielkiego trójmiasta (Bugibba-Qawra-St.Paul's). Jeśli szukasz:</p>
<ul>
<li><strong>Imprez i barów:</strong> Idź do Bugibby.</li>
<li><strong>Akwarium i ładnej promenady:</strong> Idź do Qawry.</li>
<li><strong>Lokalnego klimatu:</strong> Zostań w starej części St. Paul's Bay (okolice wieży Wignacourt).</li>
</ul>

<div class="monika-tip">
<strong>💡 CIEKAWOSTKA:</strong>
Maltańczycy są dumni, że to Paweł ich nawrócił. Dzięki temu (i dzięki wrakowi statku) są jednym z najbardziej katolickich narodów świata. 365 kościołów na wyspie wielkości Krakowa? To mówi samo za siebie.
</div>
`
    },
    {
        slug: 'pl-nurkowanie-malta-krystaliczne-wody',
        title: 'Nurkowanie na Malcie: Podwodny Plac Zabaw',
        subtitle: 'Woda 28 stopni, widoczność jak w basenie i wraki statków. Witaj w raju nurków.',
        body_html: `
<p>Jeśli boisz się rekinów, mam dobrą wiadomość: na Malcie ich nie ma (no, prawie, ale te co są, trzymają się z dala). Za to są wraki. Dużo wraków. Malta celowo zatapia stare statki, żeby nurkowie mieli co robić.</p>

<h2>Dlaczego Malta?</h2>
<ul>
<li><strong>Przejrzystość wody:</strong> Widzisz na 30-40 metrów. To jak latanie w powietrzu.</li>
<li><strong>Temperatura:</strong> Latem 26-28°C. W piance 3mm jest Ci ciepło. Zimą? 15°C, w suchym skafandrze da radę.</li>
<li><strong>Brak prądów:</strong> W większości miejsc jest spokojnie jak w wannie. Idealne dla początkujących.</li>
</ul>

<h2>Top 3 Miejscówki (Must-Dive)</h2>

<h3>1. Blue Hole (Gozo)</h3>
<p>Święty Graal nurków. Zaczynasz w naturalnym basenie skalnym, przepływasz pod łukiem (ok. 7m) i wylatujesz w głębię na otwartym morzu. Obok leżą resztki Azure Window. Magia.</p>

<h3>2. P29 Patrol Boat (Cirkewwa)</h3>
<p>Niemiecki kuter patrolowy zatopiony na 35 metrach. Stoi pionowo, ma działo maszynowe (oczywiście nie strzela), do którego można wpłynąć i zrobić sobie zdjęcie "Rambo pod wodą".</p>

<h3>3. Um El Faroud (Zurrieq)</h3>
<p>Gigant. 115-metrowy tankowiec. Pękł na pół podczas sztormu po zatopieniu, co tylko dodało mu uroku. Można wpłynąć do mostka kapitańskiego i do ładowni. Tylko dla zaawansowanych!</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Nigdy nie nurkowałaś? Malta to najlepsze miejsce na kurs <strong>OWD (Open Water Diver)</strong>. W 3-4 dni robisz licencję, która jest ważna na całym świecie. Koszt? Ok. 400-450 euro. Warto, bo pod wodą nikt nie dzwoni i nie pyta o deadline'y.
</div>
`
    },
    {
        slug: 'pl-wielkie-oblezenie-1565',
        title: 'Wielkie Oblężenie 1565: Jak 500 Facetów Zatrzymało Armię',
        subtitle: 'Krew, pot i kamienie. Historia bitwy, która ocaliła Europę i stworzyła tożsamość Malty.',
        body_html: `
<p>W szkole uczyli nas o Wiedniu 1683. Ale na Malcie rok 1565 jest ważniejszy niż data urodzin własnej matki. To wtedy ważyły się losy Europy. Sułtan Sulejman Wspaniały wysłał 40 tysięcy żołnierzy (Janczarów - ówczesnych Marines), żeby zdobyli małą, suchą skałę na środku morza.</p>

<p>Na skale czekało 500 Rycerzy i parę tysięcy Maltańczyków z widłami. Wynik wydawał się oczywisty. A jednak.</p>

<h2>3 Miesiące Piekła</h2>
<p>Turcy walili w mury dzień i noc. Odcięte głowy rycerzy wystrzeliwali z armat w stronę obrońców. Rycerze w rewanżu wystrzeliwali głowy jeńców tureckich. To nie była rycerska walka z bajek. To była rzeź.</p>

<h3>Fort St. Elmo: Termopile Malty</h3>
<p>Mały fort na cyplu miał paść w 3 dni. Bronił się miesiąc. Kiedy w końcu padł, Turcy wycięli wszystkich w pień. Ale stracili tyle czasu i amunicji, że to był początek ich końca.</p>

<h2>Zwycięstwo i Nowe Miasto</h2>
<p>Dzięki (fanatycznemu) oporowi i geniuszowi Wielkiego Mistrza <strong>Jean de Valette</strong> (ten starszy pan z brodą, którego pomnik stoi w Valletcie), Turcy odpłynęli z niczym. W Europie biły dzwony. Malta była gwiazdą.</p>

<p>De Valette stwierdził: "Nigdy więcej". I zbudował nowe miasto-twierdzę. Nazwał je od swojego nazwiska. Tak powstała <strong>Valletta</strong>.</p>

<blockquote class="monika-quote">
Kiedy spacerujesz po Valletcie, spójrz na mury. Są tak grube i wysokie nie dla ozdoby. One powstały, żeby przetrwać koniec świata. I wyglądają, jakby mogły.
</blockquote>

<div class="monika-tip">
<strong>💡 GDZIE POCZUĆ TE EMOCJE?</strong>
Idź do <strong>Fortu St. Elmo</strong> (dziś Muzeum Wojny). Zobaczysz zbroje z tamtych czasów (podziurawione kulami) i miecze, które naprawdę ścinały głowy. A z murów jest najlepszy widok na wejście do portu.
</div>
`
    }
];

async function updateBatch() {
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

updateBatch();
