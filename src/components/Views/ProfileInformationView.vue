<template>
  <v-card class="profile-card">
    <v-card-text>
      <v-row>
        <!-- linke Seite -->
        <v-col cols="5" style="margin-right: 25px">
          <h2 class="mb-4 text-left">Userangaben</h2>
          <div class="info-item">
            <span class="info-label">Benutzername:</span>
            <span class="info-value">{{ userData?.userName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">E-Mail:</span>
            <span class="info-value">{{ userData?.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Status:</span>
            <v-chip
              :color="userData?.loggedIn ? 'green' : 'red'"
              text-color="white"
            >
              {{ userData?.loggedIn ? "Online" : "Offline" }}
            </v-chip>
          </div>
          <div class="info-item">
            <span class="info-label">Registriert:</span>
            <v-chip
              :color="userData?.confirmed ? 'blue' : 'red'"
              text-color="white"
            >
              {{ userData?.confirmed ? "Ja" : "Nein" }}
            </v-chip>
          </div>
        </v-col>

        <!-- Divider -->
        <v-divider
          vertical
          thickness="2"
          color="black"
          opacity="0.3"
        ></v-divider>

        <!-- rechte Seite -->
        <v-col cols="5" style="margin-left: 25px">
          <h2 class="mb-4 text-left">Adresse</h2>
          <div v-if="userData" class="user-info">
            <div class="info-item">
              <b>Vorname:</b> {{ userData.firstName }}
            </div>
            <div class="info-item">
              <b>Nachname:</b> {{ userData.lastName }}
            </div>
            <div class="info-item">
              <b>Straße:</b> {{ userData.userAddress?.street }}
            </div>
            <div class="info-item">
              <b>Hausnummer:</b> {{ userData.userAddress?.streetNumber }}
            </div>
            <div class="info-item">
              <b>Postleitzahl:</b> {{ userData.userAddress?.postCode }}
            </div>
            <div class="info-item">
              <b>Stadt:</b> {{ userData.userAddress?.city }}
            </div>
            <div class="info-item">
              <b>Land:</b> {{ userData.userAddress?.country }}
            </div>
          </div>
          <v-btn color="primary" @click="openDialog">Ändern</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <!-- Bearbeitungsdialog -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Userdaten bearbeiten</v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-if="editableData && editableData.userAddress">
            <v-col cols="6">
              <v-text-field v-model="editableData.firstName" label="Vorname" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editableData.lastName" label="Nachname" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editableData.userAddress.street"
                label="Straße"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editableData.userAddress.streetNumber"
                label="Hausnummer"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editableData.userAddress.postCode"
                label="PLZ"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editableData.userAddress.city"
                label="Stadt"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editableData.userAddress.country"
                label="Land"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="warning" text @click="dialog = false">Abbrechen</v-btn>
        <v-btn color="primary" :disabled="!isDirty" @click="saveChanges"
          >Speichern</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import type { UserData } from "@/interfaces/interfaces";

// Tiefer Vergleich
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  )
    return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

const dialog = ref(false);
const editableData = ref<UserData | null>(null);

function openDialog() {
  if (userData.value) {
    // tiefe Kopie erstellen
    editableData.value = JSON.parse(JSON.stringify(userData.value));
    dialog.value = true;
  }
}

// Button enabled, wenn Änderungen vorhanden
const isDirty = computed(() => {
  if (!userData.value || !editableData.value) return false;
  return !deepEqual(userData.value, editableData.value);
});

// Speichern
async function saveChanges() {
  if (editableData.value && editableData.value._id) {
    const success = await userStore.updateUserData(editableData.value);
    if (success) {
      // Store-Daten direkt aktualisieren → UI zeigt neue Werte
      userStore.setUserData(JSON.parse(JSON.stringify(editableData.value)));
      dialog.value = false;
    }
  }
}
</script>
