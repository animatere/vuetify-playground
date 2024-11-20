<template>
  <v-container>
    <!-- Profilüberschrift -->
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="profile-title">Willkommen, {{ currentUser.username }}!</h1>
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
              <span class="info-value">{{ currentUser.username }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">E-Mail:</span>
              <span class="info-value">{{ currentUser.email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value">
                <v-chip
                  :color="currentUser.loggedIn ? 'green' : 'red'"
                  text-color="white"
                >
                  {{ currentUser.loggedIn ? "Online" : "Offline" }}
                </v-chip>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Registriert:</span>
              <span class="info-value">
                <v-chip
                  :color="currentUser.registered ? 'blue' : 'grey'"
                  text-color="white"
                >
                  {{ currentUser.registered ? "Ja" : "Nein" }}
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
                v-model="editData.username"
                required
              ></v-text-field>
              <v-text-field
                label="E-Mail"
                v-model="editData.email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                label="Passwort"
                v-model="editData.password"
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
import { onMounted, reactive, ref } from "vue";

const userStore = useUserStore();
const eventStore = useEventStore();
const { currentUser } = storeToRefs(userStore);

onMounted(() => {
  if (!currentUser.value.username) {
    currentUser.value = userStore.loadUser();
  }
});

const editData = reactive({
  username: currentUser.value.username,
  email: currentUser.value.email,
  password: currentUser.value.password,
});

const formValid = ref(false);

function saveProfile() {
  currentUser.value.username = editData.username;
  currentUser.value.email = editData.email;
  currentUser.value.password = editData.password;

  eventStore.addEvent("Profilinformationen wurden geändert.");
}

function resetEditData() {
  editData.username = currentUser.value.username;
  editData.email = currentUser.value.email;
  editData.password = currentUser.value.password;
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
  height:50vh;
}

.profile-card:hover {
  background-color: #e1e1e1;
}

.info-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-weight: bold;
}

.profile-card .v-list-item {
  border-bottom: 1px solid #919191;
  padding-bottom: 10px;
}

.profile-card .v-list-item:last-child {
  border-bottom: none;
}
</style>
