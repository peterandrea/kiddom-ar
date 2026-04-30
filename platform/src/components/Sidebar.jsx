import './Sidebar.css';

const modes = [
  {
    id: 'plan',
    label: 'Plan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.3"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'teach',
    label: 'Teach',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6 8.5l2.5 2L11 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'assess',
    label: 'Assess',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      </svg>
    ),
  },
];

export default function Sidebar({ activeMode, onModeChange }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-mark">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#F25B44"/>
            <text x="16" y="21" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="-apple-system, sans-serif">K</text>
          </svg>
        </div>
        <span className="sidebar__logo-text">Kiddom</span>
      </div>

      {/* Lesson context */}
      <div className="sidebar__context">
        <p className="sidebar__context-label">Grade 6 · Unit 1</p>
        <p className="sidebar__context-title">Lesson 1: Tiling the Plane</p>
      </div>

      {/* Mode nav */}
      <nav className="sidebar__nav">
        {modes.map(m => (
          <button
            key={m.id}
            className={`sidebar__nav-item ${activeMode === m.id ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => onModeChange(m.id)}
          >
            <span className="sidebar__nav-icon">{m.icon}</span>
            <span className="sidebar__nav-label">{m.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom teacher info */}
      <div className="sidebar__teacher">
        <div className="sidebar__avatar">MT</div>
        <div>
          <p className="sidebar__teacher-name">Ms. Torres</p>
          <p className="sidebar__teacher-role">Period 3 · 28 students</p>
        </div>
      </div>
    </aside>
  );
}
