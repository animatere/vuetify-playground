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
          <v-btn :loading="isLoading" :disabled="isLoading" class="mt-4" color="primary" type="submit" block>
            Login
          </v-btn>
        </v-form>
        <p style="margin-top: 15px">
          Don't have an Account?
          <a href="/signup" style="text-decoration: underline; color: blue"
            >Signup</a
          >
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/EventStore";
import { useNotificationsStore } from "@/stores/NotificationStore";
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const email = ref("");
const username = ref("");
const password = ref("");
const store = useUserStore();
const { login } = store;
const router = useRouter();

const notificationsStore = useNotificationsStore();
const eventStore = useEventStore();

const isLoading = ref(false); // Neue Variable für den Ladezustand

async function submitForm(submitEvent: Event) {
  submitEvent.preventDefault();
  isLoading.value = true; // Ladezustand starten

  try {
    const success = await login(email.value, password.value);

    if (success) {
      notificationsStore.setPosition("top-center");
      notifyMessage("Login erfolgreich!", "success");
      await reload();
      eventStore.addEvent("Benutzer hat sich eingeloggt");
    } else {
      notifyMessage("Login fehlgeschlagen!", "error");
    }
  } catch (error) {
    notifyMessage("Ein Fehler ist aufgetreten!", "error");
  } finally {
    isLoading.value = false; // Ladezustand zurücksetzen
  }
}

function reload() {
    router.push("/home");
}


function notifyMessage(message: string, type: string) {
  notificationsStore.setPosition("top-center");
  notificationsStore.addNotification(message, type);
}
</script>

<style scoped></style>
