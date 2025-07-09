<template>
  <v-app>
    <!-- Header -->
    <v-row>
      <v-app-bar app style="z-index: 0 !important">
        <v-container class="d-flex justify-space-between">
          <v-text-field
            v-model="search"
            placeholder="Search for items..."
            outlined
            hide-details
            dense
            clearable
            class="search-bar"
          ></v-text-field>
          <div class="d-flex align-center">
            <v-btn
              icon
              :class="{ 'cart-animate': cartAnimation }"
              @animationend="cartAnimation = false"
              @click="toggleCart"
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </div>
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
                <v-divider class="my-4"></v-divider>
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
                      <v-btn @click="openProductDialog(product)">View</v-btn>
                      <v-btn @click="addToCart(product, 1)">Add to Cart</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Warenkorb Modal -->
      <v-dialog v-model="cartModalVisible" max-width="800px">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold"
            >Your Cart</v-card-title
          >
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="product in currentUserCart?.items"
              :key="product._id"
            >
              <v-list-item-avatar>
                <v-img
                  :src="
                    product.variants.find(
                      (x) => x.id === product.selectedVariant,
                    )?.image
                  "
                  alt="Item Image"
                  class="rounded"
                  contain
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ product.title }}</v-list-item-title>
                <v-list-item-subtitle
                  >Brand: {{ product.brand }}</v-list-item-subtitle
                >
                <v-select
                  v-model="product.quantity"
                  :items="quantityOptions"
                  label="Quantity"
                  @update:modelValue="
                    (newValue) => updateQuantity(product._id, newValue)
                  "
                ></v-select>

                <v-list-item-subtitle
                  >Total: ${{
                    (product.price * product.quantity).toFixed(2)
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon color="red" @click="removeFromCart(product._id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="proceedOrder()" color="primary" block
              >Checkout</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Product Dialog -->
      {{ selectedVariant }}
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
                    <li
                      v-for="hashtag in selectedProduct?.hashTags"
                      :key="hashtag"
                    >
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
                    @update:modelValue="updateProductImage"
                  />
                  <p><strong>Price:</strong> ${{ selectedProduct?.price }}</p>
                  <v-btn
                    color="primary"
                    @click="addToCart(selectedProduct, selectedQuantity)"
                  >
                    <v-icon class="card-actions-icon">mdi-cart</v-icon>
                    <p class="card-actions-text">Add to Cart</p>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="productDialogVisible = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script setup lang="ts">
import { Cart, Item, Variant } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";
import { useItemStore } from "@/stores/ItemStore";
import { ref, computed, onMounted } from "vue";

const cartStore = useCartStore();
const itemStore = useItemStore();

// Reactive Variablen
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
const cartModalVisible = ref(false); // Modal-Visibility für Warenkorb
const productDialogVisible = ref(false);
const selectedProduct = ref<Item | null>(null);
const selectedQuantity = ref(1);
const quantityOptions = ref(Array.from({ length: 20 }, (_, i) => i + 1));
const products: Ref<Item[] | []> = ref([]);
const selectedVariant = ref<Variant | null>(null);

const cartItems: Ref<Item[]> = ref([]);
const currentUserCart: Ref<Cart | null> = ref(null);

const cartAnimation = ref(false);

const calculatedMaxPrice = computed(() => {
  const highestPrice = Math.max(
    ...products.value.map((product) => product.price),
  );
  return highestPrice;
});

const filteredProducts = computed(() => {
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
});

function updateProductImage(newVariant: Variant) {
  if (selectedProduct.value) {
    selectedProduct.value.selectedVariant = newVariant.id;
    // Das Bild wird automatisch aktualisiert, da es über selectedVariant gebunden ist
  }
}

function openProductDialog(product: Item) {
  selectedProduct.value = product;
  selectedVariant.value =
    product.variants.find((v) => v.id === product.selectedVariant) || null;
  productDialogVisible.value = true;
}

function proceedOrder() {
  console.log("Cart: ", currentUserCart.value);
}

onMounted(async () => {
  try {
    currentUserCart.value = await cartStore.getCartByUserId();
    products.value = await itemStore.getItems();
  } catch (error: any) {
    console.error("Error on getCart() ", error);
  }
});

async function toggleCart() {
  console.log("currentUserCart: ", currentUserCart.value);
  // Cart abrufen
  currentUserCart.value = await cartStore.getCartByUserId();

  // Wenn kein Cart vorhanden ist, neuen erstellen
  if (currentUserCart.value._id === "") {
    await cartStore.createCart([]);
    currentUserCart.value = await cartStore.getCartByUserId();
  } else {
    console.log("cart in Datenbank gefunden... ", currentUserCart.value);
  }

  // Toggle Modal nur wenn Cart vorhanden ist
  if (currentUserCart.value._id !== "") {
    cartModalVisible.value = !cartModalVisible.value;
  } else {
    console.error("Cart konnte nicht erstellt oder geladen werden.");
  }
}

async function addToCart(product: Item, quantity: number) {
  currentUserCart.value = await cartStore.getCartByUserId();
  if (!currentUserCart.value) {
    await cartStore.createCart([]);
    currentUserCart.value = await cartStore.getCartByUserId();
  }

  const existingItem = currentUserCart.value.items.find(
    (item) =>
      item._id === product._id &&
      item.selectedVariant === product.selectedVariant,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    currentUserCart.value.items.push({
      ...product,
      quantity,
    });
  }

  await cartStore.updateCart(currentUserCart.value);
  cartItems.value = currentUserCart.value.items;
  cartAnimation.value = true;
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

<style scoped>
.v-card {
  margin: 15px;
}

.search-bar {
  width: 50%;
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

.search-bar {
  max-width: 500px;
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
