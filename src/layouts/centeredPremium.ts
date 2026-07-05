import type { LayoutDefinition, SlideElement } from '../types';
import { presetChrome, presetPattern } from './decor';
import { SLIDE_W, displayNumber, hairline, heading, kicker, mix, sectionLabel, subtitle, textOn } from './helpers';

export const centeredPremiumLayout: LayoutDefinition = {
  id: 'centered-premium',
  name: 'Centered Premium',
  description: 'Symmetric composition with an encircled numeral.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.42);
    const cx = SLIDE_W / 2;
    const elements: SlideElement[] = [];

    // Medallion: hairline circle holding the numeral, flanked by fine rules.
    const ring = 0.92;
    elements.push({
      kind: 'ellipse',
      frame: { x: cx - ring / 2, y: 1.32, w: ring, h: ring },
      line: { color: mix(ink, inputs.background, 0.55), width: 1 },
    });
    elements.push({
      kind: 'text',
      frame: { x: cx - ring / 2, y: 1.32, w: ring, h: ring },
      text: displayNumber(inputs.sectionNumber),
      fontFace: preset.fonts.heading,
      size: 19,
      color: inputs.accent,
      bold: true,
      charSpacing: 1.5,
      align: 'center',
      valign: 'middle',
      italic: preset.decor.numberStyle === 'italic',
    });
    elements.push(hairline(cx - 2.6, 1.78 - 0.008, 1.75, mix(ink, inputs.background, 0.68)));
    elements.push(hairline(cx + 0.85, 1.78 - 0.008, 1.75, mix(ink, inputs.background, 0.68)));

    elements.push(kicker(ctx, { x: cx - 3, y: 2.55, w: 6, h: 0.32 }, sectionLabel(ctx), muted, 'center'));
    elements.push(heading(ctx, { x: 1.5, y: 3.05, w: 10.33, h: 1.55 }, inputs.sectionTitle, { size: 46, color: ink, align: 'center' }));
    elements.push(subtitle(ctx, { x: 3.1, y: 4.72, w: 7.13, h: 0.85 }, { size: 14, color: muted, align: 'center' }));

    // Closing ornament in the preset's own pattern language.
    elements.push(...presetPattern(ctx, { x: cx - 1.05, y: 5.85, w: 2.1, h: 0.2 }, mix(inputs.accent, inputs.background, 0.3)));

    elements.push(...presetChrome(ctx, inputs.background));
    return elements;
  },
};
