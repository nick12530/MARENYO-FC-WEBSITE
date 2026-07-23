// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXyDb-fB2N5MpbSJagdkQVGnUFykWM8l4",
  authDomain: "marenyo-fc-database.firebaseapp.com",
  projectId: "marenyo-fc-database",
  storageBucket: "marenyo-fc-database.firebasestorage.app",
  messagingSenderId: "127211814850",
  appId: "1:127211814850:web:a62f402800db6db327a05b",
  measurementId: "G-WLEJ9QFXJ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics (Only if supported in current environment)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
