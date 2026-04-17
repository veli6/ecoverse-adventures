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
  ecoPoints: 0,
  streakCount: 0,
  lastActiveDate: null,
  treesCollected: 0,
  completedLevels: {},
  unlockedLevels: { plastic: [1], water: [1], climate: [1], energy: [1], wildlife: [1] },
  levelStars: {},
  usedQuestionIds: [],
  unlockedRewards: [],
  ecoCityElements: {},
  timeMachineStatus: 'present',
  readNewsIds: [],
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
  const newPoints = (userData.ecoPoints || 0) + points;
  const newTrees = Math.floor(newPoints / 100);
  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    ecoPoints: newPoints,
    treesCollected: newTrees,
  });
  return { ecoPoints: newPoints, treesCollected: newTrees };
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

  const completedLevels = userData.completedLevels || {};
  const unlockedLevels = userData.unlockedLevels || {};
  const levelStars = userData.levelStars || {};
  const ecoCityElements = userData.ecoCityElements || {};

  const levelKey = `${theme}_${level}`;
  completedLevels[levelKey] = true;
  levelStars[levelKey] = Math.max(levelStars[levelKey] || 0, stars);

  if (!unlockedLevels[theme]) unlockedLevels[theme] = [1];
  if (level < 5 && !unlockedLevels[theme].includes(level + 1)) {
    unlockedLevels[theme].push(level + 1);
  }

  const cityItems = ['park', 'solarHome', 'recyclingPlant', 'evStation', 'smartSystem'];
  if (level <= cityItems.length) {
    ecoCityElements[cityItems[level - 1]] = true;
  }

  const newPoints = (userData.ecoPoints || 0) + pointsEarned;
  const newTrees = Math.floor(newPoints / 100);

  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    completedLevels,
    unlockedLevels,
    levelStars,
    ecoCityElements,
    ecoPoints: newPoints,
    treesCollected: newTrees,
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
