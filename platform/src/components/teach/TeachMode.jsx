import { useState, useEffect, useRef } from 'react';
import Presentation from './Presentation.jsx';
import './TeachMode.css';

/* ── Classwork dropdown + Assign buttons ── */
function ActivityButtons() {
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    if (!dropOpen) return;
    function handler(e) { if (!dropRef.current?.contains(e.target)) setDropOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropOpen]);

  return (
    <div className="activity-btns">
      <button className="activity-btns__icon-btn" title="Print materials">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="1.5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M3 6.5H1.5A1 1 0 00.5 7.5v4A1 1 0 001.5 12.5h13a1 1 0 001-1v-4a1 1 0 00-1-1H13" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="3" y="9.5" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="12.5" cy="8.5" r=".75" fill="currentColor"/>
        </svg>
      </button>

      <div className="activity-btns__classwork-wrap" ref={dropRef}>
        <button
          className={`activity-btns__classwork ${dropOpen ? 'activity-btns__classwork--open' : ''}`}
          onClick={() => setDropOpen(o => !o)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Classwork
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
            className={`activity-btns__caret ${dropOpen ? 'activity-btns__caret--up' : ''}`}>
            <path d="M2.5 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {dropOpen && (
          <div className="activity-btns__dropdown">
            <button className="activity-btns__drop-item" onClick={() => setDropOpen(false)}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="2" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M6 6l3 2-3 2V6z" fill="currentColor"/>
                <path d="M5 14h6M8 11v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Start Classwork
            </button>
            <button className="activity-btns__drop-item" onClick={() => setDropOpen(false)}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="4" y="9" width="2.5" height="2.5" rx=".5" fill="currentColor" opacity=".5"/>
                <rect x="6.75" y="9" width="2.5" height="2.5" rx=".5" fill="currentColor" opacity=".5"/>
                <rect x="9.5" y="9" width="2.5" height="2.5" rx=".5" fill="currentColor" opacity=".5"/>
              </svg>
              Schedule Classwork
            </button>
          </div>
        )}
      </div>

      <button className="activity-btns__assign">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M1 13.5c0-3.038 2.462-5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M12 8v5M9.5 10.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Assign
      </button>
    </div>
  );
}

