<template>
  <v-app :class="currentTheme === 'dark' ? 'theme--dark' : 'theme--light'">
    <navbar></navbar>
    <div class="toggle-theme">
      <v-btn @click="toggleTheme" class="theme-toggle-btn">
        <p v-if="currentTheme === 'dark'">Current Theme: dark Theme</p>
        <p v-else-if="currentTheme === 'light'">Current Theme: light Theme</p>
        <p v-else>Current Theme: light Theme</p>
      </v-btn>
    </div>
    <router-view> </router-view>
    <notification></notification>
    <app-footer></app-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
let currentTheme = ref(theme.global.name.value);

function toggleTheme() {
  theme.global.name.value =
    theme.global.name.value === "dark" ? "light" : "dark";
  currentTheme.value = theme.global.name.value;
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

.theme-toggle-btn{
  width: 100% !important;
  margin: 0;
}

</style>
