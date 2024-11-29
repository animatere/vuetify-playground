<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p>Willkommen zurück,</p>
        <p style="font-weight: bold; font-size: 40px">
          {{ currentUser.displayName || "Gast" }}!
        </p>
        <p>Es freut uns, dass du wieder da bist. Was möchtest du heute tun?</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title>Aufgaben verwalten</v-card-title>
          <v-card-text>Verwalte deine Aufgaben und To-Dos.</v-card-text>
          <v-btn to="/tasks" color="primary">Anzeigen</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title>Playground</v-card-title>
          <v-card-text>
            Experimentiere im Playground mit verschiedenen Widgets.
          </v-card-text>
          <v-btn color="primary">Anzeigen</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title>Benachrichtigungen</v-card-title>
          <v-card-text>
            Zeige aktuelle Benachrichtigungen und Updates an.
          </v-card-text>
          <v-btn color="primary">Anzeigen</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="user-buttons">
      <v-col cols="12">
        <v-btn class="profile-button" to="/user-profile" color="secondary">
          Profil
        </v-btn>
        <v-btn class="settings-button" to="/user-settings" color="secondary">
          Einstellungen
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useTheme } from "vuetify";

const store = useUserStore();
const { currentUser, userSettings } = storeToRefs(store);
const theme = useTheme();

onMounted(async () => {
  if (!currentUser.value) {
    console.log("Kein Benutzer eingeloggt, versuche zu laden...");
    store.watchCurrentUser();
  }
  theme.global.name.value = userSettings.value?.theme || "light";

});

watch(
  () => currentUser.value,
  (newValue) => {
    console.log("currentUser hat sich geändert:", newValue);
  },
  { immediate: true },
);
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
  width: 100%;
}

.profile-button,
.settings-button {
  width: 180px;
}

@media (max-width: 660px) {
  .user-buttons .v-btn {
    margin-top: 25px;
  }
}
</style>
