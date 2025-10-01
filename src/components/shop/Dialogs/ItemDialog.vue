<template>
  <v-dialog v-model="productDialogVisible" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ selectedProduct?.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-img
                :src="
                  selectedProduct?.variants.find(
                    (x) => x.id === selectedProduct?.selectedVariant,
                  )?.image
                "
                contain
                max-height="300px"
              ></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <p>
                <strong>Description:</strong>
                {{ selectedProduct?.description }}
              </p>
              <p><strong>Ingredients:</strong></p>
              <ul>
                <li v-for="hashtag in selectedProduct?.hashTags" :key="hashtag">
                  {{ hashtag }}
                </li>
              </ul>
              <v-select
                v-model="selectedVariant"
                :items="selectedProduct?.variants"
                item-title="color"
                item-value="id"
                label="Select Variant"
                outlined
                v-if="selectedProduct"
              />
              <p><strong>Price:</strong> ${{ selectedProduct?.price }}</p>
              <v-btn
                color="primary"
                @click="addToUserCart(selectedProduct, 1, currentUserCart)"
              >
                <v-icon class="card-actions-icon">mdi-cart</v-icon>
                <p class="card-actions-text">Add to Cart</p>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-row justify="end">
        <v-btn color="warning" class="closeButton" @click="closeDialog"
          >Close</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { addToCart } from "@/composable/useCart";
import { Cart, Item, Variant } from "@/interfaces/interfaces";
import { useItemStore } from "@/stores/ItemStore";
import { storeToRefs } from "pinia";

const itemStore = useItemStore();
const { items } = storeToRefs(itemStore);

const props = defineProps<{
  productDialogVisible: boolean;
  selectedProduct: Item | null;
  selectedVariant: Variant | null;
  currentUserCart: Cart | null;
}>();
const productDialogVisible = props.productDialogVisible;
const selectedProduct = computed(() => {
  if (!props.selectedProduct) return null;
  return items.value.find((i) => i._id === props.selectedProduct!._id) || null;
});
const selectedVariant = props.selectedVariant;
const currentUserCart = props.currentUserCart;

const emit = defineEmits<{
  (e: "update:productDialogVisible", value: boolean): void;
}>();

function closeDialog() {
  emit("update:productDialogVisible", false);
}

async function addToUserCart(
  product: Item | null,
  quantity: number,
  currentUserCart: Cart | null,
) {
  await addToCart(product, quantity, currentUserCart);
}
</script>

<style scoped>
/* .closeButton {
  max-width: 250px;
} */
</style>
