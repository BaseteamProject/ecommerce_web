<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>

      <form @submit.prevent="registerUser" class="flex flex-col gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <select
          v-model="role"
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        >
          <option disabled value="">-- Pilih Role --</option>
          <option value="admin">Admin</option>
          <option value="buyer">Buyer</option>
        </select>

        <button
          type="submit"
          class="bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
        >
          Daftar
        </button>
      </form>

      <p v-if="errorMsg" class="text-red-500 mt-3 text-sm text-center">
        {{ errorMsg }}
      </p>

      <p class="mt-6 text-sm text-center text-gray-600">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-500 hover:underline font-medium">
          Login di sini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const email = ref("");
const password = ref("");
const role = ref("");
const errorMsg = ref("");
const router = useRouter();

const registerUser = async () => {
  errorMsg.value = "";

  if (!role.value) {
    errorMsg.value = "Harap pilih role (admin atau buyer).";
    return;
  }

  try {
    // 🔹 1️⃣ Daftarkan user di Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // 🔹 2️⃣ Simpan data user + role ke Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: role.value,
      createdAt: new Date().toISOString(),
    });

    // 🔹 3️⃣ Redirect sesuai role
    if (role.value === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/shop");
    }

  } catch (err) {
    console.error("Register error:", err);
    if (err.code === "auth/email-already-in-use") {
      errorMsg.value = "Email sudah terdaftar.";
    } else if (err.code === "auth/weak-password") {
      errorMsg.value = "Password terlalu lemah (minimal 6 karakter).";
    } else {
      errorMsg.value = err.message || "Terjadi kesalahan saat registrasi.";
    }
  }
};
</script>
