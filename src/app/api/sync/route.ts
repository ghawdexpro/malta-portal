import { NextRequest, NextResponse } from "next/server";
import { verifyBotApiKey } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase";

// POST /api/sync — receive curated tips from tourist-aggregator bot
export async function POST(request: NextRequest) {
  const auth = await verifyBotApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const tips = body.tips;

  if (!Array.isArray(tips)) {
    return NextResponse.json({ error: "Expected { tips: CommunityTip[] }" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Log pipeline job
  const { data: job } = await supabase
    .from("pipeline_jobs")
    .insert({
      stage: "sync",
      status: "running",
      input_count: tips.length,
      triggered_by: auth.admin?.name ?? "bot",
    })
    .select("id")
    .single();

  let synced = 0;
  let skipped = 0;

  for (const tip of tips) {
    const { error } = await supabase.from("raw_posts").upsert(
      {
        fb_post_id: tip.id,
        topic: tip.topic,
        content: tip.content,
        original_content: tip.originalContent,
        source: tip.source,
        source_url: tip.sourceUrl,
        engagement: tip.engagement,
        comment_count: tip.commentCount,
        comments: tip.comments,
        posted_at: tip.date,
        scraped_at: tip.scrapedAt,
        synced_at: new Date().toISOString(),
      },
      { onConflict: "fb_post_id" }
    );

    if (error) {
      skipped++;
    } else {
      synced++;
    }
  }

  // Update pipeline job
  if (job) {
    await supabase.from("pipeline_jobs").update({
      status: "completed",
      output_count: synced,
      completed_at: new Date().toISOString(),
    }).eq("id", job.id);
  }

  return NextResponse.json({
    success: true,
    synced,
    skipped,
    total: tips.length,
  });
}

// GET /api/sync — check sync status
export async function GET() {
  const supabase = createServiceClient();

  const [postsResult, lastJob] = await Promise.all([
    supabase.from("raw_posts").select("id", { count: "exact", head: true }),
    supabase
      .from("pipeline_jobs")
      .select("*")
      .eq("stage", "sync")
      .order("started_at", { ascending: false })
      .limit(1)
      .single(),
  ]);

  return NextResponse.json({
    total_posts: postsResult.count ?? 0,
    last_sync: lastJob.data ?? null,
  });
}
