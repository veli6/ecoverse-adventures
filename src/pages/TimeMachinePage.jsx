import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

export default function TimeMachinePage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { getCompletedLevelCount } = useGame();
  const [sliderValue, setSliderValue] = useState(50);

  const completedLevels = getCompletedLevelCount();
  const performanceScore = Math.round((completedLevels / 25) * 100);

  const getEarthState = () => {
    if (sliderValue < 33) return 'past';
    if (sliderValue < 66) return 'present';
    return 'future';
  };

  const earthState = getEarthState();
  const futureIsGreen = performanceScore >= 40;

  const scenes = {
    past: {
      bg: 'from-green-300 via-emerald-400 to-green-500',
      sky: 'from-sky-300 to-blue-400',
      label: '🌿 The Past — Pristine Earth',
      desc: 'Lush forests, clean oceans, and abundant wildlife. Earth as nature intended.',
      elements: ['🌲','🌲','🦌','🌲','🌲','🦅','🌲','🏔️','🌊'],
      mood: 'text-green-700',
    },
    present: {
      bg: 'from-yellow-300 via-amber-400 to-orange-400',
      sky: 'from-gray-300 to-blue-300',
      label: '🏭 The Present — A Crossroads',
      desc: 'Industrial growth alongside environmental degradation. We stand at a turning point.',
      elements: ['🌲','🏭','🏗️','🌲','🚗','🌲','☁️','🏢'],
      mood: 'text-amber-700',
    },
    future: futureIsGreen ? {
      bg: 'from-green-400 via-emerald-500 to-teal-500',
      sky: 'from-sky-200 to-cyan-300',
      label: '🌍 2050 — A Green Future! 🎉',
      desc: `Your eco score of ${performanceScore}% helped create a sustainable world! Solar cities, clean air, thriving wildlife.`,
      elements: ['🌳','☀️','🌳','🚲','🌳','🦋','🌈','💧','🏡'],
      mood: 'text-green-700',
    } : {
      bg: 'from-gray-400 via-gray-500 to-gray-600',
      sky: 'from-gray-500 to-gray-700',
      label: '😢 2050 — A Polluted Future',
      desc: `Your eco score of ${performanceScore}% wasn't enough. Complete more levels to change this future!`,
      elements: ['🏭','💨','🏭','☠️','🏭','💨','🌫️','😷'],
      mood: 'text-gray-700',
    },
  };

  const scene = scenes[earthState];

  return (
    <div className="page-container max-w-4xl mx-auto min-h-screen py-8">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-eco-600 hover:text-eco-700 font-medium mb-6 bg-transparent border-none p-0">
        <FiArrowLeft size={22} /> Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold mb-2"><span className="eco-gradient-text">Eco Time Machine</span> ⏳</h1>
        <p className="text-gray-500 mb-8">Drag the slider to see Earth's past, present, and future</p>
      </motion.div>

      {/* Scene Display */}
      <motion.div key={earthState} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl overflow-hidden mb-8 shadow-eco-lg`}
        style={{ minHeight: 350 }}
      >
        {/* Sky */}
        <div className={`bg-gradient-to-b ${scene.sky} p-8 pb-0 relative`} style={{ minHeight: 180 }}>
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold ${scene.mood}`}>{scene.label}</h2>
          </div>
          {earthState === 'past' && <div className="absolute top-4 right-8 text-4xl">☀️</div>}
          {earthState === 'future' && futureIsGreen && <div className="absolute top-4 right-8 text-4xl">🌈</div>}
          {earthState === 'future' && !futureIsGreen && <div className="absolute top-4 right-8 text-4xl">🌫️</div>}
        </div>
        {/* Ground */}
        <div className={`bg-gradient-to-r ${scene.bg} p-8 pt-4 relative`}>
          <div className="flex justify-around items-end mb-6" style={{ minHeight: 80 }}>
            {scene.elements.map((el, i) => (
              <motion.span key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }} className="text-4xl">
                {el}
              </motion.span>
            ))}
          </div>
          <p className={`text-center font-medium ${scene.mood} bg-white/60 rounded-xl p-4`}>{scene.desc}</p>
        </div>
      </motion.div>

      {/* Slider */}
      <div className="eco-card p-8">
        <div className="flex justify-between mb-4 font-bold">
          <span className="text-green-600">🌿 Past</span>
          <span className="text-amber-600">🏭 Present</span>
          <span className={futureIsGreen ? 'text-emerald-600' : 'text-gray-600'}>
            {futureIsGreen ? '🌍 Green Future' : '😢 Polluted'}
          </span>
        </div>
        <input type="range" min="0" max="100" value={sliderValue} onChange={e => setSliderValue(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(90deg, #22c55e ${sliderValue}%, #d1d5db ${sliderValue}%)` }}
        />
        <div className="mt-6 text-center">
          <p className="text-gray-500">Your Eco Performance: <span className="font-bold text-eco-600">{performanceScore}%</span></p>
          <p className="text-gray-400 mt-1">Complete more levels to improve Earth's future! 🌱</p>
        </div>
      </div>
    </div>
  );
}
