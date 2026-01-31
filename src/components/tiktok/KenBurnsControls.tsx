"use client";

export interface KenBurnsSettings {
  enabled: boolean;
  startScale: number;
  endScale: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const DEFAULT_KB: KenBurnsSettings = {
  enabled: false,
  startScale: 1.0,
  endScale: 1.3,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};

const PRESETS: { label: string; settings: Omit<KenBurnsSettings, "enabled"> }[] = [
  { label: "Zoom In", settings: { startScale: 1.0, endScale: 1.4, startX: 0, startY: 0, endX: 0, endY: 0 } },
  { label: "Zoom Out", settings: { startScale: 1.4, endScale: 1.0, startX: 0, startY: 0, endX: 0, endY: 0 } },
  { label: "Pan Right", settings: { startScale: 1.2, endScale: 1.2, startX: -0.08, startY: 0, endX: 0.08, endY: 0 } },
  { label: "Pan Left", settings: { startScale: 1.2, endScale: 1.2, startX: 0.08, startY: 0, endX: -0.08, endY: 0 } },
  { label: "Pan Down", settings: { startScale: 1.2, endScale: 1.2, startX: 0, startY: -0.05, endX: 0, endY: 0.05 } },
];

interface KenBurnsControlsProps {
  settings: KenBurnsSettings | undefined;
  onChange: (settings: KenBurnsSettings) => void;
}

export function KenBurnsControls({ settings, onChange }: KenBurnsControlsProps) {
  const kb = settings || DEFAULT_KB;

  return (
    <div className="rounded-lg border border-malta-stone/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground/50">Ken Burns Effect</span>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={kb.enabled}
            onChange={(e) => onChange({ ...kb, enabled: e.target.checked })}
            className="h-3.5 w-3.5 accent-malta-blue"
          />
          <span className="text-[10px] text-foreground/40">{kb.enabled ? "On" : "Off"}</span>
        </label>
      </div>

      {kb.enabled && (
        <>
          {/* Presets */}
          <div className="mb-3 flex flex-wrap gap-1">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => onChange({ ...p.settings, enabled: true })}
                className="rounded-md bg-malta-stone/20 px-2 py-1 text-[10px] font-medium text-foreground/60 transition-colors hover:bg-malta-stone/40"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Scale controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/40">Start Zoom</span>
                <span className="font-mono text-[10px] text-malta-blue">{kb.startScale.toFixed(1)}x</span>
              </div>
              <input
                type="range" min={1.0} max={2.0} step={0.1}
                value={kb.startScale}
                onChange={(e) => onChange({ ...kb, startScale: parseFloat(e.target.value) })}
                className="w-full accent-malta-blue"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/40">End Zoom</span>
                <span className="font-mono text-[10px] text-malta-blue">{kb.endScale.toFixed(1)}x</span>
              </div>
              <input
                type="range" min={1.0} max={2.0} step={0.1}
                value={kb.endScale}
                onChange={(e) => onChange({ ...kb, endScale: parseFloat(e.target.value) })}
                className="w-full accent-malta-blue"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
