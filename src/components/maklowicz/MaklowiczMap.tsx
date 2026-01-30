"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { DAY_COLORS, fitBounds } from "@/lib/map-utils";

interface Stop {
  id: string;
  episode: string;
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

interface Props {
  stops: Stop[];
  lang?: "en" | "pl";
}

const DAY_THEMES = [
  { title: "Valletta — The Fortress Capital", titlePl: "Valletta — Stolica Twierdza" },
  { title: "Birgu & Gozo — Islands of Character", titlePl: "Birgu i Gozo — Wyspy z Charakterem" },
  { title: "Rabat & Mdina — The Silent City", titlePl: "Rabat i Mdina — Ciche Miasto" },
];

function formatTimestamp(seconds: string | null): string {
  if (!seconds) return "";
  const s = parseInt(seconds, 10);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function MapController({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(zoom);
    }
  }, [map, center, zoom]);
  return null;
}

const T = {
  en: {
    startTour: "Start Virtual Tour",
    exitTour: "Exit Tour",
    prev: "Previous",
    next: "Next",
    stopOf: "Stop {n} of {total}",
    watchVideo: "Watch Video",
    streetView: "Street View",
    openMaps: "Open in Maps",
    startHere: "Start Tour Here",
    allDays: "All Days",
    showRoutes: "Show Routes",
    share: "Share",
    foods: "Food mentioned",
    legend: "Legend",
    virtualTour: "Virtual Tour",
    exploreMap: "Explore the Interactive Map",
    subtitle: "Follow Makłowicz through 16 stops across Valletta, Gozo & Mdina",
  },
  pl: {
    startTour: "Rozpocznij Wirtualną Wycieczkę",
    exitTour: "Zakończ Wycieczkę",
    prev: "Poprzedni",
    next: "Następny",
    stopOf: "Przystanek {n} z {total}",
    watchVideo: "Obejrzyj Film",
    streetView: "Street View",
    openMaps: "Otwórz w Mapach",
    startHere: "Zacznij Wycieczkę Tutaj",
    allDays: "Wszystkie Dni",
    showRoutes: "Pokaż Trasy",
    share: "Udostępnij",
    foods: "Wspomniane jedzenie",
    legend: "Legenda",
    virtualTour: "Wirtualna Wycieczka",
    exploreMap: "Odkryj Interaktywną Mapę",
    subtitle: "Śledź Makłowicza przez 16 przystanków: Valletta, Gozo i Mdina",
  },
};

