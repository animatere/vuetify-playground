<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p>Willkommen zurück,</p>
        <p style="font-weight: bold; font-size: 40px">
          {{ currentUser.username }}!
        </p>
        <p>Es freut uns, dass du wieder da bist. Was möchtest du heute tun?</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title>Aufgaben verwalten</v-card-title>
          <v-card-text>Verwalte deine Aufgaben und To-Dos.</v-card-text>
          <v-btn to="/tasks">Anzeigen</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title>Playground</v-card-title>
          <v-card-text
            >Experimentiere im Playground mit verschiedenen
            Widgets.</v-card-text
          >
          <v-btn to="/playground">Anzeigen</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title>Benachrichtigungen</v-card-title>
          <v-card-text
            >Zeige aktuelle Benachrichtigungen und Updates an.</v-card-text
          >
          <v-btn>Anzeigen</v-btn>
          <!--          <v-btn to="/notifications">Benachrichtigungen anzeigen</v-btn>-->
        </v-card>
      </v-col>
    </v-row>

    <v-row class="user-buttons">
      <v-col cols="12">
        <v-btn to="/user-profile">Zu meinem Profil</v-btn>
        <v-btn to="/user-settings">Einstellungen</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { currentUser } = storeToRefs(store);

onMounted(() => {
  if (!store.currentUser.username) {
    // Optional: Benutzer aus einer Quelle laden, falls nicht gesetzt
    store.loadUser();
  }
});
</script>

<style>
.v-card {
  padding: 25px;
}

.user-buttons .v-btn {
  margin-right: 25px;
}

.user-nav-items {
  height: 250px;
}

.user-nav-items .v-card-title {
  font-size: 25px;
  height: 50px;
}

.user-nav-items .v-card-text {
  font-size: 15px;
  height: 80px;
}

.user-nav-items .v-btn {
  width: 300px;
}
</style>
