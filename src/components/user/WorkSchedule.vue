<template>
  <v-container style="margin-top: 50px;">
    <div>
      <!-- Wochen-Navigation -->
      <v-row justify="center">
        <v-btn @click="previousWeek" color="primary" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="week-display">{{ weekDisplay }}</span>
        <v-btn @click="nextWeek" color="primary" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>

      <!-- Kopfzeile mit Wochentagen -->
      <v-row>
        <v-col cols="4" class="text-center">
          <strong>Schicht</strong>
        </v-col>
        <v-col
          v-for="(day, index) in daysOfWeek"
          :key="index"
          cols="1"
          class="text-center"
        >
          <strong>{{ day }}</strong>
        </v-col>
      </v-row>

      <v-row>
        <!-- Schicht-Auswahl -->
        <v-row v-for="(shift, index) in shiftTypes" :key="index">
          <v-col cols="5" class="text-center">
            <v-btn color="primary" block>{{ shift }}</v-btn>
          </v-col>
          <v-col
            v-for="(day, dayIndex) in daysOfWeek"
            :key="dayIndex"
            cols="1"
            class="text-center"
          >
            <v-autocomplete
              :items="employeeNames"
              v-model="currentSchedule[shift][dayIndex]"
              label="Mitarbeiter"
              dense
              outlined
              hide-details
              multiple
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>

        <!-- Buttons: Speichern und CSV Export mittig -->
        <v-row justify="center" class="full-width">
          <v-btn
            justify="center"
            color="success"
            @click="saveSchedule"
            class="mr-4"
          >
            Plan speichern
          </v-btn>
          <v-btn @click="exportToCSV" color="primary" icon>
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-row>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

const today = new Date();
const currentDate = ref(new Date(today));

const daysOfWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const shiftTypes = ["Früh", "Spät", "Nacht"];
const employeeNames = ["Müller", "Wolf", "Aykut", "Schmidt", "Meier"];

// Reactive Schedule Data (Woche mit Schichtplan)
const scheduleData = reactive<Record<string, Record<string, string[]>>>({});

const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay() || 7;
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - day + 1);
  return startOfWeek;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

const weekKey = computed(() => formatDate(getStartOfWeek(currentDate.value))); // Startdatum als Schlüssel

const currentSchedule = computed(() => {
  if (!scheduleData[weekKey.value]) {
    // Initiale leere Datenstruktur, wenn noch keine Daten vorhanden
    scheduleData[weekKey.value] = {
      Früh: Array(7).fill([]),
      Spät: Array(7).fill([]),
      Nacht: Array(7).fill([]),
    };
  }
  return scheduleData[weekKey.value];
});

const weekDisplay = computed(() => {
  const start = getStartOfWeek(currentDate.value);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return `${formatDate(start)} - ${formatDate(end)}`;
});

const previousWeek = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 7);
  currentDate.value = new Date(currentDate.value);
};

const nextWeek = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 7);
  currentDate.value = new Date(currentDate.value);
};

const saveSchedule = () => {
  console.log("Gespeicherte Schichtdaten:", scheduleData);
};

const exportToCSV = () => {
  const header = ["Schicht", ...daysOfWeek];
  const rows: string[][] = [];

  shiftTypes.forEach((shift) => {
    const row = [shift];
    daysOfWeek.forEach((_, index) => {
      const employees = currentSchedule.value[shift][index];
      row.push(employees ? employees.join(", ") : "");
    });
    rows.push(row);
  });

  const csvContent = [
    header.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${weekDisplay.value}.csv`);
  link.click();
};
</script>

<style scoped>
.week-display {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0 16px;
}
.v-btn {
  text-transform: none;
}
</style>