export default function MaklowiczMap({ stops, lang = "en" }: Props) {
  const t = T[lang];
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [tourMode, setTourMode] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [activeDays, setActiveDays] = useState<Set<number>>(new Set([1, 2, 3]));
  const [showRoutes, setShowRoutes] = useState(true);

  const filteredStops = useMemo(
    () => stops.filter((s) => activeDays.has(s.day_number) && s.lat && s.lng),
    [stops, activeDays]
  );

  const { center: defaultCenter, zoom: defaultZoom } = useMemo(
    () => fitBounds(filteredStops),
    [filteredStops]
  );

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);

  const currentTourStop = tourMode ? filteredStops[tourIndex] : null;

  const startTour = useCallback(
    (startIndex = 0) => {
      setTourMode(true);
      setTourIndex(startIndex);
      const stop = filteredStops[startIndex];
      if (stop?.lat && stop?.lng) {
        setMapCenter({ lat: stop.lat, lng: stop.lng });
        setMapZoom(16);
        setSelectedStop(stop);
      }
    },
    [filteredStops]
  );

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= filteredStops.length) return;
      setTourIndex(idx);
      const stop = filteredStops[idx];
      if (stop?.lat && stop?.lng) {
        setMapCenter({ lat: stop.lat, lng: stop.lng });
        setMapZoom(16);
        setSelectedStop(stop);
      }
    },
    [filteredStops]
  );

  const exitTour = useCallback(() => {
    setTourMode(false);
    setSelectedStop(null);
    setMapCenter(defaultCenter);
    setMapZoom(defaultZoom);
  }, [defaultCenter, defaultZoom]);

  // Keyboard navigation
  useEffect(() => {
    if (!tourMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(tourIndex + 1);
      if (e.key === "ArrowLeft") goTo(tourIndex - 1);
      if (e.key === "Escape") exitTour();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tourMode, tourIndex, goTo, exitTour]);

  const toggleDay = (day: number) => {
    setActiveDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  // Group stops by day for polylines
  const dayGroups = useMemo(() => {
    const groups: Record<number, { lat: number; lng: number }[]> = {};
    for (const s of filteredStops) {
      if (!s.lat || !s.lng) continue;
      if (!groups[s.day_number]) groups[s.day_number] = [];
      groups[s.day_number].push({ lat: s.lat, lng: s.lng });
    }
    return groups;
  }, [filteredStops]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          mapId="maklowicz-malta"
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="h-full w-full"
        >
          <MapController center={mapCenter} zoom={mapZoom} />

          {/* Markers */}
          {filteredStops.map((stop, idx) => {
            if (!stop.lat || !stop.lng) return null;
            const isActive = tourMode && currentTourStop?.id === stop.id;
            const dayColor = DAY_COLORS[stop.day_number]?.hex ?? "#085c98";
            const globalIdx = stops.indexOf(stop) + 1;

            return (
              <AdvancedMarker
                key={stop.id}
                position={{ lat: stop.lat, lng: stop.lng }}
                onClick={() => {
                  setSelectedStop(stop);
                  if (tourMode) setTourIndex(idx);
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full text-white text-xs font-bold shadow-lg transition-all"
                  style={{
                    backgroundColor: dayColor,
                    width: isActive ? 48 : 36,
                    height: isActive ? 48 : 36,
                    border: isActive ? "3px solid white" : "2px solid white",
                    boxShadow: isActive
                      ? `0 0 0 4px ${dayColor}40, 0 4px 12px rgba(0,0,0,0.3)`
                      : "0 2px 6px rgba(0,0,0,0.3)",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    zIndex: isActive ? 100 : 1,
                  }}
                >
                  {globalIdx}
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Info Window */}
          {selectedStop && selectedStop.lat && selectedStop.lng && (
            <InfoWindow
              position={{ lat: selectedStop.lat, lng: selectedStop.lng }}
              onCloseClick={() => setSelectedStop(null)}
              pixelOffset={[0, -24]}
            >
              <div className="max-w-xs p-1">
                {selectedStop.cover_image && (
                  <img
                    src={selectedStop.cover_image}
                    alt={selectedStop.location_name}
                    className="mb-3 h-32 w-full rounded-lg object-cover"
                  />
                )}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {selectedStop.location_name}
                  </h3>
                  {selectedStop.timestamp_start && (
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-xs font-bold text-white"
                      style={{
                        backgroundColor: DAY_COLORS[selectedStop.day_number]?.hex,
                      }}
                    >
                      {formatTimestamp(selectedStop.timestamp_start)}
                    </span>
                  )}
                </div>

                {selectedStop.description && (
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    {selectedStop.description.slice(0, 150)}
                    {selectedStop.description.length > 150 ? "..." : ""}
                  </p>
                )}

                {selectedStop.food_mentioned.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedStop.food_mentioned.map((f) => (
                      <span
                        key={f}
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{
                          backgroundColor: DAY_COLORS[selectedStop.day_number]?.hex + "18",
                          color: DAY_COLORS[selectedStop.day_number]?.hex,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {selectedStop.quote && (
                  <p className="mt-2 text-xs italic text-gray-500">
                    &ldquo;{selectedStop.quote.slice(0, 100)}
                    {selectedStop.quote.length > 100 ? "..." : ""}&rdquo;
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedStop.youtube_id && (
                    <a
                      href={`https://youtube.com/watch?v=${selectedStop.youtube_id}&t=${selectedStop.timestamp_start ?? 0}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold text-white"
                    >
                      &#9654; {t.watchVideo}
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selectedStop.lat},${selectedStop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold text-gray-700"
                  >
                    {t.streetView}
                  </a>
                  {!tourMode && (
                    <button
                      onClick={() => {
                        const idx = filteredStops.indexOf(selectedStop);
                        if (idx >= 0) startTour(idx);
                      }}
                      className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-white"
                    >
                      {t.startHere}
                    </button>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Day Legend — top left */}
      <div className="absolute left-4 top-4 z-10 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {t.legend}
        </p>
        <div className="mt-2 space-y-2">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`flex items-center gap-2 text-xs font-semibold transition-opacity ${
                activeDays.has(day) ? "opacity-100" : "opacity-40"
              }`}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: DAY_COLORS[day].hex }}
              />
              <span className="text-gray-700">
                {lang === "pl" ? DAY_COLORS[day].labelPl : DAY_COLORS[day].label}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowRoutes((r) => !r)}
          className={`mt-3 text-[10px] font-semibold ${
            showRoutes ? "text-blue-600" : "text-gray-400"
          }`}
        >
          {t.showRoutes} {showRoutes ? "ON" : "OFF"}
        </button>
      </div>

      {/* Tour Controls — bottom center */}
      {tourMode ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white/95 px-6 py-4 shadow-xl backdrop-blur-sm">
          <button
            onClick={() => goTo(tourIndex - 1)}
            disabled={tourIndex === 0}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-30"
          >
            &larr; {t.prev}
          </button>

          <div className="text-center">
            <p className="text-sm font-extrabold text-gray-900">
              {t.stopOf
                .replace("{n}", String(tourIndex + 1))
                .replace("{total}", String(filteredStops.length))}
            </p>
            <p className="text-[10px] font-semibold text-gray-500">
              {currentTourStop
                ? lang === "pl"
                  ? DAY_COLORS[currentTourStop.day_number]?.labelPl
                  : DAY_COLORS[currentTourStop.day_number]?.label
                : ""}
            </p>
          </div>

          <button
            onClick={() => goTo(tourIndex + 1)}
            disabled={tourIndex >= filteredStops.length - 1}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-30"
          >
            {t.next} &rarr;
          </button>

          <button
            onClick={exitTour}
            className="ml-2 rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-200"
          >
            {t.exitTour}
          </button>
        </div>
      ) : (
        <button
          onClick={() => startTour(0)}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-amber-600 hover:shadow-2xl"
        >
          &#9654;&ensp;{t.startTour}
        </button>
      )}
    </div>
  );
}
