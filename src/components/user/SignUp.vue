<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const email = ref("");
const username = ref("");
const password = ref("");
const store = useUserStore();
const { signup } = store;

function submitForm(submitEvent: Event) {
  submitEvent.preventDefault(); // Verhindert den Standard-Submit
  console.log("Username:", username.value);
  console.log("Email:", email.value);
  console.log("Password:", password.value);

  // Login-Funktion aufrufen mit den Werten
  signup({
    id: 0,
    username: username.value,
    email: email.value,
    password: password.value,
    loggedIn: false,
    registered: false,
  });
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
