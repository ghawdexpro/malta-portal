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
    title: "Restaurants & Food",
    subtitle: "Where locals really eat",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    topic: "restaurants",
  },
  {
    title: "Beaches & Swimming",
    subtitle: "Crystal clear waters",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    topic: "beaches",
  },
  {
    title: "Sightseeing",
    subtitle: "Ancient history awaits",
    image:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80",
    topic: "sightseeing",
  },
  {
    title: "Transport & Getting Around",
    subtitle: "Buses, ferries & tips",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    topic: "transport",
  },
  {
    title: "Accommodation",
    subtitle: "Best places to stay",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    topic: "accommodation",
  },
  {
    title: "Prices & Budget",
    subtitle: "Real costs from real tourists",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=85')",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/60 via-malta-dark/30 to-malta-dark/80" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
            AI-Powered Travel Intelligence
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
            Discover Malta
            <br />
            <span className="text-malta-gold">Through Real Eyes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Insights from thousands of real tourist experiences — analyzed by AI,
            curated from Polish community discussions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/articles"
              className="rounded-full bg-malta-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-malta-gold/30"
            >
              Explore Articles
            </Link>
            <Link
              href="/maklowicz"
              className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-malta-gold hover:text-malta-gold"
            >
              Maklowicz Guide
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
              label: "Community Posts",
              color: "text-malta-blue",
            },
            {
              value: stats.articles,
              label: "AI Articles",
              color: "text-malta-gold",
            },
            {
              value: stats.stops,
              label: "Maklowicz Stops",
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
            Community Knowledge
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-malta-dark">
            What Tourists Actually Say
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-500">
            Real insights gathered from Polish tourist communities,
            analyzed and organized by AI.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE_CARDS.map((card) => (
            <Link
              key={card.topic}
              href={`/articles?topic=${card.topic}`}
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
                Latest
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-malta-dark">
                AI-Generated Articles
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-sm font-semibold text-malta-blue hover:text-malta-blue-light transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="mt-10 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
              <div className="text-5xl">&#128221;</div>
              <p className="mt-4 text-lg font-semibold text-gray-400">
                No articles yet
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Articles will appear once the AI pipeline processes community data
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
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
                      Based on {article.source_count} community posts
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
          {/* Left: Image */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-malta-dark/20" />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center bg-malta-dark px-10 py-16 md:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
              Interactive Guide
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Follow Robert Maklowicz
              <br />
              Through Malta
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              The legendary Polish food and travel creator explored Malta&apos;s
              hidden culinary gems across 3 episodes. Our AI-organized guide lets
              you follow his journey — with interactive maps, embedded videos,
              and local restaurant recommendations.
            </p>
            <div className="mt-4 text-sm text-white/40">
              3 Episodes &bull; 16 Locations &bull; Valletta, Birgu, Gozo, Mdina & Rabat
            </div>
            <Link
              href="/maklowicz"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-malta-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-malta-dark transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-malta-gold/30"
            >
              Explore the Journey
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
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY CTA ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-malta-blue">
            Powered by Community
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-malta-dark">
            Real People, Real Experiences
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 leading-relaxed">
            Every article on this portal is generated from real discussions in
            Polish tourist communities. Our AI reads, analyzes, and organizes
            thousands of posts and comments so you get the most authentic travel
            advice.
          </p>
          <Link
            href="/articles"
            className="mt-8 inline-block rounded-full bg-malta-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-malta-blue-light hover:shadow-lg"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
