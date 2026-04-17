import { useState } from 'react';
import ProgressBar from './components/ProgressBar.jsx';
import Activity1 from './components/Activity1.jsx';
import Activity2 from './components/Activity2.jsx';
import CoolDown from './components/CoolDown.jsx';
import CompletionScreen from './components/CompletionScreen.jsx';

export default function App() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});

  function handleComplete(activityKey, data) {
    setResponses(r => ({ ...r, [activityKey]: data }));
    setStep(s => s + 1);
  }

  return (
    <div className="lesson-shell">
      {step < 3 && <ProgressBar step={step} />}
      <div key={step} className="screen-enter">
        {step === 0 && <Activity1 onComplete={d => handleComplete('activity1', d)} />}
        {step === 1 && <Activity2 onComplete={d => handleComplete('activity2', d)} />}
        {step === 2 && <CoolDown  onComplete={d => handleComplete('cooldown', d)} />}
        {step === 3 && <CompletionScreen />}
      </div>
    </div>
  );
}
