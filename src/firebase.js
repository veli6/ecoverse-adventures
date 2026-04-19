import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey:  "AIzaSyDU_dasJt9PKV06gbjQ9FUSi-JpCU89qTM",
  authDomain: "ecoverse-adventures.firebaseapp.com",
  projectId: "ecoverse-adventures",
  storageBucket: "ecoverse-adventures.firebasestorage.app",
  messagingSenderId: "1059997777693",
  appId: "1:1059997777693:web:7a3b4fd3259e338ed6abf4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
