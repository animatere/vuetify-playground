<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const { currentTasks: tasks } = storeToRefs(taskStore);

onMounted(async () => {
  await taskStore.getTasks();
});

function getTasksByCategory(category: string) {
  return tasks.value.filter((task) => task.category === category);
}

function arrayToCsv() {
  if (tasks.value.length === 0) {
    console.warn("Keine Aufgaben verfügbar für den CSV-Export.");
    return [];
  }

  const array: string[][] = [Object.keys(tasks.value[0])];

  tasks.value.forEach((task) => {
    array.push(Object.values(task).map(String));
  });

  return array;
}

function downloadBlob(content: any[], filename: string, contentType: string) {
  const encoder = new TextEncoder();
  const csvString = content.map((row) => row.join(",")).join("\n");
  const encodedContent = encoder.encode(csvString);
  const blob = new Blob([encodedContent], {
    type: contentType + ";charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  var pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", filename);
  pom.click();
}

function saveLogs() {
  const myLogs = arrayToCsv();
  downloadBlob(myLogs, "./task_table.csv", "text/csv");
}

function shareTasks() {
  const taskContent = tasks.value
    .map(
      (task) =>
        `Title: ${task.title}, Category: ${task.category}, Due Date: ${task.dueDate}`,
    )
    .join("\n");

  if (navigator.share) {
    navigator
      .share({
        title: "Task Management",
        text: taskContent,
        url: window.location.href,
      })
      .then(() => console.log("Successfully shared"))
      .catch((error) => console.log("Error sharing: ", error));
  } else {
    console.log("Teilen fehlgeschlagen");
  }
}
</script>

<template>
  <div class="tasks-view">
    <v-container>
      <v-row class="welcome">
        <v-col class="tasks-management" sm="12" lg="6">
          <h1>Tasks Management</h1>
        </v-col>
        <v-col class="user-action" sm="12" lg="6">
          <v-btn color="success" class="user-action-btn" @click="shareTasks">
            <v-icon class="user-action-icons" icon="mdi-share"> </v-icon>
            <p class="user-action-text">Share</p>
          </v-btn>
          <v-btn
            color="success"
            class="user-action-btn user-action-btn-gap"
            @click="saveLogs()"
          >
            <v-icon class="user-action-icons" icon="mdi-file"></v-icon>
            <p class="user-action-text">Export</p>
          </v-btn>
        </v-col>
      </v-row>
      <div class="taskCategories">
        <!-- Datenanalyse -->
        <v-row>
          <h1>Datenanalyse</h1>
        </v-row>
        <v-row>
          <TaskCard
            v-for="task in getTasksByCategory('Datenanalyse')"
            :key="task.id"
            :task="task"
          />
        </v-row>

        <!-- Cybersicherheit -->
        <v-row>
          <h1>Cybersicherheit</h1>
        </v-row>
        <v-row>
          <TaskCard
            v-for="task in getTasksByCategory('Cybersicherheit')"
            :key="task.id"
            :task="task"
          />
        </v-row>

        <!-- Projektmanagement -->
        <v-row>
          <h1>Projektmanagement</h1>
        </v-row>
        <v-row>
          <TaskCard
            v-for="task in getTasksByCategory('Projektmanagement')"
            :key="task.id"
            :task="task"
          />
        </v-row>

        <!-- Qualitätssicherung -->
        <v-row>
          <h1>Qualitätssicherung</h1>
        </v-row>
        <v-row>
          <TaskCard
            v-for="task in getTasksByCategory('Qualitätssicherung')"
            :key="task.id"
            :task="task"
          />
        </v-row>

        <!-- Kundenservice & Support -->
        <v-row>
          <h1>Kundenservice & Support</h1>
        </v-row>
        <v-row>
          <TaskCard
            v-for="task in getTasksByCategory('Kundenservice & Support')"
            :key="task.id"
            :task="task"
          />
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.tasks-view {
  height: 100%;
  margin-bottom: 100px;
}

.welcome {
  background-color: #adb5bd;
  margin-bottom: 15px;
}
.welcome h1 {
  text-align: left;
}

.user-action-btn {
  border-radius: 0%;
  width: 150px;
  height: 50px;
  background-color: #4998e6;
  margin-right: 15px;
}

.plus-button {
  border-radius: 5%;
}

.user-action {
  text-align: right;
}

.taskCategories h1 {
  margin: 15px;
  padding: 15px;
  background-color: #4cacaf;
  width: 100%;
  text-align: left;
}

@media (max-width: 635px) {
  .user-action-text {
    display: none;
  }
  .user-action-btn-gap {
    margin-top: 15px;
  }
}
@media (max-width: 424px) {
  .user-action-btn {
    margin-top: 15px;
  }
}
</style>
