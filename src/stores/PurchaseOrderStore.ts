// src/stores/EventStore.ts
import { PurchaseOrder } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";

export const usePurchaseOrderStore = defineStore("purchaseOrderStore", {
  state: () => ({}),
  actions: {
    async createPurchaseOrder(purchaseOrder: PurchaseOrder[]) {
      console.log("Erstelle PurchaseOrder... ", purchaseOrder);
      const userSettingsRef = `http://localhost:4000/purchaseOrder`;
      await axios.post(userSettingsRef, purchaseOrder);
    },
    async getPurchaseOrder(id: string): Promise<PurchaseOrder | null> {
      let purchaseOrder = null;

      if (id.length > 0) {
        console.log("Suche PurchaseOrder mit id... ", id);

        const userSettingsRef = `http://localhost:4000/purchaseOrder/?id=${id}`;
        let response = await axios.get(userSettingsRef);

        if (response.data) {
          purchaseOrder = response.data as PurchaseOrder;
        }
      } else {
        console.log("Empty Id is not allowed");
      }

      return purchaseOrder;
    },
    async updatePurchaseOrder(id: string) {
      if (id.length > 0) {
        console.log("Aktualisiere PurchaseOrder mit id... ", id);

        const userSettingsRef = `http://localhost:4000/purchaseOrder?id=${id}`;
        await axios.patch(userSettingsRef, id);
      } else {
        console.log("Empty Id is not allowed");
      }
    },
  },
});
