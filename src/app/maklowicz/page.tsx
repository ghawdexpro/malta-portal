import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";
import { STOP_FALLBACK_IMAGES, MAKLOWICZ_EN_SLUGS } from "@/lib/maklowicz-pl";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robert Makłowicz Malta Guide | Malta Travel Portal",
  description:
    "Follow Robert Makłowicz through Malta — 3 episodes, 16 locations, with timestamped videos, maps, and local food stops.",
  openGraph: {
    title: "Robert Makłowicz — Malta Journey",
    description:
      "The legendary Polish food & travel creator explored Malta across 3 episodes. Follow his journey stop by stop.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Malta Travel Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Makłowicz — Malta Journey",
    description: "Follow Makłowicz through Malta: 3 episodes, 16 locations, interactive guide.",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"],
  },
};

export const revalidate = 3600;

interface MaklowiczStop {
  id: string;
  episode: string;
  youtube_url: string | null;
  youtube_id: string | null;
  timestamp_start: string | null;
  location_name: string;
  lat: number | null;
  lng: number | null;
  description: string | null;
  food_mentioned: string[];
  quote: string | null;
  day_number: number;
  order_in_day: number;
  cover_image: string | null;
  article_slug?: string | null;
}

const DAY_THEMES = [
  {
    color: "from-malta-blue to-malta-blue-light",
    accent: "bg-malta-blue",
    text: "text-malta-blue",
    badge: "bg-malta-blue/10 text-malta-blue",
    border: "border-malta-blue/20",
    title: "Valletta — The Fortress Capital",
    subtitle: "Exploring the city built by the Knights of St. John",
    heroQuote: "Malta to miejsce, gdzie historia napisana jest w kamieniu, a każdy zaułek opowiada inną historię.",
  },
  {
    color: "from-emerald-600 to-emerald-500",
    accent: "bg-emerald-600",
    text: "text-emerald-600",
    badge: "bg-emerald-600/10 text-emerald-700",
    border: "border-emerald-200",
    title: "Birgu & Gozo — Islands of Character",
    subtitle: "Crossing the harbour and sailing to Gozo",
    heroQuote: "Na Gozo czas płynie inaczej — wolniej, spokojniej, tak jak powinien.",
  },
  {
    color: "from-malta-gold to-amber-500",
    accent: "bg-malta-gold",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    title: "Rabat & Mdina — The Silent City",
    subtitle: "Ancient catacombs, pastizzi, and moonlit streets",
    heroQuote: "Mdina to miasto, które odmawia bycia głośnym — i właśnie dlatego mówi tak wiele.",
  },
];

