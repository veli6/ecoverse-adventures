import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const BUILDINGS = [
  { key: 'park', label: 'Green Park', icon: '🌳', level: 1, desc: 'A beautiful community park with native trees', color: 'from-green-400 to-emerald-500' },
  { key: 'solarHome', label: 'Solar Home', icon: '☀️', level: 2, desc: 'Energy-efficient home powered by solar panels', color: 'from-yellow-400 to-amber-500' },
  { key: 'recyclingPlant', label: 'Recycling Plant', icon: '♻️', level: 3, desc: 'Advanced waste recycling facility', color: 'from-blue-400 to-cyan-500' },
  { key: 'evStation', label: 'EV Station', icon: '🚗', level: 4, desc: 'Electric vehicle charging station', color: 'from-purple-400 to-indigo-500' },
  { key: 'smartSystem', label: 'Smart Water System', icon: '💧', level: 5, desc: 'AI-powered water conservation system', color: 'from-sky-400 to-blue-500' },
];

export default function EcoCityPage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { getCityProgress } = useGame();
  const elements = userData?.ecoCityElements || {};
  const progress = getCityProgress();

  return (
    <div className="page-container max-w-5xl mx-auto min-h-screen py-8">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-eco-600 hover:text-eco-700 font-medium mb-6 bg-transparent border-none p-0">
        <FiArrowLeft size={22} /> Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold mb-2"><span className="eco-gradient-text">Eco City</span> Builder 🏙️</h1>
        <p className="text-gray-500 mb-6">Complete levels to build your sustainable city!</p>
        <div className="eco-card p-4 mb-8 inline-block">
          <span className="font-bold text-eco-600">City Progress: {progress}%</span>
          <div className="progress-bar h-3 mt-2 w-64"><div className="progress-bar-fill" style={{ width: `${progress}%` }}></div></div>
        </div>
      </motion.div>

      {/* City Visualization */}
      <div className="eco-card p-8 mb-8 relative overflow-hidden" style={{ minHeight: 320, background: 'linear-gradient(180deg, #e0f7fa 0%, #c8e6c9 50%, #a5d6a7 100%)' }}>
        {/* Sky decorations */}
        <div className="absolute top-4 right-8 text-5xl opacity-80">☁️</div>
        <div className="absolute top-8 right-32 text-3xl opacity-60">☁️</div>
        <div className="absolute top-2 left-16 text-4xl opacity-70">☁️</div>
        {progress > 60 && <div className="absolute top-4 left-1/2 text-3xl">🌈</div>}

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 to-green-400 rounded-b-2xl"></div>

        {/* Buildings */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-around items-end px-8">
          {BUILDINGS.map((b, i) => (
            <motion.div key={b.key}
              initial={{ y: 50, opacity: 0, scale: 0 }}
              animate={elements[b.key] ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0.2, scale: 0.5 }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center"
            >
              <span className={`text-5xl ${elements[b.key] ? '' : 'grayscale opacity-30'}`}>{b.icon}</span>
              {elements[b.key] && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 + 0.3 }}
                  className="text-xs font-bold text-white bg-eco-600 px-2 py-1 rounded mt-1" style={{ fontSize: '14px' }}>
                  {b.label}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {progress === 0 && (
          <div className="flex items-center justify-center h-full relative z-10">
            <p className="text-xl font-bold text-gray-600 bg-white/80 px-6 py-4 rounded-xl">Complete levels to start building! 🚀</p>
          </div>
        )}
      </div>

      {/* Building List */}
      <div className="grid gap-4">
        {BUILDINGS.map((b, i) => (
          <motion.div key={b.key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className={`eco-card flex items-center gap-5 p-6 ${elements[b.key] ? 'border-2 border-eco-300 bg-eco-50' : 'opacity-60'}`}>
            <span className="text-4xl">{b.icon}</span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{b.label}</h3>
              <p className="text-gray-500">{b.desc}</p>
            </div>
            <span className={`px-4 py-2 rounded-xl font-bold ${elements[b.key] ? 'bg-eco-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {elements[b.key] ? '✓ Built' : `Level ${b.level}`}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
