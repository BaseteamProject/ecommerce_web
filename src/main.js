import { createApp } from 'vue'
import './assets/tailwind.css'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'
import { createPinia } from 'pinia';

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app');
