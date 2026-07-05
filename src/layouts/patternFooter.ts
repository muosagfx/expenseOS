import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome, presetPattern } from './decor';
import { MARGIN, SLIDE_H, SLIDE_W, ghostNumber, hairline, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const patternFooterLayout: LayoutDefinition = {
  id: 'pattern-footer',
  name: 'Pattern Footer',
  description: 'Airy top half over a textured band along the base.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.42);
    const elements: SlideElement[] = [];

    elements.push(rect({ x: MARGIN, y: 1.06, w: 0.15, h: 0.15 }, inputs.accent));
    elements.push(kicker(ctx, { x: MARGIN + 0.3, y: 0.94, w: 4.5, h: 0.4 }, sectionLabel(ctx), muted));
    elements.push(ghostNumber(ctx, { x: SLIDE_W - MARGIN - 2.6, y: 0.62, w: 2.6, h: 1.35 }, 66, inputs.background, { align: 'right', valign: 'top', strength: 0.5 }));

    elements.push(heading(ctx, { x: MARGIN, y: 2.15, w: 10.4, h: 1.6 }, inputs.sectionTitle, { size: 46, color: ink }));
    elements.push(subtitle(ctx, { x: MARGIN, y: 3.85, w: 7.6, h: 0.9 }, { size: 14, color: muted }));

    // Footer: accent hairline over a tinted band carrying the preset's pattern.
    const bandY = 5.9;
    elements.push(hairline(0, bandY, SLIDE_W, inputs.accent, 0.035));
    elements.push(rect({ x: 0, y: bandY + 0.035, w: SLIDE_W, h: SLIDE_H - bandY - 0.035 }, mix(inputs.primary, inputs.background, 0.93)));
    elements.push(...presetPattern(ctx, { x: 0.55, y: bandY + 0.38, w: 12.23, h: 0.85 }, mix(inputs.primary, inputs.background, 0.55)));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
