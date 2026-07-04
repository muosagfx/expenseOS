import type { LayoutDefinition, SlideElement } from '../types';
import { body, displayNumber, heading, mix, rect, textOn } from './helpers';

export const minimalLineLayout: LayoutDefinition = {
  id: 'minimal-line',
  name: 'Minimal Line',
  description: 'One hairline across the center; everything else is silence.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const num = displayNumber(inputs.sectionNumber);
    const lineY = 4.05;
    const x = 1.3;
    const w = 10.73;
    const elements: SlideElement[] = [];

    elements.push(rect({ x, y: lineY, w, h: 0.022 }, mix(ink, inputs.background, 0.65)));
    elements.push(rect({ x, y: lineY, w: 1.6, h: 0.022 }, inputs.accent));

    elements.push(heading(ctx, { x, y: 2.35, w, h: 1.5 }, inputs.sectionTitle, { size: 42, color: ink, valign: 'bottom' }));
    elements.push({
      kind: 'text',
      frame: { x, y: lineY + 0.25, w: 2, h: 0.5 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 16,
      color: inputs.accent,
      bold: true,
      charSpacing: 2,
      align: 'left',
      valign: 'top',
    });
    elements.push(body(ctx, { x: x + w - 7, y: lineY + 0.25, w: 7, h: 0.8 }, inputs.subtitle, { size: 13, color: mix(ink, inputs.background, 0.4), align: 'right' }));

    return elements;
  },
};
