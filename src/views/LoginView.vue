<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>

      <form @submit.prevent="loginUser" class="flex flex-col gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
        >
          {{ loading ? "Memproses..." : "Login" }}
        </button>
      </form>

      <p v-if="errorMsg" class="text-red-500 mt-3 text-sm text-center">
        {{ errorMsg }}
      </p>

      <p class="mt-6 text-sm text-center text-gray-600">
        Belum punya akun?
        <router-link to="/register" class="text-blue-500 hover:underline font-medium">
          Daftar di sini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);
const router = useRouter();

const loginUser = async () => {
  errorMsg.value = "";
  loading.value = true;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Ambil role dari Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("Data pengguna tidak ditemukan di database.");
    }

    const role = userDoc.data().role;
    console.log("Role:", role);

    // Redirect sesuai role
    if (role === "admin") router.push("/dashboard");
    else if (role === "buyer") router.push("/shop");
    else throw new Error("Role tidak dikenali.");

  } catch (err) {
    console.error("Login error:", err);
    if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
      errorMsg.value = "Email atau password salah.";
    } else {
      errorMsg.value = err.message || "Terjadi kesalahan saat login.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
