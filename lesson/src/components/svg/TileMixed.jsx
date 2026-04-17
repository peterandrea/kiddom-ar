// Pentagon "tiling" — pentagons cannot tile the plane, so visible gaps appear.
// Interior angle = 108°. Three pentagons meeting at a vertex = 324° ≠ 360°.
// We arrange ~6 pentagons in attempted rows to make the gaps clearly visible.

const R = 17; // circumradius

function pentPoints(cx, cy, rotDeg = 0) {
  return Array.from({ length: 5 }, (_, i) => {
    const a = (Math.PI / 180) * (90 + rotDeg + 72 * i);
    return `${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

// Hand-placed pentagons in a honeycomb-like attempt — gaps are visible
const positions = [
  { cx: 30,  cy: 28,  rot: 0  },
  { cx: 74,  cy: 28,  rot: 0  },
  { cx: 52,  cy: 62,  rot: 36 },
  { cx: 96,  cy: 62,  rot: 36 },
  { cx: 30,  cy: 96,  rot: 0  },
  { cx: 74,  cy: 96,  rot: 0  },
  { cx: 8,   cy: 62,  rot: 36 },
];

export default function TileMixed() {
  return (
    <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
      {/* Gap fill so the gaps are clearly a different (beige) color */}
      <rect width="120" height="120" fill="#F0EBE4" />
      {positions.map(({ cx, cy, rot }, i) => (
        <polygon
          key={i}
          points={pentPoints(cx, cy, rot)}
          fill={i % 2 === 0 ? '#C9C2B8' : '#D6CFC5'}
          stroke="white"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
