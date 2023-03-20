import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sell from "@/views/Sell.vue";
import EditProfile from "@/views/EditProfile.vue";
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
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
