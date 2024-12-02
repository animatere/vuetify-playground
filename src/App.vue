<template>
  <v-app :class="currentTheme === 'dark' ? 'theme--dark' : 'theme--light'">
    <navbar></navbar>
    <div class="toggle-theme">
      <v-btn @click="toggleTheme" class="theme-toggle-btn">
        <p>Current Theme: {{ currentTheme }}</p>
      </v-btn>
    </div>
    <router-view></router-view>
    <notification></notification>
    <app-footer></app-footer>
  </v-app>
</template>

<script setup lang="ts">
import { UserSettings } from '@/interfaces/interfaces'
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { useTheme } from "vuetify";

const store = useUserStore();
const { userSettings, currentUser } = storeToRefs(store); // Zugriff auf Benutzerdaten
const theme = useTheme();
const currentTheme = ref("light"); // Standardwert für Theme

// Überwache Änderungen an den Benutzereinstellungen
watch(
  () => userSettings.value?.theme,
  (newTheme) => {
    if (newTheme) {
      currentTheme.value = newTheme;
      theme.global.name.value = newTheme; // Vuetify-Theme aktualisieren
    }
  },
);

// Beim Start der App: Benutzerstatus und Einstellungen überwachen
onMounted(async () => {
  store.watchCurrentUser(); // Überwache den Benutzerstatus

  // Warte auf das Laden der Benutzereinstellungen
  if (currentUser.value) {
    await store.loadSettings(); // Benutzereinstellungen laden
  }

  // Stelle sicher, dass das Theme korrekt initialisiert ist
  currentTheme.value = userSettings.value?.theme || "light";
  theme.global.name.value = currentTheme.value;
});

// Theme umschalten und speichern
async function toggleTheme() {
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  currentTheme.value = newTheme;
  theme.global.name.value = newTheme;

  try {
    // Einstellungen speichern
    await store.saveSettings(userSettings?.value ?? {} as UserSettings);
  } catch (error) {
    console.error("Fehler beim Speichern der Einstellungen:", error);
  }
}
</script>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.theme-toggle-btn {
  width: 100%;
  margin: 0;
}
</style>
