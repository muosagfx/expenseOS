import type { LayoutDefinition, SlideElement } from '../types';
import { MARGIN, SLIDE_H, SLIDE_W, body, displayNumber, dotGrid, heading, kicker, mix, rect, textOn } from './helpers';

export const fullBleedTextureLayout: LayoutDefinition = {
  id: 'full-bleed-texture',
  name: 'Full Bleed Texture',
  description: 'Primary color floods the slide under a faint dot texture.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.primary);
    const num = displayNumber(inputs.sectionNumber);
    const elements: SlideElement[] = [];

    elements.push(rect({ x: 0, y: 0, w: SLIDE_W, h: SLIDE_H }, inputs.primary));
    elements.push(...dotGrid({ x: 0.45, y: 0.45, w: SLIDE_W - 0.9, h: SLIDE_H - 0.9 }, mix(ink, inputs.primary, 0.88), 9, 16, 0.02));

    elements.push(kicker(ctx, { x: MARGIN, y: 1.7, w: 4, h: 0.4 }, `Section ${num}`, inputs.accent));
    elements.push(rect({ x: MARGIN, y: 2.85, w: 0.9, h: 0.07 }, inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 3.15, w: 9.4, h: 1.7 }, inputs.sectionTitle, { size: 46, color: ink }));
    elements.push(body(ctx, { x: MARGIN, y: 4.95, w: 7.8, h: 1 }, inputs.subtitle, { size: 15, color: mix(ink, inputs.primary, 0.3) }));

    elements.push({
      kind: 'text',
      frame: { x: SLIDE_W - 3.4, y: SLIDE_H - 2.4, w: 2.5, h: 1.6 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 80,
      color: mix(ink, inputs.primary, 0.62),
      bold: true,
      align: 'right',
      valign: 'bottom',
    });

    return elements;
  },
};
