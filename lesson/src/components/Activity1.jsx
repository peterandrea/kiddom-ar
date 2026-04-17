import { useState } from 'react';
import TileHexagons  from './svg/TileHexagons.jsx';
import TileTriangles from './svg/TileTriangles.jsx';
import TileSquares   from './svg/TileSquares.jsx';
import TileMixed     from './svg/TileMixed.jsx';
import './Activity1.css';

const TILINGS = [
  { id: 0, label: 'Hexagons',  Component: TileHexagons  },
  { id: 1, label: 'Triangles', Component: TileTriangles },
  { id: 2, label: 'Squares',   Component: TileSquares   },
  { id: 3, label: 'Pentagons', Component: TileMixed     },
];

export default function Activity1({ onComplete }) {
  const [selected, setSelected] = useState(new Set());
  const [reasoning, setReasoning] = useState('');
  const [shakeId, setShakeId] = useState(null);

  function handleTap(id) {
    if (selected.has(id)) {
      setSelected(prev => { const s = new Set(prev); s.delete(id); return s; });
    } else if (selected.size < 3) {
      setSelected(prev => new Set(prev).add(id));
    } else {
      setShakeId(id);
      setTimeout(() => setShakeId(null), 400);
    }
  }

  const canSubmit = selected.size === 3 && reasoning.trim().length > 0;

  return (
    <div className="activity1">
      <p className="activity-label">Activity 1 · 10 min</p>
      <h1 className="activity-title">Which Three Go Together?</h1>
      <p className="activity-subtitle">
        Look at the four tiling patterns below. Which three go together? Tap to select them.
      </p>

      <div className="tiling-grid">
        {TILINGS.map(({ id, label, Component }) => {
          const isSelected = selected.has(id);
          const isDisabled = !isSelected && selected.size === 3;
          const isShaking  = shakeId === id;
          return (
            <button
              key={id}
              className={[
                'tiling-card',
                isSelected ? 'tiling-card--selected' : '',
                isDisabled ? 'tiling-card--disabled' : '',
                isShaking  ? 'tiling-card--shake'    : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleTap(id)}
              aria-pressed={isSelected}
              aria-label={`${label} tiling${isSelected ? ', selected' : ''}`}
            >
              {isSelected && (
                <span className="tiling-card__check" aria-hidden="true">✓</span>
              )}
              <Component />
              <span className="tiling-card__label">{label}</span>
            </button>
          );
        })}
      </div>

      {selected.size === 3 && (
        <div className="reasoning-section">
          <label className="reasoning-label" htmlFor="reasoning">
            Why do these three go together?
          </label>
          <textarea
            id="reasoning"
            className="reasoning-input"
            value={reasoning}
            onChange={e => setReasoning(e.target.value)}
            placeholder="Explain your thinking…"
            rows={3}
            maxLength={500}
          />
        </div>
      )}

      <button
        className="btn-primary"
        disabled={!canSubmit}
        onClick={() => onComplete({ selected: [...selected], reasoning })}
      >
        Submit &amp; Continue
      </button>
    </div>
  );
}
