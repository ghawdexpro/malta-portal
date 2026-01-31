"use client";

import { useState, useRef, useCallback } from "react";

interface ScriptSegment {
  text: string;
  visual_prompt: string;
}

interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  speed: number;
  use_speaker_boost: boolean;
  model_id: string;
}

interface AudioTake {
  take: number;
  url: string;
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
  takes: AudioTake[];
  activeTake?: number;
  localSettings?: Partial<VoiceSettings>;
}

type Tab = "create" | "gallery" | "compose";
type Step = "topic" | "script" | "audio" | "images" | "assemble" | "done";
type Lang = "pl" | "en";

const T = {
  pl: {
    subtitle: "Studio produkcji ASMR Monika",
    tabCreate: "Nowe wideo",
    tabGallery: "Biblioteka",
    tabCompose: "Kompozytor zdjęć",
    steps: ["Temat", "Skrypt", "Audio", "Obrazy", "Montaż", "Gotowe"],
    chooseTopic: "Wybierz temat",
    topicSubtitle: "Co Monika pokaże nam dzisiaj na Malcie?",
    topicPlaceholder: "np. Spacer po starym mieście Mdina o zachodzie słońca",
    suggestions: ["Ukryte uliczki Mdiny", "Targ rybny w Marsaxlokk", "Błękitna Laguna o świcie", "Wieczorna Valletta", "Gozo - wyspa ciszy"],
    generating: "Generuję skrypt...",
    generate: "Generuj skrypt",
    reviewScript: "Sprawdź skrypt",
    editPrompts: "Edytuj tekst i prompty wizualne. Temat:",
    back: "← Wróć",
    narrationLabel: "Narracja po polsku",
    visualLabel: "Prompt wizualny (EN)",
    regenerate: "Generuj ponownie",
    approveScript: "Zatwierdź skrypt →",
    generateAudio: "Generuj audio",
    generateAudioSub: "Wygeneruj i zatwierdź audio dla każdego segmentu",
    backToScript: "← Wróć do skryptu",
    generateAllAudio: "Generuj wszystkie audio",
    voiceSettings: "Ustawienia głosu",
    globalAudioSettings: "Globalne ustawienia audio",
    stability: "Stabilność",
    stabilityHint: "Niżej = więcej emocji, wyżej = monotonnie",
    similarity: "Podobieństwo",
    similarityHint: "Jak blisko oryginalnego głosu",
    styleLabel: "Styl",
    styleHint: "Wzmocnienie stylu mówcy",
    speed: "Tempo",
    speedHint: "0.7 (wolno) — 1.0 — 1.2 (szybko)",
    model: "Model",
    flashFast: "Flash v2.5 (szybki)",
    approved: "Zatwierdzone",
    approve: "Zatwierdź",
    redo: "Ponów",
    localOverrides: "Nadpisania lokalne",
    localTag: "lokalne",
    resetGlobal: "Resetuj do globalnych",
    versions: "Wersje:",
    generatingAudio: "Generuję...",
    allApprovedImages: "Wszystkie zatwierdzone → Generuj obrazy",
    generateImages: "Generuj obrazy",
    imagesSub: "Wygeneruj nowe, lub wybierz z biblioteki",
    backToAudio: "← Wróć do audio",
    generateAllImages: "Generuj wszystkie obrazy",
    generatingImage: "Generuję...",
    generateImage: "Generuj obraz",
    regenerateImage: "Generuj ponownie",
    fromLibrary: "Z biblioteki",
    save: "Zapisz",
    pickFromLibrary: "Wybierz obraz z biblioteki",
    close: "Zamknij",
    loading: "Ładuję...",
    noImages: "Brak obrazów w bibliotece",
    allApprovedAssemble: "Wszystkie zatwierdzone → Montaż wideo",
    assemble: "Montaż wideo",
    assembleSub: "segmentów w finalne wideo TikTok",
    assembleBtn: "Zmontuj finalne wideo",
    assembling: "Montuję z FFmpeg...",
    videoDone: "Wideo gotowe",
    segments: "segmentów",
    download: "Pobierz MP4",
    createAnother: "Utwórz kolejne",
    galleryTitle: "Biblioteka materiałów",
    gallerySub: "Przeglądaj wszystkie wygenerowane obrazy, audio i wideo",
    loadGallery: "Załaduj bibliotekę",
    scanning: "Skanuję materiały...",
    sessions: "Sesje",
    images: "Obrazy",
    audio: "Audio",
    videos: "Wideo",
    all: "Wszystko",
    refresh: "Odśwież",
    best: "Najlepsze",
    finalVideos: "Finalne wideo",
    session: "Sesja",
    composerTitle: "Kompozytor zdjęć",
    composerSub: "Wgraj prawdziwe zdjęcie z Malty, opisz zmiany i umieść Monikę w scenie",
    uploadBg: "1. Wgraj zdjęcie tła",
    clickUpload: "Kliknij aby wgrać zdjęcie",
    remove: "Usuń",
    describeScene: "2. Opisz scenę",
    composePlaceholder: "np. Umieść Monikę idącą tą ulicą w letniej sukience, złota godzina. Usuń grupę turystów po lewej. Popraw kolory nieba.",
    composing: "Komponuję z Nanobana Pro...",
    composeBtn: "Skomponuj obraz",
    downloadImg: "Pobierz",
    saveBest: "Zapisz do najlepszych",
  },
  en: {
    subtitle: "Monika ASMR Production Studio",
    tabCreate: "New video",
    tabGallery: "Library",
    tabCompose: "Photo composer",
    steps: ["Topic", "Script", "Audio", "Images", "Assemble", "Done"],
    chooseTopic: "Choose a topic",
    topicSubtitle: "What will Monika show us in Malta today?",
    topicPlaceholder: "e.g. Walking through old Mdina at sunset",
    suggestions: ["Hidden alleys of Mdina", "Fish market in Marsaxlokk", "Blue Lagoon at dawn", "Evening Valletta", "Gozo - island of silence"],
    generating: "Generating script...",
    generate: "Generate script",
    reviewScript: "Review script",
    editPrompts: "Edit text and visual prompts. Topic:",
    back: "← Back",
    narrationLabel: "English narration",
    visualLabel: "Visual prompt (EN)",
    regenerate: "Regenerate",
    approveScript: "Approve script →",
    generateAudio: "Generate audio",
    generateAudioSub: "Generate and approve audio for each segment",
    backToScript: "← Back to script",
    generateAllAudio: "Generate all audio",
    voiceSettings: "Voice settings",
    globalAudioSettings: "Global audio settings",
    stability: "Stability",
    stabilityHint: "Lower = more emotion, higher = monotone",
    similarity: "Similarity",
    similarityHint: "How close to original voice",
    styleLabel: "Style",
    styleHint: "Speaker style emphasis",
    speed: "Speed",
    speedHint: "0.7 (slow) — 1.0 — 1.2 (fast)",
    model: "Model",
    flashFast: "Flash v2.5 (fast)",
    approved: "Approved",
    approve: "Approve",
    redo: "Redo",
    localOverrides: "Local overrides",
    localTag: "local",
    resetGlobal: "Reset to global",
    versions: "Versions:",
    generatingAudio: "Generating...",
    allApprovedImages: "All approved → Generate images",
    generateImages: "Generate images",
    imagesSub: "Generate new, or pick from library",
    backToAudio: "← Back to audio",
    generateAllImages: "Generate all images",
    generatingImage: "Generating...",
    generateImage: "Generate image",
    regenerateImage: "Regenerate",
    fromLibrary: "From library",
    save: "Save",
    pickFromLibrary: "Pick image from library",
    close: "Close",
    loading: "Loading...",
    noImages: "No images in library",
    allApprovedAssemble: "All approved → Assemble video",
    assemble: "Assemble video",
    assembleSub: "segments into final TikTok video",
    assembleBtn: "Assemble final video",
    assembling: "Assembling with FFmpeg...",
    videoDone: "Video ready",
    segments: "segments",
    download: "Download MP4",
    createAnother: "Create another",
    galleryTitle: "Asset library",
    gallerySub: "Browse all generated images, audio and video",
    loadGallery: "Load library",
    scanning: "Scanning assets...",
    sessions: "Sessions",
    images: "Images",
    audio: "Audio",
    videos: "Videos",
    all: "All",
    refresh: "Refresh",
    best: "Best",
    finalVideos: "Final videos",
    session: "Session",
    composerTitle: "Photo composer",
    composerSub: "Upload a real Malta photo, describe changes and place Monika in the scene",
    uploadBg: "1. Upload background",
    clickUpload: "Click to upload photo",
    remove: "Remove",
    describeScene: "2. Describe scene",
    composePlaceholder: "e.g. Place Monika walking down this street in a summer dress, golden hour. Remove the tourists on the left. Enhance the sky colors.",
    composing: "Composing with Nanobana Pro...",
    composeBtn: "Compose image",
    downloadImg: "Download",
    saveBest: "Save to best",
  },
};

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
  const [lang, setLang] = useState<Lang>("pl");
  const t = T[lang];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">TikTok Creator</h1>
          <p className="mt-1 text-foreground/50">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-malta-stone/30 p-0.5">
          <button
            onClick={() => setLang("pl")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              lang === "pl" ? "bg-white text-foreground shadow-sm" : "text-foreground/50"
            }`}
          >
            🇵🇱 PL
          </button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              lang === "en" ? "bg-white text-foreground shadow-sm" : "text-foreground/50"
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-1 rounded-xl bg-malta-stone/30 p-1">
        {([
          { id: "create", label: t.tabCreate, icon: "🎬" },
          { id: "gallery", label: t.tabGallery, icon: "🖼️" },
          { id: "compose", label: t.tabCompose, icon: "📸" },
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

      {activeTab === "create" && <CreateVideoTab lang={lang} t={t} />}
      {activeTab === "gallery" && <GalleryTab t={t} />}
      {activeTab === "compose" && <PhotoComposerTab t={t} />}
    </div>
  );
}

/* ─── CREATE VIDEO TAB ─── */

type Translations = typeof T.pl;

function CreateVideoTab({ lang, t }: { lang: Lang; t: Translations }) {
  const [step, setStep] = useState<Step>("topic");
  const [topic, setTopic] = useState("");
  const [sessionId] = useState(() => String(Date.now()));
  const [script, setScript] = useState<ScriptSegment[]>([]);
  const [segments, setSegments] = useState<SegmentAssets[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);
  const [globalVoice, setGlobalVoice] = useState<VoiceSettings>({
    stability: 0.25,
    similarity_boost: 0.85,
    style: 0.5,
    speed: 1.0,
    use_speaker_boost: true,
    model_id: "eleven_flash_v2_5",
  });
  const [showGlobalSettings, setShowGlobalSettings] = useState(false);

  const generateScript = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tiktok/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, lang }),
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
          takes: [],
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
      // Merge global + local settings
      const merged = { ...globalVoice, ...(segments[index].localSettings || {}) };
      const res = await fetch("/api/tiktok/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: segments[index].text,
          sessionId,
          segmentIndex: index,
          voiceSettings: merged,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd");
      updateSegment(index, {
        audioUrl: data.audioUrl + "&t=" + Date.now(),
        audioLoading: false,
        takes: data.takes || [],
        activeTake: data.take,
        audioApproved: false,
      });
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
        // 8s delay between requests to avoid 429 rate limits on Nanobana Pro
        if (i < segments.length - 1) {
          await new Promise((r) => setTimeout(r, 8000));
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
  const STEP_LABELS = t.steps;
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
          <h2 className="text-xl font-semibold">{t.chooseTopic}</h2>
          <p className="mt-1 text-sm text-foreground/50">
            {t.topicSubtitle}
          </p>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.topicPlaceholder}
            className="mt-4 w-full rounded-lg border border-malta-stone/50 px-4 py-3 text-lg focus:border-malta-blue focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && generateScript()}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {t.suggestions.map((suggestion) => (
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
            {loading ? t.generating : t.generate}
          </button>
        </div>
      )}

      {/* STEP: Script Review */}
      {step === "script" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{t.reviewScript}</h2>
                <p className="mt-1 text-sm text-foreground/50">
                  {t.editPrompts} &quot;{topic}&quot;
                </p>
              </div>
              <button
                onClick={() => { setStep("topic"); setScript([]); setSegments([]); }}
                className="text-sm text-foreground/40 hover:text-foreground/60"
              >
                {t.back}
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
                    {t.narrationLabel}
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
                    {t.visualLabel}
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
              {loading ? t.generating : t.regenerate}
            </button>
            <button
              onClick={() => setStep("audio")}
              className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
            >
              {t.approveScript}
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
                <h2 className="text-xl font-semibold">{t.generateAudio}</h2>
                <p className="mt-1 text-sm text-foreground/50">
                  {t.generateAudioSub}
                </p>
              </div>
              <button
                onClick={() => setStep("script")}
                className="text-sm text-foreground/40 hover:text-foreground/60"
              >
                {t.backToScript}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={generateAllAudio}
                disabled={segments.some((s) => s.audioLoading)}
                className="rounded-lg bg-malta-blue/10 px-4 py-2 text-sm font-medium text-malta-blue transition-colors hover:bg-malta-blue/20 disabled:opacity-50"
              >
                {t.generateAllAudio}
              </button>
              <button
                onClick={() => setShowGlobalSettings(!showGlobalSettings)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  showGlobalSettings
                    ? "border-malta-blue bg-malta-blue/5 text-malta-blue"
                    : "border-malta-stone/50 text-foreground/50 hover:bg-malta-stone/20"
                }`}
              >
                ⚙️ {t.voiceSettings}
              </button>
            </div>

            {/* Global Voice Settings */}
            {showGlobalSettings && (
              <div className="mt-4 rounded-lg bg-malta-stone/10 p-4">
                <h3 className="mb-3 text-sm font-semibold">{t.globalAudioSettings}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <VoiceSlider
                    label={t.stability}
                    hint={t.stabilityHint}
                    value={globalVoice.stability}
                    min={0} max={1} step={0.05}
                    onChange={(v) => setGlobalVoice((p) => ({ ...p, stability: v }))}
                  />
                  <VoiceSlider
                    label={t.similarity}
                    hint={t.similarityHint}
                    value={globalVoice.similarity_boost}
                    min={0} max={1} step={0.05}
                    onChange={(v) => setGlobalVoice((p) => ({ ...p, similarity_boost: v }))}
                  />
                  <VoiceSlider
                    label={t.styleLabel}
                    hint={t.styleHint}
                    value={globalVoice.style}
                    min={0} max={1} step={0.05}
                    onChange={(v) => setGlobalVoice((p) => ({ ...p, style: v }))}
                  />
                  <VoiceSlider
                    label={t.speed}
                    hint={t.speedHint}
                    value={globalVoice.speed}
                    min={0.7} max={1.2} step={0.05}
                    onChange={(v) => setGlobalVoice((p) => ({ ...p, speed: v }))}
                  />
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground/50">
                      {t.model}
                    </label>
                    <select
                      value={globalVoice.model_id}
                      onChange={(e) => setGlobalVoice((p) => ({ ...p, model_id: e.target.value }))}
                      className="w-full rounded-lg border border-malta-stone/50 px-2 py-1.5 text-sm"
                    >
                      <option value="eleven_flash_v2_5">{t.flashFast}</option>
                      <option value="eleven_multilingual_v2">Multilingual v2</option>
                      <option value="eleven_turbo_v2_5">Turbo v2.5</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={globalVoice.use_speaker_boost}
                      onChange={(e) => setGlobalVoice((p) => ({ ...p, use_speaker_boost: e.target.checked }))}
                      className="h-4 w-4"
                    />
                    <label className="text-xs text-foreground/60">Speaker Boost</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {segments.map((seg, i) => (
            <AudioSegmentCard
              key={i}
              index={i}
              seg={seg}
              globalVoice={globalVoice}
              t={t}
              onGenerate={() => generateAudio(i)}
              onApprove={() => updateSegment(i, { audioApproved: true })}
              onSelectTake={(take) => {
                const t = seg.takes.find((tk) => tk.take === take);
                if (t) {
                  updateSegment(i, {
                    audioUrl: t.url + "&t=" + Date.now(),
                    activeTake: take,
                    audioApproved: false,
                  });
                }
              }}
              onLocalSettingsChange={(settings) => updateSegment(i, { localSettings: settings })}
            />
          ))}

          {allAudioDone && (
            <button
              onClick={() => setStep("images")}
              className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
            >
              {t.allApprovedImages}
            </button>
          )}
        </div>
      )}

      {/* STEP: Image Generation */}
      {step === "images" && (
        <ImageStep
          segments={segments}
          sessionId={sessionId}
          t={t}
          onUpdateSegment={updateSegment}
          onGenerateImage={generateImage}
          onGenerateAllImages={generateAllImages}
          allImagesDone={allImagesDone}
          onNext={() => setStep("assemble")}
          onBack={() => setStep("audio")}
        />
      )}

      {/* STEP: Assemble */}
      {step === "assemble" && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{t.assemble}</h2>
          <p className="mt-1 text-sm text-foreground/50">
            {segments.length} {t.assembleSub}
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
            {loading ? t.assembling : t.assembleBtn}
          </button>
        </div>
      )}

      {/* STEP: Done */}
      {step === "done" && finalVideoUrl && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-green-700">{t.videoDone}</h2>
          <p className="mt-1 text-sm text-foreground/50">
            &quot;{topic}&quot; — {segments.length} {t.segments}
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
              {t.download}
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
              {t.createAnother}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── VOICE SLIDER ─── */

function VoiceSlider({ label, hint, value, min, max, step, onChange }: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-medium text-foreground/50">{label}</label>
        <span className="text-xs font-mono text-malta-blue">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-malta-blue"
      />
      <p className="mt-0.5 text-[10px] text-foreground/30">{hint}</p>
    </div>
  );
}

