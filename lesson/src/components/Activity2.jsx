import { useState } from 'react';
import PatternA   from './svg/PatternA.jsx';
import PatternB   from './svg/PatternB.jsx';
import ShapeTally from './ShapeTally.jsx';
import './Activity2.css';

const PROMPTS = {
  A: [
    'Tap the red trapezoids to count them. Then tap the green triangles.',
    'How does the area of one trapezoid compare to one triangle?',
    'Which color covers more of the plane in Pattern A?',
  ],
  B: [
    'Tap the blue rhombuses to count them.',
    'How does the area of one rhombus compare to one triangle?',
    'Can you compare Pattern A and Pattern B? Which color covers more?',
  ],
};

export default function Activity2({ onComplete }) {
  const [activePattern, setActivePattern] = useState('A');
  const [highlightedA, setHighlightedA]   = useState(new Set());
  const [highlightedB, setHighlightedB]   = useState(new Set());

  function handleShapeDown(id) {
    const setter = activePattern === 'A' ? setHighlightedA : setHighlightedB;
    setter(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }

  // Live counts
  const redA   = [...highlightedA].filter(id => id.startsWith('trap-')).length;
  const greenA = [...highlightedA].filter(id => id.startsWith('triA-')).length;
  const blueB  = [...highlightedB].filter(id => id.startsWith('rh-')).length;

  const counts = activePattern === 'A'
    ? { red: redA, green: greenA }
    : { blue: blueB };

  return (
    <div className="activity2">
      <p className="activity-label">Activity 2 · 25 min</p>
      <h1 className="activity-title">More Red, Green, or Blue?</h1>
      <p className="activity-subtitle">
        Each pattern is made of pattern blocks. Tap the shapes to count them and figure out which color covers more of the plane.
      </p>

      {/* Pattern toggle */}
      <div className="pattern-toggle" role="group" aria-label="Select pattern">
        {['A', 'B'].map(p => (
          <button
            key={p}
            className={['pattern-toggle__btn', activePattern === p ? 'pattern-toggle__btn--active' : ''].join(' ')}
            onClick={() => setActivePattern(p)}
            aria-pressed={activePattern === p}
          >
            Pattern {p}
          </button>
        ))}
      </div>

      {/* Pattern SVG */}
      <div className="svg-pattern-wrapper" key={activePattern}>
        {activePattern === 'A'
          ? <PatternA highlighted={highlightedA} onShapeDown={handleShapeDown} />
          : <PatternB highlighted={highlightedB} onShapeDown={handleShapeDown} />
        }
      </div>

      {/* Live tally */}
      <ShapeTally counts={counts} />

      {/* Discussion prompts */}
      <div className="discussion-prompts card">
        <p className="discussion-prompts__heading">Think about it</p>
        <ul className="discussion-prompts__list">
          {PROMPTS[activePattern].map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>

      <button className="btn-primary" onClick={() => onComplete({ redA, greenA, blueB })}>
        Continue
      </button>
    </div>
  );
}
