import { NextRequest } from 'next/server';
import { createServiceClient } from './supabase';

// Verify bot API key from Authorization header
export async function verifyBotApiKey(request: NextRequest): Promise<{ valid: boolean; admin?: { name: string; type: string } }> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false };
  }

  const apiKey = authHeader.slice(7);

  // Fast check against env var
  if (apiKey === process.env.BOT_API_KEY) {
    return { valid: true, admin: { name: 'tourist-aggregator-bot', type: 'bot' } };
  }

  // Fallback: check database
  const supabase = createServiceClient();
  const { data } = await supabase
    .from('admins')
    .select('name, type')
    .eq('api_key', apiKey)
    .single();

  if (data) {
    return { valid: true, admin: data };
  }

  return { valid: false };
}
