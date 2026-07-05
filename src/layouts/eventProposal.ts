import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome, presetPattern } from './decor';
import { MARGIN, SLIDE_W, ghostNumber, hairline, heading, kicker, mix, rect, sectionLabel, subtitle, textOn } from './helpers';

export const eventProposalLayout: LayoutDefinition = {
  id: 'event-proposal',
  name: 'Event Proposal',
  description: 'Agency pitch style: kicker up top, statement title at the base.',
  build: (ctx) => {
    const { inputs } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.42);
    const elements: SlideElement[] = [];

    // Masthead: label, long hairline, numeral hanging at the right edge.
    elements.push(kicker(ctx, { x: MARGIN, y: 0.78, w: 5, h: 0.35 }, 'Event Proposal', inputs.accent));
    elements.push(hairline(MARGIN, 1.28, SLIDE_W - MARGIN * 2 - 3.1, mix(ink, inputs.background, 0.68)));
    elements.push(ghostNumber(ctx, { x: SLIDE_W - MARGIN - 2.9, y: 0.5, w: 2.9, h: 1.5 }, 68, inputs.background, { align: 'right', valign: 'top', strength: 0.5 }));

    // Preset texture strip breathing between masthead and title.
    elements.push(...presetPattern(ctx, { x: MARGIN, y: 3.0, w: 3.3, h: 0.34 }, mix(inputs.accent, inputs.background, 0.3)));

    elements.push(rect({ x: MARGIN, y: 3.92, w: 0.5, h: 0.1 }, inputs.accent));
    elements.push(heading(ctx, { x: MARGIN, y: 4.2, w: 10.6, h: 1.9 }, inputs.sectionTitle, { size: 54, color: ink }));

    // Colophon rule: subtitle left, section marker right.
    elements.push(hairline(MARGIN, 6.5, SLIDE_W - MARGIN * 2, mix(ink, inputs.background, 0.68)));
    elements.push(subtitle(ctx, { x: MARGIN, y: 6.66, w: 7.6, h: 0.5 }, { size: 11.5, color: muted }));
    elements.push(kicker(ctx, { x: SLIDE_W - MARGIN - 3.5, y: 6.6, w: 3.5, h: 0.35 }, sectionLabel(ctx), muted, 'right'));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
