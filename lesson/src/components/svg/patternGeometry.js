// Shared hex geometry for Activity 2 pattern blocks
// Pointy-top hexagons, side length S=40

export const S  = 40;
export const H  = S * Math.sqrt(3) / 2; // apothem ≈ 34.64
export const CW = 2 * H;                // column width ≈ 69.28
export const RH = 1.5 * S;             // row height step = 60

// Vertices of a pointy-top hexagon centered at (cx, cy)
// V0=top, going clockwise
export function hexVerts(cx, cy) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (-90 + 60 * i);
    return [cx + S * Math.cos(a), cy + S * Math.sin(a)];
  });
}

// Format [[x,y],...] → "x.xx,y.yy ..."
export function pts(arr) {
  return arr.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

// Centroid of a polygon given [[x,y],...]
export function centroid(verts) {
  const n = verts.length;
  return [
    verts.reduce((s, [x]) => s + x, 0) / n,
    verts.reduce((s, [, y]) => s + y, 0) / n,
  ];
}

// ── Pattern A: each hexagon = 1 red trapezoid (top) + 3 green triangles (bottom) ──
export function buildPatternAShapes() {
  const shapes = [];
  let trapIdx = 0, triIdx = 0;

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const cx = col * CW + (row % 2) * H;
      const cy = row * RH + S;
      const v  = hexVerts(cx, cy);
      // midpoints on the equator
      const midR = [cx + H, cy];
      const midL = [cx - H, cy];

      // Trapezoid: V5, V0, V1, midRight, midLeft
      const trapVerts = [v[5], v[0], v[1], midR, midL];
      shapes.push({
        id:            `trap-${trapIdx++}`,
        type:          'trap',
        points:        pts(trapVerts),
        center:        centroid(trapVerts),
        baseFill:      '#D93025',
        highlightFill: '#FF6B5B',
      });

      // Three bottom wedge triangles: center→V2→V3, center→V3→V4, center→V4→V5
      [[v[2], v[3]], [v[3], v[4]], [v[4], v[5]]].forEach(([va, vb]) => {
        const triVerts = [[cx, cy], va, vb];
        shapes.push({
          id:            `triA-${triIdx++}`,
          type:          'triA',
          points:        pts(triVerts),
          center:        centroid(triVerts),
          baseFill:      '#16A34A',
          highlightFill: '#4ADE80',
        });
      });
    }
  }
  return shapes;
}

// ── Pattern B: each hexagon = 3 blue rhombuses ──
// Rhombus = 2 adjacent wedges (pairs: V0-V1-V2-center, V2-V3-V4-center, V4-V5-V0-center)
export function buildPatternBShapes() {
  const shapes = [];
  let rhIdx = 0, triIdx = 0;

  // Hex grid
  const hexCenters = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const cx = col * CW + (row % 2) * H;
      const cy = row * RH + S;
      hexCenters.push({ cx, cy, row, col });
    }
  }

  for (const { cx, cy } of hexCenters) {
    const v = hexVerts(cx, cy);
    // Three rhombuses per hex: pairs of adjacent wedges
    // Rhombus vertices: center, Va, Vb, Vc (parallelogram going around)
    const rhoVerts = [
      [v[0], v[1], v[2]],  // top-right rhombus
      [v[2], v[3], v[4]],  // bottom rhombus
      [v[4], v[5], v[0]],  // top-left rhombus
    ];
    for (const [va, vb, vc] of rhoVerts) {
      // Rhombus = center + va + vb + vc arranged as a diamond
      // Points: center → va → midpoint-of-va-vc-through-vb → vc
      // Actually simpler: the rhombus is va, vb, vc, and the point opposite vb = center reflected
      // For a regular hex: center, va, vb, vc traces a rhombus correctly
      const rVerts = [[cx, cy], va, vb, vc];
      shapes.push({
        id:            `rh-${rhIdx++}`,
        type:          'rh',
        points:        pts(rVerts),
        center:        centroid(rVerts),
        baseFill:      '#2563EB',
        highlightFill: '#60A5FA',
      });
    }
  }

  // Gap triangles: spaces between adjacent hexagons in the grid
  // For a pointy-top hex grid, gaps appear at vertices shared by 3 hexagons.
  // Each gap triangle = V_i of hex A, V_j of hex B, V_k of hex C.
  // We enumerate known gap positions for our 3×2 grid.
  // Row 0 hexes: col 0,1,2 → centers at (0,40), (69.28,40), (138.56,40)
  // Row 1 hexes: col 0,1,2 → centers at (34.64,100), (103.92,100), (173.2,100)

  const hc = {}; // quick lookup: hc[row][col] = {cx,cy,v}
  for (const { cx, cy, row, col } of hexCenters) {
    if (!hc[row]) hc[row] = {};
    hc[row][col] = { cx, cy, v: hexVerts(cx, cy) };
  }

  // Gap between row0-col0, row0-col1, row1-col0:
  //   row0c0.V1, row0c1.V4 (=row0c1.V3 going other way?), row1c0.V0
  // Actually for pointy-top: gap between R0C0, R0C1, R1C0 → vertices V1(R0C0), V5(R0C1), V0(R1C0)
  // Let's verify: R0C0.V1 ≈ (34.64,20), R0C1.V5 ≈ (34.64,20)... they should be the same point!
  // If adjacent hexes share edges, there are no true triangle gaps in a pure hex tiling.
  // The gaps only occur if the hexes DON'T share edges.
  //
  // In Pattern B as described by IM curriculum, it's actually a tiling where hexagons ARE
  // gap-free and filled entirely with rhombuses. No gap triangles needed.
  // The green triangles in pattern B appear only at the BORDER of the tiling region to fill
  // partial hexagons. For a 3×2 grid this creates a clean edge.
  //
  // Revised: Pattern B = 6 hexagons × 3 rhombuses = 18 blue rhombuses, no gap triangles.
  // This matches the IM lesson where Pattern B is all rhombuses.

  return shapes;
}
