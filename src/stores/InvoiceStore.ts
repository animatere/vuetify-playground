// src/stores/EventStore.ts
import { Invoice } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";

export const useInvoiceStore = defineStore("invoiceStore", {
  state: () => ({}),
  actions: {
    async createInvoice(invoice: Invoice[]) {
      console.log("Erstelle Invoice... ", invoice);
      const userSettingsRef = `http://localhost:4000/invoice`;
      await axios.post(userSettingsRef, invoice);
    },
    async getInvoice(id: string): Promise<Invoice | null> {
      let invoice = null;

      if (id.length > 0) {
        console.log("Suche Invoice mit id... ", id);

        const userSettingsRef = `http://localhost:4000/invoice/?id=${id}`;
        let response = await axios.get(userSettingsRef);

        if (response.data) {
          invoice = response.data as Invoice;
        }
      } else {
        console.log("Empty Id is not allowed");
      }

      return invoice;
    },
    async updateInvoice(id: string) {
      if (id.length > 0) {
        console.log("Aktualisiere Invoice mit id... ", id);

        const userSettingsRef = `http://localhost:4000/invoice?id=${id}`;
        await axios.patch(userSettingsRef, id);
      } else {
        console.log("Empty Id is not allowed");
      }
    },
  },
});
