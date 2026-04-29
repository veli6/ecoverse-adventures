import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { updateUserData } from '../lib/userService';

const QUESTIONS = [
  {
    id: 1,
    question: 'How do you primarily commute to work or school?',
    options: [
      { text: 'Walk or bicycle', score: 5 },
      { text: 'Public transport', score: 15 },
      { text: 'Carpool or ride-share', score: 25 },
      { text: 'Drive alone (petrol/diesel)', score: 40 },
    ],
  },
  {
    id: 2,
    question: 'How often do you eat meat or dairy products?',
    options: [
      { text: 'Fully plant-based diet', score: 5 },
      { text: 'Occasionally (1–2 times/week)', score: 15 },
      { text: 'Regularly (3–5 times/week)', score: 25 },
      { text: 'Every meal, every day', score: 40 },
    ],
  },
  {
    id: 3,
    question: 'What is your home energy source?',
    options: [
      { text: 'Fully renewable (solar, wind)', score: 5 },
      { text: 'Mix of renewable and grid', score: 15 },
      { text: 'Standard grid electricity', score: 25 },
      { text: 'Primarily fossil fuel (generator, coal)', score: 40 },
    ],
  },
  {
    id: 4,
    question: 'How many round-trip flights do you take per year?',
    options: [
      { text: 'None', score: 0 },
      { text: '1–2 short-haul flights', score: 15 },
      { text: '3–5 flights', score: 30 },
      { text: 'More than 5 flights', score: 45 },
    ],
  },
  {
    id: 5,
    question: 'How do you handle waste and recycling?',
    options: [
      { text: 'Compost + recycle everything possible', score: 5 },
      { text: 'Recycle most items', score: 10 },
      { text: 'Recycle occasionally', score: 20 },
      { text: 'Everything goes to landfill', score: 35 },
    ],
  },
];

const TIPS = {
  low: [
    'Keep up the great work — consider sharing your habits with friends and family.',
    'Try switching to a renewable energy provider if you haven\'t already.',
    'Support local farmers markets to reduce food transport emissions.',
    'Consider carbon offset programs for any unavoidable emissions.',
    'Advocate for climate policies in your community.',
  ],
  medium: [
    'Replace one car trip per week with walking, cycling, or public transport.',
    'Reduce meat consumption to 2–3 days per week to cut dietary emissions.',
    'Switch to LED lighting and energy-efficient appliances at home.',
    'Consolidate flights — take fewer but longer trips instead of many short ones.',
    'Start a simple recycling system at home if you don\'t have one.',
  ],
  high: [
    'Consider carpooling or switching to an electric/hybrid vehicle.',
    'Try "Meatless Mondays" as a first step toward reducing dietary impact.',
    'Conduct a home energy audit to find where you\'re losing efficiency.',
    'Offset your flight emissions through verified carbon credit programs.',
    'Reduce single-use plastics — carry reusable bags, bottles, and containers.',
  ],
};

function getCategory(score) {
  if (score < 60) return { label: 'Low', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '●' };
  if (score <= 100) return { label: 'Medium', color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: '●' };
  return { label: 'High', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: '●' };
}

function getTipKey(score) {
  if (score < 60) return 'low';
  if (score <= 100) return 'medium';
  return 'high';
}

export default function CarbonPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const progress = showResult ? 100 : ((currentQ) / QUESTIONS.length) * 100;

  const handleSelect = (score, idx) => {
    setSelectedOption(idx);

    setTimeout(async () => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ(prev => prev + 1);
      } else {
        const finalScore = newAnswers.reduce((s, a) => s + a, 0);
        if (currentUser) {
          try { await updateUserData(currentUser.uid, { carbonScore: finalScore }); } catch (_) {}
        }
        setShowResult(true);
      }
    }, 400);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  const category = getCategory(totalScore);
  const tips = TIPS[getTipKey(totalScore)];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '15px',
              cursor: 'pointer',
              padding: 0,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Carbon Footprint Calculator
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '6px' }}>
            Answer 5 questions to estimate your environmental impact.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: '6px',
          backgroundColor: '#e2e8f0',
          borderRadius: '3px',
          marginBottom: '32px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#22c55e',
            borderRadius: '3px',
            transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Quiz or Result */}
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 12px 0',
                }}>
                  Question {currentQ + 1} of {QUESTIONS.length}
                </p>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 24px 0',
                  lineHeight: '1.4',
                }}>
                  {QUESTIONS[currentQ].question}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {QUESTIONS[currentQ].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt.score, idx)}
                      disabled={selectedOption !== null}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: `1.5px solid ${selectedOption === idx ? '#22c55e' : '#e2e8f0'}`,
                        backgroundColor: selectedOption === idx ? '#f0fdf4' : 'white',
                        color: '#334155',
                        fontSize: '15px',
                        textAlign: 'left',
                        cursor: selectedOption !== null ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                        fontWeight: selectedOption === idx ? '600' : '400',
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Score Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                marginBottom: '20px',
              }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 8px 0',
                }}>
                  Your Estimated Score
                </p>
                <p style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  color: '#0f172a',
                  margin: '0 0 12px 0',
                  lineHeight: 1,
                }}>
                  {totalScore}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '100px',
                  backgroundColor: category.bg,
                  border: `1px solid ${category.border}`,
                }}>
                  <span style={{ color: category.color, fontSize: '10px' }}>{category.icon}</span>
                  <span style={{ color: category.color, fontWeight: '700', fontSize: '14px' }}>
                    {category.label} Footprint
                  </span>
                </div>
              </div>

              {/* Tips Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '28px 32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                marginBottom: '20px',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 16px 0',
                }}>
                  Recommendations
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  {tips.map((tip, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: '#475569',
                    }}>
                      <span style={{
                        flexShrink: 0,
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: '#f0fdf4',
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: '1px solid #bbf7d0',
                      }}>
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleRestart}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1.5px solid #22c55e',
                    backgroundColor: 'white',
                    color: '#22c55e',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#22c55e',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
