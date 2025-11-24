<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">

    <div class="max-w-4xl w-full text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
        {{ welcomeStore.welcome[0]?.header || 'Welcome to Our E-commerce Platform' }}
      </h1>

      <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Discover amazing products and enjoy seamless shopping experience
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/login"
          class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Login
        </router-link>

        <router-link 
          to="/register"
          class="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-blue-600 hover:bg-blue-50 transition-colors duration-300"
        >
          Register
        </router-link>
      </div>
    </div>

    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
      <div 
        v-for="(c, i) in welcomeStore.cards" 
        :key="i"
        class="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ c.title }}</h3>
        <p class="text-gray-600">{{ c.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWelcomeStore } from '../stores/welcomeStore'

const welcomeStore = useWelcomeStore()

onMounted(() => {
  welcomeStore.stAll()       // LOAD DATA (WAJIB)
})
</script>

<style lang="scss" scoped></style>
