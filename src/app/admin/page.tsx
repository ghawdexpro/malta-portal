"use client";

import { useState, useEffect } from "react";

interface PipelineJob {
  id: string;
  stage: string;
  status: string;
  input_count: number;
  output_count: number;
  error: string | null;
  started_at: string;
  completed_at: string | null;
  triggered_by: string;
}

interface Stats {
  raw_posts: number;
  analyzed_posts: number;
  articles_draft: number;
  articles_published: number;
  maklowicz_stops: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [jobs, setJobs] = useState<PipelineJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [syncRes, ...pipelineRes] = await Promise.all([
        fetch("/api/sync"),
        ...["analyze", "cluster", "generate", "enrich"].map((s) =>
          fetch(`/api/pipeline/${s}`)
        ),
      ]);
      const syncData = await syncRes.json();
      const pipelineData = await Promise.all(pipelineRes.map((r) => r.json()));

      const allJobs = pipelineData.flatMap((d) => d.jobs ?? []);
      allJobs.sort(
        (a: PipelineJob, b: PipelineJob) =>
          new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
      );

      setJobs(allJobs.slice(0, 20));
      setStats({
        raw_posts: syncData.total_posts ?? 0,
        analyzed_posts: 0,
        articles_draft: 0,
        articles_published: 0,
        maklowicz_stops: 0,
      });
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    }
    setLoading(false);
  }

  async function triggerPipeline(stage: string) {
    setSyncing(true);
    try {
      const res = await fetch(`/api/pipeline/${stage}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${prompt("Enter admin API key:")}`,
        },
      });
      const data = await res.json();
      alert(JSON.stringify(data, null, 2));
      loadDashboard();
    } catch (err) {
      alert("Failed: " + err);
    }
    setSyncing(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-foreground/50">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-1 text-foreground/50">
        Manage content pipeline and portal data
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          { label: "Raw Posts", value: stats?.raw_posts ?? 0, color: "text-accent" },
          { label: "Analyzed", value: stats?.analyzed_posts ?? 0, color: "text-malta-blue" },
          { label: "Drafts", value: stats?.articles_draft ?? 0, color: "text-foreground/60" },
          { label: "Published", value: stats?.articles_published ?? 0, color: "text-green-600" },
          { label: "Maklowicz Stops", value: stats?.maklowicz_stops ?? 0, color: "text-malta-gold" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-foreground/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Controls */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Pipeline Controls</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["analyze", "cluster", "generate", "enrich"].map((stage) => (
            <button
              key={stage}
              onClick={() => triggerPipeline(stage)}
              disabled={syncing}
              className="rounded-lg bg-malta-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
            >
              Run {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Recent Pipeline Jobs</h2>
        {jobs.length === 0 ? (
          <p className="mt-4 text-foreground/40">No pipeline jobs yet</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-malta-stone/30">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Stage</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">In/Out</th>
                  <th className="px-4 py-2 text-left font-medium">Triggered By</th>
                  <th className="px-4 py-2 text-left font-medium">Started</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t border-malta-stone/30">
                    <td className="px-4 py-2 font-medium">{job.stage}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          job.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : job.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-foreground/50">
                      {job.input_count} / {job.output_count}
                    </td>
                    <td className="px-4 py-2 text-foreground/50">{job.triggered_by}</td>
                    <td className="px-4 py-2 text-foreground/50">
                      {new Date(job.started_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
