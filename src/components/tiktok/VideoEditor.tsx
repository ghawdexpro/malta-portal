"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Timeline, type TimelineSegment } from "./Timeline";
import { TransitionControls, type TransitionType } from "./TransitionControls";
import { KenBurnsControls, type KenBurnsSettings } from "./KenBurnsControls";
import { TextOverlayEditor, type TextOverlay } from "./TextOverlayEditor";

export interface EditorSegmentData {
  id: string;
  order: number;
  text: string;
  audioUrl: string;
  imageUrl: string;
  audioDuration: number;
  trimStart: number;
  trimEnd: number;
  kenBurns?: KenBurnsSettings;
  transition?: { type: TransitionType; duration: number };
  overlays: TextOverlay[];
}

interface VideoEditorProps {
  segments: EditorSegmentData[];
  onChange: (segments: EditorSegmentData[]) => void;
  onExport: () => void;
  onSkip: () => void;
  exporting: boolean;
  lang: "pl" | "en";
}

export function VideoEditor({ segments, onChange, onExport, onSkip, exporting, lang }: VideoEditorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(segments[0]?.id || null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animFrameRef = useRef<number>(0);

  const selected = segments.find((s) => s.id === selectedId);

  const updateSegment = (id: string, updates: Partial<EditorSegmentData>) => {
    onChange(segments.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleReorder = (reordered: TimelineSegment[]) => {
    const newSegments = reordered.map((ts) => {
      const original = segments.find((s) => s.id === ts.id)!;
      return { ...original, order: ts.order };
    });
    onChange(newSegments);
  };

  // Canvas preview
  const drawPreview = useCallback(() => {
    if (!canvasRef.current || !selected) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selected.imageUrl;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply Ken Burns if enabled
      if (selected.kenBurns?.enabled) {
        const dur = selected.audioDuration - selected.trimStart - selected.trimEnd;
        const progress = Math.min(1, currentTime / Math.max(0.1, dur));
        const kb = selected.kenBurns;
        const scale = kb.startScale + (kb.endScale - kb.startScale) * progress;
        const dx = (kb.startX + (kb.endX - kb.startX) * progress) * canvas.width;
        const dy = (kb.startY + (kb.endY - kb.startY) * progress) * canvas.height;

        ctx.save();
        ctx.translate(canvas.width / 2 + dx, canvas.height / 2 + dy);
        ctx.scale(scale, scale);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      // Draw overlays
      for (const overlay of selected.overlays) {
        if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
          let alpha = 1;
          if (overlay.animation === "fadeIn") {
            const elapsed = currentTime - overlay.startTime;
            alpha = Math.min(1, elapsed / 0.5);
          }

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = `bold ${overlay.fontSize}px Arial`;
          ctx.fillStyle = overlay.color;
          ctx.strokeStyle = "black";
          ctx.lineWidth = 3;

          const x = overlay.x * canvas.width;
          let y = overlay.y * canvas.height;

          if (overlay.animation === "slideUp") {
            const elapsed = currentTime - overlay.startTime;
            const slideOffset = Math.max(0, 30 - elapsed * 60);
            y += slideOffset;
          }

          ctx.strokeText(overlay.text, x, y);
          ctx.fillText(overlay.text, x, y);
          ctx.restore();
        }
      }
    };
  }, [selected, currentTime]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  // Audio playback with animation loop
  const play = () => {
    if (!audioRef.current || !selected) return;
    audioRef.current.src = selected.audioUrl;
    audioRef.current.currentTime = selected.trimStart;
    audioRef.current.play();
    setIsPlaying(true);

    const update = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime - (selected?.trimStart || 0));
      }
      animFrameRef.current = requestAnimationFrame(update);
    };
    animFrameRef.current = requestAnimationFrame(update);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    cancelAnimationFrame(animFrameRef.current);
  };

  const timelineSegments: TimelineSegment[] = segments.map((s) => ({
    id: s.id,
    order: s.order,
    imageUrl: s.imageUrl,
    audioDuration: s.audioDuration,
    trimStart: s.trimStart,
    trimEnd: s.trimEnd,
    text: s.text,
    transition: s.transition,
  }));

  const T = {
    pl: {
      editor: "Edytor wideo",
      editorSub: "Ustaw kolejnosc, efekty, przejscia i napisy",
      skipEditor: "Pomin edytor",
      exportVideo: "Eksportuj wideo",
      exporting: "Eksportuję...",
      preview: "Podglad",
      noSegment: "Wybierz segment",
      segDetails: "Ustawienia segmentu",
      trimStart: "Przytnij poczatek",
      trimEnd: "Przytnij koniec",
    },
    en: {
      editor: "Video Editor",
      editorSub: "Arrange segments, add effects, transitions and overlays",
      skipEditor: "Skip editor",
      exportVideo: "Export video",
      exporting: "Exporting...",
      preview: "Preview",
      noSegment: "Select a segment",
      segDetails: "Segment settings",
      trimStart: "Trim start",
      trimEnd: "Trim end",
    },
  };
  const t = T[lang];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{t.editor}</h2>
            <p className="mt-1 text-sm text-foreground/50">{t.editorSub}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSkip}
              className="rounded-lg border border-malta-stone/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-malta-stone/20"
            >
              {t.skipEditor}
            </button>
            <button
              onClick={onExport}
              disabled={exporting}
              className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
            >
              {exporting ? t.exporting : t.exportVideo}
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Timeline
        segments={timelineSegments}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onReorder={handleReorder}
      />

      {/* Editor split: Preview + Controls */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Preview */}
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 text-xs font-semibold text-foreground/50">{t.preview}</div>
          {selected ? (
            <>
              <canvas
                ref={canvasRef}
                width={640}
                height={360}
                className="w-full rounded-lg bg-black"
              />
              <audio ref={audioRef} className="hidden" onEnded={pause} />
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={isPlaying ? pause : play}
                  className="rounded-lg bg-malta-blue px-3 py-1.5 text-sm font-medium text-white"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <span className="font-mono text-xs text-foreground/40">
                  {currentTime.toFixed(1)}s / {(selected.audioDuration - selected.trimStart - selected.trimEnd).toFixed(1)}s
                </span>
                <input
                  type="range"
                  min={0}
                  max={selected.audioDuration - selected.trimStart - selected.trimEnd}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => {
                    setCurrentTime(parseFloat(e.target.value));
                    if (audioRef.current) {
                      audioRef.current.currentTime = parseFloat(e.target.value) + selected.trimStart;
                    }
                  }}
                  className="flex-1 accent-malta-blue"
                />
              </div>
            </>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-malta-stone/10 text-foreground/30">
              {t.noSegment}
            </div>
          )}
        </div>

        {/* Controls panel */}
        <div className="space-y-3">
          {selected ? (
            <>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 text-xs font-semibold text-foreground/50">{t.segDetails}</div>
                <p className="mb-3 text-xs text-foreground/40">{selected.text}</p>

                {/* Audio trimming */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-foreground/40">{t.trimStart}</span>
                      <span className="font-mono text-[10px] text-malta-blue">{selected.trimStart.toFixed(1)}s</span>
                    </div>
                    <input
                      type="range" min={0} max={selected.audioDuration * 0.4} step={0.1}
                      value={selected.trimStart}
                      onChange={(e) => updateSegment(selected.id, { trimStart: parseFloat(e.target.value) })}
                      className="w-full accent-malta-blue"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-foreground/40">{t.trimEnd}</span>
                      <span className="font-mono text-[10px] text-malta-blue">{selected.trimEnd.toFixed(1)}s</span>
                    </div>
                    <input
                      type="range" min={0} max={selected.audioDuration * 0.4} step={0.1}
                      value={selected.trimEnd}
                      onChange={(e) => updateSegment(selected.id, { trimEnd: parseFloat(e.target.value) })}
                      className="w-full accent-malta-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Ken Burns */}
              <KenBurnsControls
                settings={selected.kenBurns}
                onChange={(kb) => updateSegment(selected.id, { kenBurns: kb })}
              />

              {/* Transitions */}
              <TransitionControls
                type={selected.transition?.type || "cut"}
                duration={selected.transition?.duration || 0.5}
                onChange={(type, duration) => updateSegment(selected.id, { transition: { type, duration } })}
              />

              {/* Text Overlays */}
              <TextOverlayEditor
                overlays={selected.overlays}
                segmentDuration={selected.audioDuration - selected.trimStart - selected.trimEnd}
                onChange={(overlays) => updateSegment(selected.id, { overlays })}
              />
            </>
          ) : (
            <div className="rounded-xl bg-white p-6 text-center text-sm text-foreground/30 shadow-sm">
              {t.noSegment}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
