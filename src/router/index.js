import { createRouter, createWebHistory } from "vue-router"

import About from "../pages/About.vue"
import Cart from "../pages/Cart.vue"
import Checkout from "../pages/Checkout.vue"
import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Orders from "../pages/Orders.vue"
import Profile from "../pages/Profile.vue"
import Register from "../pages/Register.vue"
import Shop from "../pages/Shop.vue"
import NotFound from "../pages/NotFound.vue"

import Dashboard from "../pages/admin/Dashboard.vue"
import AdminProducts from "../pages/admin/Products.vue"
import AdminCategories from "../pages/admin/Categories.vue"
import HeroEditor from "../pages/admin/HeroEditor.vue"
import AdminOrders from "../pages/admin/Orders.vue"

import { auth } from "../stores/auth"

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
    component: About,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders,
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
  // Admin routes
  {
    path: "/admin",
    name: "AdminDashboard",
    component: Dashboard,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/products",
    name: "AdminProducts",
    component: AdminProducts,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/categories",
    name: "AdminCategories",
    component: AdminCategories,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/hero",
    name: "AdminHero",
    component: HeroEditor,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/orders",
    name: "AdminOrders",
    component: AdminOrders,
    meta: { requiresAdmin: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation guard for admin
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    if (!auth.isLoggedIn || !auth.isAdmin) {
      next({ path: "/login", query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
