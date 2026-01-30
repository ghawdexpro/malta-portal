import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, subtitle")
    .eq("slug", slug)
    .single();

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Malta Travel Portal`,
    description: article.subtitle ?? article.title,
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/articles" className="text-sm text-accent hover:underline">
        &larr; All Articles
      </Link>

      <div className="mt-6">
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          {article.topic}
        </span>
        <h1 className="mt-3 text-4xl font-bold leading-tight">{article.title}</h1>
        {article.subtitle && (
          <p className="mt-2 text-lg text-foreground/60">{article.subtitle}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm text-foreground/40">
          <span>Based on {article.source_count} community posts</span>
          <span>{Math.round(article.avg_confidence)}% confidence</span>
          {article.published_at && (
            <span>
              Published{" "}
              {new Date(article.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {article.cover_image && (
        <div className="mt-8 overflow-hidden rounded-xl">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div
        className="prose prose-lg mt-8 max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-accent"
        dangerouslySetInnerHTML={{ __html: article.body_html ?? "" }}
      />

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 border-t border-malta-stone pt-6">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-malta-stone/50 px-3 py-1 text-sm text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
