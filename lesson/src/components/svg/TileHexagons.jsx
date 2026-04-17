// Regular hexagon tiling (honeycomb) — flat-top orientation
// s=18, col-step=27, row-step=31.18, odd-col offset=15.59 down

const S = 18;
const CW = S * 1.5;             // 27
const RH = S * Math.sqrt(3);    // 31.18

function hexPoints(cx, cy) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i);
    return `${(cx + S * Math.cos(a)).toFixed(2)},${(cy + S * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

const hexes = [];
for (let col = 0; col < 5; col++) {
  for (let row = 0; row < 4; row++) {
    const cx = col * CW + S;
    const cy = row * RH + (col % 2 === 1 ? RH / 2 : 0) + S * Math.sqrt(3) / 2;
    hexes.push({ cx, cy });
  }
}

export default function TileHexagons() {
  return (
    <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
      {hexes.map(({ cx, cy }, i) => (
        <polygon
          key={i}
          points={hexPoints(cx, cy)}
          fill="#D6CFC5"
          stroke="white"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
