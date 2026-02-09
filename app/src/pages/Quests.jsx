import { useApp } from '../context/AppContext';
import { dailyQuests } from '../data/modules';

export default function Quests() {
  const { state, dispatch } = useApp();

  return (
    <div className="app-content">
      <div className="page-header">
        <div className="page-title">Daily Quests</div>
        <div className="page-subtitle">Complete quests to earn gems</div>
      </div>

      {dailyQuests.map((quest) => {
        const current = state.questProgress[quest.id] || 0;
        const progress = Math.min(current / quest.target, 1) * 100;
        const canClaim = current >= quest.target && !state.questsClaimed[quest.id];
        const claimed = state.questsClaimed[quest.id];

        return (
          <div key={quest.id} className="quest-card">
            <div className="quest-header">
              <div className="quest-icon">{quest.icon}</div>
              <div className="quest-title">{quest.title}</div>
              <div className="quest-reward">+{quest.reward} {'\u{1F48E}'}</div>
            </div>
            <div className="quest-progress-bar">
              <div
                className="quest-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="quest-progress-text">
              {Math.min(current, quest.target)} / {quest.target}
            </div>
            {claimed ? (
              <div className="quest-claimed">Claimed!</div>
            ) : (
              <button
                className="quest-claim-btn"
                disabled={!canClaim}
                onClick={() =>
                  dispatch({
                    type: 'CLAIM_QUEST',
                    payload: { questId: quest.id, reward: quest.reward },
                  })
                }
              >
                {canClaim ? 'Claim Reward' : 'In Progress'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
