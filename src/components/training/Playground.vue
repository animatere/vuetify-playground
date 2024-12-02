<template>
  <div class="pageContent">
    <h1>This is the Playground</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Catplay from "@/components/training/Catplay.vue";
import Counter from "@/components/training/Counter.vue";

export default defineComponent({
  components: { Counter, Catplay },
});
</script>

<style></style>
