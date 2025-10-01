<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="openDialog('add')">Add User</v-btn>
      </v-card-title>

      <custom-data-table :headers="headers" :items="allUsers" item-key="_id">
      </custom-data-table>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import type { UserData } from "@/interfaces/interfaces";
import { DataTableHeader } from "vuetify";

const userStore = useUserStore();
const { allUsers } = storeToRefs(userStore);

const headers = ref<DataTableHeader<UserData>[]>([
  { title: "ID", align: "start", key: "_id", sortable: true },
  { title: "Username", align: "start", key: "userName", sortable: true },
  { title: "First", align: "start", key: "firstName", sortable: true },
  { title: "Last", align: "start", key: "lastName", sortable: true },
  { title: "Role", align: "start", key: "role", sortable: true },
  { title: "Confirmed", align: "start", key: "confirmed", sortable: true },
  { title: "Logged in", align: "start", key: "loggedin", sortable: true },
]);

function openDialog(mode: string) {}

// Lifecycle: alle User laden
onMounted(async () => {
  await userStore.getAllUsers();
});
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}
</style>
