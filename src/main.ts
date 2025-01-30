// Plugins
import { registerPlugins } from "@/plugins";
import "vuetify/styles";

// Components
import App from "./App.vue";
import { createI18n } from 'vue-i18n'
import de from "@/locales/de.json";
import en from "@/locales/en.json";

// Composables
import { createApp } from "vue";

const i18n = createI18n({
    globalInjection: true, // Ermöglicht direkte Nutzung von $t
    locale: "de", // Standardsprache
    fallbackLocale: "en", // Fallback-Sprache
    messages: {
        de,
        en,
      },
})
  
const app = createApp(App);
app.use(i18n)

registerPlugins(app);

app.mount("#app");
