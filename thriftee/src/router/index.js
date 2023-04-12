import { createRouter, createWebHistory } from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Sell from "@/views/Sell.vue";
import EditProfile from "@/views/EditProfile.vue";
import ProfileListingDisplay from "@/views/ProfileListingDisplay.vue";
import ProfileReviewDisplay from "@/views/ProfileReviewDisplay.vue";
import ProfileDealsDisplay from "@/views/ProfileDealsDisplay.vue";
import LogInDisplay from "@/views/LogInDisplay.vue";
import SignUpDisplay from "@/views/SignUpDisplay.vue";
import ForgetPasswordDisplay from "@/views/ForgetPasswordDisplay.vue";
import AllListings from "@/views/AllListings.vue";
import ViewListing from "@/views/ViewListing.vue";
import CustomerProfileView from "@/views/CustomerProfileView.vue";
import CreateReviewView from "@/views/CreateReviewView.vue";
import CustomerReviewView from "@/views/CustomerReviewView.vue";
import EditListingView from "@/views/EditListingView.vue"

const auth = getAuth();

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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/sell",
    name: "Sell",
    component: Sell,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profilereviews",
    name: "ProfileReviews",
    component: ProfileReviewDisplay,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/sellerprofile-:sellerid",
    name: "CustomerProfileView",
    component: CustomerProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/sellerreview-:sellerid",
    name: "CustomerReviewView",
    component: CustomerReviewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/review-:listingid-:revieweeid:isbuyer",
    name: "CreateReviewView",
    component: CreateReviewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/deals",
    name: "Deals",
    component: ProfileDealsDisplay,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/explore",
    name: "Explore",
    component: AllListings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/viewListing-:listingid",
    name: "ViewListing",
    component: ViewListing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:"/editlistings-:listingid", 
    name: "EditListing", 
    component: EditListingView, 
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "AllListings",
    component: AllListings,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        next({ name: 'LogInDisplay' });
      } else {
        next()
      }
    })
  } else {
    next()
  }
    
});

export default router;
