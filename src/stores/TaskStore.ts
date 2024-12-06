import { Tasks } from "@/interfaces/interfaces";
import axios from "axios";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    currentTasks: [] as Tasks[],
  }),
  actions: {
    async getTasks(): Promise<void> {
      try {
        const response = await axios.get(
          "https://vue3-training-2f8fd-default-rtdb.firebaseio.com/Tasks.json",
        );

        if (response.data) {
          this.currentTasks = Object.values(response.data)[0] as Tasks[];
        } else {
          console.warn("Keine Tasks gefunden.");
          this.currentTasks = [];
        }
      } catch (err) {
        console.error("Fehler beim Laden der Tasks:", err);
        this.currentTasks = [];
      }
    },
  },
});
