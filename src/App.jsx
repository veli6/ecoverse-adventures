import { lazy, Suspense } from 'react';
import { GameProvider } from './contexts/GameContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

// Lazy-load heavy pages so their JS is only fetched when needed
const QuizPage = lazy(() => import('./pages/QuizPage'));
const EcoCityPage = lazy(() => import('./pages/EcoCityPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const CarbonPage = lazy(() => import('./pages/CarbonPage'));
const TimeMachinePage = lazy(() => import('./pages/TimeMachinePage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));

const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4' }}>
    <p style={{ color: '#22c55e', fontWeight: 600, fontSize: 16 }}>Loading...</p>
  </div>
);

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="earth-sphere mx-auto mb-8" style={{ width: 80, height: 80 }}></div>
          <p className="text-eco-600 font-semibold text-lg">Loading EcoVerse...</p>
        </div>
      </div>
    );
  }
  return currentUser ? children : <Navigate to="/auth" />;
}

function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return currentUser ? <Navigate to="/dashboard" /> : children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/quiz/:theme/:level" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/city" element={<ProtectedRoute><EcoCityPage /></ProtectedRoute>} />
        <Route path="/news" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
        <Route path="/carbon" element={<ProtectedRoute><CarbonPage /></ProtectedRoute>} />
        <Route path="/time-machine" element={<ProtectedRoute><TimeMachinePage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <AppRoutes />
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
