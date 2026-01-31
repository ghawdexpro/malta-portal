import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MIME_TYPES: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get('path');
  if (!filePath) {
    return NextResponse.json({ error: 'path param required' }, { status: 400 });
  }

  // Sanitize: only allow files under public/
  const normalizedPath = path.normalize(filePath).replace(/^\/+/, '');
  if (normalizedPath.includes('..')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), 'public', normalizedPath);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const ext = path.extname(fullPath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(fullPath);
  const fileBuffer = fs.readFileSync(fullPath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': mimeType,
      'Content-Length': String(stat.size),
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
