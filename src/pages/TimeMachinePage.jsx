import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

// ─── Carbon footprint score → estimated annual CO₂ (tonnes) ──────────────────
// CarbonPage scores range 0–160. Global avg is ~4t CO₂/person/year.
// Score 0 ≈ 1t (fully green), Score 160 ≈ 16t (very high).
function scoreToCO2(carbonScore) {
  return +(1 + (carbonScore / 160) * 15).toFixed(1);
}

// ─── Quiz performance → eco knowledge multiplier (0.5 – 1.0) ─────────────────
// Higher quiz score = better eco decisions = lower projected footprint
function quizMultiplier(quizPct) {
  return 1.0 - quizPct * 0.5;
}

// ─── 2050 projections ─────────────────────────────────────────────────────────
// Business-as-usual: global emissions grow ~1% per year → ×1.27 by 2050
const BAU_MULTIPLIER = 1.27;
// If everyone followed the user's current habits, compound change over 24 years
function userWorldCO2(personalCO2, quizPct) {
  const annualChange = personalCO2 < 4 ? -0.02 : personalCO2 < 8 ? 0.005 : 0.015;
  return +(personalCO2 * Math.pow(1 + annualChange, 24) * quizMultiplier(quizPct)).toFixed(1);
}

// ─── Scenario descriptors ─────────────────────────────────────────────────────
function getScenario(co2) {
  if (co2 <= 2)  return { label: 'Carbon Neutral 🌿', temp: '+1.2°C', sea: '+15cm', ice: '92%', forest: '98%', color: '#16a34a', bg: '#f0fdf4', emoji: '🌍' };
  if (co2 <= 4)  return { label: 'Sustainable Path 🌱', temp: '+1.5°C', sea: '+26cm', ice: '80%', forest: '90%', color: '#22c55e', bg: '#f0fdf4', emoji: '🌎' };
  if (co2 <= 7)  return { label: 'Moderate Stress ⚠️', temp: '+2.1°C', sea: '+47cm', ice: '62%', forest: '74%', color: '#d97706', bg: '#fffbeb', emoji: '🌡️' };
  if (co2 <= 10) return { label: 'High Risk 🔥', temp: '+2.8°C', sea: '+72cm', ice: '41%', forest: '55%', color: '#ea580c', bg: '#fff7ed', emoji: '🏜️' };
  return           { label: 'Climate Crisis ☠️', temp: '+4.0°C', sea: '+110cm', ice: '18%', forest: '32%', color: '#dc2626', bg: '#fef2f2', emoji: '💀' };
}

// ─── Visual scene elements ────────────────────────────────────────────────────
function getScene(co2) {
  if (co2 <= 2)  return { sky: '#bae6fd', ground: '#86efac', elements: ['🌲','🌲','🦋','🌸','🌊','🐬','☀️','🌈','🏡'] };
  if (co2 <= 4)  return { sky: '#bfdbfe', ground: '#a3e635', elements: ['🌳','🌳','🌻','🚲','🏡','☀️','🌊','🦅'] };
  if (co2 <= 7)  return { sky: '#fde68a', ground: '#d9f99d', elements: ['🌳','🏭','🚗','🌳','☁️','🏢','🌊','🌿'] };
  if (co2 <= 10) return { sky: '#fed7aa', ground: '#fef08a', elements: ['🏭','💨','🏭','🚗','☁️','🌫️','🏜️','😷'] };
  return           { sky: '#fca5a5', ground: '#f87171', elements: ['🏭','💀','🌫️','☠️','🏭','💨','🌊','🔥'] };
}

// ─── Stat row ─────────────────────────────────────────────────────────────────
function StatRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ fontSize: 14, color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}

