// src/stores/EventStore.ts
import { Cart, Item, UserData } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";
import { getCurrentUserData } from "@/components/composable/getCurrentUserData";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    events: [] as Cart[],
  }),
  actions: {
    async createCart(items: Item[]) {
      let currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        let userCart: Cart = {
          items: items,
          totalPrice: 0,
          userId: currentUser.id,
          status: "open",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        console.log("erstelle usercart... ", userCart);

        const userSettingsRef = `http://localhost:4000/carts`;

        await axios.post(userSettingsRef, userCart);
      } else {
        console.log("Unknown Current User in EventStore");
      }
    },
    async getCart(): Promise<Cart> {
      const currentUser = (await getCurrentUserData()) as UserData;
      const userSettingsRef = `http://localhost:4000/carts/single/?id=${currentUser.id}&userId=${currentUser.id}`;
      let response = await axios.get(userSettingsRef);
      let userCart: Cart = {
        items: [],
        totalPrice: 0,
        userId: currentUser.id,
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (response.data) {
        userCart = response.data as Cart;
      }

      return userCart;
    },
    async getCartByUserId(): Promise<Cart> {
      console.log("getCartByUserId reached");
      const currentUser = (await getCurrentUserData()) as UserData;
      console.log("currentUserId: ", currentUser.id);
      const userSettingsRef = `http://localhost:4000/carts/single/?userId=${currentUser.id}&userId=${currentUser.id}`;
      let response = await axios.get(userSettingsRef);
      let userCart: Cart = {
        _id: "",
        items: [],
        totalPrice: 0,
        userId: currentUser.id,
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (response.data) {
        userCart = response.data as Cart;
      } else {
        console.log("userCart konnte nicht für User gefunden werden...");
      }

      return userCart;
    },
    async updateCart(currentCart: Cart) {
      const currentUser = (await getCurrentUserData()) as UserData;

      if (currentUser) {
        const userSettingsRef = `http://localhost:4000/carts?userId=${currentUser.id}`;

        await axios.patch(userSettingsRef, currentCart);
      } else {
        console.log("Unknown Current User in EventStore");
      }
    },
  },
});
