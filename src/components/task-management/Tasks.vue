<script setup lang="ts">
// import { Tasks } from '@/interfaces/interfaces'

const tasks = [
  {
    id: 1,
    category: "Cybersicherheit",
    title: "Pentest für neue Webanwendung durchführen",
    priority: "hoch",
    dueDate: "2024-11-29",
    assignee: "Alex",
  },
  {
    id: 2,
    category: "Projektmanagement",
    title: "Sprint-Retrospektive vorbereiten",
    priority: "mittel",
    dueDate: "2024-11-21",
    assignee: "Admin",
  },
  {
    id: 3,
    category: "Datenanalyse",
    title: "Kundendaten auswerten für Marketingkampagne",
    priority: "hoch",
    dueDate: "2024-11-24",
    assignee: "Test",
  },
  {
    id: 4,
    category: "Qualitätssicherung",
    title: "Testfälle für neues Feature schreiben",
    priority: "hoch",
    dueDate: "2024-11-22",
    assignee: "Alex",
  },
  {
    id: 5,
    category: "Kundenservice & Support",
    title: "Support-Anfrage: Datenwiederherstellung",
    priority: "hoch",
    dueDate: "2024-11-17",
    assignee: "Test",
  },
  {
    id: 6,
    category: "IT-Infrastruktur",
    title: "Firewall-Regeln aktualisieren",
    priority: "mittel",
    dueDate: "2024-11-22",
    assignee: "Admin",
  },
  {
    id: 7,
    category: "Softwareentwicklung",
    title: "Code-Review für Backend-API",
    priority: "hoch",
    dueDate: "2024-11-18",
    assignee: "Alex",
  },
  {
    id: 8,
    category: "Personalentwicklung",
    title: "Onboarding für neue Entwickler planen",
    priority: "mittel",
    dueDate: "2024-12-03",
    assignee: "Test",
  },
  {
    id: 9,
    category: "Cybersicherheit",
    title: "Risikoanalyse der Cloud-Dienste",
    priority: "hoch",
    dueDate: "2024-11-26",
    assignee: "Admin",
  },
  {
    id: 10,
    category: "Datenanalyse",
    title: "Anomalie-Analyse in Log-Daten",
    priority: "hoch",
    dueDate: "2024-11-27",
    assignee: "Alex",
  },
  {
    id: 11,
    category: "Projektmanagement",
    title: "Meilensteinbericht für Management erstellen",
    priority: "hoch",
    dueDate: "2024-11-23",
    assignee: "Admin",
  },
  {
    id: 12,
    category: "Kundenservice & Support",
    title: "Antwortzeiten für Support-Anfragen analysieren",
    priority: "niedrig",
    dueDate: "2024-12-01",
    assignee: "Test",
  },
  {
    id: 13,
    category: "Personalentwicklung",
    title: "Mitarbeiter-Bewertungen für Jahresende vorbereiten",
    priority: "hoch",
    dueDate: "2024-11-30",
    assignee: "Admin",
  },
  {
    id: 14,
    category: "Softwareentwicklung",
    title: "Bugfix für Login-Modul",
    priority: "mittel",
    dueDate: "2024-11-20",
    assignee: "Alex",
  },
  {
    id: 15,
    category: "IT-Infrastruktur",
    title: "Netzwerkmonitoring einrichten",
    priority: "hoch",
    dueDate: "2024-11-25",
    assignee: "Test",
  },
  {
    id: 16,
    category: "Cybersicherheit",
    title: "Mitarbeiterschulung zur Cybersicherheit",
    priority: "niedrig",
    dueDate: "2024-12-05",
    assignee: "Alex",
  },
  {
    id: 17,
    category: "Projektmanagement",
    title: "Projektplan für neues IT-Projekt erstellen",
    priority: "hoch",
    dueDate: "2024-11-20",
    assignee: "Admin",
  },
  {
    id: 18,
    category: "Qualitätssicherung",
    title: "Automatisierte Tests für API-Endpunkte durchführen",
    priority: "mittel",
    dueDate: "2024-11-24",
    assignee: "Test",
  },
  {
    id: 19,
    category: "Datenanalyse",
    title: "Dashboard für Sales-Abteilung entwickeln",
    priority: "mittel",
    dueDate: "2024-11-28",
    assignee: "Alex",
  },
  {
    id: 20,
    category: "IT-Infrastruktur",
    title: "Backup-Strategie prüfen und anpassen",
    priority: "hoch",
    dueDate: "2024-11-30",
    assignee: "Admin",
  },
  {
    id: 21,
    category: "Kundenservice & Support",
    title: "Wartungsankündigung für Kunden verfassen",
    priority: "mittel",
    dueDate: "2024-11-19",
    assignee: "Test",
  },
  {
    id: 22,
    category: "Personalentwicklung",
    title: "Fortbildung zu Cloud-Technologien organisieren",
    priority: "mittel",
    dueDate: "2024-12-10",
    assignee: "Alex",
  },
  {
    id: 23,
    category: "Softwareentwicklung",
    title: "Feature für Kundenportal entwickeln",
    priority: "hoch",
    dueDate: "2024-11-30",
    assignee: "Admin",
  },
  {
    id: 24,
    category: "IT-Infrastruktur",
    title: "Backup-Strategie evaluieren und verbessern",
    priority: "hoch",
    dueDate: "2024-11-30",
    assignee: "Test",
  },
  {
    id: 25,
    category: "Cybersicherheit",
    title: "Penetrationstest für neu entwickelte Webanwendungen durchführen",
    priority: "hoch",
    dueDate: "2024-11-29",
    assignee: "Alex",
  },
  {
    id: 26,
    category: "Projektmanagement",
    title: "Vorbereitung der Sprint-Retrospektive für das Team",
    priority: "mittel",
    dueDate: "2024-11-21",
    assignee: "Admin",
  },
  {
    id: 27,
    category: "Datenanalyse",
    title: "Kundendaten für die nächste Marketingkampagne auswerten",
    priority: "hoch",
    dueDate: "2024-11-24",
    assignee: "Test",
  },
  {
    id: 28,
    category: "Kundenservice & Support",
    title: "Bearbeitung der Support-Anfrage zur Datenwiederherstellung",
    priority: "hoch",
    dueDate: "2024-11-17",
    assignee: "Alex",
  },
  {
    id: 29,
    category: "Qualitätssicherung",
    title: "Erstellung von Testfällen für das neue Feature",
    priority: "hoch",
    dueDate: "2024-11-22",
    assignee: "Admin",
  },
  {
    id: 30,
    category: "Softwareentwicklung",
    title: "Feature für Kundenportal entwickeln",
    priority: "hoch",
    dueDate: "2024-11-30",
    assignee: "Test",
  },
  {
    id: 31,
    category: "Personalentwicklung",
    title: "Mitarbeiter-Bewertungen für Jahresende vorbereiten",
    priority: "hoch",
    dueDate: "2024-11-30",
    assignee: "Alex",
  },
  {
    id: 32,
    category: "Kundenservice & Support",
    title: "Lösung für Support-Anfrage: Datenwiederherstellung erarbeiten",
    priority: "hoch",
    dueDate: "2024-11-17",
    assignee: "Test",
  },
  {
    id: 33,
    category: "Projektmanagement",
    title: "Sprint-Retrospektive für das Entwicklerteam organisieren",
    priority: "mittel",
    dueDate: "2024-11-21",
    assignee: "Admin",
  },
  {
    id: 34,
    category: "Cybersicherheit",
    title:
      "Sicherheitslücken in Webanwendungen durch Penetrationstest identifizieren",
    priority: "hoch",
    dueDate: "2024-11-29",
    assignee: "Alex",
  },
  {
    id: 35,
    category: "Datenanalyse",
    title: "Analyse der Kundendaten zur Unterstützung von Marketingstrategien",
    priority: "hoch",
    dueDate: "2024-11-24",
    assignee: "Test",
  },
  {
    id: 36,
    category: "Personalentwicklung",
    title: "Fortbildung zu Cloud-Technologien organisieren",
    priority: "mittel",
    dueDate: "2024-12-10",
    assignee: "Admin",
  },
  {
    id: 37,
    category: "Kundenservice & Support",
    title: "Anfrage zur Datenwiederherstellung im Support bearbeiten",
    priority: "hoch",
    dueDate: "2024-11-17",
    assignee: "Alex",
  },
  {
    id: 38,
    category: "IT-Infrastruktur",
    title: "Netzwerkmonitoring einrichten",
    priority: "hoch",
    dueDate: "2024-11-25",
    assignee: "Test",
  },
  {
    id: 39,
    category: "Projektmanagement",
    title: "Planung und Vorbereitung der Sprint-Retrospektive",
    priority: "mittel",
    dueDate: "2024-11-21",
    assignee: "Admin",
  },
  {
    id: 40,
    category: "Qualitätssicherung",
    title: "Testfälle für neue Funktionen im System schreiben",
    priority: "hoch",
    dueDate: "2024-11-22",
    assignee: "Alex",
  },
];

function getTasksByCategory(category: string) {
  return tasks.filter((task) => task.category === category);
}

function arrayToCsv() {
  const array: string[][] = [Object.keys(tasks[0])];

  tasks.forEach((task) => {
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
  console.log("Logs have been saved");
}

function shareTasks() {
  const taskContent = tasks
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
</template>

<style scoped>
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
