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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white p-6 rounded-lg shadow-md">
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded mb-4" />
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-lg font-bold text-green-600 mb-4">${{ product.price }}</p>
          <button class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const router = useRouter();

// Sample products (hardcoded for now)
const products = ref([
  {
    id: 1,
    name: "Product 1",
    description: "This is a sample product description.",
    price: 29.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Another sample product.",
    price: 49.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Yet another product.",
    price: 19.99,
    image: "https://via.placeholder.com/300x200",
  },
]);

const logout = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>
