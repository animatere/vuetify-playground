<template>
  <v-container>
    <!-- Ladespinner, der angezeigt wird, solange die Einstellungen geladen werden -->
    <v-overlay v-if="loading" absolute z-index="1000">
      <v-spinner size="100" color="primary"></v-spinner>
    </v-overlay>

    <v-row class="mb-6" v-if="!loading">
      <v-col cols="12" class="text-center">
        <h1 class="settings-title">Einstellungen</h1>
        <p class="settings-subtitle">
          Passen Sie Ihre Anwendung nach Ihren Wünschen an.
        </p>
      </v-col>
    </v-row>

    <!-- Theme-Einstellungen -->
    <v-row v-if="!loading">
      <v-col cols="12" md="6">
        <v-card class="settings-card">
          <v-card-title>Design</v-card-title>
          <v-card-text>
            <p>Wählen Sie Ihr Standard-Theme:</p>
            <v-radio-group v-model="settings.theme" @change="updateTheme" row>
              <v-radio label="Hell" value="light"></v-radio>
              <v-radio label="Dunkel" value="dark"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Benachrichtigungen -->
      <v-col cols="12" md="6">
        <v-card class="settings-card">
          <v-card-title>Benachrichtigungen</v-card-title>
          <v-card-text>
            <v-switch
              v-model="settings.notifications"
              label="Benachrichtigungen aktivieren"
            ></v-switch>
            <v-switch
              v-model="settings.emailNotifications"
              label="E-Mail-Benachrichtigungen"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col cols="12" class="text-center mt-6">
        <v-btn color="primary" large @click="saveSettings">
          Änderungen speichern
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { UserSettings } from "@/interfaces/interfaces";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { userSettings } = storeToRefs(store);
const settings = ref({}) as Ref<UserSettings>;

// Ladezustand für den Spinner
const loading = ref(true);

// Überwache Änderungen an den Benutzereinstellungen
watch(
  () => userSettings.value?.theme,
  (newTheme) => {
    if (newTheme) {
      settings.value.theme = newTheme;
    }
  },
);

onMounted(async () => {
  try {
    const loadedSettings = await store.loadSettings();
    if (loadedSettings) {
      settings.value = loadedSettings;
    }
  } catch (error) {
    console.error("Fehler beim Laden der Einstellungen:", error);
  } finally {
    loading.value = false; // Spinner ausblenden, wenn die Einstellungen geladen sind
  }
});

function updateTheme() {
  store.saveSettings(settings.value);
}

function saveSettings() {
  store.saveSettings(settings.value);
}
</script>


<style>
.settings-title {
  font-size: 2rem;
  font-weight: bold;
}

.settings-subtitle {
  font-size: 1.25rem;
}

.settings-card {
  margin-bottom: 20px;
  padding: 20px;
  height: 30vh;
}
</style>
