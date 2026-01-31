"use client";

export type TransitionType = "cut" | "crossfade" | "slideLeft" | "slideRight";

interface TransitionControlsProps {
  type: TransitionType;
  duration: number;
  onChange: (type: TransitionType, duration: number) => void;
  label?: string;
}

const TRANSITIONS: { type: TransitionType; label: string; icon: string }[] = [
  { type: "cut", label: "Cut", icon: "✂️" },
  { type: "crossfade", label: "Crossfade", icon: "🔀" },
  { type: "slideLeft", label: "Slide Left", icon: "⬅️" },
  { type: "slideRight", label: "Slide Right", icon: "➡️" },
];

export function TransitionControls({ type, duration, onChange, label }: TransitionControlsProps) {
  return (
    <div className="rounded-lg border border-malta-stone/30 p-3">
      <div className="mb-2 text-xs font-semibold text-foreground/50">
        {label || "Transition to next"}
      </div>
      <div className="flex gap-1">
        {TRANSITIONS.map((t) => (
          <button
            key={t.type}
            onClick={() => onChange(t.type, duration)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
              type === t.type
                ? "bg-malta-blue text-white"
                : "bg-malta-stone/20 text-foreground/50 hover:bg-malta-stone/40"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      {type !== "cut" && (
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-foreground/40">Duration</span>
            <span className="font-mono text-[10px] text-malta-blue">{duration.toFixed(1)}s</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={2.0}
            step={0.1}
            value={duration}
            onChange={(e) => onChange(type, parseFloat(e.target.value))}
            className="w-full accent-malta-blue"
          />
        </div>
      )}
    </div>
  );
}
