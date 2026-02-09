import { useApp } from '../context/AppContext';

export default function Leaderboard() {
  const { state } = useApp();

  // Merge user into leaderboard and sort
  const allEntries = [
    ...state.leaderboard,
    { name: state.userName, coins: state.coins, avatar: '\u{1F9D1}\u{200D}\u{1F4BC}', isSelf: true },
  ].sort((a, b) => b.coins - a.coins);

  return (
    <div className="app-content">
      <div className="page-header">
        <div className="page-title">Leaderboard</div>
        <div className="page-subtitle">Weekly ranking by coins earned</div>
      </div>

      <div className="leaderboard-list">
        {allEntries.map((entry, i) => (
          <div
            key={entry.name}
            className={`leaderboard-row${entry.isSelf ? ' self' : ''}`}
          >
            <div className="leaderboard-rank">
              {i === 0 ? '\u{1F947}' : i === 1 ? '\u{1F948}' : i === 2 ? '\u{1F949}' : i + 1}
            </div>
            <div className="leaderboard-avatar">{entry.avatar}</div>
            <div className="leaderboard-name">
              {entry.name} {entry.isSelf ? '(You)' : ''}
            </div>
            <div className="leaderboard-score">
              {entry.coins} {'\u{1FA99}'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
