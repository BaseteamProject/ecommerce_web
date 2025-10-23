import { createRouter, createWebHistory } from "vue-router";

// Import views
import WelcomeView from "../views/WelcomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

// (Opsional, tambahkan jika sudah ada nanti)
import DashboardView from "../views/DashboardView.vue";
import ShopView from "../views/ShopView.vue";

// Import Firebase (auth + firestore)
import { auth, db } from "../lib/firebase";
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
    return { top: 0 };
  },
});

// 🚦 Middleware: Cek login & role user
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!requiresAuth) {
    return next(); // bebas akses jika route tidak butuh login
  }

  const user = auth.currentUser;
  if (!user) {
    return next("/login"); // jika belum login, arahkan ke login
  }

  // Ambil role user dari Firestore
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();

  if (!userData) {
    return next("/login");
  }

  // Cek role sesuai meta route
  if (to.meta.role && userData.role !== to.meta.role) {
    // jika role tidak cocok, redirect sesuai role user
    if (userData.role === "admin") return next("/dashboard");
    if (userData.role === "buyer") return next("/shop");
  }

  next();
});

export default router;
