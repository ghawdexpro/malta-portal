export const DAY_COLORS: Record<number, { hex: string; name: string; label: string; labelPl: string }> = {
  1: { hex: "#085c98", name: "malta-blue", label: "Day 1 — Valletta", labelPl: "Dzień 1 — Valletta" },
  2: { hex: "#059669", name: "emerald", label: "Day 2 — Birgu & Gozo", labelPl: "Dzień 2 — Birgu i Gozo" },
  3: { hex: "#d97706", name: "amber", label: "Day 3 — Rabat & Mdina", labelPl: "Dzień 3 — Rabat i Mdina" },
};

export function fitBounds(
  stops: { lat: number | null; lng: number | null }[]
): { center: { lat: number; lng: number }; zoom: number } {
  const valid = stops.filter((s) => s.lat && s.lng) as { lat: number; lng: number }[];
  if (valid.length === 0) return { center: { lat: 35.9, lng: 14.4 }, zoom: 11 };

  const lats = valid.map((s) => s.lat);
  const lngs = valid.map((s) => s.lng);
  const center = {
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };

  const latSpan = Math.max(...lats) - Math.min(...lats);
  const lngSpan = Math.max(...lngs) - Math.min(...lngs);
  const span = Math.max(latSpan, lngSpan);

  let zoom = 11;
  if (span < 0.01) zoom = 16;
  else if (span < 0.05) zoom = 14;
  else if (span < 0.1) zoom = 13;
  else if (span < 0.2) zoom = 12;

  return { center, zoom };
}