/* ── Countdown Timer ── */
function CountdownTimer({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(initialSeconds);
    setRunning(false);
    clearInterval(intervalRef.current);
  }, [initialSeconds]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const pct = (seconds / initialSeconds) * 100;
  const isDone = seconds === 0;
  const isWarning = seconds <= 60 && seconds > 0;

  return (
    <div className={`timer ${isDone ? 'timer--done' : isWarning ? 'timer--warning' : ''}`}>
      <div className="timer__ring-wrap">
        <svg className="timer__ring" width="44" height="44" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border)" strokeWidth="3"/>
          <circle cx="24" cy="24" r="20" fill="none"
            stroke={isDone ? '#DC2626' : isWarning ? '#D97706' : 'var(--teal)'}
            strokeWidth="3"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * (1 - pct / 100)}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '24px 24px', transition: 'stroke-dashoffset 900ms linear' }}
          />
        </svg>
        <div className="timer__display">
          <span className={`timer__time ${isDone ? 'timer__time--done' : ''}`}>
            {isDone ? '✓' : `${mins}:${secs}`}
          </span>
        </div>
      </div>
      <div className="timer__controls">
        <button className={`timer__btn ${running ? 'timer__btn--pause' : 'timer__btn--play'}`}
          onClick={() => setRunning(r => !r)} disabled={isDone}>
          {running
            ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="2" y="1.5" width="3" height="9" rx="1" fill="currentColor"/><rect x="7" y="1.5" width="3" height="9" rx="1" fill="currentColor"/></svg>
            : <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 2l7 4-7 4V2z" fill="currentColor"/></svg>
          }
        </button>
        <button className="timer__btn timer__btn--reset"
          onClick={() => { setSeconds(initialSeconds); setRunning(false); }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M10 6A4 4 0 102 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2 3v3H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── SVG thumbnails ── */
function ActivityThumb({ id }) {
  if (id === 'warmup') return (
    <svg viewBox="0 0 80 60" className="teach-thumb">
      <rect x="4" y="4" width="34" height="24" rx="4" fill="#E0F5F3" stroke="#0E9F8E" strokeWidth="1.5"/>
      <polygon points="21,8 34,28 8,28" fill="none" stroke="#0E9F8E" strokeWidth="1.5"/>
      <rect x="42" y="4" width="34" height="24" rx="4" fill="#EEE9F8" stroke="#6B4FBB" strokeWidth="1.5"/>
      <rect x="50" y="12" width="18" height="8" rx="1" fill="#6B4FBB" opacity=".4"/>
      <rect x="4" y="32" width="34" height="24" rx="4" fill="#FDE8E5" stroke="#F25B44" strokeWidth="1.5"/>
      <polygon points="21,36 34,52 8,52" fill="none" stroke="#F25B44" strokeWidth="1.2" transform="rotate(180,21,44)"/>
      <rect x="42" y="32" width="34" height="24" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
      <polygon points="59,36 72,52 46,52" fill="#D97706" opacity=".3"/>
    </svg>
  );
  if (id === 'activity1') return (
    <svg viewBox="-4 -4 96 68" className="teach-thumb">
      {[[16,16],[38,16],[27,32],[49,32],[16,48],[38,48]].map(([cx,cy],i)=>
        <polygon key={i} points={hexPts(cx,cy,12)} fill={i%2===0?'#FDE8E5':'#E0F5F3'} stroke={i%2===0?'#F25B44':'#0E9F8E'} strokeWidth="1.5"/>
      )}
      <text x="72" y="38" textAnchor="middle" fontSize="22" fill="#6B4FBB" fontWeight="800" opacity=".5">?</text>
    </svg>
  );
  if (id === 'activity2') return (
    <svg viewBox="-4 -4 92 65" className="teach-thumb">
      {[[18,18],[44,18],[18,46],[44,46]].map(([cx,cy],i) => {
        const v = hexVertsArr(cx, cy, 13);
        return (
          <g key={i}>
            <polygon points={[v[0],v[1],v[2],v[5]].map(p=>p.join(',')).join(' ')} fill="#FECACA" stroke="#DC2626" strokeWidth="1.2"/>
            <polygon points={[v[2],v[3],v[5]].map(p=>p.join(',')).join(' ')} fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.2"/>
            <polygon points={[v[3],v[4],v[5]].map(p=>p.join(',')).join(' ')} fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.2"/>
          </g>
        );
      })}
      {[[70,18],[70,46]].map(([cx,cy],i) => {
        const v = hexVertsArr(cx, cy, 13);
        const c = [cx, cy];
        return [0,1,2].map(j => (
          <polygon key={`${i}-${j}`}
            points={[v[j*2], v[j*2+1], c].map(p=>p.join(',')).join(' ')}
            fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.2"/>
        ));
      })}
    </svg>
  );
  if (id === 'cooldown') return (
    <svg viewBox="0 0 80 60" className="teach-thumb">
      <rect x="8" y="8" width="64" height="44" rx="6" fill="#FDE8E5" stroke="#F25B44" strokeWidth="1.5"/>
      <path d="M20 28h40M20 36h28" stroke="#F25B44" strokeWidth="2" strokeLinecap="round" opacity=".6"/>
      <path d="M20 20h40" stroke="#F25B44" strokeWidth="2" strokeLinecap="round" opacity=".3"/>
      <circle cx="60" cy="46" r="10" fill="#F25B44"/>
      <path d="M56 46l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return null;
}

function hexPts(cx, cy, s) {
  return Array.from({length:6},(_,i)=>{
    const a = Math.PI/180*(-90+60*i);
    return `${cx+s*Math.cos(a)},${cy+s*Math.sin(a)}`;
  }).join(' ');
}
function hexVertsArr(cx, cy, s) {
  return Array.from({length:6},(_,i)=>{
    const a = Math.PI/180*(-90+60*i);
    return [cx+s*Math.cos(a), cy+s*Math.sin(a)];
  });
}

/* ── Grouping pill ── */
const GROUPING_CONFIG = {
  'whole-class': { icon: '🏛', label: 'Whole Class', color: '#2563EB', bg: '#EFF6FF' },
  'pairs':       { icon: '👥', label: 'Pairs',       color: '#0E9F8E', bg: '#E0F5F3' },
  'individual':  { icon: '✏️', label: 'Individual',  color: '#6B4FBB', bg: '#EEE9F8' },
};

function GroupingPill({ type }) {
  const g = GROUPING_CONFIG[type];
  if (!g) return null;
  return (
    <span className="grouping-pill" style={{ background: g.bg, color: g.color }}>
      <span>{g.icon}</span> {g.label}
    </span>
  );
}

/* ── Lesson steps data ── */
const STEPS = [
  {
    id: 'warmup', type: 'Warm-Up', typeColor: 'teal', durationMins: 5, slide: 0,
    grouping: 'whole-class',
    title: "Which One Doesn't Belong?",
    actions: [
      { kind: 'display',   text: 'Display the four shapes (slide 1). Give 1–2 min quiet think time.' },
      { kind: 'discuss',   text: "Turn & Talk: Which one doesn't belong? Why?" },
      { kind: 'share',     text: 'Take 2–3 responses. Accept all — every shape can be justified.' },
      { kind: 'bridge',    text: '"Today we\'ll look at which shapes can cover a flat surface perfectly."' },
    ],
  },
  {
    id: 'activity1', type: 'Activity 1', typeColor: 'purple', durationMins: 15, slide: 2,
    grouping: 'pairs',
    title: 'Which 3 Go Together?',
    actions: [
      { kind: 'display',   text: 'Show the four tiling pattern cards (slide 3).' },
      { kind: 'task',      text: 'Pairs discuss which three go together and write reasoning.' },
      { kind: 'circulate', text: 'Listen for "no gaps." Ask: "Could this go on forever?"' },
      { kind: 'discuss',   text: 'Whole class: which is the odd one out? (Pentagons — gaps.)' },
      { kind: 'vocab',     text: 'Introduce tiling: covering a plane with no gaps, no overlaps.' },
    ],
  },
  {
    id: 'activity2', type: 'Activity 2', typeColor: 'amber', durationMins: 15, slide: 4,
    grouping: 'pairs',
    title: 'More Red, Green, or Blue?',
    actions: [
      { kind: 'display',   text: 'Show Pattern A (red + green) on slide 5. Which covers more?' },
      { kind: 'task',      text: 'Pairs build both patterns with blocks. Count, compare, discuss.' },
      { kind: 'circulate', text: '"Does counting more shapes mean more area? Why not?"' },
      { kind: 'discuss',   text: '1 red trapezoid = 3 green triangles · 1 blue rhombus = 2 green triangles' },
      { kind: 'bridge',    text: '"Counting shapes alone doesn\'t measure area — size matters too."' },
    ],
  },
  {
    id: 'cooldown', type: 'Cool-Down', typeColor: 'coral', durationMins: 5, slide: 6,
    grouping: 'individual',
    title: 'What Is Area?',
    actions: [
      { kind: 'display',  text: 'Show the cool-down prompt (slide 7).' },
      { kind: 'task',     text: 'Write independently: "What is your best definition of area?"' },
      { kind: 'collect',  text: 'Collect responses to inform Lesson 2 groupings.' },
    ],
  },
];

/* ── Action icons (3 types, fill-based, viewBox 0 0 1200 1200) ── */
const IconPlanning = () => (
  <svg width="22" height="22" viewBox="0 0 1200 1200" fill="currentColor" className="teach-action-step__icon">
    <path d="m536.36 347.27c-69.09 0-127.27 56.363-127.27 127.27s56.363 127.27 127.27 127.27c70.91 0 127.27-56.363 127.27-127.27s-56.363-127.27-127.27-127.27z"/>
    <path d="m1134.5 723.64-96.363-194.55c-1.8164-3.6367-3.6367-7.2734-3.6367-10.91 1.8164-258.18-192.73-476.36-441.82-498.18-292.73-25.453-530.91 207.27-530.91 485.45 0 330.91 263.64 338.18 263.64 658.18 0 9.0898 9.0898 18.184 18.184 18.184h552.73c9.0898 0 18.184-9.0898 18.184-18.184v-214.55h76.363c25.453 0 45.453-20 45.453-45.453v-121.82c0-5.4531 3.6367-7.2734 9.0898-7.2734h60c12.727 0 23.637-5.4531 29.09-16.363 5.457-10.906 5.457-23.633 0.003906-34.543zm-283.64-201.82c0 9.0898-7.2734 16.363-16.363 18.184l-69.09 9.0898c-3.6367 12.727-9.0898 23.637-14.547 34.547l41.816 56.363c5.4531 7.2734 5.4531 18.184-1.8164 23.637l-65.453 65.453c-7.2734 5.4531-16.363 7.2734-23.637 1.8164l-56.363-41.816c-10.91 5.4531-23.637 10.91-34.547 14.547l-9.0898 69.09c-1.8164 9.0898-9.0898 16.363-18.184 16.363h-92.727c-9.0898 0-16.363-7.2734-18.184-16.363l-9.0898-69.09c-12.727-3.6367-23.637-9.0898-34.547-14.547l-56.363 41.816c-7.2734 5.4531-18.184 5.4531-23.637-1.8164l-65.453-65.453c-5.4531-5.4531-7.2734-16.363-1.8164-23.637l41.816-56.363c-5.4531-10.91-10.91-23.637-14.547-34.547l-69.09-9.0898c-9.0898-1.8164-16.363-9.0898-16.363-18.184v-92.727c0-9.0898 7.2734-16.363 16.363-18.184l69.09-9.0898c3.6367-12.727 9.0898-23.637 14.547-34.547l-43.637-58.18c-5.4531-7.2734-5.4531-18.184 1.8164-23.637l65.453-65.453c7.2734-7.2734 16.363-7.2734 23.637-1.8164l56.363 41.816c10.91-5.4531 23.637-10.91 34.547-14.547l10.91-69.09c1.8164-9.0898 9.0898-16.363 18.184-16.363h92.727c9.0898 0 16.363 7.2734 18.184 16.363l9.0898 69.09c12.727 3.6367 23.637 9.0898 34.547 14.547l56.363-41.816c7.2734-5.4531 18.184-5.4531 23.637 1.8164l65.453 65.453c7.2734 7.2734 7.2734 16.363 1.8164 23.637l-41.816 56.363c5.4531 10.91 10.91 23.637 14.547 34.547l69.09 9.0898c9.0898 1.8164 16.363 9.0898 16.363 18.184z"/>
  </svg>
);

const IconTeaching = () => (
  <svg width="22" height="22" viewBox="0 0 1200 1200" fill="currentColor" className="teach-action-step__icon">
    <path d="m500.27 447.1h121.57c0-96.352-78.391-174.74-174.74-174.74-96.355 0-174.74 78.391-174.74 174.74 0 96.355 78.391 174.74 174.74 174.74 88.953 0 162.54-66.824 173.33-152.9h-120.16l32.367 48.547c3.3438 5.0195 1.9883 11.797-3.0273 15.145-1.8594 1.2422-3.9648 1.8359-6.0508 1.8359-3.5312 0-6.9922-1.707-9.0977-4.8633l-43.648-65.473c-0.003906-0.007813-0.007812-0.015625-0.011719-0.019531l-0.027343-0.039063c-0.19531-0.29297-0.33203-0.61328-0.49219-0.92187-0.16797-0.3125-0.35938-0.60938-0.49609-0.94141-0.125-0.30078-0.18359-0.61719-0.27734-0.92969-0.097656-0.32031-0.22656-0.62891-0.29297-0.96484-0.074219-0.37109-0.082032-0.74609-0.11328-1.1211-0.03125-0.32031-0.089843-0.63672-0.089843-0.96094 0-0.32422 0.0625-0.64062 0.089843-0.96094 0.035157-0.375 0.042969-0.75 0.11328-1.1211 0.066406-0.33594 0.19531-0.64062 0.29297-0.96484 0.097657-0.30859 0.15625-0.625 0.27734-0.92969 0.13672-0.33203 0.32812-0.62891 0.49609-0.94141 0.16016-0.30859 0.30078-0.62891 0.49219-0.91797l0.027343-0.039063 43.648-65.473c3.3477-5.0234 10.125-6.3789 15.145-3.0273 5.0195 3.3477 6.375 10.129 3.0273 15.145z"/>
    <path d="m1047.8 206.83c-6.0312 0-10.922 4.8906-10.922 10.922v178.38c0 28.105-22.863 50.969-50.965 50.969h-27.672v-17.242c0-78.512-32.188-151.67-90.641-206.01-57.27-53.234-132.9-82.551-212.97-82.551h-218.43c-79.254 0-153.44 30.535-208.89 85.988-55.449 55.449-85.988 129.64-85.988 208.89v611.6c0 6.0312 4.8906 10.922 10.922 10.922h393.17c6.0312 0 10.922-4.8906 10.922-10.922v-229.35h120.13c6.0312 0 10.922-4.8906 10.922-10.918v-185.66h54.605c6.0312 0 10.922-4.8906 10.922-10.918v-141.98h183.48v124.73h-54.605c-6.0312 0-10.922 4.8906-10.922 10.922v185.66h-120.14c-6.0312 0-10.918 4.8906-10.918 10.918v240.27c0 6.0312 4.8906 10.922 10.918 10.922 6.0312 0 10.922-4.8906 10.922-10.922v-229.35h120.14c6.0312 0 10.922-4.8906 10.922-10.922v-185.66h54.605c6.0312 0 10.918-4.8906 10.918-10.922v-135.65h27.672c40.145 0 72.805-32.664 72.805-72.809v-178.38c0.015625-6.0469-4.875-10.934-10.906-10.934zm-513.3 830.02h-23.16l-278.07-198.62c-4.9062-3.5078-6.043-10.328-2.5391-15.238 3.5078-4.9062 10.328-6.0508 15.234-2.5391zm196.58-567.91h-88.59c-10.902 98.152-94.352 174.74-195.37 174.74-108.4 0-196.59-88.188-196.59-196.59 0-108.39 88.188-196.59 196.59-196.59 108.39 0 196.58 88.188 196.58 196.59h87.371zm205.32-21.844h-183.48v-10.922c0-79.258-30.535-153.44-85.988-208.89-27.957-27.957-60.684-49.574-96.418-64.145h84.109c155.37 0 281.77 119.64 281.77 266.71z"/>
  </svg>
);

const IconAssessing = () => (
  <svg width="22" height="22" viewBox="0 0 1200 1200" fill="currentColor" className="teach-action-step__icon">
    <path d="m824.88 410.76-133.68 133.56c5.5195 12.359 8.5195 25.922 8.5195 40.32 0 55.066-44.641 99.719-99.719 99.719s-99.719-44.652-99.719-99.719c0-55.078 44.641-99.719 99.719-99.719 14.398 0 27.961 3 40.32 8.3984l81-81c-81-53.641-191.52-44.762-262.8 26.52-39.359 39.359-61.078 91.801-61.078 147.48 0 55.68 21.719 108.12 61.078 147.49 9.3594 9.3477 9.3594 24.602 0 33.961-4.6797 4.6797-10.801 7.0781-16.922 7.0781-6.2383 0-12.359-2.3984-17.039-7.0781-48.48-48.48-75.121-112.92-75.121-181.45 0-68.52 26.641-132.96 75.121-181.44 90.121-90.121 231-99.121 331.21-27l18.121-18.121c14.16-14.039 36.828-14.039 51 0 14.031 14.164 14.031 36.961-0.011719 51.004z"/>
    <path d="m600 132c-258.12 0-468 210-468 468s209.88 468 468 468c258 0 468-210 468-468s-210-468-468-468zm0 864c-218.4 0-396-177.6-396-396s177.6-396 396-396 396 177.6 396 396-177.6 396-396 396z"/>
  </svg>
);

/* Map action kind → icon component */
const ACTION_ICON = {
  display:   IconPlanning,
  vocab:     IconPlanning,
  bridge:    IconPlanning,
  discuss:   IconTeaching,
  share:     IconTeaching,
  circulate: IconTeaching,
  task:      IconAssessing,
  collect:   IconAssessing,
};

/* ── Horizontal numbered step item ── */
function StepAction({ action, index }) {
  const Icon = ACTION_ICON[action.kind] || IconPlanning;
  return (
    <div className="teach-action-step">
      <div className="teach-action-step__top">
        <span className="teach-action-step__num">{index + 1}</span>
        <Icon />
      </div>
      <p className="teach-action-step__text">{action.text}</p>
    </div>
  );
}

/* ── Vertical step card ── */
function StepCard({ step, isActive, onGoToSlide, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`teach-step card ${isActive ? 'teach-step--active' : ''}`}
    >
      {/* Header row */}
      <div className="teach-step__header">
        <div className="teach-step__title-row">
          <span className={`tag teach-tag teach-tag--${step.typeColor}`}>{step.type}</span>
          <h3 className="teach-step__title">{step.title}</h3>
        </div>
        <CountdownTimer initialSeconds={step.durationMins * 60} />
      </div>

      {/* Meta row: thumb + grouping + buttons */}
      <div className="teach-step__meta-row">
        <ActivityThumb id={step.id} />
        <div className="teach-step__meta-right">
          <GroupingPill type={step.grouping} />
          <div className="teach-step__actions-row">
            <button className="teach-step__jump-btn" onClick={() => onGoToSlide(step.slide)}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4 8.5l2-2 2 1.5 2-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Slide {step.slide + 1}
            </button>
            <ActivityButtons />
          </div>
        </div>
      </div>

      {/* Horizontal numbered steps */}
      <div className="teach-action-steps">
        {step.actions.map((a, i) => (
          <StepAction key={i} action={a} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function TeachMode() {
  const [activeSlide, setActiveSlide] = useState(0);
  const stepRefs = useRef({});
  const presRef = useRef(null);

  // Determine which step the active slide belongs to
  const activeStepId = STEPS.reduce((found, s) =>
    activeSlide >= s.slide ? s.id : found, STEPS[0].id
  );

  // Scroll so the active card sits directly below the sticky slide deck (speaker-notes style)
  useEffect(() => {
    const card = stepRefs.current[activeStepId];
    const pres = presRef.current;
    const appMain = document.querySelector('.app-main');
    if (!card || !pres || !appMain) return;

    const presBottom = pres.getBoundingClientRect().bottom;
    const cardTop = card.getBoundingClientRect().top;
    // Shift scroll so card.top lands exactly at pres.bottom
    appMain.scrollTo({
      top: appMain.scrollTop + (cardTop - presBottom),
      behavior: 'smooth',
    });
  }, [activeStepId]);

  return (
    <div className="teach-mode screen-enter">
      {/* Sticky presentation */}
      <div className="teach-pres-section" ref={presRef}>
        <Presentation activeSlide={activeSlide} onSlideChange={setActiveSlide} />
      </div>

      {/* Scrolling guide */}
      <div className="teach-guide-section">
        <div className="teach-guide-inner">
          <h2 className="teach-guide__heading">Lesson Guide</h2>
          <div className="teach-guide__steps">
            {STEPS.map(step => (
              <StepCard
                key={step.id}
                step={step}
                isActive={step.id === activeStepId}
                onGoToSlide={setActiveSlide}
                cardRef={el => stepRefs.current[step.id] = el}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
