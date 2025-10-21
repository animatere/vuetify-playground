<template>
  <div class="home">
    <v-row class="full-width">
      <v-col cols="12">
        <v-card
          class="user-nav-items"
          style="background-color: rgb(241, 231, 213)"
          height="100px"
        >
          <v-card-title>Hallo {{ userData?.firstName }}!</v-card-title>
          <v-card-text>Willkommen in unserem AI Portal</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="full-width">
      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Chatbot
            <v-icon icon="mdi-bookmark-box-multiple-outline"></v-icon>
          </v-card-title>
          <v-card-text
            >Ein Chatbot, der dir Fragen zu Logistikthemen
            beantwortet.</v-card-text
          >
          <v-btn to="/chat-bot" color="primary">Catch them all!</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Bild erstellung <v-icon icon="mdi-store"></v-icon
          ></v-card-title>
          <v-card-text>
            Mit Hilfe von Beschreibungstexten kann dir die AI ein Bild deiner
            Wahl generieren.
          </v-card-text>
          <v-btn to="/image-generator" color="primary">zum Shoppen</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UserData } from "@/interfaces/interfaces";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { getCurrentUserData } from "@/composable/getCurrentUserData";

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

let userData = ref<UserData | null>(null);

onMounted(async () => {
  try {
    await userStore.checkAuth();
    userData.value = await getCurrentUserData();
  } catch (error: any) {
    console.error("Fehler bei userStore.checkAuth():", error);
  }
});

watch(
  () => currentUser.value,
  async (newCurrentUser) => {
    if (newCurrentUser && newCurrentUser.email) {
      try {
        userData.value = await getCurrentUserData();
      } catch (error) {
        console.error("Fehler beim Laden der UserData:", error);
        userData.value = null;
      }
    } else {
      console.error("currentUser noch nicht verfügbar");
      userData.value = null;
    }
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
  background-color: rgb(241, 231, 213);
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
