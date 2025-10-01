<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :item-key="itemKey"
    class="elevation-1"
  >
    <template v-for="header in headers" #[`item.${header.key}`]="{ item }">
      <slot :name="`item.${header.key}`" :item="item">
        {{ getItemValue(item, header.key as string) }}
      </slot>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { DataTableHeader } from "vuetify";

interface GenericProps<T> {
  headers: DataTableHeader<T>[];
  items: T[];
  itemKey: keyof T;
}

const { headers, items, itemKey } = defineProps<GenericProps<any>>();

function getItemValue(item: any, key?: string) {
  if (!key) return "";
  return (item as Record<string, any>)[key];
}
</script>
