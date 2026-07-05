import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome } from './decor';
import { SLIDE_W, hairline, heading, kicker, mix, numberText, rect, sectionLabel, subtitle, textOn } from './helpers';

export const bilingualLayout: LayoutDefinition = {
  id: 'bilingual',
  name: 'Bilingual (AR / EN)',
  description: 'English column on the left, Arabic mirrored on the right.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.4);
    const cx = SLIDE_W / 2;
    const colW = 4.9;
    const gap = 0.75;
    const elements: SlideElement[] = [];

    // Header: display number flanked by small accent diamonds.
    elements.push({
      kind: 'text',
      frame: { x: cx - 1.5, y: 0.95, w: 3, h: 0.55 },
      text: numberText(ctx),
      fontFace: preset.fonts.heading,
      size: 19,
      color: inputs.accent,
      bold: preset.heading.bold,
      italic: preset.decor.numberStyle === 'italic',
      charSpacing: 1.5,
      align: 'center',
      valign: 'middle',
    });
    elements.push(rect({ x: cx - 1.85, y: 1.17, w: 0.075, h: 0.075 }, inputs.accent, 45));
    elements.push(rect({ x: cx + 1.78, y: 1.17, w: 0.075, h: 0.075 }, inputs.accent, 45));

    // Center spine with a short accent segment at title height.
    elements.push(rect({ x: cx - 0.01, y: 2.0, w: 0.02, h: 3.9 }, mix(ink, inputs.background, 0.65)));
    elements.push(rect({ x: cx - 0.025, y: 2.55, w: 0.05, h: 1.15 }, inputs.accent));

    // English column, ranged toward the spine.
    elements.push(heading(ctx, { x: cx - colW - gap, y: 2.55, w: colW, h: 1.7 }, inputs.sectionTitle, { size: 33, color: ink, align: 'right' }));
    elements.push(subtitle(ctx, { x: cx - colW - gap, y: 4.45, w: colW, h: 1 }, { size: 13, color: muted, align: 'right' }));

    // Arabic column, mirrored (RTL).
    elements.push({
      kind: 'text',
      frame: { x: cx + gap, y: 2.55, w: colW, h: 1.7 },
      text: inputs.arabicTitle,
      fontFace: preset.fonts.arabic,
      size: 33,
      color: ink,
      bold: true,
      align: 'left',
      valign: 'top',
      rtl: true,
      lineSpacing: 1.15,
    });
    elements.push({
      kind: 'text',
      frame: { x: cx + gap, y: 4.45, w: colW, h: 1 },
      text: inputs.arabicSubtitle,
      fontFace: preset.fonts.arabic,
      size: 14,
      color: muted,
      align: 'left',
      valign: 'top',
      rtl: true,
      lineSpacing: 1.35,
    });

    // Shared footer label and mirrored accent ticks.
    elements.push(hairline(cx - 1.75, 5.75, 0.55, inputs.accent, 0.04));
    elements.push(hairline(cx + 1.2, 5.75, 0.55, inputs.accent, 0.04));
    elements.push(kicker(ctx, { x: cx - 3, y: 6.15, w: 6, h: 0.32 }, sectionLabel(ctx), mix(ink, inputs.background, 0.55), 'center'));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
