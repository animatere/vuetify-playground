<template>
  <v-card class="profile-card">
    <v-card-title>Aktivitätsprotokoll</v-card-title>
    <v-card-text style="max-height: 300px; overflow-y: auto">
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
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/EventStore";
import { storeToRefs } from "pinia";

const eventStore = useEventStore();
const { events } = storeToRefs(eventStore);

let userEvents = events;

onMounted(async () => {
  try {
    const loadedEvents = await eventStore.getEvents();
    userEvents.value = loadedEvents;
  } catch (error: any) {
    console.error("Fehler bei der User-Authentifizierung:", error);
  }
});

function clearEventLog() {
  eventStore.clearEvents();
  eventStore.getEvents();
}
</script>
