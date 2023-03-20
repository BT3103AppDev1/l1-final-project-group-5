import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sell from "@/views/Sell.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sell",
    name: "Sell",
    component: Sell,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
