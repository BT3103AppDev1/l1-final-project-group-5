import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sell from "@/views/Sell.vue";
import EditProfile from "@/views/EditProfile.vue";
import ProfileReviews from "@/views/ProfileReviewDisplay.vue";
import LogInDisplay from "@/views/LogInDisplay.vue";
import SignUpDisplay from "@/views/SignUpDisplay.vue";
const routes = [
  {
    path: "/",
    name: "LogInDisplay",
    component: LogInDisplay,
  },
  {
    path: "/signup",
    name: "SignUpDisplay",
    component: SignUpDisplay,
  },
  {
    path: "/home",
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
  {
    path: "/profilereviews",
    name: "ProfileReviews",
    component: ProfileReviews,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
