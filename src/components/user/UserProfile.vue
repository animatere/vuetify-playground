<template>
  <v-container>
    <!-- Profilüberschrift -->
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <p
          v-if="defaultUser.username"
          style="font-weight: bold; font-size: 40px"
        >
          {{ defaultUser.username }}!
        </p>
        <p v-else>Benutzer wird geladen...</p>
        <p class="profile-subtitle">Hier sind deine Profildetails.</p>
      </v-col>
    </v-row>

    <!-- Profilinformationen -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="profile-card">
          <v-card-title>Deine Informationen</v-card-title>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bearbeitungsformular -->
      <v-col cols="12" md="6">
        <v-card class="profile-card">
          <v-card-title>Profil bearbeiten</v-card-title>
          <v-card-text>
            <v-form ref="profileForm" v-model="formValid">
              <v-text-field
                label="Benutzername"
                v-model="defaultUser.username"
                required
              ></v-text-field>
              <v-text-field
                label="E-Mail"
                v-model="defaultUser.email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                label="Passwort"
                v-model="defaultUser.password"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :disabled="!formValid" @click="saveProfile">
              Speichern
            </v-btn>
            <v-btn color="secondary" @click="resetEditData"> Abbrechen </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Event Log (Aktivitätsprotokoll) -->
    <v-row>
      <v-col cols="12">
        <v-card class="profile-card">
          <v-card-title>Aktivitätsprotokoll</v-card-title>
          <v-card-text style="max-height: 300px; overflow-y: auto;">
            <v-list>
              <v-list-item v-for="event in userEvents" :key="event.id">
                <v-list-item-title>
                  {{ event.eventDescription }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ "Zeitstempel: " + event.createdAt }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="clearEventLog" class="full-width">
              Protokoll löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { useEventStore } from "@/stores/EventStore";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { UserData } from "@/interfaces/interfaces";
import { getCurrentUserData } from "../composable/getCurrentUserData";

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
        loggedIn: !!newCurrentUser, // placeholder
        registered: !newCurrentUser.emailVerified, // placeholder
      } as UserData;
    } else {
      defaultUser.value = {
        id: "",
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        registered: false,
      };
    }
  },
);

const editData = reactive({
  username: currentUser.value?.displayName,
  email: currentUser.value?.email as string,
  // ToDo: add real database: get access to all user data to load them
  // password: currentUser.value?.password,
  // password: "Test12345",
  loggedIn: !!currentUser,
  registered: !currentUser.value?.emailVerified, // ToDo: add real database: just mockup data right now
});

const formValid = ref(false);

// ToDo: add real database: get access to all user data to change them
function saveProfile() {
  // currentUser.value.username = editData.username;
  // currentUser.value.email = editData.email;
  // currentUser.value.password = editData.password;

  eventStore.addEvent("Profilinformationen wurden geändert.");
}

// ToDo: add real database: this mockup should be replaced with real data
function resetEditData() {
  editData.username = currentUser.value?.displayName;
  editData.email = currentUser.value?.email as string;
  // editData.password = currentUser.value.password;
  (editData.loggedIn = !!currentUser), (editData.registered = !!currentUser);
}

function clearEventLog() {
  eventStore.clearEvents();
  eventStore.getEvents();
}
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
  height: 50vh;
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
</style>
