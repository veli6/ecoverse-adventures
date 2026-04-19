import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiUsers, FiAward, FiStar, FiZap, FiNavigation, FiTrendingUp, FiPlusCircle, FiLock } from 'react-icons/fi';

// 3D Tiny Planet Building Component
const PlanetBuilding = ({ icon, index, total, radius, ecoPoints }) => {
  const isMetropolis = ecoPoints >= 500;

  // Calculate spherical coordinates
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  // Rotation to face outwards
  const rotateY = (theta * 180) / Math.PI;
  const rotateX = (phi * 180) / Math.PI - 90;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', delay: index * 0.05 }}
      className="absolute left-1/2 top-1/2"
      style={{
        transformStyle: 'preserve-3d',
        x: x,
        y: y,
        z: z,
        rotateY: `${rotateY}deg`,
        rotateX: `${rotateX}deg`
      }}
    >
      <motion.div
        whileHover={{ scale: 1.5, translateZ: 50 }}
        className="text-5xl select-none filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        style={{ transform: 'rotateX(0deg)' }}
      >
        {icon}
      </motion.div>

      {/* City Glow for high points */}
      {isMetropolis && (
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full -z-10 animate-pulse" />
      )}
    </motion.div>
  );
};

export default function EcoCityPage() {
  const navigate = useNavigate();
  const { currentUser, userData, refreshUserData } = useAuth();

  const [islandSize, setIslandSize] = useState(5);
  const [localPoints, setLocalPoints] = useState(0);

  // Persistence: Load from Firestore + Local Fallback
  useEffect(() => {
    const savedSize = parseInt(localStorage.getItem('islandSize') || '5') || 5;
    const quizPoints = parseInt(localStorage.getItem('ecoPoints') || '0') || 0;
    setIslandSize(savedSize);
    setLocalPoints(quizPoints);
  }, []);

  const totalPoints = (userData?.ecoPoints || 0) + localPoints;

  const handleExpandCity = async () => {
    if (islandSize >= 8) return;
    if (totalPoints >= 200) {
      // 1. Update Firestore
      if (currentUser) {
        try {
          const userDoc = doc(db, 'users', currentUser.uid);
          await updateDoc(userDoc, {
            ecoPoints: increment(-200)
          });
          // Sync UI immediately
          await refreshUserData();
        } catch (err) {
          console.error("Firestore expansion failed:", err);
        }
      }

      // 2. Update Local State
      const newSize = islandSize + 1;
      setIslandSize(newSize);
      localStorage.setItem('islandSize', newSize.toString());

      // If we used local points, subtract from there first
      if (localPoints >= 200) {
        const remainingLocal = localPoints - 200;
        setLocalPoints(remainingLocal);
        localStorage.setItem('ecoPoints', remainingLocal.toString());
      } else {
        // Points were mostly from Firebase, we don't subtract from local
        // (Firestore update already handles the master balance)
      }
    }
  };

  const isMetropolis = totalPoints >= 500;
  const population = totalPoints * 1250;
  const isMaxReached = islandSize >= 8;
  const canAfford = totalPoints >= 200;

  const getRank = (pts) => {
    if (pts >= 500) return { label: 'S-Class HyperMetropolis', color: 'text-blue-400', icon: <FiStar /> };
    if (pts >= 400) return { label: 'A-Class MegaCity', color: 'text-emerald-400', icon: <FiAward /> };
    if (pts >= 250) return { label: 'B-Class EcoTown', color: 'text-green-400', icon: <FiAward /> };
    return { label: 'Outpost', color: 'text-gray-500', icon: <FiTrendingUp /> };
  };

  const rank = getRank(totalPoints);

  const cityIcons = useMemo(() => {
    const items = [];
    const maxCapacity = islandSize * islandSize;
    const count = Math.min(Math.floor(totalPoints / 20), maxCapacity);

    const icons = ["🌱", "🌸", "🌳", "🌻", "🏠", "☀️", "🏞️", "🏢"];
    const currentMaxIcon = icons[Math.min(Math.floor(totalPoints / 65), icons.length - 1)];

    for (let i = 0; i < Math.max(count, 1); i++) {
      items.push(currentMaxIcon);
    }
    return items;
  }, [totalPoints, islandSize]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col font-sans overflow-hidden ${isMetropolis ? 'bg-[#020617]' : 'bg-[#0f172a]'}`}>

      {/* HUD HEADER */}
      <div className="z-50 p-6 bg-black/40 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-eco-400 font-bold border border-white/5 transition-all">
          <FiArrowLeft /> Back
        </button>

        <div className="flex gap-12">
          <div className="text-right">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Population</p>
            <p className="text-3xl font-black text-white">{population.toLocaleString()}</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-right">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">City Rank</p>
            <p className={`text-3xl font-black flex items-center justify-end gap-3 ${rank.color}`}>
              {rank.icon} {rank.label}
            </p>
          </div>
        </div>
      </div>

      {/* 3D TINY PLANET SCENE */}
      <div className="flex-1 relative flex items-center justify-center overflow-visible" style={{ perspective: '3000px' }}>

        {/* Animated Background Atmosphere */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 opacity-40 transition-opacity duration-1000 ${isMetropolis ? 'bg-[radial-gradient(circle_at_50%_50%,#1e3a8a_0%,#020617_100%)]' : 'bg-[radial-gradient(circle_at_50%_50%,#166534_0%,#0f172a_100%)]'}`} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        </div>

        {/* The Tiny Planet Wrapper */}
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-[500px] h-[500px]"
        >
          {/* The Core Sphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b431b] via-[#0f2a0f] to-[#0a1a0a] rounded-full border-[10px] border-[#254d25] shadow-[0_0_100px_rgba(34,197,94,0.3)]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-full" />
            {/* Core Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] rounded-full" />
          </div>

          {/* Buildings on the Sphere */}
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            <AnimatePresence>
              {cityIcons.map((icon, i) => (
                <PlanetBuilding
                  key={i}
                  icon={icon}
                  index={i}
                  total={cityIcons.length}
                  radius={260} // Radius slightly larger than the core
                  ecoPoints={totalPoints}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Satellite / Moon for Metropolis */}
          {isMetropolis && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-150px] pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl filter drop-shadow-[0_0_20px_#3b82f6]">🛰️</div>
            </motion.div>
          )}
        </motion.div>

        {/* Expansion Controls Floating in Space */}
        <div className="absolute bottom-10 flex flex-col items-center gap-4 z-50">
          <button
            onClick={handleExpandCity}
            disabled={isMaxReached || !canAfford}
            className={`px-12 py-5 rounded-[30px] font-black text-2xl transition-all shadow-2xl flex items-center gap-3 border-b-4 ${isMaxReached
                ? 'bg-gray-800 border-gray-950 text-gray-500 cursor-not-allowed'
                : !canAfford
                  ? 'bg-gray-900/50 border-black text-gray-600 cursor-not-allowed'
                  : 'bg-eco-600 border-eco-800 text-white hover:bg-eco-500 hover:-translate-y-2 active:translate-y-1 shadow-eco-500/30'
              }`}
          >
            {isMaxReached ? (
              <><FiLock /> Tiny Planet Maxed</>
            ) : !canAfford ? (
              <><FiLock /> Need {200 - totalPoints} Pts to Expand</>
            ) : (
              <><FiPlusCircle className="animate-pulse" /> Expand Planet (200 Pts)</>
            )}
          </button>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
            Planet Size: {islandSize}x{islandSize} • {totalPoints} Session Pts
          </p>
        </div>
      </div>

      {/* FOOTER LEGEND */}
      <div className="p-8 bg-black/40 backdrop-blur-2xl border-t border-white/5 flex justify-center gap-4 overflow-x-auto">
        {[
          { cost: 10, icon: "🌱", label: "Outpost" },
          { cost: 100, icon: "🌳", label: "Forest" },
          { cost: 200, icon: "🏠", label: "Village" },
          { cost: 300, icon: "☀️", label: "Power" },
          { cost: 500, icon: "🏢", label: "Metropolis" }
        ].map((item) => {
          const isUnlocked = totalPoints >= item.cost;
          return (
            <div key={item.label} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${isUnlocked ? 'border-eco-500 bg-eco-900/20' : 'border-white/10 opacity-30 grayscale'}`}>
              <span className="text-2xl">{item.icon}</span>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-eco-400">{item.label}</p>
                <p className="text-xs font-bold text-white">{item.cost} Pts</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
