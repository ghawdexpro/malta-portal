import { NextRequest, NextResponse } from 'next/server';
import { buildScriptPrompt, TEXT_MODEL, type ScriptSegment } from '@/lib/tiktok-config';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
    }

    const prompt = buildScriptPrompt(topic);

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

    // Parse JSON from response
    let parsed;
    try {
      let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      if (jsonStr.includes('\\"')) {
        jsonStr = jsonStr.replace(/\\"/g, '"');
      }
      parsed = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse script JSON', raw: text },
        { status: 502 }
      );
    }

    // Extract script array
    let script: ScriptSegment[];
    if (Array.isArray(parsed)) {
      script = parsed;
    } else if (parsed.script) {
      script = parsed.script;
    } else if (parsed.segments) {
      script = parsed.segments;
    } else {
      // Find any array value
      const arrayKey = Object.keys(parsed).find((k) => Array.isArray(parsed[k]));
      script = arrayKey ? parsed[arrayKey] : [parsed];
    }

    return NextResponse.json({ script, topic });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', details: String(error) },
      { status: 500 }
    );
  }
}
