import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';

const THEMES = ['Climate', 'Wildlife', 'Pollution'];
const AGE_GROUPS = ['Kid', 'Teen', 'Adult'];

export default function QuizPage() {
  const navigate = useNavigate();

  // Step state: 'selection', 'quiz', 'result'
  const [step, setStep] = useState('selection');
  
  // Selection state
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, message: string }
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize/Reset
  const startQuiz = () => {
    if (!selectedTheme || !selectedAge) return;

    // Get used IDs from localStorage
    const usedIds = JSON.parse(localStorage.getItem('usedQuestionIds') || '[]');

    // Filter questions
    const filtered = questions.filter(q => 
      q.theme === selectedTheme && 
      q.ageGroup === selectedAge &&
      !usedIds.includes(q.id)
    );

    // If no unused questions left, reset used IDs for this specific set or just allow repeats
    // For this requirement, we'll try to get at least 5 or as many as possible
    let pool = filtered;
    if (pool.length === 0) {
      pool = questions.filter(q => q.theme === selectedTheme && q.ageGroup === selectedAge);
    }

    // Shuffle and pick 5
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStep('quiz');
  };

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;

    const currentQ = quizQuestions[currentIndex];
    const correct = optionIndex === currentQ.correctAnswer;

    setIsAnswered(true);
    if (correct) {
      setScore(prev => prev + 10);
      setFeedback({ isCorrect: true, message: "Correct 🌱" });
    } else {
      setFeedback({ 
        isCorrect: false, 
        message: `Wrong 😅. Correct: ${currentQ.options[currentQ.correctAnswer]}` 
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
    } else {
      // Save points to localStorage
      const totalPoints = parseInt(localStorage.getItem('ecoPoints') || '0') + score;
      localStorage.setItem('ecoPoints', totalPoints.toString());
      setStep('result');
    }
  };

  // UI Components
  if (step === 'selection') {
    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Start Your Quiz 🌍</h1>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Choose a Theme:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {THEMES.map(t => (
              <button 
                key={t}
                onClick={() => setSelectedTheme(t)}
                style={{
                  padding: '12px 24px',
                  fontSize: '20px',
                  borderRadius: '8px',
                  border: '2px solid #22c55e',
                  backgroundColor: selectedTheme === t ? '#22c55e' : 'white',
                  color: selectedTheme === t ? 'white' : '#22c55e',
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Choose Age Group:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {AGE_GROUPS.map(a => (
              <button 
                key={a}
                onClick={() => setSelectedAge(a)}
                style={{
                  padding: '12px 24px',
                  fontSize: '20px',
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

        <button 
          onClick={startQuiz}
          disabled={!selectedTheme || !selectedAge}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '24px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: (!selectedTheme || !selectedAge) ? '#cbd5e1' : '#22c55e',
            color: 'white',
            cursor: (!selectedTheme || !selectedAge) ? 'not-allowed' : 'pointer'
          }}
        >
          Start Quiz!
        </button>
      </div>
    );
  }

  if (step === 'quiz') {
    const q = quizQuestions[currentIndex];
    return (
      <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ fontSize: '20px', color: '#64748b' }}>Theme: {selectedTheme}</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>Question {currentIndex + 1} / {quizQuestions.length}</span>
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '26px', lineHeight: '1.4', marginBottom: '20px' }}>{q.question}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                style={{
                  padding: '16px',
                  fontSize: '22px',
                  textAlign: 'left',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  backgroundColor: isAnswered && idx === q.correctAnswer ? '#dcfce7' : 'white',
                  borderColor: isAnswered && idx === q.correctAnswer ? '#22c55e' : '#e2e8f0',
                  cursor: isAnswered ? 'default' : 'pointer'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div style={{ 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '24px',
            fontSize: '22px',
            fontWeight: 'bold',
            backgroundColor: feedback.isCorrect ? '#dcfce7' : '#fee2e2',
            color: feedback.isCorrect ? '#166534' : '#991b1b',
            textAlign: 'center'
          }}>
            {feedback.message}
          </div>
        )}

        {isAnswered && (
          <button 
            onClick={nextQuestion}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '22px',
              fontWeight: 'bold',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#22c55e',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {currentIndex + 1 < quizQuestions.length ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>Quiz Finished! 🎉</h1>
        <p style={{ fontSize: '28px', marginBottom: '40px' }}>
          You earned <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{score}</span> Eco Points!
        </p>
        
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '16px 40px',
            fontSize: '24px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#22c55e',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return null;
}
