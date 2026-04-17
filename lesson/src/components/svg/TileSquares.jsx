// Square grid tiling
const SIZE = 20;
const COLS = 6;
const ROWS = 6;

const squares = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    squares.push({
      x: col * SIZE,
      y: row * SIZE,
      fill: (row + col) % 2 === 0 ? '#E0DAD2' : '#EDE8E2',
    });
  }
}

export default function TileSquares() {
  return (
    <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
      {squares.map((sq, i) => (
        <rect key={i} x={sq.x} y={sq.y} width={SIZE} height={SIZE} fill={sq.fill} stroke="white" strokeWidth="1" />
      ))}
    </svg>
  );
}
