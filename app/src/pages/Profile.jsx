import { useApp } from '../context/AppContext';

function getLevel(lessonsCompleted) {
  if (lessonsCompleted >= 10) return 5;
  if (lessonsCompleted >= 7) return 4;
  if (lessonsCompleted >= 4) return 3;
  if (lessonsCompleted >= 2) return 2;
  return 1;
}

export default function Profile() {
  const { state } = useApp();
  const level = getLevel(state.lessonsCompleted);

  return (
    <div className="app-content">
      <div className="profile-header">
        <div className="profile-avatar">{'\u{1F9D1}\u{200D}\u{1F4BC}'}</div>
        <div className="profile-name">{state.userName}</div>
        <div className="profile-level">Level {level}</div>
      </div>

      <div className="section-title" style={{ marginBottom: 4 }}>Statistics</div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">{'\u{1F525}'}</div>
          <div className="stat-card-value">{state.streak}</div>
          <div className="stat-card-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">{'\u{1FA99}'}</div>
          <div className="stat-card-value">{state.coins}</div>
          <div className="stat-card-label">Total Coins</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">{'\u{1F48E}'}</div>
          <div className="stat-card-value">{state.gems}</div>
          <div className="stat-card-label">Gems</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">{'\u{1F4AA}'}</div>
          <div className="stat-card-value">{state.lessonsCompleted}</div>
          <div className="stat-card-label">Lessons Done</div>
        </div>
      </div>
    </div>
  );
}
