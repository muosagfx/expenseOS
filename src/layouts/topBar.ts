import type { LayoutDefinition, SlideElement } from '../types';
import { MARGIN, SLIDE_W, body, displayNumber, heading, kicker, mix, rect, textOn } from './helpers';

export const topBarLayout: LayoutDefinition = {
  id: 'top-bar',
  name: 'Top Bar',
  description: 'Full-width header band carrying the section number.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const barInk = textOn(inputs.primary);
    const num = displayNumber(inputs.sectionNumber);
    const elements: SlideElement[] = [];

    elements.push(rect({ x: 0, y: 0, w: SLIDE_W, h: 1.5 }, inputs.primary));
    elements.push({
      kind: 'text',
      frame: { x: MARGIN, y: 0, w: 2, h: 1.5 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 28,
      color: barInk,
      bold: true,
      align: 'left',
      valign: 'middle',
    });
    elements.push(kicker(ctx, { x: SLIDE_W - MARGIN - 4, y: 0, w: 4, h: 1.5 }, 'Section divider', mix(barInk, inputs.primary, 0.25), 'right'));
    elements.push(rect({ x: 0, y: 1.5, w: SLIDE_W, h: 0.06 }, inputs.accent));

    elements.push(heading(ctx, { x: MARGIN, y: 3.25, w: 10.6, h: 1.7 }, inputs.sectionTitle, { size: 48, color: ink }));
    elements.push(body(ctx, { x: MARGIN, y: 5.05, w: 8.4, h: 1 }, inputs.subtitle, { size: 15, color: mix(ink, inputs.background, 0.35) }));

    return elements;
  },
};
