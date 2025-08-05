<template>
  <h3>Bestellübersicht</h3>
  <div v-for="item in currentUserCart.items" v-if="currentUserCart">
    <v-row>
      <v-col lg="4" md="12" sm="12">
        <v-img
          :src="item.variants[0].image"
          style="
            width: 200px;
            height: 150px;
            border: solid black 1px;
            border-radius: 5px;
          "
          contain
        ></v-img>
        <p style="color: green; font-size: small; margin-top: 5px">
          Sofort Lieferbar
        </p>
        <p style="color: red; font-size: small; margin-top: 5px">
          nur noch 4 Artikel vorhanden
        </p>
      </v-col>
      <v-col lg="8" md="12" sm="12">
        <p style="text-align: left">
          <strong>Artikel:</strong> {{ item.title }}
        </p>
        <p style="text-align: left"><strong>Marke:</strong> {{ item.brand }}</p>
        <p style="text-align: left">
          <strong>Einzelpreis:</strong> {{ item.price }}
        </p>
        <v-select
          v-model="item.quantity"
          :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          label="Anzahl"
          dense
          outlined
          @update:model-value="updateUserCart(item._id, item.quantity)"
        />
        <v-btn
          @click="removeFromUserCart(item._id)"
          color="secondary"
          style="margin-bottom: 20px"
        >
          Entfernen</v-btn
        >
        <v-divider thickness="2" color="black" opacity="0.3"></v-divider>
      </v-col>
    </v-row>
  </div>
  <div v-if="currentUserCart">
    <p>
      <strong>Gesamtpreis: {{ totalPrice.toFixed(2) }} €</strong>
    </p>
    <v-btn color="primary" style="margin-top: 10px"> Kauf abschließen</v-btn>
  </div>

  <warning-dialog
    v-if="warningDialogVisible"
    v-model:warningDialogVisible="warningDialogVisible"
    @confirm-remove="confirmRemoveClick()"
  >
  </warning-dialog>
</template>

<script setup lang="ts">
import { removeFromCart, updateQuantity } from "@/composable/useCart";
import { Cart } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";
import { ref, onMounted } from "vue";

const cartStore = useCartStore();

const currentUserCart: Ref<Cart | null> = ref(null);
const warningDialogVisible = ref(false);
const itemToRemove: Ref<string> = ref("");

onMounted(async () => {
  try {
    currentUserCart.value = await cartStore.getCartByUserId();
  } catch (error: any) {
    console.error("Error on fetching cart...", error);
  }
});

const totalPrice = computed(() => {
  if (!currentUserCart.value?.items) return 0;

  return currentUserCart.value.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
});

async function updateUserCart(productId: string, newQuantity: number) {
  const updatedItems = await updateQuantity(productId, newQuantity);
  if (currentUserCart.value) {
    currentUserCart.value.items = updatedItems;
  }
}

async function removeFromUserCart(productId: string) {
  itemToRemove.value = productId;
  warningDialogVisible.value = true;
}

async function confirmRemoveClick() {
  warningDialogVisible.value = false;

  const updatedItems = await removeFromCart(itemToRemove.value);
  if (currentUserCart.value) {
    currentUserCart.value.items = updatedItems;
  }
}
</script>
