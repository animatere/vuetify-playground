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
          <v-card-text
            >Es freut uns, dass du wieder da bist. Was möchtest du heute
            angehen?</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>

    <v-row class="full-width">
      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Pokemon Sammelalbum
            <v-icon icon="mdi-bookmark-box-multiple-outline"></v-icon>
          </v-card-title>
          <v-card-text>Ein Sammelalbum für deine Pokemonkarten.</v-card-text>
          <v-btn to="/collector" color="primary">Catch them all!</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Online Shop <v-icon icon="mdi-store"></v-icon
          ></v-card-title>
          <v-card-text>
            Ein Onlineshop mit Artikelauswahl, einem Warenkorb und einer Ansicht
            für Einzelartikel.
          </v-card-text>
          <v-btn to="/shop-item-overview" color="primary">zum Shoppen</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >AI <v-icon icon="mdi-desktop-classic"></v-icon
          ></v-card-title>
          <v-card-text>
            Eine experimentielle Spielwiese zur Nutzung von AI für Features wie
            Chats und Bildergernerierung.
          </v-card-text>
          <v-btn to="/chat-bot" color="primary">Help me AI</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Benutzerprofil <v-icon icon="mdi-account"></v-icon
          ></v-card-title>
          <v-card-text>
            Dein eigenes Benutzerprofile zum individuellen gestalten!
          </v-card-text>
          <v-btn to="/user-profile" color="primary">Zu meinem Profil</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Einstellungen <v-icon icon="mdi-cog"></v-icon
          ></v-card-title>
          <v-card-text>
            Hier können Benutzerspezifische Einstellungen gespeichert werden!
          </v-card-text>
          <v-btn to="/user-settings" color="primary"
            >Zu den Einstellungen</v-btn
          >
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="user-nav-items">
          <v-card-title
            >Admin Dashboard <v-icon icon="mdi-security"></v-icon
          ></v-card-title>
          <v-card-text>
            Ein Admin Dashboard in dem User, Artikel und andere Dinge verwaltet
            und angepasst werden können.
          </v-card-text>
          <v-btn to="/admin-dashboard" color="primary"
            >Zum Admin Dashboard</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UserData } from "@/interfaces/interfaces";
import { getCurrentUserData } from "../composable/getCurrentUserData";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";

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
