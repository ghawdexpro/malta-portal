import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artykuły Podróżnicze | Portal Maltański",
  description:
    "Przewodniki tworzone z prawdziwych dyskusji turystycznych — restauracje, plaże, transport, ceny, zwiedzanie, wydarzenia, porady i Gozo.",
  openGraph: {
    title: "Artykuły Maltańskie — Przewodniki Społeczności",
    description:
      "Przewodniki podróżnicze o Malcie tworzone z prawdziwych dyskusji turystycznych. Restauracje, plaże, transport, ceny i więcej.",
    images: [
      {
        url: "/images/monika/articles/blue_lagoon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const revalidate = 300;

const TOPICS = [
  { key: "all", label: "Wszystkie" },
  { key: "valletta", label: "Valletta" },
  { key: "mdina", label: "Mdina" },
  { key: "gozo", label: "Gozo" },
  { key: "birgu", label: "Birgu" },
  { key: "cuisine", label: "Kuchnia" },
  { key: "restaurants", label: "Restauracje" },
  { key: "sightseeing", label: "Zwiedzanie" },
  { key: "history", label: "Historia" },
  { key: "caravaggio", label: "Caravaggio" },
  { key: "wine", label: "Wino" },
  { key: "fortifications", label: "Fortyfikacje" },
  { key: "beaches", label: "Plaże" },
  { key: "transport", label: "Transport" },
  { key: "accommodation", label: "Noclegi" },
  { key: "prices", label: "Ceny" },
  { key: "events", label: "Wydarzenia" },
  { key: "tips", label: "Porady" },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const supabase = createServiceClient();

  let query = supabase
    .from("articles")
    .select(
      "id, slug, title, subtitle, topic, cover_image, published_at, source_count, avg_confidence, tags"
    )
    .eq("status", "published")
    .eq("lang", "pl")
    .order("published_at", { ascending: false });

  if (topic && topic !== "all") {
    query = query.eq("topic", topic);
  }

  const { data: articles } = await query.limit(50);

  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/monika/articles/blue_lagoon.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/70 via-malta-dark/40 to-malta-dark/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
            Wiedza Społeczności
          </p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Artykuły Podróżnicze
          </h1>
          <p className="mt-3 max-w-md text-white/60">
            Przewodniki tworzone z prawdziwych dyskusji turystycznych
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Topic pills */}
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Link
              key={t.key}
              href={t.key === "all" ? "/pl/articles" : `/pl/articles?topic=${t.key}`}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                (topic ?? "all") === t.key
                  ? "bg-malta-blue text-white shadow-md shadow-malta-blue/20"
                  : "bg-malta-stone text-malta-charcoal hover:bg-malta-blue/10 hover:text-malta-blue"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        {!articles || articles.length === 0 ? (
          <div className="mt-16 rounded-2xl border-2 border-dashed border-gray-200 bg-malta-stone/50 p-20 text-center">
            <div className="text-6xl">&#128221;</div>
            <p className="mt-6 text-xl font-bold text-gray-400">
              Brak artykułów
            </p>
            <p className="mt-2 text-sm text-gray-300">
              Nowe artykuły powstają regularnie z postów społeczności.
              <br />
              Wróć wkrótce!
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/pl/articles/${article.slug}`}
                className="card-hover group overflow-hidden rounded-2xl bg-white shadow-sm"
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
                  <div className="aspect-[16/10] bg-gradient-to-br from-malta-blue/10 to-malta-gold/10" />
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
                  <div className="mt-4 flex items-center justify-between text-xs font-medium text-gray-400">
                    <span>{article.source_count} źródeł</span>
                    <span>{Math.round(article.avg_confidence)}% pewności</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
