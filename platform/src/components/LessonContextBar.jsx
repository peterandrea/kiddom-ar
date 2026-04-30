import './LessonContextBar.css';

const MODE_CONFIG = {
  plan:   { label: 'Plan',   color: 'purple' },
  teach:  { label: 'Teach',  color: 'coral'  },
  assess: { label: 'Assess', color: 'teal'   },
};

export default function LessonContextBar({ mode }) {
  const m = MODE_CONFIG[mode];

  return (
    <div className="lesson-ctx">
      <div className="lesson-ctx__left">
        <span className={`lesson-ctx__mode-badge lesson-ctx__mode-badge--${m.color}`}>{m.label}</span>
        <div className="lesson-ctx__breadcrumb">
          <span className="lesson-ctx__crumb lesson-ctx__crumb--link">Grade 6</span>
          <span className="lesson-ctx__sep">›</span>
          <span className="lesson-ctx__crumb lesson-ctx__crumb--link">Unit 1: Area and Surface Area</span>
          <span className="lesson-ctx__sep">›</span>
          <span className="lesson-ctx__crumb lesson-ctx__crumb--current">Lesson 1: Tiling the Plane</span>
        </div>
      </div>

      <div className="lesson-ctx__right">
        <button className="lesson-ctx__nav-btn">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Prev lesson
        </button>
        <div className="lesson-ctx__pip" />
        <button className="lesson-ctx__nav-btn">
          Next lesson
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
