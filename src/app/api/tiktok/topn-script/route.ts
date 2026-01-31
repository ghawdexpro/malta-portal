import { NextRequest, NextResponse } from 'next/server';
import { TEXT_MODEL, type ContentLang } from '@/lib/tiktok-config';
import type { TopNItem, TopNCount } from '@/lib/topn-templates';

function buildTopNPrompt(topic: string, n: TopNCount, lang: ContentLang): string {
  const langRules = lang === 'pl'
    ? `LANGUAGE: 100% Polish. ZERO English words. Natural, conversational Polish. No ellipsis pauses — keep it punchy and fast.`
    : `LANGUAGE: 100% English. Natural, conversational American English. No ellipsis pauses — keep it punchy and fast.`;

  const outfitExamples = `Examples of outfits by context: beach = bikini or flowing sundress, restaurant = elegant cocktail dress, temple/church = modest summer outfit with hat, nightlife = stylish party look, hiking/nature = sporty tank top and shorts, market = casual boho style. NEVER repeat the same outfit twice.`;

  return `Create a TikTok "Top ${n}" ranked list about: "${topic}".

STRUCTURE:
1. An INTRO hook — a short catchy teaser line that makes viewers stay (e.g. "Nie uwierzysz co jest na pierwszym miejscu!" or "Number one will blow your mind!")
2. Exactly ${n} items, counting DOWN from ${n} to 1.
- Rank ${n} = Good but least impressive
- Rank 1 = THE BEST, save-the-best-for-last
- Build excitement and hype toward #1

Each item needs:
{
  "rank": number,
  "title": "Short catchy name (2-5 words)",
  "description": "ONE punchy sentence, max 15 words. Energetic, fun, slightly provocative. This must fit in ~6 seconds of speech.",
  "visual_prompt": "Cinematic scene description in English for image AI. Include: specific location/subject, lighting, mood, camera angle. Travel content aesthetic. 8K photorealistic. IMPORTANT: Describe Monika (young woman, 28yo) wearing a SPECIFIC outfit appropriate for THIS scene. ${outfitExamples}"
}

${langRules}

TONE: Energetic, fun, hype-building! Short punchy lines. Exclamation marks welcome. Think YouTube/TikTok countdown energy — NOT soft ASMR. She's excited, slightly flirty, and wants you to keep watching.
FORBIDDEN: No stage directions like [whispers]. No long pauses. No boring tour-guide voice.

OUTPUT: Valid JSON only. No markdown code blocks.
{
  "intro": {
    "hook": "Short catchy teaser (1 sentence, makes viewers stay)",
    "visual_prompt": "Eye-catching intro graphic scene in English for image AI. Bold, colorful, dynamic composition. Include Monika looking excited/inviting. 8K photorealistic."
  },
  "items": [
    { "rank": ${n}, "title": "...", "description": "...", "visual_prompt": "..." },
    ...
    { "rank": 1, "title": "...", "description": "...", "visual_prompt": "..." }
  ]
}`;
}

export async function POST(request: NextRequest) {
  try {
    const { topic, n, lang } = await request.json();

    if (!topic || !n) {
      return NextResponse.json({ error: 'topic and n required' }, { status: 400 });
    }

    const count = [3, 5, 10].includes(n) ? n as TopNCount : 5;
    const contentLang: ContentLang = lang === 'en' ? 'en' : 'pl';

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
    }

    const prompt = buildTopNPrompt(topic, count, contentLang);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://malta-portal-production.up.railway.app',
        'X-Title': 'Malta Portal TikTok Creator',
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Script generation failed: ${response.status}`, details: errText },
        { status: 502 }
      );
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json({ error: 'Empty response from LLM' }, { status: 502 });
    }

    let parsed;
    try {
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse Top N JSON', raw: text },
        { status: 502 }
      );
    }

    let items: TopNItem[];
    if (Array.isArray(parsed)) {
      items = parsed;
    } else if (parsed.items) {
      items = parsed.items;
    } else {
      const arrayKey = Object.keys(parsed).find((k) => Array.isArray(parsed[k]));
      items = arrayKey ? parsed[arrayKey] : [];
    }

    // Ensure proper ranking order (N → 1)
    items.sort((a, b) => b.rank - a.rank);

    // Extract intro if present
    const intro = parsed.intro || null;

    return NextResponse.json({ items, intro, topic, n: count });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
