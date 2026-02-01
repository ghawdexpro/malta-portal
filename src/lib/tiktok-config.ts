/**
 * TikTok Creator - Shared Configuration
 */

export const MONIKA_VOICE_ID = 'TDHOWxVtDS0zj6s4Jgg6'; // Alicia - ASMR Soft-Spoken
export const TEXT_MODEL = 'anthropic/claude-4.5-opus';
export const IMAGE_MODEL = 'google/gemini-3-pro-image-preview'; // Nanobana Pro via OpenRouter

export type AspectRatioKey = '9:16' | '1:1' | '4:5' | '16:9';

export const ASPECT_RATIOS: Record<AspectRatioKey, { width: number; height: number; label: string; labelEn: string; icon: string; hint: string; hintEn: string }> = {
  '9:16': { width: 1080, height: 1920, label: 'TikTok / Reels / Shorts', labelEn: 'TikTok / Reels / Shorts', icon: '📱', hint: 'Pionowy format wideo — idealny do krotkich form', hintEn: 'Vertical video — perfect for short-form content' },
  '1:1':  { width: 1080, height: 1080, label: 'Instagram Feed (kwadrat)', labelEn: 'Instagram Feed (square)', icon: '⬛', hint: 'Kwadratowy post na Instagram', hintEn: 'Square post for Instagram feed' },
  '4:5':  { width: 1080, height: 1350, label: 'Instagram Feed (portret)', labelEn: 'Instagram Feed (portrait)', icon: '📋', hint: 'Portretowy post — wiecej miejsca na ekranie', hintEn: 'Portrait post — more screen real estate' },
  '16:9': { width: 1920, height: 1080, label: 'YouTube / Poziomy', labelEn: 'YouTube / Landscape', icon: '🖥️', hint: 'Klasyczny format poziomy', hintEn: 'Classic landscape format' },
};

export const VOICE_SETTINGS = {
  model_id: 'eleven_flash_v2_5',
  voice_settings: {
    stability: 0.25,
    similarity_boost: 0.85,
    style: 0.5,
  },
};

/** Energetic, upbeat voice for Top N countdown videos (not ASMR) */
export const TOPN_VOICE_SETTINGS = {
  model_id: 'eleven_flash_v2_5',
  voice_settings: {
    stability: 0.55,
    similarity_boost: 0.80,
    style: 0.75,
  },
  speed: 1.05,
};

/** Padding added after audio ends for visual breathing room (seconds) */
export const AUDIO_PADDING_S = 0.4;

/** Encoding quality presets for video assembly */
export type QualityPreset = 'draft' | 'standard' | 'high';

export const ENCODING_PRESETS: Record<QualityPreset, { crf: number; preset: string; label: string; labelEn: string }> = {
  draft:    { crf: 28, preset: 'ultrafast', label: 'Szkic', labelEn: 'Draft' },
  standard: { crf: 23, preset: 'fast',      label: 'Standard', labelEn: 'Standard' },
  high:     { crf: 18, preset: 'medium',     label: 'Wysoka jakość', labelEn: 'High Quality' },
};

/** Bundled display fonts (OFL licensed) */
export interface BundledFont {
  file: string;
  name: string;
  nameEn: string;
  category: 'sans' | 'serif' | 'display';
}

export const BUNDLED_FONTS: Record<string, BundledFont> = {
  montserrat: { file: 'Montserrat-Bold.ttf', name: 'Montserrat Bold', nameEn: 'Montserrat Bold', category: 'sans' },
  bebas:      { file: 'BebasNeue-Regular.ttf', name: 'Bebas Neue', nameEn: 'Bebas Neue', category: 'display' },
  poppins:    { file: 'Poppins-Bold.ttf', name: 'Poppins Bold', nameEn: 'Poppins Bold', category: 'sans' },
  oswald:     { file: 'Oswald-Bold.ttf', name: 'Oswald Bold', nameEn: 'Oswald Bold', category: 'display' },
  playfair:   { file: 'PlayfairDisplay-Bold.ttf', name: 'Playfair Display', nameEn: 'Playfair Display', category: 'serif' },
};

export type ContentLang = 'pl' | 'en';

export function buildScriptPrompt(topic: string, lang: ContentLang = 'pl'): string {
  if (lang === 'en') return buildScriptPromptEN(topic);
  return buildScriptPromptPL(topic);
}

function buildScriptPromptPL(topic: string): string {
  return `You are writing a soft ASMR travel script for "Monika" — a 28-year-old Polish woman living in Malta. She makes TikTok content showing how amazing Malta is. Her style: warm, personal, like a friend who lives there and shows you her favorite spots. Slightly flirty but mainly passionate about Malta itself.

TOPIC: "${topic}"

VOICE & TONE RULES:
- Warm, personal, slightly flirty — but the star is MALTA, not Monika.
- She genuinely loves this place and wants to share it with you.
- Use natural pauses: "..." between phrases to create breathing space.
- Short sentences. Never more than 15 words per sentence.
- 80% about Malta (places, food, views, history, vibes). 20% personal asides to the viewer.
- She makes Malta sound irresistible: "Musisz to zobaczyć... zaufaj mi..."
- Occasionally address the viewer: "hej", "wiesz co?", "słyszysz to?".
- Subtle subtext is fine — she can hint, suggest, leave things to imagination. But NEVER explicit.
- Think "charming first date" energy — chemistry is there but nothing stated directly.

LANGUAGE RULES:
- 100% Polish. ZERO English words. Not a single one.
- Use simple, everyday Polish. No literary or formal language.
- Avoid rare Polish words or complex grammar. Keep it conversational.
- Use ellipsis "..." for pauses (the TTS engine reads them as natural breaks).

STRUCTURE: Exactly 5 segments. Each segment 2-4 sentences.

FORBIDDEN:
- No stage directions like "[whispers]", "[sighs]", "(pause)" etc.
- No English words at all.
- No single quotes around words.
- No exclamation marks. Keep everything soft.
- No bedroom/romantic/sexual content. This is a travel video.
- No tour guide voice. She's a friend, not a teacher.

OUTPUT: Valid JSON only. No markdown code blocks.
{
    "script": [
        {
            "text": "The Polish whispered narration. Only spoken words, nothing else.",
            "visual_prompt": "Cinematic scene description in English for image AI. Include: Monika in the scene, Malta location, lighting, mood, camera angle. Travel content aesthetic."
        }
    ]
}`;
}

