<template>
  <div class="container">
    <h1>{{ $t('welcome') }}</h1>
    <div class="buttons">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/signup" class="button">Signup</router-link>
    </div>
    <div class="language-switch">
      <v-btn @click="changeLanguage('de')">Deutsch</v-btn>
      <v-btn @click="changeLanguage('en')">English</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function changeLanguage(lang: string) {
  locale.value = lang;
}

// Name der Komponente ist in der Composition API nicht direkt erforderlich,
// da es automatisch vom Framework abgeleitet wird.
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.buttons {
  margin-top: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}
</style>
