/**
 * FFmpeg Utilities - Font paths, text escaping, filter builders
 */

import os from 'os';
import path from 'path';
import { BUNDLED_FONTS } from './tiktok-config';

const FONT_PATHS: Record<string, Record<string, string>> = {
  bold: {
    darwin: '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
    linux: '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  },
  regular: {
    darwin: '/System/Library/Fonts/Supplemental/Arial.ttf',
    linux: '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  },
};

export function getFontPath(weight: 'bold' | 'regular' = 'bold'): string {
  const platform = os.platform();
  const key = platform === 'darwin' ? 'darwin' : 'linux';
  return FONT_PATHS[weight][key] || FONT_PATHS[weight].linux;
}

/** Resolve a bundled font by ID, falling back to system bold font */
export function resolveFontPath(fontId?: string): string {
  if (fontId && BUNDLED_FONTS[fontId]) {
    return path.join(process.cwd(), 'public', 'fonts', BUNDLED_FONTS[fontId].file);
  }
  return getFontPath('bold');
}

export function escapeFFmpegText(text: string): string {
  return text
    .replace(/\\/g, '\\\\\\\\')
    .replace(/'/g, "'\\\\\\''")
    .replace(/:/g, '\\\\:')
    .replace(/\[/g, '\\\\[')
    .replace(/\]/g, '\\\\]')
    .replace(/;/g, '\\\\;')
    .replace(/\n/g, ' ');
}

export interface NumberOverlayOptions {
  rank: number;
  position: 'center' | 'topLeft' | 'topRight';
  fontSize: number;
  color: string;
  borderWidth: number;
  borderColor: string;
  width: number;
  height: number;
  fontId?: string;
}

export function buildNumberOverlayFilter(opts: NumberOverlayOptions): string {
  const font = resolveFontPath(opts.fontId);
  const { rank, position, fontSize, color, borderWidth, borderColor, width, height } = opts;

  let x: string;
  let y: string;

  switch (position) {
    case 'center':
      x = '(w-text_w)/2';
      y = '(h-text_h)/2';
      break;
    case 'topLeft':
      x = String(Math.round(width * 0.05));
      y = String(Math.round(height * 0.05));
      break;
    case 'topRight':
      x = `w-text_w-${Math.round(width * 0.05)}`;
      y = String(Math.round(height * 0.05));
      break;
  }

  return `drawtext=fontfile='${font}':text='${rank}':fontsize=${fontSize}:fontcolor=${color}:borderw=${borderWidth}:bordercolor=${borderColor}:x=${x}:y=${y}`;
}

export interface TitleOverlayOptions {
  title: string;
  position: 'top' | 'bottom' | 'center';
  fontSize: number;
  color: string;
  width: number;
  height: number;
  fontId?: string;
}

export function buildTitleOverlayFilter(opts: TitleOverlayOptions): string {
  const font = resolveFontPath(opts.fontId);
  const { title, position, fontSize, color, width, height } = opts;

  const escaped = escapeFFmpegText(title);
  const x = '(w-text_w)/2';
  let y: string;

  switch (position) {
    case 'top':
      y = String(Math.round(height * 0.08));
      break;
    case 'bottom':
      y = `h-text_h-${Math.round(height * 0.08)}`;
      break;
    case 'center':
      y = '(h-text_h)/2';
      break;
  }

  return `drawtext=fontfile='${font}':text='${escaped}':fontsize=${fontSize}:fontcolor=${color}:borderw=3:bordercolor=black:x=${x}:y=${y}`;
}

export interface ProgressBarOptions {
  style: 'bar' | 'countdown' | 'both';
  duration: number;
  color: string;
  height: number;
  position: 'bottom' | 'top';
  fontId?: string;
}

/** Build FFmpeg filters for a progress bar / countdown timer overlay */
export function buildProgressBarFilters(opts: ProgressBarOptions): string[] {
  const { style, duration, color, height: barHeight, position } = opts;
  const filters: string[] = [];
  const yPos = position === 'bottom' ? `ih-${barHeight}` : '0';
  const dur = duration.toFixed(2);

  if (style === 'bar' || style === 'both') {
    // Shrinking bar: full width at start, zero at end
    filters.push(`drawbox=x=0:y=${yPos}:w=iw*(1-t/${dur}):h=${barHeight}:color=${color}@0.8:t=fill`);
  }

  if (style === 'countdown' || style === 'both') {
    const font = resolveFontPath(opts.fontId);
    const countY = position === 'bottom' ? `ih-${barHeight + 50}` : `${barHeight + 10}`;
    filters.push(`drawtext=fontfile='${font}':text='%{eif\\:${Math.ceil(duration)}-t\\:d}':fontsize=36:fontcolor=white@0.7:borderw=2:bordercolor=black@0.5:x=w-text_w-24:y=${countY}`);
  }

  return filters;
}
