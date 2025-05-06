<template>
  <v-app>
    <!-- Header -->
     <v-row>
    <v-app-bar app style="z-index: 0 !important">
      <v-container class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-btn class="text-h5">GamingGear</v-btn>
        </div>
        <v-text-field
          v-model="search"
          placeholder="Search for gaming accessories..."
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
          <v-btn>Login</v-btn>
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
                :key="product.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="mb-4">
                  <v-img :src="product.link" height="200px" contain></v-img>
                  <v-card-title>{{ product.title }}</v-card-title>
                  <v-card-subtitle
                    >Brand: {{ product.brand }} - ${{
                      product.price
                    }}</v-card-subtitle
                  >
                  <v-card-text>
                    <ul>
                      <li v-for="detail in product.details" :key="detail">
                        {{ detail }}
                      </li>
                    </ul>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="openProductDialog(product)">View</v-btn>
                    <v-btn @click="addToCart(product, selectedQuantity)"
                      >Add to Cart</v-btn
                    >
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
        <v-card-title class="text-h5 font-weight-bold">Your Cart</v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="item in cartItems" :key="item.id">
            <v-list-item-avatar>
              <v-img
                :src="item.link"
                alt="Item Image"
                class="rounded"
                contain
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle
                >Brand: {{ item.brand }}</v-list-item-subtitle
              >

              <!-- Select für die Anzahl -->
              <v-select
                v-model="selectedQuantity"
                :items="quantityOptions"
                label="Quantity"
                @change="updateQuantity(item.id, item.quantity)"

              ></v-select>

              <v-list-item-subtitle
                >Total: ${{
                  (item.price * item.quantity).toFixed(2)
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="red" @click="removeFromCart(item.id)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" block>Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Product Dialog -->
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
                  :src="selectedProduct?.link"
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
                  <li v-for="ing in selectedProduct?.incredience" :key="ing">
                    {{ ing }}
                  </li>
                </ul>
                <v-select
                  v-model="selectedProduct.selectedVariant"
                  :items="selectedProduct?.variants"
                  item-text="name"
                  item-value="id"
                  label="Select Variant"
                  outlined
                ></v-select>
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
import { Product } from "@/interfaces/interfaces";
import { ref, computed } from "vue";

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
const selectedProduct = ref<any>(null);
const selectedQuantity = ref(1);
const quantityOptions = ref(Array.from({ length: 20 }, (_, i) => i + 1));
const cartItems = ref([
  {
    id: 1,
    title: "Gaming Mouse - Pro X",
    price: 79.99,
    quantity: 2,
    brand: "Logitech",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    category: "Gaming Mice",
    link: "...",
    description: "High-performance gaming mouse...",
  },
  {
    id: 2,
    title: "Mechanical Keyboard - RGB",
    price: 129.99,
    quantity: 3,
    brand: "Corsair",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    category: "Keyboards",
    link: "...",
    description: "Durable mechanical keyboard...",
  },
]);
const products = ref<Product[]>([
  {
    id: "1",
    title: "Gaming Mouse - Pro X",
    price: 79.99,
    category: "Gaming Mice",
    brand: "Corsair",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    link: "https://resource.logitech.com/content/dam/gaming/en/products/g502x-lightspeed/gallery/g502x-lightspeed-gallery-1-black.png",
    description:
      "High-performance gaming mouse with customizable buttons and RGB lighting.",
  },
  {
    id: "2",
    title: "Mechanical Keyboard - RGB",
    price: 129.99,
    category: "Keyboards",
    brand: "Corsair",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    link: "https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-keys-s/product-gallery/graphite/mx-keys-s-keyboard-top-view-graphite-tur.png",
    description:
      "Durable mechanical keyboard with customizable RGB backlighting and ergonomic design.",
  },
  {
    id: "3",
    title: "Surround Sound Headset",
    price: 99.99,
    category: "Headsets",
    brand: "Corsair",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    link: "https://gmedia.playstation.com/is/image/SIEPDC/3d-pulse-headset-product-thumbnail-01-en-14sep21?$facebook$",
    description:
      "Comfortable headset with immersive surround sound and noise-cancelling microphone.",
  },
  {
    id: "4",
    title: "4K Gaming Monitor",
    price: 599.99,
    category: "Monitors",
    brand: "Corsair",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    link: "https://media.jacob.services/images/9a/f6/52/90/9af65290bde4138ef83a8b2f8c905c75.png",
    description:
      "Ultra HD gaming monitor with high refresh rate and vibrant colors.",
  },
  {
    id: "5",
    title: "Ergonomic Gaming Chair",
    price: 199.99,
    category: "Chairs",
    brand: "Corsair",
    details: ["Cherry MX Switches", "RGB Backlight", "Wired"],
    link: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_78825329?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    description:
      "Comfortable gaming chair with adjustable lumbar support and premium materials.",
  },
]);

const cartAnimation = ref(false);

// Berechnete Eigenschaften
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

// Methoden
function toggleCart() {
  cartModalVisible.value = !cartModalVisible.value;
}

function addToCart(product: any, quantity: number) {
  const existingItem = cartItems.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.value.push({ ...product, quantity });
  }
  cartAnimation.value = true;
  cartModalVisible.value = true;
}

function removeFromCart(id: number) {
  const index = cartItems.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
}

function updateQuantity(id: number, quantity: number) {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    item.quantity = quantity;
  }
}

function openProductDialog(product: any) {
  selectedProduct.value = product;
  productDialogVisible.value = true;
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

li{
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
