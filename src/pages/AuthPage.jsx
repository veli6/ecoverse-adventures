import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { GiEarthAmerica } from 'react-icons/gi';

export default function AuthPage() {
  const { signup, login, loginWithGoogle, resetPassword } = useAuth();
  const [mode, setMode] = useState('intro'); // intro, login, signup, forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!username.trim()) throw new Error('Username is required');
        await signup(email, password, username);
      } else if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
        setLoading(false);
        return;
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
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    }
    setLoading(false);
  }

  // Intro screen with 3D Earth
  if (mode === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-eco-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-sky-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-eco-100 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-leaf-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="earth-sphere mx-auto mb-10" style={{ width: 220, height: 220 }}></div>
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-5xl font-extrabold text-center mb-4 relative z-10"
        >
          <span className="eco-gradient-text">EcoVerse</span>{' '}
          <span className="text-gray-700">Adventures</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-gray-500 mb-10 text-center max-w-lg relative z-10"
        >
          Save the planet, one quiz at a time. Learn, play, and build a greener future.
        </motion.p>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          onClick={() => setMode('login')}
          className="eco-btn text-lg px-12 py-5 relative z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🌍 Start Your Journey
        </motion.button>
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
