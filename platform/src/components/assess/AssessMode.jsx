import { useState } from 'react';
import './AssessMode.css';

const ACTIVITIES = [
  { id: 'act1', label: 'Activity 1', short: 'A1', description: 'Which 3 Go Together?' },
  { id: 'act2', label: 'Activity 2', short: 'A2', description: 'More Red, Green, or Blue?' },
  { id: 'cd',   label: 'Cool-Down', short: 'CD', description: 'What Is Area?' },
];

const STUDENTS = [
  { id:  1, name: 'Aaliyah B.',  avatar: 'AB', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is the amount of space inside a flat shape — how much surface it covers.', timeA1: '9:03', timeA2: '9:19', timeCd: '9:37' },
  { id:  2, name: 'Ben C.',      avatar: 'BC', act1: 'complete',    act2: 'complete',    cd: 'needs-review', note: 'Defined area as "the border around a shape" — confusing area with perimeter.',    cdResponse: 'Area is the border around a shape.', timeA1: '9:05', timeA2: '9:20', timeCd: '9:38' },
  { id:  3, name: 'Chloe D.',    avatar: 'CD', act1: 'complete',    act2: 'in-progress', cd: 'not-started', note: null,            cdResponse: null, timeA1: '9:06', timeA2: null, timeCd: null },
  { id:  4, name: 'Devon E.',    avatar: 'DE', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is the amount of surface a shape covers, measured in square units.', timeA1: '9:04', timeA2: '9:18', timeCd: '9:36' },
  { id:  5, name: 'Elodie F.',   avatar: 'EF', act1: 'needs-review',act2: 'complete',    cd: 'complete',    note: 'Selected only 2 shapes — may not have read the prompt fully.',       cdResponse: 'Area is how much space something takes up on a flat surface.', timeA1: '9:08', timeA2: '9:22', timeCd: '9:40' },
  { id:  6, name: 'Finn G.',     avatar: 'FG', act1: 'complete',    act2: 'complete',    cd: 'needs-review', note: '"Area is how long something is" — likely mixing up with length.',      cdResponse: 'Area is how long something is.', timeA1: '9:05', timeA2: '9:19', timeCd: '9:39' },
  { id:  7, name: 'Grace H.',    avatar: 'GH', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area measures how much of a surface a shape covers.', timeA1: '9:03', timeA2: '9:17', timeCd: '9:35' },
  { id:  8, name: 'Hassan I.',   avatar: 'HI', act1: 'in-progress', act2: 'not-started', cd: 'not-started', note: null,            cdResponse: null, timeA1: null, timeA2: null, timeCd: null },
  { id:  9, name: 'Isla J.',     avatar: 'IJ', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is the number of unit squares that fit inside a shape.', timeA1: '9:04', timeA2: '9:18', timeCd: '9:36' },
  { id: 10, name: 'Jordan K.',   avatar: 'JK', act1: 'complete',    act2: 'needs-review',cd: 'complete',    note: 'Counted shapes to compare area, did not account for shape size difference.', cdResponse: 'Area is the space inside a shape on a flat surface.', timeA1: '9:06', timeA2: '9:21', timeCd: '9:39' },
  { id: 11, name: 'Kaia L.',     avatar: 'KL', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is how much surface is covered by a 2D shape.', timeA1: '9:03', timeA2: '9:17', timeCd: '9:35' },
  { id: 12, name: 'Luca M.',     avatar: 'LM', act1: 'complete',    act2: 'in-progress', cd: 'not-started', note: null,            cdResponse: null, timeA1: '9:07', timeA2: null, timeCd: null },
  { id: 13, name: 'Maya N.',     avatar: 'MN', act1: 'needs-review',act2: 'complete',    cd: 'complete',    note: 'Chose hexagons, triangles, and squares but said they go together "because they are colorful".', cdResponse: 'Area is the total space inside a shape.', timeA1: '9:09', timeA2: '9:24', timeCd: '9:41' },
  { id: 14, name: 'Noah O.',     avatar: 'NO', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is the 2D measurement of how much surface is covered.', timeA1: '9:04', timeA2: '9:18', timeCd: '9:36' },
  { id: 15, name: 'Olivia P.',   avatar: 'OP', act1: 'complete',    act2: 'complete',    cd: 'needs-review', note: 'Definition is incomplete — "area is space" — good start, needs more precision.', cdResponse: 'Area is space.', timeA1: '9:05', timeA2: '9:20', timeCd: '9:38' },
  { id: 16, name: 'Pari Q.',     avatar: 'PQ', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is how much of a flat surface is covered by a shape.', timeA1: '9:04', timeA2: '9:18', timeCd: '9:36' },
  { id: 17, name: 'Quinn R.',    avatar: 'QR', act1: 'not-started', act2: 'not-started', cd: 'not-started', note: null,            cdResponse: null, timeA1: null, timeA2: null, timeCd: null },
  { id: 18, name: 'Rafael S.',   avatar: 'RS', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area tells us how much surface a shape covers, measured in square units.', timeA1: '9:03', timeA2: '9:17', timeCd: '9:35' },
  { id: 19, name: 'Sasha T.',    avatar: 'ST', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is the amount of space inside a 2D shape.', timeA1: '9:05', timeA2: '9:20', timeCd: '9:37' },
  { id: 20, name: 'Theo U.',     avatar: 'TU', act1: 'in-progress', act2: 'not-started', cd: 'not-started', note: null,            cdResponse: null, timeA1: null, timeA2: null, timeCd: null },
  { id: 21, name: 'Uma V.',      avatar: 'UV', act1: 'complete',    act2: 'needs-review',cd: 'complete',    note: 'Counted shapes correctly but concluded "blue covers more" without justifying why.', cdResponse: 'Area is the amount of flat space a shape occupies.', timeA1: '9:06', timeA2: '9:21', timeCd: '9:39' },
  { id: 22, name: 'Victor W.',   avatar: 'VW', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is the measure of how much 2D space a shape covers.', timeA1: '9:04', timeA2: '9:18', timeCd: '9:36' },
  { id: 23, name: 'Winnie X.',   avatar: 'WX', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is how much surface is covered inside a shape\'s boundary.', timeA1: '9:03', timeA2: '9:17', timeCd: '9:35' },
  { id: 24, name: 'Xander Y.',   avatar: 'XY', act1: 'complete',    act2: 'in-progress', cd: 'not-started', note: null,            cdResponse: null, timeA1: '9:08', timeA2: null, timeCd: null },
  { id: 25, name: 'Yasmin Z.',   avatar: 'YZ', act1: 'complete',    act2: 'complete',    cd: 'needs-review', note: 'Said "area is the amount of shapes" — still reasoning in units of shapes rather than coverage.', cdResponse: 'Area is the amount of shapes.', timeA1: '9:05', timeA2: '9:20', timeCd: '9:38' },
  { id: 26, name: 'Zara A.',     avatar: 'ZA', act1: 'complete',    act2: 'complete',    cd: 'complete',    note: null,            cdResponse: 'Area is how much flat space something covers.', timeA1: '9:04', timeA2: '9:18', timeCd: '9:36' },
  { id: 27, name: 'Eli M.',      avatar: 'EM', act1: 'complete',    act2: 'not-started', cd: 'not-started', note: null,            cdResponse: null, timeA1: '9:10', timeA2: null, timeCd: null },
  { id: 28, name: 'Fiona T.',    avatar: 'FT', act1: 'needs-review',act2: 'complete',    cd: 'complete',    note: 'Chose the square as the odd one out, reasoning it has right angles. Valid but unexpected.', cdResponse: 'Area is the amount of space inside a flat shape.', timeA1: '9:07', timeA2: '9:22', timeCd: '9:40' },
];

const STATUS = {
  'complete':     { label: 'Done · On track',    color: '#16A34A', bg: '#DCFCE7', icon: '✓' },
  'in-progress':  { label: 'In progress',         color: '#D97706', bg: '#FEF3C7', icon: '…' },
  'needs-review': { label: 'Done · Needs review', color: '#DC2626', bg: '#FEE2E2', icon: '!' },
  'not-started':  { label: 'Not started',          color: '#9CA3AF', bg: '#F3F4F6', icon: '–' },
};

function getUnderstandingLevel(student) {
  const statuses = [student.act1, student.act2, student.cd];
  const reviews = statuses.filter(s => s === 'needs-review').length;
  const notStarted = statuses.filter(s => s === 'not-started').length;
  const inProgress = statuses.filter(s => s === 'in-progress').length;

  if (notStarted >= 2 || (inProgress >= 1 && notStarted >= 1)) return { level: 'Not enough data', color: '#9CA3AF', bg: '#F3F4F6', desc: 'Student has not yet completed enough activities to assess.' };
  if (inProgress >= 1) return { level: 'In Progress', color: '#D97706', bg: '#FEF3C7', desc: 'Student is still working through the lesson activities.' };
  if (reviews >= 2) return { level: 'Emerging', color: '#DC2626', bg: '#FEE2E2', desc: 'Multiple responses indicate foundational misconceptions that need direct intervention before Lesson 2.' };
  if (reviews === 1 && student.cd === 'needs-review') return { level: 'Developing', color: '#D97706', bg: '#FEF3C7', desc: 'Student shows partial understanding of tiling but has not yet connected it to a precise definition of area.' };
  if (reviews === 1) return { level: 'Developing', color: '#D97706', bg: '#FEF3C7', desc: 'Student shows solid reasoning in most activities with one area of confusion worth revisiting.' };
  return { level: 'Proficient', color: '#16A34A', bg: '#DCFCE7', desc: 'Student demonstrates understanding of tiling and area as surface coverage. Ready for Lesson 2.' };
}

/* Bar fill: LENGTH = completion, COLOR = understanding
   complete     → 100% green  (done + correct)
   needs-review → 100% red    (done + misconception)
   in-progress  → 50%  amber  (partial, performance unknown)
   not-started  → 0%   grey track (nothing yet) */
const BAR_FILL = {
  'complete':     { pct: 100, color: '#16A34A' },
  'needs-review': { pct: 100, color: '#DC2626' },
  'in-progress':  { pct: 50,  color: '#D97706' },
  'not-started':  { pct: 0,   color: '#9CA3AF' },
};

function StudentProgressBar({ act1, act2, cd }) {
  const segments = [
    { key: 'act1', label: 'A1', status: act1 },
    { key: 'act2', label: 'A2', status: act2 },
    { key: 'cd',   label: 'CD', status: cd },
  ];
  // Overall % for the label
  const score = [act1, act2, cd].reduce((sum, s) => {
    if (s === 'complete' || s === 'needs-review') return sum + 1;
    if (s === 'in-progress') return sum + 0.5;
    return sum;
  }, 0);
  const overallPct = Math.round((score / 3) * 100);

  return (
    <div className="student-progress-bar-wrap">
      <div className="student-progress-bars">
        {segments.map((seg) => {
          const fill = BAR_FILL[seg.status];
          return (
            <div key={seg.key} className="student-progress-track" title={`${seg.label}: ${STATUS[seg.status].label}`}>
              <div
                className="student-progress-fill"
                style={{ width: `${fill.pct}%`, background: fill.color }}
              />
              <span className="student-progress-lbl">{seg.label}</span>
            </div>
          );
        })}
      </div>
      <span className="student-bar-pct">{overallPct}%</span>
    </div>
  );
}

function StudentRow({ student, onSelect, selected }) {
  const actStatuses = [student.act1, student.act2, student.cd];
  const hasNote = student.note;
  const allDone = actStatuses.every(s => s === 'complete');
  const hasReview = actStatuses.some(s => s === 'needs-review');

  return (
    <tr
      className={`assess-row ${selected ? 'assess-row--selected' : ''}`}
      onClick={() => onSelect(student)}
    >
      <td className="assess-td assess-td--name">
        <div className="assess-student">
          <div className={`assess-avatar assess-avatar--${hasReview ? 'review' : allDone ? 'done' : 'default'}`}>
            {student.avatar}
          </div>
          <span className="assess-student__name">{student.name}</span>
          {hasNote && <span className="assess-flag">!</span>}
        </div>
      </td>
      <td className="assess-td assess-td--bar">
        <StudentProgressBar act1={student.act1} act2={student.act2} cd={student.cd} />
      </td>
    </tr>
  );
}

/* ── Student detail panel ── */
function DetailPanel({ student, onClose }) {
  const understanding = getUnderstandingLevel(student);
  const acts = [
    { ...ACTIVITIES[0], status: student.act1, time: student.timeA1 },
    { ...ACTIVITIES[1], status: student.act2, time: student.timeA2 },
    { ...ACTIVITIES[2], status: student.cd,   time: student.timeCd },
  ];
  const completedCount = acts.filter(a => a.status === 'complete' || a.status === 'needs-review').length;
  const progressPct = Math.round((completedCount / 3) * 100);

  return (
    <div className="assess-detail card">
      {/* Student header */}
      <div className="assess-detail__header">
        <div className="assess-detail__student">
          <div className="assess-avatar assess-avatar--large">{student.avatar}</div>
          <div>
            <p className="assess-detail__name">{student.name}</p>
            <p className="assess-detail__subtitle">Grade 6 · Period 3 · Lesson 1</p>
          </div>
        </div>
        <button className="assess-detail__close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Progress section ── */}
      <div className="assess-detail__section">
        <div className="assess-detail__section-label">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 10l3-3 2.5 2.5 3.5-5 3 2.5" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Progress
        </div>

        {/* Overall progress bar */}
        <div className="assess-progress-bar-wrap">
          <div className="assess-progress-bar">
            <div className="assess-progress-bar__fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="assess-progress-pct">{progressPct}%</span>
        </div>

        {/* Activity step trail */}
        <div className="assess-step-trail">
          {acts.map((a, i) => {
            const s = STATUS[a.status];
            // Map activity to student app anchor
            const appAnchors = { 'act1': '#activity1', 'act2': '#activity2', 'cd': '#cooldown' };
            const href = `http://localhost:5173${appAnchors[a.id] ?? ''}`;
            return (
              <div key={i} className="assess-step-trail__item">
                <div className="assess-step-trail__connector-wrap">
                  <div
                    className="assess-step-trail__dot"
                    style={{ background: s.bg, borderColor: s.color, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  {i < acts.length - 1 && (
                    <div className={`assess-step-trail__line ${acts[i+1].status !== 'not-started' ? 'assess-step-trail__line--done' : ''}`} />
                  )}
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="assess-step-trail__info assess-step-trail__info--link"
                >
                  <span className="assess-step-trail__label">{a.label}</span>
                  <span className="assess-step-trail__desc">{a.description}</span>
                  {a.time && (
                    <span className="assess-step-trail__time">Completed at {a.time} AM</span>
                  )}
                  <span className="assess-step-trail__status" style={{ color: s.color }}>
                    {s.label}
                  </span>
                  <span className="assess-step-trail__open">
                    View in student app →
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Understanding section ── */}
      <div className="assess-detail__section">
        <div className="assess-detail__section-label">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="var(--purple)" strokeWidth="1.4"/>
            <path d="M5.5 6C5.5 5.17 6.17 4.5 7 4.5s1.5.67 1.5 1.5c0 1-1.5 1.5-1.5 2.5" stroke="var(--purple)" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="7" cy="10" r=".6" fill="var(--purple)"/>
          </svg>
          Understanding
        </div>

        <div className="assess-understanding" style={{ background: understanding.bg, borderColor: understanding.color + '44' }}>
          <div className="assess-understanding__level" style={{ color: understanding.color }}>
            {understanding.level}
          </div>
          <p className="assess-understanding__desc">{understanding.desc}</p>
        </div>

        {/* Cool-down response */}
        {student.cdResponse && (
          <div className="assess-response">
            <span className="assess-response__label">Cool-Down response</span>
            <p className="assess-response__text">"{student.cdResponse}"</p>
          </div>
        )}

        {/* Teacher flag */}
        {student.note && (
          <div className="assess-detail__note">
            <div className="assess-detail__note-header">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#DC2626" strokeWidth="1.4"/>
                <path d="M7 4.5v3M7 9v.5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Flagged response
            </div>
            <p className="assess-detail__note-text">{student.note}</p>
          </div>
        )}
      </div>

      {/* Skill breakdown */}
      <div className="assess-detail__section">
        <div className="assess-detail__section-label">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="2" stroke="var(--amber)" strokeWidth="1.4"/>
            <path d="M4 8l2-2 2 1.5 2-3" stroke="var(--amber)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Skill Breakdown
        </div>
        <div className="assess-skills">
          {[
            { skill: 'Identifies tiling patterns', level: student.act1 === 'complete' ? 85 : student.act1 === 'needs-review' ? 50 : 0 },
            { skill: 'Compares area by coverage', level: student.act2 === 'complete' ? 80 : student.act2 === 'needs-review' ? 45 : 0 },
            { skill: 'Defines area in own words',  level: student.cd === 'complete' ? 90 : student.cd === 'needs-review' ? 35 : 0 },
          ].map((sk, i) => (
            <div key={i} className="assess-skill">
              <div className="assess-skill__header">
                <span className="assess-skill__name">{sk.skill}</span>
                <span className="assess-skill__pct" style={{ color: sk.level >= 70 ? 'var(--green)' : sk.level >= 40 ? 'var(--amber)' : 'var(--text-tertiary)' }}>
                  {sk.level > 0 ? `${sk.level}%` : '–'}
                </span>
              </div>
              <div className="assess-skill__bar">
                <div
                  className="assess-skill__fill"
                  style={{ width: `${sk.level}%`, background: sk.level >= 70 ? 'var(--green)' : sk.level >= 40 ? 'var(--amber)' : '#E5E7EB' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


export default function AssessMode() {
  const [selectedStudent, setSelectedStudent] = useState(STUDENTS[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = filterStatus === 'all'
    ? STUDENTS
    : STUDENTS.filter(s => [s.act1, s.act2, s.cd].some(st => st === filterStatus));

  return (
    <div className="assess-mode screen-enter">
      {/* Header */}
      <div className="assess-header">
        <div className="assess-header__left">
          <div>
            <h1 className="assess-header__title">
              Class Progress
              <span className="assess-header__lesson-name"> · Tiling the Plane</span>
            </h1>
            <p className="assess-header__sub">Today, April 29 · Lesson 1 of 36</p>
          </div>
          {/* Filter inline in header */}
          <div className="assess-filter">
            <span className="assess-filter__label">Show:</span>
            {['all', 'needs-review', 'in-progress', 'not-started'].map(f => (
              <button
                key={f}
                className={`assess-filter__btn ${filterStatus === f ? 'assess-filter__btn--active' : ''}`}
                onClick={() => setFilterStatus(f)}
              >
                {f === 'all' ? 'All students' : STATUS[f].label}
              </button>
            ))}
          </div>
        </div>
        <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="btn-ghost assess-header__launch">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M6 2H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V8M8 1h5v5M13 1L7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Student App
        </a>
      </div>

      <div className="assess-body">
        <div className="assess-grid-col">
          {/* Table */}
          <div className="assess-table-wrap card">
            <table className="assess-table">
              <thead>
                <tr>
                  <th className="assess-th assess-th--name">Student</th>
                  <th className="assess-th assess-th--progress">
                    <span className="assess-th-progress-labels">
                      <span>A1 · Which 3 Go Together?</span>
                      <span>A2 · Red, Green, Blue?</span>
                      <span>CD · What Is Area?</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(student => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    onSelect={setSelectedStudent}
                    selected={selectedStudent?.id === student.id}
                  />
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="assess-empty">No students match this filter</div>}
          </div>

          <div className="assess-legend">
            {Object.entries(BAR_FILL).map(([key, c]) => (
              <div key={key} className="assess-legend__item">
                <div className="assess-legend__swatch" style={{ background: key === 'not-started' ? 'var(--border)' : c.color }} />
                <span>{STATUS[key].label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="assess-detail-col">
          {selectedStudent
            ? <DetailPanel student={selectedStudent} onClose={() => setSelectedStudent(null)} />
            : (
              <div className="assess-detail-empty card">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="5" stroke="var(--border-strong)" strokeWidth="2"/>
                  <path d="M6 26c0-4.418 4.477-8 10-8s10 3.582 10 8" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>Select a student to see their progress and understanding</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
