"use client";

import { useState } from "react";

export interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  fontSize: number;
  color: string;
  animation: "fadeIn" | "slideUp" | "typewriter" | "none";
}

interface TextOverlayEditorProps {
  overlays: TextOverlay[];
  segmentDuration: number;
  onChange: (overlays: TextOverlay[]) => void;
}

const COLORS = ["#ffffff", "#ffff00", "#00ff00", "#ff6600", "#ff0000", "#00ccff"];
const ANIMATIONS: { value: TextOverlay["animation"]; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fadeIn", label: "Fade In" },
  { value: "slideUp", label: "Slide Up" },
  { value: "typewriter", label: "Typewriter" },
];

export function TextOverlayEditor({ overlays, segmentDuration, onChange }: TextOverlayEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addOverlay = () => {
    const newOverlay: TextOverlay = {
      id: `overlay_${Date.now()}`,
      text: "Text here",
      x: 0.5,
      y: 0.85,
      startTime: 0,
      endTime: segmentDuration,
      fontSize: 48,
      color: "#ffffff",
      animation: "fadeIn",
    };
    onChange([...overlays, newOverlay]);
    setEditingId(newOverlay.id);
  };

  const updateOverlay = (id: string, updates: Partial<TextOverlay>) => {
    onChange(overlays.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const removeOverlay = (id: string) => {
    onChange(overlays.filter((o) => o.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const editing = overlays.find((o) => o.id === editingId);

  return (
    <div className="rounded-lg border border-malta-stone/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground/50">
          Text Overlays ({overlays.length})
        </span>
        <button
          onClick={addOverlay}
          className="rounded-md bg-malta-blue/10 px-2 py-1 text-[10px] font-medium text-malta-blue transition-colors hover:bg-malta-blue/20"
        >
          + Add text
        </button>
      </div>

      {/* Overlay list */}
      {overlays.length > 0 && (
        <div className="mb-2 space-y-1">
          {overlays.map((o) => (
            <div
              key={o.id}
              onClick={() => setEditingId(o.id)}
              className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1 text-xs transition-colors ${
                editingId === o.id ? "bg-malta-blue/10 text-malta-blue" : "bg-malta-stone/10 text-foreground/60 hover:bg-malta-stone/20"
              }`}
            >
              <span className="truncate">{o.text}</span>
              <button
                onClick={(e) => { e.stopPropagation(); removeOverlay(o.id); }}
                className="ml-2 text-foreground/30 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit selected overlay */}
      {editing && (
        <div className="space-y-2 rounded-md bg-malta-stone/5 p-2">
          <input
            type="text"
            value={editing.text}
            onChange={(e) => updateOverlay(editing.id, { text: e.target.value })}
            className="w-full rounded border border-malta-stone/50 px-2 py-1 text-sm focus:border-malta-blue focus:outline-none"
          />

          <div className="grid grid-cols-2 gap-2">
            {/* Position X */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/40">X Position</span>
                <span className="font-mono text-[10px] text-malta-blue">{(editing.x * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range" min={0} max={1} step={0.01} value={editing.x}
                onChange={(e) => updateOverlay(editing.id, { x: parseFloat(e.target.value) })}
                className="w-full accent-malta-blue"
              />
            </div>
            {/* Position Y */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/40">Y Position</span>
                <span className="font-mono text-[10px] text-malta-blue">{(editing.y * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range" min={0} max={1} step={0.01} value={editing.y}
                onChange={(e) => updateOverlay(editing.id, { y: parseFloat(e.target.value) })}
                className="w-full accent-malta-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Timing */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/40">Start</span>
                <span className="font-mono text-[10px] text-malta-blue">{editing.startTime.toFixed(1)}s</span>
              </div>
              <input
                type="range" min={0} max={segmentDuration} step={0.1} value={editing.startTime}
                onChange={(e) => updateOverlay(editing.id, { startTime: parseFloat(e.target.value) })}
                className="w-full accent-malta-blue"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/40">End</span>
                <span className="font-mono text-[10px] text-malta-blue">{editing.endTime.toFixed(1)}s</span>
              </div>
              <input
                type="range" min={0} max={segmentDuration} step={0.1} value={editing.endTime}
                onChange={(e) => updateOverlay(editing.id, { endTime: parseFloat(e.target.value) })}
                className="w-full accent-malta-blue"
              />
            </div>
          </div>

          {/* Font size */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-foreground/40">Font Size</span>
              <span className="font-mono text-[10px] text-malta-blue">{editing.fontSize}px</span>
            </div>
            <input
              type="range" min={24} max={120} step={2} value={editing.fontSize}
              onChange={(e) => updateOverlay(editing.id, { fontSize: parseInt(e.target.value) })}
              className="w-full accent-malta-blue"
            />
          </div>

          {/* Color */}
          <div className="flex items-center gap-1">
            <span className="mr-1 text-[10px] text-foreground/40">Color:</span>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => updateOverlay(editing.id, { color: c })}
                className={`h-5 w-5 rounded-full border-2 ${
                  editing.color === c ? "border-malta-blue" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Animation */}
          <div className="flex items-center gap-1">
            <span className="mr-1 text-[10px] text-foreground/40">Animation:</span>
            {ANIMATIONS.map((a) => (
              <button
                key={a.value}
                onClick={() => updateOverlay(editing.id, { animation: a.value })}
                className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                  editing.animation === a.value
                    ? "bg-malta-blue text-white"
                    : "bg-malta-stone/20 text-foreground/50"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
