import { useApp } from '../context/AppContext';

export default function StatsBar() {
  const { state } = useApp();

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-icon">{'\u{1F525}'}</span>
        <span>{state.streak}</span>
      </div>
      <div className="stat-item">
        <span className="stat-icon">{'\u{1FA99}'}</span>
        <span>{state.coins}</span>
      </div>
      <div className="stat-item">
        <span className="stat-icon">{'\u{1F48E}'}</span>
        <span>{state.gems}</span>
      </div>
      <div className="stat-item">
        <span className="stat-icon">{'\u2764\uFE0F'}</span>
        <span>{state.hearts}</span>
      </div>
    </div>
  );
}
