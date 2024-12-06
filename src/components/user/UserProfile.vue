<template>
  <v-container>
    <!-- Profilüberschrift -->
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <p v-if="myUser.username" style="font-weight: bold; font-size: 40px">
          {{ myUser.username }}!
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
              <span class="info-value">{{ myUser.username }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">E-Mail:</span>
              <span class="info-value">{{ myUser.email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value">
                <v-chip
                  :color="myUser.loggedIn ? 'green' : 'red'"
                  text-color="white"
                >
                  {{ myUser.loggedIn ? "Online" : "Offline" }}
                </v-chip>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Registriert:</span>
              <span class="info-value">
                <v-chip
                  :color="myUser.registered ? 'blue' : 'grey'"
                  text-color="white"
                >
                  {{ myUser.registered ? "Ja" : "Nein" }}
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
                v-model="myUser.username"
                required
              ></v-text-field>
              <v-text-field
                label="E-Mail"
                v-model="myUser.email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                label="Passwort"
                v-model="myUser.password"
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
          <v-card-text>
            <v-list>
              <v-list-item v-for="event in eventStore.events" :key="event.id">
                <v-list-item-title>{{ event.description }}</v-list-item-title>
                <!--                <v-list-item-subtitle>{{ "EventID: " + event.id}}</v-list-item-subtitle>-->
                <v-list-item-subtitle>{{
                  "Zeitstempel: " + event.timestamp
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="clearEventLog"
              >Protokoll löschen</v-btn
            >
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
import { checkUserLoggedin } from "../composable/checkUserLoggedin";

const userStore = useUserStore();
const eventStore = useEventStore();
const { currentUser } = storeToRefs(userStore);

let myUser = ref<UserData>({
  id: "",
  username: "",
  email: "",
  password: "Test12345",
  loggedIn: false,
  registered: false,
});

onMounted(() => {
  try {
    checkUserLoggedin();
  } catch (error: any) {
    console.error("Fehler bei userStore.checkAuth():", error);
  }
});

watch(
  () => currentUser.value,
  (newUser) => {
    if (newUser) {
      myUser.value = {
        id: newUser.uid.toString(),
        username: newUser.displayName as string,
        email: newUser.email as string,
        password: "",
        loggedIn: !!newUser,
        registered: !newUser.emailVerified,
      } as UserData;
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
