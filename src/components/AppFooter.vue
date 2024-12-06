<template>
  <v-footer
    v-if="defaultUser.id"
    class="my-footer"
    :absolute="!isFullHeight"
    app
  >
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2 footer-button"
        color="black"
        rounded="xl"
        variant="text"
      >
        <p class="foot-links">{{ link }}</p>
      </v-btn>
      <v-col class="text-center mt-4" cols="12" style="color: black">
        {{ new Date().getFullYear() }} — <strong> by Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { checkUserLoggedin } from "./composable/checkUserLoggedin";
import { UserData } from "@/interfaces/interfaces";

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);
let defaultUser = ref<UserData>({
  id: "",
  username: "",
  email: "",
  password: "Test12345",
  loggedIn: false,
  registered: false,
});

watch(
  () => currentUser.value,
  (newCurrentUser) => {
    if (newCurrentUser.uid) {
      defaultUser.value = {
        id: newCurrentUser.uid.toString(),
        username: newCurrentUser.email?.split("@")[0],
        email: newCurrentUser.email as string,
        password: "Test12345",
        loggedIn: !!newCurrentUser, // placeholder
        registered: !newCurrentUser.emailVerified, // placeholder
      } as UserData;
    } else {
      defaultUser.value = {
        id: "",
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        registered: false,
      };
    }
  },
);

onMounted(async () => {
  try {
    defaultUser.value = await checkUserLoggedin();
  } catch (error: any) {
    console.error("Fehler bei userStore.checkAuth():", error);
  }
});

// Links im Footer
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];

// Dynamische Höhenberechnung für den Footer
const isFullHeight = computed(
  () => document.body.offsetHeight < window.innerHeight,
);
</script>

<style scoped>
.footer-button {
  color: black;
  width: 100px !important;
}

.my-footer {
  background-color: #4ea8de !important;
  width: 100%;
  height: auto !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.foot-links:hover {
  color: white;
}
</style>
