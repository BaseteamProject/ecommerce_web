import { createRouter, createWebHistory } from "vue-router";

// 📄 Import views utama
import WelcomeView from "../views/WelcomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

// 📄 Import halaman tambahan (dashboard & shop)
import DashboardView from "../views/DashboardView.vue";
import ShopView from "../views/ShopView.vue";

// 🧩 Import Firebase (auth + firestore)
import { auth, db, isFirebaseConfigured } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
    meta: { requiresAuth: true, role: "buyer" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // setiap navigasi, scroll ke atas
    return { top: 0 };
  },
});

// 🚦 Middleware / Route Guard:
// Cek apakah user sudah login dan punya role yang sesuai
router.beforeEach(async (to, from, next) => {
  // Jika Firebase tidak dikonfigurasi, izinkan semua rute
  if (!isFirebaseConfigured) {
    console.warn("Firebase not configured, bypassing auth checks");
    return next();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!requiresAuth) {
    // route bebas akses
    return next();
  }

  // 🔑 Ambil user dari Firebase Auth
  const user = auth.currentUser;
  if (!user) {
    // belum login → redirect ke login
    return next("/login");
  }

  // 📦 Ambil data user dari Firestore
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn("User data not found in Firestore");
      return next("/login");
    }

    const userData = userSnap.data();

    // 🧭 Cek role user dengan meta role route
    if (to.meta.role && userData.role !== to.meta.role) {
      // Role tidak sesuai → redirect sesuai role
      if (userData.role === "admin") return next("/dashboard");
      if (userData.role === "buyer") return next("/shop");
      return next("/login");
    }

    // semua cocok → lanjut
    next();
  } catch (error) {
    console.error("Route guard error:", error);
    next("/login");
  }
});

export default router;