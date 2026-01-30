import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

// Maklowicz video clips mapped to article topics
const MAKLOWICZ_CLIPS: Record<
  string,
  { youtube_id: string; timestamp: number; label: string; quote: string }[]
> = {
  restaurants: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 922,
      label: "Makłowicz odkrywa restauracje Valletty",
      quote: "Kuchnia maltańska to najlepszy sposób, żeby zrozumieć historię tej wyspy.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 1964,
      label: "Makłowicz próbuje fenka (królika) w Rabacie",
      quote: "Królik po maltańsku to nie tylko danie — to akt buntu i smak wolności.",
    },
  ],
  beaches: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1048,
      label: "Makłowicz płynie na Gozo i Comino",
      quote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
    },
  ],
  sightseeing: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 40,
      label: "Makłowicz odkrywa historię Valletty",
      quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu.",
    },
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 1867,
      label: "Wewnątrz Konkatedry św. Jana z Caravaggio",
      quote: "Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 926,
      label: "Makłowicz wchodzi do Mdiny — Cichego Miasta",
      quote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
    },
  ],
  transport: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1048,
      label: "Prom na Gozo",
      quote: "Płyniemy na Gozo. Nie jest to specjalnie wycieńczający rejs, bo trwa około 25 minut.",
    },
  ],
  accommodation: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 926,
      label: "Makłowicz w pałacu w Mdinie",
      quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować.",
    },
  ],
  gozo: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1048,
      label: "Makłowicz przybywa na Gozo",
      quote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
    },
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1364,
      label: "Odkrywanie twierdzy Cytadela",
      quote: "Z Cytadeli widać całe Gozo jak na dłoni.",
    },
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1567,
      label: "Kuchnia Gozo i rynek w Victorii",
      quote: "Gozo to wyspa, gdzie jedzenie nadal smakuje tak, jak powinno — prosto, uczciwie, z serca.",
    },
  ],
  events: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 2570,
      label: "Makłowicz doświadcza Mdiny nocą",
      quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować — cisza, światło i wieczność w kamieniu.",
    },
  ],
  tips: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 425,
      label: "Porada Makłowicza: odpoczynek w Upper Barrakka",
      quote: "Rozsądny zwiedzający powinien co jakiś czas przycupnąć, a do tego przycupnięcia wybierać miejsca, w których siedząc również można zwiedzać.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: "Obowiązkowe pastizzi",
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju.",
    },
  ],
  prices: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: "Pastizzi — maltańskie street food za €0,50",
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie — za pięćdziesiąt centów jesteś w raju.",
    },
  ],
  // Maklowicz-themed article topics
  valletta: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 40,
      label: "Makłowicz spaceruje po Valletcie",
      quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu.",
    },
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 425,
      label: "Upper Barrakka Gardens",
      quote: "Rozsądny zwiedzający powinien co jakiś czas przycupnąć.",
    },
  ],
  mdina: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 926,
      label: "Makłowicz wchodzi do Cichego Miasta",
      quote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 2570,
      label: "Mdina nocą",
      quote: "Mdina nocą to najpiękniejsze pożegnanie, jakie Malta może zaoferować.",
    },
  ],
  caravaggio: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 1867,
      label: "Caravaggio w Konkatedrze św. Jana",
      quote: "Caravaggio uciekał przed wyrokiem śmierci, a na Malcie stworzył dzieło, które przetrwało wieki.",
    },
  ],
  cuisine: [
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 335,
      label: "Pastizzi — ikona kuchni maltańskiej",
      quote: "Pastizzi to najprostsze i najbardziej demokratyczne danie na Malcie.",
    },
    {
      youtube_id: "4lWogQhHrwA",
      timestamp: 1964,
      label: "Fenek — królik po maltańsku",
      quote: "Królik po maltańsku to nie tylko danie — to akt buntu i smak wolności.",
    },
  ],
  knights: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 1200,
      label: "Pałac Wielkiego Mistrza",
      quote: "Rycerze Maltańscy to jedni z najciekawszych graczy w historii Europy.",
    },
  ],
  birgu: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 40,
      label: "Makłowicz odkrywa Birgu",
      quote: "Birgu to miejsce, gdzie rycerze maltańscy naprawdę mieszkali — zanim zbudowali Vallettę.",
    },
  ],
  wine: [
    {
      youtube_id: "-twfeQBhjcY",
      timestamp: 1567,
      label: "Wino i lokalne produkty na Gozo",
      quote: "Gozo to wyspa, gdzie jedzenie nadal smakuje tak, jak powinno.",
    },
  ],
  history: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 40,
      label: "7000 lat historii Malty",
      quote: "Malta to miejsce, gdzie historia napisana jest w kamieniu.",
    },
  ],
  fortifications: [
    {
      youtube_id: "0XsoarB0dhQ",
      timestamp: 1200,
      label: "Fortyfikacje Valletty",
      quote: "Te mury pamiętają Wielkie Oblężenie — i do dziś stoją niewzruszenie.",
    },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, subtitle, cover_image, topic")
    .eq("slug", slug)
    .single();

  if (!article) return { title: "Artykuł Nie Znaleziony" };

  return {
    title: `${article.title} | Portal Turystyczny Malta`,
    description: article.subtitle ?? article.title,
    openGraph: {
      title: article.title,
      description: article.subtitle ?? article.title,
      type: "article",
      images: article.cover_image ? [{ url: article.cover_image, width: 1200, height: 630 }] : [],
      siteName: "Portal Turystyczny Malta",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle ?? article.title,
      images: article.cover_image ? [article.cover_image] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const supabase = createServiceClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) notFound();

  const clips = MAKLOWICZ_CLIPS[article.topic] ?? [];
  const shareUrl = `https://malta-portal-production.up.railway.app/pl/articles/${slug}`;
  const shareText = `${article.title} — Portal Turystyczny Malta`;

  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        {article.cover_image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${article.cover_image}')` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-malta-blue to-malta-gold" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/60 via-malta-dark/30 to-malta-dark/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            {article.topic}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-white/70">{article.subtitle}</p>
          )}
          <div className="mt-5 flex items-center gap-6 text-sm text-white/50">
            <span>{article.source_count} źródeł</span>
            <span>&#8226;</span>
            <span>{Math.round(article.avg_confidence)}% pewności</span>
            {article.published_at && (
              <>
                <span>&#8226;</span>
                <span>
                  {new Date(article.published_at).toLocaleDateString("pl-PL", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Breadcrumb + Share */}
        <div className="flex items-center justify-between">
          <Link
            href="/pl/articles"
            className="text-sm font-semibold text-malta-blue hover:text-malta-blue-light transition-colors"
          >
            &larr; Wszystkie Artykuły
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Udostępnij</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-malta-stone text-malta-charcoal hover:bg-malta-blue hover:text-white transition-all"
              title="Udostępnij na Facebooku"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-malta-stone text-malta-charcoal hover:bg-malta-dark hover:text-white transition-all"
              title="Udostępnij na X"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-malta-stone text-malta-charcoal hover:bg-emerald-600 hover:text-white transition-all"
              title="Udostępnij na WhatsApp"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        {/* Article Body */}
        <div
          className="prose prose-lg mt-10 max-w-none prose-headings:font-extrabold prose-headings:text-malta-dark prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-malta-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-malta-dark prose-li:text-gray-600 prose-table:text-sm prose-th:bg-malta-stone prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border-b prose-td:border-gray-100"
          dangerouslySetInnerHTML={{ __html: article.body_html ?? "" }}
        />

        {/* Maklowicz Video Section */}
        {clips.length > 0 && (
          <section className="mt-16 rounded-2xl bg-malta-dark p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-malta-gold text-malta-dark font-black text-sm">
                RM
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  Robert Makłowicz o Tym Temacie
                </h3>
                <p className="text-xs text-white/50">
                  Obejrzyj fragmenty z jego podróży po Malcie
                </p>
              </div>
            </div>

            <div className={`mt-6 grid gap-4 ${clips.length > 1 ? "md:grid-cols-2" : ""}`}>
              {clips.map((clip, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${clip.youtube_id}?start=${clip.timestamp}`}
                      title={clip.label}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="bg-malta-charcoal p-4">
                    <p className="text-sm font-semibold text-white">{clip.label}</p>
                    <p className="mt-1 text-xs italic text-malta-gold/80">
                      &ldquo;{clip.quote}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/pl/maklowicz"
                className="inline-flex items-center gap-2 rounded-full bg-malta-gold px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-malta-gold/30"
              >
                Odkryj Pełną Podróż Makłowicza
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </section>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Tematy</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-malta-stone px-4 py-1.5 text-xs font-semibold text-malta-charcoal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related articles CTA */}
        <div className="mt-12 rounded-2xl bg-malta-stone p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-malta-blue">
            Czytaj Dalej
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-malta-dark">
            Więcej Artykułów ze Społeczności
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Każdy artykuł jest generowany z prawdziwych dyskusji turystycznych, analizowany przez AI i wzbogacony materiałami wideo od Roberta Makłowicza.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/pl/articles"
              className="rounded-full bg-malta-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-malta-blue-light"
            >
              Wszystkie Artykuły
            </Link>
            <Link
              href="/pl/maklowicz"
              className="rounded-full border-2 border-malta-dark/20 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:border-malta-gold hover:text-malta-gold"
            >
              Przewodnik Makłowicza
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
