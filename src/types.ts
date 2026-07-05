/** Slide coordinate space is expressed in inches on a 13.333 x 7.5 (16:9) canvas. */
export interface Frame {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Align = 'left' | 'center' | 'right';
export type VAlign = 'top' | 'middle' | 'bottom';

export interface RectElement {
  kind: 'rect';
  frame: Frame;
  fill?: string;
  line?: { color: string; width: number };
  /** Degrees, rotated around the shape center. */
  rotate?: number;
}

export interface EllipseElement {
  kind: 'ellipse';
  frame: Frame;
  fill?: string;
  line?: { color: string; width: number };
}

export interface TextElement {
  kind: 'text';
  frame: Frame;
  text: string;
  /** Font face name, resolved from the active style preset. */
  fontFace: string;
  /** Font size in points. */
  size: number;
  color: string;
  bold?: boolean;
  italic?: boolean;
  align?: Align;
  valign?: VAlign;
  /** Extra character spacing in points. */
  charSpacing?: number;
  /** Line height as a multiple of the font size. */
  lineSpacing?: number;
  /** Right-to-left text (used by the Arabic/bilingual layout). */
  rtl?: boolean;
  /** Text stroke, used for outlined ghost numerals. Width in points. */
  outline?: { color: string; width: number };
}

export type SlideElement = RectElement | EllipseElement | TextElement;

export type PresetId =
  | 'minimal-executive'
  | 'saudi-heritage'
  | 'futuristic-tech'
  | 'editorial-luxury'
  | 'dark-cinematic';

/** Placeholder texture language, one per preset. */
export type PatternKind = 'dots' | 'diamonds' | 'crosses' | 'vlines' | 'scanlines';

/** Slide-level decorative frame applied on top of every layout. */
export type ChromeKind = 'cropmarks' | 'diamond-rule' | 'hud' | 'frame' | 'letterbox';

/** Treatment for large display numerals. */
export type NumberStyle = 'solid' | 'outline' | 'italic';

export interface StylePreset {
  id: PresetId;
  name: string;
  description: string;
  fonts: {
    heading: string;
    body: string;
    arabic: string;
  };
  defaults: {
    primary: string;
    accent: string;
    background: string;
  };
  heading: {
    uppercase: boolean;
    bold: boolean;
    charSpacing: number;
    /** Multiplier applied to layout title sizes (serifs run larger, wide sans smaller). */
    sizeScale: number;
  };
  /** Editorial Luxury sets subtitles in italic; others stay roman. */
  subtitleItalic: boolean;
  labels: {
    /** Word used before the number in kickers: Section / Sector / Chapter / Act. */
    section: string;
    /** Prefix for standalone display numbers, e.g. "No. " in Editorial Luxury. */
    numberPrefix: string;
  };
  decor: {
    pattern: PatternKind;
    chrome: ChromeKind;
    numberStyle: NumberStyle;
  };
}

export interface DividerInputs {
  sectionTitle: string;
  subtitle: string;
  sectionNumber: string;
  arabicTitle: string;
  arabicSubtitle: string;
  primary: string;
  accent: string;
  background: string;
}

export interface LayoutContext {
  inputs: DividerInputs;
  preset: StylePreset;
}

export type LayoutId =
  | 'big-number'
  | 'left-editorial'
  | 'centered-premium'
  | 'split-grid'
  | 'pattern-footer'
  | 'top-bar'
  | 'full-bleed-texture'
  | 'minimal-line'
  | 'bilingual'
  | 'event-proposal';

export interface LayoutDefinition {
  id: LayoutId;
  name: string;
  description: string;
  build: (ctx: LayoutContext) => SlideElement[];
}