// ─── Scene card ───────────────────────────────────────────────────────────────
function SceneCard({ title, co2, subtitle, delay }) {
  const scenario = getScenario(co2);
  const scene = getScene(co2);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', flex: 1, minWidth: 260 }}
    >
      {/* Sky */}
      <div style={{ background: `linear-gradient(180deg, ${scene.sky} 0%, ${scene.sky}99 100%)`, padding: '20px 20px 0', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 4px' }}>{title}</p>
        <p style={{ fontSize: 22, fontWeight: 800, color: scenario.color, margin: '0 0 4px' }}>{scenario.emoji} {scenario.label}</p>
        <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{subtitle}</p>
      </div>
      {/* Ground scene */}
      <div style={{ background: `linear-gradient(180deg, ${scene.ground}88, ${scene.ground})`, padding: '12px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 28, marginBottom: 12 }}>
          {scene.elements.map((el, i) => (
            <motion.span key={i} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: delay + i * 0.06 }}>{el}</motion.span>
          ))}
        </div>
        {/* Stats */}
        <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 12, padding: '4px 14px' }}>
          <StatRow label="Avg temp rise" value={scenario.temp} color={scenario.color} />
          <StatRow label="Sea level rise" value={scenario.sea} color={scenario.color} />
          <StatRow label="Arctic ice remaining" value={scenario.ice} color={scenario.color} />
          <StatRow label="Forest cover" value={scenario.forest} color={scenario.color} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ fontSize: 14, color: '#64748b' }}>CO₂ per person/yr</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: scenario.color }}>{co2}t</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function TimeMachinePage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { getCompletedLevelCount } = useGame();

  // Pull carbon score from userData if saved, else default to mid-range
  const savedCarbonScore = userData?.carbonScore ?? 80;
  const [carbonScore, setCarbonScore] = useState(savedCarbonScore);

  const completedLevels = getCompletedLevelCount();
  const quizPct = Math.min(completedLevels / 25, 1); // 0–1
  const ecoPoints = userData?.progress?.ecoPoints || 0;

  const personalCO2 = scoreToCO2(carbonScore);
  const bauCO2 = +(4 * BAU_MULTIPLIER).toFixed(1); // global avg BAU
  const userWorld2050CO2 = userWorldCO2(personalCO2, quizPct);

  const currentScenario = getScenario(personalCO2);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)', fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", padding: '32px 20px 60px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Header */}
        <button onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontSize: 15, cursor: 'pointer', marginBottom: 24, padding: 0 }}>
          <FiArrowLeft size={18} /> Back to Dashboard
        </button>

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
            ⏳ Eco Time Machine
          </h1>
          <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>
            See how the world looks in 2050 — based on your carbon footprint and eco knowledge.
          </p>
        </motion.div>

        {/* Your profile summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', marginBottom: 28 }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>📊 Your Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
            {[
              { label: 'Eco Points', value: ecoPoints.toLocaleString(), color: '#22c55e' },
              { label: 'Levels Completed', value: `${completedLevels}/25`, color: '#8b5cf6' },
              { label: 'Eco Knowledge', value: `${Math.round(quizPct * 100)}%`, color: '#3b82f6' },
              { label: 'Your CO₂/year', value: `${personalCO2}t`, color: currentScenario.color },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 4px' }}>{label}</p>
                <p style={{ fontSize: 22, fontWeight: 800, color, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Carbon score slider */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', marginBottom: 28 }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' }}>🎚️ Adjust Your Carbon Footprint Score</h2>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 20px' }}>
            Use the Carbon Calculator to get your real score, or drag to explore scenarios.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 600, whiteSpace: 'nowrap' }}>🌿 Low (0)</span>
            <input
              type="range" min={0} max={160} value={carbonScore}
              onChange={e => setCarbonScore(Number(e.target.value))}
              style={{ flex: 1, accentColor: currentScenario.color, height: 6, cursor: 'pointer' }}
            />
            <span style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, whiteSpace: 'nowrap' }}>🔥 High (160)</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: currentScenario.color }}>
              Score: {carbonScore} → {personalCO2}t CO₂/year
            </span>
          </div>
        </motion.div>

        {/* 2050 Projections side by side */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>🌍 2050 World Projections</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
          <AnimatePresence mode="wait">
            <SceneCard
              key={`user-${carbonScore}`}
              title="If Everyone Followed Your Habits"
              co2={userWorld2050CO2}
              subtitle={`Based on your ${personalCO2}t/yr + ${Math.round(quizPct * 100)}% eco knowledge`}
              delay={0.2}
            />
          </AnimatePresence>
          <SceneCard
            title="Business As Usual (No Change)"
            co2={bauCO2}
            subtitle="Global avg if current trends continue"
            delay={0.3}
          />
        </div>

        {/* Insight banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{
            borderRadius: 20, padding: '24px 28px',
            background: userWorld2050CO2 < bauCO2
              ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
              : 'linear-gradient(135deg, #fff7ed, #fef2f2)',
            border: `1px solid ${userWorld2050CO2 < bauCO2 ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          {userWorld2050CO2 < bauCO2 ? (
            <>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#16a34a', margin: '0 0 8px' }}>
                🎉 You're making a difference!
              </p>
              <p style={{ fontSize: 14, color: '#166534', margin: 0 }}>
                If everyone lived like you, the 2050 world would emit <strong>{bauCO2 - userWorld2050CO2}t less CO₂ per person</strong> than the business-as-usual path.
                Keep completing quizzes and reducing your footprint to push this further!
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#dc2626', margin: '0 0 8px' }}>
                ⚠️ There's room to improve
              </p>
              <p style={{ fontSize: 14, color: '#991b1b', margin: 0 }}>
                Your current habits would lead to a <strong>{userWorld2050CO2}t CO₂/person/year</strong> world by 2050 — higher than the global average.
                Try the Carbon Calculator for personalised tips, and complete more quizzes to boost your eco knowledge!
              </p>
            </>
          )}
        </motion.div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/carbon')}
            style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            🧮 Take Carbon Calculator
          </button>
          <button
            onClick={() => navigate('/quiz')}
            style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            🌱 Improve Eco Knowledge
          </button>
        </div>

      </div>
    </div>
  );
}
