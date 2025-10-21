<template>
  <v-container>
    <v-row>
      <v-col md="12" cols="12">
        <h2>DALL·E Bildgenerator</h2>
        <v-text-field
          v-model="prompt"
          label="Bildbeschreibung eingeben"
          @keyup.enter="generateImage"
          outlined
        ></v-text-field>
        <v-btn color="primary" @click="generateImage">Generieren</v-btn>
      </v-col>
    </v-row>

    <v-overlay v-if="loading" class="d-flex flex-column justify-center align-center">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
      <p>Laden... {{ progress }}%</p>
    </v-overlay>

    <v-row v-if="imageUrl">
      <v-col md="12" cols="12">
        <v-card>
          <v-img :src="imageUrl" contain max-height="400"></v-img>
          <v-card-actions>
            <v-btn color="secondary" @click="downloadImage">Herunterladen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const apiKey = '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';
const prompt = ref('');
const imageUrl = ref('');
const loading = ref(false);
const progress = ref(0);

const generateImage = async () => {
  if (!prompt.value.trim()) return;

  loading.value = true;
  progress.value = 0;

  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 10;
    }
  }, 500);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: prompt.value,
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    imageUrl.value = response.data.data[0].url;
  } catch (error) {
    console.error('Fehler bei der Bildgenerierung:', error);
  } finally {
    clearInterval(interval);
    progress.value = 100;
    setTimeout(() => loading.value = false, 500);
  }
};

const downloadImage = () => {
  if (!imageUrl.value) return;

  const link = document.createElement('a');
  link.href = imageUrl.value;
  link.download = 'dalle_image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
