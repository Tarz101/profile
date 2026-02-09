import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();

  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    return (
      <div className="app-content">
        <div className="empty-state">
          <div className="empty-state-icon">{'\u{1F50D}'}</div>
          <div className="empty-state-text">Module not found</div>
        </div>
      </div>
    );
  }

  const completedCount = module.lessons.filter(
    (l) => state.lessonProgress[l.id]?.completed
  ).length;

  return (
    <div className="app-content">
      <div className="module-detail-header">
        <button className="module-detail-back" onClick={() => navigate('/')}>
          {'\u{2190}'}
        </button>
        <div className="module-detail-icon">{module.icon}</div>
        <div className="module-detail-info">
          <div className="module-detail-title">{module.title}</div>
          <div className="module-detail-progress">
            {completedCount} / {module.lessons.length} lessons
          </div>
        </div>
      </div>

      {module.lessons.map((lesson, i) => {
        const progress = state.lessonProgress[lesson.id];
        const isCompleted = progress?.completed;

        return (
          <Link
            key={lesson.id}
            to={`/lesson/${moduleId}/${lesson.id}`}
            className={`lesson-card${isCompleted ? ' completed' : ''}`}
          >
            <div className="lesson-icon">{lesson.icon}</div>
            <div className="lesson-info">
              <div className="lesson-title">{lesson.title}</div>
              <div className="lesson-meta">
                +{lesson.xpReward} coins
                {isCompleted && progress.bestScore != null && ` \u00B7 Best: ${progress.bestScore}%`}
              </div>
            </div>
            <div className="lesson-status">
              {isCompleted ? '\u{2705}' : '\u{25B6}\u{FE0F}'}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
