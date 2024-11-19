<script setup lang="ts">
import { useTodoListStore } from "@/stores/TodoListStore";
import { storeToRefs } from "pinia";

const store = useTodoListStore();
const { todoList } = storeToRefs(store);
const { todoCompletedList } = storeToRefs(store);
const { toggleTodo } = store;
const { redoCompletedTodo } = store;
const { deleteTodo } = store;
const { deleteCompletedTodo } = store;
</script>

<template>
  <div class="incompletedTodos">
    <h1>Current Tasks</h1>
    <div v-if="todoList.length > 0" v-for="todo in todoList" class="item">
      <div class="content">
        <span v-if="todo.text !== ''" :class="{ completed: todo.completed }">{{
          todo.text
        }}</span>
        <v-btn @click.stop="toggleTodo(todo.id)" color="warning">Done</v-btn>
        <v-btn @click="deleteTodo(todo.id)" color="error">Remove</v-btn>
      </div>
    </div>
    <div v-else>No Tasks created yet.</div>
  </div>
  <div class="completedTodos" v-if="todoCompletedList.length !== 0">
    <h1>Completed Tasks</h1>
    <div v-for="todo in todoCompletedList" class="item">
      <div class="content">
        <span v-if="todo.text !== ''" :class="{ completed: todo.completed }">{{
          todo.text
        }}</span>
        <v-btn @click.stop="redoCompletedTodo(todo.id)" color="warning"
          >Undone</v-btn
        >
        <v-btn @click="deleteCompletedTodo(todo.id)" color="error"
          >Remove</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.completed {
  text-decoration: line-through;
}
span {
  margin: 0 10px;
  cursor: pointer;
  width: 500px;
}
.item {
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
  font-size: 1.5em;
  width: 80vw;
  padding: 5px;
}
.v-btn {
  width: 100px;
}
</style>
