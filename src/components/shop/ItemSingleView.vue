<template>
  <v-container class="mt-5">
    <v-row>
      <!-- Bildbereich -->
      <v-col cols="12" md="4">
        <v-card>
          <v-img
            :src="currentImage"
            alt="Produktbild"
            class="mb-3"
            max-height="400"
          ></v-img>
          <v-row class="d-flex justify-center">
            <v-img
              v-for="(image, index) in images"
              :key="index"
              :src="image"
              alt="Thumbnail"
              class="mx-1"
              max-width="60"
              max-height="60"
              @click="currentImage = image"
              style="cursor: pointer"
            ></v-img>
          </v-row>
        </v-card>
      </v-col>

      <!-- Produktbeschreibung -->
      <v-col cols="12" md="5">
        <h1>{{ product.title }}</h1>
        <v-rating v-model="product.rating" readonly></v-rating>
        <p>{{ product.rating }}</p>
        <p>{{ product.description }}</p>
        <h3>Preis: {{ product.price }} €</h3>
        <p><strong>Lieferung:</strong> {{ product.shipping }}</p>
        <v-divider class="my-3"></v-divider>
        <h4>Technische Details:</h4>
        <v-list dense>
          <v-list-item v-for="(detail, index) in product.details" :key="index">
            <v-list-item-content>{{ detail }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Kaufoptionen -->
      <v-col cols="12" md="3">
        <v-card class="pa-3">
          <h3>Preis: {{ product.price }} €</h3>
          <p>Lieferung: {{ product.shipping }}</p>
          <v-btn block color="primary" class="mb-2">In den Warenkorb</v-btn>
          <v-btn block color="secondary">Jetzt kaufen</v-btn>
          <p class="mt-2">
            <small>Verfügbar: {{ product.stock }} Stück</small>
          </p>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Reactive Variablen
const product = ref({
  title: "Wolf Produkt",
  description: "Dies ist eine detaillierte Beschreibung des Produkts.",
  price: 99.99,
  shipping: "Kostenloser Versand",
  rating: 4.5,
  stock: 15,
  details: [
    "Material: Hochwertiger Kunststoff",
    "Abmessungen: 25 x 15 x 10 cm",
    "Gewicht: 500g",
    "Farbe: Schwarz",
  ],
});

const currentImage = ref(
  "https://wolfcenter.de/wp-content/uploads/2020/11/Shop-Depositphotos_9394936_xl-2015_300px_x_400px-300x400.jpg",
);
const images = ref([
  "https://wolfcenter.de/wp-content/uploads/2020/11/Shop-Depositphotos_9394936_xl-2015_300px_x_400px-300x400.jpg",
  "https://i.ebayimg.com/images/g/oXIAAOSw-XxmmPij/s-l400.jpg",
]);

</script>

<style scoped>
body {
  height: 200vh;
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}
h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}
</style>
