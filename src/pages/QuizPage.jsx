import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import questionsData from '../data/questions';
import { FiTrendingUp, FiStar, FiAward } from 'react-icons/fi';
import { completeLevel, markQuestionUsed } from '../lib/userService';
import { useGame } from "../contexts/GameContext";
import { useParams } from "react-router-dom";



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
  const { isLevelUnlocked, isLevelCompleted } = useGame();
  const { currentUser, userData, refreshUserData } = useAuth();
  const { theme: routeTheme, level: routeLevel } = useParams();

  // Step state: 'selection', 'quiz', 'result'
  const [step, setStep] = useState('selection');

  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [level, setLevel] = useState(1);

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Progress state
  const [loading, setLoading] = useState(true);

  // Initial loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // If navigated via /quiz/:theme/:level, auto-configure and start
  useEffect(() => {
    if (!routeTheme || !routeLevel) return; // No route params = show selection screen

    const numLevel = Number(routeLevel);
    if (!numLevel || numLevel < 1 || numLevel > 5) return;

    if (!isLevelUnlocked(routeTheme.toLowerCase(), numLevel)) {
      navigate("/dashboard");
      return;
    }

    // Auto-configure from URL params
    setSelectedTheme(routeTheme.toLowerCase());
    setSelectedAge(userData?.selectedAgeGroup || 'Kid');
    setLevel(numLevel);
    setStep('quiz');
  }, [routeTheme, routeLevel, isLevelUnlocked, navigate, userData]);

  const startQuiz = async () => {
    if (!selectedTheme || !selectedAge || !level) return;

    console.log("Fetching questions...");
    setLoading(true);

    try {
      // 1. Normalize all keys before filtering
      const key = `${selectedTheme}_${selectedAge}`.toLowerCase();

      // 2. Ensure questions data keys are also accessed in lowercase
      const allQuestions = (questionsData || []).reduce((acc, q) => {
        const k = `${q.theme}_${q.ageGroup}`.toLowerCase();
        if (!acc[k]) acc[k] = [];
        acc[k].push(q);
        return acc;
      }, {});

      let filteredByCategory = allQuestions[key] || [];
      let filtered = filteredByCategory.filter(q => q.level === level);

      console.log("Questions:", questions);
      console.log("Filtered questions:", filtered);

      // Fallback: If no questions found, use default set
      if (filtered.length === 0) {
        console.warn(`No questions found for key: ${key} level: ${level}. Using fallback.`);
        const themeKey = selectedTheme.toLowerCase();
        filtered = (questionsData || []).filter(q => q.theme.toLowerCase() === themeKey).slice(0, 5);

        if (filtered.length === 0) {
          filtered = (questionsData || []).slice(0, 5);
        }
      }

      const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 5);

      setQuestions(shuffled || []);
      setCurrentQuestion(0);
      setScore(0);
      setIsAnswered(false);
      setFeedback(null);
      setShowDidYouKnow(false);
      setShowResult(false);
      setStep('quiz');
    } catch (error) {
      console.error("Quiz error:", error);
      // Fallback in case of error
      setQuestions((questionsData || []).slice(0, 5));
      setShowResult(false);
      setStep('quiz');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically start quiz if we navigated directly via URL params and questions are not loaded yet
    if (step === 'quiz' && questions.length === 0 && selectedTheme && selectedAge && level) {
      startQuiz();
    }
  }, [step, questions.length, selectedTheme, selectedAge, level]);

  const handleAnswer = async (optionIndex) => {

    try {
      if (isAnswered || !questions?.[currentQuestion]) return;

      const currentQ = questions[currentQuestion] || {};
      const correct = optionIndex === currentQ.correctAnswer;

      setIsAnswered(true);
      setShowDidYouKnow(true);

      if (correct) {
        setScore(prev => prev + 10);
        setFeedback({
          isCorrect: true,
          selectedIndex: optionIndex,
          message: CORRECT_MESSAGE,
          points: "+10 Eco Points",
          explanation: currentQ.explanation,
          source: currentQ.source
        });
      } else {
        const randomMsg = FUNNY_WRONG_MESSAGES[Math.floor(Math.random() * FUNNY_WRONG_MESSAGES.length)];
        setFeedback({
          isCorrect: false,
          selectedIndex: optionIndex,
          message: randomMsg,
          correctAnswerText: currentQ.options ? currentQ.options[currentQ.correctAnswer] : "Unknown",
          explanation: currentQ.explanation,
          source: currentQ.source
        });
      }

      if (currentUser && currentQ.id) {
        await markQuestionUsed(currentUser.uid, currentQ.id);
      }
    } catch (err) {
      console.error("Answer error:", err);
      // If something crashes in answer handling, ensure we can still move forward
      setShowResult(true);
    }
  };

  const nextQuestion = async () => {
    console.log("Questions:", questions);
    console.log("Current Index:", currentQuestion);
    console.log("Show Result:", showResult);

    if (currentQuestion + 1 < (questions?.length || 0)) {
      setCurrentQuestion(prev => prev + 1);
      setIsAnswered(false);
      setFeedback(null);
      setShowDidYouKnow(false);
    } else {
      // End of Quiz
      if (currentUser) {
        try {
          const stars = Math.ceil((score / 50) * 3); // 0-50 -> 0-3 stars
          await completeLevel(currentUser.uid, selectedTheme.toLowerCase(), level, stars, score);
          if (refreshUserData) await refreshUserData();
        } catch (err) {
          console.error("Firestore sync failed:", err);
        }
      }

      setShowResult(true);
      setStep('result');
    }
  };

  const getCityElements = (points) => {
    const elements = ["🌱"];
    const treeCount = Math.min(Math.floor(points / 100), 5); // Limit to 5 for safety
    for (let i = 0; i < treeCount; i++) {
      elements.push("🌳");
    }
    if (points >= 200) elements.push("🏡");
    if (points >= 300) elements.push("🌞");
    if (points >= 500) elements.push("🏢");
    return elements;
  };

  if (loading) {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading...</div>;
  }

  if (step === 'selection') {
    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <h1>EcoVerse Adventures 🌍</h1>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bold' }}>Choose Theme:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {THEMES.map(t => (
              <button key={t} onClick={() => setSelectedTheme(t)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #22c55e', backgroundColor: selectedTheme === t ? '#22c55e' : 'white', color: selectedTheme === t ? 'white' : '#22c55e' }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bold' }}>Choose Age:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {AGE_GROUPS.map(a => (
              <button key={a} onClick={() => setSelectedAge(a)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #22c55e', backgroundColor: selectedAge === a ? '#22c55e' : 'white', color: selectedAge === a ? 'white' : '#22c55e' }}>{a}</button>
            ))}
          </div>
        </div>
        {selectedTheme && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontWeight: 'bold' }}>Select Level:</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(lvl => {
                const unlocked = isLevelUnlocked(selectedTheme.toLowerCase(), lvl);
                const completed = isLevelCompleted(selectedTheme.toLowerCase(), lvl);
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      if (unlocked) {
                        setLevel(lvl);
                      } else {
                        alert(`Level ${lvl} is locked! Complete Level ${lvl - 1} first.`);
                      }
                    }}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: `2px solid ${!unlocked ? '#d1d5db' : level === lvl ? '#22c55e' : '#22c55e'}`,
                      backgroundColor: !unlocked ? '#f3f4f6' : level === lvl ? '#22c55e' : 'white',
                      color: !unlocked ? '#9ca3af' : level === lvl ? 'white' : '#22c55e',
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      position: 'relative',
                    }}
                  >
                    {!unlocked ? '🔒' : completed ? '✓' : lvl}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>Complete levels in order to unlock the next one.</p>
          </div>
        )}
        <button onClick={startQuiz} disabled={!selectedTheme || !selectedAge || !level} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: (!selectedTheme || !selectedAge || !level) ? '#94a3b8' : '#22c55e', color: 'white', fontWeight: 'bold', cursor: (!selectedTheme || !selectedAge || !level) ? 'not-allowed' : 'pointer' }}>Start Quiz</button>
      </div>
    );
  }

  if (step === 'quiz') {
    if (loading) {
      return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Quiz...</div>;
    }

    if (!questions || questions.length === 0) {
      return <div style={{ padding: '40px', textAlign: 'center' }}>No questions available</div>;
    }

    if (showResult || currentQuestion >= questions.length) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Quiz Completed</h2>
          <p>Your Score: {score}</p>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '8px' }}>Return to Dashboard</button>
        </div>
      );
    }

    const q = questions[currentQuestion] || {};
    if (!q || !q.question) return <div style={{ padding: '40px', textAlign: 'center' }}>Question loading error...</div>;
    if (!q) return <div style={{ padding: '40px', textAlign: 'center' }}>No questions found.</div>;
    return (
      <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <p style={{ color: '#64748b' }}>{selectedTheme} • Level {level}</p>
          <p style={{ fontWeight: 'bold', color: '#22c55e' }}>Question {currentQuestion + 1}/{questions?.length}</p>
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '24px', lineHeight: '1.4' }}>{q.question}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {(q.options || []).map((opt, idx) => {
            let bgColor = 'white';
            let borderColor = '#ddd';
            if (isAnswered) {
              if (idx === q.correctAnswer) {
                bgColor = '#dcfce7'; // Light green
                borderColor = '#22c55e';
              } else if (idx === feedback?.selectedIndex && !feedback?.isCorrect) {
                bgColor = '#fee2e2'; // Light red
                borderColor = '#f87171';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  borderRadius: '12px',
                  border: `2px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  fontSize: '18px',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: feedback.isCorrect ? '#f0fdf4' : '#fff1f2',
              border: `1px solid ${feedback.isCorrect ? '#22c55e' : '#f87171'}`,
              marginBottom: '20px'
            }}
          >
            <p style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: feedback.isCorrect ? '#166534' : '#991b1b',
              margin: '0 0 10px 0'
            }}>
              {feedback.message}
            </p>
            {!feedback.isCorrect && (
              <p style={{ color: '#991b1b', margin: '0 0 10px 0' }}>
                <strong>Correct Answer:</strong> {feedback.correctAnswerText}
              </p>
            )}
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.5', margin: '0 0 8px 0' }}>
              {feedback.explanation}
            </p>
            {feedback.source && (
              <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
                Source: {feedback.source}
              </p>
            )}
          </motion.div>
        )}

        {isAnswered && (
          <button
            onClick={nextQuestion}
            style={{
              padding: '18px',
              width: '100%',
              borderRadius: '12px',
              backgroundColor: '#22c55e',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.2)'
            }}
          >
            {currentQuestion + 1 < questions?.length ? 'Next Question' : 'See My Results'}
          </button>
        )}
      </div>
    );
  }

  if (showResult || step === 'result') {
    return (
      <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>
          {score >= 30 ? 'Level Cleared! 🏆' : 'Keep Learning! 🌱'}
        </h1>
        <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>{selectedTheme} • Level {level}</p>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '40px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          marginBottom: '40px'
        }}>
          <p style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#475569' }}>Your Score</p>
          <p style={{ fontSize: '72px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#166534' }}>
            {score}
          </p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>
            +{score} Eco Points Earned! 🌟
          </p>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '40px' }}>
            {getCityElements(score).map((el, i) => (
              <span key={i} title="Your City Assets">{el}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button
            onClick={() => navigate('/city')}
            style={{
              padding: '18px',
              backgroundColor: '#166534',
              color: 'white',
              borderRadius: '16px',
              border: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🏙️ View My Eco City
          </button>

          <button
            onClick={() => setStep('selection')}
            style={{
              padding: '18px',
              backgroundColor: 'white',
              color: '#22c55e',
              borderRadius: '16px',
              border: '2px solid #22c55e',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Play Another Level
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '15px',
              color: '#64748b',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '16px',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Fallback: should never reach here, but prevent blank screen
  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', fontFamily: 'sans-serif' }}>
      <p style={{ color: '#64748b' }}>Something went wrong.</p>
      <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Return to Dashboard
      </button>
    </div>
  );
}
