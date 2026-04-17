import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { getLevelQuestions } from '../data/questions';
import { markQuestionUsed } from '../lib/userService';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiX, FiMessageCircle } from 'react-icons/fi';

function Confetti() {
  const colors = ['#22c55e','#4ade80','#facc15','#38bdf8','#f472b6','#a78bfa'];
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random()*100}%`, top: `-10px`,
          background: colors[i % colors.length],
          animationDelay: `${Math.random()*2}s`,
          transform: `rotate(${Math.random()*360}deg)`,
          width: `${6+Math.random()*8}px`, height: `${6+Math.random()*8}px`,
        }} />
      ))}
    </div>
  );
}

function StarDisplay({ count, size = 'text-5xl' }) {
  return (
    <div className="flex justify-center gap-3">
      {[1,2,3].map(s => (
        <span key={s} className={`${size} ${s <= count ? 'animate-celebrate-star text-yellow-400' : 'text-gray-300'}`}
          style={{ animationDelay: `${s * 0.2}s` }}>★</span>
      ))}
    </div>
  );
}

export default function QuizPage() {
  const { theme, level } = useParams();
  const lvl = parseInt(level);
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const { finishLevel, showLevelComplete, setShowLevelComplete, levelResults } = useGame();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const qs = getLevelQuestions(theme, lvl, userData?.usedQuestionIds || []);
    setQuestions(qs);
  }, [theme, lvl, userData?.usedQuestionIds]);

  const q = questions[current];

  const handleAnswer = useCallback(async (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.ans) {
      setScore(s => s + 10);
    }
    if (currentUser) {
      await markQuestionUsed(currentUser.uid, q.id);
    }
  }, [showResult, q, currentUser]);

  const handleNext = () => {
    setShowFact(false);
    setShowAI(false);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const totalPossible = questions.length * 10;
      const stars = score >= totalPossible ? 3 : score >= totalPossible * 0.6 ? 2 : 1;
      finishLevel(theme, lvl, stars, score);
      setFinished(true);
    }
  };

  if (!q) return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="earth-sphere mx-auto mb-6" style={{ width: 60, height: 60 }}></div>
        <p className="text-eco-600 font-semibold">Loading questions...</p>
      </div>
    </div>
  );

  // Level Complete Overlay
  if (showLevelComplete && levelResults) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <Confetti />
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }} className="text-center max-w-lg mx-auto px-6">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: 2, duration: 0.5 }}
            className="text-8xl mb-6">🎉</motion.div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Level {levelResults.level} Complete!</h1>
          <StarDisplay count={levelResults.stars} />
          <div className="eco-card p-6 mt-6 mb-6">
            <div className="flex justify-around">
              <div><p className="text-gray-500">Points Earned</p><p className="stat-number">{levelResults.pointsEarned}</p></div>
              <div><p className="text-gray-500">Stars</p><p className="stat-number">{levelResults.stars}/3</p></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {lvl < 5 && (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setShowLevelComplete(false); navigate(`/quiz/${theme}/${lvl + 1}`); window.location.reload(); }}
                className="eco-btn w-full py-5">
                Continue to Level {lvl + 1} →
              </motion.button>
            )}
            <button onClick={() => { setShowLevelComplete(false); navigate(`/levels/${theme}`); }}
              className="eco-btn-outline w-full py-4">
              Back to Level Map
            </button>
            <button onClick={() => { setShowLevelComplete(false); navigate('/dashboard'); }}
              className="text-gray-500 hover:text-gray-700 font-medium py-2 bg-transparent border-none">
              Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selected === q.ans;
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="page-container max-w-3xl mx-auto min-h-screen py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(`/levels/${theme}`)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 bg-transparent border-none p-0">
          <FiArrowLeft size={22} /> Exit
        </button>
        <span className="font-bold text-eco-600">Level {lvl} · Q{current + 1}/{questions.length}</span>
        <span className="font-bold text-eco-600">🌿 {score} pts</span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar h-3 mb-8">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
          <div className="eco-card p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">{q.q}</h2>
            <div className="grid gap-4">
              {q.opts.map((opt, idx) => {
                let cls = 'quiz-option';
                if (showResult && idx === q.ans) cls += ' quiz-option-correct';
                else if (showResult && idx === selected && idx !== q.ans) cls += ' quiz-option-wrong';
                return (
                  <motion.button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult}
                    className={cls} whileHover={!showResult ? { scale: 1.02 } : {}} whileTap={!showResult ? { scale: 0.98 } : {}}>
                    <span className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                      {showResult && idx === q.ans && <FiCheck className="ml-auto text-eco-500" size={24} />}
                      {showResult && idx === selected && idx !== q.ans && <FiX className="ml-auto text-red-500" size={24} />}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Correct / Wrong feedback */}
                <div className={`eco-card p-6 border-2 ${isCorrect ? 'border-eco-400 bg-eco-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    {isCorrect ? (
                      <><span className="text-3xl">✅</span><span className="text-xl font-bold text-eco-700">Correct! +10 points</span></>
                    ) : (
                      <><span className="text-3xl">❌</span><span className="text-xl font-bold text-red-600">{q.meme}</span></>
                    )}
                  </div>
                  <p className="text-gray-700">{q.exp}</p>
                  {!isCorrect && (
                    <button onClick={() => setShowAI(true)}
                      className="mt-3 flex items-center gap-2 text-eco-600 hover:text-eco-700 font-medium bg-transparent border-none p-0">
                      <FiMessageCircle size={20} /> Explain with AI 🤖
                    </button>
                  )}
                </div>

                {/* Did You Know */}
                {!showFact && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="eco-card p-6 border-2 border-eco-200 bg-gradient-to-r from-eco-50 to-leaf-50">
                    <p className="font-bold text-eco-700 mb-2">💡 Did You Know?</p>
                    <p className="text-gray-700">{q.fact}</p>
                  </motion.div>
                )}

                {/* AI Explanation Modal */}
                {showAI && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="eco-card p-6 border-2 border-indigo-200 bg-indigo-50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🤖</span>
                      <span className="text-xl font-bold text-indigo-700">Eco AI Assistant</span>
                    </div>
                    <p className="text-gray-700 mb-3">{q.exp}</p>
                    <p className="text-gray-700 mb-3">🌍 <strong>Real-world example:</strong> {q.fact}</p>
                    <p className="text-gray-700">🌱 <strong>What you can do:</strong> Share this knowledge with friends and family. Small actions create big change when millions of people participate!</p>
                    <button onClick={() => setShowAI(false)}
                      className="mt-3 text-indigo-600 hover:text-indigo-700 font-medium bg-transparent border-none p-0">
                      Close ✕
                    </button>
                  </motion.div>
                )}

                {/* Next button */}
                <motion.button onClick={handleNext} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="eco-btn w-full py-5">
                  {current + 1 < questions.length ? 'Next Question →' : '🏁 Finish Level'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
