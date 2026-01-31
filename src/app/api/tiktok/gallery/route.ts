import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ASMR_DIR = path.join(process.cwd(), 'public', 'videos', 'asmr');
const BEST_DIR = path.join(process.cwd(), 'public', 'images', 'monika', 'asmr-best');

interface GallerySession {
  id: string;
  created_at: string;
  images: string[];
  audio: string[];
  videos: string[];
  finalVideo?: string;
}

interface GalleryItem {
  url: string;
  name: string;
  size: number;
  type: 'image' | 'audio' | 'video';
  created_at: string;
}

export async function GET() {
  try {
    const sessions: GallerySession[] = [];
    const bestImages: GalleryItem[] = [];
    const finalVideos: GalleryItem[] = [];

    // Scan session directories
    if (fs.existsSync(ASMR_DIR)) {
      const entries = fs.readdirSync(ASMR_DIR, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith('session_')) {
          const sessionId = entry.name.replace('session_', '');
          const sessionPath = path.join(ASMR_DIR, entry.name);
          const files = fs.readdirSync(sessionPath);

          const images = files.filter((f) => f.endsWith('_image.png'))
            .map((f) => `/videos/asmr/${entry.name}/${f}`);
          const audio = files.filter((f) => f.endsWith('_audio.mp3'))
            .map((f) => `/videos/asmr/${entry.name}/${f}`);
          const videos = files.filter((f) => f.endsWith('.mp4') && !f.includes('list'))
            .map((f) => `/videos/asmr/${entry.name}/${f}`);

          // Only include sessions with actual content
          if (images.length > 0 || audio.length > 0) {
            const stat = fs.statSync(sessionPath);
            sessions.push({
              id: sessionId,
              created_at: stat.birthtime.toISOString(),
              images,
              audio,
              videos,
            });
          }
        }

        // Final assembled videos
        if (!entry.isDirectory() && entry.name.startsWith('monika_asmr_') && entry.name.endsWith('.mp4')) {
          const filePath = path.join(ASMR_DIR, entry.name);
          const stat = fs.statSync(filePath);
          finalVideos.push({
            url: `/videos/asmr/${entry.name}`,
            name: entry.name,
            size: stat.size,
            type: 'video',
            created_at: stat.birthtime.toISOString(),
          });

          // Link final video to its session
          const sessionId = entry.name.replace('monika_asmr_', '').replace('.mp4', '');
          const session = sessions.find((s) => s.id === sessionId);
          if (session) {
            session.finalVideo = `/videos/asmr/${entry.name}`;
          }
        }
      }
    }

    // Scan best images
    if (fs.existsSync(BEST_DIR)) {
      const files = fs.readdirSync(BEST_DIR);
      for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg')) {
          const filePath = path.join(BEST_DIR, file);
          const stat = fs.statSync(filePath);
          bestImages.push({
            url: `/images/monika/asmr-best/${file}`,
            name: file,
            size: stat.size,
            type: 'image',
            created_at: stat.birthtime.toISOString(),
          });
        }
      }
    }

    // Sort sessions newest first
    sessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    finalVideos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      sessions,
      bestImages,
      finalVideos,
      totals: {
        sessions: sessions.length,
        images: sessions.reduce((sum, s) => sum + s.images.length, 0) + bestImages.length,
        audio: sessions.reduce((sum, s) => sum + s.audio.length, 0),
        videos: finalVideos.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to scan gallery', details: String(error) },
      { status: 500 }
    );
  }
}
