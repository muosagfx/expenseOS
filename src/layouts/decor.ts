import type { Frame, LayoutContext, SlideElement } from '../types';
import { SLIDE_H, SLIDE_W, dotGrid, hairline, mix, outlineRect, rect, textOn } from './helpers';

/**
 * Preset-specific placeholder texture rendered inside `area`.
 * Each preset owns one pattern language so switching presets changes
 * geometry, not just color:
 *   dots (Minimal) - diamonds (Saudi) - crosses (Tech) - vlines (Editorial) - scanlines (Cinematic)
 */
export function presetPattern(ctx: LayoutContext, area: Frame, color: string): SlideElement[] {
  switch (ctx.preset.decor.pattern) {
    case 'dots': {
      const cols = Math.max(2, Math.round(area.w / 0.36));
      const rows = Math.max(2, Math.round(area.h / 0.36));
      return dotGrid(area, color, rows, cols, 0.022);
    }
    case 'diamonds': {
      const size = 0.085;
      const stepX = 0.44;
      const stepY = 0.44;
      const cols = Math.max(2, Math.floor((area.w - size) / stepX) + 1);
      const rows = Math.max(1, Math.floor((area.h - size) / stepY) + 1);
      const out: SlideElement[] = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          // Offset alternate rows for a woven, sadu-like rhythm.
          const offset = r % 2 === 1 ? stepX / 2 : 0;
          const x = area.x + c * stepX + offset;
          if (x + size > area.x + area.w) continue;
          out.push(rect({ x, y: area.y + r * stepY, w: size, h: size }, color, 45));
        }
      }
      return out;
    }
    case 'crosses': {
      const arm = 0.14;
      const thick = 0.016;
      const step = 0.6;
      const cols = Math.max(2, Math.floor((area.w - arm) / step) + 1);
      const rows = Math.max(1, Math.floor((area.h - arm) / step) + 1);
      const out: SlideElement[] = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const cx = area.x + c * step + arm / 2;
          const cy = area.y + r * step + arm / 2;
          out.push(rect({ x: cx - arm / 2, y: cy - thick / 2, w: arm, h: thick }, color));
          out.push(rect({ x: cx - thick / 2, y: cy - arm / 2, w: thick, h: arm }, color));
        }
      }
      return out;
    }
    case 'vlines': {
      const step = 0.16;
      const count = Math.max(3, Math.floor(area.w / step) + 1);
      const out: SlideElement[] = [];
      for (let i = 0; i < count; i += 1) {
        out.push(rect({ x: area.x + i * step, y: area.y, w: 0.014, h: area.h }, color));
      }
      return out;
    }
    case 'scanlines': {
      const step = 0.15;
      const count = Math.max(3, Math.floor(area.h / step) + 1);
      const out: SlideElement[] = [];
      for (let i = 0; i < count; i += 1) {
        out.push(rect({ x: area.x, y: area.y + i * step, w: area.w, h: 0.013 }, color));
      }
      return out;
    }
  }
}

/**
 * Slide-level decorative chrome drawn on top of every layout, one signature per preset:
 * print crop marks (Minimal), diamond rule (Saudi), HUD corner brackets (Tech),
 * inset magazine frame (Editorial), letterbox bars (Cinematic).
 * `surface` is the dominant edge color of the slide so the chrome stays subtle on it.
 */
