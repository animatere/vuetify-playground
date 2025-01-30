<template>
  <v-app :class="currentTheme === 'dark' ? 'theme--dark' : 'theme--light'">
    <v-container fluid>
      
      <v-row>
        <navbar class="navbar-main"></navbar>
      </v-row>

      <v-row>
        <div class="theme-row">
          <v-btn @click="toggleTheme" class="theme-switcher">
            <p>Current Theme: {{ currentTheme }}</p>
          </v-btn>
        </div>
      </v-row>

      <v-row>
        <v-main class="main-content-row">
          <router-view class="main-content-col"></router-view>
        </v-main>
        <!-- ToDo: notification funktioniert optisch nicht wie es soll -->
        <!-- <notification></notification> -->
      </v-row>

      <v-row>
        <v-footer class="footer-row">
          <app-footer></app-footer>
        </v-footer>
      </v-row>
      
    </v-container>
  </v-app>
</template>


<script setup lang="ts">
import { UserSettings } from "@/interfaces/interfaces";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { useTheme } from "vuetify";

const store = useUserStore();
const { userSettings } = storeToRefs(store);
const theme = useTheme();
const currentTheme = ref("light");
const isThemeSwitching = ref(false); // Neue Variable für die Abklingzeit


watch(
  () => userSettings.value?.theme,
  (newTheme) => {
    if (newTheme) {
      currentTheme.value = newTheme;
      theme.global.name.value = newTheme;
    }
  },
);

onMounted(async () => {
  store.checkAuth();

  currentTheme.value = userSettings.value?.theme || "light";
  theme.global.name.value = currentTheme.value;
});

async function toggleTheme() {
  if (isThemeSwitching.value) return;
  isThemeSwitching.value = true;

  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  currentTheme.value = newTheme;
  theme.global.name.value = newTheme;

  try {
    await store.loadSettings();

    if (userSettings.value) {
      const newSettings = {
        ...userSettings.value,
        theme: newTheme
      } as UserSettings;

      await store.saveSettings(newSettings);
    }
  } catch (error) {
    console.error("Fehler beim Speichern der Einstellungen:", error);
  } finally {
    setTimeout(() => {
      isThemeSwitching.value = false; // Freigabe des Buttons nach 1 Sekunde
    }, 100); // 100 ms = 0.1 Sekunde
  }
}
</script>

<style lang="css">
  :root {
    --header-footer-height: 150px;
  }

.navbar-col {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
}

.main-content-row {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-left: 1vw;
  margin-right: 1vw;
  min-height: calc(100vh - var(--header-footer-height));
  margin-top: 25px;
}

.theme-switcher {
  width: 100%;
  border-radius: 5px;
}

.theme-row {
  width: 100vw !important;
  padding-left: 5vw !important;
  padding-right: 5vw !important;
}

.theme-switcher:hover {
  background-color: #42b983;
}

.navbar-main-row {
  border-radius: 30px;
  border: solid black;
}

.navbar-main-row,
.theme-row {
  margin: 0 !important;
  padding: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

nav {
  /* padding: 30px; */

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.footer-row {
  margin-top: auto;
  flex-shrink: 0;
}

</style>
