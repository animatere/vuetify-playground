<template>
  <v-container class="d-flex justify-center">
    <v-card elevation="2" width="400" height="600px" style="margin-top:10vh">
      <v-card-title class="justify-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="username"
            label="Username"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            class="mt-4"
            color="primary"
            type="submit"
            block
          >
            Login
          </v-btn>
        </v-form>
        <p style="margin-top: 15px">
          Don't have an Account?
          <a href="/signup" style="text-decoration: underline; color: blue">
            Signup
          </a>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { useNotificationsStore } from "@/stores/NotificationStore";
import { useEventStore } from "@/stores/EventStore";

// Form state
const email = ref("");
const username = ref(""); // Wird aktuell nicht verwendet, kann evtl. entfernt werden
const password = ref("");
const isLoading = ref(false);

// Router
const router = useRouter();

// Stores
const userStore = useUserStore();
const notificationsStore = useNotificationsStore();
const eventStore = useEventStore();

async function submitForm() {
  isLoading.value = true;

  try {
    const success = await userStore.login(email.value, password.value);

    if (success) {
      notificationsStore.setPosition("top-center");
      notifyMessage("Login erfolgreich!", "success");

      eventStore.addEvent("Benutzer hat sich eingeloggt");

      router.push("/home");
    } else {
      notifyMessage("Login fehlgeschlagen!", "error");
    }
  } catch (error) {
    notifyMessage("Ein Fehler ist aufgetreten!", "error");
  } finally {
    isLoading.value = false;
  }
}

function notifyMessage(message: string, type: string) {
  notificationsStore.setPosition("top-center");
  notificationsStore.addNotification(message, type);
}
</script>

<style scoped>
/* Optional: eigene Styles */
</style>
