// src/stores/ItemStore.ts
import { Item, UserData } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";
import { getCurrentUserData } from "@/composable/getCurrentUserData";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [] as Item[],
    lastFetched: 0, // Timestamp für TTL
    ttl: 5 * 60 * 50, // in Millisekunden
    autoRefreshId: null as null | number, // Intervall-ID
  }),
  actions: {
    async createItem(item: Item) {
      let currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        const userSettingsRef = `http://localhost:4000/items`;
        await axios.post(userSettingsRef, item);
      } else {
        console.log("Unknown Current User in ItemStore");
      }
    },
    async createItems(items: Item[]) {
      let currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        const userSettingsRef = `http://localhost:4000/items/itemlist`;
        await axios.post(userSettingsRef, items);
      } else {
        console.log("Unknown Current User in ItemStore");
      }
    },
    async fetchItems(): Promise<Item[]> {
      try {
        const response = await axios.get<Item[]>("http://localhost:4000/items");
        this.items = response.data;
        this.lastFetched = Date.now();

        return this.items;
      } catch (error) {
        console.error("Fehler beim Laden der Items:", error);
        return this.items; // alte Items zurückgeben, falls Fehler
      }
    },
    async loadItems(): Promise<Item[]> {
      const now = Date.now();
      if (now - this.lastFetched > this.ttl) {
        // TTL abgelaufen → neue Items laden
        return this.fetchItems();
      }
      return this.items; // Cache zurückgeben
    },
    startAutoRefresh() {
      if (this.autoRefreshId) return; // Intervall schon gestartet
      this.autoRefreshId = window.setInterval(() => {
        this.fetchItems(); // lädt automatisch alle 5 Minuten neu
      }, this.ttl);
    },
    stopAutoRefresh() {
      if (this.autoRefreshId) {
        clearInterval(this.autoRefreshId);
        this.autoRefreshId = null;
      }
    },
  },
  getters: {
    filteredItems: (state) => {
      return (search: string, categories: string[], priceRange: number[]) => {
        const searchTerm = search.toLowerCase();

        return state.items.filter((product) => {
          const matchesCategory =
            categories.length === 0 || categories.includes(product.category);
          const matchesPrice =
            product.price >= priceRange[0] && product.price <= priceRange[1];
          const matchesSearch = product.title
            .toLowerCase()
            .includes(searchTerm);

          return matchesCategory && matchesPrice && matchesSearch;
        });
      };
    },
  },
});
