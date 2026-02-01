/**
 * Top N Composition → FFmpeg Compiler
 *
 * Translates a VideoComposition into FFmpeg filter chains.
 */

import type {
  Layer, BackgroundLayer, TextLayer, NumberBadgeLayer, ProgressBarLayer, ShapeLayer,
  SegmentComposition, AnimationSpec,
} from './topn-composition';
import { resolveFontPath, escapeFFmpegText } from './ffmpeg-utils';

// ── Animation Expressions ──────────────────────────────────

function alphaExpr(anim: AnimationSpec | undefined, baseAlpha: number): string | null {
  if (!anim || anim.type === 'none') return null;
  const start = anim.delay;
  const dur = anim.duration;
  const end = start + dur;

  switch (anim.type) {
    case 'fadeIn':
      return `if(lt(t,${start}),0,if(lt(t,${end}),${baseAlpha}*(t-${start})/${dur},${baseAlpha}))`;
    case 'fadeOut':
      return `if(lt(t,${start}),${baseAlpha},if(lt(t,${end}),${baseAlpha}*(1-(t-${start})/${dur}),0))`;
    case 'scaleIn':
      // For scaleIn we use alpha fade as a simpler approximation
      return `if(lt(t,${start}),0,if(lt(t,${end}),${baseAlpha}*(t-${start})/${dur},${baseAlpha}))`;
    default:
      return null;
  }
}

function yExpr(anim: AnimationSpec | undefined, baseY: string, height: number): string | null {
  if (!anim) return null;
  const start = anim.delay;
  const dur = anim.duration;
  const end = start + dur;
  const offset = Math.round(height * 0.05);

  switch (anim.type) {
    case 'slideUp':
      return `if(lt(t,${start}),${baseY}+${offset},if(lt(t,${end}),${baseY}+${offset}*(1-(t-${start})/${dur}),${baseY}))`;
    case 'slideDown':
      return `if(lt(t,${start}),${baseY}-${offset},if(lt(t,${end}),${baseY}-${offset}*(1-(t-${start})/${dur}),${baseY}))`;
    default:
      return null;
  }
}

// ── Layer Compilers ────────────────────────────────────────

function compileBackground(layer: BackgroundLayer, w: number, h: number): string[] {
  const filters: string[] = [];
  filters.push(`scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2`);
  if (layer.darken > 0) {
    const aa = (1 - layer.darken).toFixed(2);
    filters.push(`colorchannelmixer=aa=${aa}`);
  }
  if (layer.blur > 0) {
    filters.push(`boxblur=${layer.blur}:${layer.blur}`);
  }
  return filters;
}

function compileText(layer: TextLayer, w: number, h: number): string {
  const font = resolveFontPath(layer.fontId);
  const escaped = escapeFFmpegText(layer.text);

  // Convert normalized coordinates to pixel expressions
  const baseX = layer.x === 0.5 ? '(w-text_w)/2' : String(Math.round(layer.x * w));
  const baseY = String(Math.round(layer.y * h));

  const animY = yExpr(layer.enterAnimation, baseY, h);
  const animAlpha = alphaExpr(layer.enterAnimation, layer.opacity);

  let filter = `drawtext=fontfile='${font}':text='${escaped}':fontsize=${layer.fontSize}:fontcolor=${layer.color}`;
  filter += `:borderw=${layer.borderWidth}:bordercolor=${layer.borderColor}`;
  filter += `:x=${baseX}:y=${animY || baseY}`;
  if (animAlpha) filter += `:alpha='${animAlpha}'`;

  return filter;
}

function compileNumberBadge(layer: NumberBadgeLayer, w: number, h: number): string {
  const font = resolveFontPath(layer.fontId);

  const baseX = layer.x === 0.5 ? '(w-text_w)/2' : layer.x < 0.2 ? String(Math.round(w * 0.05)) : `w-text_w-${Math.round(w * 0.05)}`;
  const baseY = layer.y === 0.5 ? '(h-text_h)/2' : String(Math.round(layer.y * h));

  const animAlpha = alphaExpr(layer.enterAnimation, layer.opacity);

  let filter = `drawtext=fontfile='${font}':text='${layer.rank}':fontsize=${layer.fontSize}:fontcolor=${layer.color}`;
  filter += `:borderw=${layer.borderWidth}:bordercolor=${layer.borderColor}`;
  filter += `:x=${baseX}:y=${baseY}`;
  if (animAlpha) filter += `:alpha='${animAlpha}'`;

  return filter;
}

function compileProgressBar(layer: ProgressBarLayer, duration: number, w: number, h: number): string[] {
  const filters: string[] = [];
  const dur = duration.toFixed(2);
  const yPos = layer.y >= 0.9 ? `ih-${layer.barHeight}` : '0';

  if (layer.style === 'bar' || layer.style === 'both') {
    filters.push(`drawbox=x=0:y=${yPos}:w=iw*(1-t/${dur}):h=${layer.barHeight}:color=${layer.color}@${layer.opacity.toFixed(1)}:t=fill`);
  }

  if (layer.style === 'countdown' || layer.style === 'both') {
    const font = resolveFontPath(layer.id);  // fallback is fine
    const countY = layer.y >= 0.9 ? `ih-${layer.barHeight + 50}` : `${layer.barHeight + 10}`;
    filters.push(`drawtext=fontfile='${font}':text='%{eif\\:${Math.ceil(duration)}-t\\:d}':fontsize=36:fontcolor=white@0.7:borderw=2:bordercolor=black@0.5:x=w-text_w-24:y=${countY}`);
  }

  return filters;
}

function compileShape(layer: ShapeLayer, w: number, h: number): string {
  const x = Math.round(layer.x * w);
  const y = Math.round(layer.y * h);
  const bw = Math.round(layer.width * w);
  const bh = Math.round(layer.height * h);
  return `drawbox=x=${x}:y=${y}:w=${bw}:h=${bh}:color=${layer.fillColor}@${layer.fillOpacity.toFixed(1)}:t=fill`;
}

// ── Segment Compiler ───────────────────────────────────────

/**
 * Compile a segment composition into an FFmpeg filter chain string.
 */
export function compileSegmentFilters(
  seg: SegmentComposition,
  duration: number,
  w: number,
  h: number,
): string {
  const sortedLayers = [...seg.layers]
    .filter((l) => l.visible)
    .sort((a, b) => a.zIndex - b.zIndex);

  const filters: string[] = [];

  for (const layer of sortedLayers) {
    switch (layer.type) {
      case 'background':
        filters.push(...compileBackground(layer, w, h));
        break;
      case 'text':
        filters.push(compileText(layer, w, h));
        break;
      case 'number-badge':
        filters.push(compileNumberBadge(layer, w, h));
        break;
      case 'progress-bar':
        filters.push(...compileProgressBar(layer, duration, w, h));
        break;
      case 'shape':
        filters.push(compileShape(layer, w, h));
        break;
    }
  }

  return filters.join(',');
}
