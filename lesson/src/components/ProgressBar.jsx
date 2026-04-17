import './ProgressBar.css';

const STEPS = ['Which 3?', 'Pattern Blocks', 'Cool-Down'];

export default function ProgressBar({ step }) {
  const progressPct = step === 0 ? '0%' : step === 1 ? '50%' : '100%';

  return (
    <nav className="progress-bar" aria-label="Lesson progress">
      <div className="progress-bar__track">
        <div className="progress-bar__rail" />
        <div className="progress-bar__fill" style={{ width: progressPct }} />
        {STEPS.map((label, i) => (
          <div
            key={i}
            className={[
              'progress-bar__node',
              i < step  ? 'progress-bar__node--done'   : '',
              i === step ? 'progress-bar__node--active' : '',
            ].join(' ')}
            aria-current={i === step ? 'step' : undefined}
            aria-label={`Step ${i + 1}: ${label}`}
          >
            {i < step ? '✓' : i + 1}
          </div>
        ))}
      </div>
      <div className="progress-bar__labels">
        {STEPS.map((label, i) => (
          <span
            key={i}
            className={['progress-bar__label', i === step ? 'progress-bar__label--active' : ''].join(' ')}
          >
            {label}
          </span>
        ))}
      </div>
    </nav>
  );
}
