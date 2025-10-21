<template>
  <nav
    ref="navbar"
    :class="[ 
      'fixed left-1/2 top-30 transform -translate-x-1/2  transition-all duration-500 overflow-hidden  w-full max-w-7xl',
      isScrolled
        ? 'bg-gray-950/80 backdrop-blur shadow-lg shadow-white/70'
        : 'bg-black'
    ]"
    :style="{
      top: isScrolled ? '0' : '1rem',
      borderRadius: isScrolled ? '3rem' : '2rem',
      transform: isScrolled
        ? 'translateX(-50%) scale(0.90)'
        : 'translateX(-50%) scale(1)',
    }"
  >
    <!-- Border Gradient -->
    <div
      class="absolute inset-0 rounded-[inherit] p-[2px] transition-all duration-500 pointer-events-none"
      :style="{
        background: isScrolled
          ? 'linear-gradient(to right, #8b5cf6, #1f1b2e)'
          : '#7c3aed',
        opacity: isScrolled ? 1 : 0.5
      }"
    >
      <div
        class="w-full h-full rounded-[inherit]"
        :style="{
          background: isScrolled
            ? 'rgba(10,10,15,0.8)'
            : 'rgba(0,0,0,1)'
        }"
      ></div>
    </div>

    <div class="relative flex justify-between items-center px-6 py-3 transition-all duration-500"
      :class="isScrolled ? 'py-2' : 'py-4'">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="" alt="Logo" class="h-8 w-8 rounded-full bg-violet-600" />
        <span class="text-xl font-semibold text-white tracking-wide">MyShop</span>
      </div>

      <!-- Menu kanan (desktop) -->
      <div class="hidden md:flex items-center space-x-4">
        <RouterLink
          to="/login"
          class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-violet-600 transition"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/register"
          class="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
        >
          Register
        </RouterLink>
      </div>

      <!-- Tombol menu mobile -->
      <button
        @click="toggleMenu"
        class="md:hidden text-gray-300 hover:text-violet-400 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Menu mobile -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="md:hidden bg-gray-950/95 backdrop-blur border-t border-violet-700 flex flex-col items-center space-y-2 py-4 rounded-b-2xl"
      >
        <RouterLink
          to="/login"
          class="block w-4/5 text-center px-4 py-2 rounded-lg text-gray-300 hover:bg-violet-600 hover:text-white transition"
          @click="closeMenu"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/register"
          class="block w-4/5 text-center px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
          @click="closeMenu"
        >
          Register
        </RouterLink>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => (isOpen.value = !isOpen.value);
const closeMenu = () => (isOpen.value = false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
