import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routes";
import "./assets/tailwind.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Mount the app AFTER the router is ready
router.isReady().then(() => {
  app.mount("#app");
});
