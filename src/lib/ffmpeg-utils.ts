/**
 * FFmpeg Utilities - Font paths, text escaping, filter builders
 */

import os from 'os';

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
}

export function buildNumberOverlayFilter(opts: NumberOverlayOptions): string {
  const font = getFontPath('bold');
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
}

export function buildTitleOverlayFilter(opts: TitleOverlayOptions): string {
  const font = getFontPath('bold');
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
