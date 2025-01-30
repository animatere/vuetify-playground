<template>
  <v-app>
    <v-row style="margin-top:25px;">
      <v-col cols="2" class="admin-sidebar">
        <v-list class="admin-sidebar-itemlist">
          <v-list-item @click="changeMenuItem('Home')">
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="changeMenuItem('User Management')">
            <v-list-item-content>
              <v-list-item-title>User Management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="changeMenuItem('Product Management')">
            <v-list-item-content>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="changeMenuItem('Admin Settings')">
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="9">
        <AdminHome v-if="currentMenuItem === 'Home'"></AdminHome>
        <UserManagement
          v-if="currentMenuItem === 'User Management'"
        ></UserManagement>
        <ProductManagement
          v-if="currentMenuItem === 'Product Management'"
        ></ProductManagement>
        <AdminSettings
          v-if="currentMenuItem === 'Admin Settings'"
        ></AdminSettings>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const currentMenuItem = ref<string>("");

onMounted(async () => {
  currentMenuItem.value = "Home";
});

function changeMenuItem(title: string) {
  currentMenuItem.value = title;
  console.log(currentMenuItem.value);
}
</script>

<style scoped>
.admin-sidebar {
  background-color: #aeaeae;
  max-height: 95vh;
  width: 100px;
  margin-left: 20px;
}

.admin-sidebar-itemlist {
  background-color: #aeaeae;
}
</style>
