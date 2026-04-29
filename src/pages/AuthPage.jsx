import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { GiEarthAmerica } from 'react-icons/gi';

// Floating particle
function Particle({ x, y, size, emoji, delay, duration }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-20, -80, -140, -200], x: [0, x * 0.3, x * 0.6, x] }}
      transition={{ delay, duration, repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
      style={{ position: 'absolute', left: `${x}%`, bottom: `${y}%`, fontSize: size, pointerEvents: 'none', zIndex: 1 }}
    >
      {emoji}
    </motion.div>
  );
}

const PARTICLES = [
  { x: 8,  y: 5,  size: 28, emoji: '🌿', delay: 0,   duration: 4 },
  { x: 18, y: 10, size: 22, emoji: '🍃', delay: 0.8, duration: 5 },
  { x: 30, y: 3,  size: 24, emoji: '🌱', delay: 1.5, duration: 4.5 },
  { x: 45, y: 8,  size: 20, emoji: '🦋', delay: 0.3, duration: 6 },
  { x: 60, y: 5,  size: 26, emoji: '🌸', delay: 1.2, duration: 4 },
  { x: 72, y: 12, size: 22, emoji: '🍀', delay: 0.6, duration: 5.5 },
  { x: 82, y: 4,  size: 24, emoji: '🌻', delay: 2,   duration: 4 },
  { x: 92, y: 9,  size: 20, emoji: '🌾', delay: 1,   duration: 5 },
  { x: 55, y: 15, size: 18, emoji: '🐝', delay: 2.5, duration: 6 },
  { x: 25, y: 18, size: 18, emoji: '🦅', delay: 1.8, duration: 7 },
];

const FEATURES = [
  { icon: '🧠', label: 'Eco Quizzes' },
  { icon: '🏙️', label: 'Build Your City' },
  { icon: '⏳', label: 'Time Machine' },
  { icon: '🌡️', label: 'Live CO₂ Data' },
  { icon: '🧮', label: 'Carbon Tracker' },
  { icon: '🏆', label: 'Leaderboard' },
];

export default function AuthPage() {
  const { signup, login, loginWithGoogle, resetPassword } = useAuth();
  const [mode, setMode] = useState('intro');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (mode === 'signup') {
        if (!username.trim()) throw new Error('Username is required');
        await signup(email, password, username);
      } else if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
        setLoading(false); return;
      }
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already registered'
        : err.code === 'auth/invalid-credential' ? 'Invalid email or password'
        : err.code === 'auth/weak-password' ? 'Password must be at least 6 characters'
        : err.code === 'auth/user-not-found' ? 'No account found with this email'
        : err.message || 'Something went wrong';
      setError(msg);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setError(''); setLoading(true);
    try { await loginWithGoogle(); }
    catch (err) { setError(err.message || 'Google sign-in failed'); }
    setLoading(false);
  }

  // ── INTRO / LANDING ──────────────────────────────────────────────────────────
  if (mode === 'intro') {
    return (
      <div style={{
        minHeight: '100vh', overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(160deg, #0a1628 0%, #0d2818 40%, #0a1628 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      }}>

        {/* Animated aurora background */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', left: '-10%',
            width: '70%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '-10%', right: '-10%',
            width: '60%', height: '60%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Star field */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              width: Math.random() > 0.8 ? 3 : 2,
              height: Math.random() > 0.8 ? 3 : 2,
              borderRadius: '50%',
              background: 'white',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Floating eco particles from bottom */}
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

        {/* Main content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 700 }}>

          {/* Animated Earth */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ marginBottom: 32 }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -24,
                  border: '1.5px dashed rgba(34,197,94,0.3)',
                  borderRadius: '50%',
                }}
              />
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: -24, borderRadius: '50%' }}
              >
                <div style={{
                  position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                  width: 12, height: 12, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #0ea5e9)',
                  boxShadow: '0 0 12px rgba(34,197,94,0.8)',
                }} />
              </motion.div>
              <div className="earth-sphere" style={{ width: 180, height: 180 }} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, margin: '0 0 12px', lineHeight: 1.05, color: 'white' }}>
              Eco<span style={{
                background: 'linear-gradient(135deg, #22c55e, #4ade80, #0ea5e9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Verse</span>
            </h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', margin: '0 0 40px', lineHeight: 1.6 }}
            >
              Save the planet, one quiz at a time.<br />Learn, play, and build a greener future.
            </motion.p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 44 }}
          >
            {FEATURES.map(({ icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500,
                  backdropFilter: 'blur(8px)', cursor: 'default',
                }}
              >
                <span style={{ fontSize: 18 }}>{icon}</span> {label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,197,94,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setMode('login')}
            style={{
              padding: '18px 52px', borderRadius: 99, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white', fontSize: 18, fontWeight: 700,
              boxShadow: '0 8px 32px rgba(34,197,94,0.35)',
              letterSpacing: 0.3,
            }}
          >
            🌍 Start Your Journey
          </motion.button>

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 3, duration: 2, repeat: Infinity }}
            style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 32 }}
          >
            Join thousands of eco warriors worldwide
          </motion.p>
        </div>

        {/* Bottom ground glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(0deg, rgba(34,197,94,0.08) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-eco-100 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-sky-100 rounded-full opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="eco-card p-8 md:p-10 shadow-eco-lg border border-eco-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-eco-100 mb-4">
              <GiEarthAmerica className="text-eco-600" size={36} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {mode === 'login' && 'Welcome Back!'}
              {mode === 'signup' && 'Join EcoVerse'}
              {mode === 'forgot' && 'Reset Password'}
            </h2>
            <p className="text-gray-500 mt-2">
              {mode === 'login' && 'Continue your eco adventure'}
              {mode === 'signup' && 'Start saving the planet today'}
              {mode === 'forgot' && "We'll send you a reset link"}
            </p>
          </div>

          {/* Error/Success */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-eco-50 border border-eco-200 text-eco-700 px-5 py-4 rounded-xl mb-6"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-eco-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-eco-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                required
              />
            </div>

            {mode !== 'forgot' && (
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:border-eco-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none p-0"
                >
                  {showPw ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                </button>
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }}
                  className="text-eco-600 hover:text-eco-700 font-medium bg-transparent border-none p-0"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="eco-btn w-full py-5 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  {mode === 'login' && '🌿 Sign In'}
                  {mode === 'signup' && '🌱 Create Account'}
                  {mode === 'forgot' && '📧 Send Reset Link'}
                </>
              )}
            </motion.button>
          </form>

          {/* Google Sign In */}
          {mode !== 'forgot' && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-400 font-medium">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <motion.button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 bg-white disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FcGoogle size={28} />
                Continue with Google
              </motion.button>
            </>
          )}

          {/* Toggle mode */}
          <div className="text-center mt-8">
            {mode === 'login' && (
              <p className="text-gray-500">
                New to EcoVerse?{' '}
                <button onClick={() => { setMode('signup'); setError(''); }} className="text-eco-600 font-semibold hover:text-eco-700 bg-transparent border-none p-0">
                  Sign Up
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-gray-500">
                Already have an account?{' '}
                <button onClick={() => { setMode('login'); setError(''); }} className="text-eco-600 font-semibold hover:text-eco-700 bg-transparent border-none p-0">
                  Sign In
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="text-eco-600 font-semibold hover:text-eco-700 bg-transparent border-none p-0">
                ← Back to Sign In
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
