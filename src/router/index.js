import Vue from "vue"
import Router from "vue-router"
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue"
import Livestream from "../views/Livestream.vue"
import ApiLivepeer from "../views/ApiLivepeer.vue"

import {
  authGuard
} from "../auth"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/livestream",
    name: "livestream",
    component: Livestream
  },
  {
    path: "/api-livepeer",
    name: "api-livepeer",
    component: ApiLivepeer
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: authGuard
  }
  ]
});

export default router