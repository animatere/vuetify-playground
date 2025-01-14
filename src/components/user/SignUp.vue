<script setup lang="ts">
import router from "@/router";
import { useEventStore } from "@/stores/EventStore";
import { useNotificationsStore } from "@/stores/NotificationStore";
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const email = ref("");
const username = ref("");
const password = ref("");
const store = useUserStore();
const { signup } = store;
const notificationsStore = useNotificationsStore();
notificationsStore.setPosition("top-left");
const eventStore = useEventStore();

function notifyMessage(message: string, type: string) {
  notificationsStore.addNotification(message, type);
}

async function submitForm(submitEvent: Event) {
  submitEvent.preventDefault();

  if (username.value !== "" && email.value !== "" && password.value !== "") {
    const success = await signup(email.value, password.value);

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
  } else {
    console.log("Signup fehlgeschlagen.");
  }
}
</script>

<template>
  <v-container class="d-flex justify-center" style="height: 50vh">
    <v-card elevation="2" width="400">
      <v-card-title class="justify-center">Sign Up</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" @submit.prevent="submitForm">
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
            Sign up
          </v-btn>
        </v-form>
        <p style="margin-top: 15px">
          Already have an Account?
          <a href="/login" style="text-decoration: underline; color: blue"
            >Login</a
          >
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
