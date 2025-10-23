// src/lib/firebase.js
// ============================================
// 🔥 Firebase Core Setup untuk proyek tim DzCorps
// ============================================

// Import library yang dibutuhkan dari Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ============================================
// 🔧 Konfigurasi Firebase dari Environment (.env)
// ============================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ============================================
// 🚀 Inisialisasi Firebase
// ============================================
const app = initializeApp(firebaseConfig);

// 🧠 Analytics hanya aktif di browser environment (bukan SSR atau build)
let analytics = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

// ============================================
// 🔑 Tambahan Layanan: Authentication & Firestore
// ============================================
const auth = getAuth(app);
const db = getFirestore(app);

// ============================================
// 📦 Export semua instance agar bisa digunakan di seluruh project
// ============================================
export { app, analytics, auth, db };
