import { useState } from 'react';
import './CoolDown.css';

const MAX = 500;

export default function CoolDown({ onComplete }) {
  const [answer, setAnswer] = useState('');

  const canSubmit = answer.trim().length >= 5;

  return (
    <div className="cooldown">
      <p className="activity-label">Cool-Down · 5 min</p>
      <h1 className="activity-title">What is Area?</h1>

      <div className="cooldown__prompt card">
        <p className="cooldown__prompt-text">
          Think about your work today and write your best definition of <strong>area</strong>.
        </p>
      </div>

      <div className="cooldown__input-wrapper">
        <label className="cooldown__label" htmlFor="cooldown-answer">
          Your definition
        </label>
        <textarea
          id="cooldown-answer"
          className="cooldown__textarea"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Area is…"
          maxLength={MAX}
          rows={5}
        />
        <p className="cooldown__char-count">{answer.length} / {MAX}</p>
      </div>

      <button
        className="btn-primary"
        disabled={!canSubmit}
        onClick={() => onComplete({ answer })}
      >
        Submit
      </button>
    </div>
  );
}
