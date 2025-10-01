// Plugins
import { registerPlugins } from "@/plugins";
import "vuetify/styles";

// Components
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import de from "@/locales/de.json";
import en from "@/locales/en.json";

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia"; // <--- Pinia importieren
import { useUserStore } from "./stores/UserStore";
import { useItemStore } from "./stores/ItemStore";

const i18n = createI18n({
  globalInjection: true,
  locale: "de",
  fallbackLocale: "en",
  messages: { de, en },
});

const app = createApp(App);

// Pinia erstellen und registrieren
const pinia = createPinia();
app.use(pinia);

app.use(i18n);
registerPlugins(app);

// User Store: Auth Listener starten
const userStore = useUserStore();
userStore.initAuthListener();

// Item Store: Items einmal laden und Auto-Refresh starten
const itemStore = useItemStore();
itemStore.loadItems().then(() => {
  itemStore.startAutoRefresh();
});

app.mount("#app");
