<template>
  <div v-if="!authStore.authReady" class="min-h-screen flex items-center justify-center">
    <p class="text-lg">Loading...</p>
  </div>
  <div v-else>
    <NavbarWelcome v-if="!authStore.user" />
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from "./stores/authStore";
import NavbarWelcome from "./components/NavbarWelcome.vue";

const authStore = useAuthStore();
</script>
