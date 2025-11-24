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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "demo-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "demo-measurement-id",
};

// Validasi konfigurasi dasar
const isFirebaseConfigured = firebaseConfig.apiKey !== "demo-api-key";

// ============================================
// 🚀 Inisialisasi Firebase
// ============================================
let app, analytics, auth, db;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  
  // 🧠 Analytics hanya aktif di browser environment (bukan SSR atau build)
  analytics = null;
  if (typeof window !== "undefined") {
    isAnalyticsSupported().then((supported) => {
      if (supported) analytics = getAnalytics(app);
    });
  }
  
  // ============================================
  // 🔑 Tambahan Layanan: Authentication & Firestore
  // ============================================
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn("Firebase not configured. Using demo mode.");
  // Create mock objects for demo mode
  app = null;
  analytics = null;
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    }
  };
  db = {
    collection: () => {},
    doc: () => {},
    getDoc: () => Promise.resolve({ exists: () => false }),
    getDocs: () => Promise.resolve({ docs: [] })
  };
}

// ============================================
// 📦 Export semua instance agar bisa digunakan di seluruh project
// ============================================
export { app, analytics, auth, db, isFirebaseConfigured };