/**
 * Top N Video Composition Schema
 *
 * Defines the layer-based composition model for Top N videos.
 * This is the source of truth: templates generate default compositions,
 * the overlay editor modifies them, and the FFmpeg compiler renders them.
 */

import type { QualityPreset } from './tiktok-config';
import type { TopNTemplateConfig, TopNItem, TopNIntro } from './topn-templates';

// ── Animation ──────────────────────────────────────────────

export type AnimationType = 'none' | 'fadeIn' | 'fadeOut' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn';

export interface AnimationSpec {
  type: AnimationType;
  delay: number;     // seconds from segment start
  duration: number;  // seconds
}

// ── Layer Types ────────────────────────────────────────────

export type LayerType = 'background' | 'text' | 'number-badge' | 'progress-bar' | 'shape';

export interface BaseLayer {
  id: string;
  type: LayerType;
  zIndex: number;
  /** 0-1 normalized position */
  x: number;
  y: number;
  /** 0-1 normalized size (for shapes/badges) */
  width: number;
  height: number;
  opacity: number;   // 0-1
  rotation: number;  // degrees
  visible: boolean;
  enterAnimation?: AnimationSpec;
  exitAnimation?: AnimationSpec;
}

export interface BackgroundLayer extends BaseLayer {
  type: 'background';
  darken: number;     // 0-1 (0 = no darken, 0.3 = typical)
  blur: number;       // 0 = no blur, 4 = typical
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  text: string;
  fontSize: number;
  fontId: string;
  color: string;
  borderWidth: number;
  borderColor: string;
}

export interface NumberBadgeLayer extends BaseLayer {
  type: 'number-badge';
  rank: number;
  fontSize: number;
  fontId: string;
  color: string;
  borderWidth: number;
  borderColor: string;
}

export interface ProgressBarLayer extends BaseLayer {
  type: 'progress-bar';
  style: 'bar' | 'countdown' | 'both';
  color: string;
  barHeight: number;
}

export interface ShapeLayer extends BaseLayer {
  type: 'shape';
  fillColor: string;
  fillOpacity: number;
}

export type Layer = BackgroundLayer | TextLayer | NumberBadgeLayer | ProgressBarLayer | ShapeLayer;

// ── Segment & Video Composition ────────────────────────────

export interface SegmentComposition {
  segmentId: string;
  rank?: number;
  isIntro?: boolean;
  layers: Layer[];
}

export interface TransitionSpec {
  type: 'fade' | 'slideleft' | 'slideright';
  duration: number;
}

export interface VideoComposition {
  segments: SegmentComposition[];
  transition: TransitionSpec;
  quality: QualityPreset;
  fontId: string;
}

// ── Helpers ────────────────────────────────────────────────

let layerCounter = 0;
export function generateLayerId(): string {
  return `layer_${Date.now()}_${++layerCounter}`;
}

/** Create a default background layer */
export function createBackgroundLayer(darken = 0.3, blur = 0): BackgroundLayer {
  return {
    id: generateLayerId(), type: 'background', zIndex: 0,
    x: 0, y: 0, width: 1, height: 1, opacity: 1, rotation: 0, visible: true,
    darken, blur,
  };
}

/** Create a number badge layer */
export function createNumberBadgeLayer(rank: number, opts: {
  x?: number; y?: number; fontSize?: number; fontId?: string;
  color?: string; borderWidth?: number; borderColor?: string;
} = {}): NumberBadgeLayer {
  return {
    id: generateLayerId(), type: 'number-badge', zIndex: 10,
    x: opts.x ?? 0.5, y: opts.y ?? 0.5,
    width: 0, height: 0, opacity: 1, rotation: 0, visible: true,
    rank,
    fontSize: opts.fontSize ?? 300,
    fontId: opts.fontId ?? 'bebas',
    color: opts.color ?? 'white',
    borderWidth: opts.borderWidth ?? 8,
    borderColor: opts.borderColor ?? 'black',
    enterAnimation: { type: 'scaleIn', delay: 0, duration: 0.3 },
  };
}

