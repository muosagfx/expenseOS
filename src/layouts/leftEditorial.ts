import type { LayoutDefinition, SlideElement } from '../types';
import { MARGIN, body, displayNumber, heading, kicker, mix, rect, textOn } from './helpers';

export const leftEditorialLayout: LayoutDefinition = {
  id: 'left-editorial',
  name: 'Left Editorial',
  description: 'Ragged-left column against a vertical accent rule.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const num = displayNumber(inputs.sectionNumber);
    const contentX = MARGIN + 0.4;
    const elements: SlideElement[] = [];

    elements.push(rect({ x: MARGIN, y: 1.2, w: 0.045, h: 5.1 }, inputs.accent));
    elements.push(kicker(ctx, { x: contentX, y: 1.2, w: 5, h: 0.4 }, `Section ${num}`, inputs.accent));
    elements.push(heading(ctx, { x: contentX, y: 2.2, w: 9.6, h: 2.6 }, inputs.sectionTitle, { size: 54, color: ink }));
    elements.push(body(ctx, { x: contentX, y: 5.05, w: 7.6, h: 1.1 }, inputs.subtitle, { size: 16, color: mix(ink, inputs.background, 0.35) }));
    elements.push(rect({ x: contentX, y: 6.35, w: 0.7, h: 0.05 }, mix(ink, inputs.background, 0.6)));

    return elements;
  },
};
