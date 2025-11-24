import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const role = ref(null);
  const loading = ref(false);
  const errorMsg = ref('');
  const router = useRouter();

  const login = async (email, password) => {
    errorMsg.value = '';
    loading.value = true;

    // Jika Firebase tidak dikonfigurasi, gunakan mode demo
    if (!isFirebaseConfigured) {
      console.warn("Firebase not configured, using demo login");
      user.value = { uid: 'demo-user-id', email: email };
      role.value = 'admin'; // Default to admin in demo mode
      loading.value = false;
      router.push('/dashboard');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', authUser.uid));
      if (!userDoc.exists()) {
        throw new Error('User data not found in the database.');
      }

      const userData = userDoc.data();
      user.value = authUser;
      role.value = userData.role;

      if (role.value === 'admin') {
        router.push('/dashboard');
      } else if (role.value === 'buyer') {
        router.push('/shop');
      } else {
        throw new Error('Unrecognized role.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMsg.value = 'Incorrect email or password.';
      } else {
        errorMsg.value = err.message || 'An error occurred during login.';
      }
    } finally {
      loading.value = false;
    }
  };

  const register = async (email, password, userRole) => {
    errorMsg.value = '';
    loading.value = true;

    // Jika Firebase tidak dikonfigurasi, gunakan mode demo
    if (!isFirebaseConfigured) {
      console.warn("Firebase not configured, using demo registration");
      user.value = { uid: 'demo-user-id', email: email };
      role.value = userRole;
      loading.value = false;
      if (userRole === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/shop');
      }
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;

      await setDoc(doc(db, "users", authUser.uid), {
        uid: authUser.uid,
        email: authUser.email,
        role: userRole,
        createdAt: new Date().toISOString(),
      });

      user.value = authUser;
      role.value = userRole;

      // Redirect langsung sesuai role
      if (userRole === "admin") router.push("/dashboard");
      else router.push("/shop");

    } catch (err) {
      console.error("Register error:", err);
      if (err.code === "auth/email-already-in-use") {
        errorMsg.value = "Email sudah terdaftar.";
      } else if (err.code === "auth/weak-password") {
        errorMsg.value = "Password terlalu lemah (minimal 6 karakter).";
      } else {
        errorMsg.value = err.message || "Terjadi kesalahan saat registrasi.";
      }
    } finally {
      loading.value = false;
    }
  };

  return { user, role, loading, errorMsg, login, register };
});