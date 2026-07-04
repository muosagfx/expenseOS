import type { PresetId, StylePreset } from '../types';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'minimal-executive',
    name: 'Minimal Executive',
    description: 'Restrained boardroom style with generous whitespace.',
    fonts: { heading: 'Helvetica Neue', body: 'Helvetica Neue', arabic: 'Segoe UI' },
    defaults: { primary: '#1a1a1a', accent: '#c9a227', background: '#ffffff' },
    heading: { uppercase: true, bold: true, charSpacing: 1.5 },
  },
  {
    id: 'saudi-heritage',
    name: 'Saudi Heritage',
    description: 'Deep green and gold on warm sand tones.',
    fonts: { heading: 'Georgia', body: 'Georgia', arabic: 'Sakkal Majalla' },
    defaults: { primary: '#12683e', accent: '#c9a227', background: '#f7f2e7' },
    heading: { uppercase: false, bold: true, charSpacing: 0.5 },
  },
  {
    id: 'futuristic-tech',
    name: 'Futuristic Tech',
    description: 'Neon signal colors on a near-black canvas.',
    fonts: { heading: 'Segoe UI', body: 'Segoe UI', arabic: 'Segoe UI' },
    defaults: { primary: '#00e0b8', accent: '#7c6cff', background: '#0a0f1e' },
    heading: { uppercase: true, bold: true, charSpacing: 3 },
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial Luxury',
    description: 'Magazine serifs, ivory paper and bronze details.',
    fonts: { heading: 'Garamond', body: 'Garamond', arabic: 'Sakkal Majalla' },
    defaults: { primary: '#191612', accent: '#8a6d3b', background: '#faf6ef' },
    heading: { uppercase: false, bold: false, charSpacing: 0.5 },
  },
  {
    id: 'dark-cinematic',
    name: 'Dark Cinematic',
    description: 'High-contrast trailer mood with a blood-red key light.',
    fonts: { heading: 'Arial Black', body: 'Arial', arabic: 'Segoe UI' },
    defaults: { primary: '#b91c1c', accent: '#e5c07b', background: '#101014' },
    heading: { uppercase: true, bold: true, charSpacing: 3.5 },
  },
];

export function getPreset(id: PresetId): StylePreset {
  const preset = STYLE_PRESETS.find((p) => p.id === id);
  if (!preset) throw new Error(`Unknown preset: ${id}`);
  return preset;
}
