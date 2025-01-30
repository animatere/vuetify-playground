<template>
    <v-container>
        <v-row>
            <v-card>
                <v-card-title>{{ questCard.title }}</v-card-title>
                <v-img 
                :src="questCard.path" 
                max-width="80px" 
                class="ml-3">
                </v-img>
                <v-card-text>{{ questCard.description }}</v-card-text>
            </v-card>
        </v-row>
        <v-row class="refreshButton">
            <v-btn @click="refreshCard()" color="primary">
                Refresh Card
            </v-btn>
        </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { QuestCard } from "@/interfaces/interfaces";
  
  const props = defineProps<{ category: string }>();
  
  let questCard = ref<QuestCard>({
    title: 'Initial Quest Card',
    description: 'Initial description',
    category: 'Fun',
    addOn: 'standard',
    path: 'https://example.com/default.jpg'
  });

  onMounted(async () => {
    getRandomCardByCategory(props.category)
  });
  
  watch(() => props.category, () => {
    getRandomCardByCategory(props.category);
  });
  
  function getRandomCardByCategory(category: string): void {
    const filteredQuestCards = questCards.filter((quest) => quest.category === category);
    if (filteredQuestCards.length > 0) {
        console.log()
      const randomIndex = Math.floor(Math.random() * filteredQuestCards.length);
      questCard.value = filteredQuestCards[randomIndex];
    }
  }
  
  function refreshCard() {
    getRandomCardByCategory(props.category);
  }
  
  let questCards: QuestCard[] = [
    // Kategorie: Fun
    {
        title: 'Sing ein Kinderlied',
        description: 'Singe ein bekanntes Kinderlied vor der Gruppe.',
        category: 'Fun',
        addOn: 'standard',
        path: 'https://example.com/fun1.jpg'
    },
    {
        title: 'Erzähle einen Witz',
        description: 'Erzähle deinen besten Witz und bring die Gruppe zum Lachen.',
        category: 'Fun',
        addOn: 'standard',
        path: 'https://example.com/fun2.jpg'
    },
    {
        title: 'Mache eine Grimasse',
        description: 'Ziehe eine lustige Grimasse und halte sie für 10 Sekunden.',
        category: 'Fun',
        addOn: 'standard',
        path: 'https://example.com/fun3.jpg'
    },

    // Kategorie: Action
    {
        title: 'Mache 10 Liegestütze',
        description: 'Zeige deine Kraft, indem du 10 Liegestütze machst.',
        category: 'Action',
        addOn: 'standard',
        path: 'https://example.com/action1.jpg'
    },
    {
        title: 'Springe 20 Mal',
        description: 'Springe 20 Mal in die Luft, ohne Pause.',
        category: 'Action',
        addOn: 'standard',
        path: 'https://example.com/action2.jpg'
    },
    {
        title: 'Drehe dich im Kreis',
        description: 'Drehe dich 10 Sekunden lang um die eigene Achse.',
        category: 'Action',
        addOn: 'standard',
        path: 'https://example.com/action3.jpg'
    },

    // Kategorie: Brain
    {
        title: 'Zähle rückwärts von 100',
        description: 'Zähle laut rückwärts von 100 bis 1.',
        category: 'Brain',
        addOn: 'standard',
        path: 'https://example.com/brain1.jpg'
    },
    {
        title: 'Nenne fünf Flüsse',
        description: 'Zähle fünf bekannte Flüsse auf, ohne lange nachzudenken.',
        category: 'Brain',
        addOn: 'standard',
        path: 'https://example.com/brain2.jpg'
    },
    {
        title: 'Rechne schnell 12 + 37',
        description: 'Löse die Rechenaufgabe 12 + 37 ohne Hilfsmittel.',
        category: 'Brain',
        addOn: 'standard',
        path: 'https://example.com/brain3.jpg'
    },

    // Weitere Karten für jede Kategorie
    {
        title: 'Mache ein Tiergeräusch',
        description: 'Imitiere das Geräusch eines Tieres, das die Gruppe auswählt.',
        category: 'Fun',
        addOn: 'standard',
        path: 'https://example.com/fun4.jpg'
    },
    {
        title: 'Laufe rückwärts',
        description: 'Gehe 10 Schritte rückwärts, ohne dich umzudrehen.',
        category: 'Action',
        addOn: 'standard',
        path: 'https://example.com/action4.jpg'
    },
    {
        title: 'Nenne drei Länder in Afrika',
        description: 'Zähle drei Länder auf, die in Afrika liegen.',
        category: 'Brain',
        addOn: 'standard',
        path: 'https://example.com/brain4.jpg'
    },
    {
        title: 'Beschreibe dein Lieblingsessen',
        description: 'Erkläre in zwei Sätzen, warum dein Lieblingsessen das beste ist.',
        category: 'Fun',
        addOn: 'standard',
        path: 'https://example.com/fun5.jpg'
    },
    {
        title: 'Hüpfe auf einem Bein',
        description: 'Hüpfe 15 Sekunden lang auf einem Bein.',
        category: 'Action',
        addOn: 'standard',
        path: 'https://example.com/action5.jpg'
    },
    {
        title: 'Rechne 8 x 9',
        description: 'Multipliziere 8 mit 9, ohne einen Taschenrechner zu benutzen.',
        category: 'Brain',
        addOn: 'standard',
        path: 'https://example.com/brain5.jpg'
    },
    {
        title: 'Erzähle einen Zungenbrecher',
        description: 'Sage einen schwierigen Zungenbrecher dreimal schnell hintereinander.',
        category: 'Fun',
        addOn: 'standard',
        path: 'https://example.com/fun6.jpg'
    },
    {
        title: 'Balanciere ein Buch',
        description: 'Lege ein Buch auf deinen Kopf und balanciere es für 10 Sekunden.',
        category: 'Action',
        addOn: 'standard',
        path: 'https://example.com/action6.jpg'
    },
    {
        title: 'Nenne fünf Früchte',
        description: 'Liste fünf verschiedene Früchte auf.',
        category: 'Brain',
        addOn: 'standard',
        path: 'https://example.com/brain6.jpg'
    }
  ];
  </script>
  
  
  
  <style scoped>

  </style>
  