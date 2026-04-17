import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';

const THEMES = ['Climate', 'Wildlife', 'Pollution', 'Water', 'Energy'];
const AGE_GROUPS = ['Kid', 'Teen', 'Adult'];

const FUNNY_WRONG_MESSAGES = [
  "Oops 😅 Even Earth facepalmed",
  "That answer needs recycling ♻️",
  "Nature is disappointed... but forgives you 🌍"
];

const CORRECT_MESSAGE = "Correct! 🌱 Earth approves your intelligence 😎";

export default function QuizPage() {
  const navigate = useNavigate();

  // Step state: 'selection', 'quiz', 'result'
  const [step, setStep] = useState('selection');
  
  // Selection state
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, message: string }
  const [isAnswered, setIsAnswered] = useState(false);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);

  // Progress state
  const [completedLevels, setCompletedLevels] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedLevels') || '{}');
    setCompletedLevels(saved);
  }, []);

  const getHighestUnlockedLevel = (theme) => {
    const completed = completedLevels[theme] || 0;
    return Math.min(completed + 1, 5);
  };

  // Initialize/Reset
  const startQuiz = () => {
    if (!selectedTheme || !selectedAge || !selectedLevel) return;

    // Filter questions by theme, age, AND level
    const filtered = questions.filter(q => 
      q.theme === selectedTheme && 
      q.ageGroup === selectedAge &&
      q.level === selectedLevel
    );

    // Pick 5 (or fewer if not available)
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setFeedback(null);
    setShowDidYouKnow(false);
    setStep('quiz');
  };

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;

    const currentQ = quizQuestions[currentIndex];
    const correct = optionIndex === currentQ.correctAnswer;

    setIsAnswered(true);
    setShowDidYouKnow(true);

    if (correct) {
      setScore(prev => prev + 10);
      setFeedback({ 
        isCorrect: true, 
        message: CORRECT_MESSAGE,
        points: "+10 Eco Points"
      });
    } else {
      const randomMsg = FUNNY_WRONG_MESSAGES[Math.floor(Math.random() * FUNNY_WRONG_MESSAGES.length)];
      setFeedback({ 
        isCorrect: false, 
        message: randomMsg,
        correctAnswerText: currentQ.options[currentQ.correctAnswer],
        explanation: currentQ.explanation,
        source: currentQ.source
      });
    }

    // Save used ID
    const usedIds = JSON.parse(localStorage.getItem('usedQuestionIds') || '[]');
    if (!usedIds.includes(currentQ.id)) {
      usedIds.push(currentQ.id);
      localStorage.setItem('usedQuestionIds', JSON.stringify(usedIds));
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setFeedback(null);
      setShowDidYouKnow(false);
    } else {
      // Save points to localStorage
      const totalPoints = parseInt(localStorage.getItem('ecoPoints') || '0') + score;
      localStorage.setItem('ecoPoints', totalPoints.toString());

      // Update completed levels
      if (score >= 30) { // Assume 3 out of 5 correct is a pass
        const currentCompleted = completedLevels[selectedTheme] || 0;
        if (selectedLevel > currentCompleted) {
          const newCompleted = { ...completedLevels, [selectedTheme]: selectedLevel };
          setCompletedLevels(newCompleted);
          localStorage.setItem('completedLevels', JSON.stringify(newCompleted));
        }
      }
      
      setStep('result');
    }
  };

  // UI Components
  if (step === 'selection') {
    const highestUnlocked = getHighestUnlockedLevel(selectedTheme);

    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>EcoVerse Adventures 🌍</h1>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>1. Choose a Theme:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {THEMES.map(t => (
              <button 
                key={t}
                onClick={() => {
                  setSelectedTheme(t);
                  setSelectedLevel(1); // Reset level on theme change
                }}
                style={{
                  padding: '10px 18px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  border: '2px solid #22c55e',
                  backgroundColor: selectedTheme === t ? '#22c55e' : 'white',
                  color: selectedTheme === t ? 'white' : '#22c55e',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>2. Choose Age Group:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {AGE_GROUPS.map(a => (
              <button 
                key={a}
                onClick={() => setSelectedAge(a)}
                style={{
                  padding: '10px 18px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  border: '2px solid #22c55e',
                  backgroundColor: selectedAge === a ? '#22c55e' : 'white',
                  color: selectedAge === a ? 'white' : '#22c55e',
                  cursor: 'pointer'
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {selectedTheme && (
          <div style={{ marginBottom: '30px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>3. Select Level:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5].map(lvl => {
                const isUnlocked = lvl <= highestUnlocked;
                return (
                  <button 
                    key={lvl}
                    disabled={!isUnlocked}
                    onClick={() => setSelectedLevel(lvl)}
                    style={{
                      width: '50px',
                      height: '50px',
                      fontSize: '18px',
                      borderRadius: '50%',
                      border: '2px solid #22c55e',
                      backgroundColor: !isUnlocked ? '#e2e8f0' : selectedLevel === lvl ? '#22c55e' : 'white',
                      color: !isUnlocked ? '#94a3b8' : selectedLevel === lvl ? 'white' : '#22c55e',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold'
                    }}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
            {!selectedTheme && <p style={{ color: '#64748b', marginTop: '8px' }}>Please select a theme first</p>}
          </div>
        )}

        <button 
          onClick={startQuiz}
          disabled={!selectedTheme || !selectedAge}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '22px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: (!selectedTheme || !selectedAge) ? '#cbd5e1' : '#22c55e',
            color: 'white',
            cursor: (!selectedTheme || !selectedAge) ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        >
          Start Level {selectedLevel}
        </button>
      </div>
    );
  }

  if (step === 'quiz') {
    const q = quizQuestions[currentIndex];
    return (
      <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '16px', color: '#64748b', display: 'block' }}>{selectedTheme} • Level {selectedLevel}</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>Question {currentIndex + 1}/{quizQuestions.length}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '16px', color: '#64748b', display: 'block' }}>Points</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '30px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((currentIndex + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100}%`, backgroundColor: '#22c55e', transition: 'width 0.3s' }}></div>
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', lineHeight: '1.4', marginBottom: '24px', color: '#1e293b' }}>{q.question}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.options.map((opt, idx) => {
              let btnStyle = {
                padding: '16px',
                fontSize: '20px',
                textAlign: 'left',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                backgroundColor: 'white',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s',
                color: '#334155'
              };

              if (isAnswered) {
                if (idx === q.correctAnswer) {
                  btnStyle.backgroundColor = '#dcfce7';
                  btnStyle.borderColor = '#22c55e';
                  btnStyle.color = '#166534';
                } else if (feedback && !feedback.isCorrect && idx !== q.correctAnswer) {
                   // Not the correct one
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  style={btnStyle}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {feedback && (
          <div style={{ 
            padding: '20px', 
            borderRadius: '16px', 
            marginBottom: '24px',
            backgroundColor: feedback.isCorrect ? '#dcfce7' : '#fee2e2',
            border: `1px solid ${feedback.isCorrect ? '#22c55e' : '#f87171'}`,
            animation: 'fadeIn 0.5s ease-in'
          }}>
            <p style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: feedback.isCorrect ? '#166534' : '#991b1b',
              margin: '0 0 8px 0',
              textAlign: 'center'
            }}>
              {feedback.message}
            </p>
            {feedback.isCorrect && (
              <p style={{ fontSize: '18px', color: '#166534', textAlign: 'center', margin: 0, fontWeight: 'bold' }}>
                {feedback.points}
              </p>
            )}
            {!feedback.isCorrect && (
              <div style={{ marginTop: '12px', borderTop: '1px solid #fecaca', paddingTop: '12px' }}>
                <p style={{ color: '#991b1b', margin: '0 0 8px 0' }}>
                  <strong>Correct Answer:</strong> {feedback.correctAnswerText}
                </p>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.5', margin: '0 0 8px 0' }}>
                  {feedback.explanation}
                </p>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Source: <em>{feedback.source}</em>
                </p>
              </div>
            )}
          </div>
        )}

        {showDidYouKnow && (
          <div style={{ 
            padding: '20px', 
            borderRadius: '16px', 
            marginBottom: '24px',
            backgroundColor: '#f0fdf4',
            borderLeft: '5px solid #22c55e',
            color: '#166534'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>💡 Did You Know?</h3>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5' }}>
              {q.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <button 
            onClick={nextQuestion}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '22px',
              fontWeight: 'bold',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: '#22c55e',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgb(34 197 94 / 0.3)'
            }}
          >
            {currentIndex + 1 < quizQuestions.length ? 'Continue' : 'See Results'}
          </button>
        )}
      </div>
    );
  }

  if (step === 'result') {
    const passed = score >= 30;
    const isLastLevel = selectedLevel === 5;

    return (
      <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>{passed ? 'Level Completed! 🏆' : 'Keep Trying! 💪'}</h1>
        <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '30px' }}>{selectedTheme} • Level {selectedLevel}</p>
        
        <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <p style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Your Score</p>
          <p style={{ fontSize: '64px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#22c55e' }}>{score}</p>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            {passed ? 'Amazing work! You are becoming a true Eco Warrior.' : 'Practice makes perfect. Review the explanations and try again!'}
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {passed && !isLastLevel && (
            <button 
              onClick={() => {
                setSelectedLevel(selectedLevel + 1);
                setStep('selection');
              }}
              style={{
                padding: '18px',
                fontSize: '22px',
                fontWeight: 'bold',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: '#22c55e',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Next Level
            </button>
          )}
          
          <button 
            onClick={() => {
              setStep('selection');
              setIsAnswered(false);
              setFeedback(null);
            }}
            style={{
              padding: '18px',
              fontSize: '22px',
              fontWeight: 'bold',
              borderRadius: '16px',
              border: '2px solid #22c55e',
              backgroundColor: 'white',
              color: '#22c55e',
              cursor: 'pointer'
            }}
          >
            Try Another Level
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '16px',
              fontSize: '18px',
              color: '#64748b',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return null;
}

