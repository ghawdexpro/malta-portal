/**
 * FFmpeg Builder - Translates EditorState into FFmpeg filter_complex commands
 */

import { getFontPath, escapeFFmpegText } from './ffmpeg-utils';

export interface EditorSegment {
  id: string;
  order: number;
  text: string;
  audioUrl: string;  // Server file path
  imageUrl: string;  // Server file path
  audioDuration: number;
  trimStart: number;
  trimEnd: number;
  kenBurns?: {
    enabled: boolean;
    startScale: number;
    endScale: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };
  transition?: {
    type: 'cut' | 'crossfade' | 'slideLeft' | 'slideRight';
    duration: number;
  };
  overlays: TextOverlay[];
}

export interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  fontSize: number;
  color: string;
  animation: 'fadeIn' | 'slideUp' | 'typewriter' | 'none';
}

export interface EditorState {
  segments: EditorSegment[];
  aspectRatio: { width: number; height: number };
}

/**
 * Builds a simple FFmpeg command for a single segment with effects.
 * Returns the -vf filter string.
 */
export function buildSegmentFilter(seg: EditorSegment, width: number, height: number): string {
  const filters: string[] = [];

  // Base scaling
  if (seg.kenBurns?.enabled) {
    const { startScale, endScale, startX, startY, endX, endY } = seg.kenBurns;
    const dur = Math.max(1, seg.audioDuration - seg.trimStart - seg.trimEnd);
    const frames = Math.round(dur * 30);

    // zoompan: zoom from startScale to endScale, pan from start to end position
    const zoomExpr = `${startScale}+(${endScale}-${startScale})*on/${frames}`;
    const xExpr = `iw*(${startX}+(${endX}-${startX})*on/${frames})`;
    const yExpr = `ih*(${startY}+(${endY}-${startY})*on/${frames})`;

    filters.push(
      `zoompan=z='${zoomExpr}':x='${xExpr}':y='${yExpr}':d=${frames}:s=${width}x${height}:fps=30`
    );
  } else {
    filters.push(
      `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`
    );
  }

  // Text overlays
  const font = getFontPath('bold');
  for (const overlay of seg.overlays) {
    const escaped = escapeFFmpegText(overlay.text);
    const x = Math.round(overlay.x * width);
    const y = Math.round(overlay.y * height);
    const enable = `enable='between(t,${overlay.startTime},${overlay.endTime})'`;

    let alphaExpr = '';
    if (overlay.animation === 'fadeIn') {
      const fadeDur = 0.5;
      alphaExpr = `:alpha='if(lt(t-${overlay.startTime},${fadeDur}),(t-${overlay.startTime})/${fadeDur},1)'`;
    }

    filters.push(
      `drawtext=fontfile='${font}':text='${escaped}':fontsize=${overlay.fontSize}:fontcolor=${overlay.color}:borderw=2:bordercolor=black:x=${x}:y=${y}:${enable}${alphaExpr}`
    );
  }

  return filters.join(',');
}

/**
 * Builds the complete FFmpeg command for assembly with editor state.
 * Returns { inputs, filterComplex, outputArgs } for the caller to assemble.
 */
export function buildEditorFFmpegArgs(state: EditorState): {
  segmentCommands: { imagePath: string; audioPath: string; videoPath: string; cmd: string }[];
  useXfade: boolean;
} {
  const { segments, aspectRatio } = state;
  const { width, height } = aspectRatio;

  const segmentCommands = segments
    .sort((a, b) => a.order - b.order)
    .map((seg) => {
      const filter = buildSegmentFilter(seg, width, height);
      const duration = Math.max(1, seg.audioDuration - seg.trimStart - seg.trimEnd);

      const trimArgs = seg.trimStart > 0 || seg.trimEnd > 0
        ? `-ss ${seg.trimStart} -to ${seg.audioDuration - seg.trimEnd}`
        : '';

      const cmd = `ffmpeg -y -loop 1 -i "${seg.imageUrl}" ${trimArgs} -i "${seg.audioUrl}" -c:v libx264 -t ${Math.ceil(duration)} -pix_fmt yuv420p -vf "${filter}" -shortest`;

      return {
        imagePath: seg.imageUrl,
        audioPath: seg.audioUrl,
        videoPath: '', // Caller sets this
        cmd,
      };
    });

  const useXfade = segments.some((s) => s.transition?.type && s.transition.type !== 'cut');

  return { segmentCommands, useXfade };
}
