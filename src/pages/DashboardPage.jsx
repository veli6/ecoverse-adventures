import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiLogOut, FiZap, FiTrendingUp, FiAward, FiPlay } from 'react-icons/fi';
import { GiTreehouse } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

function StatCard({ icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="eco-card flex items-center gap-5 p-6"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 font-medium" style={{ fontSize: '23px' }}>{label}</p>
        <p className="stat-number">{value}</p>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch quiz points from localStorage
  const quizPoints = parseInt(localStorage.getItem('ecoPoints') || '0');
  const ecoPoints = (userData?.ecoPoints || 0) + quizPoints;
  
  const streak = userData?.streakCount || 0;
  const trees = userData?.treesCollected || 0;
  const completedLevels = userData?.completedLevels ? Object.keys(userData.completedLevels).length : 0;

  const handleLogout = async () => {
    try { await logout(); } catch (e) { console.error(e); }
  };

  return (
    <div className="page-container max-w-5xl mx-auto pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-10"
      >
        <div>
          <h1 className="text-4xl font-extrabold">
            <span className="eco-gradient-text">EcoVerse</span>{' '}
            <span className="text-gray-700">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, <span className="text-eco-600 font-semibold">{userData?.username || 'EcoWarrior'}</span>! 🌿
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/quiz')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-eco-600 text-white hover:bg-eco-700 transition-all shadow-lg"
          >
            <FiPlay size={22} /> Start Quiz
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all bg-white"
          >
            <FiLogOut size={22} /> Logout
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard icon={<FiZap size={26} />} label="Eco Points" value={ecoPoints} color="from-eco-400 to-eco-600" delay={0} />
        <StatCard icon={<FiTrendingUp size={26} />} label="Streak Days" value={`${streak} 🔥`} color="from-orange-400 to-red-500" delay={0.1} />
        <StatCard icon={<GiTreehouse size={26} />} label="Trees Planted" value={`${trees} 🌳`} color="from-green-500 to-emerald-600" delay={0.2} />
        <StatCard icon={<FiAward size={26} />} label="Levels Done" value={`${completedLevels}/25`} color="from-purple-400 to-indigo-500" delay={0.3} />
      </div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="eco-card p-8 mb-10"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Progress Overview</h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-600">Reward Progress</span>
              <span className="font-bold text-eco-600">{ecoPoints % 100}/100 to next tree</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${ecoPoints % 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-600">Overall Completion</span>
              <span className="font-bold text-eco-600">{Math.round((completedLevels / 25) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${(completedLevels / 25) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Virtual Forest */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="eco-card p-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🌳 Your Virtual Forest</h3>
        <p className="text-gray-500 mb-4">Earn 100 eco points to plant a tree!</p>
        <div className="flex flex-wrap gap-3">
          {trees > 0 ? (
            Array.from({ length: Math.min(trees, 50) }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-4xl"
              >
                🌳
              </motion.span>
            ))
          ) : (
            <p className="text-gray-400">No trees yet. Start completing quizzes to grow your forest! 🌱</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
