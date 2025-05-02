<template>
  <!-- navbar for logged in user -->
  <nav v-if="defaultUser.id" class="navbar">
    <div class="navbar-logo">
      <router-link to="/home">
        <img
          src="https://vuejs.org/images/logo.png"
          alt="Logo"
          class="logo"
          style="width: 35px; height: 35px"
        />
      </router-link>
      <router-link to="/home">
        <h4 class="pageTitle" style="color: black">Vue3 Training</h4>
      </router-link>
    </div>
    <div class="navbar-links">
      <router-link to="/home" class="nav-item">Home</router-link>
      <router-link to="/collector" class="nav-item">Collector</router-link>


      <!-- <div class="dropdown">
        <router-link to="/playground" class="nav-item" @click="closeDropdown">
          Training
        </router-link>
        <div class="dropdown-content" style="background-color: #4ea8de">
          <router-link
            to="/counter"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Counter
          </router-link>
          <router-link
            to="/catplay"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Catplay
          </router-link>
          <router-link to="/tasks" class="dropdown-item" @click="closeDropdown">
            Tasks
          </router-link>
          <router-link
            to="/validate-form"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Validate Forms
          </router-link>
          <router-link to="/todo" class="dropdown-item" @click="closeDropdown">
            ToDo
          </router-link>
          <router-link
            to="/layout"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Layout
          </router-link>
          <router-link to="/chat" class="dropdown-item" @click="closeDropdown">
            Chat
          </router-link>
          <router-link
            to="/table-views"
            class="dropdown-item"
            @click="closeDropdown"
          >
            TableViews
          </router-link>
        </div>
      </div> -->

      <div class="dropdown">
        <router-link to="/playground" class="nav-item" @click="closeDropdown">
          Shop
        </router-link>
        <div class="dropdown-content" style="background-color: #4ea8de">
          <router-link
            to="/shop-item-overview"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Item-overview
          </router-link>
          <router-link
            to="/shop-single-item"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Single-Item
          </router-link>
          <router-link
            to="/shop-payment-page"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Payment Page
          </router-link>

          <router-link
            to="/chat-bot"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Chatbot
          </router-link>
        </div>
      </div>

      <div class="dropdown">
        <router-link to="/qh-landing" class="nav-item" @click="closeDropdown">
          QuestHub
        </router-link>
        <div class="dropdown-content" style="background-color: #4ea8de">
          <router-link
            to="/qh-landing"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Landing Page
          </router-link>

          <router-link
            to="/qh-quests"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Quests
          </router-link>
        </div>
      </div>

      <div class="user-dropdown">
        <v-icon
          class="mdi-account toggleUserMenu"
          icon="mdi-user"
          @click="toggleUserMenu"
        ></v-icon>
        <div
          v-if="userMenuOpen"
          style="width: 150px; right: 0"
          class="user-dropdown-menu"
        >
          <router-link
            to="/user-profile"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Profile
          </router-link>
          <router-link
            to="/user-settings"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Settings
          </router-link>
          <router-link
            to="/purchase-history"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Bestellhistorie
          </router-link>
          <router-link
            to="/admin-dashboard"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Admin Dashboard
          </router-link>
          <router-link
            to="/work-schedule"
            class="dropdown-item"
            @click="closeDropdown"
          >
            Schichtplan
          </router-link>
          <p @click="logoutClicked" class="dropdown-item logout-button">
            <v-icon
              class="mdi-account"
              icon="mdi-logout"
              @click="toggleUserMenu"
            ></v-icon>
            Logout
          </p>
        </div>
      </div>
    </div>

    <div class="navbar-menu" @click="toggleMenu">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </div>

    <p @click="logoutClicked" class="logout-btn">
      <v-icon
        class="mdi-account logout-button"
        icon="mdi-logout"
        value="Logout"
      ></v-icon>
    </p>

    <div v-if="menuOpen" class="navbar-dropdown">
      <router-link to="/home" class="dropdown-item" @click="closeDropdown"
        >Home</router-link
      >
      <router-link to="/watch" class="dropdown-item" @click="closeDropdown"
        >Watch</router-link
      >
      <router-link
        to="/table-views"
        class="dropdown-item"
        @click="closeDropdown"
        >TableViews</router-link
      >
      <router-link to="/layout" class="dropdown-item" @click="closeDropdown"
        >Layout</router-link
      >
      <router-link to="/tasks" class="dropdown-item" @click="closeDropdown"
        >Tasks</router-link
      >
      <router-link to="/forms" class="dropdown-item" @click="closeDropdown"
        >Forms</router-link
      >
      <router-link to="/todo" class="dropdown-item" @click="closeDropdown"
        >ToDo</router-link
      >
      <router-link
        to="/user-profile"
        class="dropdown-item"
        @click="closeDropdown"
        >Profile</router-link
      >
      <router-link
        to="/user-settings"
        class="dropdown-item"
        @click="closeDropdown"
        >Settings</router-link
      >
    </div>
  </nav>

  <!-- navbar for not logged in user -->
  <nav v-else class="navbar">
    <router-link to="/home" style="text-decoration: none">
      <v-icon class="mdi-account" icon="mdi-home"></v-icon>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { auth } from "../../firebase";
