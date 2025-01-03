<template>
    <v-container class="mt-5">
      <v-row>
        <!-- Bildbereich -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img :src="currentImage" alt="Produktbild" class="mb-3" max-height="400"></v-img>
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
            <p class="mt-2"><small>Verfügbar: {{ product.stock }} Stück</small></p>
          </v-card>
        </v-col>
      </v-row>
  
      <v-divider class="my-5"></v-divider>
  
      <!-- Ähnliche Produkte -->
      <v-row>
        <h2 class="mb-4">Ähnliche Produkte</h2>
        <v-col cols="12" sm="6" md="3" v-for="(similar, index) in similarProducts" :key="index">
          <v-card>
            <v-img :src="similar.image" alt="Ähnliches Produkt" height="150"></v-img>
            <v-card-title>{{ similar.title }}</v-card-title>
            <v-card-subtitle>Preis: {{ similar.price }} €</v-card-subtitle>
            <v-btn block color="primary">Ansehen</v-btn>
          </v-card>
        </v-col>
      </v-row>
  
      <v-divider class="my-5"></v-divider>
  
      <!-- Kundenrezensionen -->
      <v-row>
        <h2 class="mb-4">Kundenrezensionen</h2>
  
        <!-- Durchschnittliche Bewertung -->
        <v-col cols="12" md="3">
          <v-card class="pa-4">
            <h3>Durchschnittliche Bewertung</h3>
            <v-rating v-model="averageRating" readonly></v-rating>
            <p>{{ reviews.length }} Bewertungen</p>
            <v-progress-linear
              v-for="(percentage, index) in starPercentages"
              :key="index"
              :value="percentage"
              color="primary"
              class="mb-2"
            >
              <template #default>
                {{ 5 - index }} Sterne: {{ percentage }}%
              </template>
            </v-progress-linear>
          </v-card>
        </v-col>
  
        <!-- Einzelne Rezensionen -->
        <v-col cols="12" md="9">
          <v-card class="pa-4" v-for="(review, index) in reviews" :key="index">
            <v-row>
              <v-col cols="12">
                <v-rating :value="review.rating" readonly></v-rating>
                <p><strong>{{ review.user }}</strong></p>
                <p>{{ review.text }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          title: "Produktname",
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
        },
        currentImage:
          "https://wolfcenter.de/wp-content/uploads/2020/11/Shop-Depositphotos_9394936_xl-2015_300px_x_400px-300x400.jpg",
        images: [
          "https://wolfcenter.de/wp-content/uploads/2020/11/Shop-Depositphotos_9394936_xl-2015_300px_x_400px-300x400.jpg",
          "https://i.ebayimg.com/images/g/oXIAAOSw-XxmmPij/s-l400.jpg",
          "https://wolfcenter.de/wp-content/uploads/2020/11/Shop-Depositphotos_9394936_xl-2015_300px_x_400px-300x400.jpg",
          "https://i.ebayimg.com/images/g/oXIAAOSw-XxmmPij/s-l400.jpg",
        ],
        reviews: [
          { user: "Max M.", rating: 5, text: "Tolles Produkt, sehr zufrieden!" },
          { user: "Anna S.", rating: 4, text: "Gutes Preis-Leistungs-Verhältnis." },
          { user: "Felix K.", rating: 3, text: "Qualität könnte besser sein." },
        ],
      };
    },
    computed: {
      averageRating() {
        if (this.reviews.length === 0) return 0;
        const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        return total / this.reviews.length;
      },
      starPercentages() {
        const total = this.reviews.length;
        const percentages = [5, 4, 3, 2, 1].map(
          (star) =>
            (this.reviews.filter((review) => review.rating === star).length / total) * 100
        );
        return percentages;
      },
    },
  };
  </script>
  
  <style scoped>
  body{
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
  