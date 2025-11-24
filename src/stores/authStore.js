import { defineStore } from "pinia";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../lib/firebase";
import router from "../routes";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    errorMsg: "",
    authReady: false,
  }),

  actions: {
    init() {
      if (!isFirebaseConfigured) {
        this.authReady = true;
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          this.loading = true;
          if (firebaseUser) {
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              this.user = { ...firebaseUser, ...userSnap.data() };
            } else {
              this.user = null;
            }
          } else {
            this.user = null;
          }
          this.loading = false;
          if (!this.authReady) {
            this.authReady = true;
            resolve();
          }
        });
      });
    },

    async login(email, password) {
      if (!isFirebaseConfigured) return;
      this.loading = true;
      this.errorMsg = "";
      try {
        // 1. Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // 2. Fetch the user's profile from Firestore to get the role
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          // 3. Update the local store state immediately
          this.user = { ...firebaseUser, ...userData };

          // 4. Redirect based on role
          if (this.user.role === 'admin') {
            router.push('/dashboard');
          } else {
            router.push('/shop');
          }
        } else {
          await signOut(auth);
          this.user = null;
          throw new Error("User profile not found. Please contact support.");
        }
      } catch (error) {
        this.errorMsg = error.message;
        this.user = null;
        console.error("Login failed:", error);
      } finally {
        this.loading = false;
      }
    },

    async register(email, password, userData) {
      if (!isFirebaseConfigured) return;
      this.loading = true;
      this.errorMsg = "";
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const userRef = doc(db, "users", firebaseUser.uid);
        const newUserData = { ...userData, uid: firebaseUser.uid, email: email };
        await setDoc(userRef, newUserData);

        await signOut(auth);
        router.push("/login");
      } catch (error) {
        this.errorMsg = error.message;
        console.error("Registration failed:", error);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      if (!isFirebaseConfigured) return;
      try {
        await signOut(auth);
        this.user = null;
        router.push("/");
      } catch (error) {
        this.errorMsg = error.message;
        console.error("Logout failed:", error);
      }
    },
  },
});
