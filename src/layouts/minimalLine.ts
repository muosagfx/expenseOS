import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome } from './decor';
import { hairline, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const minimalLineLayout: LayoutDefinition = {
  id: 'minimal-line',
  name: 'Minimal Line',
  description: 'One hairline across the center; everything else is silence.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.45);
    const lineY = 4.1;
    const x = 1.35;
    const w = 10.63;
    const elements: SlideElement[] = [];

    elements.push(hairline(x, lineY, w, mix(ink, inputs.background, 0.68)));
    elements.push(rect({ x, y: lineY - 0.008, w: 1.5, h: 0.034 }, inputs.accent));
    // A lone terminal dot closes the rule, like a full stop.
    elements.push({
      kind: 'ellipse',
      frame: { x: x + w - 0.05, y: lineY - 0.026, w: 0.068, h: 0.068 },
      fill: inputs.accent,
    });

    elements.push(kicker(ctx, { x, y: 1.85, w, h: 0.32 }, sectionLabel(ctx), muted));
    elements.push(heading(ctx, { x, y: 2.25, w, h: 1.6 }, inputs.sectionTitle, { size: 44, color: ink, valign: 'bottom' }));

    elements.push(subtitle(ctx, { x: x + w - 6.8, y: lineY + 0.3, w: 6.8, h: 0.8 }, { size: 13, color: muted, align: 'right' }));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
