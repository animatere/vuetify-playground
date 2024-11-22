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
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { useTheme } from "vuetify";

const store = useUserStore();
const { userSettings } = storeToRefs(store);
const theme = useTheme();
const currentTheme = ref(userSettings.value.theme || "light");

watch(
  () => userSettings.value.theme,
  (newTheme) => {
    currentTheme.value = newTheme;
    theme.global.name.value = newTheme;
  },
);

function toggleTheme() {
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  store.saveSettings({ ...userSettings.value, theme: newTheme });
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
