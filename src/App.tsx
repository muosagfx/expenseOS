import { useMemo, useState } from 'react';
import type { DividerInputs, LayoutId, PresetId } from './types';
import { STYLE_PRESETS, getPreset } from './presets/stylePresets';
import { LAYOUTS } from './layouts';
import { exportPptx } from './export/exportPptx';
import { ControlsPanel } from './components/ControlsPanel';
import { SlidePreview } from './components/SlidePreview';

const DEFAULT_PRESET = STYLE_PRESETS[0];

const DEFAULT_INPUTS: DividerInputs = {
  sectionTitle: 'Market Overview',
  subtitle: 'A deep dive into regional performance and growth drivers',
  sectionNumber: '1',
  arabicTitle: 'نظرة عامة على السوق',
  arabicSubtitle: 'تحليل معمق للأداء الإقليمي ومحركات النمو',
  primary: DEFAULT_PRESET.defaults.primary,
  accent: DEFAULT_PRESET.defaults.accent,
  background: DEFAULT_PRESET.defaults.background,
};

const ALL_LAYOUT_IDS = LAYOUTS.map((l) => l.id);

export default function App() {
  const [presetId, setPresetId] = useState<PresetId>(DEFAULT_PRESET.id);
  const [inputs, setInputs] = useState<DividerInputs>(DEFAULT_INPUTS);
  const [selected, setSelected] = useState<LayoutId[]>(ALL_LAYOUT_IDS);
  const [exporting, setExporting] = useState(false);

  const preset = getPreset(presetId);
  const ctx = useMemo(() => ({ inputs, preset }), [inputs, preset]);

  const handlePresetChange = (id: PresetId) => {
    const next = getPreset(id);
    setPresetId(id);
    // Switching presets re-seeds the palette with the preset defaults.
    setInputs((prev) => ({ ...prev, ...next.defaults }));
  };

  const toggleLayout = (id: LayoutId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleExport = async () => {
    const layouts = LAYOUTS.filter((l) => selected.includes(l.id));
    if (layouts.length === 0) return;
    setExporting(true);
    try {
      await exportPptx(layouts, ctx);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <header className="brand">
          <h1>PPT Divider Generator</h1>
          <p>Premium section dividers, exported straight to .pptx</p>
        </header>
        <ControlsPanel
          presetId={presetId}
          inputs={inputs}
          onPresetChange={handlePresetChange}
          onInputsChange={setInputs}
        />
        <footer className="export-bar">
          <button
            type="button"
            className="export-btn"
            disabled={selected.length === 0 || exporting}
            onClick={handleExport}
          >
            {exporting
              ? 'Exporting…'
              : `Export ${selected.length} slide${selected.length === 1 ? '' : 's'} (.pptx)`}
          </button>
        </footer>
      </aside>

      <main className="gallery">
        <div className="gallery-head">
          <h2>Layouts</h2>
          <div className="gallery-actions">
            <button type="button" onClick={() => setSelected(ALL_LAYOUT_IDS)}>Select all</button>
            <button type="button" onClick={() => setSelected([])}>Clear</button>
          </div>
        </div>
        <div className="grid">
          {LAYOUTS.map((layout) => {
            const isSelected = selected.includes(layout.id);
            return (
              <div
                key={layout.id}
                className={`card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleLayout(layout.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleLayout(layout.id);
                  }
                }}
              >
                <SlidePreview elements={layout.build(ctx)} background={inputs.background} />
                <div className="card-meta">
                  <span className="card-check">{isSelected ? '✓' : ''}</span>
                  <div>
                    <strong>{layout.name}</strong>
                    <small>{layout.description}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
