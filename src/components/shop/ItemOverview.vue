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
              <v-btn
                icon
                :class="{ 'cart-animate': cartAnimation }"
                @animationend="cartAnimation = false"
                @click="openCartDialog"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
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
              <v-card class="pa-3">
                <v-list>
                  <v-list-item v-for="category in categories" :key="category">
                    <v-list-item-content>
                      <v-checkbox
                        v-model="selectedCategories"
                        :value="category"
                        :label="category"
                      ></v-checkbox>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider
                  thickness="2"
                  color="black"
                  opacity="0.3"
                ></v-divider>
                <v-card-title class="text-h6">Price Range</v-card-title>
                <v-range-slider
                  v-model="priceRange"
                  :max="calculatedMaxPrice"
                  :min="0"
                  :step="10"
                  class="mt-3"
                ></v-range-slider>
                <div class="d-flex justify-space-between">
                  <span> ${{ priceRange[0] }} </span>
                  <span> ${{ priceRange[1] }} </span>
                </div>
              </v-card>
            </v-col>

            <!-- Products Overview -->
            <v-col cols="12" md="9">
              <v-row>
                <v-col
                  v-for="product in filteredProducts"
                  :key="product._id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card class="mb-4">
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
                    <v-card-subtitle
                      >Brand: {{ product.brand }} - ${{
                        product.price
                      }}</v-card-subtitle
                    >
                    <v-card-text>
                      {{ product.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-col>
                        <v-btn @click="openProductDialog(product)">View</v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          @click="addToUserCart(product, 1, currentUserCart)"
                          >Add to Cart</v-btn
                        >
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <cart-dialog
        v-if="cartDialogVisible && currentUserCart"
        v-model:cartDialogVisible="cartDialogVisible"
        :current-user-cart="currentUserCart"
      >
      </cart-dialog>

      <item-dialog
        v-if="productDialogVisible"
        v-model:productDialogVisible="productDialogVisible"
        :selected-product="selectedProduct"
        :selected-variant="selectedVariant"
        :current-user-cart="currentUserCart"
      ></item-dialog>
    </v-row>
  </v-app>
</template>

<script setup lang="ts">
import { Cart, Item, Variant } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";
// import { useInventoryStore } from "@/stores/InventoryStore";
import { useItemStore } from "@/stores/ItemStore";
import { ref, computed, onMounted } from "vue";
import { addToCart } from "@/composable/useCart";

// stores
const cartStore = useCartStore();
const itemStore = useItemStore();
// const inventoryStore = useInventoryStore();

// filtering => ToDo: aus Datenbank lesen, um es noch dynamischer zu machen
const search = ref("");
const categories = ref([
  "Gaming Mice",
  "Keyboards",
  "Headsets",
  "Monitors",
  "Chairs",
]);
const selectedCategories = ref<string[]>([]);
const priceRange = ref([0, 500]);

// dialogs
const cartDialogVisible = ref(false);
const productDialogVisible = ref(false);

// selection
const selectedProduct = ref<Item | null>(null);
const selectedVariant = ref<Variant | null>(null);
const cartItems: Ref<Item[]> = ref([]);

// general
const products: Ref<Item[] | []> = ref([]);
const currentUserCart: Ref<Cart | null> = ref(null);
const cartAnimation = ref(false);

const calculatedMaxPrice = computed(() => {
  const highestPrice = Math.max(
    ...products.value.map((product) => product.price),
  );
  return highestPrice;
});

const filteredProducts = computed(() => {
  if (search.value != null) {
    return products.value.filter((product) => {
      const matchesCategory =
        selectedCategories.value.length === 0 ||
        selectedCategories.value.includes(product.category);
      const matchesPrice =
        product.price >= priceRange.value[0] &&
        product.price <= priceRange.value[1];
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.value.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }
});

onMounted(async () => {
  try {
    currentUserCart.value = await cartStore.getCartByUserId();
    products.value = await itemStore.getItems();
  } catch (error: any) {
    console.error("Error on getCart() ", error);
  }
});

function clearSearchBar() {
  search.value = "";
}

// function updateProductImage(newVariant: Variant) {
//   if (selectedProduct.value) {
//     selectedProduct.value.selectedVariant = newVariant.id;
//     // Das Bild wird automatisch aktualisiert, da es über selectedVariant gebunden ist
//   }
// }

function openProductDialog(product: Item) {
  selectedProduct.value = product;
  selectedVariant.value =
    product.variants.find((v) => v.id === product.selectedVariant) || null;
  productDialogVisible.value = true;
}

async function openCartDialog() {
  // Cart abrufen anhand der userId
  currentUserCart.value = await cartStore.getCartByUserId();

  // Wenn kein Cart vorhanden ist, neuen Cart erstellen
  if (currentUserCart.value._id === "") {
    await cartStore.createCart([]);
    currentUserCart.value = await cartStore.getCartByUserId();
  }

  // Toggle Modal nur wenn Cart vorhanden ist
  if (currentUserCart.value._id !== "") {
    console.log("Cart in Datenbank gefunden... ", currentUserCart.value);
    cartDialogVisible.value = !cartDialogVisible.value;
  } else {
    console.error("Cart konnte nicht erstellt oder geladen werden.");
  }
}

async function addToUserCart(
  product: Item,
  quantity: number,
  currentUserCart: Cart | null,
) {
  cartItems.value = await addToCart(product, quantity, currentUserCart);
}
</script>

<style scoped>
.v-card {
  margin: 15px;
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

.top-navigation {
  margin-left: 25px;
}

.search-bar {
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
