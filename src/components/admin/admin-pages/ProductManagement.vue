<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="openDialog('add')">Add Item</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        class="elevation-1"
        single-line
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small color="blue" @click="openDialog('edit', item)"
            >Edit</v-btn
          >
          <v-btn small color="red" @click="deleteItem(item.id)">Delete</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-col>

  <!-- Dialog for adding/editing items -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>{{
        dialogMode === "add" ? "Add Item" : "Edit Item"
      }}</v-card-title>

      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            class="text-center justify-center"
            v-model="form.name"
            label="Name"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            class="text-center justify-center"
            v-model="form.price"
            label="Price"
            :rules="[rules.required, rules.number]"
            required
          ></v-text-field>
          <v-textarea
            class="text-center justify-center"
            v-model="form.description"
            label="Description"
            :rules="[rules.required]"
            required
          ></v-textarea>
          <v-text-field
            class="text-center justify-center"
            v-model="form.category"
            label="Category"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            class="text-center justify-center"
            v-model="form.quantity"
            label="Quantity"
            :rules="[rules.required, rules.number]"
            required
          ></v-text-field>
          <v-text-field
            class="text-center justify-center"
            v-model="form.supplier"
            label="Supplier Name"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            class="text-center justify-center"
            v-model="form.brand"
            label="Brand Name"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveItem" :disabled="!formValid">{{
          dialogMode === "add" ? "Add" : "Save"
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref(false);
const dialogMode = ref<"add" | "edit">("add");
const form = ref({
  id: 0,
  name: "",
  price: "",
  description: "",
  category: "",
  quantity: "",
  supplier: "",
  brand: "",
});
const formValid = ref(false);

const rules = {
  required: (value: string) => !!value || "Required.",
  number: (value: string) => !isNaN(parseFloat(value)) || "Must be a number.",
};

const items = ref([
  {
    id: 1,
    name: "Item A",
    price: "19.99",
    description: "Sample description A",
    category: "Electronics",
    quantity: "10",
    supplier: "Supplier A",
    brand: "Brand X",
  },
  {
    id: 2,
    name: "Item B",
    price: "29.99",
    description: "Sample description B",
    category: "Home Appliances",
    quantity: "5",
    supplier: "Supplier B",
    brand: "Brand Y",
  },
]);

const headers = [
  { title: "Name", value: "name", sortable: true },
  { title: "Description", value: "description" },
  { title: "Category", value: "category" },
  { title: "Price", value: "price", sortable: true },
  { title: "Quantity", value: "quantity", sortable: true },
  { title: "Supplier Name", value: "supplier" },
  { title: "Brand Name", value: "brand" },
  { title: "Actions", value: "actions" },
];

function openDialog(mode: "add" | "edit", item: any = null) {
  dialogMode.value = mode;
  if (mode === "edit" && item) {
    form.value = { ...item };
  } else {
    form.value = {
      id: 0,
      name: "",
      price: "",
      description: "",
      category: "",
      quantity: "",
      supplier: "",
      brand: "",
    };
  }
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

function saveItem() {
  if (dialogMode.value === "add") {
    const newItem = { ...form.value, id: Date.now() };
    items.value.push(newItem);
  } else {
    const index = items.value.findIndex((item) => item.id === form.value.id);
    if (index !== -1) {
      items.value.splice(index, 1, form.value);
    }
  }
  closeDialog();
}

function deleteItem(id: number) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value.splice(index, 1);
  }
}
</script>

<style scoped>
span {
  text-align: left !important;
}
</style>
