"use client";

import { useState, useRef, useCallback } from "react";

interface ScriptSegment {
  text: string;
  visual_prompt: string;
}

interface SegmentAssets {
  text: string;
  visual_prompt: string;
  audioUrl?: string;
  imageUrl?: string;
  audioApproved: boolean;
  imageApproved: boolean;
  audioLoading: boolean;
  imageLoading: boolean;
}

type Tab = "create" | "gallery" | "compose";
type Step = "topic" | "script" | "audio" | "images" | "assemble" | "done";

interface GallerySession {
  id: string;
  created_at: string;
  images: string[];
  audio: string[];
  videos: string[];
  finalVideo?: string;
}

interface GalleryData {
  sessions: GallerySession[];
  bestImages: { url: string; name: string; size: number; created_at: string }[];
  finalVideos: { url: string; name: string; size: number; created_at: string }[];
  totals: { sessions: number; images: number; audio: number; videos: number };
}

export default function TikTokCreatorPage() {
  const [activeTab, setActiveTab] = useState<Tab>("create");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">TikTok Creator</h1>
        <p className="mt-1 text-foreground/50">
          Studio produkcji ASMR Monika
        </p>
      </div>

      <div className="mb-6 flex gap-1 rounded-xl bg-malta-stone/30 p-1">
        {([
          { id: "create", label: "Nowe wideo", icon: "🎬" },
          { id: "gallery", label: "Biblioteka", icon: "🖼️" },
          { id: "compose", label: "Kompozytor zdjęć", icon: "📸" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/70"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "create" && <CreateVideoTab />}
      {activeTab === "gallery" && <GalleryTab />}
      {activeTab === "compose" && <PhotoComposerTab />}
    </div>
  );
}

/* ─── CREATE VIDEO TAB ─── */

function CreateVideoTab() {
  const [step, setStep] = useState<Step>("topic");
  const [topic, setTopic] = useState("");
  const [sessionId] = useState(() => String(Date.now()));
  const [script, setScript] = useState<ScriptSegment[]>([]);
  const [segments, setSegments] = useState<SegmentAssets[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);

  const generateScript = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tiktok/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd");
      setScript(data.script);
      setSegments(
        data.script.map((seg: ScriptSegment) => ({
          text: seg.text,
          visual_prompt: seg.visual_prompt,
          audioApproved: false,
          imageApproved: false,
          audioLoading: false,
          imageLoading: false,
        }))
      );
      setStep("script");
    } catch (err) {
      setError(String(err));
    }
    setLoading(false);
  };

  const generateAudio = async (index: number) => {
    updateSegment(index, { audioLoading: true });
    try {
      const res = await fetch("/api/tiktok/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: segments[index].text,
          sessionId,
          segmentIndex: index,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd");
      updateSegment(index, { audioUrl: data.audioUrl + "&t=" + Date.now(), audioLoading: false });
    } catch (err) {
      setError(`Audio ${index + 1}: ${err}`);
      updateSegment(index, { audioLoading: false });
    }
  };

  const generateAllAudio = async () => {
    for (let i = 0; i < segments.length; i++) {
      if (!segments[i].audioUrl) {
        await generateAudio(i);
      }
    }
  };

  const generateImage = async (index: number) => {
    updateSegment(index, { imageLoading: true });
    try {
      const res = await fetch("/api/tiktok/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visualPrompt: segments[index].visual_prompt,
          sessionId,
          segmentIndex: index,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd");
      updateSegment(index, { imageUrl: data.imageUrl + "&t=" + Date.now(), imageLoading: false });
    } catch (err) {
      setError(`Obraz ${index + 1}: ${err}`);
      updateSegment(index, { imageLoading: false });
    }
  };

  const generateAllImages = async () => {
    for (let i = 0; i < segments.length; i++) {
      if (!segments[i].imageUrl) {
        await generateImage(i);
        if (i < segments.length - 1) {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }
  };

  const assembleVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tiktok/assemble", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          segmentCount: segments.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd");
      setFinalVideoUrl(data.videoUrl);
      setStep("done");
    } catch (err) {
      setError(`Montaż: ${err}`);
    }
    setLoading(false);
  };

  const updateSegment = (index: number, updates: Partial<SegmentAssets>) => {
    setSegments((prev) =>
      prev.map((seg, i) => (i === index ? { ...seg, ...updates } : seg))
    );
  };

  const updateSegmentText = (index: number, text: string) => {
    updateSegment(index, { text });
    setScript((prev) =>
      prev.map((seg, i) => (i === index ? { ...seg, text } : seg))
    );
  };

  const updateSegmentPrompt = (index: number, visual_prompt: string) => {
    updateSegment(index, { visual_prompt });
    setScript((prev) =>
      prev.map((seg, i) => (i === index ? { ...seg, visual_prompt } : seg))
    );
  };

  const allAudioDone = segments.length > 0 && segments.every((s) => s.audioUrl && s.audioApproved);
  const allImagesDone = segments.length > 0 && segments.every((s) => s.imageUrl && s.imageApproved);

  const STEPS: Step[] = ["topic", "script", "audio", "images", "assemble", "done"];
  const STEP_LABELS = ["Temat", "Skrypt", "Audio", "Obrazy", "Montaż", "Gotowe"];
  const stepIdx = STEPS.indexOf(step);

  return (
    <div>
      {/* Steps indicator */}
      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step === s
                    ? "bg-malta-blue text-white"
                    : stepIdx > i
                    ? "bg-green-500 text-white"
                    : "bg-malta-stone/50 text-foreground/30"
                }`}
              >
                {stepIdx > i ? "✓" : i + 1}
              </div>
              <span className="mt-1 text-[10px] text-foreground/40">{STEP_LABELS[i]}</span>
            </div>
            {i < 5 && (
              <div className={`h-0.5 w-6 ${stepIdx > i ? "bg-green-500" : "bg-malta-stone/50"}`} />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold">✕</button>
        </div>
      )}

      {/* STEP: Topic */}
      {step === "topic" && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Wybierz temat</h2>
          <p className="mt-1 text-sm text-foreground/50">
            Co Monika pokaże nam dzisiaj na Malcie?
          </p>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="np. Spacer po starym mieście Mdina o zachodzie słońca"
            className="mt-4 w-full rounded-lg border border-malta-stone/50 px-4 py-3 text-lg focus:border-malta-blue focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && generateScript()}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Ukryte uliczki Mdiny",
              "Targ rybny w Marsaxlokk",
              "Błękitna Laguna o świcie",
              "Wieczorna Valletta",
              "Gozo - wyspa ciszy",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTopic(suggestion)}
                className="rounded-full bg-malta-stone/30 px-3 py-1 text-sm text-foreground/60 transition-colors hover:bg-malta-stone/50"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <button
            onClick={generateScript}
            disabled={loading || !topic.trim()}
            className="mt-6 rounded-lg bg-malta-blue px-6 py-3 font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
          >
            {loading ? "Generuję skrypt..." : "Generuj skrypt"}
          </button>
        </div>
      )}

      {/* STEP: Script Review */}
      {step === "script" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Sprawdź skrypt</h2>
                <p className="mt-1 text-sm text-foreground/50">
                  Edytuj tekst i prompty wizualne. Temat: &quot;{topic}&quot;
                </p>
              </div>
              <button
                onClick={() => { setStep("topic"); setScript([]); setSegments([]); }}
                className="text-sm text-foreground/40 hover:text-foreground/60"
              >
                ← Wróć
              </button>
            </div>
          </div>

          {segments.map((seg, i) => (
            <div key={i} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-malta-blue/60">
                Segment {i + 1}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground/50">
                    Narracja po polsku
                  </label>
                  <textarea
                    value={seg.text}
                    onChange={(e) => updateSegmentText(i, e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-malta-stone/50 px-3 py-2 text-sm focus:border-malta-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground/50">
                    Prompt wizualny (EN)
                  </label>
                  <textarea
                    value={seg.visual_prompt}
                    onChange={(e) => updateSegmentPrompt(i, e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-malta-stone/50 px-3 py-2 text-sm focus:border-malta-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={generateScript}
              disabled={loading}
              className="rounded-lg border border-malta-stone/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-malta-stone/20 disabled:opacity-50"
            >
              {loading ? "Generuję..." : "Generuj ponownie"}
            </button>
            <button
              onClick={() => setStep("audio")}
              className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
            >
              Zatwierdź skrypt →
            </button>
          </div>
        </div>
      )}

      {/* STEP: Audio Generation */}
      {step === "audio" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Generuj audio</h2>
                <p className="mt-1 text-sm text-foreground/50">
                  Wygeneruj i zatwierdź audio dla każdego segmentu
                </p>
              </div>
              <button
                onClick={() => setStep("script")}
                className="text-sm text-foreground/40 hover:text-foreground/60"
              >
                ← Wróć do skryptu
              </button>
            </div>
            <button
              onClick={generateAllAudio}
              disabled={segments.some((s) => s.audioLoading)}
              className="mt-4 rounded-lg bg-malta-blue/10 px-4 py-2 text-sm font-medium text-malta-blue transition-colors hover:bg-malta-blue/20 disabled:opacity-50"
            >
              Generuj wszystkie audio
            </button>
          </div>

          {segments.map((seg, i) => (
            <div key={i} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 text-xs font-bold uppercase tracking-wider text-malta-blue/60">
                    Segment {i + 1}
                  </div>
                  <p className="text-sm text-foreground/70">{seg.text}</p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  {seg.audioApproved && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Zatwierdzone
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                {seg.audioUrl ? (
                  <>
                    <audio controls preload="auto" src={seg.audioUrl} className="h-10 flex-1" />
                    <button
                      onClick={() => updateSegment(i, { audioApproved: true })}
                      disabled={seg.audioApproved}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        seg.audioApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {seg.audioApproved ? "✓" : "Zatwierdź"}
                    </button>
                    <button
                      onClick={() => generateAudio(i)}
                      disabled={seg.audioLoading}
                      className="rounded-lg border border-malta-stone/50 px-3 py-1.5 text-sm transition-colors hover:bg-malta-stone/20 disabled:opacity-50"
                    >
                      Ponów
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => generateAudio(i)}
                    disabled={seg.audioLoading}
                    className="rounded-lg bg-malta-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
                  >
                    {seg.audioLoading ? "Generuję..." : "Generuj audio"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {allAudioDone && (
            <button
              onClick={() => setStep("images")}
              className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
            >
              Wszystkie zatwierdzone → Generuj obrazy
            </button>
          )}
        </div>
      )}

      {/* STEP: Image Generation */}
      {step === "images" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Generuj obrazy</h2>
                <p className="mt-1 text-sm text-foreground/50">
                  Wygeneruj i zatwierdź obrazy dla każdego segmentu
                </p>
              </div>
              <button
                onClick={() => setStep("audio")}
                className="text-sm text-foreground/40 hover:text-foreground/60"
              >
                ← Wróć do audio
              </button>
            </div>
            <button
              onClick={generateAllImages}
              disabled={segments.some((s) => s.imageLoading)}
              className="mt-4 rounded-lg bg-malta-blue/10 px-4 py-2 text-sm font-medium text-malta-blue transition-colors hover:bg-malta-blue/20 disabled:opacity-50"
            >
              Generuj wszystkie obrazy
            </button>
          </div>

          {segments.map((seg, i) => (
            <div key={i} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-malta-blue/60">
                Segment {i + 1}
              </div>
              <p className="mb-3 text-xs text-foreground/50">{seg.visual_prompt}</p>

              {seg.imageUrl ? (
                <div>
                  <img
                    src={seg.imageUrl}
                    alt={`Segment ${i + 1}`}
                    className="w-full rounded-lg"
                  />
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => updateSegment(i, { imageApproved: true })}
                      disabled={seg.imageApproved}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        seg.imageApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {seg.imageApproved ? "✓ Zatwierdzone" : "Zatwierdź"}
                    </button>
                    <button
                      onClick={() => {
                        updateSegment(i, { imageUrl: undefined, imageApproved: false });
                        generateImage(i);
                      }}
                      disabled={seg.imageLoading}
                      className="rounded-lg border border-malta-stone/50 px-3 py-1.5 text-sm transition-colors hover:bg-malta-stone/20 disabled:opacity-50"
                    >
                      Generuj ponownie
                    </button>
                    <button
                      onClick={() => saveToBest(seg.imageUrl!)}
                      className="rounded-lg border border-malta-gold/50 px-3 py-1.5 text-sm text-malta-gold transition-colors hover:bg-malta-gold/10"
                    >
                      ★ Zapisz do najlepszych
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => generateImage(i)}
                  disabled={seg.imageLoading}
                  className="rounded-lg bg-malta-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
                >
                  {seg.imageLoading ? "Generuję..." : "Generuj obraz"}
                </button>
              )}
            </div>
          ))}

          {allImagesDone && (
            <button
              onClick={() => setStep("assemble")}
              className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
            >
              Wszystkie zatwierdzone → Montaż wideo
            </button>
          )}
        </div>
      )}

      {/* STEP: Assemble */}
      {step === "assemble" && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Montaż wideo</h2>
          <p className="mt-1 text-sm text-foreground/50">
            Połącz {segments.length} segmentów w finalne wideo TikTok
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-5">
            {segments.map((seg, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                {seg.imageUrl && (
                  <img src={seg.imageUrl} alt={`Seg ${i + 1}`} className="aspect-video w-full object-cover" />
                )}
                <div className="bg-malta-stone/20 p-2 text-center text-xs">Seg {i + 1} ✓</div>
              </div>
            ))}
          </div>

          <button
            onClick={assembleVideo}
            disabled={loading}
            className="mt-6 rounded-lg bg-malta-blue px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
          >
            {loading ? "Montuję z FFmpeg..." : "Zmontuj finalne wideo"}
          </button>
        </div>
      )}

      {/* STEP: Done */}
      {step === "done" && finalVideoUrl && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-green-700">Wideo gotowe</h2>
          <p className="mt-1 text-sm text-foreground/50">
            &quot;{topic}&quot; — {segments.length} segmentów
          </p>
          <video
            controls
            preload="auto"
            src={finalVideoUrl}
            className="mt-4 w-full rounded-lg"
          />
          <div className="mt-4 flex gap-3">
            <a
              href={finalVideoUrl}
              download
              className="rounded-lg bg-malta-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-malta-blue/80"
            >
              Pobierz MP4
            </a>
            <button
              onClick={() => {
                setStep("topic");
                setTopic("");
                setScript([]);
                setSegments([]);
                setFinalVideoUrl(null);
              }}
              className="rounded-lg border border-malta-stone/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-malta-stone/20"
            >
              Utwórz kolejne
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

async function saveToBest(imageUrl: string) {
  window.open(imageUrl, "_blank");
}

/* ─── GALLERY TAB ─── */

function GalleryTab() {
  const [data, setData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "images" | "audio" | "videos">("all");

  const loadGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tiktok/gallery");
      const json = await res.json();
      setData(json);
    } catch {}
    setLoading(false);
  }, []);

  if (!data && !loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-xl font-semibold">Biblioteka materiałów</h2>
        <p className="mt-2 text-sm text-foreground/50">
          Przeglądaj wszystkie wygenerowane obrazy, audio i wideo
        </p>
        <button
          onClick={loadGallery}
          className="mt-4 rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
        >
          Załaduj bibliotekę
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <p className="text-foreground/50">Skanuję materiały...</p>
      </div>
    );
  }

  if (!data) return null;

  const FILTER_LABELS: Record<string, string> = {
    all: "Wszystko",
    images: "Obrazy",
    audio: "Audio",
    videos: "Wideo",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Sesje", value: data.totals.sessions, color: "text-malta-blue" },
          { label: "Obrazy", value: data.totals.images, color: "text-green-600" },
          { label: "Audio", value: data.totals.audio, color: "text-purple-600" },
          { label: "Wideo", value: data.totals.videos, color: "text-malta-gold" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-4 shadow-sm">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-foreground/50">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {(["all", "images", "audio", "videos"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              filter === f
                ? "bg-malta-blue text-white"
                : "bg-malta-stone/30 text-foreground/50 hover:bg-malta-stone/50"
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
        <button
          onClick={loadGallery}
          className="ml-auto rounded-full bg-malta-stone/30 px-3 py-1 text-sm text-foreground/50 transition-colors hover:bg-malta-stone/50"
        >
          Odśwież
        </button>
      </div>

      {(filter === "all" || filter === "images") && data.bestImages.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">★ Najlepsze</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {data.bestImages.map((img) => (
              <div key={img.url} className="group relative overflow-hidden rounded-lg">
                <img
                  src={img.url}
                  alt={img.name}
                  className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="truncate text-xs text-white">{img.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(filter === "all" || filter === "videos") && data.finalVideos.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">Finalne wideo</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.finalVideos.map((vid) => (
              <div key={vid.url} className="rounded-xl bg-white p-4 shadow-sm">
                <video controls preload="metadata" src={vid.url} className="w-full rounded-lg" />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-foreground/50">
                    {(vid.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                  <span className="text-foreground/40">
                    {new Date(vid.created_at).toLocaleDateString("pl-PL")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.sessions.map((session) => (
        <div key={session.id} className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Sesja {session.id}</h3>
            <span className="text-xs text-foreground/40">
              {new Date(session.created_at).toLocaleString("pl-PL")}
            </span>
          </div>

          {(filter === "all" || filter === "images") && session.images.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 text-xs font-medium text-foreground/40">
                Obrazy ({session.images.length})
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {session.images.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt=""
                    className="h-24 w-40 flex-shrink-0 cursor-pointer rounded-lg object-cover transition-transform hover:scale-105"
                    onClick={() => window.open(url, "_blank")}
                  />
                ))}
              </div>
            </div>
          )}

          {(filter === "all" || filter === "audio") && session.audio.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-medium text-foreground/40">
                Audio ({session.audio.length})
              </p>
              <div className="space-y-1">
                {session.audio.map((url) => (
                  <audio key={url} controls preload="metadata" src={url} className="h-8 w-full" />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── PHOTO COMPOSER TAB ─── */

function PhotoComposerTab() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [compositePrompt, setCompositePrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const compose = async () => {
    if (!uploadedImage || !compositePrompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tiktok/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          backgroundImage: uploadedImage.split(",")[1],
          prompt: compositePrompt,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd");
      setResult(data.imageUrl);
    } catch (err) {
      setError(String(err));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Kompozytor zdjęć</h2>
        <p className="mt-1 text-sm text-foreground/50">
          Wgraj prawdziwe zdjęcie z Malty, opisz zmiany i umieść Monikę w scenie
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-medium">1. Wgraj zdjęcie tła</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          {uploadedImage ? (
            <div>
              <img src={uploadedImage} alt="Wgrane" className="w-full rounded-lg" />
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setResult(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="mt-2 text-sm text-foreground/40 hover:text-foreground/60"
              >
                Usuń
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-malta-stone/50 text-foreground/30 transition-colors hover:border-malta-blue/30 hover:text-foreground/50"
            >
              Kliknij aby wgrać zdjęcie
            </button>
          )}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-medium">2. Opisz scenę</h3>
          <textarea
            value={compositePrompt}
            onChange={(e) => setCompositePrompt(e.target.value)}
            placeholder="np. Umieść Monikę idącą tą ulicą w letniej sukience, złota godzina. Usuń grupę turystów po lewej. Popraw kolory nieba."
            rows={4}
            className="w-full rounded-lg border border-malta-stone/50 px-3 py-2 text-sm focus:border-malta-blue focus:outline-none"
          />
          <button
            onClick={compose}
            disabled={loading || !uploadedImage || !compositePrompt.trim()}
            className="mt-3 w-full rounded-lg bg-malta-blue px-4 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
          >
            {loading ? "Komponuję z Gemini..." : "Skomponuj obraz"}
          </button>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          {result && (
            <div className="mt-4">
              <img src={result} alt="Skomponowane" className="w-full rounded-lg" />
              <div className="mt-2 flex gap-2">
                <a
                  href={result}
                  download
                  className="rounded-lg bg-malta-blue/10 px-3 py-1 text-sm font-medium text-malta-blue transition-colors hover:bg-malta-blue/20"
                >
                  Pobierz
                </a>
                <button
                  onClick={() => saveToBest(result)}
                  className="rounded-lg border border-malta-gold/50 px-3 py-1 text-sm text-malta-gold transition-colors hover:bg-malta-gold/10"
                >
                  ★ Zapisz do najlepszych
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