import { useRouter } from "vue-router";
import { UserData } from "@/interfaces/interfaces";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import { getCurrentUserData } from "./composable/getCurrentUserData";

const menuOpen = ref(false);
const userMenuOpen = ref(false);
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const router = useRouter();
let defaultUser = ref<UserData>({
  id: "",
  username: "",
  email: "",
  password: "",
  loggedIn: false,
  registered: false,
});

onMounted(async () => {
  try {
    await userStore.checkAuth();
    defaultUser.value = await getCurrentUserData();
  } catch (error: any) {
    console.error("Fehler bei userStore.checkAuth():", error);
  }
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

// Logout-Funktion
async function logoutClicked() {
  await auth.signOut();
  router.push("/login");
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
}

function closeDropdown() {
  menuOpen.value = false;
  userMenuOpen.value = false;
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Alle Elemente werden vertikal ausgerichtet */
  padding: 1rem 2rem;
  background-color: #4ea8de;
  color: #333;
  position: relative;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100vw;
  z-index: 5;
  height: 10vh;
}

.navbar-logo {
  display: flex; /* Flexbox aktivieren */
  align-items: center; /* Logo und Text auf gleicher Höhe */
}

.navbar-logo a {
  color: #333;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex; /* Flexbox aktivieren */
  align-items: center; /* Text und Logo vertikal ausrichten */
}

.navbar-logo img {
  margin-right: 8px; /* Abstand zwischen Logo und Text */
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  align-items: center; /* Links und Buttons vertikal ausrichten */
}

.navbar-links .nav-item {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.navbar-links .nav-item:hover {
  color: white;
}

.v-btn {
  display: inline-flex; /* Flexbox aktivieren für die Buttons */
  align-items: center; /* Buttons werden auf gleicher Höhe mit anderen Elementen angezeigt */
}

/* Dropdown-Styles */
.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: -50px;
  background-color: #ffffff;
  min-width: 160px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  border-radius: 5px;
  z-index: 1;
}

.dropdown-content .dropdown-item {
  color: #333;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: block;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.dropdown-content .dropdown-item:hover {
  background-color: #4ea8de;
  color: white;
}

/* Dropdown anzeigen beim Hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Hamburger Menü für Mobile */
.navbar-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  z-index: 1001; /* Falls das Menü hinter anderen Elementen verborgen wird */
}

.navbar-menu span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease;
}

.navbar-menu .open:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.navbar-menu .open:nth-child(2) {
  opacity: 0;
}

.navbar-menu .open:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

.navbar-dropdown {
  display: grid; /* Verwende ein Grid für das Layout */
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Kacheln mit automatischer Anpassung */
  gap: 10px; /* Abstand zwischen den Kacheln */
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #4cacaf;
  padding: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 8px; /* Abgerundete Ecken */
}

.navbar-dropdown .dropdown-item {
  display: flex; /* Flexbox aktivieren, um Text und Icon zu positionieren */
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
  color: #333;
  border-radius: 8px; /* Abgerundete Ecken für die Kacheln */
  text-decoration: none;
  font-size: 1.2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Leichter Schatten für Kacheln */
  transition:
    transform 0.3s,
    box-shadow 0.3s; /* Animierte Übergänge */
}

.navbar-dropdown .dropdown-item:hover {
  color: white;
  transform: scale(1.05);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  background-color: #4ea8de;
}

/* User Dropdown */
.user-dropdown {
  position: relative;
  cursor: pointer;
}

.user-dropdown p {
  font-size: 15px !important;
}

.user-dropdown router-link {
  font-size: 15px !important;
}

.user-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #4ea8de;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 5px;
  z-index: 1;
}

.user-dropdown:hover .user-dropdown-menu {
  display: block;
  background-color: #4ea8de;
  color: white;
}

.user-dropdown-menu .dropdown-item {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  font-size: 0.9rem;
}

/* Dropdown anzeigen beim Hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.user-dropdown-menu .dropdown-item:hover {
  background-color: #4ea8de;
  color: white;
}

.logout-btn {
  display: none;
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }

  .navbar-menu {
    display: flex;
  }

  .logout-btn {
    display: inline;
    cursor: pointer;
  }

  .navbar-logo {
    display: none;
  }
}

@media (max-width: 1170px) {
  .pageTitle {
    display: none;
  }
}
</style>
