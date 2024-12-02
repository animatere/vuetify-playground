<template>
  <div :class="['notifications', notificationsStore.position]">
    <div
      v-for="notification in notificationsStore.notifications"
      :key="notification.id"
      :class="`notification ${notification.type}`"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from "@/stores/NotificationStore";
const notificationsStore = useNotificationsStore();
</script>

<style>
.notification {
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  position: fixed;
  z-index: 1000;
}

.notification.info {
  background-color: #2196f3;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}

.notification.warning {
  background-color: #ff9800;
}

.notifications.top-right {
  top: 20px;
  right: 20px;
}

.notifications.top-left {
  top: 20px;
  left: 20px;
}

.notifications.top-center {
  top: 20px; /* Ganz oben */
  left: 50%; /* In der Mitte */
  transform: translateX(-50%); /* Zentrieren */
}
</style>
