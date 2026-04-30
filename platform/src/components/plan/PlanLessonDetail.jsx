import './PlanLessonDetail.css';

const STANDARDS = [
  {
    code: '6.G.A.1',
    full: 'Find the area of right triangles, other triangles, special quadrilaterals, and polygons by composing into rectangles or decomposing into triangles and other shapes; apply these techniques in the context of solving real-world and mathematical problems.',
    cluster: 'Solve real-world and mathematical problems involving area, surface area, and volume.',
  },
];

const VOCAB = [
  { term: 'tiling',  def: 'Covering a plane with copies of a shape with no gaps or overlaps.' },
  { term: 'area',    def: 'The number of square units that cover a two-dimensional region.' },
  { term: 'plane',   def: 'A flat, two-dimensional surface that extends in all directions.' },
];

const GOALS = [
  'Describe observations about which shapes tile and which do not.',
  'Generalize that a shape tiles the plane when it can cover a surface with no gaps or overlaps.',
  'Connect tiling to the concept of area as the measure of a 2-D region.',
];

const ACTIVITIES = [
  {
    id: 'warmup', type: 'Warm-Up', typeColor: 'teal', time: '5 min',
    title: "Which One Doesn't Belong?",
    studentFacing: "Which one doesn't belong? Be ready to explain your reasoning.",
    materials: ['Projector / display'],
    launch: "Display four shapes: a regular hexagon, a square, an equilateral triangle, and a regular pentagon. Ask: 'Which one doesn't belong? Be ready to share your reasoning.'",
    facilitation: [
      'Give students 1–2 minutes of quiet think time.',
      'Share with a partner, then take 2–3 whole-class responses.',
      'Accept all answers — every shape can be justified.',
    ],
    synthesis: "Validate multiple perspectives. Preview: 'Today we'll explore which shapes can cover a flat surface perfectly.'",
  },
  {
    id: 'activity1', type: 'Activity 1', typeColor: 'purple', time: '15 min',
    title: 'Which 3 Go Together?',
    studentFacing: 'Look at the four pattern cards. Which three go together? Explain your reasoning.',
    materials: ['Student activity pages (printed or digital)'],
    launch: "Show four tiling pattern cards. 'Three of these patterns share something important. Discuss with your partner: which three go together, and why?'",
    facilitation: [
      "Groups of 2. Press: 'What makes these three the same? What's different about the fourth?'",
      "If students only notice visuals, ask: 'Could this pattern go on forever with no holes?'",
      "Listen for: 'no gaps,' 'fits together,' 'covers the whole thing.'",
    ],
    synthesis: "Introduce tiling: covering a plane with no gaps and no overlaps. Hexagons, triangles, and squares tile the plane. Pentagons leave gaps — they do not tile.",
  },
  {
    id: 'activity2', type: 'Activity 2', typeColor: 'amber', time: '15 min',
    title: 'More Red, Green, or Blue?',
    studentFacing: 'In Pattern A, does red or green cover more? In Pattern B, does blue or green cover more? How do you know?',
    materials: [
      'Pattern blocks (per pair): 6 hexagons, 6 triangles, 6 squares, 6 rhombuses, 6 trapezoids',
      'Blank paper (1 sheet per student)',
      'Student activity pages',
    ],
    launch: "Display Pattern A and B. 'In each pattern, which color covers more of the surface — or are they equal?'",
    facilitation: [
      'Students build both patterns with physical pattern blocks.',
      "Key question: 'Does counting more shapes mean more area? Why or why not?'",
      'Key insight: one trapezoid = 3 triangles in area; one rhombus = 2 triangles.',
    ],
    synthesis: "'Counting shapes isn't enough — we also need to know how big each shape is. That's what area is about.'",
  },
  {
    id: 'cooldown', type: 'Cool-Down', typeColor: 'coral', time: '5 min',
    title: 'What Is Area?',
    studentFacing: 'Think about your work today. Write your best definition of "area."',
    materials: ['Student activity pages'],
    launch: null,
    facilitation: [
      'Students write independently for 3–4 minutes.',
      'Collect responses to assess understanding before Lesson 2.',
    ],
    synthesis: 'Use responses to form groups for the next lesson\'s decomposing activity.',
  },
];

const TEACHER_NOTES = [
  { heading: 'Anticipate', color: 'amber', body: 'Students may focus on visual aesthetics rather than mathematical structure. Guide them toward the coverage language: gaps, overlaps, fitting perfectly.' },
  { heading: 'Common Misconception', color: 'red', body: 'Students often think more shapes = more area covered. The trapezoid–triangle comparison is pivotal: push them to reason about size, not count.' },
  { heading: 'Differentiation', color: 'teal', body: 'Extending: Ask students to investigate whether a regular pentagon can tile the plane. Struggling: Provide physical pattern blocks and have students trace to directly compare.' },
];

