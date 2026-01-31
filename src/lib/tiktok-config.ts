/**
 * TikTok Creator - Shared Configuration
 */

export const MONIKA_VOICE_ID = 'TDHOWxVtDS0zj6s4Jgg6'; // Alicia - ASMR Soft-Spoken
export const TEXT_MODEL = 'anthropic/claude-4.5-opus';
export const IMAGE_MODEL = 'google/gemini-3-pro-image-preview'; // Nanobana Pro via OpenRouter

export const VOICE_SETTINGS = {
  model_id: 'eleven_flash_v2_5',
  voice_settings: {
    stability: 0.25,
    similarity_boost: 0.85,
    style: 0.5,
  },
};

export function buildScriptPrompt(topic: string): string {
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
