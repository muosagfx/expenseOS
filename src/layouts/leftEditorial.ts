import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome } from './decor';
import { MARGIN, ghostNumber, hairline, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const leftEditorialLayout: LayoutDefinition = {
  id: 'left-editorial',
  name: 'Left Editorial',
  description: 'Ragged-left column against a vertical accent rule.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.42);
    const contentX = MARGIN + 0.5;
    const elements: SlideElement[] = [];

    // The spine: a full-height hairline with a short accent segment marking the title zone.
    elements.push(rect({ x: MARGIN, y: 1.0, w: 0.02, h: 5.5 }, mix(ink, inputs.background, 0.68)));
    elements.push(rect({ x: MARGIN - 0.014, y: 2.95, w: 0.05, h: 1.7 }, inputs.accent));

    // Hanging index numeral at the head of the column.
    elements.push(ghostNumber(ctx, { x: contentX, y: 0.95, w: 3.2, h: 1.3 }, 76, inputs.background, { align: 'left', valign: 'top', strength: 0.55 }));
    elements.push(kicker(ctx, { x: contentX, y: 2.42, w: 5, h: 0.35 }, sectionLabel(ctx), muted));

    elements.push(heading(ctx, { x: contentX, y: 2.95, w: 9.7, h: 2.3 }, inputs.sectionTitle, { size: 54, color: ink }));
    elements.push(subtitle(ctx, { x: contentX, y: 5.35, w: 7.3, h: 1.0 }, { size: 15, color: muted }));
    elements.push(hairline(contentX, 6.5, 0.55, inputs.accent, 0.045));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
