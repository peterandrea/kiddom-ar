import { useState } from 'react';
import './Presentation.css';

/* ── Slide content ── */
const SLIDES = [
  {
    id: 0,
    section: 'Warm-Up',
    sectionColor: '#0E9F8E',
    title: 'Which One Doesn\'t Belong?',
    body: null,
    visual: 'wodb',
  },
  {
    id: 1,
    section: 'Warm-Up',
    sectionColor: '#0E9F8E',
    title: 'Share Your Thinking',
    body: 'Every shape can be the odd one out — what matters is your reasoning.',
    visual: 'quote',
  },
  {
    id: 2,
    section: 'Activity 1',
    sectionColor: '#6B4FBB',
    title: 'Which 3 Go Together?',
    body: 'Look at the four tiling patterns. Which three share something important?',
    visual: 'patterns4',
  },
  {
    id: 3,
    section: 'Activity 1',
    sectionColor: '#6B4FBB',
    title: 'Tiling the Plane',
    body: 'Covering a flat surface with shapes that have no gaps and no overlaps is called tiling the plane.',
    visual: 'vocab',
  },
  {
    id: 4,
    section: 'Activity 2',
    sectionColor: '#D97706',
    title: 'More Red, Green, or Blue?',
    body: 'In each pattern, which color covers more of the surface?',
    visual: 'patterns2',
  },
  {
    id: 5,
    section: 'Activity 2',
    sectionColor: '#D97706',
    title: 'Area Is About Size, Not Just Count',
    body: '1 trapezoid = 3 triangles in area · 1 rhombus = 2 triangles in area',
    visual: 'equation',
  },
  {
    id: 6,
    section: 'Cool-Down',
    sectionColor: '#F25B44',
    title: 'Exit Ticket',
    body: null,
    visual: 'cooldown',
  },
  {
    id: 7,
    section: 'Cool-Down',
    sectionColor: '#F25B44',
    title: 'What Is Area?',
    body: 'Think about your work today. Write your best definition of "area."',
    visual: 'prompt',
  },
];

