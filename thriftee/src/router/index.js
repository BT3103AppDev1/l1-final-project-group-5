import { createRouter, createWebHistory } from "vue-router";
import Sell from "@/views/Sell.vue";
import EditProfile from "@/views/EditProfile.vue";
import ProfileListingDisplay from "@/views/ProfileListingDisplay.vue";
import ProfileReviewDisplay from "@/views/ProfileReviewDisplay.vue";
import ProfileDealsDisplay from "@/views/ProfileDealsDisplay.vue";
import LogInDisplay from "@/views/LogInDisplay.vue";
import SignUpDisplay from "@/views/SignUpDisplay.vue";
import ForgetPasswordDisplay from "@/views/ForgetPasswordDisplay.vue";
import AllListings from "@/views/AllListings.vue";

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
    path: "/forgetpassword",
    name: "ForgetPasswordDisplay",
    component: ForgetPasswordDisplay,
  },
  {
    path: "/profilelistings",
    name: "ProfileListings",
    component: ProfileListingDisplay,
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
    component: ProfileReviewDisplay,
  },
  {
    path: "/deals",
    name: "Deals",
    component: ProfileDealsDisplay,
  },
  {
    path: "/explore",
    name: "Explore",
    component: AllListings,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
