<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="openDialog('add')">Add Item</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="inventoryItems"
        item-key="_id"
        class="elevation-1"
      >

        <template v-slot:item.image="{ item }">
          <v-img
                :src="item.item.variants[0].image"
                contain
                max-height="300px"
          ></v-img>
        </template>

        <template v-slot:item.title="{ item }">
          {{ item.item.title }}
        </template>

        <template v-slot:item.description="{ item }">
          {{ item.item.description }}
        </template>

        <template v-slot:item.storageName="{ item }">
          {{ item.storageName }}
        </template>

        <template v-slot:item.quantity="{ item }">
          {{ item.quantity }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn small color="blue" @click="openDialog('edit', item)"
            >Edit</v-btn
          >
          <!-- <v-btn small color="red" @click="deleteItem(item.id)">Delete</v-btn> -->
        </template>
      </v-data-table>
    </v-card>
  </v-col>

<v-dialog v-model="dialog" max-width="500px">
  <v-card>
    <v-card-title>
      {{ dialogMode === "add" ? "Add Item" : "Edit Item" }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="formValid" v-if="form">
        <v-text-field
          v-model="form.item.title"
          label="Title"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.item.price"
          label="Price"
          :rules="[rules.required, rules.number]"
          required
        ></v-text-field>

        <v-textarea
          v-model="form.item.description"
          label="Description"
          :rules="[rules.required]"
          required
        ></v-textarea>

        <v-textarea
          v-model="form.item.variants[0].image"
          label="Image Link"
        ></v-textarea>

        <v-text-field
          v-model="form.item.category"
          label="Category"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.quantity"
          label="Quantity"
          :rules="[rules.required, rules.number]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.minQuantity"
          label="Min Quantity"
          :rules="[rules.required, rules.number]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.maxQuantity"
          label="Max Quantity"
          :rules="[rules.required, rules.number]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.storageName"
          label="Storage Name"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.item.brand"
          label="Brand Name"
          :rules="[rules.required]"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="closeDialog">Cancel</v-btn>
      <v-btn
        color="primary"
        @click="saveItem"
        :disabled="!formValid"
      >
        {{ dialogMode === "add" ? "Add" : "Save" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>

<script setup lang="ts">
import { Inventory } from "@/interfaces/interfaces";
import { useInventoryStore } from "@/stores/InventoryStore";
import { ref, onMounted } from "vue";

const inventoryStore = useInventoryStore();

const inventoryItems : Ref<Inventory[] | []> = ref([]);


onMounted(async () => {
  try {
    inventoryItems.value = await inventoryStore.getInventoryItems();
  } catch (error: any) {
    console.error("Error on getInventoryItems() ", error);
  }
});

const headers = [
  { title: "Image", value: "image" },
  { title: "Title", value: "title"},
  { title: "Storage", value: "storageName" },
  { title: "Quantity", value: "quantity" },
  { title: "Min Quantity", value: "minQuantity" },
  { title: "Max Quantity", value: "maxQuantity" },
  { title: "Actions", value: "actions" },
];


const dialog = ref(false);
const dialogMode = ref<"add" | "edit">("add");

const form = ref<Inventory | null>();

const formValid = ref(false);

const rules = {
  required: (value: string) => !!value || "Required.",
  number: (value: string | number) =>
    !isNaN(Number(value)) || "Must be a number.",
};

function openDialog(mode: "add" | "edit", item: Inventory | null = null) {

  console.log("open dialog with mode: ", mode)
  dialogMode.value = mode;

  if (mode === "edit" && item) {

    form.value = JSON.parse(JSON.stringify(item)); // deep clone
    console.log("deep clone... ", form.value)
  } else {
    form.value = {
      storageName: "",
      quantity: 0,
      minQuantity: 0,
      maxQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      item: {
        title: "",
        description: "",
        category: "",
        price: 0,
        brand: "",
        selectedVariant: 1,
        hashTags: [],
        variants: [{
          id: 0,
          color: "",
          image: "",
          quantity: 0,
          itemProperties: []
        }],
      },
    };
  }

  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

async function saveItem() {
  try {

    if(form.value != null){

      if (dialogMode.value === "add") {
        console.log("IF")

        await inventoryStore.createInventory(form.value);
      } else {
        console.log("ELSE")
        console.log("formdata: ", form.value)
        console.log("form id: ", form.value._id)
        await inventoryStore.updateInventory(form.value._id, form.value);
      }
    }

    inventoryItems.value = await inventoryStore.getInventoryItems();
    closeDialog();
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
  }
}

</script>

<style scoped>
span {
  text-align: left !important;
}
</style>
