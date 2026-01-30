import { NextRequest, NextResponse } from "next/server";
import { verifyBotApiKey } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase";

const VALID_STAGES = ["analyze", "cluster", "generate", "enrich"] as const;

// POST /api/pipeline/[stage] — trigger a pipeline stage
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ stage: string }> }
) {
  const { stage } = await params;

  if (!VALID_STAGES.includes(stage as typeof VALID_STAGES[number])) {
    return NextResponse.json(
      { error: `Invalid stage. Valid: ${VALID_STAGES.join(", ")}` },
      { status: 400 }
    );
  }

  const auth = await verifyBotApiKey(request);
  if (!auth.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Create pipeline job
  const { data: job } = await supabase
    .from("pipeline_jobs")
    .insert({
      stage,
      status: "running",
      triggered_by: auth.admin?.name ?? "unknown",
    })
    .select("id")
    .single();

  // Pipeline stages will be implemented in Phase 2-3
  // For now, return a placeholder response
  if (job) {
    await supabase.from("pipeline_jobs").update({
      status: "completed",
      output_count: 0,
      completed_at: new Date().toISOString(),
    }).eq("id", job.id);
  }

  return NextResponse.json({
    success: true,
    stage,
    job_id: job?.id,
    message: `Pipeline stage '${stage}' triggered. AI processing not yet implemented.`,
  });
}

// GET /api/pipeline/[stage] — get status of latest run for this stage
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ stage: string }> }
) {
  const { stage } = await params;
  const supabase = createServiceClient();

  const { data: jobs } = await supabase
    .from("pipeline_jobs")
    .select("*")
    .eq("stage", stage)
    .order("started_at", { ascending: false })
    .limit(5);

  return NextResponse.json({ stage, jobs: jobs ?? [] });
}
