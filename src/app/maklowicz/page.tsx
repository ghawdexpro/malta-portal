import Link from "next/link";
import { createServiceClient } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robert Maklowicz Malta Guide | Malta Travel Portal",
  description:
    "Follow Robert Maklowicz through Malta — an interactive journey with maps, videos, and local food stops.",
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
}

export default async function MaklowiczPage() {
  const supabase = createServiceClient();
  const { data: stops } = await supabase
    .from("maklowicz_stops")
    .select("*")
    .order("day_number", { ascending: true })
    .order("order_in_day", { ascending: true });

  const days = new Map<number, MaklowiczStop[]>();
  if (stops) {
    for (const stop of stops as MaklowiczStop[]) {
      const existing = days.get(stop.day_number) ?? [];
      existing.push(stop);
      days.set(stop.day_number, existing);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-malta-gold to-accent p-8 text-white">
        <span className="text-sm font-medium text-white/70">Interactive Guide</span>
        <h1 className="mt-2 text-4xl font-bold">
          Follow Robert Maklowicz Through Malta
        </h1>
        <p className="mt-2 max-w-2xl text-white/80">
          The famous Polish food & travel creator explored Malta&apos;s hidden culinary gems.
          This AI-organized guide lets you follow his journey step by step — with maps,
          videos, and local restaurant recommendations.
        </p>
      </div>

      {days.size === 0 ? (
        <div className="mt-12 rounded-xl border-2 border-dashed border-malta-stone p-12 text-center">
          <p className="text-lg font-medium text-foreground/40">
            Journey data coming soon
          </p>
          <p className="mt-1 text-sm text-foreground/30">
            Maklowicz stops will be curated and added here with video timestamps,
            locations, and food recommendations.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {Array.from(days.entries()).map(([dayNum, dayStops]) => (
            <div key={dayNum}>
              <h2 className="text-2xl font-bold">Day {dayNum}</h2>
              <div className="mt-4 space-y-4">
                {dayStops.map((stop, i) => (
                  <div
                    key={stop.id}
                    className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-malta-gold text-white font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{stop.location_name}</h3>
                      {stop.description && (
                        <p className="mt-1 text-sm text-foreground/60">
                          {stop.description}
                        </p>
                      )}
                      {stop.food_mentioned.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {stop.food_mentioned.map((food) => (
                            <span
                              key={food}
                              className="rounded-full bg-malta-gold/10 px-2 py-0.5 text-xs text-malta-gold"
                            >
                              {food}
                            </span>
                          ))}
                        </div>
                      )}
                      {stop.quote && (
                        <blockquote className="mt-2 border-l-2 border-malta-gold pl-3 text-sm italic text-foreground/50">
                          &ldquo;{stop.quote}&rdquo;
                        </blockquote>
                      )}
                      {stop.youtube_id && (
                        <a
                          href={`https://youtube.com/watch?v=${stop.youtube_id}${stop.timestamp_start ? `&t=${stop.timestamp_start}` : ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm text-accent hover:underline"
                        >
                          Watch on YouTube &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
