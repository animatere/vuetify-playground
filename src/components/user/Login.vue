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
notificationsStore.setPosition("top-left");
const eventStore = useEventStore();

async function submitForm(submitEvent: Event) {
  submitEvent.preventDefault();

  const success = await login({
    id: 0,
    username: username.value,
    email: email.value,
    password: password.value,
    loggedIn: false,
    registered: false,
  });

  if (success) {
    await reload();
    notifyMessage("Login erfolgreich!", "success");
    eventStore.addEvent("Benutzer hat sich eingeloggt");
  } else {
    notifyMessage("Login fehlgeschlagen!", "error");
  }

  function reload() {
    router.push("/home");
  }
}

function notifyMessage(message: string, type: string) {
  notificationsStore.addNotification(message, type);
}
</script>

<template>
  <v-container class="d-flex justify-center" style="height: 50vh">
    <v-card elevation="2" width="400">
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
          <v-btn class="mt-4" color="primary" type="submit" block>
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

<style scoped></style>
