import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'hustle-finance-progress';

const defaultState = {
  userName: 'Entrepreneur',
  coins: 0,
  streak: 0,
  hearts: 5,
  gems: 3,
  lessonsCompleted: 0,
  lastActiveDate: null,
  lessonProgress: {},
  // lessonProgress: { [lessonId]: { completed: bool, stepsCompleted: number, bestScore: number } }
  questProgress: {
    'complete-lesson': 0,
    'earn-xp': 0,
  },
  questsClaimed: {},
  leaderboard: [
    { name: 'Amara K.', coins: 340, avatar: '👩🏾‍💼' },
    { name: 'Devon R.', coins: 285, avatar: '👨🏽‍💻' },
    { name: 'Priya M.', coins: 260, avatar: '👩🏽‍🎨' },
    { name: 'Jamal W.', coins: 195, avatar: '👨🏿‍🔧' },
    { name: 'Rosa L.', coins: 150, avatar: '👩🏻‍🍳' },
  ],
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    // ignore
  }
  return defaultState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, userName: action.payload };

    case 'COMPLETE_STEP': {
      const { lessonId, stepIndex, correct } = action.payload;
      const prev = state.lessonProgress[lessonId] || { completed: false, stepsCompleted: 0, bestScore: 0, correctAnswers: 0 };
      const stepsCompleted = Math.max(prev.stepsCompleted, stepIndex + 1);
      const correctAnswers = correct ? (prev.correctAnswers || 0) + 1 : (prev.correctAnswers || 0);
      return {
        ...state,
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: { ...prev, stepsCompleted, correctAnswers },
        },
      };
    }

    case 'COMPLETE_LESSON': {
      const { lessonId, xpEarned, score } = action.payload;
      const prev = state.lessonProgress[lessonId] || { completed: false, stepsCompleted: 0, bestScore: 0 };
      return {
        ...state,
        coins: state.coins + xpEarned,
        lessonsCompleted: prev.completed ? state.lessonsCompleted : state.lessonsCompleted + 1,
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: {
            ...prev,
            completed: true,
            bestScore: Math.max(prev.bestScore || 0, score),
          },
        },
        questProgress: {
          ...state.questProgress,
          'complete-lesson': prev.completed
            ? state.questProgress['complete-lesson']
            : (state.questProgress['complete-lesson'] || 0) + 1,
          'earn-xp': (state.questProgress['earn-xp'] || 0) + xpEarned,
        },
      };
    }

    case 'LOSE_HEART':
      return { ...state, hearts: Math.max(0, state.hearts - 1) };

    case 'CLAIM_QUEST': {
      const { questId, reward } = action.payload;
      return {
        ...state,
        gems: state.gems + reward,
        questsClaimed: { ...state.questsClaimed, [questId]: true },
      };
    }

    case 'UPDATE_STREAK': {
      const today = new Date().toDateString();
      if (state.lastActiveDate === today) return state;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
      return { ...state, streak: newStreak, lastActiveDate: today };
    }

    case 'RESET_DAILY_QUESTS':
      return {
        ...state,
        questProgress: { 'complete-lesson': 0, 'earn-xp': 0 },
        questsClaimed: {},
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_STREAK' });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
