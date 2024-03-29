import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-wydtAV2zE5FZIqegTOeI7VhzTG8AGEY",
  authDomain: "millimetre-3862b.firebaseapp.com",
  projectId: "millimetre-3862b",
  storageBucket: "millimetre-3862b.appspot.com",
  messagingSenderId: "441364412875",
  appId: "1:441364412875:web:afac7178d8019d11019e4e",
  measurementId: "G-4KEF7PB742",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
