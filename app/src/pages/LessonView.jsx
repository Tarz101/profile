import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';

function renderMarkdown(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function InfoStep({ step }) {
  return (
    <div className="step-info">
      <div className="step-info-title">{step.title}</div>
      <div className="step-info-body">
        {step.body.split('\n\n').map((paragraph, i) => (
          <p key={i} style={{ marginBottom: i < step.body.split('\n\n').length - 1 ? 12 : 0 }}>
            {renderMarkdown(paragraph)}
          </p>
        ))}
      </div>
    </div>
  );
}

function QuizStep({ step, onAnswer, answered, selectedIndex }) {
  const isCorrect = selectedIndex === step.correctIndex;

  return (
    <div className="step-quiz">
      <div className="quiz-question">{step.question}</div>
      <div className="quiz-options">
        {step.options.map((option, i) => {
          let className = 'quiz-option';
          if (answered) {
            if (i === step.correctIndex) className += ' correct';
            else if (i === selectedIndex) className += ' incorrect';
          } else if (i === selectedIndex) {
            className += ' selected';
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => onAnswer(i)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-label">
            {isCorrect ? 'Correct!' : 'Not quite.'}
          </div>
          <div>{step.explanation}</div>
        </div>
      )}
    </div>
  );
}

function LessonComplete({ score, totalQuizzes, xpEarned, onFinish }) {
  return (
    <div className="lesson-complete">
      <div className="lesson-complete-icon">{'\u{1F389}'}</div>
      <div className="lesson-complete-title">Lesson Complete!</div>
      <div className="lesson-complete-subtitle">
        You&apos;re building real financial knowledge.
      </div>
      <div className="lesson-complete-stats">
        <div className="complete-stat">
          <div className="complete-stat-value">{score}/{totalQuizzes}</div>
          <div className="complete-stat-label">Correct</div>
        </div>
        <div className="complete-stat">
          <div className="complete-stat-value">+{xpEarned}</div>
          <div className="complete-stat-label">Coins</div>
        </div>
        <div className="complete-stat">
          <div className="complete-stat-value">
            {totalQuizzes > 0 ? Math.round((score / totalQuizzes) * 100) : 100}%
          </div>
          <div className="complete-stat-label">Score</div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={onFinish}>
        Continue
      </button>
    </div>
  );
}

export default function LessonView() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const module = modules.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);

  const handleAnswer = useCallback(
    (index) => {
      if (answered) return;
      setSelectedAnswer(index);
      setAnswered(true);

      const step = lesson.steps[currentStep];
      const isCorrect = index === step.correctIndex;

      if (isCorrect) {
        setCorrectCount((c) => c + 1);
      } else {
        dispatch({ type: 'LOSE_HEART' });
      }

      dispatch({
        type: 'COMPLETE_STEP',
        payload: { lessonId, stepIndex: currentStep, correct: isCorrect },
      });
    },
    [answered, lesson, currentStep, lessonId, dispatch]
  );

  const handleNext = useCallback(() => {
    if (currentStep < lesson.steps.length - 1) {
      if (!answered && lesson.steps[currentStep].type === 'info') {
        dispatch({
          type: 'COMPLETE_STEP',
          payload: { lessonId, stepIndex: currentStep, correct: false },
        });
      }
      setCurrentStep((s) => s + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      const totalQuizzes = lesson.steps.filter((s) => s.type === 'quiz').length;
      const score = totalQuizzes > 0 ? Math.round((correctCount / totalQuizzes) * 100) : 100;
      dispatch({
        type: 'COMPLETE_LESSON',
        payload: { lessonId, xpEarned: lesson.xpReward, score },
      });
      setCompleted(true);
    }
  }, [currentStep, lesson, answered, correctCount, lessonId, dispatch]);

  if (!module || !lesson) {
    return (
      <div className="app-content">
        <div className="empty-state">
          <div className="empty-state-icon">{'\u{1F50D}'}</div>
          <div className="empty-state-text">Lesson not found</div>
        </div>
      </div>
    );
  }

  const totalQuizzes = lesson.steps.filter((s) => s.type === 'quiz').length;
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;
  const step = lesson.steps[currentStep];
  const canProceed = step.type === 'info' || answered;

  if (completed) {
    return (
      <div className="lesson-view">
        <LessonComplete
          score={correctCount}
          totalQuizzes={totalQuizzes}
          xpEarned={lesson.xpReward}
          onFinish={() => navigate(`/module/${moduleId}`)}
        />
      </div>
    );
  }

  if (state.hearts <= 0) {
    return (
      <div className="lesson-view">
        <div className="lesson-header">
          <button className="lesson-back" onClick={() => navigate(`/module/${moduleId}`)}>
            {'\u{2715}'}
          </button>
          <div className="lesson-progress-bar">
            <div className="lesson-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="lesson-hearts">{'\u2764\uFE0F'} 0</div>
        </div>
        <div className="no-hearts-overlay" style={{ position: 'relative', inset: 'auto', background: 'none', flex: 1 }}>
          <div className="no-hearts-modal">
            <div className="no-hearts-icon">{'\u{1F494}'}</div>
            <div className="no-hearts-title">Out of Hearts</div>
            <div className="no-hearts-text">
              Hearts refill over time. Come back later to continue learning.
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/module/${moduleId}`)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <button className="lesson-back" onClick={() => navigate(`/module/${moduleId}`)}>
          {'\u{2715}'}
        </button>
        <div className="lesson-progress-bar">
          <div className="lesson-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="lesson-hearts">{'\u2764\uFE0F'} {state.hearts}</div>
      </div>

      <div className="lesson-body">
        {step.type === 'info' && <InfoStep step={step} key={currentStep} />}
        {step.type === 'quiz' && (
          <QuizStep
            step={step}
            onAnswer={handleAnswer}
            answered={answered}
            selectedIndex={selectedAnswer}
            key={currentStep}
          />
        )}
      </div>

      <div className="lesson-footer">
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={step.type === 'quiz' && !canProceed}
        >
          {currentStep < lesson.steps.length - 1 ? 'Continue' : 'Finish'}
        </button>
      </div>
    </div>
  );
}
