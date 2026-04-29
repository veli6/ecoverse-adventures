import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiLogOut, FiZap, FiTrendingUp, FiAward, FiPlay, FiMap, FiActivity } from 'react-icons/fi';
import { GiTreehouse } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useCO2Data } from '../hooks/useCO2Data';

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        border: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Gradient blob background */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '80px', height: '80px', borderRadius: '50%',
        background: gradient, opacity: 0.12,
      }} />
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: gradient, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: 'white', flexShrink: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
        <p style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '2px 0 0 0', lineHeight: 1.1 }}>{value}</p>
      </div>
    </motion.div>
  );
}

// ─── Nav Action Button ──────────────────────────────────────────────────────────
function ActionButton({ label, icon, gradient, onClick, small }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: small ? '9px 16px' : '11px 20px',
        borderRadius: '12px',
        background: gradient || '#f1f5f9',
        color: gradient ? 'white' : '#64748b',
        border: 'none', cursor: 'pointer',
        fontSize: small ? '13px' : '14px',
        fontWeight: '600',
        boxShadow: gradient ? '0 2px 10px rgba(0,0,0,0.15)' : 'none',
        transition: 'box-shadow 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {icon} {label}
    </motion.button>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ label, value, max, suffix, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>{label}</span>
        <span style={{ fontSize: '14px', fontWeight: '700', color: color }}>{suffix}</span>
      </div>
      <div style={{ height: '10px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
          style={{ height: '100%', borderRadius: '999px', background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
// ─── CO2 Tracker Widget ─────────────────────────────────────────────────────────
function CO2TrackerWidget() {
  const { data, loading } = useCO2Data();

  // Inline sparkline SVG
  const Sparkline = ({ points }) => {
    if (!points?.length) return null;
    const ppms = points.map(p => p.ppm);
    const min = Math.min(...ppms) - 1;
    const max = Math.max(...ppms) + 1;
    const w = 200, h = 48;
    const coords = ppms.map((v, i) => {
      const x = (i / (ppms.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    });
    return (
      <svg width={w} height={h} style={{ overflow: 'visible' }}>
        <polyline points={coords.join(' ')} fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
        {/* last dot */}
        <circle cx={coords[coords.length - 1].split(',')[0]} cy={coords[coords.length - 1].split(',')[1]} r="3" fill="#f97316" />
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.52 }}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1c1917 100%)',
        borderRadius: '20px', padding: '24px 28px',
        color: 'white', marginTop: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '1px solid rgba(249,115,22,0.2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        {/* Left: live reading */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 16 }}>🌡️</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>
              Live Atmospheric CO₂
            </p>
            <span style={{ fontSize: 10, color: '#64748b', background: '#1e293b', padding: '2px 8px', borderRadius: 99 }}>
              Mauna Loa, NOAA
            </span>
          </div>
          {loading ? (
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Fetching live data...</p>
          ) : !data ? (
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Data unavailable</p>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: '#f97316', lineHeight: 1 }}>
                  {data.latestPpm.toFixed(1)}
                </span>
                <span style={{ fontSize: 16, color: '#94a3b8', fontWeight: 600 }}>ppm</span>
              </div>
              <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
                {data.annualIncrease !== null && (
                  <div>
                    <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 0.5 }}>vs last year</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#fb923c', margin: 0 }}>+{data.annualIncrease} ppm</p>
                  </div>
                )}
                {data.decadeIncrease !== null && (
                  <div>
                    <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 0.5 }}>vs 10 yrs ago</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#ef4444', margin: 0 }}>+{data.decadeIncrease} ppm</p>
                  </div>
                )}
              </div>
              <p style={{ fontSize: 11, color: '#475569', marginTop: 8 }}>Week of {data.date}</p>
            </>
          )}
        </div>

        {/* Right: sparkline */}
        {!loading && data?.sparkline?.length > 1 && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              10-year trend
            </p>
            <Sparkline points={data.sparkline} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: '#475569' }}>{data.sparkline[0]?.year}</span>
              <span style={{ fontSize: 10, color: '#475569' }}>{data.sparkline[data.sparkline.length - 1]?.year}</span>
            </div>
          </div>
        )}
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* ── TOP HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '16px', marginBottom: '36px',
          }}
        >
          {/* Brand + Welcome */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
              }}>🌍</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                Eco<span style={{ color: '#22c55e' }}>Verse</span>
              </h1>
            </div>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
              Welcome back, <strong style={{ color: '#22c55e' }}>{userData?.username || 'EcoWarrior'}</strong> 🌿
            </p>
          </div>

          {/* Logout + Reset */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => alert("Progress reset is handled by account deletion or contacting support in this version.")}
              style={{
                padding: '9px 16px', borderRadius: '10px', fontSize: '13px',
                fontWeight: '600', border: '1.5px solid #fed7aa',
                color: '#ea580c', backgroundColor: 'white', cursor: 'pointer',
              }}
            >
              Reset Progress
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 16px', borderRadius: '10px', fontSize: '13px',
                fontWeight: '600', border: '1.5px solid #e2e8f0',
                color: '#64748b', backgroundColor: 'white', cursor: 'pointer',
              }}
            >
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </motion.div>

        {/* ── QUICK ACTIONS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          style={{
            display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px',
          }}
        >
          <ActionButton label="Start Quiz" icon={<FiPlay size={16} />} gradient="linear-gradient(135deg, #22c55e, #16a34a)" onClick={() => navigate('/quiz')} />
          <ActionButton label="Eco City" icon={<FiMap size={16} />} gradient="linear-gradient(135deg, #3b82f6, #1d4ed8)" onClick={() => navigate('/city')} />
          <ActionButton label="Carbon Calculator" icon={<FiTrendingUp size={16} />} gradient="linear-gradient(135deg, #f59e0b, #d97706)" onClick={() => navigate('/carbon')} />
          <ActionButton label="Environment News" icon="🌐" gradient="linear-gradient(135deg, #8b5cf6, #6d28d9)" onClick={() => navigate('/news')} />
          <ActionButton label="Time Machine" icon="⏳" gradient="linear-gradient(135deg, #06b6d4, #0891b2)" onClick={() => navigate('/time-machine')} />
        </motion.div>

        {/* ── STATS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}>
          <StatCard icon={<FiZap size={22} />} label="Eco Points" value={ecoPoints.toLocaleString()} gradient="linear-gradient(135deg,#22c55e,#16a34a)" delay={0} />
          <StatCard icon={<FiActivity size={22} />} label="Streak Days" value={`${streak} 🔥`} gradient="linear-gradient(135deg,#f97316,#dc2626)" delay={0.08} />
          <StatCard icon={<GiTreehouse size={22} />} label="Trees Planted" value={`${trees} 🌳`} gradient="linear-gradient(135deg,#10b981,#059669)" delay={0.16} />
          <StatCard icon={<FiAward size={22} />} label="Levels Done" value={`${levelsDone}/${totalLevels}`} gradient="linear-gradient(135deg,#a78bfa,#6d28d9)" delay={0.24} />
        </div>

        {/* ── PROGRESS + FOREST ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              background: 'white', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
              }}>📊</div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Progress Overview</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ProgressBar
                label="Reward Progress"
                value={ecoPoints % 100}
                max={100}
                suffix={`${ecoPoints % 100}/100 to next tree`}
                color="#22c55e"
              />
              <ProgressBar
                label="Overall Completion"
                value={levelsDone}
                max={totalLevels}
                suffix={`${completionPercent}%`}
                color="#a78bfa"
              />
            </div>
          </motion.div>

          {/* Virtual Forest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'white', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'linear-gradient(135deg,#10b981,#059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
              }}>🌳</div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Your Virtual Forest</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', marginTop: '4px' }}>
              Earn 100 eco points to plant a tree · Total: <strong style={{ color: '#16a34a' }}>{trees}</strong>
            </p>
            <div style={{
              minHeight: '80px', display: 'flex', flexWrap: 'wrap', gap: '6px',
              padding: '14px', borderRadius: '12px', background: '#f8fffe',
              border: '1px dashed #bbf7d0', alignContent: 'flex-start',
            }}>
              {trees > 0 ? (
                Array.from({ length: Math.min(trees, 100) }).map((_, i) => (
                  <span key={i} style={{ fontSize: '28px', lineHeight: 1 }}>
                    {trees <= 2 ? '🌱' : trees <= 5 ? '🌳' : '🌲'}
                  </span>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 'auto' }}>
                  No trees yet. Complete quizzes to grow your forest! 🌱
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── ECO CITY BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
            padding: '36px 40px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Decorative glows */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '180px', height: '180px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-30px', left: '15%',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0' }}>
                Your Eco City
              </p>
              <h2 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 8px 0', color: 'white' }}>
                {getCityMessage(ecoPoints)}
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                {ecoPoints.toLocaleString()} Eco Points earned
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex', gap: '16px', fontSize: '52px',
                padding: '20px 28px', borderRadius: '18px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                {getCityVisual(ecoPoints).map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.1, type: 'spring', stiffness: 200 }}
                    title={item}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
              <button
                onClick={() => navigate('/city')}
                style={{
                  padding: '10px 24px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  fontSize: '14px', fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(34,197,94,0.35)',
                }}
              >
                View Full City →
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── CO2 TRACKER ── */}
        <CO2TrackerWidget />

      </div>
    </div>
  );
}
