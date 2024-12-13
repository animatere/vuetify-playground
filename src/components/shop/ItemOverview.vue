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
            <v-btn icon @click="toggleCart">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-btn text>Login</v-btn>
          </div>
        </v-container>
      </v-app-bar>
  
      <!-- Main Content -->
      <v-main>
        <v-container>
          <!-- Categories -->
          <v-row>
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
  
            <!-- Products -->
            <v-col cols="12" md="9">
              <v-row>
                <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
                  <v-card class="mb-4">
                    <v-img :src="product.image" height="200px"></v-img>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-subtitle>${{ product.price }}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn text @click="openProductDialog(product)">View</v-btn>
                      <v-btn text @click="addToCart(product, selectedQuantity)">Add to Cart</v-btn>
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
                <v-list-item-title>{{ item.name }}</v-list-item-title>
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
            <span class="text-h5">{{ selectedProduct?.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-img :src="selectedProduct?.image" contain max-height="300px"></v-img>
                </v-col>
                <v-col cols="12" md="6">
                  <p>{{ selectedProduct?.description }}</p>
                  <p><strong>Price:</strong> ${{ selectedProduct?.price }}</p>
                  <v-select
                    v-model="selectedQuantity"
                    :items="quantityOptions"
                    label="Select Quantity"
                    outlined
                  ></v-select>
                  <v-btn color="primary" @click="addToCart(selectedProduct, selectedQuantity)">Add to Cart</v-btn>
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
  export default {
    data() {
      return {
        search: "",
        categories: ["Gaming Mice", "Keyboards", "Headsets", "Monitors", "Chairs"],
        selectedCategories: [],
        priceRange: [0, 500],
        cartVisible: false,
        productDialogVisible: false,
        selectedProduct: null,
        selectedQuantity: 1,
        quantityOptions: Array.from({ length: 20 }, (_, i) => i + 1),
        cartItems: [
          { id: 1, name: "Gaming Mouse - Pro X", price: 79.99, quantity: 1 },
          { id: 2, name: "Mechanical Keyboard - RGB", price: 129.99, quantity: 1 },
        ],
        products: [
          { id: 1, name: "Gaming Mouse - Pro X", price: 79.99, category: "Gaming Mice", image: "https://via.placeholder.com/150", description: "High-performance gaming mouse with customizable buttons and RGB lighting." },
          { id: 2, name: "Mechanical Keyboard - RGB", price: 129.99, category: "Keyboards", image: "https://via.placeholder.com/150", description: "Durable mechanical keyboard with customizable RGB backlighting and ergonomic design." },
          { id: 3, name: "Surround Sound Headset", price: 99.99, category: "Headsets", image: "https://via.placeholder.com/150", description: "Comfortable headset with immersive surround sound and noise-cancelling microphone." },
          { id: 4, name: "4K Gaming Monitor", price: 499.99, category: "Monitors", image: "https://via.placeholder.com/150", description: "Ultra HD gaming monitor with high refresh rate and vibrant colors." },
          { id: 5, name: "Ergonomic Gaming Chair", price: 199.99, category: "Chairs", image: "https://via.placeholder.com/150", description: "Comfortable gaming chair with adjustable lumbar support and premium materials." },
        ],
      };
    },
    computed: {
      calculatedMaxPrice() {
        const highestPrice = Math.max(...this.products.map(product => product.price));
        return Math.ceil(highestPrice / 500) * 500;
      },
      filteredProducts() {
        let filtered = this.products;
  
        if (this.selectedCategories.length > 0) {
          filtered = filtered.filter(product => this.selectedCategories.includes(product.category));
        }
  
        filtered = filtered.filter(product => product.price >= this.priceRange[0] && product.price <= this.priceRange[1]);
  
        return filtered;
      },
    },
    methods: {
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
      },
      toggleCart() {
        this.cartVisible = !this.cartVisible;
      },
      removeFromCart(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
      },
    },
  };
  </script>
  
  <style>
  .search-bar {
    width: 50%;
  }
  </style>
  