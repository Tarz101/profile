import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';
import StatsBar from '../components/StatsBar';

function getNextLesson(module, lessonProgress) {
  if (module.comingSoon) return null;
  for (const lesson of module.lessons) {
    const progress = lessonProgress[lesson.id];
    if (!progress || !progress.completed) return lesson;
  }
  return null;
}

function getModuleProgress(module, lessonProgress) {
  if (!module.lessons.length) return 0;
  const completed = module.lessons.filter(
    (l) => lessonProgress[l.id]?.completed
  ).length;
  return Math.round((completed / module.lessons.length) * 100);
}

export default function Home() {
  const { state } = useApp();

  // Find next incomplete lesson across all modules for the "continue" card
  let continueModule = null;
  let continueLesson = null;
  for (const mod of modules) {
    if (mod.comingSoon) continue;
    const next = getNextLesson(mod, state.lessonProgress);
    if (next) {
      continueModule = mod;
      continueLesson = next;
      break;
    }
  }

  return (
    <div className="app-content">
      <StatsBar />

      <div style={{ marginBottom: 8 }}>
        <div className="welcome-text">Welcome back,</div>
        <div className="welcome-name">{state.userName}</div>
      </div>

      {continueModule && continueLesson && (
        <Link
          to={`/lesson/${continueModule.id}/${continueLesson.id}`}
          className="continue-card"
        >
          <div>
            <div className="continue-label">Continue</div>
            <div className="continue-title">{continueModule.title}</div>
            <div className="continue-lesson">{continueLesson.title}</div>
          </div>
          <div className="continue-arrow">{'\u{2192}'}</div>
        </Link>
      )}

      {!continueModule && (
        <div className="continue-card" style={{ cursor: 'default' }}>
          <div>
            <div className="continue-label">All done!</div>
            <div className="continue-title">Module complete</div>
            <div className="continue-lesson">More modules coming soon</div>
          </div>
        </div>
      )}

      <div className="section-header">
        <div className="section-title">Modules</div>
      </div>

      {modules.map((mod) => {
        const progress = getModuleProgress(mod, state.lessonProgress);
        if (mod.comingSoon) {
          return (
            <div key={mod.id} className="module-card locked">
              <div
                className="module-icon"
                style={{ background: `${mod.color}20` }}
              >
                {mod.icon}
              </div>
              <div className="module-info">
                <div className="module-title">{mod.title}</div>
                <div className="module-subtitle">{mod.subtitle}</div>
              </div>
              <div className="module-tag">Soon</div>
            </div>
          );
        }

        return (
          <Link
            key={mod.id}
            to={`/module/${mod.id}`}
            className="module-card"
          >
            <div
              className="module-icon"
              style={{ background: `${mod.color}20` }}
            >
              {mod.icon}
            </div>
            <div className="module-info">
              <div className="module-title">{mod.title}</div>
              <div className="module-subtitle">{mod.subtitle}</div>
              {progress > 0 && (
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
            <div className="module-progress">
              {progress > 0 ? `${progress}%` : 'Start'}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
