<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const email = ref("");
const username = ref("");
const password = ref("");
const store = useUserStore();
const { logout } = store;
const router = useRouter(); // Router-Instanz
</script>

<template></template>

<style scoped></style>
