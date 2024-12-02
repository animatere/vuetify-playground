<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="closeDialog"
    max-width="600"
  >
    <v-card class="task-dialog-content">
      <v-card-title>
        <span>{{ task.title }}</span>
      </v-card-title>
      <v-card-subtitle>{{ task.category }}</v-card-subtitle>
      <v-card-text>
        <p><strong>Priorität:</strong> {{ task.priority }}</p>
        <p><strong>Fälligkeitsdatum:</strong> {{ task.dueDate }}</p>
        <p><strong>Zugeordnet:</strong> {{ task.assignee }}</p>
        <!--        <p>Details über die Aufgabe...</p>-->

        <div class="comments-section">
          <h3>Kommentare</h3>
          <v-list>
            <v-list-item
              class="comments-item"
              v-for="(comment, index) in comments"
              :key="index"
            >
              <p>{{ currentDateFormatted() + ": " }} {{ comment }}</p>
            </v-list-item>
          </v-list>

          <v-textarea
            label="Kommentar hinzufügen"
            v-model="newComment"
            outlined
            rows="3"
            class="mt-3"
          ></v-textarea>
          <v-btn class="mt-2" color="primary" @click="addComment"
            >Hinzufügen</v-btn
          >
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeDialog">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: "TaskDialog",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:isOpen"],
  data() {
    return {
      comments: [] as string[],
      newComment: "" as string,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:isOpen", false); // Dialog schließen
    },
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment); // Kommentar hinzufügen
        this.newComment = ""; // Eingabefeld leeren
      }
    },
    currentDateFormatted() {
      return new Date().toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: false,
      });
    },
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 20px;
  background-color: #adb5bd;
}
.comments-item {
  background-color: #adb5bd;
}
.task-dialog-content {
  background-color: #adb5bd;
}
.v-list-item {
  background-color: #adb5bd;
}

.v-list {
  background-color: #adb5bd;
}
</style>
