import { createRouter, createWebHistory } from "vue-router";

import About from "../pages/About.vue";
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Orders from "../pages/Orders.vue";
import Profile from "../pages/Profile.vue";
import Register from "../pages/Register.vue";
import Shop from "../pages/Shop.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;