/* ── SVG visuals for each slide ── */
function SlideVisual({ type }) {
  if (type === 'wodb') return (
    <div className="pres-visual pres-visual--wodb">
      <div className="wodb-grid">
        <div className="wodb-cell">
          <svg viewBox="0 0 60 60" width="64" height="64">
            <polygon points="30,5 55,20 55,40 30,55 5,40 5,20" fill="#FDE8E5" stroke="#F25B44" strokeWidth="2"/>
          </svg>
          <span>Hexagon</span>
        </div>
        <div className="wodb-cell">
          <svg viewBox="0 0 60 60" width="64" height="64">
            <rect x="10" y="10" width="40" height="40" fill="#EEE9F8" stroke="#6B4FBB" strokeWidth="2"/>
          </svg>
          <span>Square</span>
        </div>
        <div className="wodb-cell">
          <svg viewBox="0 0 60 60" width="64" height="64">
            <polygon points="30,5 55,50 5,50" fill="#E0F5F3" stroke="#0E9F8E" strokeWidth="2"/>
          </svg>
          <span>Triangle</span>
        </div>
        <div className="wodb-cell">
          <svg viewBox="0 0 60 60" width="64" height="64">
            <polygon points="30,8 52,22 52,38 30,52 8,38 8,22 30,8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2"/>
          </svg>
          <span>Pentagon</span>
        </div>
      </div>
    </div>
  );

  if (type === 'quote') return (
    <div className="pres-visual pres-visual--center">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="var(--teal-light)"/>
        <text x="24" y="31" textAnchor="middle" fontSize="22" fill="var(--teal)">"</text>
      </svg>
      <p className="pres-quote">There is no single correct answer — every shape can be the odd one out depending on your reasoning. What matters is your mathematical argument.</p>
    </div>
  );

  if (type === 'patterns4') return (
    <div className="pres-visual pres-visual--grid4">
      {/* Hexagon tiling */}
      <div className="pres-pattern-card">
        <svg viewBox="-5 -5 90 80" width="100%" height="70">
          {[[20,15],[50,15],[35,40],[65,40],[20,55],[50,55]].map(([cx,cy],i) =>
            <polygon key={i} points={hexPts(cx,cy,14)} fill="#FDE8E5" stroke="#F25B44" strokeWidth="1.5"/>
          )}
        </svg>
        <p>Hexagons</p>
      </div>
      {/* Triangle tiling */}
      <div className="pres-pattern-card">
        <svg viewBox="0 0 90 70" width="100%" height="70">
          {triGrid().map((pts,i) => <polygon key={i} points={pts} fill="#E0F5F3" stroke="#0E9F8E" strokeWidth="1.2"/>)}
        </svg>
        <p>Triangles</p>
      </div>
      {/* Square tiling */}
      <div className="pres-pattern-card">
        <svg viewBox="0 0 90 70" width="100%" height="70">
          {sqGrid().map((r,i) => <rect key={i} x={r.x} y={r.y} width={r.s} height={r.s} fill="#EEE9F8" stroke="#6B4FBB" strokeWidth="1.2"/>)}
        </svg>
        <p>Squares</p>
      </div>
      {/* Pentagon (gaps) */}
      <div className="pres-pattern-card pres-pattern-card--odd">
        <svg viewBox="0 0 90 70" width="100%" height="70">
          {pentGrid().map((pts,i) => <polygon key={i} points={pts} fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2"/>)}
        </svg>
        <p>Pentagons — gaps!</p>
      </div>
    </div>
  );

  if (type === 'vocab') return (
    <div className="pres-visual pres-visual--vocab">
      <div className="pres-vocab-box">
        <span className="pres-vocab-term">tiling</span>
        <span className="pres-vocab-div">/</span>
        <span className="pres-vocab-def">Covering a plane with copies of a shape — no gaps, no overlaps</span>
      </div>
      <svg viewBox="-5 -5 100 65" width="160" height="90">
        {[[18,18],[45,18],[72,18],[31,48],[58,48]].map(([cx,cy],i) =>
          <polygon key={i} points={hexPts(cx,cy,16)} fill="#FDE8E5" stroke="#F25B44" strokeWidth="1.5"/>
        )}
      </svg>
    </div>
  );

  if (type === 'patterns2') return (
    <div className="pres-visual pres-visual--two-col">
      <div className="pres-pattern-panel">
        <div className="pres-pattern-label pres-pattern-label--A">Pattern A</div>
        <svg viewBox="-10 0 155 120" width="100%" height="110">
          {patternAShapes().map((s,i) => (
            <polygon key={i} points={s.pts} fill={s.color === 'red' ? '#FECACA' : '#BBF7D0'} stroke={s.color === 'red' ? '#DC2626' : '#16A34A'} strokeWidth="1.2"/>
          ))}
        </svg>
        <div className="pres-pattern-legend">
          <span style={{color:'#DC2626'}}>■ Trapezoid</span>
          <span style={{color:'#16A34A'}}>▲ Triangle</span>
        </div>
      </div>
      <div className="pres-pattern-panel">
        <div className="pres-pattern-label pres-pattern-label--B">Pattern B</div>
        <svg viewBox="-10 0 155 120" width="100%" height="110">
          {patternBShapes().map((s,i) => (
            <polygon key={i} points={s.pts} fill={s.color === 'blue' ? '#BFDBFE' : '#BBF7D0'} stroke={s.color === 'blue' ? '#2563EB' : '#16A34A'} strokeWidth="1.2"/>
          ))}
        </svg>
        <div className="pres-pattern-legend">
          <span style={{color:'#2563EB'}}>◆ Rhombus</span>
          <span style={{color:'#16A34A'}}>▲ Triangle</span>
        </div>
      </div>
    </div>
  );

  if (type === 'equation') return (
    <div className="pres-visual pres-visual--center">
      <div className="pres-equation-row">
        <svg viewBox="0 0 60 30" width="60" height="30">
          <polygon points="5,28 20,5 55,5 40,28" fill="#FECACA" stroke="#DC2626" strokeWidth="1.5"/>
        </svg>
        <span className="pres-eq-equals">=</span>
        <svg viewBox="0 0 30 30" width="30" height="30">
          <polygon points="15,3 27,25 3,25" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.5"/>
        </svg>
        <span className="pres-eq-plus">+</span>
        <svg viewBox="0 0 30 30" width="30" height="30">
          <polygon points="15,3 27,25 3,25" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.5"/>
        </svg>
        <span className="pres-eq-plus">+</span>
        <svg viewBox="0 0 30 30" width="30" height="30">
          <polygon points="15,3 27,25 3,25" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.5"/>
        </svg>
      </div>
      <p className="pres-eq-caption">1 trapezoid covers the same area as 3 triangles</p>
      <div className="pres-equation-row" style={{marginTop: 24}}>
        <svg viewBox="0 0 50 40" width="50" height="40">
          <polygon points="15,2 45,20 35,38 5,20" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5"/>
        </svg>
        <span className="pres-eq-equals">=</span>
        <svg viewBox="0 0 30 30" width="30" height="30">
          <polygon points="15,3 27,25 3,25" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.5"/>
        </svg>
        <span className="pres-eq-plus">+</span>
        <svg viewBox="0 0 30 30" width="30" height="30">
          <polygon points="15,3 27,25 3,25" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.5"/>
        </svg>
      </div>
      <p className="pres-eq-caption">1 rhombus covers the same area as 2 triangles</p>
    </div>
  );

  if (type === 'cooldown') return (
    <div className="pres-visual pres-visual--center">
      <div className="pres-cooldown-icon">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="var(--coral-light)"/>
          <path d="M18 28l8 8 14-16" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="pres-cooldown-label">Time for an exit ticket</p>
    </div>
  );

  if (type === 'prompt') return (
    <div className="pres-visual pres-visual--center">
      <div className="pres-prompt-box">
        <p className="pres-prompt-text">"Think about your work today. Write your best definition of <strong>area</strong>."</p>
      </div>
      <p className="pres-prompt-hint">Write independently · 3–4 minutes</p>
    </div>
  );

  return null;
}

/* ── Toolbar tool ── */
function ToolBtn({ icon, label, active, onClick }) {
  return (
    <button
      className={`pres-tool ${active ? 'pres-tool--active' : ''}`}
      onClick={onClick}
      title={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ── Main Presentation component ── */

export default function Presentation({ activeSlide, onSlideChange }) {
  const [activeTool, setActiveTool] = useState(null);
  const slide = SLIDES[activeSlide] ?? SLIDES[0];

  function prevSlide() { onSlideChange(Math.max(0, activeSlide - 1)); }
  function nextSlide() { onSlideChange(Math.min(SLIDES.length - 1, activeSlide + 1)); }

  function handleTool(tool) {
    setActiveTool(prev => prev === tool ? null : tool);
  }

  return (
    <div className="pres">
      {/* ── Toolbar ── */}
      <div className="pres-toolbar">
        <div className="pres-toolbar__left">
          <span className="pres-toolbar__lesson">Tiling the Plane · Lesson 1</span>
        </div>

        <div className="pres-toolbar__tools">
          {/* Pointer (always available) */}
          <ToolBtn
            label="Pointer"
            active={activeTool === 'pointer'}
            onClick={() => handleTool('pointer')}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 2l8 6-4 1-2 4-2-11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            }
          />

          {/* Spotlight */}
          <ToolBtn
            label="Spotlight"
            active={activeTool === 'spotlight'}
            onClick={() => handleTool('spotlight')}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.2"/>
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* Whiteboard */}
          <ToolBtn
            label="Whiteboard"
            active={activeTool === 'whiteboard'}
            onClick={() => handleTool('whiteboard')}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 13.5h6M8 11.5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4.5 8L6 5.5 8 8l2-3 1.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />

          <div className="pres-toolbar__sep" />

          {/* Fullscreen icon */}
          <button className="pres-tool pres-tool--icon-only" title="Fullscreen">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5.5V2.5h3M11 2.5h3v3M14 10.5v3h-3M5 13.5H2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Spotlight overlay ── */}
      {activeTool === 'spotlight' && (
        <div className="pres-spotlight-overlay">
          <div className="pres-spotlight-msg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="4" fill="#fff" opacity="0.3"/>
              <circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="1.5"/>
              <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Spotlight active — click on the slide to focus
          </div>
        </div>
      )}

      {/* ── Whiteboard overlay ── */}
      {activeTool === 'whiteboard' && (
        <div className="pres-whiteboard-overlay">
          <div className="pres-whiteboard-canvas">
            <div className="pres-whiteboard-msg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="16" height="12" rx="2" stroke="#6B4FBB" strokeWidth="1.5"/>
                <path d="M5 17h10M10 14v3" stroke="#6B4FBB" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 9l2-3 2 2 2-3 2 2" stroke="#6B4FBB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <strong>Whiteboard</strong>
              <span>Annotation tools would appear here</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Slide area ── */}
      <div className="pres-slide" onClick={() => activeTool === 'spotlight' && setActiveTool(null)}>
        <div className="pres-slide__section-badge" style={{ background: slide.sectionColor + '22', color: slide.sectionColor }}>
          {slide.section}
        </div>

        <h2 className="pres-slide__title">{slide.title}</h2>

        {slide.body && (
          <p className="pres-slide__body">{slide.body}</p>
        )}

        <div className="pres-slide__visual">
          <SlideVisual type={slide.visual} />
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="pres-nav">
        <button className="pres-nav__btn" onClick={prevSlide} disabled={activeSlide === 0}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Prev
        </button>

        <div className="pres-nav__dots">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              className={`pres-nav__dot ${i === activeSlide ? 'pres-nav__dot--active' : ''}`}
              onClick={() => onSlideChange(i)}
              title={`Slide ${i + 1}: ${s.title}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pres-counter">{activeSlide + 1} / {SLIDES.length}</span>
          <button className="pres-nav__btn" onClick={nextSlide} disabled={activeSlide === SLIDES.length - 1}>
            Next
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Geometry helpers ── */

function hexPts(cx, cy, s) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 180 * (-90 + 60 * i);
    return `${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`;
  }).join(' ');
}

function triGrid() {
  const pts = [];
  const s = 16;
  const h = s * Math.sqrt(3) / 2;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      const x = col * s + (row % 2 === 0 ? 0 : s / 2) + 5;
      const y = row * h + 5;
      pts.push(`${x},${y + h} ${x + s},${y + h} ${x + s / 2},${y}`);
      if (col < 4) pts.push(`${x + s},${y + h} ${x + s * 1.5},${y} ${x + s / 2},${y}`);
    }
  }
  return pts;
}

function sqGrid() {
  const rects = [];
  const s = 14;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++)
    rects.push({ x: c * (s + 2) + 5, y: r * (s + 2) + 5, s });
  return rects;
}

function pentGrid() {
  // irregular pentagons that leave visible gaps
  const shapes = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const ox = c * 28 + 8, oy = r * 32 + 5;
      shapes.push([
        [ox + 8, oy], [ox + 20, oy], [ox + 24, oy + 12],
        [ox + 14, oy + 20], [ox + 4, oy + 12],
      ].map(([x, y]) => `${x},${y}`).join(' '));
    }
  }
  return shapes;
}

function patternAShapes() {
  const S = 28, H = S * Math.sqrt(3) / 2;
  const shapes = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const cx = col * S * 1.732 + (row % 2) * S * 0.866 + S;
      const cy = row * S * 1.5 + S;
      const v = Array.from({ length: 6 }, (_, i) => {
        const a = Math.PI / 180 * (-90 + 60 * i);
        return [cx + S * Math.cos(a), cy + S * Math.sin(a)];
      });
      // Trapezoid: top half (v0, v1, v2, v5)
      shapes.push({ color: 'red', pts: [v[0], v[1], v[2], v[5]].map(p => p.join(',')).join(' ') });
      // 3 triangles: bottom half
      shapes.push({ color: 'green', pts: [v[2], v[3], v[5]].map(p => p.join(',')).join(' ') });
      shapes.push({ color: 'green', pts: [v[3], v[4], v[5]].map(p => p.join(',')).join(' ') });
      shapes.push({ color: 'green', pts: [v[2], v[3], [cx, cy]].map(p => p.join(',')).join(' ') });
    }
  }
  return shapes;
}

function patternBShapes() {
  const S = 28;
  const shapes = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const cx = col * S * 1.732 + (row % 2) * S * 0.866 + S;
      const cy = row * S * 1.5 + S;
      const v = Array.from({ length: 6 }, (_, i) => {
        const a = Math.PI / 180 * (-90 + 60 * i);
        return [cx + S * Math.cos(a), cy + S * Math.sin(a)];
      });
      const c = [cx, cy];
      for (let i = 0; i < 3; i++) {
        const a = v[i * 2], b = v[i * 2 + 1];
        shapes.push({ color: 'blue', pts: [a, b, c].map(p => p.join(',')).join(' ') + ` ${c.join(',')}` });
        shapes.push({ color: 'blue', pts: [a, b, c].map(p => p.join(',')).join(' ') });
      }
    }
  }
  return shapes;
}
