<template>
  <div class="pageContent">
    <h1>This is the Playground</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Catplay from "@/components/playground/Catplay.vue";
import Counter from "@/components/playground/Counter.vue";

export default defineComponent({
  components: { Counter, Catplay },
});
</script>

<style></style>
