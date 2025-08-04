// src/stores/EventStore.ts
import { Inventory } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";

export const useInventoryStore = defineStore("inventoryStore", {
  state: () => ({}),
  actions: {
    async createInventory(inventory: Inventory) {
      console.log("Erstelle Inventory... ", inventory);
      const userSettingsRef = `http://localhost:4000/inventory`;
      await axios.post(userSettingsRef, inventory);
    },
    async getInventory(id: string): Promise<Inventory | null> {
      let inventory = null;

      if (id.length > 0) {
        console.log("Suche Inventory mit id... ", id);

        const userSettingsRef = `http://localhost:4000/inventory/?id=${id}`;
        let response = await axios.get(userSettingsRef);

        if (response.data) {
          inventory = response.data as Inventory;
        }
      } else {
        console.log("Empty Id is not allowed");
      }

      return inventory;
    },
    async getInventoryItems(): Promise<Inventory[]> {
        const userSettingsRef = `http://localhost:4000/inventory`;

        try {
            const response = await axios.get<Inventory[]>(userSettingsRef);

            console.log("Inventory Items: ", response.data)
            return response.data ?? [];
        } catch (error) {
            console.error('Error while loading inventory:', error);
            return [];
        }
    },
    async updateInventory(id: string, inventory: Inventory) {


      console.log("Reached updateInventory")

      if (id.length > 0 && inventory) {
        console.log("Aktualisiere Inventory mit id... ", id);
        const userSettingsRef = `http://localhost:4000/inventory/?id=${id}`;
        await axios.patch(userSettingsRef, inventory);
      } else {
        console.log("Empty Id is not allowed");
      }
    },
  },
});
