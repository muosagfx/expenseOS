import type {
  EllipseElement,
  Frame,
  LayoutContext,
  RectElement,
  TextElement,
} from '../types';

export const SLIDE_W = 13.333;
export const SLIDE_H = 7.5;
/** Default outer margin used by most layouts. */
export const MARGIN = 0.95;

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  return {
    r: parseInt(full.slice(0, 2), 16) || 0,
    g: parseInt(full.slice(2, 4), 16) || 0,
    b: parseInt(full.slice(4, 6), 16) || 0,
  };
}

/** Blend `from` towards `to` by `t` (0 = from, 1 = to). Used for ghost numbers and faint patterns. */
export function mix(from: string, to: string, t: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const ch = (x: number, y: number) =>
    Math.round(x + (y - x) * t)
      .toString(16)
      .padStart(2, '0');
  return `#${ch(a.r, b.r)}${ch(a.g, b.g)}${ch(a.b, b.b)}`;
}

/** Pick a readable ink color (near-black or white) for text sitting on `background`. */
export function textOn(background: string): string {
  const { r, g, b } = hexToRgb(background);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1a1a1a' : '#ffffff';
}

/** Normalize the section number to a padded display string, e.g. "1" -> "01". */
export function displayNumber(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '01';
  return /^\d$/.test(trimmed) ? `0${trimmed}` : trimmed;
}

/** Kicker copy following the preset vocabulary: "Section 02", "Sector 02", "Chapter 02", "Act 02". */
export function sectionLabel(ctx: LayoutContext): string {
  return `${ctx.preset.labels.section} ${displayNumber(ctx.inputs.sectionNumber)}`;
}

/** Standalone display number with the preset prefix, e.g. "No. 02" for Editorial Luxury. */
export function numberText(ctx: LayoutContext): string {
  return `${ctx.preset.labels.numberPrefix}${displayNumber(ctx.inputs.sectionNumber)}`;
}

/** Apply the preset's heading case rule. */
export function headingText(ctx: LayoutContext, text: string): string {
  return ctx.preset.heading.uppercase ? text.toUpperCase() : text;
}

interface HeadingOptions {
  size: number;
  color: string;
  align?: TextElement['align'];
  valign?: TextElement['valign'];
  lineSpacing?: number;
}

/** A title text element that follows the preset's heading font, weight, scale and tracking. */
export function heading(ctx: LayoutContext, frame: Frame, text: string, opts: HeadingOptions): TextElement {
  return {
    kind: 'text',
    frame,
    text: headingText(ctx, text),
    fontFace: ctx.preset.fonts.heading,
    size: Math.round(opts.size * ctx.preset.heading.sizeScale),
    color: opts.color,
    bold: ctx.preset.heading.bold,
    charSpacing: ctx.preset.heading.charSpacing,
    align: opts.align ?? 'left',
    valign: opts.valign ?? 'top',
    lineSpacing: opts.lineSpacing ?? 1.04,
  };
}

interface BodyOptions {
  size: number;
  color: string;
  align?: TextElement['align'];
  valign?: TextElement['valign'];
  italic?: boolean;
  charSpacing?: number;
  bold?: boolean;
}

export function body(ctx: LayoutContext, frame: Frame, text: string, opts: BodyOptions): TextElement {
  return {
    kind: 'text',
    frame,
    text,
    fontFace: ctx.preset.fonts.body,
    size: opts.size,
    color: opts.color,
    italic: opts.italic,
    bold: opts.bold,
    charSpacing: opts.charSpacing,
    align: opts.align ?? 'left',
    valign: opts.valign ?? 'top',
    lineSpacing: 1.3,
  };
}

/** Subtitle treatment: follows the preset's italic rule and breathes a little more than body copy. */
export function subtitle(ctx: LayoutContext, frame: Frame, opts: Omit<BodyOptions, 'italic'>): TextElement {
  return {
    ...body(ctx, frame, ctx.inputs.subtitle, opts),
    italic: ctx.preset.subtitleItalic,
    lineSpacing: 1.4,
    charSpacing: opts.charSpacing ?? 0.2,
  };
}

/** Small uppercase label with wide tracking ("SECTION 02", "EVENT PROPOSAL", ...). */
export function kicker(ctx: LayoutContext, frame: Frame, text: string, color: string, align: TextElement['align'] = 'left'): TextElement {
  return {
    kind: 'text',
    frame,
    text: text.toUpperCase(),
    fontFace: ctx.preset.fonts.body,
    size: 11,
    color,
    bold: true,
    charSpacing: 3.2,
    align,
    valign: 'middle',
  };
}

interface GhostOptions {
  align?: TextElement['align'];
  valign?: TextElement['valign'];
  /** How far the numeral fades toward the surface (0 = full primary, 1 = invisible). */
  strength?: number;
}

/**
 * Large display numeral, styled per preset: solid blend (Minimal, Saudi, Cinematic),
 * outlined stroke (Futuristic Tech) or italic serif (Editorial Luxury).
 * `surface` is the color the numeral sits on, so the fade stays readable everywhere.
 */
export function ghostNumber(ctx: LayoutContext, frame: Frame, size: number, surface: string, opts: GhostOptions = {}): TextElement {
  const { preset, inputs } = ctx;
  const strength = opts.strength ?? 0.78;
  const base: TextElement = {
    kind: 'text',
    frame,
    text: displayNumber(inputs.sectionNumber),
    fontFace: preset.fonts.heading,
    size,
    color: mix(inputs.primary, surface, strength),
    bold: true,
    align: opts.align ?? 'right',
    valign: opts.valign ?? 'middle',
  };
  if (preset.decor.numberStyle === 'italic') {
    return { ...base, italic: true, bold: false };
  }
  if (preset.decor.numberStyle === 'outline') {
    return {
      ...base,
      color: surface,
      outline: { color: mix(inputs.primary, surface, Math.max(0, strength - 0.45)), width: Math.max(1, size / 90) },
    };
  }
  return base;
}

export function rect(frame: Frame, fill: string, rotate?: number): RectElement {
  return { kind: 'rect', frame, fill, rotate };
}

/** Hairline rule; thickness defaults to a fine 0.016 in. */
export function hairline(x: number, y: number, w: number, color: string, thickness = 0.016): RectElement {
  return rect({ x, y, w, h: thickness }, color);
}

/** Stroke-only rectangle (used for frames and outlined chips). Width in points. */
export function outlineRect(frame: Frame, color: string, width: number): RectElement {
  return { kind: 'rect', frame, line: { color, width } };
}

/** Evenly spaced grid of small dots inside `area`. */
export function dotGrid(area: Frame, color: string, rows: number, cols: number, radius = 0.025): EllipseElement[] {
  const dots: EllipseElement[] = [];
  const stepX = cols > 1 ? (area.w - radius * 2) / (cols - 1) : 0;
  const stepY = rows > 1 ? (area.h - radius * 2) / (rows - 1) : 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      dots.push({
        kind: 'ellipse',
        frame: { x: area.x + c * stepX, y: area.y + r * stepY, w: radius * 2, h: radius * 2 },
        fill: color,
      });
    }
  }
  return dots;
}
