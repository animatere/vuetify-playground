<template>
  <v-container>
    <v-row cols="12" justify="center">
      <v-col cols="auto">
        <v-card width="600px" height="250px">
          <v-card-title style="border-bottom: 1px solid black"
            >Quest: {{ questCard.title }}
          </v-card-title>
          <v-img :src="questCard.path" max-width="80px" class="ml-3"> </v-img>
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
import { QuestCategory } from "@/Enums/enums";

const props = defineProps<{ category: string }>();

let questCard = ref<QuestCard>({
  title: "Initial Quest Card",
  description: "Initial description",
  category: QuestCategory.FUN,
  addOn: "standard",
  path: "https://example.com/default.jpg",
  activated: false,
});

onMounted(async () => {
  getRandomCardByCategory(props.category);
});

watch(
  () => props.category,
  () => {
    getRandomCardByCategory(props.category);
  },
);

function getRandomCardByCategory(category: string): void {
  const filteredQuestCards = questCards.filter(
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

let questCards: QuestCard[] = [
  {
    title: "Sing ein Kinderlied",
    description: "Singe ein bekanntes Kinderlied vor der Gruppe.",
    category: QuestCategory.FUN,
    addOn: "standard",
    path: "https://example.com/fun1.jpg",
    activated: false,
  },
  {
    title: "Erzähle einen Witz",
    description: "Erzähle deinen besten Witz und bring die Gruppe zum Lachen.",
    category: QuestCategory.FUN,
    addOn: "standard",
    path: "https://example.com/fun2.jpg",
    activated: false,
  },
  {
    title: "Mache eine Grimasse",
    description: "Ziehe eine lustige Grimasse und halte sie für 10 Sekunden.",
    category: QuestCategory.FUN,
    addOn: "standard",
    path: "https://example.com/fun3.jpg",
    activated: false,
  },
  {
    title: "Mache 10 Liegestütze",
    description: "Zeige deine Kraft, indem du 10 Liegestütze machst.",
    category: QuestCategory.ACTION,
    addOn: "standard",
    path: "https://example.com/action1.jpg",
    activated: false,
  },
  {
    title: "Springe 20 Mal",
    description: "Springe 20 Mal in die Luft, ohne Pause.",
    category: QuestCategory.ACTION,
    addOn: "standard",
    path: "https://example.com/action2.jpg",
    activated: false,
  },
  {
    title: "Drehe dich im Kreis",
    description: "Drehe dich 10 Sekunden lang um die eigene Achse.",
    category: QuestCategory.ACTION,
    addOn: "standard",
    path: "https://example.com/action3.jpg",
    activated: false,
  },
  {
    title: "Zähle rückwärts von 100",
    description: "Zähle laut rückwärts von 100 bis 1.",
    category: QuestCategory.BRAIN,
    addOn: "standard",
    path: "https://example.com/brain1.jpg",
    activated: false,
  },
  {
    title: "Nenne fünf Flüsse",
    description: "Zähle fünf bekannte Flüsse auf, ohne lange nachzudenken.",
    category: QuestCategory.BRAIN,
    addOn: "standard",
    path: "https://example.com/brain2.jpg",
    activated: false,
  },
  {
    title: "Rechne schnell 12 + 37",
    description: "Löse die Rechenaufgabe 12 + 37 ohne Hilfsmittel.",
    category: QuestCategory.BRAIN,
    addOn: "standard",
    path: "https://example.com/brain3.jpg",
    activated: false,
  },
  {
    title: "Mache ein Tiergeräusch",
    description: "Imitiere das Geräusch eines Tieres, das die Gruppe auswählt.",
    category: QuestCategory.FUN,
    addOn: "standard",
    path: "https://example.com/fun4.jpg",
    activated: false,
  },
  {
    title: "Laufe rückwärts",
    description: "Gehe 10 Schritte rückwärts, ohne dich umzudrehen.",
    category: QuestCategory.ACTION,
    addOn: "standard",
    path: "https://example.com/action4.jpg",
    activated: false,
  },
  {
    title: "Nenne drei Länder in Afrika",
    description: "Zähle drei Länder auf, die in Afrika liegen.",
    category: QuestCategory.BRAIN,
    addOn: "standard",
    path: "https://example.com/brain4.jpg",
    activated: false,
  },
  {
    title: "Beschreibe dein Lieblingsessen",
    description:
      "Erkläre in zwei Sätzen, warum dein Lieblingsessen das beste ist.",
    category: QuestCategory.FUN,
    addOn: "standard",
    path: "https://example.com/fun5.jpg",
    activated: false,
  },
  {
    title: "Hüpfe auf einem Bein",
    description: "Hüpfe 15 Sekunden lang auf einem Bein.",
    category: QuestCategory.ACTION,
    addOn: "standard",
    path: "https://example.com/action5.jpg",
    activated: false,
  },
  {
    title: "Rechne 8 x 9",
    description:
      "Multipliziere 8 mit 9, ohne einen Taschenrechner zu benutzen.",
    category: QuestCategory.BRAIN,
    addOn: "standard",
    path: "https://example.com/brain5.jpg",
    activated: false,
  },
  {
    title: "Erzähle einen Zungenbrecher",
    description:
      "Sage einen schwierigen Zungenbrecher dreimal schnell hintereinander.",
    category: QuestCategory.FUN,
    addOn: "standard",
    path: "https://example.com/fun6.jpg",
    activated: false,
  },
  {
    title: "Balanciere ein Buch",
    description:
      "Lege ein Buch auf deinen Kopf und balanciere es für 10 Sekunden.",
    category: QuestCategory.ACTION,
    addOn: "standard",
    path: "https://example.com/action6.jpg",
    activated: false,
  },
  {
    title: "Nenne fünf Früchte",
    description: "Liste fünf verschiedene Früchte auf.",
    category: QuestCategory.BRAIN,
    addOn: "standard",
    path: "https://example.com/brain6.jpg",
    activated: false,
  },
];
</script>

<style scoped>
.refreshButton {
  margin-top: 25px;
}
</style>
