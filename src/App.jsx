import { GameProvider } from './contexts/GameContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import EcoCityPage from './pages/EcoCityPage';
import NewsPage from './pages/NewsPage';
import CarbonPage from './pages/CarbonPage';

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
    <Routes>
      <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/quiz" element={
        <ProtectedRoute>
          <QuizPage />
        </ProtectedRoute>
      } />
      <Route path="/quiz/:theme/:level" element={
        <ProtectedRoute>
          <QuizPage />
        </ProtectedRoute>
      } />
      <Route path="/city" element={<ProtectedRoute><EcoCityPage /></ProtectedRoute>} />
      <Route path="/news" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
      <Route path="/carbon" element={<ProtectedRoute><CarbonPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
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
