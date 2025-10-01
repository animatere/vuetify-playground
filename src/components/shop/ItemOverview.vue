<template>
  <v-app>
    <!-- Header -->
    <v-row>
      <v-app-bar app style="z-index: 0 !important">
        <v-container class="top-navigation">
          <v-row>
            <v-text-field
              v-model="search"
              placeholder="Search for items..."
              outlined
              hide-details
              dense
              clearable
              class="search-bar"
              @click:clear="clearSearchBar"
            ></v-text-field>
            <div class="d-flex align-center">
              <v-icon
                :class="{ 'cart-animate': cartAnimation }"
                @animationend="cartAnimation = false"
                @click="openCartDialog"
                :size="25"
              >
                mdi-cart
              </v-icon>
            </div>
          </v-row>
        </v-container>
      </v-app-bar>
    </v-row>
    <v-row>
      <!-- Main Content -->
      <v-main>
        <v-container>
          <v-row class="full-width">
            <!-- Sidebar Filters -->
            <v-col cols="12" md="3">
              <product-filters
                @filtersChanged="updateFilters"
              ></product-filters>
            </v-col>

            <!-- Products Overview -->
            <v-col cols="12" md="9">
              <v-row>
                <!-- Produkte direkt aus dem Store laden, Filter & Suche via computed -->
                <v-col
                  v-for="product in filteredList"
                  :key="product._id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card class="mb-4 item-card">
                    <v-img
                      :src="
                        product.variants.find(
                          (x) => x.id === product.selectedVariant,
                        )?.image
                      "
                      height="200px"
                      contain
                    ></v-img>
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-card-subtitle class="small-font"
                      >Brand: {{ product.brand }}</v-card-subtitle
                    >
                    <v-card-text class="small-font">
                      {{ product.description }}
                    </v-card-text>
                    <v-card-text style="font-size: large"
                      >{{ product.price }} €</v-card-text
                    >
                    <v-card-actions>
                      <v-col>
                        <v-btn
                          class="small-font"
                          @click="openProductDialog(product)"
                          ><p class="display-btn-text">View</p>
                          <v-icon
                            class="display-btn-icon"
                            icon="mdi-magnify"
                          ></v-icon
                        ></v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          class="small-font"
                          @click="addToUserCart(product, 1, userCart)"
                          ><p class="display-btn-text">Add to Cart</p>
                          <v-icon
                            class="display-btn-icon"
                            icon="mdi-cart"
                          ></v-icon>
                        </v-btn>
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Dialogs -->
      <cart-dialog
        v-if="cartDialogVisible && userCart"
        v-model:cartDialogVisible="cartDialogVisible"
        :current-user-cart="userCart"
      >
      </cart-dialog>

      <item-dialog
        v-if="productDialogVisible"
        v-model:productDialogVisible="productDialogVisible"
        :selected-product="selectedProduct"
        :selected-variant="selectedVariant"
        :current-user-cart="userCart"
      ></item-dialog>
    </v-row>
  </v-app>
</template>

<script setup lang="ts">
import { Cart, CartItem, Item, Variant } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";
import { useItemStore } from "@/stores/ItemStore";
import { ref, computed, onMounted } from "vue";
import { addToCart } from "@/composable/useCart";
import { storeToRefs } from "pinia";

// Stores
const cartStore = useCartStore();
const itemStore = useItemStore();
const { items } = storeToRefs(itemStore); // reaktive Items aus dem Store
const search = ref("");
const priceRange = ref<number[]>([0, 1000]);
const categories = ref<string[]>([]);
const cartDialogVisible = ref(false);
const productDialogVisible = ref(false);

// selection
const selectedProduct = ref<Item | null>(null);
const selectedVariant = ref<Variant | null>(null);
const cartItems: Ref<CartItem[]> = ref([]);

// general
const userCart: Ref<Cart | null> = ref(null);
const cartAnimation = ref(false);

onMounted(async () => {
  userCart.value = await cartStore.getCartByUserId();
});

function updateFilters(filters: {
  categories: string[];
  priceRange: number[];
}) {
  categories.value = filters.categories;
  priceRange.value = filters.priceRange;
}

const filteredList = computed(() => {
  return itemStore.filteredItems(
    search.value,
    categories.value,
    priceRange.value,
  );
});

function clearSearchBar() {
  search.value = "";
}

function openProductDialog(product: Item) {
  selectedProduct.value = product;
  selectedVariant.value =
    product.variants.find((v) => v.id === product.selectedVariant) || null;
  productDialogVisible.value = true;
}

async function openCartDialog() {
  userCart.value = await cartStore.getCartByUserId();

  if (!userCart.value?._id) {
    await cartStore.createCart([]);
    userCart.value = await cartStore.getCartByUserId();
  }

  if (userCart.value?._id) {
    cartDialogVisible.value = !cartDialogVisible.value;
  } else {
    console.error("Cart konnte nicht erstellt oder geladen werden.");
  }
}

async function addToUserCart(
  product: Item,
  quantity: number,
  userCart: Cart | null,
) {
  cartItems.value = await addToCart(product, quantity, userCart);
}
</script>

<style scoped>
.v-card {
  margin: 15px;
}

.item-card {
  height: 500px;
}

.display-btn-icon {
  display: none;
}

.cart-animate {
  animation: cart-pulse 0.5s ease-in-out;
}
@keyframes cart-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

li {
  list-style: none;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100% !important;
}

.product-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  max-height: 200px;
}

.product-title,
.product-subtitle {
  text-align: center;
}

.product-details {
  flex-grow: 1;
  padding: 10px;
}

.card-actions-btn {
  min-width: 100px;
  border-radius: 5px;
}

.card-actions-icon {
  margin-right: 5px;
}
@media (max-width: 1280px) {
  .card-actions-btn {
    display: none;
    min-width: 50px;
  }
  .card-actions-icon {
    margin-right: 0px;
  }
  .card-actions-text {
    display: none;
  }
}

@media (max-width: 1440px) {
  .small-font {
    font-size: small;
  }
  .card-actions-btn {
    max-width: 50px;
  }

  .display-btn-text {
    display: none;
  }

  .display-btn-icon {
    display: block;
  }
}

.top-navigation {
  margin-left: 25px;
}

.search-bar ::placeholder {
  text-align: center;
}

.cart-animate {
  animation: cart-animation 0.5s;
}

@keyframes cart-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
