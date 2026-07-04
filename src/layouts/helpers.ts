import type {
  EllipseElement,
  Frame,
  LayoutContext,
  RectElement,
  SlideElement,
  TextElement,
} from '../types';

export const SLIDE_W = 13.333;
export const SLIDE_H = 7.5;
/** Default outer margin used by most layouts. */
export const MARGIN = 0.9;

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

/** A title text element that follows the preset's heading font, weight and tracking. */
export function heading(ctx: LayoutContext, frame: Frame, text: string, opts: HeadingOptions): TextElement {
  return {
    kind: 'text',
    frame,
    text: headingText(ctx, text),
    fontFace: ctx.preset.fonts.heading,
    size: opts.size,
    color: opts.color,
    bold: ctx.preset.heading.bold,
    charSpacing: ctx.preset.heading.charSpacing,
    align: opts.align ?? 'left',
    valign: opts.valign ?? 'top',
    lineSpacing: opts.lineSpacing ?? 1.05,
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

/** Small uppercase label with wide tracking ("SECTION", "EVENT PROPOSAL", ...). */
export function kicker(ctx: LayoutContext, frame: Frame, text: string, color: string, align: TextElement['align'] = 'left'): TextElement {
  return {
    kind: 'text',
    frame,
    text: text.toUpperCase(),
    fontFace: ctx.preset.fonts.body,
    size: 12,
    color,
    bold: true,
    charSpacing: 3,
    align,
    valign: 'middle',
  };
}

export function rect(frame: Frame, fill: string, rotate?: number): RectElement {
  return { kind: 'rect', frame, fill, rotate };
}

/** Placeholder texture: an evenly spaced grid of small dots inside `area`. */
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

/** Placeholder texture: thin vertical ticks across `area`, like an editorial ruler. */
export function tickRow(area: Frame, color: string, count: number, thickness = 0.02): SlideElement[] {
  const ticks: SlideElement[] = [];
  const step = count > 1 ? (area.w - thickness) / (count - 1) : 0;
  for (let i = 0; i < count; i += 1) {
    const tall = i % 5 === 0;
    ticks.push(rect({ x: area.x + i * step, y: tall ? area.y : area.y + area.h * 0.3, w: thickness, h: tall ? area.h : area.h * 0.7 }, color));
  }
  return ticks;
}
