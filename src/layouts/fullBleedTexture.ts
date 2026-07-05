import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome, presetPattern } from './decor';
import { MARGIN, SLIDE_H, SLIDE_W, ghostNumber, kicker, heading, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const fullBleedTextureLayout: LayoutDefinition = {
  id: 'full-bleed-texture',
  name: 'Full Bleed Texture',
  description: 'Primary color floods the slide under the preset texture.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.primary);
    const elements: SlideElement[] = [];

    elements.push(rect({ x: 0, y: 0, w: SLIDE_W, h: SLIDE_H }, inputs.primary));
    // Texture lives on the right half only, so the text side stays calm.
    elements.push(...presetPattern(ctx, { x: 7.4, y: 0.55, w: 5.4, h: 6.4 }, mix(ink, inputs.primary, 0.88)));

    elements.push(kicker(ctx, { x: MARGIN, y: 1.5, w: 4.5, h: 0.4 }, sectionLabel(ctx), mix(ink, inputs.primary, 0.3)));
    elements.push(rect({ x: MARGIN, y: 2.78, w: 0.85, h: 0.055 }, inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 3.05, w: 8.6, h: 1.7 }, inputs.sectionTitle, { size: 48, color: ink }));
    elements.push(subtitle(ctx, { x: MARGIN, y: 4.85, w: 6.6, h: 1 }, { size: 14, color: mix(ink, inputs.primary, 0.28) }));

    elements.push(ghostNumber(ctx, { x: SLIDE_W - 3.6, y: SLIDE_H - 2.55, w: 2.65, h: 1.7 }, 84, inputs.primary, { align: 'right', valign: 'bottom', strength: 0.55 }));

    elements.push(...presetChrome(ctx, inputs.primary));
    return elements;
  },
};
