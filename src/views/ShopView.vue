<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Shop</h1>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <!-- Grid produk -->
      <div v-if="loading" class="text-center text-gray-500">Memuat produk...</div>
      <div v-else-if="products.length === 0" class="text-center text-gray-500">
        Belum ada produk tersedia.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover rounded mb-4"
          />
          <h2 class="text-xl font-semibold mb-2 text-gray-800">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-lg font-bold text-blue-600 mb-4">Rp {{ product.price.toLocaleString() }}</p>

          <button
            @click="buyNow(product)"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const router = useRouter();
const products = ref([]);
const loading = ref(true);

// 🔹 Ambil data produk dari Firestore
onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Gagal memuat produk:", err);
  } finally {
    loading.value = false;
  }
});

// 🔹 Fungsi beli sekarang
const buyNow = async (product) => {
  try {
    // Simpan order ke Firestore (opsional)
    await addDoc(collection(db, "orders"), {
      productId: product.id,
      productName: product.name,
      price: product.price,
      userId: auth.currentUser?.uid || "guest",
      createdAt: serverTimestamp(),
    });

    // Arahkan ke link Dana (contoh link statis / bisa dinamis)
    window.open("https://link.dana.id/minta?amount=" + product.price, "_blank");
  } catch (err) {
    console.error("Gagal melakukan pembelian:", err);
  }
};

// 🔹 Logout
const logout = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>
