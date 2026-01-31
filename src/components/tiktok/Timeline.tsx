"use client";

import { useState } from "react";

export interface TimelineSegment {
  id: string;
  order: number;
  imageUrl: string;
  audioDuration: number;
  trimStart: number;
  trimEnd: number;
  text: string;
  transition?: { type: string; duration: number };
}

interface TimelineProps {
  segments: TimelineSegment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (segments: TimelineSegment[]) => void;
}

export function Timeline({ segments, selectedId, onSelect, onReorder }: TimelineProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIdx = segments.findIndex((s) => s.id === draggedId);
    const targetIdx = segments.findIndex((s) => s.id === targetId);

    const reordered = [...segments];
    const [removed] = reordered.splice(draggedIdx, 1);
    reordered.splice(targetIdx, 0, removed);

    onReorder(reordered.map((seg, i) => ({ ...seg, order: i })));
    setDraggedId(null);
  };

  const sorted = [...segments].sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-lg bg-malta-stone/10 p-3">
      <div className="mb-2 text-xs font-semibold text-foreground/50">Timeline</div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sorted.map((seg, i) => {
          const duration = seg.audioDuration - seg.trimStart - seg.trimEnd;
          return (
            <div key={seg.id} className="flex items-center gap-1">
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, seg.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, seg.id)}
                onClick={() => onSelect(seg.id)}
                className={`relative flex-shrink-0 cursor-move transition-all ${
                  selectedId === seg.id ? "ring-2 ring-malta-blue" : ""
                } ${draggedId === seg.id ? "opacity-50" : ""}`}
                style={{ width: Math.max(80, duration * 20) }}
              >
                <img
                  src={seg.imageUrl}
                  alt={`Seg ${i + 1}`}
                  className="h-16 w-full rounded-lg object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-black/60 px-1 py-0.5 text-center">
                  <span className="text-[10px] text-white">{duration.toFixed(1)}s</span>
                </div>
                <div className="absolute top-0.5 left-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-malta-blue text-[8px] font-bold text-white">
                  {i + 1}
                </div>
              </div>
              {/* Transition indicator */}
              {i < sorted.length - 1 && seg.transition?.type && seg.transition.type !== "cut" && (
                <div className="flex-shrink-0 text-xs text-foreground/30" title={seg.transition.type}>
                  ⟷
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
