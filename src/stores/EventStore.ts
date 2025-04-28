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
    async getEvents(): Promise<UserEvent[]> {
      let currentUser = (await getCurrentUserData()) as UserData;
      const userSettingsRef = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserEvents/${currentUser.id}.json`;

      let response = await axios.get(userSettingsRef);
      let userEventsData = response.data as UserEvent[];


      const userEvents: UserEvent[] = Object.entries(userEventsData).map(
        ([eventId, event]) => {
          const typedEvent = event as UserEvent
          return {
            id: eventId,
            userId: typedEvent.userId,
            eventDescription: typedEvent.eventDescription,
            createdAt: new Date(typedEvent.createdAt),
          };
        },
      );

      userEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return userEvents;
    },
  },
});
