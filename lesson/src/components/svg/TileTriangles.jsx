// Equilateral triangle tiling — alternating up/down triangles
// s=24, h=20.78

const S = 24;
const H = S * (Math.sqrt(3) / 2); // ~20.78

const triangles = [];
const COLS = 6;
const ROWS = 6;

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const x0 = col * S;
    const y0 = row * H;
    // Up-pointing triangle
    triangles.push({
      points: `${x0},${(y0 + H).toFixed(2)} ${(x0 + S / 2).toFixed(2)},${y0.toFixed(2)} ${(x0 + S).toFixed(2)},${(y0 + H).toFixed(2)}`,
      fill: col % 2 === row % 2 ? '#DED8D0' : '#EDE8E2',
    });
    // Down-pointing triangle (fills the gap)
    triangles.push({
      points: `${(x0 + S / 2).toFixed(2)},${y0.toFixed(2)} ${(x0 + S).toFixed(2)},${(y0 + H).toFixed(2)} ${(x0 + S * 1.5).toFixed(2)},${y0.toFixed(2)}`,
      fill: col % 2 === row % 2 ? '#EDE8E2' : '#DED8D0',
    });
  }
}

export default function TileTriangles() {
  return (
    <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
      {triangles.map((t, i) => (
        <polygon key={i} points={t.points} fill={t.fill} stroke="white" strokeWidth="1" />
      ))}
    </svg>
  );
}
