import type { LayoutDefinition, SlideElement } from '../types';
import { MARGIN, SLIDE_W, body, displayNumber, dotGrid, heading, kicker, mix, rect, textOn } from './helpers';

export const patternFooterLayout: LayoutDefinition = {
  id: 'pattern-footer',
  name: 'Pattern Footer',
  description: 'Airy top half over a dotted texture band along the base.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const num = displayNumber(inputs.sectionNumber);
    const elements: SlideElement[] = [];

    elements.push(kicker(ctx, { x: MARGIN, y: 1.1, w: 4, h: 0.4 }, 'Section', inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 1.7, w: 10.2, h: 1.6 }, inputs.sectionTitle, { size: 44, color: ink }));
    elements.push(body(ctx, { x: MARGIN, y: 3.35, w: 8.4, h: 0.9 }, inputs.subtitle, { size: 15, color: mix(ink, inputs.background, 0.35) }));
    elements.push({
      kind: 'text',
      frame: { x: SLIDE_W - MARGIN - 2, y: 1.0, w: 2, h: 1 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 30,
      color: inputs.accent,
      bold: true,
      align: 'right',
      valign: 'top',
    });

    elements.push(rect({ x: 0, y: 6.0, w: SLIDE_W, h: 0.035 }, inputs.accent));
    elements.push(rect({ x: 0, y: 6.035, w: SLIDE_W, h: 1.465 }, mix(inputs.primary, inputs.background, 0.92)));
    elements.push(...dotGrid({ x: 0.5, y: 6.35, w: 12.33, h: 0.85 }, mix(inputs.primary, inputs.background, 0.45), 3, 34));

    return elements;
  },
};
