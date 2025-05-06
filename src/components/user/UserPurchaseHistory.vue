<template>
  <v-container>
    <v-row style="margin-top: 25px;">
      <v-col v-for="order in orders" :key="order.id" cols="12" md="6" lg="4">
        <v-card
          class="order-card"
          @mouseover="onHover = true"
          @mouseleave="onHover = false"
        >
          <v-card-title>
            <div class="d-flex justify-space-between align-center">
              <span class="headline">Bestellung #{{ order.id }}</span>
              <v-chip
                v-if="order.status === 'Abgeschlossen'"
                color="green"
                text-color="white"
                >{{ order.status }}</v-chip
              >
              <v-chip
                v-if="order.status === 'Versendet'"
                color="blue"
                text-color="white"
                >{{ order.status }}</v-chip
              >
              <v-chip
                v-if="order.status === 'Storniert'"
                color="red"
                text-color="white"
                >{{ order.status }}</v-chip
              >
            </div>
          </v-card-title>

          <v-card-subtitle style="margin-top: 10px">
            <span class="subheading">{{ formatDate(order.date) }}</span>
          </v-card-subtitle>

          <v-card-text class="card-content">
            <v-row>
              <v-col
                v-for="product in order.products"
                :key="product.id"
                cols="12"
              >
                <v-chip class="mb-2" color="primary" text-color="white" pill
                  >{{ product.name }} ({{ product.quantity }})</v-chip
                >
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="card-actions">
            <v-btn
              class="d-block w-100"
              :class="onHover ? 'elevation-12' : 'elevation-2'"
              color="indigo"
              @click="openOrderDetails(order)"
            >
              <v-icon left>mdi-eye</v-icon> Details anzeigen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Order Details Modal -->
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Bestell-Details für Bestellung #{{ selectedOrder.id }}</span
          >
        </v-card-title>
        <v-card-subtitle>
          <div><strong>Status:</strong> {{ selectedOrder.status }}</div>
          <div>
            <strong>Bestelldatum:</strong> {{ formatDate(selectedOrder.date) }}
          </div>
        </v-card-subtitle>

        <v-card-text>
          <!-- Artikel Tabelle -->
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Artikelname</th>
                <th class="text-left">Beschreibung</th>
                <th class="text-left">Anzahl</th>
                <th class="text-left">Einzelpreis (€)</th>
                <th class="text-left">Gesamtpreis (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in selectedOrder.products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.description || "Keine Beschreibung" }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.price.toFixed(2) }}</td>
                <td>{{ (product.price * product.quantity).toFixed(2) }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <!-- Trennlinie zwischen den Artikeln und dem Gesamtpreis -->
          <v-divider class="my-4"></v-divider>

          <!-- Gesamtpreis inkl. MwSt. -->
          <div class="d-flex justify-between">
            <span style="margin-right: 5px"
              ><strong>Gesamtpreis (exkl. MwSt.): </strong></span
            >
            <span>{{ totalExclVat.toFixed(2) }} €</span>
          </div>
          <div class="d-flex justify-between">
            <span style="margin-right: 5px"
              ><strong>Gesamtpreis (inkl. 19% MwSt.): </strong></span
            >
            <span>{{ totalInclVat.toFixed(2) }} €</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue" @click="closeDialog">Schließen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Reactive Variablen
const dialog = ref(false); // Zustand für das Modal
const onHover = ref(false); // Hover-Zustand
const selectedOrder = ref<any>(null); // Bestellobjekt für das Modal

// Bestellungen
const orders = ref([
  {
    id: 1,
    date: "2024-01-01",
    status: "Abgeschlossen",
    products: [
      {
        id: 101,
        name: "T-Shirt",
        description: "Ein cooles T-Shirt",
        quantity: 2,
        price: 19.99,
      },
      {
        id: 102,
        name: "Hose",
        description: "Bequeme Jeans",
        quantity: 1,
        price: 49.99,
      },
    ],
  },
  {
    id: 2,
    date: "2024-01-05",
    status: "Versendet",
    products: [
      {
        id: 103,
        name: "Laptop",
        description: "High-End Laptop",
        quantity: 1,
        price: 999.99,
      },
      {
        id: 104,
        name: "Maus",
        description: "Gaming-Maus",
        quantity: 1,
        price: 29.99,
      },
    ],
  },
  {
    id: 3,
    date: "2024-01-10",
    status: "Storniert",
    products: [
      {
        id: 105,
        name: "Smartphone",
        description: "Neustes Modell",
        quantity: 1,
        price: 799.99,
      },
    ],
  },
]);

// Berechnete Eigenschaften
const totalExclVat = computed(() => {
  return (
    selectedOrder.value?.products.reduce((sum: number, product: { price: number; quantity: number }) => {
      return sum + product.price * product.quantity;
    }, 0) || 0
  );
});


const totalInclVat = computed(() => {
  // Gesamtpreis mit 19% MwSt.
  return totalExclVat.value * 1.19;
});

// Methoden
function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("de-DE", options);
}

function openOrderDetails(order: any) {
  selectedOrder.value = order;
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}
</script>

<style scoped>
.order-card {
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  height: 350px; /* Feste Höhe */
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  background-color: #f5f5f5;
  padding: 16px;
}

.v-card-subtitle {
  color: #666;
  font-size: 14px;
}

.v-chip {
  font-weight: 600;
  padding: 8px 16px;
  margin-bottom: 8px;
}

.v-btn {
  border-radius: 6px;
  padding: 12px;
  font-weight: 500;
}

.v-btn:hover {
  background-color: #3f51b5;
}

.v-btn:active {
  background-color: #303f9f;
}

.card-actions {
  margin-top: auto; /* Fixiert den Button immer am unteren Rand */
  padding: 16px;
}

/* Stil für Roadmap und Progress Bar */
.v-divider {
  margin: 16px 0;
}

.v-simple-table th {
  font-weight: 600;
  padding: 12px 24px;
}

.v-simple-table td {
  padding: 12px 24px;
}

.v-simple-table tr {
  border-bottom: 1px solid #ddd;
}

/* Abstand zwischen den Tabellenspalten */
th {
  padding-right: 45px;
}
</style>
