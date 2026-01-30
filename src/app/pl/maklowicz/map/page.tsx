import { createServiceClient } from "@/lib/supabase";
import type { Metadata } from "next";
import MaklowiczMap from "@/components/maklowicz/MaklowiczMap";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interaktywna Mapa Malty — Podróż Makłowicza | Portal Maltański",
  description:
    "Odkryj podróż Roberta Makłowicza po Malcie na interaktywnej mapie. 16 przystanków przez Vallettę, Birgu, Gozo i Mdinę z trybem wirtualnej wycieczki.",
  openGraph: {
    title: "Interaktywna Mapa Malty — Śledź Podróż Makłowicza",
    description:
      "Wirtualna wycieczka przez 16 przystanków na Malcie z GPS, Street View i przewodnikami kulinarnymi.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const revalidate = 3600;

export default async function MapPage() {
  const supabase = createServiceClient();
  const { data: stops } = await supabase
    .from("maklowicz_stops")
    .select("*")
    .order("day_number", { ascending: true })
    .order("order_in_day", { ascending: true });

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)", marginTop: "64px" }}>
      {/* Slim header bar */}
      <div className="flex items-center justify-between bg-malta-dark px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/pl/maklowicz"
            className="text-xs font-semibold text-white/60 hover:text-malta-gold transition-colors"
          >
            &larr; Oś Czasu Podróży
          </Link>
          <span className="text-white/20">|</span>
          <h1 className="text-sm font-extrabold text-white">
            Makłowicz Malta <span className="text-malta-gold">Mapa Interaktywna</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          <span>{stops?.length ?? 0} przystanków</span>
          <span>3 dni</span>
          <span>wirtualna wycieczka</span>
        </div>
      </div>

      {/* Map fills remaining space */}
      <div className="flex-1">
        <MaklowiczMap stops={(stops as any[]) ?? []} lang="pl" />
      </div>
    </div>
  );
}
