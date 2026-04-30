import './PlanWeekView.css';

const WEEK = [
  {
    day: 'Mon', date: 'Apr 28', status: 'past',
    lesson: { num: null, title: 'Unit 0 Review & Pre-Assessment', unit: 'Unit 0', standards: ['5.NF.B.4'], activities: 3, duration: '45 min', pct: 100 },
  },
  {
    day: 'Tue', date: 'Apr 29', status: 'today',
    lesson: { num: 1, title: 'Tiling the Plane', unit: 'Unit 1', standards: ['6.G.A.1'], activities: 4, duration: '45 min', pct: 0 },
  },
  {
    day: 'Wed', date: 'Apr 30', status: 'upcoming',
    lesson: { num: 2, title: 'Finding Area by Decomposing and Rearranging', unit: 'Unit 1', standards: ['6.G.A.1'], activities: 3, duration: '45 min', pct: 0 },
  },
  {
    day: 'Thu', date: 'May 1', status: 'upcoming',
    lesson: { num: 3, title: 'Reasoning about Area', unit: 'Unit 1', standards: ['6.G.A.1', '6.G.A.3'], activities: 3, duration: '45 min', pct: 0 },
  },
  {
    day: 'Fri', date: 'May 2', status: 'upcoming',
    lesson: { num: 4, title: 'Parallelograms', unit: 'Unit 1', standards: ['6.G.A.1'], activities: 4, duration: '45 min', pct: 0 },
  },
];

function ProgressRing({ pct, size = 26 }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth="2.5"/>
      {pct > 0 && (
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--green)" strokeWidth="2.5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"/>
      )}
    </svg>
  );
}

function DayCard({ entry, onOpenLesson }) {
  const { day, date, status, lesson } = entry;
  const isToday = status === 'today';
  const isPast = status === 'past';
  const isClickable = isToday;

  return (
    <div
      className={`day-card day-card--${status} ${isClickable ? 'day-card--clickable' : ''}`}
      onClick={isClickable ? onOpenLesson : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? e => e.key === 'Enter' && onOpenLesson() : undefined}
    >
      <div className="day-card__head">
        <div className="day-card__day-label">
          <span className="day-card__day">{day}</span>
          <span className="day-card__date">{date}</span>
        </div>
        {isToday && <span className="day-card__today-pip">Today</span>}
      </div>

      <div className="day-card__body">
        {lesson.num && (
          <span className="day-card__lesson-num">Lesson {lesson.num}</span>
        )}
        <p className="day-card__title">{lesson.title}</p>

        <div className="day-card__meta">
          {lesson.standards.map(s => (
            <span key={s} className="day-card__std">{s}</span>
          ))}
          <span className="day-card__dur">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M6 3.5v2.5l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {lesson.duration}
          </span>
          <span className="day-card__acts">{lesson.activities} activities</span>
        </div>
      </div>

      <div className="day-card__foot">
        {isPast && (
          <div className="day-card__progress-row">
            <ProgressRing pct={lesson.pct} />
            <span className="day-card__progress-label">Complete</span>
          </div>
        )}
        {isToday && (
          <div className="day-card__open-hint">
            Open lesson
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PlanWeekView({ onOpenLesson }) {
  return (
    <div className="week-view">
      <div className="week-view__header">
        <button className="week-nav-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Apr 21–25
        </button>
        <div className="week-view__title-block">
          <h2 className="week-view__title">Week of April 28 – May 2, 2026</h2>
          <p className="week-view__subtitle">Unit 1 · Area and Surface Area · 4 lessons planned</p>
        </div>
        <button className="week-nav-btn">
          May 5–9
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="week-view__grid">
        {WEEK.map(entry => (
          <DayCard key={entry.day} entry={entry} onOpenLesson={onOpenLesson} />
        ))}
      </div>
    </div>
  );
}
