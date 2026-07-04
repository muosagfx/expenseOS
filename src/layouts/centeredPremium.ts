import type { LayoutDefinition, SlideElement } from '../types';
import { SLIDE_W, body, displayNumber, heading, mix, rect, textOn } from './helpers';

export const centeredPremiumLayout: LayoutDefinition = {
  id: 'centered-premium',
  name: 'Centered Premium',
  description: 'Symmetric composition with flanking hairline rules.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const num = displayNumber(inputs.sectionNumber);
    const cx = SLIDE_W / 2;
    const elements: SlideElement[] = [];

    elements.push(rect({ x: cx - 2.1, y: 1.98, w: 1.1, h: 0.02 }, mix(ink, inputs.background, 0.55)));
    elements.push(rect({ x: cx + 1.0, y: 1.98, w: 1.1, h: 0.02 }, mix(ink, inputs.background, 0.55)));
    elements.push({
      kind: 'text',
      frame: { x: cx - 0.9, y: 1.7, w: 1.8, h: 0.6 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 20,
      color: inputs.accent,
      bold: true,
      charSpacing: 2,
      align: 'center',
      valign: 'middle',
    });

    elements.push(heading(ctx, { x: 1.6, y: 2.95, w: 10.13, h: 1.6 }, inputs.sectionTitle, { size: 46, color: ink, align: 'center' }));
    elements.push(body(ctx, { x: 2.8, y: 4.65, w: 7.73, h: 0.9 }, inputs.subtitle, { size: 15, color: mix(ink, inputs.background, 0.35), align: 'center' }));
    elements.push(rect({ x: cx - 0.35, y: 5.75, w: 0.7, h: 0.045 }, inputs.accent));

    return elements;
  },
};
