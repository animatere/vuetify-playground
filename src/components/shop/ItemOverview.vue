<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <v-container class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-btn text class="text-h5">GamingGear</v-btn>
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
          <v-btn icon :class="{'cart-animate': cartAnimation}" @animationend="cartAnimation = false" @click="toggleCart">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <v-btn text>Login</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row>
          <!-- Sidebar Filters -->
          <v-col cols="12" md="3">
            <v-card class="pa-3">
              <v-list>
                <v-list-item v-for="category in categories" :key="category">
                  <v-list-item-content>
                    <v-checkbox v-model="selectedCategories" :value="category" :label="category"></v-checkbox>
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
                ticks
                class="mt-3"
              ></v-range-slider>
              <div class="d-flex justify-space-between">
                <span>
                  ${{ priceRange[0] }}
                </span>
                <span>
                  ${{ priceRange[1] }}
                </span>
              </div>
            </v-card>
          </v-col>

          <!-- Products Overview -->
          <v-col cols="12" md="9">
            <v-row>
              <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
                <v-card class="mb-4">
                  <v-img :src="product.link" height="200px" contain></v-img>
                  <v-card-title>{{ product.title }}</v-card-title>
                  <v-card-subtitle>Brand: {{ product.brand }} - ${{ product.price }}</v-card-subtitle>
                  <v-card-text>
                    <ul>
                      <li v-for="detail in product.details" :key="detail">{{ detail }}</li>
                    </ul>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn icon text @click="openProductDialog(product)" class="card-actions-btn">
                      <v-icon class="card-actions-icon">mdi-magnify</v-icon>
                      <p class="card-actions-text">View</p>
                    </v-btn><br>
                    <v-btn icon text :disabled="!product.inStock" @click="addToCart(product, selectedQuantity)" class="card-actions-btn">
                      <v-icon class="card-actions-icon">mdi-cart</v-icon>
                      <p class="card-actions-text">Add</p>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Cart Drawer -->
    <v-navigation-drawer app right temporary v-model="cartVisible">
      <v-card class="pa-4">
        <v-card-title>Your Cart</v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="item in cartItems" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>{{ item.link }}</v-list-item-title>
              <v-list-item-subtitle>Brand: {{ item.brand }}</v-list-item-subtitle>
              <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
              <v-list-item-subtitle>Total: ${{ (item.price * item.quantity).toFixed(2) }}</v-list-item-subtitle>
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
    </v-navigation-drawer>

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
                <v-img :src="selectedProduct?.link" contain max-height="300px"></v-img>
              </v-col>
              <v-col cols="12" md="6">
                <p><strong>Description:</strong> {{ selectedProduct?.description }}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                  <li v-for="ing in selectedProduct?.incredience" :key="ing">{{ ing }}</li>
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
                <v-btn color="primary" @click="addToCart(selectedProduct, selectedQuantity)">
                  <v-icon class="card-actions-icon">mdi-cart</v-icon>
                  <p class="card-actions-text">Add to Cart</p>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="productDialogVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Footer -->
    <v-footer app>
      <v-container>
        <p>&copy; {{ new Date().getFullYear() }} GamingGear. All rights reserved.</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      categories: ["Accessory", "Audio", "Display", "Furniture"],
      selectedCategories: [],
      priceRange: [0, 500],
      cartVisible: false,
      productDialogVisible: false,
      selectedProduct: null,
      selectedQuantity: 1,
      quantityOptions: Array.from({ length: 20 }, (_, i) => i + 1),
      cartItems: [],
      products: [],
      cartAnimation: false,
    };
  },
  computed: {
    calculatedMaxPrice() {
      const highestPrice = Math.max(...this.products.map(product => product.price));
      return Math.ceil(highestPrice / 500) * 500;
    },
    filteredProducts() {
      let filtered = this.products;

      // Kategorie-Filterung
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
          product.title.includes(this.selectedCategories) || 
          product.brand.includes(this.selectedCategories) || 
          product.product.includes(this.selectedCategories)
        );
      }

      // Suchfeld-Filterung
      if (this.search.trim() !== "") {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(this.search.toLowerCase()) ||
          product.description.toLowerCase().includes(this.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      // Preis-Range-Filterung
      filtered = filtered.filter(
        product => product.price >= this.priceRange[0] && product.price <= this.priceRange[1]
      );

      return filtered;
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:4000/items");
        this.products = response.data;
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },
    openProductDialog(product) {
      this.selectedProduct = product;
      this.productDialogVisible = true;
    },
    addToCart(product, quantity) {
      const cartItem = this.cartItems.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        this.cartItems.push({ ...product, quantity });
      }
      this.triggerCartAnimation();
    },
    toggleCart() {
      this.cartVisible = !this.cartVisible;
    },
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    },
    triggerCartAnimation() {
      this.cartAnimation = true;
    },
  },
  async mounted() {
    await this.fetchProducts();
  },
};
</script>

<style>
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
  height: 100%!important;
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

.card-actions-btn{
  min-width: 100px;
  border-radius: 5px;
}

.card-actions-icon{
  margin-right: 5px;
}
@media (max-width: 1280px) {
  .card-actions-btn{
    display: none;
    min-width: 50px;
  }
  .card-actions-icon{
  margin-right: 0px;
  }
  .card-actions-text{
    display: none;
  }
}
</style>
