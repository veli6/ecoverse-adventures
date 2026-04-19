import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import questions from '../data/questions';
import { FiTrendingUp, FiStar, FiAward } from 'react-icons/fi';

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
  const auth = useAuth();
  
  // Safely get context values
  const currentUser = auth?.currentUser;
  const refreshUserData = auth?.refreshUserData;

  // Step state: 'selection', 'quiz', 'result'
  const [step, setStep] = useState('selection');
  
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [level, setLevel] = useState(1);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [isAnswered, setIsAnswered] = useState(false);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);

  // Progress state
  const [completedLevels, setCompletedLevels] = useState([]);
  const [trees, setTrees] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    const savedTrees = parseInt(localStorage.getItem('trees') || '0') || 0;
    const savedPoints = parseInt(localStorage.getItem('ecoPoints') || '0') || 0;
    setTrees(savedTrees);
    setEcoPoints(savedPoints);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedTheme && selectedAge) {
      const progress = JSON.parse(localStorage.getItem('ecoProgress') || '{}');
      const key = `${selectedTheme}_${selectedAge}`;
      const savedLevel = progress[key] || 1;
      setLevel(savedLevel);
      
      const savedCompleted = JSON.parse(localStorage.getItem(`completedLevels_${selectedTheme}_${selectedAge}`) || '[]');
      setCompletedLevels(savedCompleted);
    }
  }, [selectedTheme, selectedAge]);

  const startQuiz = () => {
    if (!selectedTheme || !selectedAge || !level) return;
    
    const filtered = (questions || []).filter(q => 
      q.theme === selectedTheme && 
      q.ageGroup === selectedAge &&
      q.level === level
    );

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
    if (isAnswered || !quizQuestions[currentIndex]) return;

    const currentQ = quizQuestions[currentIndex];
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
        correctAnswerText: currentQ.options[currentQ.correctAnswer],
        explanation: currentQ.explanation,
        source: currentQ.source
      });
    }

    const usedIds = JSON.parse(localStorage.getItem('usedQuestionIds') || '[]');
    if (!usedIds.includes(currentQ.id)) {
      usedIds.push(currentQ.id);
      localStorage.setItem('usedQuestionIds', JSON.stringify(usedIds));
    }
  };

  const nextQuestion = async () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setFeedback(null);
      setShowDidYouKnow(false);
    } else {
      // End of Quiz
      if (currentUser && db) {
        try {
          const userDoc = doc(db, 'users', currentUser.uid);
          await updateDoc(userDoc, {
            ecoPoints: increment(score),
            treesCollected: increment(Math.floor(score / 50))
          });
          if (refreshUserData) await refreshUserData();
        } catch (err) {
          console.error("Firestore sync failed:", err);
        }
      }

      const totalPoints = (parseInt(localStorage.getItem('ecoPoints') || '0') || 0) + score;
      localStorage.setItem('ecoPoints', totalPoints.toString());
      setEcoPoints(totalPoints);
      
      const totalTrees = Math.floor(totalPoints / 100) || 0;
      localStorage.setItem('trees', totalTrees.toString());
      setTrees(totalTrees);

      if (score >= 30) { 
        // 1. Update theme-specific progress (for unlocking next level)
        const key = `${selectedTheme}_${selectedAge}`;
        const savedThemeProgress = JSON.parse(localStorage.getItem(`completedLevels_${key}`) || '[]');
        if (!savedThemeProgress.includes(level)) {
          const newThemeProgress = [...savedThemeProgress, level];
          setCompletedLevels(newThemeProgress);
          localStorage.setItem(`completedLevels_${key}`, JSON.stringify(newThemeProgress));
        }

        // 2. Update global completedLevels (for Dashboard stats)
        const globalKey = 'completedLevels';
        const globalProgress = JSON.parse(localStorage.getItem(globalKey) || '[]');
        const levelIdentifier = `${selectedTheme}_${selectedAge}_${level}`;
        if (!globalProgress.includes(levelIdentifier)) {
          globalProgress.push(levelIdentifier);
          localStorage.setItem(globalKey, JSON.stringify(globalProgress));
        }
      }

      const progress = JSON.parse(localStorage.getItem('ecoProgress') || '{}');
      const key = `${selectedTheme}_${selectedAge}`;
      const currentUnlocked = progress[key] || 1;
      
      if (level === currentUnlocked) {
        const nextLevel = Math.min(currentUnlocked + 1, 5);
        progress[key] = nextLevel;
        localStorage.setItem('ecoProgress', JSON.stringify(progress));
        setLevel(nextLevel);
      }
      
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
              {[1, 2, 3, 4, 5].map(lvl => (
                <button key={lvl} onClick={() => setLevel(lvl)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #22c55e', backgroundColor: level === lvl ? '#22c55e' : 'white', color: level === lvl ? 'white' : '#22c55e' }}>{lvl}</button>
              ))}
            </div>
          </div>
        )}
        <button onClick={startQuiz} disabled={!selectedTheme || !selectedAge} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold' }}>Start Quiz</button>
      </div>
    );
  }

  if (step === 'quiz') {
    const q = quizQuestions[currentIndex];
    if (!q) return <div style={{ padding: '40px', textAlign: 'center' }}>No questions found.</div>;
    return (
      <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <p style={{ color: '#64748b' }}>{selectedTheme} • Level {level}</p>
          <p style={{ fontWeight: 'bold', color: '#22c55e' }}>Question {currentIndex + 1}/5</p>
        </div>
        
        <h2 style={{ fontSize: '24px', marginBottom: '24px', lineHeight: '1.4' }}>{q.question}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {q.options.map((opt, idx) => {
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
            {currentIndex + 1 < quizQuestions.length ? 'Next Question' : 'See My Results'}
          </button>
        )}
      </div>
    );
  }

  if (step === 'result') {
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
            {getCityElements(ecoPoints).map((el, i) => (
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

  return null;
}
