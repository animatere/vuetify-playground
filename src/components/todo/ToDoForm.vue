<script setup lang="ts">
import { ref } from "vue";
import { useTodoListStore } from "@/stores/TodoListStore";

const todo = ref("");
const store = useTodoListStore();
const todoValidity = ref(false);
const toDoRules = [(value) => !!value || "Empty item can not be added."];

function addItemAndClear(item: string) {
  if (item.length === 0) {
    console.log("Empty item can not be added.");
    return;
  }
  store.addTodo(item);
  todo.value = "";
}
</script>

<template>
  <v-container>
    <v-form ref="todoForm" v-model="todoValidity">
      <v-text-field v-model="todo" type="text">
        <!--        :rules="toDoRules"-->
        <!--        required>-->
      </v-text-field>

      <v-btn
        color="primary"
        @click="addItemAndClear(todo)"
        :disabled="!todoValidity"
      >
        Add
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
.v-btn {
  width: 100px;
}
</style>
