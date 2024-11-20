<template>
  <v-footer
    v-if="isAuthenticated"
    class="my-footer"
    :absolute="!isFullHeight"
    app
  >
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2 footer-button"
        color="black"
        rounded="xl"
        variant="text"
      >
        <p class="foot-links">{{ link }}</p>
      </v-btn>
      <v-col class="text-center mt-4" cols="12" style="color: black">
        {{ new Date().getFullYear() }} — <strong> by Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

const store = useUserStore();
const { isAuthenticated } = storeToRefs(store);

// Links im Footer
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];

// Dynamische Höhenberechnung für den Footer
const isFullHeight = computed(() => document.body.offsetHeight < window.innerHeight);
</script>

<style scoped>
.footer-button {
  color: black;
  width: 100px !important;
}

.my-footer {
  background-color: #4ea8de !important;
  width: 100%;
  height: auto !important;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 !important;
}

.foot-links:hover {
  color: white;
}
</style>