function ActivityCard({ act }) {
  return (
    <div className="detail-activity card">
      <div className="detail-activity__header">
        <div className="detail-activity__meta">
          <span className={`tag detail-tag detail-tag--${act.typeColor}`}>{act.type}</span>
          <span className="detail-activity__time">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M6 3.5v2.5l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {act.time}
          </span>
        </div>
        <h3 className="detail-activity__title">{act.title}</h3>
      </div>

      {/* Student prompt */}
      <div className="detail-activity__student-prompt">
        <span className="detail-prompt-label">Student prompt</span>
        <p className="detail-prompt-text">"{act.studentFacing}"</p>
      </div>

      {/* Materials */}
      {act.materials && act.materials.length > 0 && (
        <div className="detail-activity__materials">
          <span className="detail-section-label">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 2.5h9v8a2 2 0 01-2 2h-5a2 2 0 01-2-2v-8z" stroke="var(--teal)" strokeWidth="1.3"/>
              <path d="M4.5 6h5M4.5 8.5h3" stroke="var(--teal)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Materials
          </span>
          <ul className="detail-materials-list">
            {act.materials.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      )}

      {/* Launch */}
      {act.launch && (
        <div className="detail-activity__section">
          <span className="detail-section-label">
            <span className="detail-dot detail-dot--coral" /> Launch
          </span>
          <p className="detail-section-body">{act.launch}</p>
        </div>
      )}

      {/* Facilitation */}
      <div className="detail-activity__section">
        <span className="detail-section-label">
          <span className="detail-dot detail-dot--blue" /> Facilitation
        </span>
        <ul className="detail-bullets">
          {act.facilitation.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      {/* Synthesis */}
      <div className="detail-activity__section">
        <span className="detail-section-label">
          <span className="detail-dot detail-dot--green" /> Synthesis
        </span>
        <p className="detail-section-body">{act.synthesis}</p>
      </div>
    </div>
  );
}

export default function PlanLessonDetail({ onBack }) {
  return (
    <div className="plan-detail screen-enter">
      {/* Back nav */}
      <div className="plan-detail__topbar">
        <button className="plan-detail__back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Week view
        </button>
        <div className="plan-detail__lesson-id">
          <span className="tag detail-tag detail-tag--neutral">Unit 1 · Lesson 1</span>
          <span className="tag detail-tag detail-tag--neutral">Tue, Apr 29 · Today</span>
        </div>
      </div>

      <div className="plan-detail__content">
        {/* Lesson title */}
        <div className="plan-detail__hero">
          <h1 className="plan-detail__title">Tiling the Plane</h1>
          <div className="plan-detail__meta-row">
            <span className="tag detail-tag detail-tag--neutral">Grade 6</span>
            <span className="tag detail-tag detail-tag--neutral">45 min</span>
            {STANDARDS.map(s => (
              <span key={s.code} className="tag detail-tag detail-tag--coral">{s.code}</span>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <section className="detail-section card">
          <h2 className="detail-section__heading">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="var(--coral)" strokeWidth="1.5"/>
              <path d="M5 8.5l2 2 4-4" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Learning Goals
          </h2>
          <ul className="detail-goals">
            {GOALS.map((g, i) => (
              <li key={i} className="detail-goals__item">
                <span className="detail-goals__num">{i + 1}</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Standards */}
        <section className="detail-section card">
          <h2 className="detail-section__heading">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--teal)" strokeWidth="1.5"/>
              <path d="M5 8h6M5 5.5h6M5 10.5h4" stroke="var(--teal)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Standards Covered
          </h2>
          {STANDARDS.map(s => (
            <div key={s.code} className="detail-standard">
              <div className="detail-standard__code">{s.code}</div>
              <div>
                <p className="detail-standard__cluster">{s.cluster}</p>
                <p className="detail-standard__full">{s.full}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Vocabulary */}
        <section className="detail-section card">
          <h2 className="detail-section__heading">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="var(--purple)" strokeWidth="1.5"/>
              <path d="M5 6h6M5 8.5h4" stroke="var(--purple)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Vocabulary
          </h2>
          <div className="detail-vocab">
            {VOCAB.map(v => (
              <div key={v.term} className="detail-vocab__item">
                <strong className="detail-vocab__term">{v.term}</strong>
                <p className="detail-vocab__def">{v.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <h2 className="detail-activities-heading">Lesson Activities</h2>
        <div className="detail-activities-list">
          {ACTIVITIES.map(act => (
            <ActivityCard key={act.id} act={act} />
          ))}
        </div>

        {/* Teacher Notes */}
        <section className="detail-section card">
          <h2 className="detail-section__heading">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="2.5" stroke="var(--amber)" strokeWidth="1.5"/>
              <path d="M3 13c0-2.21 2.239-4 5-4s5 1.79 5 4" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Teacher Notes
          </h2>
          <div className="detail-notes">
            {TEACHER_NOTES.map(n => (
              <div key={n.heading} className={`detail-note detail-note--${n.color}`}>
                <strong className="detail-note__heading">{n.heading}</strong>
                <p className="detail-note__body">{n.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
