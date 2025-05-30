// src/stores/EventStore.ts
import { Item, UserData } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";
import { getCurrentUserData } from "@/components/composable/getCurrentUserData";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    events: [] as Item[],
  }),
  actions: {
    async createItem(item: Item) {
      let currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        const userSettingsRef = `http://localhost:4000/items`;

        await axios.post(userSettingsRef, item);
      } else {
        console.log("Unknown Current User in EventStore");
      }
    },
    async createItems(items: Item[]) {
      let currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        const userSettingsRef = `http://localhost:4000/items/itemlist`;

        await axios.post(userSettingsRef, items);
      } else {
        console.log("Unknown Current User in EventStore");
      }
    },
    async getItems(): Promise<Item[] | []> {
      const userSettingsRef = `http://localhost:4000/items`;
      let response = await axios.get(userSettingsRef);

      if (response.data) {
        return response.data as Item[];
      }

      return [];
    },
  },
});
