import type { DividerInputs, PresetId } from '../types';
import { STYLE_PRESETS } from '../presets/stylePresets';

interface ControlsPanelProps {
  presetId: PresetId;
  inputs: DividerInputs;
  onPresetChange: (id: PresetId) => void;
  onInputsChange: (inputs: DividerInputs) => void;
}

export function ControlsPanel({ presetId, inputs, onPresetChange, onInputsChange }: ControlsPanelProps) {
  const set = <K extends keyof DividerInputs>(key: K, value: DividerInputs[K]) =>
    onInputsChange({ ...inputs, [key]: value });

  return (
    <div className="controls">
      <section>
        <h2>Style preset</h2>
        <div className="preset-list">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`preset ${preset.id === presetId ? 'active' : ''}`}
              onClick={() => onPresetChange(preset.id)}
            >
              <span className="preset-swatches">
                <i style={{ background: preset.defaults.background }} />
                <i style={{ background: preset.defaults.primary }} />
                <i style={{ background: preset.defaults.accent }} />
              </span>
              <span>
                <strong>{preset.name}</strong>
                <small>{preset.description}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>Content</h2>
        <label>
          Section title
          <input value={inputs.sectionTitle} onChange={(e) => set('sectionTitle', e.target.value)} />
        </label>
        <label>
          Subtitle
          <textarea rows={2} value={inputs.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
        </label>
        <label>
          Section number
          <input value={inputs.sectionNumber} onChange={(e) => set('sectionNumber', e.target.value)} />
        </label>
        <label>
          Arabic title <small>(bilingual layout)</small>
          <input dir="rtl" value={inputs.arabicTitle} onChange={(e) => set('arabicTitle', e.target.value)} />
        </label>
        <label>
          Arabic subtitle <small>(bilingual layout)</small>
          <input dir="rtl" value={inputs.arabicSubtitle} onChange={(e) => set('arabicSubtitle', e.target.value)} />
        </label>
      </section>

      <section>
        <h2>Colors</h2>
        <div className="color-row">
          <label>
            Primary
            <input type="color" value={inputs.primary} onChange={(e) => set('primary', e.target.value)} />
          </label>
          <label>
            Accent
            <input type="color" value={inputs.accent} onChange={(e) => set('accent', e.target.value)} />
          </label>
          <label>
            Background
            <input type="color" value={inputs.background} onChange={(e) => set('background', e.target.value)} />
          </label>
        </div>
      </section>
    </div>
  );
}