export function presetChrome(ctx: LayoutContext, surface: string): SlideElement[] {
  const ink = textOn(surface);
  const { accent } = ctx.inputs;

  switch (ctx.preset.decor.chrome) {
    case 'cropmarks': {
      const c = mix(ink, surface, 0.6);
      const inset = 0.38;
      const len = 0.26;
      const t = 0.014;
      const out: SlideElement[] = [];
      for (const [cx, cy] of [
        [inset, inset],
        [SLIDE_W - inset, inset],
        [inset, SLIDE_H - inset],
        [SLIDE_W - inset, SLIDE_H - inset],
      ]) {
        const dirX = cx < SLIDE_W / 2 ? 1 : -1;
        const dirY = cy < SLIDE_H / 2 ? 1 : -1;
        out.push(rect({ x: dirX > 0 ? cx : cx - len, y: cy - t / 2, w: len, h: t }, c));
        out.push(rect({ x: cx - t / 2, y: dirY > 0 ? cy : cy - len, w: t, h: len }, c));
      }
      return out;
    }
    case 'diamond-rule': {
      // Centered bottom ornament: hairlines meeting a trio of gold diamonds.
      const c = mix(accent, surface, 0.15);
      const faint = mix(ink, surface, 0.72);
      const y = SLIDE_H - 0.46;
      const cx = SLIDE_W / 2;
      const d = 0.09;
      const out: SlideElement[] = [
        hairline(cx - 2.4, y + d / 2 - 0.008, 1.7, faint),
        hairline(cx + 0.7, y + d / 2 - 0.008, 1.7, faint),
        rect({ x: cx - d / 2, y, w: d, h: d }, c, 45),
        rect({ x: cx - d / 2 - 0.24, y: y + 0.014, w: d - 0.028, h: d - 0.028 }, mix(accent, surface, 0.45), 45),
        rect({ x: cx + d / 2 + 0.17, y: y + 0.014, w: d - 0.028, h: d - 0.028 }, mix(accent, surface, 0.45), 45),
      ];
      return out;
    }
    case 'hud': {
      const c = mix(accent, surface, 0.35);
      const inset = 0.32;
      const len = 0.34;
      const t = 0.02;
      const out: SlideElement[] = [];
      for (const [cx, cy] of [
        [inset, inset],
        [SLIDE_W - inset, inset],
        [inset, SLIDE_H - inset],
        [SLIDE_W - inset, SLIDE_H - inset],
      ]) {
        const dirX = cx < SLIDE_W / 2 ? 1 : -1;
        const dirY = cy < SLIDE_H / 2 ? 1 : -1;
        out.push(rect({ x: dirX > 0 ? cx : cx - len, y: dirY > 0 ? cy : cy - t, w: len, h: t }, c));
        out.push(rect({ x: dirX > 0 ? cx : cx - t, y: dirY > 0 ? cy : cy - len, w: t, h: len }, c));
      }
      // A lone registration cross off-center keeps the HUD feeling alive.
      const rx = SLIDE_W - 1.9;
      const ry = 1.05;
      out.push(rect({ x: rx - 0.09, y: ry - 0.008, w: 0.18, h: 0.016 }, mix(ink, surface, 0.65)));
      out.push(rect({ x: rx - 0.008, y: ry - 0.09, w: 0.016, h: 0.18 }, mix(ink, surface, 0.65)));
      return out;
    }
    case 'frame': {
      const inset = 0.3;
      return [
        outlineRect(
          { x: inset, y: inset, w: SLIDE_W - inset * 2, h: SLIDE_H - inset * 2 },
          mix(ink, surface, 0.55),
          1,
        ),
        // Small bronze diamond stitched onto the top rule, like a bookplate mark.
        rect({ x: SLIDE_W / 2 - 0.045, y: inset - 0.045, w: 0.09, h: 0.09 }, mix(accent, surface, 0.1), 45),
      ];
    }
    case 'letterbox': {
      const bar = mix('#000000', surface, 0.18);
      return [
        rect({ x: 0, y: 0, w: SLIDE_W, h: 0.22 }, bar),
        rect({ x: 0, y: SLIDE_H - 0.22, w: SLIDE_W, h: 0.22 }, bar),
        // Focus tick centered on the lower bar, like a projection alignment mark.
        rect({ x: SLIDE_W / 2 - 0.13, y: SLIDE_H - 0.245, w: 0.26, h: 0.025 }, mix(accent, surface, 0.25)),
      ];
    }
  }
}
