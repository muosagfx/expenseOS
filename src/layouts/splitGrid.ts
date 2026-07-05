import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome, presetPattern } from './decor';
import { SLIDE_H, ghostNumber, hairline, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const splitGridLayout: LayoutDefinition = {
  id: 'split-grid',
  name: 'Split Grid',
  description: 'Solid color panel on the left, numeral and texture on the right.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const panelInk = textOn(inputs.primary);
    const panelW = 5.7;
    const padX = 0.9;
    const elements: SlideElement[] = [];

    // Left panel with a hairline inset keyline for a framed, printed feel.
    elements.push(rect({ x: 0, y: 0, w: panelW, h: SLIDE_H }, inputs.primary));
    elements.push({
      kind: 'rect',
      frame: { x: 0.35, y: 0.35, w: panelW - 0.7, h: SLIDE_H - 0.7 },
      line: { color: mix(panelInk, inputs.primary, 0.7), width: 0.75 },
    });
    elements.push(rect({ x: panelW, y: 0, w: 0.05, h: SLIDE_H }, inputs.accent));

    elements.push(kicker(ctx, { x: padX, y: 0.95, w: 4, h: 0.35 }, sectionLabel(ctx), mix(panelInk, inputs.primary, 0.35)));
    elements.push(heading(ctx, { x: padX, y: 3.15, w: panelW - padX - 0.6, h: 2.1 }, inputs.sectionTitle, { size: 38, color: panelInk }));
    elements.push(hairline(padX, 5.5, 0.55, inputs.accent, 0.045));
    elements.push(subtitle(ctx, { x: padX, y: 5.75, w: panelW - padX - 0.6, h: 1.1 }, { size: 13, color: mix(panelInk, inputs.primary, 0.32) }));

    // Right side: quiet field with the numeral high and texture low.
    elements.push(ghostNumber(ctx, { x: 6.45, y: 1.15, w: 6.0, h: 3.3 }, 150, inputs.background, { align: 'left', valign: 'middle', strength: 0.55 }));
    elements.push(kicker(ctx, { x: 8.9, y: 0.62, w: 3.5, h: 0.32 }, 'Divider', mix(ink, inputs.background, 0.6), 'right'));
    elements.push(...presetPattern(ctx, { x: 8.95, y: 5.15, w: 3.45, h: 1.5 }, mix(inputs.accent, inputs.background, 0.35)));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
