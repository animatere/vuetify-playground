<template>
  <v-container>
    <!-- Profilüberschrift -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-card>
          <img
            src="https://img.freepik.com/vektoren-premium/ein-stilisiertes-logo-mit-einer-figur-deren-gesicht-durch-ein-schwarzes-rechteck-verdeckt-ist_948255-68.jpg"
            alt="Logo"
            class="logo"
            style="
              width: 70px;
              height: 70px;
              border: solid orangered 1px;
              border-radius: 8px;
            "
          />
          <h1 style="color: #4ea8de">Willkommen zurück!</h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- Profilinformationen -->
    <v-row>
      <v-col cols="12" class="text-center">
        <profile-information-view></profile-information-view>
      </v-col>

      <!-- Event Log (Aktivitätsprotokoll) -->
      <v-col cols="12">
        <user-event-log></user-event-log>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { UserData } from "@/interfaces/interfaces";
import { getCurrentUserData } from "../../composable/getCurrentUserData";
import { useEventStore } from "@/stores/EventStore";

const userStore = useUserStore();
const eventStore = useEventStore();

const { currentUser } = storeToRefs(userStore);

let userData = ref<UserData | null>(null);

watch(
  () => currentUser.value,
  async (newCurrentUser) => {
    if (newCurrentUser && newCurrentUser.email) {
      try {
        userData.value = await getCurrentUserData();
        console.log("UserData geladen:", userData.value);
      } catch (error) {
        console.error("Fehler beim Laden der UserData:", error);
        userData.value = null;
      }
    } else {
      console.log("currentUser noch nicht verfügbar");
      userData.value = null;
    }
  },
  { immediate: true },
);
</script>

<style>
.profile-title {
  font-size: 2rem;
  font-weight: bold;
}

.profile-subtitle {
  font-size: 1.25rem;
}

.profile-card {
  margin-bottom: 20px;
  padding: 20px;
  height: 100%;
}

.info-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-weight: bold;
}

.profile-card v-list-item {
  border-bottom: 1px solid #919191;
  padding-bottom: 10px;
}

.profile-card v-list-item:last-child {
  border-bottom: none;
}

.navbar-logo {
  display: flex; /* Flexbox aktivieren */
  align-items: center; /* Logo und Text auf gleicher Höhe */
}

.navbar-logo a {
  color: #333;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex; /* Flexbox aktivieren */
  align-items: center; /* Text und Logo vertikal ausrichten */
}

.navbar-logo img {
  margin-right: 8px; /* Abstand zwischen Logo und Text */
}
</style>
