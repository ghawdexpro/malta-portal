import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";

export const revalidate = 300;

const TOPICS = [
  { key: "all", label: "All Topics" },
  { key: "restaurants", label: "Restaurants" },
  { key: "beaches", label: "Beaches" },
  { key: "transport", label: "Transport" },
  { key: "accommodation", label: "Stay" },
  { key: "prices", label: "Prices" },
  { key: "sightseeing", label: "Sightseeing" },
  { key: "events", label: "Events" },
  { key: "tips", label: "Tips" },
  { key: "gozo", label: "Gozo" },
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
    .order("published_at", { ascending: false });

  if (topic && topic !== "all") {
    query = query.eq("topic", topic);
  }

  const { data: articles } = await query.limit(30);

  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/70 via-malta-dark/40 to-malta-dark/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
            Community Knowledge
          </p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Travel Articles
          </h1>
          <p className="mt-3 max-w-md text-white/60">
            AI-generated guides from real tourist discussions
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
              href={t.key === "all" ? "/articles" : `/articles?topic=${t.key}`}
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
              No articles yet
            </p>
            <p className="mt-2 text-sm text-gray-300">
              The AI pipeline will generate articles from community posts.
              <br />
              Check back soon!
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
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
                    <span>{article.source_count} sources</span>
                    <span>{Math.round(article.avg_confidence)}% confidence</span>
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
