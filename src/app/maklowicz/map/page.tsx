import { createServiceClient } from "@/lib/supabase";
import type { Metadata } from "next";
import MaklowiczMap from "@/components/maklowicz/MaklowiczMap";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interactive Malta Map — Makłowicz Journey | Malta Travel Portal",
  description:
    "Explore Robert Makłowicz's Malta journey on an interactive map. 16 stops across Valletta, Birgu, Gozo, and Mdina with virtual tour mode.",
  openGraph: {
    title: "Interactive Malta Map — Follow Makłowicz's Journey",
    description:
      "Virtual tour through 16 Malta stops with GPS, Street View, and food guides.",
    images: [
      {
        url: "/images/monika/page/hero_harbour.png",
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
            href="/maklowicz"
            className="text-xs font-semibold text-white/60 hover:text-malta-gold transition-colors"
          >
            &larr; Journey Timeline
          </Link>
          <span className="text-white/20">|</span>
          <h1 className="text-sm font-extrabold text-white">
            Makłowicz Malta <span className="text-malta-gold">Interactive Map</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          <span>{stops?.length ?? 0} stops</span>
          <span>3 days</span>
          <span>virtual tour</span>
        </div>
      </div>

      {/* Map fills remaining space */}
      <div className="flex-1">
        <MaklowiczMap stops={(stops as any[]) ?? []} lang="en" />
      </div>
    </div>
  );
}
