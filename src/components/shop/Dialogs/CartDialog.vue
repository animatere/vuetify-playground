<template>
  <v-dialog v-model="cartDialogVisible" max-width="800px">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">
        <div class="card-title-elements">
          <v-row>
            <v-col cols="6">
              <v-text-field
                class="card-title-element"
                placeholder="Code eingeben"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn class="card-title-element">Aktivieren</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card-title>
      <v-divider thickness="2" color="black" opacity="0.3"></v-divider>
      <v-list>
        <v-list-item
          v-for="product in mappedCartItems"
          :key="product.itemId"
          style="margin-bottom: 25px"
        >
          <v-list-item-action style="width: 50px; height: 50px">
          </v-list-item-action>
          <v-list-item-avatar>
            <v-img
              :src="
                product.variants?.find((x) => x.id === product.selectedVariant)
                  ?.image
              "
              alt="Item Image"
              class="rounded"
              contain
              style="width: 200px; height: 100px; margin: 15px 0"
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
                  v-if="product._id"
                  :model-value="product.quantity"
                  :items="quantityOptions"
                  label="Quantity"
                  style="max-width: 250px"
                  @update:modelValue="
                    (newValue) => updateQuantity(product._id, Number(newValue))
                  "
                />
              </v-col>
            </v-row>

            <v-list-item-subtitle
              style="margin-bottom: 25px"
              v-if="product.price"
              >Total: ${{
                (product.price * product.quantity).toFixed(2)
              }}</v-list-item-subtitle
            >
            <v-btn icon color="red">
              <!-- <v-btn icon color="red" @click="removeFromUserCart(product._id)"> -->
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
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

  <!-- <warning-dialog
    v-if="warningDialogVisible"
    v-model:warningDialogVisible="warningDialogVisible"
    @confirm-remove="confirmRemoveClick()"
  >
  </warning-dialog> -->
</template>

<script setup lang="ts">
import { Cart, CartItem, Item } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";
import { useItemStore } from "@/stores/ItemStore";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";

const itemStore = useItemStore();
const { items } = storeToRefs(itemStore); // reaktive Items aus dem Store

const cartStore = useCartStore();

const props = defineProps<{
  cartDialogVisible: boolean;
  currentUserCart: Cart | null;
}>();

const router = useRouter();

const warningDialogVisible = ref(false);
const itemToRemove: Ref<string> = ref("");
let cartDialogVisible = ref(props.cartDialogVisible);
let currentUserCart = ref(props.currentUserCart);
let quantityOptions = ref(Array.from({ length: 20 }, (_, i) => i + 1));
let cartItems: Ref<Item[]> = ref([]);
const userCart: Ref<Cart | null> = ref(null);

const mappedCartItems = computed(() => {
  if (!userCart.value) return [];

  return userCart.value.cartItems.map((cartItem) => {
    const fullItem = items.value.find((i) => i._id === cartItem.itemId);

    return {
      ...cartItem,
      ...fullItem,
    };
  });
});

const emit = defineEmits<{
  (e: "update:cartDialogVisible", value: boolean): void;
}>();

onMounted(async () => {
  try {
    await itemStore.loadItems();
    userCart.value = await cartStore.getCartByUserId();
  } catch (error: any) {
    console.error("Error on initialization: ", error);
  }
});

function closeDialog() {
  emit("update:cartDialogVisible", false);
}

function proceedOrder() {
  router.push("/shop-payment");
}

// async function removeFromUserCart(productId: string) {
//   itemToRemove.value = productId;
//   warningDialogVisible.value = true;

// }

// async function confirmRemoveClick() {
//   warningDialogVisible.value = false;

//   const updatedItems = await removeFromCart(itemToRemove.value);
//   if (currentUserCart.value) {
//     currentUserCart.value.cartItems = updatedItems;
//   }
// }

async function updateQuantity(
  productId: string | undefined,
  newQuantity: number,
) {
  try {
    console.log("PRODUCT ID: ", productId);
    console.log("userCart.value: ", userCart.value);
    if (userCart.value) {
      const itemIndex = items.value.findIndex((i) => i._id === productId);

      if (itemIndex !== -1) {
        userCart.value.cartItems[itemIndex].quantity = newQuantity;

        console.log("QUANTITY: ", userCart.value.cartItems[itemIndex].quantity);
        console.log("USER KART: ", userCart.value);
        await cartStore.updateCart(userCart.value);
      }
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}
</script>

<style scoped>
/* .card-title-elements {
  height: 100px;
} */

/* .card-title-element {
  width: 100%;
  height: 50px !important;
} */
</style>
