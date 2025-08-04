<template>
  <v-dialog v-model="cartDialogVisible" max-width="800px">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">Cart</v-card-title>
      <v-divider thickness="2" color="black" opacity="0.3"></v-divider>
      <v-list>
        <v-list-item
          v-for="product in currentUserCart?.items"
          :key="product._id"
          style="margin-bottom: 25px"
        >
          <v-list-item-action style="width: 50px; height: 50px">
            <v-btn icon color="red" @click="removeFromCart(product._id)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-avatar>
            <v-img
              :src="
                product.variants.find((x) => x.id === product.selectedVariant)
                  ?.image
              "
              alt="Item Image"
              class="rounded"
              contain
              style="
                width: 250px;
                height: 150px;
                border: solid grey 1px;
                margin: 15px 0;
              "
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row align-content="space-between">
              <v-col>
                <v-list-item-title>{{ product.title }}</v-list-item-title>
                <v-list-item-subtitle
                  >Brand: {{ product.brand }}</v-list-item-subtitle
                >
              </v-col>

              <v-col>
                <v-select
                  v-model="product.quantity"
                  :items="quantityOptions"
                  label="Quantity"
                  style="max-width: 250px"
                  @update:modelValue="
                    (newValue) => updateQuantity(product._id, newValue)
                  "
                ></v-select>
              </v-col>
            </v-row>

            <v-list-item-subtitle style="margin-bottom: 25px"
              >Total: ${{
                (product.price * product.quantity).toFixed(2)
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-divider thickness="2" color="black" opacity="0.3"></v-divider>
        </v-list-item>
      </v-list>
      <v-row>
        <v-col cols="6">
          <v-btn
            @click="proceedOrder()"
            color="primary"
            style="min-width: 200px; margin-left: 25px"
            block
            >Checkout</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn color="warning" @click="closeDialog()" style="min-width: 200px"
            >Close</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Cart, Item } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();

const props = defineProps<{
  cartDialogVisible: boolean;
  currentUserCart: Cart;
}>();

const router = useRouter();

let cartDialogVisible = ref(props.cartDialogVisible);
let currentUserCart = ref(props.currentUserCart);
let quantityOptions = ref(Array.from({ length: 20 }, (_, i) => i + 1));
let cartItems: Ref<Item[]> = ref([]);

const emit = defineEmits<{
  (e: "update:cartDialogVisible", value: boolean): void;
}>();

function closeDialog() {
  emit("update:cartDialogVisible", false);
}

function proceedOrder() {
  router.push("/shop-payment");
}

async function removeFromCart(productId: string) {
  currentUserCart.value = await cartStore.getCartByUserId();

  currentUserCart.value.items = currentUserCart.value.items.filter(
    (item) => item._id !== productId,
  );

  await cartStore.updateCart(currentUserCart.value);
  cartItems.value = currentUserCart.value.items;
}

async function updateQuantity(productId: string, newQuantity: number) {
  try {
    currentUserCart.value = await cartStore.getCartByUserId();

    const itemIndex = currentUserCart.value.items.findIndex(
      (i) => i._id === productId,
    );

    if (itemIndex !== -1) {
      currentUserCart.value.items[itemIndex].quantity = newQuantity;
      await cartStore.updateCart(currentUserCart.value);
      cartItems.value = currentUserCart.value.items;
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}
</script>
