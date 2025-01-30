<template>
  <v-app>
    <v-container>
      <v-row class="justify-center text-center my-10">
        <v-col cols="12">
          <!-- <v-img src="/dashboard-illustration.svg" width="300"></v-img> -->
        </v-col>
        <v-col cols="12">
          <h1 class="display-2 font-weight-bold">
            Willkommen im Admin Dashboard
          </h1>
          <p class="subtitle-1">
            Verwalte deine Anwendungen, analysiere Statistiken und optimiere
            deine Prozesse an einem zentralen Ort.
          </p>
        </v-col>
        <v-col cols="12">
          <v-btn large color="primary" @click="navigateTo('dashboard')">
            Dashboard betreten
          </v-btn>
          <v-btn
            outlined
            large
            color="secondary"
            class="ml-4"
            @click="navigateTo('about')"
          >
            Mehr erfahren
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function navigateTo(page: string) {
  router.push({ name: page });
}
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}
.v-btn {
  font-size: 1rem;
  margin-right: 5px;
}
</style>
