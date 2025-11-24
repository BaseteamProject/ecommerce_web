import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

// View Imports
import AdminDashboard from "../views/AdminDashboard.vue";
import BuyerShop from "../views/BuyerShop.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import WelcomeView from "../views/WelcomeView.vue";

const routes = [
  { path: "/", name: "Welcome", component: WelcomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  {
    path: "/shop",
    name: "Shop",
    component: BuyerShop,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Wait for the auth state to be ready before proceeding
  if (!authStore.authReady) {
    await authStore.init();
  }

  const user = authStore.user;
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;

  // Redirect logged-in users from public-only pages (like Login/Register)
  if (user && (to.name === "Login" || to.name === "Register" || to.name === "Welcome")) {
    return next(user.role === "admin" ? "/dashboard" : "/shop");
  }

  // Protect routes that require authentication
  if (requiresAuth && !user) {
    return next("/login");
  }

  // Protect admin routes
  if (requiresAdmin && user?.role !== "admin") {
    return next("/shop"); // Or a dedicated "unauthorized" page
  }

  // If all checks pass, proceed
  next();
});

export default router;
