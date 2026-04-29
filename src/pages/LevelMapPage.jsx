import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import { FiLock, FiCheck, FiArrowLeft } from 'react-icons/fi';

const THEME_INFO = {
  plastic: { label: 'Plastic Pollution', icon: '♻️', gradient: 'from-orange-400 to-red-500' },
  water: { label: 'Water Conservation', icon: '💧', gradient: 'from-blue-400 to-cyan-500' },
  climate: { label: 'Climate Change', icon: '🌡️', gradient: 'from-amber-400 to-orange-500' },
  energy: { label: 'Energy Saving', icon: '⚡', gradient: 'from-yellow-400 to-amber-500' },
  wildlife: { label: 'Wildlife Protection', icon: '🦁', gradient: 'from-green-400 to-emerald-600' },
};

const LEVEL_LABELS = ['Beginner', 'Explorer', 'Guardian', 'Champion', 'Legend'];

export default function LevelMapPage() {
  const { theme } = useParams();
  const navigate = useNavigate();
  const { isLevelUnlocked, isLevelCompleted, getLevelStars, getThemeProgress } = useGame();
  const info = THEME_INFO[theme] || THEME_INFO.plastic;
  const progress = getThemeProgress(theme);

  function renderStars(count) {
    return (
      <div className="flex gap-1 mt-1">
        {[1, 2, 3].map(s => (
          <span key={s} className={`text-lg ${s <= count ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  }

  // Positions for Candy-Crush style winding path
  const positions = [
    { x: 50, y: 0 },
    { x: 75, y: 1 },
    { x: 50, y: 2 },
    { x: 25, y: 3 },
    { x: 50, y: 4 },
  ];

  return (
    <div className="page-container max-w-3xl mx-auto min-h-screen py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-eco-600 hover:text-eco-700 font-medium mb-4 bg-transparent border-none p-0">
          <FiArrowLeft size={22} /> Dashboard
        </button>
        <div className="eco-card p-6 flex items-center gap-5">
          <span className="text-5xl">{info.icon}</span>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-800">{info.label}</h1>
            <p className="text-gray-500 mt-1">{progress.completed}/{progress.total} levels completed</p>
            <div className="progress-bar h-3 mt-3">
              <div className="progress-bar-fill" style={{ width: `${(progress.completed / progress.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Level Path */}
      <div className="relative py-4" style={{ minHeight: 700 }}>
        {/* Connecting path line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {positions.slice(0, -1).map((pos, i) => {
            const next = positions[i + 1];
            const completed = isLevelCompleted(theme, i + 1);
            return (
              <line
                key={i}
                x1={pos.x} y1={pos.y * 20 + 10}
                x2={next.x} y2={next.y * 20 + 10}
                stroke={completed ? '#22c55e' : '#d1d5db'}
                strokeWidth="0.8"
                strokeDasharray={completed ? 'none' : '2,2'}
              />
            );
          })}
        </svg>

        {/* Level Nodes */}
        <div className="relative flex flex-col gap-10">
          {[1, 2, 3, 4, 5].map((level, i) => {
            const unlocked = isLevelUnlocked(theme, level);
            const completed = isLevelCompleted(theme, level);
            const stars = getLevelStars(theme, level);
            const isCurrent = unlocked && !completed;
            const align = positions[i].x > 50 ? 'ml-auto mr-8' : positions[i].x < 50 ? 'ml-8' : 'mx-auto';

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                className={`flex flex-col items-center ${align}`}
                style={{ width: 'fit-content' }}
              >
                <motion.button
                  onClick={() => {
                    if (!isLevelUnlocked(theme, level)) return;
                    navigate(`/quiz/${theme}/${level}`);
                  }}
                  disabled={!unlocked}
                  className={`level-node ${completed ? 'level-node-completed' : isCurrent ? 'level-node-current' : 'level-node-locked'}`}
                  whileHover={unlocked ? { scale: 1.15 } : {}}
                  whileTap={unlocked ? { scale: 0.9 } : {}}
                  style={{ width: 80, height: 80 }}
                >
                  {completed ? <FiCheck size={32} /> : !unlocked ? <FiLock size={28} /> : <span className="text-2xl font-bold">{level}</span>}
                </motion.button>
                {completed && renderStars(stars)}
                <p className={`mt-2 font-semibold ${completed ? 'text-eco-600' : isCurrent ? 'text-eco-500' : 'text-gray-400'}`}>
                  {LEVEL_LABELS[i]}
                </p>
                {isCurrent && (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-eco-500 font-bold mt-1"
                  >
                    ▶ Play Now
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
