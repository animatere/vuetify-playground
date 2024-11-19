import LandingPage from "@/components/LandingPage.vue";
import UserProfile from "@/components/user/UserProfile.vue";
import UserSettings from "@/components/user/UserSettings.vue";
import { createRouter, createWebHistory } from "vue-router";

import Forms from "@/components/pages/Forms.vue";
import Layout from "@/components/pages/Layout.vue";
import TableViews from "@/components/pages/TableViews.vue";
import Tasks from "@/components/task-management/Tasks.vue";
import ToDoApp from "@/components/todo/ToDoApp.vue";
import Login from "@/components/user/Login.vue";
import SignUp from "@/components/user/SignUp.vue";
import HomeView from "../views/HomeView.vue";
import WatchView from "@/views/WatchView.vue";
import PlayGroundView from "@/views/PlayGroundView.vue";
import PortalView from "@/views/PortalView.vue";
import Catplay from "@/components/playground/Catplay.vue";
import Counter from "@/components/playground/Counter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landingpage",
      component: LandingPage,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("authToken")) {
          next();
        } else {
          console.log("Already logged in.");
        }
      },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("authToken")) {
          next();
        } else {
          console.log("Already logged in.");
          next("/home");
        }
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("authToken")) {
          next();
        } else {
          console.log("Already logged in.");
          next("/home");
        }
      },
    },
    {
      path: "/watch",
      name: "watch",
      component: WatchView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/playground",
      name: "playground",
      component: PlayGroundView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/portal",
      name: "portal",
      component: PortalView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/catplay",
      name: "catplay",
      component: Catplay,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/counter",
      name: "counter",
      component: Counter,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/table-views",
      name: "tableViews",
      component: TableViews,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/layout",
      name: "layout",
      component: Layout,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/tasks",
      name: "tasks",
      component: Tasks,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/forms",
      name: "forms",
      component: Forms,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/todo",
      name: "todo",
      component: ToDoApp,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/user-settings",
      name: "user-settings",
      component: UserSettings,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/user-profile",
      name: "user-profile",
      component: UserProfile,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("authToken")) {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//
//   console.log("to", to);
//   console.log("from", from);
// })

export default router;
