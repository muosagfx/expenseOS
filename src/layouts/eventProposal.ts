import type { LayoutDefinition, SlideElement } from '../types';
import { MARGIN, SLIDE_W, body, displayNumber, heading, kicker, mix, rect, textOn, tickRow } from './helpers';

export const eventProposalLayout: LayoutDefinition = {
  id: 'event-proposal',
  name: 'Event Proposal',
  description: 'Agency pitch style: kicker up top, statement title at the base.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const num = displayNumber(inputs.sectionNumber);
    const elements: SlideElement[] = [];

    elements.push(kicker(ctx, { x: MARGIN, y: 0.85, w: 5, h: 0.4 }, 'Event proposal', inputs.accent));
    elements.push(rect({ x: MARGIN, y: 1.35, w: 2.2, h: 0.028 }, mix(ink, inputs.background, 0.6)));
    elements.push({
      kind: 'text',
      frame: { x: SLIDE_W - MARGIN - 3, y: 0.55, w: 3, h: 1.3 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 60,
      color: mix(inputs.primary, inputs.background, 0.5),
      bold: true,
      align: 'right',
      valign: 'top',
    });

    elements.push(...tickRow({ x: MARGIN, y: 3.1, w: 3.4, h: 0.3 }, mix(inputs.accent, inputs.background, 0.25), 18));

    elements.push(rect({ x: MARGIN, y: 3.95, w: 0.55, h: 0.12 }, inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 4.25, w: 10.4, h: 1.9 }, inputs.sectionTitle, { size: 52, color: ink }));

    elements.push(rect({ x: MARGIN, y: 6.55, w: SLIDE_W - MARGIN * 2, h: 0.02 }, mix(ink, inputs.background, 0.65)));
    elements.push(body(ctx, { x: MARGIN, y: 6.7, w: 8, h: 0.5 }, inputs.subtitle, { size: 12, color: mix(ink, inputs.background, 0.4) }));
    elements.push(body(ctx, { x: SLIDE_W - MARGIN - 3, y: 6.7, w: 3, h: 0.5 }, `SECTION ${num}`, { size: 12, color: mix(ink, inputs.background, 0.4), align: 'right', charSpacing: 2, bold: true }));

    return elements;
  },
};
