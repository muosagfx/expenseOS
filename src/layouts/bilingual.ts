import type { LayoutDefinition, SlideElement } from '../types';
import { SLIDE_W, body, displayNumber, heading, mix, rect, textOn } from './helpers';

export const bilingualLayout: LayoutDefinition = {
  id: 'bilingual',
  name: 'Bilingual (AR / EN)',
  description: 'English column on the left, Arabic mirrored on the right.',
  build: (ctx) => {
    const { inputs, preset } = ctx;
    const ink = textOn(inputs.background);
    const muted = mix(ink, inputs.background, 0.38);
    const num = displayNumber(inputs.sectionNumber);
    const cx = SLIDE_W / 2;
    const colW = 5.1;
    const elements: SlideElement[] = [];

    elements.push({
      kind: 'text',
      frame: { x: cx - 1, y: 0.95, w: 2, h: 0.6 },
      text: num,
      fontFace: preset.fonts.heading,
      size: 20,
      color: inputs.accent,
      bold: true,
      charSpacing: 2,
      align: 'center',
      valign: 'middle',
    });
    elements.push(rect({ x: cx - 0.011, y: 2.1, w: 0.022, h: 3.6 }, mix(ink, inputs.background, 0.6)));

    // English column (left, ragged right toward the divider)
    elements.push(heading(ctx, { x: cx - colW - 0.6, y: 2.5, w: colW, h: 1.7 }, inputs.sectionTitle, { size: 34, color: ink, align: 'right' }));
    elements.push(body(ctx, { x: cx - colW - 0.6, y: 4.35, w: colW, h: 1 }, inputs.subtitle, { size: 13, color: muted, align: 'right' }));
    elements.push(rect({ x: cx - 1.3, y: 5.5, w: 0.7, h: 0.045 }, inputs.accent));

    // Arabic column (right, RTL)
    elements.push({
      kind: 'text',
      frame: { x: cx + 0.6, y: 2.5, w: colW, h: 1.7 },
      text: inputs.arabicTitle,
      fontFace: preset.fonts.arabic,
      size: 34,
      color: ink,
      bold: true,
      align: 'left',
      valign: 'top',
      rtl: true,
      lineSpacing: 1.15,
    });
    elements.push({
      kind: 'text',
      frame: { x: cx + 0.6, y: 4.35, w: colW, h: 1 },
      text: inputs.arabicSubtitle,
      fontFace: preset.fonts.arabic,
      size: 14,
      color: muted,
      align: 'left',
      valign: 'top',
      rtl: true,
      lineSpacing: 1.3,
    });
    elements.push(rect({ x: cx + 0.6, y: 5.5, w: 0.7, h: 0.045 }, inputs.accent));

    return elements;
  },
};
