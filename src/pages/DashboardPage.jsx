import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiLogOut, FiZap, FiTrendingUp, FiAward, FiPlay, FiMap } from 'react-icons/fi';
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

  // Use userData.progress directly from Firestore
  const progress = userData?.progress || {};
  const ecoPoints = progress.ecoPoints || 0;
  const streak = userData?.streakCount || 0;
  const trees = progress.trees || 0;
  
  // Calculate completed levels from userData.progress.completedLevels array
  const completedLevels = progress.completedLevels || [];
  const levelsDone = completedLevels.length;
  const totalLevels = 25;
  const completionPercent = Math.floor((levelsDone / totalLevels) * 100);

  const getCityVisual = (points) => {
    if (points >= 500) return ["🌆","🏡","🌳","🌞"];
    if (points >= 300) return ["🏡","🌳","🌞"];
    if (points >= 200) return ["🏡","🌳"];
    if (points >= 100) return ["🌳"];
    return ["🌱"];
  };

  const getCityMessage = (points) => {
    if (points >= 500) return "Full Eco City achieved!";
    if (points >= 300) return "Solar-powered city emerging!";
    if (points >= 200) return "Eco houses unlocked!";
    if (points >= 100) return "Trees growing in your city!";
    return "Start building your eco city!";
  };

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
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg"
          >
            🌍 Environment News
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-eco-600 text-white hover:bg-eco-700 transition-all shadow-lg"
          >
            <FiPlay size={22} /> Start Quiz
          </button>
          <button
            onClick={() => navigate('/city')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
          >
            <FiMap size={22} /> View Eco City
          </button>
          <button
            onClick={() => {
              alert("Progress reset is handled by account deletion or contacting support in this version.");
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-orange-200 text-orange-600 hover:bg-orange-50 transition-all bg-white"
          >
            Reset Progress
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
        <StatCard icon={<FiAward size={26} />} label="Levels Done" value={`${levelsDone}/${totalLevels}`} color="from-purple-400 to-indigo-500" delay={0.3} />
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
              <span className="font-bold text-eco-600">{completionPercent}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${completionPercent}%` }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Virtual Forest */}
      <div className="eco-card p-8 mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🌳 Your Virtual Forest</h3>
        <p className="text-gray-500 mb-4">Earn 100 eco points to plant a tree! Total: {trees}</p>
        <div className="flex flex-wrap gap-3">
          {trees > 0 ? (
            Array.from({ length: Math.min(trees, 100) }).map((_, i) => (
              <span key={i} className="text-4xl">
                {trees <= 2 ? '🌱' : trees <= 5 ? '🌳' : '🌲'}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No trees yet. Start completing quizzes to grow your forest! 🌱</p>
          )}
        </div>
      </div>

      {/* Your Eco City Upgrade */}
      <div style={{ marginTop: "30px", padding: "30px", background: "#111", borderRadius: "24px", color: "#fff", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
          Your Eco City 🌆
        </h2>

        <div style={{
          display: "flex",
          gap: "25px",
          fontSize: "50px",
          marginTop: "20px",
          flexWrap: "wrap",
          padding: "20px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "16px",
          justifyContent: "center"
        }}>
          {getCityVisual(ecoPoints).map((item, i) => (
            <span key={i} title={item}>{item}</span>
          ))}
        </div>

        <p style={{ marginTop: "20px", fontSize: "18px", color: "#22c55e", fontWeight: "600", textAlign: "center" }}>
          {getCityMessage(ecoPoints)}
        </p>
        
        <p style={{ marginTop: "5px", fontSize: "14px", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
          Current Progress: {ecoPoints} Eco Points
        </p>
      </div>
    </div>
  );
}
