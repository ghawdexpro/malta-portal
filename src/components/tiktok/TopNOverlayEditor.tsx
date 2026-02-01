"use client";

import { useState, useCallback } from "react";
import { BUNDLED_FONTS } from "@/lib/tiktok-config";
import type {
  Layer, SegmentComposition, TextLayer, NumberBadgeLayer,
  ProgressBarLayer, ShapeLayer, BackgroundLayer, AnimationType,
} from "@/lib/topn-composition";
import {
  generateLayerId, createTextLayer, createShapeLayer, createProgressBarLayer,
} from "@/lib/topn-composition";

interface Props {
  segments: SegmentComposition[];
  onChange: (segments: SegmentComposition[]) => void;
  lang: "pl" | "en";
  /** Image URLs per segment for preview */
  imageUrls: Record<string, string>;
}

const ANIMATION_TYPES: AnimationType[] = ["none", "fadeIn", "fadeOut", "slideUp", "slideDown", "scaleIn"];

export function TopNOverlayEditor({ segments, onChange, lang, imageUrls }: Props) {
  const [activeSegIdx, setActiveSegIdx] = useState(0);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  const activeSeg = segments[activeSegIdx];
  const activeLayer = activeSeg?.layers.find((l) => l.id === activeLayerId) || null;

  const updateSegment = useCallback((segIdx: number, updater: (seg: SegmentComposition) => SegmentComposition) => {
    onChange(segments.map((s, i) => i === segIdx ? updater(s) : s));
  }, [segments, onChange]);

  const updateLayer = useCallback((layerId: string, updates: Partial<Layer>) => {
    updateSegment(activeSegIdx, (seg) => ({
      ...seg,
      layers: seg.layers.map((l) => l.id === layerId ? { ...l, ...updates } as Layer : l),
    }));
  }, [activeSegIdx, updateSegment]);

  const removeLayer = useCallback((layerId: string) => {
    updateSegment(activeSegIdx, (seg) => ({
      ...seg,
      layers: seg.layers.filter((l) => l.id !== layerId),
    }));
    if (activeLayerId === layerId) setActiveLayerId(null);
  }, [activeSegIdx, updateSegment, activeLayerId]);

  const addTextLayer = useCallback(() => {
    const layer = createTextLayer(lang === "pl" ? "Tekst" : "Text");
    updateSegment(activeSegIdx, (seg) => ({ ...seg, layers: [...seg.layers, layer] }));
    setActiveLayerId(layer.id);
  }, [activeSegIdx, updateSegment, lang]);

  const addShapeLayer = useCallback(() => {
    const layer = createShapeLayer();
    updateSegment(activeSegIdx, (seg) => ({ ...seg, layers: [...seg.layers, layer] }));
    setActiveLayerId(layer.id);
  }, [activeSegIdx, updateSegment]);

  const addProgressBarLayer = useCallback(() => {
    const layer = createProgressBarLayer();
    updateSegment(activeSegIdx, (seg) => ({ ...seg, layers: [...seg.layers, layer] }));
    setActiveLayerId(layer.id);
  }, [activeSegIdx, updateSegment]);

  const moveLayer = useCallback((layerId: string, direction: "up" | "down") => {
    updateSegment(activeSegIdx, (seg) => {
      const layers = [...seg.layers];
      const idx = layers.findIndex((l) => l.id === layerId);
      if (idx < 0) return seg;
      const newIdx = direction === "up" ? idx + 1 : idx - 1;
      if (newIdx < 0 || newIdx >= layers.length) return seg;
      [layers[idx], layers[newIdx]] = [layers[newIdx], layers[idx]];
      // Update zIndex to match order
      return { ...seg, layers: layers.map((l, i) => ({ ...l, zIndex: i * 10 })) };
    });
  }, [activeSegIdx, updateSegment]);

  const applyToAll = useCallback(() => {
    if (!activeSeg) return;
    // Apply current segment's layers to all other segments (preserving segment-specific text/rank)
    onChange(segments.map((seg, i) => {
      if (i === activeSegIdx) return seg;
      return {
        ...seg,
        layers: activeSeg.layers.map((l) => {
          // Preserve rank-specific values
          const existing = seg.layers.find((el) => el.type === l.type);
          if (l.type === "number-badge" && existing?.type === "number-badge") {
            return { ...l, id: existing.id, rank: existing.rank };
          }
          if (l.type === "text" && existing?.type === "text") {
            return { ...l, id: existing.id, text: existing.text };
          }
          return { ...l, id: existing?.id || generateLayerId() };
        }),
      };
    }));
  }, [activeSeg, activeSegIdx, segments, onChange]);

  if (!activeSeg) return null;

  const sortedLayers = [...activeSeg.layers].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <div className="rounded-xl border border-malta-stone/30 bg-white">
      {/* Segment tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-malta-stone/20 px-3 py-2">
        {segments.map((seg, i) => (
          <button
            key={seg.segmentId}
            onClick={() => { setActiveSegIdx(i); setActiveLayerId(null); }}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              i === activeSegIdx
                ? "bg-malta-blue text-white"
                : "text-foreground/50 hover:bg-malta-stone/20"
            }`}
          >
            {seg.isIntro ? (lang === "pl" ? "Intro" : "Intro") : `#${seg.rank}`}
          </button>
        ))}
        <button
          onClick={applyToAll}
          className="ml-auto shrink-0 rounded-lg border border-malta-stone/30 px-3 py-1.5 text-xs font-medium text-foreground/50 transition-colors hover:bg-malta-stone/10"
          title={lang === "pl" ? "Zastosuj do wszystkich" : "Apply to all"}
        >
          {lang === "pl" ? "Zastosuj do wszystkich" : "Apply to all"}
        </button>
      </div>

      <div className="flex gap-0" style={{ minHeight: 420 }}>
        {/* Preview pane */}
        <div className="flex-1 border-r border-malta-stone/20 p-4">
          <div
            className="relative mx-auto overflow-hidden rounded-lg bg-black"
            style={{ width: 216, height: 384, aspectRatio: "9/16" }}
          >
            {/* Background image */}
            {imageUrls[activeSeg.segmentId] && (
              <img
                src={imageUrls[activeSeg.segmentId]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* Layer previews */}
            {sortedLayers.filter((l) => l.visible).map((layer) => (
              <LayerPreview
                key={layer.id}
                layer={layer}
                isActive={layer.id === activeLayerId}
                onClick={() => setActiveLayerId(layer.id)}
              />
            ))}
          </div>
        </div>

        {/* Layer list + properties */}
        <div className="w-80 flex flex-col">
          {/* Layer list */}
          <div className="border-b border-malta-stone/20 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground/70">
                {lang === "pl" ? "Warstwy" : "Layers"}
              </span>
              <div className="flex gap-1">
                <button onClick={addTextLayer} className="rounded bg-malta-stone/20 px-2 py-0.5 text-[10px] hover:bg-malta-stone/30">+T</button>
                <button onClick={addShapeLayer} className="rounded bg-malta-stone/20 px-2 py-0.5 text-[10px] hover:bg-malta-stone/30">+▬</button>
                <button onClick={addProgressBarLayer} className="rounded bg-malta-stone/20 px-2 py-0.5 text-[10px] hover:bg-malta-stone/30">+▶</button>
              </div>
            </div>
            <div className="max-h-40 space-y-1 overflow-y-auto">
              {sortedLayers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs ${
                    layer.id === activeLayerId ? "bg-malta-blue/10 text-malta-blue" : "text-foreground/60 hover:bg-malta-stone/10"
                  }`}
                >
                  <span className="w-3 text-center opacity-50">
                    {layer.type === "background" ? "🖼" : layer.type === "text" ? "T" : layer.type === "number-badge" ? "#" : layer.type === "progress-bar" ? "▶" : "▬"}
                  </span>
                  <span className="flex-1 truncate">
                    {layer.type === "text" ? (layer as TextLayer).text.slice(0, 20) :
                     layer.type === "number-badge" ? `#${(layer as NumberBadgeLayer).rank}` :
                     layer.type}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); updateLayer(layer.id, { visible: !layer.visible }); }}
                    className="opacity-40 hover:opacity-100"
                  >
                    {layer.visible ? "👁" : "🚫"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, "up"); }}
                    className="opacity-40 hover:opacity-100"
                  >↑</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, "down"); }}
                    className="opacity-40 hover:opacity-100"
                  >↓</button>
                  {layer.type !== "background" && layer.type !== "number-badge" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeLayer(layer.id); }}
                      className="text-red-400 opacity-40 hover:opacity-100"
                    >×</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Properties panel */}
          <div className="flex-1 overflow-y-auto p-3">
            {activeLayer ? (
              <LayerProperties layer={activeLayer} onChange={(u) => updateLayer(activeLayer.id, u)} lang={lang} />
            ) : (
              <p className="text-center text-xs text-foreground/30 pt-8">
                {lang === "pl" ? "Wybierz warstwę" : "Select a layer"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Layer Preview ──────────────────────────────────────────

function LayerPreview({ layer, isActive, onClick }: { layer: Layer; isActive: boolean; onClick: () => void }) {
  const style: React.CSSProperties = {
    position: "absolute",
    cursor: "pointer",
    outline: isActive ? "2px solid #3b82f6" : "none",
    outlineOffset: 2,
  };

  switch (layer.type) {
    case "background":
      return (
        <div
          onClick={onClick}
          style={{
            ...style,
            inset: 0,
            backgroundColor: `rgba(0,0,0,${layer.darken})`,
            backdropFilter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
          }}
        />
      );

    case "text":
      return (
        <div
          onClick={onClick}
          style={{
            ...style,
            left: layer.x === 0.5 ? "50%" : `${layer.x * 100}%`,
            top: `${layer.y * 100}%`,
            transform: layer.x === 0.5 ? "translateX(-50%)" : undefined,
            fontSize: Math.round(layer.fontSize * 216 / 1080),
            color: layer.color,
            textShadow: `0 0 ${layer.borderWidth}px ${layer.borderColor}`,
            fontWeight: "bold",
            whiteSpace: "nowrap",
            opacity: layer.opacity,
          }}
        >
          {(layer as TextLayer).text}
        </div>
      );

    case "number-badge":
      return (
        <div
          onClick={onClick}
          style={{
            ...style,
            left: layer.x === 0.5 ? "50%" : `${layer.x * 100}%`,
            top: layer.y === 0.5 ? "50%" : `${layer.y * 100}%`,
            transform: `${layer.x === 0.5 ? "translateX(-50%)" : ""} ${layer.y === 0.5 ? "translateY(-50%)" : ""}`.trim() || undefined,
            fontSize: Math.round(layer.fontSize * 216 / 1080),
            color: layer.color,
            textShadow: `0 0 ${layer.borderWidth}px ${layer.borderColor}`,
            fontWeight: "bold",
            opacity: layer.opacity,
          }}
        >
          {(layer as NumberBadgeLayer).rank}
        </div>
      );

    case "progress-bar":
      return (
        <div
          onClick={onClick}
          style={{
            ...style,
            left: 0,
            right: 0,
            bottom: 0,
            height: Math.max(4, Math.round(layer.barHeight * 216 / 1080)),
            backgroundColor: (layer as ProgressBarLayer).color,
            opacity: layer.opacity,
          }}
        />
      );

    case "shape":
      return (
        <div
          onClick={onClick}
          style={{
            ...style,
            left: `${layer.x * 100}%`,
            top: `${layer.y * 100}%`,
            width: `${layer.width * 100}%`,
            height: `${layer.height * 100}%`,
            backgroundColor: (layer as ShapeLayer).fillColor,
            opacity: (layer as ShapeLayer).fillOpacity,
          }}
        />
      );

    default:
      return null;
  }
}

// ── Layer Properties Panel ─────────────────────────────────

function LayerProperties({ layer, onChange, lang }: { layer: Layer; onChange: (u: Partial<Layer>) => void; lang: "pl" | "en" }) {
  const t = lang === "pl";

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-foreground/50 uppercase">
        {layer.type === "background" ? (t ? "Tło" : "Background") :
         layer.type === "text" ? (t ? "Tekst" : "Text") :
         layer.type === "number-badge" ? (t ? "Numer" : "Number") :
         layer.type === "progress-bar" ? (t ? "Pasek" : "Progress") :
         t ? "Kształt" : "Shape"}
      </h4>

      {/* Common: Position */}
      {layer.type !== "background" && (
        <div className="grid grid-cols-2 gap-2">
          <SliderField label="X" value={layer.x} min={0} max={1} step={0.01} onChange={(v) => onChange({ x: v })} />
          <SliderField label="Y" value={layer.y} min={0} max={1} step={0.01} onChange={(v) => onChange({ y: v })} />
        </div>
      )}

      {/* Common: Opacity */}
      <SliderField label={t ? "Przezroczystość" : "Opacity"} value={layer.opacity} min={0} max={1} step={0.05} onChange={(v) => onChange({ opacity: v })} />

      {/* Type-specific props */}
      {layer.type === "background" && (
        <>
          <SliderField label={t ? "Przyciemnienie" : "Darken"} value={(layer as BackgroundLayer).darken} min={0} max={0.8} step={0.05} onChange={(v) => onChange({ darken: v } as Partial<BackgroundLayer>)} />
          <SliderField label={t ? "Rozmycie" : "Blur"} value={(layer as BackgroundLayer).blur} min={0} max={10} step={1} onChange={(v) => onChange({ blur: v } as Partial<BackgroundLayer>)} />
        </>
      )}

      {layer.type === "text" && (
        <>
          <TextField label={t ? "Tekst" : "Text"} value={(layer as TextLayer).text} onChange={(v) => onChange({ text: v } as Partial<TextLayer>)} />
          <SliderField label={t ? "Rozmiar" : "Size"} value={(layer as TextLayer).fontSize} min={20} max={200} step={2} onChange={(v) => onChange({ fontSize: v } as Partial<TextLayer>)} />
          <ColorField label={t ? "Kolor" : "Color"} value={(layer as TextLayer).color} onChange={(v) => onChange({ color: v } as Partial<TextLayer>)} />
          <FontField label={t ? "Czcionka" : "Font"} value={(layer as TextLayer).fontId} onChange={(v) => onChange({ fontId: v } as Partial<TextLayer>)} />
          <SliderField label={t ? "Obramowanie" : "Border"} value={(layer as TextLayer).borderWidth} min={0} max={12} step={1} onChange={(v) => onChange({ borderWidth: v } as Partial<TextLayer>)} />
          <AnimField label={t ? "Wejście" : "Enter"} value={layer.enterAnimation} onChange={(v) => onChange({ enterAnimation: v })} />
        </>
      )}

      {layer.type === "number-badge" && (
        <>
          <SliderField label={t ? "Rozmiar" : "Size"} value={(layer as NumberBadgeLayer).fontSize} min={40} max={500} step={10} onChange={(v) => onChange({ fontSize: v } as Partial<NumberBadgeLayer>)} />
          <ColorField label={t ? "Kolor" : "Color"} value={(layer as NumberBadgeLayer).color} onChange={(v) => onChange({ color: v } as Partial<NumberBadgeLayer>)} />
          <FontField label={t ? "Czcionka" : "Font"} value={(layer as NumberBadgeLayer).fontId} onChange={(v) => onChange({ fontId: v } as Partial<NumberBadgeLayer>)} />
          <SliderField label={t ? "Obramowanie" : "Border"} value={(layer as NumberBadgeLayer).borderWidth} min={0} max={16} step={1} onChange={(v) => onChange({ borderWidth: v } as Partial<NumberBadgeLayer>)} />
          <AnimField label={t ? "Wejście" : "Enter"} value={layer.enterAnimation} onChange={(v) => onChange({ enterAnimation: v })} />
        </>
      )}

      {layer.type === "progress-bar" && (
        <>
          <SelectField
            label={t ? "Styl" : "Style"}
            value={(layer as ProgressBarLayer).style}
            options={[
              { value: "bar", label: t ? "Pasek" : "Bar" },
              { value: "countdown", label: t ? "Odliczanie" : "Countdown" },
              { value: "both", label: t ? "Oba" : "Both" },
            ]}
            onChange={(v) => onChange({ style: v } as Partial<ProgressBarLayer>)}
          />
          <ColorField label={t ? "Kolor" : "Color"} value={(layer as ProgressBarLayer).color} onChange={(v) => onChange({ color: v } as Partial<ProgressBarLayer>)} />
          <SliderField label={t ? "Wysokość" : "Height"} value={(layer as ProgressBarLayer).barHeight} min={2} max={20} step={1} onChange={(v) => onChange({ barHeight: v } as Partial<ProgressBarLayer>)} />
        </>
      )}

      {layer.type === "shape" && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <SliderField label={t ? "Szer." : "W"} value={layer.width} min={0} max={1} step={0.01} onChange={(v) => onChange({ width: v })} />
            <SliderField label={t ? "Wys." : "H"} value={layer.height} min={0} max={1} step={0.01} onChange={(v) => onChange({ height: v })} />
          </div>
          <ColorField label={t ? "Wypełnienie" : "Fill"} value={(layer as ShapeLayer).fillColor} onChange={(v) => onChange({ fillColor: v } as Partial<ShapeLayer>)} />
          <SliderField label={t ? "Przezroczystość" : "Opacity"} value={(layer as ShapeLayer).fillOpacity} min={0} max={1} step={0.05} onChange={(v) => onChange({ fillOpacity: v } as Partial<ShapeLayer>)} />
        </>
      )}
    </div>
  );
}

// ── Field Components ───────────────────────────────────────

function SliderField({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium text-foreground/40">{label}</span>
      <div className="flex items-center gap-2">
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="h-1 flex-1 appearance-none rounded bg-malta-stone/30 accent-malta-blue"
        />
        <span className="w-10 text-right text-[10px] text-foreground/50">{typeof value === "number" ? (value % 1 === 0 ? value : value.toFixed(2)) : value}</span>
      </div>
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium text-foreground/40">{label}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full rounded border border-malta-stone/30 px-2 py-1 text-xs focus:border-malta-blue focus:outline-none"
      />
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-[10px] font-medium text-foreground/40">{label}</span>
      <input type="color" value={value.startsWith("#") ? value : "#ffffff"} onChange={(e) => onChange(e.target.value)}
        className="h-5 w-8 cursor-pointer rounded border border-malta-stone/30"
      />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-20 rounded border border-malta-stone/30 px-1 py-0.5 text-[10px] focus:border-malta-blue focus:outline-none"
      />
    </label>
  );
}

function FontField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium text-foreground/40">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full rounded border border-malta-stone/30 px-2 py-1 text-xs focus:border-malta-blue focus:outline-none"
      >
        {Object.entries(BUNDLED_FONTS).map(([id, f]) => (
          <option key={id} value={id}>{f.name}</option>
        ))}
      </select>
    </label>
  );
}

