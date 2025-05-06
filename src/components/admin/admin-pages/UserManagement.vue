<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="openDialog('add')">Add User</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small color="blue" @click="openDialog('edit', item)"
            >Edit</v-btn
          >
          <v-btn small color="red" @click="deleteUser(item.id)">Delete</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-col>

  <!-- Dialog for adding/editing user -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>{{
        dialogMode === "add" ? "Add User" : "Edit User"
      }}</v-card-title>

      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            v-model="form.name"
            label="Name"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.role"
            label="Role"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveUser" :disabled="!formValid">{{
          dialogMode === "add" ? "Add" : "Save"
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Dialog- und Form-Daten
const dialog = ref(false);
const dialogMode = ref<"add" | "edit">("add");
const form = ref<{ id?: number; name: string; email: string; role: string }>({
  id: undefined,
  name: "",
  email: "",
  role: "",
});
const formValid = ref(false);

// Validierungsregeln
const rules = {
  required: (value: string) => !!value || "Required.",
  email: (value: string) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
};

// Benutzerliste und Tabellenüberschriften
const users = ref([
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Frank White", email: "frank33@example.com", role: "Admin" },
  { id: 4, name: "Grace Lee", email: "grace100@example.com", role: "User" },
  { id: 5, name: "David Wilson", email: "david66@example.com", role: "Admin" },
  { id: 6, name: "Frank White", email: "frank84@example.com", role: "Admin" },
  { id: 7, name: "Grace Lee", email: "grace76@example.com", role: "User" },
  {
    id: 8,
    name: "Charlie Davis",
    email: "charlie16@example.com",
    role: "Super-User",
  },
  { id: 9, name: "John Doe", email: "john42@example.com", role: "Super-User" },
  { id: 10, name: "Bob Brown", email: "bob8@example.com", role: "Super-User" },
  { id: 11, name: "Bob Brown", email: "bob45@example.com", role: "User" },
  {
    id: 12,
    name: "Charlie Davis",
    email: "charlie87@example.com",
    role: "User",
  },
  { id: 13, name: "Grace Lee", email: "grace36@example.com", role: "User" },
  { id: 14, name: "John Doe", email: "john3@example.com", role: "Admin" },
  {
    id: 15,
    name: "Hannah Clark",
    email: "hannah21@example.com",
    role: "Admin",
  },
  { id: 16, name: "Alice Johnson", email: "alice91@example.com", role: "User" },
  {
    id: 17,
    name: "Alice Johnson",
    email: "alice49@example.com",
    role: "Admin",
  },
  {
    id: 18,
    name: "David Wilson",
    email: "david21@example.com",
    role: "Super-User",
  },
  {
    id: 19,
    name: "Frank White",
    email: "frank100@example.com",
    role: "Super-User",
  },
  { id: 20, name: "David Wilson", email: "david19@example.com", role: "User" },
  { id: 21, name: "David Wilson", email: "david19@example.com", role: "User" },
  { id: 22, name: "Bob Brown", email: "bob7@example.com", role: "User" },
  {
    id: 23,
    name: "Jane Smith",
    email: "jane88@example.com",
    role: "Super-User",
  },
  { id: 24, name: "Frank White", email: "frank30@example.com", role: "Admin" },
  { id: 25, name: "Frank White", email: "frank22@example.com", role: "User" },
  { id: 26, name: "Grace Lee", email: "grace6@example.com", role: "User" },
  { id: 27, name: "Grace Lee", email: "grace17@example.com", role: "User" },
  {
    id: 28,
    name: "Hannah Clark",
    email: "hannah39@example.com",
    role: "Super-User",
  },
  {
    id: 29,
    name: "Jane Smith",
    email: "jane86@example.com",
    role: "Super-User",
  },
  {
    id: 30,
    name: "Frank White",
    email: "frank3@example.com",
    role: "Super-User",
  },
]);

const headers = ref<{ title: string; align?: "start" | "center" | "end"; key: string; sortable: boolean }[]>([
  { title: "Name", align: "start", key: "name", sortable: true },
  { title: "Email", align: "start", key: "email", sortable: true },
  { title: "Role", align: "start", key: "role", sortable: true },
  { title: "Actions", key: "actions", sortable: false },
]);

// Methoden
function openDialog(mode: "add" | "edit", user: { id: number; name: string; email: string; role: string; } | null = null) {
  dialogMode.value = mode;
  form.value = user ? { ...user } : { id: undefined, name: "", email: "", role: "" };
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

function saveUser() {
  if (dialogMode.value === "add") {
    const newUser = { ...form.value, id: Date.now() };
    users.value.push(newUser);
  } else {
    const index = users.value.findIndex((user) => user.id === form.value.id);
    if (index !== -1 && form.value.id !== undefined) {
      users.value.splice(index, 1, { ...form.value, id: form.value.id });
    }
  }
  closeDialog();
}

function deleteUser(id: number) {
  const index = users.value.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
}
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}

</style>
