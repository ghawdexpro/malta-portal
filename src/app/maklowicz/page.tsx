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
  cover_image: string | null;
}

const DAY_THEMES = [
  {
    color: "from-malta-blue to-malta-blue-light",
    accent: "bg-malta-blue",
    text: "text-malta-blue",
    badge: "bg-malta-blue/10 text-malta-blue",
    title: "Valletta — The Fortress Capital",
    subtitle: "Exploring the city built by the Knights of St. John",
  },
  {
    color: "from-emerald-600 to-emerald-500",
    accent: "bg-emerald-600",
    text: "text-emerald-600",
    badge: "bg-emerald-600/10 text-emerald-700",
    title: "Birgu & Gozo — Islands of Character",
    subtitle: "Crossing the harbour and sailing to Gozo",
  },
  {
    color: "from-malta-gold to-amber-500",
    accent: "bg-malta-gold",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    title: "Rabat & Mdina — The Silent City",
    subtitle: "Ancient catacombs, pastizzi, and moonlit streets",
  },
];

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
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-malta-dark/70 via-malta-dark/30 to-malta-dark/90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-malta-gold">
            Interactive Guide
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
            Robert Maklowicz
            <br />
            <span className="text-malta-gold">Malta Journey</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            The legendary Polish food & travel creator explored Malta across 3
            episodes. Follow his journey stop by stop.
          </p>
          <div className="mt-6 flex gap-6 text-sm text-white/50">
            <span>3 Episodes</span>
            <span>&#8226;</span>
            <span>{stops?.length ?? 0} Locations</span>
            <span>&#8226;</span>
            <span>Valletta, Birgu, Gozo, Mdina</span>
          </div>
        </div>
      </section>

      {/* Day sections */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        {days.size === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-malta-stone/50 p-20 text-center">
            <div className="text-6xl">&#127909;</div>
            <p className="mt-6 text-xl font-bold text-gray-400">
              Journey data coming soon
            </p>
            <p className="mt-2 text-sm text-gray-300">
              Maklowicz stops will be curated and added here with video
              timestamps, locations, and food recommendations.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {Array.from(days.entries()).map(([dayNum, dayStops]) => {
              const theme = DAY_THEMES[dayNum - 1] ?? DAY_THEMES[0];
              const firstStop = dayStops[0];

              return (
                <div key={dayNum}>
                  {/* Day header */}
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.color} text-white shadow-lg`}
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold uppercase tracking-wider opacity-70">
                          Day
                        </div>
                        <div className="text-2xl font-black">{dayNum}</div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-malta-dark">
                        {theme.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {theme.subtitle}
                      </p>
                      {firstStop?.episode && (
                        <p className="mt-1 text-xs font-medium text-gray-400">
                          {firstStop.episode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* YouTube embed for day */}
                  {firstStop?.youtube_id && (
                    <div className="mt-6 overflow-hidden rounded-2xl shadow-lg">
                      <div className="relative aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${firstStop.youtube_id}`}
                          title={firstStop.episode}
                          className="absolute inset-0 h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Stops timeline */}
                  <div className="mt-8 space-y-0">
                    {dayStops.map((stop, i) => (
                      <div key={stop.id} className="relative flex gap-5">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${theme.accent} text-sm font-bold text-white shadow-md`}
                          >
                            {i + 1}
                          </div>
                          {i < dayStops.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gray-200" />
                          )}
                        </div>

                        {/* Stop card */}
                        <div className="mb-8 flex-1 rounded-2xl bg-white p-6 shadow-sm">
                          <h3 className="text-lg font-bold text-malta-dark">
                            {stop.location_name}
                          </h3>
                          {stop.description && (
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                              {stop.description}
                            </p>
                          )}

                          {/* Food tags */}
                          {stop.food_mentioned.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {stop.food_mentioned.map((food) => (
                                <span
                                  key={food}
                                  className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
                                >
                                  {food}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Quote */}
                          {stop.quote && (
                            <blockquote
                              className={`mt-3 border-l-3 pl-4 text-sm italic text-gray-400 ${theme.text} border-current`}
                            >
                              &ldquo;{stop.quote}&rdquo;
                            </blockquote>
                          )}

                          {/* Links */}
                          <div className="mt-4 flex gap-4">
                            {stop.youtube_id && (
                              <a
                                href={`https://youtube.com/watch?v=${stop.youtube_id}${stop.timestamp_start ? `&t=${stop.timestamp_start}` : ""}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-malta-blue hover:text-malta-blue-light transition-colors"
                              >
                                Watch on YouTube &rarr;
                              </a>
                            )}
                            {stop.lat && stop.lng && (
                              <a
                                href={`https://www.google.com/maps?q=${stop.lat},${stop.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-gray-400 hover:text-malta-blue transition-colors"
                              >
                                Open in Maps &rarr;
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