function SelectField({ label, value, options, onChange }: {
  label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium text-foreground/40">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full rounded border border-malta-stone/30 px-2 py-1 text-xs focus:border-malta-blue focus:outline-none"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

function AnimField({ label, value, onChange }: {
  label: string; value?: { type: AnimationType; delay: number; duration: number }; onChange: (v: { type: AnimationType; delay: number; duration: number }) => void;
}) {
  const anim = value || { type: "none" as AnimationType, delay: 0, duration: 0.3 };
  return (
    <div>
      <span className="text-[10px] font-medium text-foreground/40">{label}</span>
      <div className="mt-0.5 flex gap-1">
        <select value={anim.type} onChange={(e) => onChange({ ...anim, type: e.target.value as AnimationType })}
          className="flex-1 rounded border border-malta-stone/30 px-1 py-0.5 text-[10px] focus:border-malta-blue focus:outline-none"
        >
          {ANIMATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {anim.type !== "none" && (
          <>
            <input type="number" value={anim.delay} step={0.1} min={0} max={5}
              onChange={(e) => onChange({ ...anim, delay: parseFloat(e.target.value) || 0 })}
              className="w-12 rounded border border-malta-stone/30 px-1 py-0.5 text-[10px]" placeholder="delay"
            />
            <input type="number" value={anim.duration} step={0.1} min={0.1} max={3}
              onChange={(e) => onChange({ ...anim, duration: parseFloat(e.target.value) || 0.3 })}
              className="w-12 rounded border border-malta-stone/30 px-1 py-0.5 text-[10px]" placeholder="dur"
            />
          </>
        )}
      </div>
    </div>
  );
}
