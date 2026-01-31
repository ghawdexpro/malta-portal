import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";

export const revalidate = 300;

async function getStats() {
  const supabase = createServiceClient();
  const [posts, articles, stops] = await Promise.all([
    supabase.from("raw_posts").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("maklowicz_stops")
      .select("id", { count: "exact", head: true }),
  ]);
  return {
    posts: posts.count ?? 0,
    articles: articles.count ?? 0,
    stops: stops.count ?? 0,
  };
}

async function getLatestArticles() {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "id, slug, title, subtitle, topic, cover_image, published_at, source_count"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

const EXPERIENCE_CARDS = [
  {
    title: "Restauracje i Jedzenie",
    subtitle: "Gdzie naprawdę jedzą miejscowi",
    image:
      "/images/monika/page/experience_food.png",
    topic: "restaurants",
  },
  {
    title: "Plaże i Pływanie",
    subtitle: "Krystalicznie czyste wody",
    image:
      "/images/monika/page/experience_beach.png",
    topic: "beaches",
  },
  {
    title: "Zwiedzanie",
    subtitle: "Starożytna historia czeka",
    image:
      "/images/monika/page/experience_sightseeing.png",
    topic: "sightseeing",
  },
  {
    title: "Transport i Dojazd",
    subtitle: "Autobusy, promy i porady",
    image:
      "/images/monika/page/experience_transport.png",
    topic: "transport",
  },
  {
    title: "Noclegi",
    subtitle: "Najlepsze miejsca na nocleg",
    image:
      "/images/monika/page/experience_accommodation.png",
    topic: "accommodation",
  },
  {
    title: "Ceny i Budżet",
    subtitle: "Prawdziwe koszty od prawdziwych turystów",
    image:
      "/images/monika/page/experience_prices.png",
    topic: "prices",
  },
];

export default async function Home() {
  const [stats, articles] = await Promise.all([getStats(), getLatestArticles()]);

  return (
    <div>
      {/* ===== HERO — Full-bleed cinematic ===== */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/monika/page/hero_harbour.png')",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/60 via-malta-dark/30 to-malta-dark/80" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
            Inteligencja Podróżnicza AI
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
            Odkryj Maltę
            <br />
            <span className="text-malta-gold">Oczami Prawdziwych Ludzi</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Wiedza z tysięcy prawdziwych doświadczeń turystycznych — analizowana przez AI,
            zebrana z polskich społeczności internetowych.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/pl/articles"
              className="rounded-full bg-malta-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-malta-gold/30"
            >
              Przeglądaj Artykuły
            </Link>
            <Link
              href="/pl/maklowicz"
              className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-malta-gold hover:text-malta-gold"
            >
              Przewodnik Makłowicza
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative -mt-16 z-20 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-2xl bg-white shadow-2xl">
          {[
            {
              value: stats.posts,
              label: "Posty Społeczności",
              color: "text-malta-blue",
            },
            {
              value: stats.articles,
              label: "Artykuły AI",
              color: "text-malta-gold",
            },
            {
              value: stats.stops,
              label: "Przystanki Makłowicza",
              color: "text-malta-charcoal",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center py-8 ${i > 0 ? "border-l border-gray-100" : ""}`}
            >
              <span className={`text-4xl font-extrabold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCE CARDS — visitmalta style ===== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-malta-blue">
            Wiedza Społeczności
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-malta-dark">
            Co Naprawdę Mówią Turyści
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-500">
            Prawdziwe spostrzeżenia zebrane z polskich społeczności turystycznych,
            przeanalizowane i uporządkowane przez AI.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE_CARDS.map((card) => (
            <Link
              key={card.topic}
              href={`/pl/articles?topic=${card.topic}`}
              className="card-hover img-overlay group relative flex min-h-[320px] items-end overflow-hidden rounded-2xl"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative z-10 p-6 text-white">
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="mt-1 text-sm text-white/70">{card.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      <section className="bg-malta-stone py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-malta-blue">
                Najnowsze
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-malta-dark">
                Artykuły Generowane przez AI
              </h2>
            </div>
            <Link
              href="/pl/articles"
              className="text-sm font-semibold text-malta-blue hover:text-malta-blue-light transition-colors"
            >
              Zobacz wszystkie &rarr;
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="mt-10 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
              <div className="text-5xl">&#128221;</div>
              <p className="mt-4 text-lg font-semibold text-gray-400">
                Brak artykułów
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Artykuły pojawią się, gdy system AI przetworzy dane społeczności
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/pl/articles/${article.slug}`}
                  className="card-hover group overflow-hidden rounded-2xl bg-white"
                >
                  {article.cover_image ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-malta-blue/20 to-malta-gold/20" />
                  )}
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-malta-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-malta-blue">
                      {article.topic}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-malta-dark group-hover:text-malta-blue transition-colors">
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                        {article.subtitle}
                      </p>
                    )}
                    <p className="mt-4 text-xs font-medium text-gray-400">
                      Na podstawie {article.source_count} postów społeczności
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== MAKLOWICZ FEATURE BANNER ===== */}
      <section className="relative overflow-hidden py-0">
        <div className="grid md:grid-cols-2">
          {/* Left: Image + Quote overlay */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-malta-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <blockquote className="text-lg italic text-white/90">
                &ldquo;Kuchnia maltańska to najlepszy sposób, żeby zrozumieć historię tej wyspy — każde danie opowiada o innym zdobywcy.&rdquo;
              </blockquote>
              <p className="mt-2 text-sm font-semibold text-malta-gold">
                — Robert Makłowicz, Odcinek 260
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center bg-malta-dark px-10 py-16 md:px-16">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-malta-gold text-malta-dark font-black text-lg">
              RM
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
              Interaktywny Przewodnik Wideo
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Podążaj za Robertem Makłowiczem
              <br />
              Po Malcie
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Legendarny polski twórca kulinarno-podróżniczy odkrywał ukryte kulinarne
              perły Malty w 3 odcinkach. Nasz przewodnik zorganizowany przez AI pozwala
              śledzić jego podróż — z <strong className="text-white/80">wideo z minutami</strong>, oryginalnymi polskimi cytatami,
              interaktywnymi mapami i rekomendacjami lokalnego jedzenia.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/40">
              <span>3 Odcinki</span>
              <span>&bull;</span>
              <span>16 Lokalizacji</span>
              <span>&bull;</span>
              <span>Każdy przystanek z minutą</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/pl/maklowicz"
                className="inline-flex items-center gap-2 rounded-full bg-malta-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-malta-gold/30"
              >
                Odkryj Podróż
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/pl/maklowicz/map"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white/80 transition-all hover:border-malta-gold hover:text-malta-gold"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                Mapa Interaktywna
              </Link>
              <a
                href="https://youtube.com/watch?v=0XsoarB0dhQ&t=40"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white/80 transition-all hover:border-malta-gold hover:text-malta-gold"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Oglądaj Odcinek 1
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAKLOWICZ QUOTES TICKER ===== */}
      <section className="bg-malta-stone py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-malta-blue">
            Makłowicz o Malcie
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu, a każdy zaułek opowiada inną historię.",
                location: "Valletta",
                ep: "Odc. 260",
              },
              {
                quote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
                location: "Gozo",
                ep: "Odc. 261",
              },
              {
                quote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
                location: "Mdina",
                ep: "Odc. 262",
              },
            ].map((item) => (
              <blockquote
                key={item.location}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm italic leading-relaxed text-gray-600">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs font-bold text-malta-dark">
                    — R. Makłowicz, {item.location}
                  </p>
                  <span className="text-xs text-gray-400">{item.ep}</span>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY CTA ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-malta-blue">
            Napędzane Społecznością
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-malta-dark">
            Prawdziwi Ludzie, Prawdziwe Doświadczenia
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 leading-relaxed">
            Każdy artykuł w tym portalu jest generowany z prawdziwych dyskusji
            w polskich społecznościach turystycznych. Nasze AI czyta, analizuje i porządkuje
            tysiące postów i komentarzy — wzbogaconych o spostrzeżenia z filmów Roberta Makłowicza
            — więc dostajesz najbardziej autentyczne porady podróżnicze.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pl/articles"
              className="rounded-full bg-malta-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-malta-blue-light hover:shadow-lg"
            >
              Zacznij Eksplorować
            </Link>
            <Link
              href="/pl/maklowicz"
              className="rounded-full border-2 border-malta-dark/20 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:border-malta-gold hover:text-malta-gold"
            >
              Podróż Makłowicza
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
