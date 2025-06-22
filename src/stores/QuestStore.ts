// src/stores/EventStore.ts
import { QuestCard } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import axios from "axios";

export const useQuestStore = defineStore("QuestStore", {
  state: () => ({}),
  actions: {
    async createQuest(Quest: QuestCard) {
      console.log("Erstelle Quest... ", Quest);
      const userSettingsRef = `http://localhost:4000/Quests`;
      await axios.post(userSettingsRef, Quest);
    },
    async getQuest(id: string): Promise<QuestCard | null> {
      let quest = null;

      if (id.length > 0) {
        console.log("Suche Quest mit id... ", id);

        const userSettingsRef = `http://localhost:4000/Quests/single?id=${id}`;
        let response = await axios.get(userSettingsRef);

        if (response.data) {
          quest = response.data as QuestCard;
        }
      } else {
        console.log("Empty Id is not allowed");
      }

      return quest;
    },
    async getQuests(): Promise<QuestCard[] | []> {
      let quests = [] as QuestCard[];

      const userSettingsRef = `http://localhost:4000/Quests`;
      let response = await axios.get(userSettingsRef);

      if (response.data) {
        quests = response.data as QuestCard[];
      }

      return quests;
    },
    async updateQuest(id: string) {
      if (id.length > 0) {
        console.log("Aktualisiere Quest mit id... ", id);

        const userSettingsRef = `http://localhost:4000/Quests?id=${id}`;
        await axios.patch(userSettingsRef, id);
      } else {
        console.log("Empty Id is not allowed");
      }
    },
  },
});
