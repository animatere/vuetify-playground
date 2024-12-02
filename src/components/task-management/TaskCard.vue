<template>
  <v-col class="mb-2" sm="12" md="6" lg="4">
    <v-card class="paintBlack">
      <v-tooltip bottom>
        <template v-slot:activator="{ props }">
          <v-card-title v-bind="props">{{ task.title }}</v-card-title>
        </template>
        <template v-slot:default>
          <span>{{ task.title }}</span>
        </template>
      </v-tooltip>

      <v-card-subtitle>{{ task.category }}</v-card-subtitle>
      <v-card-text>
        Priorität: {{ task.priority }}<br />
        Fälligkeitsdatum: {{ task.dueDate }}<br />
        Zugeordnet: {{ task.assignee }}<br />
      </v-card-text>
      <v-btn class="user-action-btn" style="margin: 15px" @click="openDialog">
        <v-icon class="user-action-icons" icon="mdi-magnify"></v-icon>
        <p class="user-action-text">Öffnen</p>
      </v-btn>

      <!-- Dialog-Komponente -->
      <TaskDialog
        :isOpen="dialog"
        :task="task"
        @update:isOpen="dialog = $event"
      />
    </v-card>
  </v-col>
</template>

<script lang="ts">
import TaskDialog from "./TaskDialog.vue";

export default {
  name: "TaskCard",
  components: {
    TaskDialog,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false, // Zustand für den Dialog
    };
  },
  methods: {
    openDialog() {
      this.dialog = true; // Dialog öffnen
    },
  },
};
</script>

<style></style>
