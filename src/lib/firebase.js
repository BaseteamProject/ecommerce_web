// src/lib/firebase.js
// ============================================
// 🔥 Firebase Core Setup untuk proyek tim DzCorps
// ============================================

// Import library yang dibutuhkan dari Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

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

const isFirebaseConfigured = !!firebaseConfig.apiKey;

// ============================================
// 🚀 Inisialisasi Firebase & Services
// ============================================
let app = null;
let analytics = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    // Inisialisasi Firestore dengan persistensi offline dan sinkronisasi multi-tab
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });

    if (typeof window !== "undefined") {
      isAnalyticsSupported().then((supported) => {
        if (supported) analytics = getAnalytics(app);
      });
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    app = auth = db = analytics = null; // Pastikan semua null jika gagal
  }
} else {
  console.warn(
    "Firebase is not configured. Authentication and database features will be disabled."
  );
}

// ============================================
// 📦 Export semua instance agar bisa digunakan di seluruh project
// ============================================
export { app, analytics, auth, db, isFirebaseConfigured };
