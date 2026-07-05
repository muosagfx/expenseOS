import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome, presetPattern } from './decor';
import { MARGIN, SLIDE_W, displayNumber, hairline, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const topBarLayout: LayoutDefinition = {
  id: 'top-bar',
  name: 'Top Bar',
  description: 'Full-width header band carrying the section number.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const barInk = textOn(inputs.primary);
    const muted = mix(ink, inputs.background, 0.42);
    const barH = 1.35;
    const elements: SlideElement[] = [];

    elements.push(rect({ x: 0, y: 0, w: SLIDE_W, h: barH }, inputs.primary));
    elements.push({
      kind: 'text',
      frame: { x: MARGIN, y: 0, w: 2.4, h: barH },
      text: displayNumber(inputs.sectionNumber),
      fontFace: preset.fonts.heading,
      size: 26,
      color: barInk,
      bold: true,
      italic: preset.decor.numberStyle === 'italic',
      align: 'left',
      valign: 'middle',
    });
    // Fine divider stem between the number and the label zone.
    elements.push(rect({ x: MARGIN + 1.15, y: barH / 2 - 0.22, w: 0.016, h: 0.44 }, mix(barInk, inputs.primary, 0.55)));
    elements.push(kicker(ctx, { x: MARGIN + 1.4, y: 0, w: 4, h: barH }, sectionLabel(ctx), mix(barInk, inputs.primary, 0.3)));
    elements.push(kicker(ctx, { x: SLIDE_W - MARGIN - 4, y: 0, w: 4, h: barH }, 'Divider', mix(barInk, inputs.primary, 0.45), 'right'));
    elements.push(rect({ x: 0, y: barH, w: SLIDE_W, h: 0.05 }, inputs.accent));

    elements.push(heading(ctx, { x: MARGIN, y: 3.35, w: 10.7, h: 1.65 }, inputs.sectionTitle, { size: 48, color: ink }));
    elements.push(subtitle(ctx, { x: MARGIN, y: 5.1, w: 7.6, h: 0.9 }, { size: 14, color: muted }));

    // Quiet texture strip closing the page, bottom-left.
    elements.push(...presetPattern(ctx, { x: MARGIN, y: 6.45, w: 2.3, h: 0.22 }, mix(ink, inputs.background, 0.68)));
    elements.push(hairline(SLIDE_W - MARGIN - 2.3, 6.55, 2.3, mix(ink, inputs.background, 0.68)));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