function formatTimestamp(seconds: string | null): string {
  if (!seconds) return "";
  const s = parseInt(seconds, 10);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default async function MaklowiczPage() {
  const supabase = createServiceClient();
  const { data: stops } = await supabase
    .from("maklowicz_stops")
    .select("*")
    .order("day_number", { ascending: true })
    .order("order_in_day", { ascending: true });

  // Apply fallback images and article links for stops
  const enrichedStops = (stops as MaklowiczStop[] | null)?.map((stop) => ({
    ...stop,
    cover_image:
      stop.cover_image ?? STOP_FALLBACK_IMAGES[stop.location_name] ?? null,
    article_slug: MAKLOWICZ_EN_SLUGS[stop.location_name] ?? null,
  }));

  const days = new Map<number, MaklowiczStop[]>();
  if (enrichedStops) {
    for (const stop of enrichedStops) {
      const existing = days.get(stop.day_number) ?? [];
      existing.push(stop);
      days.set(stop.day_number, existing);
    }
  }

  // Collect all unique food mentions for the hero
  const allFoods = new Set<string>();
  enrichedStops?.forEach((s) => s.food_mentioned?.forEach((f) => allFoods.add(f)));

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/70 via-malta-dark/30 to-malta-dark/90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-malta-gold text-malta-dark font-black text-xl shadow-lg">
            RM
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
            Interactive Video Guide
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
            Robert Makłowicz
            <br />
            <span className="text-malta-gold">Malta Journey</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            The legendary Polish food &amp; travel creator explored Malta across 3
            episodes. Follow his journey stop by stop — with timestamped videos,
            original Polish quotes, maps, and food recommendations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span>3 Episodes</span>
            <span>&#8226;</span>
            <span>{enrichedStops?.length ?? 0} Locations</span>
            <span>&#8226;</span>
            <span>{allFoods.size} Dishes Mentioned</span>
            <span>&#8226;</span>
            <span>Valletta, Birgu, Gozo, Mdina</span>
          </div>

          {/* Map CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/maklowicz/map"
              className="inline-flex items-center gap-2 rounded-full bg-malta-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-malta-gold/30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              Explore Interactive Map
            </Link>
            <a
              href="https://youtube.com/watch?v=0XsoarB0dhQ&t=40"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white/80 transition-all hover:border-malta-gold hover:text-malta-gold"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Episode 1
            </a>
          </div>

          {/* Social share row */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-white/30">Share this guide</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://malta-portal-production.up.railway.app/maklowicz")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-malta-gold hover:text-malta-dark transition-all"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Robert Makłowicz Malta Journey — Interactive Guide with timestamped videos")}&url=${encodeURIComponent("https://malta-portal-production.up.railway.app/maklowicz")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-malta-dark hover:text-white transition-all"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Check out this Robert Makłowicz Malta Guide! https://malta-portal-production.up.railway.app/maklowicz")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-emerald-600 hover:text-white transition-all"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Day sections */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        {days.size === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-malta-stone/50 p-20 text-center">
            <div className="text-6xl">&#127909;</div>
            <p className="mt-6 text-xl font-bold text-gray-400">
              Journey data coming soon
            </p>
          </div>
        ) : (
          <div className="space-y-24">
            {Array.from(days.entries()).map(([dayNum, dayStops]) => {
              const theme = DAY_THEMES[dayNum - 1] ?? DAY_THEMES[0];
              const firstStop = dayStops[0];

              return (
                <div key={dayNum}>
                  {/* Day header */}
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.color} text-white shadow-lg`}
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold uppercase tracking-wider opacity-70">
                          Day
                        </div>
                        <div className="text-2xl font-black">{dayNum}</div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-malta-dark">
                        {theme.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {theme.subtitle}
                      </p>
                      {firstStop?.episode && (
                        <p className="mt-1 text-xs font-medium text-gray-400">
                          {firstStop.episode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Day hero quote */}
                  <div className={`mt-6 rounded-2xl border ${theme.border} bg-white p-6`}>
                    <p className={`text-lg italic ${theme.text}`}>
                      &ldquo;{theme.heroQuote}&rdquo;
                    </p>
                    <p className="mt-2 text-xs font-semibold text-gray-400">
                      — Robert Makłowicz
                    </p>
                  </div>

                  {/* YouTube embed for day — starts at first stop */}
                  {firstStop?.youtube_id && (
                    <div className="mt-6 overflow-hidden rounded-2xl shadow-lg">
                      <div className="relative aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${firstStop.youtube_id}?start=${firstStop.timestamp_start ?? 0}`}
                          title={firstStop.episode}
                          className="absolute inset-0 h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="bg-malta-dark p-4 text-center">
                        <p className="text-sm text-white/70">
                          Full episode — click any stop below to jump to that moment
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Stops timeline */}
                  <div className="mt-8 space-y-0">
                    {dayStops.map((stop, i) => (
                      <div key={stop.id} className="relative flex gap-5">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${theme.accent} text-sm font-bold text-white shadow-md`}
                          >
                            {i + 1}
                          </div>
                          {i < dayStops.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gray-200" />
                          )}
                        </div>

                        {/* Stop card */}
                        <div className="mb-8 flex-1 overflow-hidden rounded-2xl bg-white shadow-sm">
                          {/* Cover image if available */}
                          {stop.cover_image && (
                            <div className="aspect-[21/9] overflow-hidden">
                              <img
                                src={stop.cover_image}
                                alt={stop.location_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}

                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-lg font-bold text-malta-dark">
                                {stop.location_name}
                              </h3>
                              {stop.timestamp_start && (
                                <a
                                  href={`https://youtube.com/watch?v=${stop.youtube_id}&t=${stop.timestamp_start}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`shrink-0 rounded-full ${theme.badge} px-3 py-1 text-xs font-bold transition-opacity hover:opacity-80`}
                                >
                                  &#9654; {formatTimestamp(stop.timestamp_start)}
                                </a>
                              )}
                            </div>

                            {stop.description && (
                              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                {stop.description}
                              </p>
                            )}

                            {/* Food tags */}
                            {stop.food_mentioned.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {stop.food_mentioned.map((food) => (
                                  <span
                                    key={food}
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
                                  >
                                    {food}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Quote */}
                            {stop.quote && (
                              <blockquote
                                className={`mt-4 rounded-xl bg-malta-stone/50 p-4 text-sm italic text-gray-600`}
                              >
                                <span className={`${theme.text} text-lg leading-none`}>&ldquo;</span>
                                {stop.quote}
                                <span className={`${theme.text} text-lg leading-none`}>&rdquo;</span>
                                <p className="mt-2 text-xs font-semibold not-italic text-gray-400">
                                  — Robert Makłowicz
                                </p>
                              </blockquote>
                            )}

                            {/* Links */}
                            <div className="mt-4 flex flex-wrap gap-4">
                              {stop.youtube_id && stop.timestamp_start && (
                                <a
                                  href={`https://youtube.com/watch?v=${stop.youtube_id}&t=${stop.timestamp_start}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-semibold text-malta-blue hover:text-malta-blue-light transition-colors"
                                >
                                  Watch this moment &rarr;
                                </a>
                              )}
                              {stop.lat && stop.lng && (
                                <a
                                  href={`https://www.google.com/maps?q=${stop.lat},${stop.lng}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-semibold text-gray-400 hover:text-malta-blue transition-colors"
                                >
                                  Open in Maps &rarr;
                                </a>
                              )}
                              {stop.article_slug && (
                                <Link
                                  href={`/articles/${stop.article_slug}`}
                                  className="text-xs font-semibold text-malta-gold hover:text-amber-600 transition-colors"
                                >
                                  Read article &rarr;
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Food glossary */}
        {allFoods.size > 0 && (
          <section className="mt-20 rounded-2xl bg-malta-stone p-8 md:p-10">
            <h3 className="text-xl font-extrabold text-malta-dark">
              Makłowicz&apos;s Malta Food Guide
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Every dish mentioned across all 3 episodes
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {Array.from(allFoods)
                .sort()
                .map((food) => (
                  <span
                    key={food}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-malta-dark shadow-sm"
                  >
                    {food}
                  </span>
                ))}
            </div>
          </section>
        )}

        {/* CTA to articles */}
        <section className="mt-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-malta-blue">
            Continue Exploring
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-malta-dark">
            Read Our Community-Powered Articles
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
            Dive deeper into every topic Makłowicz covered — restaurants, sightseeing,
            Gozo, and more — with insights from hundreds of tourists.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/articles?topic=restaurants"
              className="rounded-full bg-malta-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-malta-blue-light"
            >
              Restaurants
            </Link>
            <Link
              href="/articles?topic=sightseeing"
              className="rounded-full bg-malta-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-malta-blue-light"
            >
              Sightseeing
            </Link>
            <Link
              href="/articles?topic=gozo"
              className="rounded-full bg-malta-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-malta-blue-light"
            >
              Gozo Guide
            </Link>
            <Link
              href="/articles"
              className="rounded-full border-2 border-malta-dark/20 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:border-malta-gold hover:text-malta-gold"
            >
              All Articles
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
