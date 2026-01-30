import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";

export const revalidate = 300;

const TOPICS = [
  "all", "restaurants", "beaches", "transport", "accommodation",
  "prices", "sightseeing", "events", "tips", "general",
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
    .select("id, slug, title, subtitle, topic, cover_image, published_at, source_count, avg_confidence, tags")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (topic && topic !== "all") {
    query = query.eq("topic", topic);
  }

  const { data: articles } = await query.limit(30);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Articles</h1>
      <p className="mt-1 text-foreground/50">
        AI-generated travel guides from real community discussions
      </p>

      {/* Topic Filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <Link
            key={t}
            href={t === "all" ? "/articles" : `/articles?topic=${t}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              (topic ?? "all") === t
                ? "bg-accent text-white"
                : "bg-malta-stone/50 text-foreground/60 hover:bg-malta-stone"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      {!articles || articles.length === 0 ? (
        <div className="mt-12 rounded-xl border-2 border-dashed border-malta-stone p-12 text-center">
          <p className="text-lg font-medium text-foreground/40">No articles yet</p>
          <p className="mt-1 text-sm text-foreground/30">
            The AI pipeline will generate articles from community posts
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {article.cover_image ? (
                <div className="aspect-video overflow-hidden bg-malta-stone">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-malta-blue/20 to-accent/20" />
              )}
              <div className="p-4">
                <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  {article.topic}
                </span>
                <h3 className="mt-2 font-semibold leading-snug group-hover:text-accent">
                  {article.title}
                </h3>
                {article.subtitle && (
                  <p className="mt-1 text-sm text-foreground/50 line-clamp-2">
                    {article.subtitle}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between text-xs text-foreground/40">
                  <span>{article.source_count} sources</span>
                  <span>{Math.round(article.avg_confidence)}% confidence</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
