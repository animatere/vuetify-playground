import Chat from "@/components/training/Chat.vue";
import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../../firebase";

import LandingPage from "@/components/LandingPage.vue";
import UserProfile from "@/components/user/UserProfile.vue";
import UserSettings from "@/components/user/UserSettings.vue";
import Layout from "@/components/training/Layout.vue";
import TableViews from "@/components/training/TableViews.vue";
import Tasks from "@/components/task-management/Tasks.vue";
import ToDoApp from "@/components/todo/ToDoApp.vue";
import Login from "@/components/user/Login.vue";
import SignUp from "@/components/user/SignUp.vue";
import Catplay from "@/components/training/Catplay.vue";
import Counter from "@/components/training/Counter.vue";
import ValidateForm from "@/components/training/ValidateForm.vue";
import { useUserStore } from "@/stores/UserStore";
import { onAuthStateChanged } from "firebase/auth";

import HomeView from "../views/HomeView.vue";
import ItemOverview from "@/components/shop/ItemOverview.vue";
import ItemSingleView from "@/components/shop/ItemSingleView.vue";

const requireAuth = (to: any, from: any, next: any) => {
  const userStore = useUserStore(); // UserStore nach Pinia-Registrierung aufrufen

  userStore.checkAuth();
  if (auth.currentUser) {
    next();
  } else {
    next("/");
  }
};

const onlyNotLoggedUser = (to: any, from: any, next: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next("/home");
    } else {
      next();
    }
  });
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landingpage",
      component: LandingPage,
      beforeEnter: onlyNotLoggedUser,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: onlyNotLoggedUser,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      beforeEnter: onlyNotLoggedUser,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
      beforeEnter: requireAuth,
    },
    // {
    //   path: "/training",
    //   name: "playground",
    //   component: PlayGroundView,
    //   beforeEnter: requireAuth,
    // },
    {
      path: "/catplay",
      name: "catplay",
      component: Catplay,
      beforeEnter: requireAuth,
    },
    {
      path: "/counter",
      name: "counter",
      component: Counter,
      beforeEnter: requireAuth,
    },
    {
      path: "/table-views",
      name: "tableViews",
      component: TableViews,
      beforeEnter: requireAuth,
    },
    {
      path: "/layout",
      name: "layout",
      component: Layout,
      beforeEnter: requireAuth,
    },
    {
      path: "/tasks",
      name: "tasks",
      component: Tasks,
      beforeEnter: requireAuth,
    },
    {
      path: "/validate-form",
      name: "validateForm",
      component: ValidateForm,
      beforeEnter: requireAuth,
    },
    {
      path: "/todo",
      name: "todo",
      component: ToDoApp,
      beforeEnter: requireAuth,
    },
    {
      path: "/user-settings",
      name: "user-settings",
      component: UserSettings,
      beforeEnter: requireAuth,
    },
    {
      path: "/user-profile",
      name: "user-profile",
      component: UserProfile,
      beforeEnter: requireAuth,
    },
    {
      path: "/shop-item-overview",
      name: "item-overview",
      component: ItemOverview,
      beforeEnter: requireAuth,
    },
    {
      path: "/shop-single-item",
      name: "item-single-view",
      component: ItemSingleView,
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
