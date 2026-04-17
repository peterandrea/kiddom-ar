import { buildPatternAShapes } from './patternGeometry.js';

// Generated once at module load — never recomputed
const SHAPES = buildPatternAShapes();

export default function PatternA({ highlighted, onShapeDown }) {
  return (
    <svg
      viewBox="-47 -12 267 164"
      style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none' }}
      aria-label="Pattern A: red trapezoids and green triangles"
    >
      {SHAPES.map(shape => {
        const isHit = highlighted.has(shape.id);
        return (
          <g key={shape.id}>
            <polygon
              points={shape.points}
              fill={isHit ? shape.highlightFill : shape.baseFill}
              stroke={isHit ? '#F25B44' : 'white'}
              strokeWidth={isHit ? 2.5 : 1.5}
              style={{ transition: 'fill 150ms ease', cursor: 'pointer' }}
            />
            {/* Invisible hit-area circle for reliable touch targeting */}
            <circle
              cx={shape.center[0]}
              cy={shape.center[1]}
              r={16}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onPointerDown={e => { e.stopPropagation(); onShapeDown(shape.id); }}
            />
          </g>
        );
      })}
    </svg>
  );
}
