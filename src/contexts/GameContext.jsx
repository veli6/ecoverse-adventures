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
    if (!userData?.progress?.completedLevels) return 0;
    return userData.progress.completedLevels.length;
  }, [userData]);

  const getCityProgress = useCallback(() => {
    if (!userData?.progress?.completedLevels) return 0;
    const total = 5;
    // Map completed levels to city progress if needed, or just use count
    const built = Math.min(userData.progress.completedLevels.length, total);
    return Math.round((built / total) * 100);
  }, [userData]);

  const getThemeProgress = useCallback((theme) => {
    if (!userData?.progress?.completedLevels) return { completed: 0, total: 5 };
    let completed = 0;
    userData.progress.completedLevels.forEach(key => {
      if (key.toLowerCase().startsWith(`${theme.toLowerCase()}_`)) completed++;
    });
    return { completed, total: 5 };
  }, [userData]);

  const isLevelUnlocked = useCallback((theme, level) => {
    if (!userData || !userData.progress || !userData.progress.completedLevels) {
      return level === 1;
    }

    const completedLevels = (userData.progress.completedLevels || []).map(k => k.toLowerCase());

    // Level 1 always unlocked
    if (level === 1) return true;

    const prevLevelKey = `${theme.toLowerCase()}_${level - 1}`;

    return completedLevels.map(k => k.toLowerCase()).includes(prevLevelKey);
  }, [userData]);

  const isLevelCompleted = useCallback((theme, level) => {
    if (!userData?.progress?.completedLevels) return false;
    return userData.progress.completedLevels
      .map(k => k.toLowerCase())
      .includes(`${theme.toLowerCase()}_${level}`);
  }, [userData]);

  const getLevelStars = useCallback((theme, level) => {
    // levelStars was removed in favor of a simpler progress model as per request
    // but if we need it, we can re-add it to progress object. 
    // For now, return 0 or 3 based on completion
    return isLevelCompleted(theme, level) ? 3 : 0;
  }, [isLevelCompleted]);

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
