<template>
  <v-container v-if="questCard != null">
    <v-row cols="12" justify="center">
      <v-col cols="auto">
        <v-card width="600px" height="250px">
          <v-card-title style="border-bottom: 1px solid black"
            >Quest: {{ questCard.title }}
          </v-card-title>
          <!-- <v-img :src="questCard.path" max-width="80px" class="ml-3"> </v-img> -->
          <v-card-text> Description: {{ questCard.description }} </v-card-text>
          <v-btn color="success">
            <v-icon
              icon="mdi-checkbox-outline"
              style="margin-right: 5px"
            ></v-icon>
            Start Quest
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="refreshButton" justify="center">
      <v-btn @click="refreshCard()" color="accent">
        <v-icon icon="mdi-refresh" style="margin-right: 5px"></v-icon>
        Refresh Card</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { QuestCard } from "@/interfaces/interfaces";
import { useQuestStore } from "@/stores/QuestStore";

const props = defineProps<{ category: string }>();
const questStore = useQuestStore();
const questCards: Ref<QuestCard[] | []> = ref([]);

let questCard = ref<QuestCard | null>(null);

onMounted(async () => {
  questCards.value = await questStore.getQuests();
  await getRandomCardByCategory(props.category);
});

watch(
  () => props.category,
  () => {
    getRandomCardByCategory(props.category);
  },
);

async function getRandomCardByCategory(category: string) {
  const filteredQuestCards = questCards.value.filter(
    (quest) => quest.category === category,
  );

  if (filteredQuestCards.length > 0) {
    console.log();
    const randomIndex = Math.floor(Math.random() * filteredQuestCards.length);

    questCard.value = filteredQuestCards[randomIndex];
  }
}

function refreshCard() {
  getRandomCardByCategory(props.category);
}
</script>

<style scoped>
.refreshButton {
  margin-top: 25px;
}
</style>
