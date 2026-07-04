import type { LayoutDefinition, SlideElement } from '../types';
import { SLIDE_H, body, displayNumber, dotGrid, heading, kicker, mix, rect, textOn } from './helpers';

export const splitGridLayout: LayoutDefinition = {
  id: 'split-grid',
  name: 'Split Grid',
  description: 'Solid color panel on the left, numeral and dot grid on the right.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const panelInk = textOn(inputs.primary);
    const num = displayNumber(inputs.sectionNumber);
    const elements: SlideElement[] = [];

    elements.push(rect({ x: 0, y: 0, w: 6.2, h: SLIDE_H }, inputs.primary));
    elements.push(kicker(ctx, { x: 0.85, y: 1.0, w: 4, h: 0.4 }, `Section ${num}`, inputs.accent));
    elements.push(heading(ctx, { x: 0.85, y: 2.85, w: 4.7, h: 2.3 }, inputs.sectionTitle, { size: 40, color: panelInk }));
    elements.push(body(ctx, { x: 0.85, y: 5.35, w: 4.6, h: 1.2 }, inputs.subtitle, { size: 14, color: mix(panelInk, inputs.primary, 0.3) }));

    elements.push({
      kind: 'text',
      frame: { x: 6.7, y: 1.6, w: 6.0, h: 3.4 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 170,
      color: mix(inputs.primary, inputs.background, 0.45),
      bold: true,
      align: 'left',
      valign: 'middle',
    });
    elements.push(...dotGrid({ x: 9.1, y: 5.15, w: 3.3, h: 1.5 }, mix(inputs.accent, inputs.background, 0.25), 4, 9));

    return elements;
  },
};
