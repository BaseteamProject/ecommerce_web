<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div v-if="!isFirebaseConfigured" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
        <p><strong>Perhatian:</strong> Firebase belum dikonfigurasi. Aplikasi berjalan dalam mode demo.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Manage Products</h2>
          <p class="text-gray-600">Add, edit, or delete products in the store.</p>
          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go to Products</button>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Manage Users</h2>
          <p class="text-gray-600">View and manage registered users.</p>
          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go to Users</button>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">View Reports</h2>
          <p class="text-gray-600">Check sales and analytics reports.</p>
          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Reports</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";

const router = useRouter();
const isFirebaseConfiguredRef = ref(isFirebaseConfigured);

onMounted(() => {
  // Untuk memastikan nilai terbaru
});

const logout = async () => {
  try {
    // Jika Firebase tidak dikonfigurasi, langsung redirect
    if (!isFirebaseConfigured) {
      router.push("/");
      return;
    }

    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>