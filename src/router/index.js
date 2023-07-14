import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/Todolist_sec",
    name: "Todolist_sec",
    component: () => import("../views/Todolist_sec.vue"),
  },
  {
    path: "/Todolist_third",
    name: "Todolist_third",
    component: () => import("../views/Todolist_third.vue"),
  },
  {
    path: "/Companyweb1",
    name: "Companyweb1",
    component: () => import("../views/Companyweb1.vue"),
  },
  {
    path: "/Companyweb2",
    name: "Companyweb2",
    component: () => import("../views/Companyweb2.vue"),
  },
  {
    path: "/Companyweb3",
    name: "Companyweb3",//name与expexport default下的name无关，仅指左边的文件名
    component: () => import("../views/Companyweb3.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
