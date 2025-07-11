<template>
  <v-container>
    <v-row>
      <v-col class="CustomerInformation" lg="6" md="12" sm="12">
        <v-form>
          <div>
            <h3>Kundenangaben</h3>
            <v-text-field
              name="name"
              label="Email-Adresse"
              id="id"
            ></v-text-field>
            <v-text-field
              name="Vorname"
              label="Vorname"
              id="Vorname"
            ></v-text-field>
            <v-text-field
              name="Nachname"
              label="Nachname"
              id="Nachname"
            ></v-text-field>
            <v-text-field
              name="name"
              label="Telefonnummer"
              id="id"
              type="number"
            ></v-text-field>
          </div>

          <div>
            <h3>Lieferadresse</h3>
            <v-text-field
              name="Straße"
              label="Straße"
              id="Straße"
            ></v-text-field>
            <v-text-field
              name="Hausnummer"
              label="Hausnummer"
              id="Hausnummer"
            ></v-text-field>
            <v-text-field
              name="Postleitzahl"
              label="Postleitzahl"
              id="Postleitzahl"
            ></v-text-field>
            <v-text-field name="Stadt" label="Stadt" id="Stadt"></v-text-field>
          </div>
        </v-form>
        <v-btn color="primary" style="margin-top: 10px">
          Lieferadresse Speichern</v-btn
        >
      </v-col>

      <v-col class="PurchaseOverview" lg="5" md="12" sm="12">
        <h3>Bestellübersicht</h3>
        <div v-for="item in currentUserCart.items" v-if="currentUserCart">
          <v-row>
            <v-col lg="4" md="12" sm="12">
              <v-img
                :src="item.variants[0].image"
                style="
                  width: 200px;
                  height: 150px;
                  border: solid black 1px;
                  border-radius: 5px;
                "
                contain
              ></v-img>
              <p style="color: green; font-size: small; margin-top: 5px">
                Sofort Lieferbar
              </p>
              <p style="color: red; font-size: small; margin-top: 5px">
                nur noch 4 Artikel vorhanden
              </p>
            </v-col>
            <v-col lg="8" md="12" sm="12">
              <p style="text-align: left">
                <strong>Artikel:</strong> {{ item.title }}
              </p>
              <p style="text-align: left">
                <strong>Marke:</strong> {{ item.brand }}
              </p>
              <p style="text-align: left">
                <strong>Einzelpreis:</strong> {{ item.price }}
              </p>
              <v-select
                v-model="item.quantity"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                label="Anzahl"
                dense
                outlined
              />
              <v-btn color="secondary" style="margin-bottom: 20px">
                Entfernen</v-btn
              >
              <p
                style="border-bottom: solid black 1px; margin-bottom: 20px"
              ></p>
            </v-col>
          </v-row>
        </div>
        <div v-if="currentUserCart">
          <p>
            <strong>Gesamtpreis: {{ totalPrice.toFixed(2) }} €</strong>
          </p>
          <v-btn color="primary" style="margin-top: 10px">
            Kauf abschließen</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Cart } from "@/interfaces/interfaces";
import { useCartStore } from "@/stores/CartStore";
import { ref, onMounted } from "vue";

const cartStore = useCartStore();

const currentUserCart: Ref<Cart | null> = ref(null);

onMounted(async () => {
  try {
    currentUserCart.value = await cartStore.getCartByUserId();
  } catch (error: any) {
    console.error("Error on fetching cart...", error);
  }
});

const totalPrice = computed(() => {
  if (!currentUserCart.value?.items) return 0;

  return currentUserCart.value.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
});
</script>

<style>
.PurchaseOverview {
  /* background-color: rgb(202, 197, 197); */
  padding: 25px;
}

.CustomerInformation {
  padding: 25px;
  border-right: solid black 1px;
  margin-right: 25px;
}

.v-text-field {
  padding: 5px;
}

h3 {
  text-align: left;
  margin-bottom: 5px;
}

@media (max-width: 960px) {
  .PurchaseOverview {
    padding: 20px;
  }
  .CustomerInformation {
    padding: 20px;
  }
}

@media (max-width: 1280px) {
  .PurchaseOverview {
    padding: 30px;
  }
  .CustomerInformation {
    padding: 30px;
  }
}

@media (max-width: 1920px) {
  .PurchaseOverview {
    padding: 40px;
  }
  .CustomerInformation {
    padding: 40px;
  }
}

@media (max-width: 2560) {
  .PurchaseOverview {
    padding: 50px;
  }
  .CustomerInformation {
    padding: 50px;
  }
}
</style>
