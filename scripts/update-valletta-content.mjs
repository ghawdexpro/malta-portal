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

const NEW_BODY_HTML = `
<p>Valletta to nie jest miasto do "zwiedzania" z nosem w przewodniku. To twierdza, w której każdy kamień mógłby opowiedzieć historię o oblężeniach, intrygach i rycerzach, którzy wcale nie byli tacy święci. Zbudowana przez dżentelmenów dla dżentelmenów? Może kiedyś. Dziś to tętniące życiem serce wyspy, gdzie barok miesza się z nowoczesnością, a turyści z politykami.</p>

<p>Zapomnij o nudnych datach. Pokażę Ci Vallettę moimi oczami — miejsca, gdzie naprawdę warto się zatrzymać, i te, które możesz sobie darować, chyba że lubisz tłumy.</p>

<h2>Grand Harbour — Widok, Który Zwala z Nóg</h2>
<p>Zacznijmy od konkretów. Jeśli masz zobaczyć w Valletcie tylko jedną rzecz, niech to będzie widok na Grand Harbour. To nie jest zwykły port. To naturalna scena dramatu z 1565 roku, kiedy garstka rycerzy i Maltańczyków powstrzymała potęgę Imperium Osmańskiego. Stojąc tutaj, czujesz tę potęgę.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Nie idź tam w południe, chyba że chcesz się usmażyć. Najlepsze światło (i najmniej ludzi) jest wcześnie rano lub tuż przed zachodem słońca. Wtedy kamienne mury Trzech Miast naprzeciwko dosłownie płoną na złoto.
</div>

<h2>Upper Barrakka Gardens — Klasyk, Ale Warto</h2>
<p>Tak, są tam wszyscy. Tak, jest tłoczno. Ale widok z tarasu na Trzy Miasta (Birgu, Senglea, Cospicua) wynagradza wszystko. To tutaj robi się te pocztówkowe zdjęcia.</p>

<blockquote class="monika-quote">
"Rozsądny zwiedzający powinien co jakiś czas przycupnąć" — mawiał klasyk. W Upper Barrakka możecie przycupnąć z klasą.
</blockquote>

<p>Codziennie o 12:00 i 16:00 odbywa się ceremonia <strong>Saluting Battery</strong>. Działa strzelają, turyści wiwatują. Czy warto płacić za zejście na dół bliżej dział? Moim zdaniem nie. Z górnego tarasu widać wszystko idealnie, a zaoszczędzone Euro lepiej wydać na pastizzi.</p>

<h3>Ulice Valletty: Republic vs Merchant</h3>
<p>Miasto ma dwie główne tętnice. <strong>Republic Street</strong> to wybieg próżności — sklepy, kawiarnie, tłum. Fajna na spacer, żeby poczuć gwar, ale na kawę? Zapłacisz "podatek turystyczny".</p>

<p>Równoległa <strong>Merchant Street</strong> jest ciekawsza. Zwróć uwagę na <em class="text-malta-gold font-bold">Gallarija</em> — te kolorowe, drewniane balkony. Kiedyś służyły kobietom do podglądania ulicy bez bycia widocznianymi (trochę jak dzisiejszy Instagram, tylko analogowy). Dziś są symbolem Malty.</p>

<h2>Strait Street — Gdzie Grzeczni Chłopcy Nie Chodzili</h2>
<p>Moje ulubione miejsce z historią "z pazurem". Kiedyś znana jako "The Gut" (Wnętrzności), była centrum rozpusty dla marynarzy. Dziś? To najbardziej hipsterska ulica w mieście. Świetne bary koktajlowe, muzyka na żywo i klimat, którego nie znajdziesz na głównej ulicy.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Wpadnij wieczorem do <em>Yard 32</em> na gin z tonikiem (mają ich setki rodzajów) albo do <em>Tico Tico</em>, żeby poczuć ducha dawnej Strait Street. To tutaj bije nocne serce Valletty.
</div>

<h2>Praktycznie i Bez Bólu</h2>
<ul>
<li><strong>Dojazd:</strong> Zapomnij o samochodzie. Parkowanie w Valletcie to sport ekstremalny dla masochistów. Bierz autobus (wszystkie drogi prowadzą do Valletty) albo prom ze Sliemy (piękne widoki w cenie biletu).</li>
<li><strong>Buty:</strong> Valletta to "miasto zbudowane przez dżentelmenów dla dżentelmenów", ale chyba nie dla kobiet w szpilkach. Chodniki są śliskie, a schody strome. Płaskie buty albo trampki — podziękujesz mi później.</li>
<li><strong>Jedzenie:</strong> Omijaj restauracje naganiaczy z menu w 10 językach. Szukaj małych knajpek w bocznych uliczkach.</li>
</ul>
`;

const NEW_SUBTITLE = 'Twierdza rycerzy, nocne życie na Strait Street i widoki za które warto umrzeć. Przewodnik bez nudzenia.';

async function updateArticle() {
    const { error } = await supabase
        .from('articles')
        .update({
            body_html: NEW_BODY_HTML,
            subtitle: NEW_SUBTITLE,
            updated_at: new Date().toISOString()
        })
        .eq('slug', 'pl-valletta-sladami-maklowicza');

    if (error) {
        console.error('Update failed:', error);
    } else {
        console.log('Successfully updated article: Valletta');
    }
}

updateArticle();
