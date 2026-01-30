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
        slug: 'pl-palac-wielkiego-mistrza',
        subtitle: 'Gdzie urzędowali najpotężniejsi rycerze Europy. Zbroje, gobeliny i korytarze, w których słychać historię.',
        body_html: `
<p>To nie jest kolejny "zwykły" pałac. To siedziba władzy, która trzęsła Morzem Śródziemnym przez prawie 300 lat. Tutaj Wielcy Mistrzowie podejmowali decyzje o wojnach, tutaj knuto intrygi i tutaj Napoleon ukradł wszystko, co nie było przybite do podłogi (serio, zajęło mu to 6 dni).</p>

<p>Dziś urzęduje tu Prezydent Malty, ale duch Rycerzy wciąż jest obecny. Widać go w zbrojach, słychać na marmurowych posadzkach i czuć w powietrzu.</p>

<h2>Zbrojownia: Chłopcy i Ich Zabawki</h2>
<p>Jeśli myślisz, że zbroje są nudne, wejdź do <strong>Palace Armoury</strong>. To jedna z największych kolekcji na świecie. 5000 eksponatów. Są tu zbroje, które ważyły 40 kg (spróbuj w tym walczyć w 30-stopniowym upale), są pistolety, armaty i miecze.</p>

<div class="monika-tip">
<strong>💡 MONIKA POLECA:</strong>
Poszukaj zbroi Wielkiego Mistrza Alofa de Wignacourta. Jest pozłacana i wygląda jak garnitur od Armaniego w wersji metalowej. To definicja "power dressing".
</div>

<h2>State Rooms: Przepych do Potęgi</h2>
<p>Sale reprezentacyjne (State Rooms) to miejsce, gdzie przyjmowano królów i ambasadorów. Rycerze musieli pokazać, że są bogaci i potężni. I pokazali.</p>

<ul>
<li><strong>Korytarz Gobelinów:</strong> Uważaj, bo można dostać zawrotu głowy. Ściany są pokryte gigantycznymi, XVIII-wiecznymi gobelinami przedstawiającymi "Egzotyczny Nowy Świat" (słonie, nosorożce, Indianie). Są bezcenne.</li>
<li><strong>Sala Tronowa:</strong> Freski pod sufitem opowiadają historię Wielkiego Oblężenia 1565. To taki komiks historyczny dla arystokracji.</li>
</ul>

<h2>Praktycznie</h2>
<p>Pałac znajduje się w samym sercu Valletty, na St. George's Square (tam gdzie fontanny tryskają z chodnika). Wstęp kosztuje €10, ale warto. To nie jest muzeum, w którym wieje nudą. To jest "Gra o Tron" w realu.</p>

<blockquote class="monika-quote">
Uwaga: Czasem State Rooms są zamknięte, bo Prezydent przyjmuje gości. Sprawdź na stronie Heritage Malta przed wizytą. Jeśli są zamknięte, Zbrojownia jest zazwyczaj otwarta (i tańsza).
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
            console.error('Failed update for ' + update.slug + ':', error);
        } else {
            console.log('✅ Updated: ' + update.slug);
        }
    }
}

updateArticles();
