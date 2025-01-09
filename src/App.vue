<template>
  <v-app :class="currentTheme === 'dark' ? 'theme--dark' : 'theme--light'">
      <v-row>
        <v-col cols="12">
        <navbar ></navbar>
        </v-col>
        <v-col cols="12" style="margin:0 !important">
          <div class="toggle-theme">
            <v-btn width="100%" @click="toggleTheme" class="theme-toggle-btn">
              <p>Current Theme: {{ currentTheme }}</p>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <notification></notification>
        </v-col>
    </v-row>

      <v-row>
        <v-col cols="12">
          <app-footer></app-footer>
      </v-col>
    </v-row>

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
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  currentTheme.value = newTheme;
  theme.global.name.value = newTheme;

  try {
    await store.loadSettings();

    if (userSettings.value) {
      const newSettings = {
        id: userSettings.value.id,
        userId: userSettings.value.userId,
        theme: newTheme,
        notifications: userSettings.value.notifications,
        emailNotifications: userSettings.value.emailNotifications,
      } as UserSettings;

      await store.saveSettings(newSettings);
    }
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

.navbar {
  height: 100px;
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

</style>