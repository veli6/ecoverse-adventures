import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

export const defaultUserData = {
  username: '',
  email: '',
  selectedTheme: null,
  selectedAgeGroup: null,
  streakCount: 0,
  lastActiveDate: null,
  usedQuestionIds: [],
  unlockedRewards: [],
  ecoCityElements: {},
  timeMachineStatus: 'present',
  readNewsIds: [],
  progress: {
    ecoPoints: 0,
    trees: 0,
    completedLevels: [],
    level: 1,
    islandSize: 5
  },
  createdAt: new Date().toISOString(),
};

export async function createUserDocument(uid, data) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const existing = await getDoc(userRef);
  if (!existing.exists()) {
    await setDoc(userRef, {
      ...defaultUserData,
      ...data,
      createdAt: new Date().toISOString(),
    });
  }
  return getUserData(uid);
}

export async function getUserData(uid) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return { uid, ...snap.data() };
  }
  return null;
}

export async function updateUserData(uid, updates) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, updates);
  return getUserData(uid);
}

export async function addEcoPoints(uid, points) {
  const userData = await getUserData(uid);
  if (!userData) return;
  
  const currentProgress = userData.progress || defaultUserData.progress;
  const newPoints = (currentProgress.ecoPoints || 0) + points;
  const newTrees = Math.floor(newPoints / 100);
  
  const updatedProgress = {
    ...currentProgress,
    ecoPoints: newPoints,
    trees: newTrees,
  };

  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    progress: updatedProgress
  });
  
  return updatedProgress;
}

export async function markQuestionUsed(uid, questionId) {
  const userData = await getUserData(uid);
  if (!userData) return;
  const used = userData.usedQuestionIds || [];
  if (!used.includes(questionId)) {
    used.push(questionId);
    await updateDoc(doc(db, USERS_COLLECTION, uid), { usedQuestionIds: used });
  }
}

export async function completeLevel(uid, theme, level, stars, pointsEarned) {
  const userData = await getUserData(uid);
  if (!userData) return;

  const currentProgress = userData.progress || defaultUserData.progress;
  const completedLevels = currentProgress.completedLevels || [];
  const levelKey = `${theme}_${level}`;
  
  if (!completedLevels.includes(levelKey)) {
    completedLevels.push(levelKey);
  }

  const newPoints = (currentProgress.ecoPoints || 0) + pointsEarned;
  const newTrees = Math.floor(newPoints / 100);
  const nextLevel = Math.max(currentProgress.level || 1, level + 1);

  const updatedProgress = {
    ...currentProgress,
    completedLevels,
    ecoPoints: newPoints,
    trees: newTrees,
    level: nextLevel
  };

  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    progress: updatedProgress
  });

  return getUserData(uid);
}

export async function markNewsRead(uid, newsId) {
  const userData = await getUserData(uid);
  if (!userData) return;
  const read = userData.readNewsIds || [];
  if (!read.includes(newsId)) {
    read.push(newsId);
    const newPoints = (userData.ecoPoints || 0) + 5;
    const newTrees = Math.floor(newPoints / 100);
    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      readNewsIds: read,
      ecoPoints: newPoints,
      treesCollected: newTrees,
    });
  }
}

export async function updateStreak(uid) {
  const userData = await getUserData(uid);
  if (!userData) return;

  const today = new Date().toDateString();
  const lastActive = userData.lastActiveDate;

  if (lastActive === today) return userData.streakCount;

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let newStreak = 1;
  if (lastActive === yesterday) {
    newStreak = (userData.streakCount || 0) + 1;
  }

  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    streakCount: newStreak,
    lastActiveDate: today,
  });

  return newStreak;
}

export async function getLeaderboard(count = 20) {
  const q = query(
    collection(db, USERS_COLLECTION),
    orderBy('ecoPoints', 'desc'),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc, index) => ({
    rank: index + 1,
    uid: doc.id,
    ...doc.data(),
  }));
}
