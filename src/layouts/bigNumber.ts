import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome } from './decor';
import { MARGIN, ghostNumber, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const bigNumberLayout: LayoutDefinition = {
  id: 'big-number',
  name: 'Big Number',
  description: 'Oversized ghost numeral anchoring the right side.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.42);
    const elements: SlideElement[] = [];

    elements.push(ghostNumber(ctx, { x: 6.1, y: 0.55, w: 6.75, h: 6.4 }, 315, inputs.background));

    // Top-left identity: accent chip + tracked kicker on one baseline.
    elements.push(rect({ x: MARGIN, y: 0.94, w: 0.15, h: 0.15 }, inputs.accent));
    elements.push(kicker(ctx, { x: MARGIN + 0.3, y: 0.82, w: 4.5, h: 0.4 }, sectionLabel(ctx), muted));

    // Title block sits on the lower third, ranged left.
    elements.push(rect({ x: MARGIN, y: 4.28, w: 0.85, h: 0.055 }, inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 4.52, w: 8.4, h: 1.5 }, inputs.sectionTitle, { size: 47, color: ink }));
    elements.push(subtitle(ctx, { x: MARGIN, y: 5.98, w: 6.6, h: 0.85 }, { size: 14, color: muted }));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
