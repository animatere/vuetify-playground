<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="openDialog('add')">Add Product</v-btn>
      </v-card-title>

      <custom-data-table :headers="headers" :items="items" item-key="_id">
      </custom-data-table>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useItemStore } from "@/stores/ItemStore";
import { storeToRefs } from "pinia";
import type { Item } from "@/interfaces/interfaces";
import { DataTableHeader } from "vuetify";

const itemStore = useItemStore();
const { items } = storeToRefs(itemStore);

const headers = ref<DataTableHeader<Item>[]>([
  { title: "ID", align: "start", key: "_id", sortable: false },
  { title: "Title", align: "start", key: "title", sortable: true },
  { title: "Price", align: "start", key: "price", sortable: true },
  { title: "Brand", align: "start", key: "brand", sortable: true },
  { title: "Category", align: "start", key: "category", sortable: true },
]);

function openDialog(mode: string) {}

// Lifecycle: alle item laden
onMounted(async () => {
  await itemStore.loadItems();
});
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}
</style>
