import type { PresetId, StylePreset } from '../types';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'minimal-executive',
    name: 'Minimal Executive',
    description: 'Restrained boardroom style with generous whitespace.',
    fonts: { heading: 'Helvetica Neue', body: 'Helvetica Neue', arabic: 'Segoe UI' },
    defaults: { primary: '#1a1a1a', accent: '#c9a227', background: '#ffffff' },
    heading: { uppercase: true, bold: true, charSpacing: 1.2, sizeScale: 1 },
    subtitleItalic: false,
    labels: { section: 'Section', numberPrefix: '' },
    decor: { pattern: 'dots', chrome: 'cropmarks', numberStyle: 'solid' },
  },
  {
    id: 'saudi-heritage',
    name: 'Saudi Heritage',
    description: 'Deep green and gold on warm sand tones.',
    fonts: { heading: 'Georgia', body: 'Georgia', arabic: 'Sakkal Majalla' },
    defaults: { primary: '#0f5c37', accent: '#c9a227', background: '#f6f1e5' },
    heading: { uppercase: false, bold: true, charSpacing: 0.4, sizeScale: 1 },
    subtitleItalic: false,
    labels: { section: 'Section', numberPrefix: '' },
    decor: { pattern: 'diamonds', chrome: 'diamond-rule', numberStyle: 'solid' },
  },
  {
    id: 'futuristic-tech',
    name: 'Futuristic Tech',
    description: 'Neon signal colors on a near-black canvas.',
    fonts: { heading: 'Segoe UI', body: 'Segoe UI', arabic: 'Segoe UI' },
    defaults: { primary: '#00e0b8', accent: '#7c6cff', background: '#0a0f1e' },
    heading: { uppercase: true, bold: true, charSpacing: 3, sizeScale: 0.94 },
    subtitleItalic: false,
    labels: { section: 'Sector', numberPrefix: '' },
    decor: { pattern: 'crosses', chrome: 'hud', numberStyle: 'outline' },
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial Luxury',
    description: 'Magazine serifs, ivory paper and bronze details.',
    fonts: { heading: 'Garamond', body: 'Garamond', arabic: 'Sakkal Majalla' },
    defaults: { primary: '#191612', accent: '#8a6d3b', background: '#faf6ef' },
    heading: { uppercase: false, bold: false, charSpacing: 0.3, sizeScale: 1.08 },
    subtitleItalic: true,
    labels: { section: 'Chapter', numberPrefix: 'No. ' },
    decor: { pattern: 'vlines', chrome: 'frame', numberStyle: 'italic' },
  },
  {
    id: 'dark-cinematic',
    name: 'Dark Cinematic',
    description: 'High-contrast trailer mood with a blood-red key light.',
    fonts: { heading: 'Arial Black', body: 'Arial', arabic: 'Segoe UI' },
    defaults: { primary: '#b91c1c', accent: '#e5c07b', background: '#0e0e12' },
    heading: { uppercase: true, bold: true, charSpacing: 3.5, sizeScale: 0.9 },
    subtitleItalic: false,
    labels: { section: 'Act', numberPrefix: '' },
    decor: { pattern: 'scanlines', chrome: 'letterbox', numberStyle: 'solid' },
  },
];

export function getPreset(id: PresetId): StylePreset {
  const preset = STYLE_PRESETS.find((p) => p.id === id);
  if (!preset) throw new Error(`Unknown preset: ${id}`);
  return preset;
}
