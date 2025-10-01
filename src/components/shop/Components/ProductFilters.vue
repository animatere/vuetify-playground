<template>
  <v-card class="pa-3">
    <v-list>
      <v-list-item v-for="category in categories" :key="category">
        <v-checkbox
          v-model="selectedCategories"
          :value="category"
          :label="category"
          @change="emitFilters"
        />
      </v-list-item>
    </v-list>

    <v-divider class="my-2"></v-divider>

    <v-card-title class="text-h6">Price Range</v-card-title>
    <v-range-slider
      v-model="priceRange"
      :max="calculatedMaxPrice"
      :min="0"
      :step="10"
      class="mt-3"
      @update:modelValue="emitFilters"
    />

    <div class="d-flex justify-space-between">
      <span>{{ priceRange[0] }} €</span>
      <span>{{ calculatedMaxPrice }} €</span>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useItemStore } from "@/stores/ItemStore";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  (
    e: "filtersChanged",
    value: {
      categories: string[];
      priceRange: number[];
    },
  ): void;
}>();

const selectedCategories = ref<string[]>([]);
const priceRange = ref([0, 500]);

const itemStore = useItemStore();
const { items } = storeToRefs(itemStore);

const categories = [
  "Gaming Mice",
  "Keyboards",
  "Headsets",
  "Monitors",
  "Chairs",
];

const calculatedMaxPrice = computed(() => {
  const itemArray = Array.isArray(items.value) ? items.value : [];
  if (!itemArray.length) return 500;
  return Math.max(...itemArray.map((p) => p.price));
});

function emitFilters() {
  emit("filtersChanged", {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
  });
}
</script>