/* ─── AUDIO SEGMENT CARD ─── */

function AudioSegmentCard({ index, seg, globalVoice, t, onGenerate, onApprove, onSelectTake, onLocalSettingsChange }: {
  index: number;
  seg: SegmentAssets;
  globalVoice: VoiceSettings;
  t: Translations;
  onGenerate: () => void;
  onApprove: () => void;
  onSelectTake: (take: number) => void;
  onLocalSettingsChange: (settings: Partial<VoiceSettings>) => void;
}) {
  const [showLocal, setShowLocal] = useState(false);
  const hasLocal = seg.localSettings && Object.keys(seg.localSettings).length > 0;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-malta-blue/60">
              Segment {index + 1}
            </span>
            {seg.activeTake && (
              <span className="text-xs text-foreground/30">
                Take {seg.activeTake}
              </span>
            )}
            {hasLocal && (
              <span className="rounded bg-amber-100 px-1 py-0.5 text-[10px] font-medium text-amber-700">
                {t.localTag}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/70">{seg.text}</p>
        </div>
        <div className="ml-4 flex items-center gap-2">
          {seg.audioApproved && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              {t.approved}
            </span>
          )}
          <button
            onClick={() => setShowLocal(!showLocal)}
            className={`rounded px-2 py-1 text-xs transition-colors ${
              showLocal ? "bg-malta-blue/10 text-malta-blue" : "text-foreground/30 hover:text-foreground/50"
            }`}
            title="Ustawienia lokalne"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Local overrides */}
      {showLocal && (
        <div className="mt-3 rounded-lg bg-amber-50/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-amber-700">{t.localOverrides} (segment {index + 1})</span>
            {hasLocal && (
              <button
                onClick={() => onLocalSettingsChange({})}
                className="text-[10px] text-foreground/30 hover:text-foreground/50"
              >
                {t.resetGlobal}
              </button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <VoiceSlider
              label={t.stability}
              hint=""
              value={seg.localSettings?.stability ?? globalVoice.stability}
              min={0} max={1} step={0.05}
              onChange={(v) => onLocalSettingsChange({ ...seg.localSettings, stability: v })}
            />
            <VoiceSlider
              label={t.speed}
              hint=""
              value={seg.localSettings?.speed ?? globalVoice.speed}
              min={0.7} max={1.2} step={0.05}
              onChange={(v) => onLocalSettingsChange({ ...seg.localSettings, speed: v })}
            />
            <VoiceSlider
              label={t.similarity}
              hint=""
              value={seg.localSettings?.similarity_boost ?? globalVoice.similarity_boost}
              min={0} max={1} step={0.05}
              onChange={(v) => onLocalSettingsChange({ ...seg.localSettings, similarity_boost: v })}
            />
            <VoiceSlider
              label={t.styleLabel}
              hint=""
              value={seg.localSettings?.style ?? globalVoice.style}
              min={0} max={1} step={0.05}
              onChange={(v) => onLocalSettingsChange({ ...seg.localSettings, style: v })}
            />
          </div>
        </div>
      )}

      {/* Audio player + controls */}
      <div className="mt-3">
        {seg.audioUrl ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <audio controls preload="auto" src={seg.audioUrl} className="h-10 flex-1" />
              <button
                onClick={onApprove}
                disabled={seg.audioApproved}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  seg.audioApproved
                    ? "bg-green-100 text-green-700"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {seg.audioApproved ? "✓" : t.approve}
              </button>
              <button
                onClick={onGenerate}
                disabled={seg.audioLoading}
                className="rounded-lg border border-malta-stone/50 px-3 py-1.5 text-sm transition-colors hover:bg-malta-stone/20 disabled:opacity-50"
              >
                {seg.audioLoading ? "..." : t.redo}
              </button>
            </div>

            {/* Take history */}
            {seg.takes.length > 1 && (
              <div className="flex items-center gap-1">
                <span className="mr-1 text-[10px] text-foreground/30">{t.versions}</span>
                {seg.takes.map((t) => (
                  <button
                    key={t.take}
                    onClick={() => onSelectTake(t.take)}
                    className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                      seg.activeTake === t.take
                        ? "bg-malta-blue text-white"
                        : "bg-malta-stone/20 text-foreground/50 hover:bg-malta-stone/40"
                    }`}
                  >
                    #{t.take}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onGenerate}
            disabled={seg.audioLoading}
            className="rounded-lg bg-malta-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
          >
            {seg.audioLoading ? t.generatingAudio : t.generateAudio}
          </button>
        )}
      </div>
    </div>
  );
}

async function saveToBest(imageUrl: string) {
  window.open(imageUrl, "_blank");
}

/* ─── IMAGE STEP WITH LIBRARY PICKER ─── */

function ImageStep({ segments, sessionId, t, onUpdateSegment, onGenerateImage, onGenerateAllImages, allImagesDone, onNext, onBack }: {
  segments: SegmentAssets[];
  sessionId: string;
  t: Translations;
  onUpdateSegment: (i: number, updates: Partial<SegmentAssets>) => void;
  onGenerateImage: (i: number) => void;
  onGenerateAllImages: () => void;
  allImagesDone: boolean;
  onNext: () => void;
  onBack: () => void;
}) {
  const [libraryOpen, setLibraryOpen] = useState<number | null>(null);
  const [libraryImages, setLibraryImages] = useState<string[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);

  const loadLibrary = async () => {
    if (libraryImages.length > 0) return;
    setLibraryLoading(true);
    try {
      const res = await fetch("/api/tiktok/gallery");
      const data = await res.json();
      const allImages: string[] = [];
      // Best images first
      for (const img of data.bestImages || []) allImages.push(img.url);
      // Then session images
      for (const session of data.sessions || []) {
        for (const url of session.images) allImages.push(url);
      }
      setLibraryImages(allImages);
    } catch {}
    setLibraryLoading(false);
  };

  const openLibrary = async (segIndex: number) => {
    setLibraryOpen(segIndex);
    await loadLibrary();
  };

  const selectFromLibrary = (segIndex: number, url: string) => {
    onUpdateSegment(segIndex, { imageUrl: url, imageApproved: false });
    setLibraryOpen(null);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{t.generateImages}</h2>
            <p className="mt-1 text-sm text-foreground/50">
              {t.imagesSub}
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-sm text-foreground/40 hover:text-foreground/60"
          >
            {t.backToAudio}
          </button>
        </div>
        <button
          onClick={onGenerateAllImages}
          disabled={segments.some((s) => s.imageLoading)}
          className="mt-4 rounded-lg bg-malta-blue/10 px-4 py-2 text-sm font-medium text-malta-blue transition-colors hover:bg-malta-blue/20 disabled:opacity-50"
        >
          {t.generateAllImages}
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
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onUpdateSegment(i, { imageApproved: true })}
                  disabled={seg.imageApproved}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    seg.imageApproved
                      ? "bg-green-100 text-green-700"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {seg.imageApproved ? `✓ ${t.approved}` : t.approve}
                </button>
                <button
                  onClick={() => {
                    onUpdateSegment(i, { imageUrl: undefined, imageApproved: false });
                    onGenerateImage(i);
                  }}
                  disabled={seg.imageLoading}
                  className="rounded-lg border border-malta-stone/50 px-3 py-1.5 text-sm transition-colors hover:bg-malta-stone/20 disabled:opacity-50"
                >
                  {t.regenerateImage}
                </button>
                <button
                  onClick={() => openLibrary(i)}
                  className="rounded-lg border border-malta-blue/30 px-3 py-1.5 text-sm text-malta-blue transition-colors hover:bg-malta-blue/10"
                >
                  🖼️ {t.fromLibrary}
                </button>
                <button
                  onClick={() => saveToBest(seg.imageUrl!)}
                  className="rounded-lg border border-malta-gold/50 px-3 py-1.5 text-sm text-malta-gold transition-colors hover:bg-malta-gold/10"
                >
                  ★ {t.save}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => onGenerateImage(i)}
                disabled={seg.imageLoading}
                className="rounded-lg bg-malta-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
              >
                {seg.imageLoading ? t.generatingImage : t.generateImage}
              </button>
              <button
                onClick={() => openLibrary(i)}
                className="rounded-lg border border-malta-blue/30 px-4 py-2 text-sm font-medium text-malta-blue transition-colors hover:bg-malta-blue/10"
              >
                🖼️ {t.fromLibrary}
              </button>
            </div>
          )}

          {/* Library picker modal */}
          {libraryOpen === i && (
            <div className="mt-3 rounded-lg border border-malta-blue/20 bg-malta-stone/10 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{t.pickFromLibrary}</span>
                <button
                  onClick={() => setLibraryOpen(null)}
                  className="text-xs text-foreground/30 hover:text-foreground/50"
                >
                  ✕ {t.close}
                </button>
              </div>
              {libraryLoading ? (
                <p className="text-sm text-foreground/40">{t.loading}</p>
              ) : (
                <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4 md:grid-cols-5">
                  {libraryImages.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className="aspect-video cursor-pointer rounded-lg object-cover transition-all hover:ring-2 hover:ring-malta-blue"
                      onClick={() => selectFromLibrary(i, url)}
                    />
                  ))}
                  {libraryImages.length === 0 && (
                    <p className="col-span-full text-sm text-foreground/40">{t.noImages}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {allImagesDone && (
        <button
          onClick={onNext}
          className="rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
        >
          {t.allApprovedAssemble}
        </button>
      )}
    </div>
  );
}

/* ─── GALLERY TAB ─── */

function GalleryTab({ t }: { t: Translations }) {
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
        <h2 className="text-xl font-semibold">{t.galleryTitle}</h2>
        <p className="mt-2 text-sm text-foreground/50">
          {t.gallerySub}
        </p>
        <button
          onClick={loadGallery}
          className="mt-4 rounded-lg bg-malta-blue px-6 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80"
        >
          {t.loadGallery}
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <p className="text-foreground/50">{t.scanning}</p>
      </div>
    );
  }

  if (!data) return null;

  const FILTER_LABELS: Record<string, string> = {
    all: t.all,
    images: t.images,
    audio: t.audio,
    videos: t.videos,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: t.sessions, value: data.totals.sessions, color: "text-malta-blue" },
          { label: t.images, value: data.totals.images, color: "text-green-600" },
          { label: t.audio, value: data.totals.audio, color: "text-purple-600" },
          { label: t.videos, value: data.totals.videos, color: "text-malta-gold" },
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
          {t.refresh}
        </button>
      </div>

      {(filter === "all" || filter === "images") && data.bestImages.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">★ {t.best}</h3>
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
          <h3 className="mb-3 text-lg font-semibold">{t.finalVideos}</h3>
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
            <h3 className="font-semibold">{t.session} {session.id}</h3>
            <span className="text-xs text-foreground/40">
              {new Date(session.created_at).toLocaleString("pl-PL")}
            </span>
          </div>

          {(filter === "all" || filter === "images") && session.images.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 text-xs font-medium text-foreground/40">
                {t.images} ({session.images.length})
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
                {t.audio} ({session.audio.length})
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

function PhotoComposerTab({ t }: { t: Translations }) {
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
        <h2 className="text-xl font-semibold">{t.composerTitle}</h2>
        <p className="mt-1 text-sm text-foreground/50">
          {t.composerSub}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-medium">{t.uploadBg}</h3>
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
                {t.remove}
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-malta-stone/50 text-foreground/30 transition-colors hover:border-malta-blue/30 hover:text-foreground/50"
            >
              {t.clickUpload}
            </button>
          )}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-medium">{t.describeScene}</h3>
          <textarea
            value={compositePrompt}
            onChange={(e) => setCompositePrompt(e.target.value)}
            placeholder={t.composePlaceholder}
            rows={4}
            className="w-full rounded-lg border border-malta-stone/50 px-3 py-2 text-sm focus:border-malta-blue focus:outline-none"
          />
          <button
            onClick={compose}
            disabled={loading || !uploadedImage || !compositePrompt.trim()}
            className="mt-3 w-full rounded-lg bg-malta-blue px-4 py-2 font-medium text-white transition-colors hover:bg-malta-blue/80 disabled:opacity-50"
          >
            {loading ? t.composing : t.composeBtn}
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
                  {t.downloadImg}
                </a>
                <button
                  onClick={() => saveToBest(result)}
                  className="rounded-lg border border-malta-gold/50 px-3 py-1 text-sm text-malta-gold transition-colors hover:bg-malta-gold/10"
                >
                  ★ {t.saveBest}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
