import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { createUserDocument, getUserData, updateStreak } from '../lib/userService';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          let data = await getUserData(user.uid);
          if (!data) {
            data = await createUserDocument(user.uid, {
              username: user.displayName || user.email?.split('@')[0] || 'EcoWarrior',
              email: user.email,
            });
          }
          await updateStreak(user.uid);
          data = await getUserData(user.uid);
          setUserData(data);
        } catch (err) {
          console.error('Error loading user data:', err);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signup(email, password, username) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: username });
    await createUserDocument(cred.user.uid, { username, email });
    const data = await getUserData(cred.user.uid);
    setUserData(data);
    return cred;
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await updateStreak(cred.user.uid);
    const data = await getUserData(cred.user.uid);
    setUserData(data);
    return cred;
  }

  async function loginWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider);
    let data = await getUserData(cred.user.uid);
    if (!data) {
      data = await createUserDocument(cred.user.uid, {
        username: cred.user.displayName || 'EcoWarrior',
        email: cred.user.email,
      });
    }
    await updateStreak(cred.user.uid);
    data = await getUserData(cred.user.uid);
    setUserData(data);
    return cred;
  }

  async function logout() {
    await signOut(auth);
    setUserData(null);
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function refreshUserData() {
    if (currentUser) {
      const data = await getUserData(currentUser.uid);
      setUserData(data);
      return data;
    }
    return null;
  }

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    refreshUserData,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
