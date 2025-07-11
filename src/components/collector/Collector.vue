<template>
    <Header />  
    <v-btn
        v-if="showBackToTop"
        @click="scrollToTop"
        class="back-to-top"
        color="red"
        icon
        size="large"
    >
        <v-icon>mdi-arrow-up</v-icon>
    </v-btn>

    <v-container class="py-6">
        <v-card class="mb-6" elevation="10">
        <v-card-title>
            <v-icon start class="mr-2">mdi-trophy</v-icon>
            Collection Progress: {{ currentSetName }}
        </v-card-title>
        <v-card-text>
            <v-row>
            <v-col>
                <div class="d-flex justify-space-between">
                <div class="text">Progress</div>
                <div class="font-weight-bold text">{{ completionPercentage }}%</div>
                </div>
                <v-progress-linear
                :value="completionPercentage"
                height="8"
                color="green"
                />
            </v-col>
            </v-row>

            <v-row class="pt-4" dense>
            <v-col cols="6">
                <v-sheet class="text-center py-3" color="purple lighten-5">
                <div class="text-h5 red--text">{{ collectedInCurrentSet }}</div>
                <div class="text-caption">Cards Collected</div>
                </v-sheet>
            </v-col>
            <v-col cols="6">
                <v-sheet class="text-center py-3" color="blue lighten-5">
                <div class="text-h5 red--text">{{ totalCardsInSet - collectedInCurrentSet }}</div>
                <div class="text-caption">Cards Missing</div>
                </v-sheet>
            </v-col>
            </v-row>
        </v-card-text>
        </v-card>

        <v-card class="mb-6" elevation="10">
        <v-card-text>
            <v-row dense>
            <v-col cols="12" md="6">
                <v-select
                :items="sets"
                item-title="name"
                item-value="id"
                v-model="selectedSet"
                :loading="loadingSets"
                label="Select Pokémon TCG Set"
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                v-model="searchQuery"
                label="Search cards"
                prepend-inner-icon="mdi-magnify"
                ></v-text-field>
            </v-col>
            </v-row>

            <v-row dense>
            <v-col cols="12" md="6">
                <v-tabs v-model="collectionFilter">
                <v-tab value="all">All Cards</v-tab>
                <v-tab value="collected">Collected</v-tab>
                <v-tab value="missing">Missing</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12" md="6">
                <v-autocomplete
                v-model="selectedRarities"
                :items="availableRarities"
                multiple
                chips
                label="Filter by Rarity"
                ></v-autocomplete>
            </v-col>
            </v-row>
        </v-card-text>
        </v-card>

        <v-row v-if="loading" justify="center">
        <v-progress-circular indeterminate color="red" size="40"></v-progress-circular>
        </v-row>

        <v-row v-else-if="filteredCards.length === 0" justify="center" class="text-center py-10">
        <v-col cols="12">
            <v-icon size="64">mdi-magnify</v-icon>
            <div class="text-h6">No cards found</div>
            <p class="text-subtitle-1">Try adjusting your filters or selecting a different set</p>
        </v-col>
        </v-row>

        <v-row v-else dense style="padding-left:5px; padding-right:5px; padding-top:5px">
        <v-col
            v-for="card in filteredCards"
            :key="card.id"
            cols="12" sm="6" md="4" lg="3" xl="2"
        >
            <v-card
            @click="toggleCardCollection(card.id)"
            :elevation="4"
            class="card-hover"
            >
            <v-img :src="card.images.small" :alt="card.name" height="200px" style="margin-top:20px"></v-img>
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                <div>
                    <div class="text-subtitle-2">{{ card.name }}</div>
                    <div class="text-caption">{{ card.number }}/{{ card.set.printedTotal }}</div>
                </div>
                <div class="text-caption text-right">
                    <div>Low {{ card.cardmarket?.prices?.lowPrice ?? 'N/A' }}€</div>
                    <div>Avg {{ card.cardmarket?.prices?.trendPrice ?? 'N/A' }}€</div>
                </div>
                </div>
                <v-chip
                v-if="card.rarity"
                class="ma-2"
                :color="getRarityColor(card.rarity)"
                text-color="white"
                >
                {{ card.rarity }}
                </v-chip>
            </v-card-text>
            </v-card>
        </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  
  // Types - defined using type aliases to avoid interface keyword
  export type CardImage = {
      small: string;
      large: string;
  };
  
  export type CardSet = {
      id: string;
      name: string;
      series: string;
      printedTotal: number;
      total: number;
      releaseDate: string;
  };
  
  export type PokemonCard = {
      id: string;
      name: string;
      number: string;
      rarity: string;
      images: CardImage;
      set: CardSet;
      cardmarket?: cardmarket;
  };
  
  type cardmarket = {
      prices: prices;
  };
  
  type prices = {
      averageSellPrice: number;
      trendPrice: number;
      lowPrice: number;
  };
  
  export type SetProgress = {
      id: string;
      total: number;
      collected: number;
      percentage: number;
  };
  
  export type CollectionFilterType = 'all' | 'collected' | 'missing';
  
  
  const API_BASE_URL = 'http://localhost:4000';
  
  // const fetchedCards = ref<PokemonCard[]>([]);
  const cards = ref<PokemonCard[]>([]);
  const filteredCards = ref<PokemonCard[]>([]);
  const sets = ref<CardSet[]>([]);
  const selectedSet = ref<string | undefined>();
  const collectedCards = ref<string[]>([]);
  const loading = ref(true);
  const loadingSets = ref(true);
  const searchQuery = ref('');
  const collectionFilter = ref<CollectionFilterType>('all');
  const progressValue = ref(0);
  const availableRarities = ref<string[]>([]);
  const selectedRarities = ref<string[]>([]);
  const allCards = ref<PokemonCard[]>([]);
  const setProgress = ref<SetProgress[]>([]);
  const showBackToTop = ref(false);
  
  const collectedInCurrentSet = computed(() => cards.value.filter((card) => collectedCards.value.includes(card.id)).length);
  const totalCardsInSet = computed(() => cards.value.length);
  const completionPercentage = computed(() => totalCardsInSet.value > 0 ? Math.round((collectedInCurrentSet.value / totalCardsInSet.value) * 100) : 0);
  const currentSetName = computed(() => sets.value.find((set) => set.id === selectedSet.value)?.name || 'All Sets');
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function getRarityColor(rarity: string): string {
    const rarityMap: Record<string, string> = {
      Common: 'grey lighten-1',
      Uncommon: 'green lighten-2',
      Rare: 'blue lighten-2',
      'Rare Holo': 'indigo lighten-2',
      'Rare Ultra': 'purple lighten-2',
      'Rare Holo EX': 'deep-purple lighten-2',
      'Rare Holo GX': 'pink lighten-2',
      'Rare Holo V': 'red lighten-2',
      'Rare Holo VMAX': 'orange lighten-2',
      'Rare BREAK': 'amber lighten-2',
      'Rare Prism Star': 'teal lighten-2',
      'Rare Shiny': 'cyan lighten-2',
      'Rare Shiny GX': 'lime lighten-2',
      'Rare ACE': 'green lighten-2',
      Legend: 'yellow lighten-2',
      Promo: 'brown lighten-2',
      'Amazing Rare': 'blue-grey lighten-2',
      'Rare Holo LV.X': 'grey lighten-2',
      'Rare Prime': 'deep-orange lighten-2',
      'Radiant Rare': 'amber lighten-2',
      'Trainer Gallery Rare Holo': 'indigo lighten-3',
      'Trainer Gallery Rare Ultra': 'purple lighten-3',
      'Illustration Rare': 'pink lighten-3',
      'Special Illustration Rare': 'red lighten-3',
      'Hyper Rare': 'deep-purple lighten-3',
      'Ultra Rare': 'blue lighten-3',
      'Secret Rare': 'yellow lighten-3'
    };
    return rarityMap[rarity] || 'grey lighten-1';
  }
  
  function toggleCardCollection(cardId: string) {
    const idx = collectedCards.value.indexOf(cardId);
    if (idx >= 0) collectedCards.value.splice(idx, 1);
    else collectedCards.value.push(cardId);
    localStorage.setItem('collectedCards', JSON.stringify(collectedCards.value));
    calculateSetProgress();
  }
  
  function applyFilters() {
    let result = cards.value;
    if (searchQuery.value) {
      const searchTerm = searchQuery.value.toLowerCase();
      result = result.filter(card => card.name.toLowerCase().includes(searchTerm) || card.number.includes(searchTerm));
    }
    if (collectionFilter.value === 'collected') {
      result = result.filter(card => collectedCards.value.includes(card.id));
    } else if (collectionFilter.value === 'missing') {
      result = result.filter(card => !collectedCards.value.includes(card.id));
    }
    if (selectedRarities.value.length > 0 && selectedRarities.value.length < availableRarities.value.length) {
      result = result.filter(card => selectedRarities.value.includes(card.rarity));
    }
    filteredCards.value = result;
  }
  
  function calculateSetProgress() {
    if (!allCards.value.length || !sets.value.length) return;
    const progress = sets.value.map(set => {
      const setCards = allCards.value.filter(card => card.set.id === set.id);
      const collectedSetCards = setCards.filter(card => collectedCards.value.includes(card.id));
      return {
        id: set.id,
        total: setCards.length,
        collected: collectedSetCards.length,
        percentage: setCards.length > 0 ? Math.round((collectedSetCards.length / setCards.length) * 100) : 0
      };
    });
    setProgress.value = progress;
  }
  
  async function fetchSets() {
    try {

      console.log("fetch sets...")
      loading.value = true;
      loadingSets.value = true;
      const res = await fetch(`${API_BASE_URL}/pokemon-sets`);
      const data = await res.json();
      const sorted = data.sort((a: CardSet, b: CardSet) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

      sets.value = sorted;

      if (sorted.length > 0) selectedSet.value = sorted[0].id;
      fetchAllCards(sorted);
    } catch (e) {
      console.error('Error fetching sets:', e);
    } finally {
      loadingSets.value = false;
    }
  }
  

  async function fetchAllCards(setsList: CardSet[]) {
    try {
      
      calculateSetProgress();
    } catch (error) {
      console.error('Error fetching all cards:', error);
    }
  }
  
  async function fetchCards(setId: string) {
  try {
    loading.value = true;

    const url = `${API_BASE_URL}/pokemon-cards/set/${setId}`;
    const res = await fetch(url);
    const data: PokemonCard[] = await res.json();

    const sortedCards = data.sort((a, b) => {
      const aNum = parseInt(a.number.replace(/[^0-9]/g, '')) || 9999;
      const bNum = parseInt(b.number.replace(/[^0-9]/g, '')) || 9999;
      return aNum - bNum;
    });

    console.log("sortedCards: ", sortedCards);

    const rarities = [...new Set(sortedCards.map(c => c.rarity).filter(Boolean))].sort();
    availableRarities.value = rarities;
    selectedRarities.value = [...rarities];

    cards.value = sortedCards;
    applyFilters();
  } catch (e) {
    console.error('Error fetching cards:', e);
  } finally {
    loading.value = false;
  }
}


  // async function fetchCardsForSet(setList: CardSet[]) {
  //   try {

  //     if(setList.length > 0){
  //       setList.forEach( set => {
  //         console.log(set.name)
  //         fetchCards(set.name)
  //       })
  //     }
  //   } catch (e) {
  //     console.error('Error fetching cards:', e);
  //   } finally {
  //     loading.value = false;
  //   }
  // }

//   async function uploadCards(cards: PokemonCard[]) {
//   try {

//     console.log("Kartenanzahl zum hochladen: ", cards.length)

//     const response = await fetch('http://localhost:4000/pokemon', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(cards),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.error('Fehler beim Hochladen:', error);
//       return;
//     }

//     const result = await response.json();
//     console.log(cards.length + ' Karten erfolgreich hochgeladen:', result);
//   } catch (error) {
//     console.error('Verbindungsfehler:', error);
//   }
// }
  
  onMounted(async () => {
    try {
        const saved = localStorage.getItem('collectedCards');
        if (saved) collectedCards.value = JSON.parse(saved);

        await fetchSets(); // async-Funktion aufrufen
    } catch (error) {
        console.error('Error in onMounted:', error);
    }
  });
  
  watch(selectedSet, () => {
    if (selectedSet.value) fetchCards(selectedSet.value);
  });

  // watch(sets, () => {
  //   if (sets.value.length > 0) {
  //     console.log("fetchCardsForSets###");
  //     fetchCardsForSet(sets.value);
  //   }
  // });
  
  watch([cards, searchQuery, collectionFilter, selectedRarities], applyFilters);
  
  watch(completionPercentage, (newVal) => {
    if (progressValue.value === newVal) return;
    const step = (newVal - progressValue.value) / 10;
    const interval = setInterval(() => {
      progressValue.value += step;
      if ((step > 0 && progressValue.value >= newVal) || (step < 0 && progressValue.value <= newVal)) {
        progressValue.value = newVal;
        clearInterval(interval);
      }
    }, 50);
  });
  </script>
  
  
<style>

.v-card {
  padding: 25px;
}

  .gradient-bg {
    background: linear-gradient(to bottom, #374151, #0f172a);
  }
  .back-to-top {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 1000;
  }
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  </style>