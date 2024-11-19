<script setup lang="ts">
import ToDoForm from "@/components/todo/ToDoForm.vue";
import ToDoList from "@/components/todo/ToDoList.vue";
</script>

<template>
  <div class="todo-app">
    <h1>To Do List</h1>
    <to-do-form></to-do-form>
    <to-do-list></to-do-list>
  </div>
</template>

<style scoped>
.todo-app {
  padding: 5vh;
  min-height: 100vh;
  width: 60vw;
  margin: auto;
}
</style>
