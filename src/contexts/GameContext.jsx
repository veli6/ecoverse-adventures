import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { updateUserData, completeLevel as completeLevelService, markNewsRead as markNewsReadService, addEcoPoints } from '../lib/userService';

const GameContext = createContext(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export function GameProvider({ children }) {
  const { currentUser, userData, refreshUserData } = useAuth();
  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [levelResults, setLevelResults] = useState(null);

  const selectTheme = useCallback(async (theme) => {
    setCurrentTheme(theme);
    if (currentUser) {
      await updateUserData(currentUser.uid, { selectedTheme: theme });
      await refreshUserData();
    }
  }, [currentUser, refreshUserData]);

  const selectAgeGroup = useCallback(async (ageGroup) => {
    if (currentUser) {
      await updateUserData(currentUser.uid, { selectedAgeGroup: ageGroup });
      await refreshUserData();
    }
  }, [currentUser, refreshUserData]);

  const finishLevel = useCallback(async (theme, level, stars, pointsEarned) => {
    if (!currentUser) return;
    await completeLevelService(currentUser.uid, theme, level, stars, pointsEarned);
    await refreshUserData();
    setLevelResults({ theme, level, stars, pointsEarned });
    setShowLevelComplete(true);
  }, [currentUser, refreshUserData]);

  const readNews = useCallback(async (newsId) => {
    if (!currentUser) return;
    await markNewsReadService(currentUser.uid, newsId);
    await refreshUserData();
  }, [currentUser, refreshUserData]);

  const getCompletedLevelCount = useCallback(() => {
    if (!userData?.completedLevels) return 0;
    return Object.keys(userData.completedLevels).length;
  }, [userData]);

  const getCityProgress = useCallback(() => {
    if (!userData?.ecoCityElements) return 0;
    const total = 5;
    const built = Object.keys(userData.ecoCityElements).length;
    return Math.round((built / total) * 100);
  }, [userData]);

  const getThemeProgress = useCallback((theme) => {
    if (!userData?.completedLevels) return { completed: 0, total: 5 };
    let completed = 0;
    for (let i = 1; i <= 5; i++) {
      if (userData.completedLevels[`${theme}_${i}`]) completed++;
    }
    return { completed, total: 5 };
  }, [userData]);

  const isLevelUnlocked = useCallback((theme, level) => {
    if (!userData?.unlockedLevels) return level === 1;
    return userData.unlockedLevels[theme]?.includes(level) || false;
  }, [userData]);

  const isLevelCompleted = useCallback((theme, level) => {
    if (!userData?.completedLevels) return false;
    return !!userData.completedLevels[`${theme}_${level}`];
  }, [userData]);

  const getLevelStars = useCallback((theme, level) => {
    if (!userData?.levelStars) return 0;
    return userData.levelStars[`${theme}_${level}`] || 0;
  }, [userData]);

  const value = {
    currentTheme,
    currentLevel,
    showLevelComplete,
    levelResults,
    setCurrentTheme,
    setCurrentLevel,
    setShowLevelComplete,
    selectTheme,
    selectAgeGroup,
    finishLevel,
    readNews,
    getCompletedLevelCount,
    getCityProgress,
    getThemeProgress,
    isLevelUnlocked,
    isLevelCompleted,
    getLevelStars,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
