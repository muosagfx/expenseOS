import type { LayoutDefinition, SlideElement } from '../types';
import { MARGIN, body, displayNumber, heading, kicker, mix, rect, textOn } from './helpers';

export const bigNumberLayout: LayoutDefinition = {
  id: 'big-number',
  name: 'Big Number',
  description: 'Oversized ghost numeral anchoring the right side.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const num = displayNumber(inputs.sectionNumber);
    const elements: SlideElement[] = [];

    elements.push({
      kind: 'text',
      frame: { x: 5.6, y: 0.3, w: 7.4, h: 6.9 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 330,
      color: mix(inputs.primary, inputs.background, 0.78),
      bold: true,
      align: 'right',
      valign: 'middle',
    });

    elements.push(kicker(ctx, { x: MARGIN, y: 1.0, w: 4, h: 0.4 }, `Section ${num}`, inputs.accent));
    elements.push(rect({ x: MARGIN, y: 4.45, w: 0.9, h: 0.07 }, inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 4.7, w: 8.6, h: 1.5 }, inputs.sectionTitle, { size: 44, color: ink }));
    elements.push(body(ctx, { x: MARGIN, y: 6.05, w: 7.8, h: 0.9 }, inputs.subtitle, { size: 15, color: mix(ink, inputs.background, 0.35) }));

    return elements;
  },
};
