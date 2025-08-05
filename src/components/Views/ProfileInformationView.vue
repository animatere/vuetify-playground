<template>
  <v-card class="profile-card">
    <v-card-text>
      <v-row>
        <v-col cols="5" style="margin-right: 25px">
          <h2 style="text-align: left; margin-bottom: 25px">Userangaben</h2>
          <div class="info-item">
            <span class="info-label">Benutzername:</span>
            <span class="info-value">{{ defaultUser.username }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">E-Mail:</span>
            <span class="info-value">{{ defaultUser.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Status:</span>
            <span class="info-value">
              <v-chip
                :color="defaultUser.loggedIn ? 'green' : 'red'"
                text-color="white"
              >
                {{ defaultUser.loggedIn ? "Online" : "Offline" }}
              </v-chip>
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">Registriert:</span>
            <span class="info-value">
              <v-chip
                :color="defaultUser.registered ? 'blue' : 'grey'"
                text-color="white"
              >
                {{ defaultUser.registered ? "Ja" : "Nein" }}
              </v-chip>
            </span>
          </div>
        </v-col>

        <v-divider
          :vertical="true"
          thickness="2"
          color="black"
          opacity="0.3"
          style="margin-bottom: 25px"
        ></v-divider>

        <v-col cols="5" style="margin-left: 25px">
          <h2 style="text-align: left; margin-bottom: 25px">Adresse</h2>

          <div class="info-item">
            <span class="info-label">Vorname:</span>
            <span class="info-value">{{
              currentUser.email?.split(".")[0]
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Nachname:</span>
            <span class="info-value">{{
              currentUser.email?.split(".")[1].split("@trizelos")[0]
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Telefonnummer:</span>
            <span class="info-value">0123456789</span>
          </div>
          <div class="info-item">
            <span class="info-label">Straße:</span>
            <span class="info-value">Musterstraße</span>
          </div>
          <div class="info-item">
            <span class="info-label">Hausnummer:</span>
            <span class="info-value">12A</span>
          </div>
          <div class="info-item">
            <span class="info-label">Postleitzahl:</span>
            <span class="info-value">12345</span>
          </div>
          <div class="info-item">
            <span class="info-label">Stadt:</span>
            <span class="info-value">Musterstadt</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { useEventStore } from "@/stores/EventStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { UserData } from "@/interfaces/interfaces";
import { getCurrentUserData } from "../../composable/getCurrentUserData";

const userStore = useUserStore();
const eventStore = useEventStore();
const { events } = storeToRefs(eventStore);
const { currentUser } = storeToRefs(userStore);

let defaultUser = ref<UserData>({
  id: "",
  username: "",
  email: "",
  password: "",
  loggedIn: false,
  registered: false,
  street: "",
  streetNumber: "",
  postalCode: "",
  city: "",
  country: "",
});

let userEvents = events;

onMounted(async () => {
  try {
    defaultUser.value = await getCurrentUserData();

    // Events vom Server laden
    const loadedEvents = await eventStore.getEvents();
    userEvents.value = loadedEvents;
  } catch (error: any) {
    console.error("Fehler bei der User-Authentifizierung:", error);
  }
});

watch(
  () => currentUser.value,
  (newCurrentUser) => {
    if (newCurrentUser.uid) {
      defaultUser.value = {
        id: newCurrentUser.uid.toString(),
        username: newCurrentUser.email?.split("@")[0],
        email: newCurrentUser.email as string,
        password: "Test12345",
        loggedIn: !!newCurrentUser,
        registered: !newCurrentUser.emailVerified,
        street: "",
        streetNumber: "",
        postalCode: "",
        city: "",
        country: "",
      } as UserData;
    } else {
      defaultUser.value = {
        id: "",
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        registered: false,
        street: "",
        streetNumber: "",
        postalCode: "",
        city: "",
        country: "",
      };
    }
  },
);
</script>
