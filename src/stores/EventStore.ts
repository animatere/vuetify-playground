// src/stores/EventStore.ts
import { UserData, UserEvent } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUserData } from "@/components/composable/getCurrentUserData";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: [] as UserEvent[],
  }),
  actions: {
    async addEvent(description: string) {
      let currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        const userEvent = {
          id: uuidv4(),
          userId: currentUser.id,
          eventDescription: description,
          createdAt: new Date(),
        } as UserEvent;

        const userSettingsRef = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserEvents/${currentUser.id}/${userEvent.id}.json`;

        await axios.put(userSettingsRef, userEvent);
      } else {
        console.log("Unknown Current User in EventStore");
      }
    },
    // ToDo: implementieren
    clearEvents() {
      this.events = [];
    },
    async getEvents(): Promise<UserEvent[]> {
      let currentUser = (await getCurrentUserData()) as UserData;
      const userSettingsRef = `https://vue3-training-2f8fd-default-rtdb.firebaseio.com/UserEvents/${currentUser.id}.json`;

      let response = await axios.get(userSettingsRef);
      const userEventsData = response.data;

      const userEvents: UserEvent[] = Object.entries(userEventsData).map(
        ([eventId, event]) => {
          const typedEvent = event as UserEvent;
          return {
            id: eventId,
            userId: typedEvent.userId,
            eventDescription: typedEvent.eventDescription,
            createdAt: new Date(typedEvent.createdAt),
          };
        },
      );

      return userEvents;
    },
  },
});
