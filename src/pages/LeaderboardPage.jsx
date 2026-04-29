import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLeaderboard } from '../lib/userService';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiAward } from 'react-icons/fi';

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getLeaderboard(20);
        setLeaders(data);
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  const myRank = leaders.findIndex(l => l.uid === currentUser?.uid) + 1;
  const medals = ['🥇','🥈','🥉'];

  return (
    <div className="page-container max-w-3xl mx-auto min-h-screen py-8">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-eco-600 hover:text-eco-700 font-medium mb-6 bg-transparent border-none p-0">
        <FiArrowLeft size={22} /> Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold mb-2"><span className="eco-gradient-text">Leaderboard</span> 🏆</h1>
        <p className="text-gray-500 mb-8">Top eco warriors ranked by points</p>
      </motion.div>

      {/* Your Rank */}
      {myRank > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="eco-card p-6 mb-8 border-2 border-eco-300 bg-eco-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-eco-500 flex items-center justify-center text-white font-bold text-xl">#{myRank}</div>
            <div>
              <p className="font-bold text-gray-800">Your Rank</p>
              <p className="text-eco-600 font-semibold">{userData?.progress?.ecoPoints || 0} eco points</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Podium */}
      {leaders.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-10">
          {[1, 0, 2].map(idx => {
            const l = leaders[idx];
            if (!l) return null;
            const heights = ['h-36', 'h-28', 'h-24'];
            const h = idx === 0 ? heights[0] : idx === 1 ? heights[1] : heights[2];
            return (
              <motion.div key={idx} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }} className="flex flex-col items-center">
                <span className="text-3xl mb-2">{medals[l.rank - 1]}</span>
                <p className="font-bold text-gray-800 text-center" style={{ maxWidth: 100 }}>{l.username || 'EcoWarrior'}</p>
                <p className="text-eco-600 font-semibold">{l.progress?.ecoPoints || 0} pts</p>
                <div className={`${h} w-24 bg-gradient-to-t from-eco-600 to-eco-400 rounded-t-xl mt-2 flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">#{l.rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12"><div className="earth-sphere mx-auto mb-4" style={{ width: 50, height: 50 }}></div><p className="text-gray-500">Loading...</p></div>
      ) : leaders.length === 0 ? (
        <div className="eco-card p-8 text-center"><p className="text-gray-500">No players yet. Be the first! 🌱</p></div>
      ) : (
        <div className="space-y-3">
          {leaders.map((l, i) => (
            <motion.div key={l.uid} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`eco-card flex items-center gap-4 p-5 ${l.uid === currentUser?.uid ? 'border-2 border-eco-400 bg-eco-50' : ''}`}>
              <span className="font-bold text-gray-400 w-10 text-center">{i < 3 ? medals[i] : `#${l.rank}`}</span>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-400 to-eco-600 flex items-center justify-center text-white font-bold">
                {(l.username || 'E')[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{l.username || 'EcoWarrior'}</p>
                <p className="text-gray-500">🌳 {l.progress?.trees || 0} trees</p>
              </div>
              <span className="font-bold text-eco-600">{l.progress?.ecoPoints || 0} pts</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
