import { useState } from 'react';
import TopNav from './components/TopNav.jsx';
import LessonContextBar from './components/LessonContextBar.jsx';
import AIChatPanel from './components/AIChatPanel.jsx';
import PlanMode from './components/plan/PlanMode.jsx';
import TeachMode from './components/teach/TeachMode.jsx';
import AssessMode from './components/assess/AssessMode.jsx';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('plan');
  const [chatOpen, setChatOpen] = useState(false);
  // Plan view state lifted here so it survives tab switches
  const [planView, setPlanView] = useState('week');

  return (
    <div className="app-shell">
      <TopNav activeMode={mode} onModeChange={setMode} onChatToggle={() => setChatOpen(o => !o)} chatOpen={chatOpen} />
      <LessonContextBar mode={mode} />
      <div className="app-body">
        <main className="app-main">
          {mode === 'plan'   && <PlanMode   view={planView} onViewChange={setPlanView} />}
          {mode === 'teach'  && <TeachMode  key="teach" />}
          {mode === 'assess' && <AssessMode key="assess" />}
        </main>
        {chatOpen && <AIChatPanel onClose={() => setChatOpen(false)} mode={mode} />}
      </div>
    </div>
  );
}