/** Create a text layer */
export function createTextLayer(text: string, opts: {
  x?: number; y?: number; fontSize?: number; fontId?: string;
  color?: string; borderWidth?: number; borderColor?: string;
  zIndex?: number;
} = {}): TextLayer {
  return {
    id: generateLayerId(), type: 'text', zIndex: opts.zIndex ?? 20,
    x: opts.x ?? 0.5, y: opts.y ?? 0.85,
    width: 0, height: 0, opacity: 1, rotation: 0, visible: true,
    text,
    fontSize: opts.fontSize ?? 60,
    fontId: opts.fontId ?? 'montserrat',
    color: opts.color ?? 'white',
    borderWidth: opts.borderWidth ?? 3,
    borderColor: opts.borderColor ?? 'black',
    enterAnimation: { type: 'slideUp', delay: 0.2, duration: 0.3 },
  };
}

/** Create a progress bar layer */
export function createProgressBarLayer(style: 'bar' | 'countdown' | 'both' = 'bar', color = 'white'): ProgressBarLayer {
  return {
    id: generateLayerId(), type: 'progress-bar', zIndex: 30,
    x: 0, y: 1, width: 1, height: 0,
    opacity: 0.8, rotation: 0, visible: true,
    style, color, barHeight: 8,
  };
}

/** Create a shape layer (e.g. for dimming box behind text) */
export function createShapeLayer(opts: {
  x?: number; y?: number; width?: number; height?: number;
  fillColor?: string; fillOpacity?: number; zIndex?: number;
} = {}): ShapeLayer {
  return {
    id: generateLayerId(), type: 'shape', zIndex: opts.zIndex ?? 5,
    x: opts.x ?? 0, y: opts.y ?? 0.75,
    width: opts.width ?? 1, height: opts.height ?? 0.25,
    opacity: 1, rotation: 0, visible: true,
    fillColor: opts.fillColor ?? 'black',
    fillOpacity: opts.fillOpacity ?? 0.4,
  };
}

// ── Default Composition from Template ──────────────────────

/** Position map for number badge: template position → normalized coordinates */
function numberPosition(pos: 'center' | 'topLeft' | 'topRight'): { x: number; y: number } {
  switch (pos) {
    case 'center': return { x: 0.5, y: 0.5 };
    case 'topLeft': return { x: 0.05, y: 0.05 };
    case 'topRight': return { x: 0.9, y: 0.05 };
  }
}

function titlePosition(pos: 'top' | 'bottom' | 'center'): number {
  switch (pos) {
    case 'top': return 0.08;
    case 'bottom': return 0.88;
    case 'center': return 0.5;
  }
}

/**
 * Generate a default VideoComposition from template config + items.
 * This is called when the user enters the editor step.
 */
export function generateDefaultComposition(
  tmpl: TopNTemplateConfig,
  items: TopNItem[],
  intro: TopNIntro | null,
  topic: string,
  fontIdOverride?: string,
): SegmentComposition[] {
  const fid = fontIdOverride || tmpl.fontId;
  const numPos = numberPosition(tmpl.numberPosition);
  const segments: SegmentComposition[] = [];

  // Intro segment
  if (intro) {
    const layers: Layer[] = [
      createBackgroundLayer(0.3, 0),
      createTextLayer(topic, {
        x: 0.5, y: 0.08, fontSize: tmpl.introTitleFontSize || 72, fontId: fid, color: 'white',
        zIndex: 10,
      }),
      createTextLayer(intro.hook, {
        x: 0.5, y: 0.5, fontSize: tmpl.introHookFontSize || 48, fontId: fid, color: '#FFD700',
        zIndex: 20,
      }),
    ];
    segments.push({ segmentId: 'intro_0', isIntro: true, layers });
  }

  // Rank segments
  for (const item of items) {
    const layers: Layer[] = [
      createBackgroundLayer(tmpl.numberPosition === 'center' ? 0.3 : 0, 0),
      createNumberBadgeLayer(item.rank, {
        x: numPos.x, y: numPos.y,
        fontSize: tmpl.numberFontSize, fontId: fid,
        color: tmpl.numberColor,
        borderWidth: tmpl.numberBorderWidth, borderColor: tmpl.numberBorderColor,
      }),
    ];

    if (tmpl.showTitle && item.title) {
      layers.push(createTextLayer(item.title, {
        x: 0.5, y: titlePosition(tmpl.titlePosition),
        fontSize: tmpl.titleFontSize, fontId: fid, color: 'white',
        zIndex: 20,
      }));
    }

    segments.push({ segmentId: `rank_${item.rank}`, rank: item.rank, layers });
  }

  return segments;
}
