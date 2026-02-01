/**
 * Vertex AI Veo 3.1 — Image-to-Video Client
 *
 * Uses the predictLongRunning endpoint for async video generation.
 * Auth via GOOGLE_APPLICATION_CREDENTIALS_JSON (base64) or GCP_SERVICE_ACCOUNT_KEY (raw JSON).
 */

import { GoogleAuth } from 'google-auth-library';

/* ─── Types ─── */

export interface VeoGenerateRequest {
  imageBase64: string;
  prompt: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  durationSeconds: number;
  generateAudio: boolean;
  seed?: number;
}

export interface VeoJobStatus {
  done: boolean;
  videoBase64?: string;
  error?: string;
}

/* ─── Config ─── */

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT_ID;
const LOCATION = process.env.GCP_LOCATION || 'us-central1';
const VEO_MODEL = 'veo-3.1';

function getEndpoint() {
  return `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${VEO_MODEL}`;
}

/* ─── Auth ─── */

let authClient: GoogleAuth | null = null;

function getCredentialsJson(): string {
  // Try base64-encoded credentials first (existing Railway setup)
  const b64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (b64) {
    return Buffer.from(b64, 'base64').toString('utf-8');
  }
  // Fallback to raw JSON
  const raw = process.env.GCP_SERVICE_ACCOUNT_KEY;
  if (raw) return raw;
  throw new Error('No GCP credentials found (GOOGLE_APPLICATION_CREDENTIALS_JSON or GCP_SERVICE_ACCOUNT_KEY)');
}

function getAuth(): GoogleAuth {
  if (authClient) return authClient;

  const credentials = JSON.parse(getCredentialsJson());
  authClient = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  return authClient;
}

async function getAccessToken(): Promise<string> {
  const auth = getAuth();
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  if (!tokenResponse.token) throw new Error('Failed to get GCP access token');
  return tokenResponse.token;
}

/* ─── Submit Job ─── */

export async function submitVeoJob(req: VeoGenerateRequest): Promise<string> {
  const token = await getAccessToken();
  const url = `${getEndpoint()}:predictLongRunning`;

  const body = {
    instances: [
      {
        image: { bytesBase64Encoded: req.imageBase64 },
        prompt: req.prompt,
      },
    ],
    parameters: {
      aspectRatio: req.aspectRatio,
      sampleCount: 1,
      durationSeconds: req.durationSeconds,
      generateAudio: req.generateAudio,
      ...(req.seed !== undefined ? { seed: req.seed } : {}),
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Veo submit failed (${response.status}): ${err.substring(0, 500)}`);
  }

  const result = await response.json();
  const operationName = result.name;
  if (!operationName) {
    throw new Error('Veo response missing operation name');
  }
  return operationName;
}

/* ─── Poll Job ─── */

export async function pollVeoJob(operationName: string): Promise<VeoJobStatus> {
  const token = await getAccessToken();
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/${operationName}`;

  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Veo poll failed (${response.status}): ${err.substring(0, 500)}`);
  }

  const result = await response.json();

  if (result.error) {
    return { done: true, error: result.error.message || JSON.stringify(result.error) };
  }

  if (!result.done) {
    return { done: false };
  }

  // Extract video from response
  const predictions = result.response?.predictions || result.predictions || [];
  for (const pred of predictions) {
    const videoData = pred.video?.bytesBase64Encoded || pred.bytesBase64Encoded;
    if (videoData) {
      return { done: true, videoBase64: videoData };
    }
  }

  return { done: true, error: 'Veo completed but no video data found in response' };
}

/* ─── Convenience: Submit + Poll ─── */

export async function generateVideoFromImage(
  req: VeoGenerateRequest,
  maxWaitMs = 180_000,
): Promise<Buffer> {
  const operationName = await submitVeoJob(req);

  const startTime = Date.now();
  let pollInterval = 5_000; // Start at 5s

  while (Date.now() - startTime < maxWaitMs) {
    await new Promise((r) => setTimeout(r, pollInterval));

    const status = await pollVeoJob(operationName);
    if (status.done) {
      if (status.error) throw new Error(`Veo generation failed: ${status.error}`);
      if (!status.videoBase64) throw new Error('Veo returned no video data');
      return Buffer.from(status.videoBase64, 'base64');
    }

    // Increase poll interval slightly, cap at 10s
    pollInterval = Math.min(pollInterval + 1_000, 10_000);
  }

  throw new Error(`Veo generation timed out after ${maxWaitMs / 1000}s`);
}
