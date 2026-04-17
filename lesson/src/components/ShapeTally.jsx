import { useEffect, useRef } from 'react';
import './ShapeTally.css';

function TallyChip({ color, label, count, swatchColor }) {
  const countRef = useRef(null);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current && countRef.current) {
      countRef.current.classList.remove('tally-chip__count--bump');
      // Force reflow so the animation re-triggers
      void countRef.current.offsetWidth;
      countRef.current.classList.add('tally-chip__count--bump');
      setTimeout(() => {
        countRef.current?.classList.remove('tally-chip__count--bump');
      }, 220);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <div className="tally-chip" aria-label={`${count} ${label} shapes selected`}>
      <span className="tally-chip__swatch" style={{ background: swatchColor }} />
      <span className="tally-chip__name">{label}</span>
      <span className="tally-chip__count" ref={countRef}>{count}</span>
    </div>
  );
}

export default function ShapeTally({ counts }) {
  return (
    <div className="tally-bar">
      <span className="tally-bar__label">Shapes selected:</span>
      <div className="tally-bar__chips">
        {counts.red   !== undefined && <TallyChip color="red"   label="Red"   count={counts.red}   swatchColor="var(--red-block)"   />}
        {counts.blue  !== undefined && <TallyChip color="blue"  label="Blue"  count={counts.blue}  swatchColor="var(--blue-block)"  />}
        {counts.green !== undefined && <TallyChip color="green" label="Green" count={counts.green} swatchColor="var(--green-block)" />}
      </div>
    </div>
  );
}
