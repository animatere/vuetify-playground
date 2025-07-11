<!-- <template>
  <div class="counter">
    <h1>Counter</h1>
    <p>{{ count }}</p>
    <v-btn @click="decrement()" :disabled="count === 0">-</v-btn>
    <v-btn @click="increment()" :disabled="count === 8">+</v-btn><br />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    let count = ref(5);

    const increment = () => {
      count.value += 1;
    };
    const decrement = () => {
      count.value -= 1;
    };

    return { count, increment, decrement };
  },
};
</script>

<style scoped>
.v-btn {
  font-size: 1.5rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 100px;
  background-color: #4caf50;
}
h1 {
  font-size: 2rem;
  text-align: center;
}
</style> -->
