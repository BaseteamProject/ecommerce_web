<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
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
        <select
          v-model="role"
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option disabled value="">-- Pilih Role --</option>
          <option value="admin">Admin</option>
          <option value="buyer">Buyer</option>
        </select>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
        >
          {{ authStore.loading ? "Memproses..." : "Daftar" }}
        </button>
      </form>

      <p v-if="authStore.errorMsg" class="text-red-500 mt-3 text-sm text-center">
        {{ authStore.errorMsg }}
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
import { useAuthStore } from "../stores/authStore";

const email = ref("");
const password = ref("");
const role = ref("");

const authStore = useAuthStore();

const handleRegister = async () => {
  await authStore.register(email.value, password.value, role.value);
};
</script>