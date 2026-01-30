import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";

export const revalidate = 300; // ISR: revalidate every 5 minutes

async function getStats() {
  const supabase = createServiceClient();
  const [posts, articles, stops] = await Promise.all([
    supabase.from("raw_posts").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("maklowicz_stops").select("id", { count: "exact", head: true }),
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
    .select("id, slug, title, subtitle, topic, cover_image, published_at, source_count")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

export default async function Home() {
  const [stats, articles] = await Promise.all([getStats(), getLatestArticles()]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-malta-blue via-malta-blue/90 to-accent py-24">
        <div className="mx-auto max-w-6xl px-4 text-center text-white">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Malta Through Real Eyes
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            AI-analyzed insights from thousands of real tourist experiences.
            Restaurants, beaches, prices, tips — all from community discussions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/articles"
              className="rounded-full bg-white px-6 py-3 font-semibold text-malta-blue transition-transform hover:scale-105"
            >
              Browse Articles
            </Link>
            <Link
              href="/maklowicz"
              className="rounded-full border-2 border-white/50 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Maklowicz Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-8 mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{stats.posts}</div>
            <div className="text-sm text-foreground/50">Community Posts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-malta-blue">{stats.articles}</div>
            <div className="text-sm text-foreground/50">AI Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-malta-gold">{stats.stops}</div>
            <div className="text-sm text-foreground/50">Maklowicz Stops</div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <p className="mt-1 text-foreground/50">AI-generated from real community discussions</p>

        {articles.length === 0 ? (
          <div className="mt-8 rounded-xl border-2 border-dashed border-malta-stone p-12 text-center">
            <p className="text-lg font-medium text-foreground/40">No articles yet</p>
            <p className="mt-1 text-sm text-foreground/30">
              Articles will appear here once the AI pipeline processes community data
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
                {article.cover_image && (
                  <div className="aspect-video overflow-hidden bg-malta-stone">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
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
                  <div className="mt-3 flex items-center gap-2 text-xs text-foreground/40">
                    <span>Based on {article.source_count} community posts</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Maklowicz Banner */}
      <section className="bg-malta-stone/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-md md:flex-row">
            <div className="flex-1">
              <span className="text-sm font-medium text-malta-gold">Interactive Guide</span>
              <h2 className="mt-1 text-2xl font-bold">
                Follow Robert Maklowicz Through Malta
              </h2>
              <p className="mt-2 text-foreground/60">
                An AI-organized journey through Malta following the famous Polish food & travel
                creator. Interactive map, day-by-day itinerary, embedded videos with timestamps.
              </p>
              <Link
                href="/maklowicz"
                className="mt-4 inline-block rounded-full bg-malta-gold px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
              >
                Explore the Journey
              </Link>
            </div>
            <div className="h-48 w-48 rounded-xl bg-malta-stone/60 flex items-center justify-center text-4xl">
              🇲🇹
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
