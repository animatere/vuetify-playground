// src/stores/CartStore.ts
import { Cart, CartItem, UserData } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";
import { getCurrentUserData } from "@/composable/getCurrentUserData";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    carts: [] as Cart[],
    currentCart: null as Cart | null, // <-- aktiv genutzter Warenkorb
  }),
  actions: {
    async createCart(cartItems: CartItem[]) {
      const currentUser = (await getCurrentUserData()) as UserData;

      if (!currentUser?._id) {
        console.warn("Unknown Current User in createCart");
        return;
      }

      const userCart: Cart = {
        cartItems: cartItems,
        userId: currentUser._id,
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("Erstelle UserCart:", userCart);
      const response = await axios.post(
        "http://localhost:4000/carts",
        userCart,
      );
      this.currentCart = response.data as Cart;
      return this.currentCart;
    },

    async getCartByUserId(): Promise<Cart | null> {
      try {
        const currentUser = (await getCurrentUserData()) as UserData;

        if (!currentUser?._id) return null;

        const response = await axios.get(
          `http://localhost:4000/carts/single/?userId=${currentUser._id}`,
        );

        return response.data as Cart;
      } catch (error) {
        console.error("Error on getCartByUserId()", error);
        return null;
      }
    },

    async updateCart(currentCart: Cart) {
      console.log("Im CartStore gelandet");

      const currentUser = (await getCurrentUserData()) as UserData;

      console.log("CURRENTUSER: ", currentUser);
      console.log("currentCart: ", currentCart);
      if (!currentUser?._id) {
        console.warn("Unknown Current User in updateCart");
        return;
      }

      if (!currentCart._id) {
        console.error("Cannot update cart without _id");
        return;
      }

      await axios.patch(
        `http://localhost:4000/carts/${currentCart._id}`,
        currentCart,
      );
    },
  },
});
