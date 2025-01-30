import { defineStore } from "pinia";

export const useShopStore = defineStore("shop", {
  state: () => ({
    cart: [],
  }),

  actions: {
    removeNotification(id: number) {
      console.log(this.cart);
    },
  },
});
