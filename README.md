# PPT Divider Generator

Browser-based MVP that generates premium PowerPoint divider slides and exports them as a `.pptx` file. No backend — everything runs client-side.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
```

## How it works

Every layout is a pure function that turns the user's inputs plus the active style preset into an abstract list of slide elements (rects, ellipses, text) positioned in inches on a 13.333 × 7.5 in (16:9) canvas. Two renderers consume that same list:

- `src/components/SlidePreview.tsx` — scales it into an HTML miniature for the live 16:9 preview grid.
- `src/export/exportPptx.ts` — maps it to PptxGenJS calls and downloads the `.pptx`.

Because both read the same element model, the export always matches the preview.

## Structure

```
src/
  types.ts                 # Shared model: inputs, presets, slide elements, layouts
  presets/stylePresets.ts  # The 5 style presets (fonts, default palette, heading rules)
  layouts/
    helpers.ts             # Canvas constants, color math, text/pattern builders
    index.ts               # Layout registry
    bigNumber.ts           # 1.  Big number
    leftEditorial.ts       # 2.  Left editorial
    centeredPremium.ts     # 3.  Centered premium
    splitGrid.ts           # 4.  Split grid
    patternFooter.ts       # 5.  Pattern footer
    topBar.ts              # 6.  Top bar
    fullBleedTexture.ts    # 7.  Full bleed texture
    minimalLine.ts         # 8.  Minimal line
    bilingual.ts           # 9.  Arabic/English bilingual
    eventProposal.ts       # 10. Event proposal
  components/              # Controls sidebar + slide preview renderer
  export/exportPptx.ts     # PptxGenJS export
  App.tsx                  # State: preset, inputs, layout selection, export
```

## Features

- **5 style presets**: Minimal Executive, Saudi Heritage, Futuristic Tech, Editorial Luxury, Dark Cinematic. Switching a preset re-seeds the color pickers with its default palette.
- **Inputs**: section title, subtitle, section number, primary/accent/background colors, plus optional Arabic title/subtitle for the bilingual layout.
- **10 layouts**, previewed live at 16:9; click a card to include/exclude it from the export.
- **Export**: selected layouts become one slide each in a widescreen `.pptx`.

Patterns/textures are placeholder geometry (dot grids, tick rows) generated in `layouts/helpers.ts` — swap them for real assets later.

## Adding a layout or preset

- New layout: create `src/layouts/myLayout.ts` exporting a `LayoutDefinition`, add its id to `LayoutId` in `types.ts`, and register it in `layouts/index.ts`.
- New preset: append a `StylePreset` object to `presets/stylePresets.ts` and add its id to `PresetId`.
