import PlanWeekView from './PlanWeekView.jsx';
import PlanLessonDetail from './PlanLessonDetail.jsx';
import './PlanMode.css';

export default function PlanMode({ view, onViewChange }) {
  return (
    <div className="plan-mode screen-enter">
      {view === 'week'
        ? <PlanWeekView onOpenLesson={() => onViewChange('lesson')} />
        : <PlanLessonDetail onBack={() => onViewChange('week')} />
      }
    </div>
  );
}
