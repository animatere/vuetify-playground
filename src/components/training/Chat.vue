<template>
  <div>
    <h1>Vue watchEffect</h1>
    <textarea style="background-color: white" v-model="textContent"></textarea>
    <p v-if="isTyping">You are typing...</p>
    <br />
    <!--    <p>{{textContent}}</p>-->
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";

export default {
  setup() {
    const textContent = ref("");
    const isTyping = ref(false);

    watchEffect(() => {
      if (textContent.value.length > 0) {
        isTyping.value = true;
        setTimeout(() => {
          isTyping.value = false;
        }, 700);
      }
    });

    return {
      isTyping,
      textContent,
    };
  },
};
</script>

<style></style>