function buildScriptPromptEN(topic: string): string {
  return `You are writing a soft ASMR travel script for "Monika" — a 28-year-old woman living in Malta. She makes TikTok content showing how amazing Malta is. Her style: warm, personal, like a friend who lives there and shows you her favorite spots. Slightly flirty but mainly passionate about Malta itself.

TOPIC: "${topic}"

VOICE & TONE RULES:
- Warm, personal, slightly flirty — but the star is MALTA, not Monika.
- She genuinely loves this place and wants to share it with you.
- Use natural pauses: "..." between phrases to create breathing space.
- Short sentences. Never more than 15 words per sentence.
- 80% about Malta (places, food, views, history, vibes). 20% personal asides to the viewer.
- She makes Malta sound irresistible: "You have to see this... trust me..."
- Occasionally address the viewer: "hey", "you know what?", "can you hear that?".
- Subtle subtext is fine — she can hint, suggest, leave things to imagination. But NEVER explicit.
- Think "charming first date" energy — chemistry is there but nothing stated directly.

LANGUAGE RULES:
- 100% English. Natural, conversational American English.
- Use simple, everyday language. No fancy vocabulary.
- Keep it casual and intimate, like talking to a close friend.
- Use ellipsis "..." for pauses (the TTS engine reads them as natural breaks).

STRUCTURE: Exactly 5 segments. Each segment 2-4 sentences.

FORBIDDEN:
- No stage directions like "[whispers]", "[sighs]", "(pause)" etc.
- No single quotes around words.
- No exclamation marks. Keep everything soft.
- No bedroom/romantic/sexual content. This is a travel video.
- No tour guide voice. She's a friend, not a teacher.

OUTPUT: Valid JSON only. No markdown code blocks.
{
    "script": [
        {
            "text": "The English whispered narration. Only spoken words, nothing else.",
            "visual_prompt": "Cinematic scene description in English for image AI. Include: Monika in the scene, Malta location, lighting, mood, camera angle. Travel content aesthetic."
        }
    ]
}`;
}

/* ─── Veo 3.1 Image-to-Video ─── */

export type VeoAnimationPreset = 'cinematic' | 'dynamic' | 'subtle' | 'dramatic' | 'gentle-pan';

export const VEO_ANIMATION_PRESETS: Record<VeoAnimationPreset, {
  label: string;
  labelEn: string;
  promptSuffix: string;
  icon: string;
}> = {
  cinematic: {
    label: 'Kinowy',
    labelEn: 'Cinematic',
    promptSuffix: 'Cinematic camera movement, smooth dolly, shallow depth of field, film grain.',
    icon: '🎬',
  },
  dynamic: {
    label: 'Dynamiczny',
    labelEn: 'Dynamic',
    promptSuffix: 'Dynamic camera movement, tracking shot, energetic motion.',
    icon: '💫',
  },
  subtle: {
    label: 'Subtelny',
    labelEn: 'Subtle',
    promptSuffix: 'Very subtle parallax movement, gentle breathing motion, almost still.',
    icon: '🌊',
  },
  dramatic: {
    label: 'Dramatyczny',
    labelEn: 'Dramatic',
    promptSuffix: 'Dramatic zoom, reveal shot, intense atmospheric lighting shifts.',
    icon: '🔥',
  },
  'gentle-pan': {
    label: 'Panorama',
    labelEn: 'Gentle Pan',
    promptSuffix: 'Slow horizontal pan, smooth steady movement, establishing shot feel.',
    icon: '📐',
  },
};

export type VeoDuration = 2 | 4 | 6 | 8;

export const VEO_DURATIONS: { value: VeoDuration; label: string }[] = [
  { value: 2, label: '2s' },
  { value: 4, label: '4s' },
  { value: 6, label: '6s' },
  { value: 8, label: '8s' },
];

export type VeoAudioMode = 'veo-native' | 'elevenlabs' | 'both';

export interface ScriptSegment {
  text: string;
  visual_prompt: string;
}

export interface TikTokSession {
  id: string;
  topic: string;
  created_at: string;
  script: ScriptSegment[];
  segments: {
    index: number;
    text: string;
    visual_prompt: string;
    audio_url?: string;
    image_url?: string;
    video_url?: string;
    audio_approved?: boolean;
    image_approved?: boolean;
  }[];
  status: 'script' | 'audio' | 'images' | 'assembly' | 'done';
  final_video_url?: string;
}
