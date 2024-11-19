// src/stores/EventStore.ts
import { defineStore } from "pinia";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: [] as { id: number; timestamp: string; description: string }[],
  }),
  actions: {
    addEvent(description: string) {
      this.events.push({
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        description,
      });
      if (this.events.length > 50) {
        this.events.shift();
      }
    },
    clearEvents() {
      this.events = [];
    },
  },
});
