<script setup lang="ts">
import { ref, watchEffect } from "vue";

const items = [
  {
    id: 1,
    username: "Alice Smith",
    status: "1",
    work_area: "Development",
    roles: "Developer",
  },
  {
    id: 2,
    username: "Bob Johnson",
    status: "2",
    work_area: "Marketing",
    roles: "Manager",
  },
  {
    id: 3,
    username: "Carol Williams",
    status: "1",
    work_area: "Finance",
    roles: "Accountant",
  },
  {
    id: 4,
    username: "Dave Brown",
    status: "3",
    work_area: "Customer Support",
    roles: "Support Agent",
  },
  {
    id: 5,
    username: "Emma Davis",
    status: "1",
    work_area: "IT",
    roles: "Administrator",
  },
  {
    id: 6,
    username: "Frank Wilson",
    status: "2",
    work_area: "Sales",
    roles: "Sales Manager",
  },
  {
    id: 7,
    username: "Grace Martinez",
    status: "1",
    work_area: "Research",
    roles: "Researcher",
  },
  {
    id: 8,
    username: "Henry Taylor",
    status: "3",
    work_area: "Logistics",
    roles: "Coordinator",
  },
  {
    id: 9,
    username: "Isabella Anderson",
    status: "1",
    work_area: "Human Resources",
    roles: "HR Specialist",
  },
  {
    id: 10,
    username: "James Thomas",
    status: "2",
    work_area: "Legal",
    roles: "Legal Advisor",
  },
  {
    id: 11,
    username: "Julia Evans",
    status: "1",
    work_area: "Quality Assurance",
    roles: "QA Engineer",
  },
  {
    id: 12,
    username: "Kyle Scott",
    status: "2",
    work_area: "Operations",
    roles: "Operations Manager",
  },
  {
    id: 13,
    username: "Lily Green",
    status: "1",
    work_area: "Product Management",
    roles: "Product Owner",
  },
  {
    id: 14,
    username: "Mason Clark",
    status: "3",
    work_area: "Supply Chain",
    roles: "Supply Chain Analyst",
  },
  {
    id: 15,
    username: "Nina Baker",
    status: "1",
    work_area: "Data Science",
    roles: "Data Scientist",
  },
  {
    id: 16,
    username: "Oscar Perez",
    status: "2",
    work_area: "Legal",
    roles: "Paralegal",
  },
  {
    id: 17,
    username: "Paula Reed",
    status: "1",
    work_area: "Marketing",
    roles: "Content Strategist",
  },
  {
    id: 18,
    username: "Quinn Murphy",
    status: "1",
    work_area: "Business Development",
    roles: "Business Analyst",
  },
  {
    id: 19,
    username: "Rachel Lopez",
    status: "3",
    work_area: "Finance",
    roles: "Financial Analyst",
  },
  {
    id: 20,
    username: "Sam Walker",
    status: "1",
    work_area: "Research & Development",
    roles: "R&D Specialist",
  },
];

const headers = [
  {
    title: "Id",
    value: "id",
    key: "id",
  },
  {
    title: "Username",
    value: "username",
    key: "username",
  },
  {
    title: "Status",
    value: "status",
    key: "status",
  },
  {
    title: "Work Area",
    value: "work_area",
    key: "work_area",
  },
  {
    title: "Roles",
    value: "roles",
    key: "roles",
  },
];

const search = ref("");

const snackbar = ref(false);
const currentItem = ref("");
const currentWorkArea = ref("");
const selected = ref([]);

watchEffect(() => {
  selected.value.forEach((item) => {
  });
});
</script>

<template>
  <v-container>
    <div class="table-content">
      <v-card class="search-field">
        <template v-slot:text>
          <v-text-field
            theme="light"
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>

        <v-data-table
          theme="light"
          v-model="selected"
          :headers="headers"
          :items="items"
          item-value="id"
          items-per-page="10"
          return-object
          show-select
          :search="search"
        >
        </v-data-table>
      </v-card>
      <!--    <label>Current Item</label>-->
      <!--    <p>{{ currentItem }}</p><br>-->
      <!--    <label>Selected List</label>-->
      <!--    <p>{{ selected }}</p>-->

      <div class="text-center ma-2">
        <v-snackbar v-model="snackbar">
          You have selected
          {{ currentItem }}
          from
          {{ currentWorkArea }}

          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.search-field {
  background-color: white;
  color: black;
}

.table-content .v-card {
  background-color: #f6fff8;
}

.v-data-table {
  background-color: #f6fff8;
}
</style>
