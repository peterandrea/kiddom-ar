import { buildPatternBShapes } from './patternGeometry.js';

const SHAPES = buildPatternBShapes();

export default function PatternB({ highlighted, onShapeDown }) {
  return (
    <svg
      viewBox="-47 -12 267 164"
      style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none' }}
      aria-label="Pattern B: blue rhombuses"
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
