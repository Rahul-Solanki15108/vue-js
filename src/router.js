import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/pages/HomePage"),
  },
  {
    path: "/products",
    alias: "/products",
    name: "products",
    component: () => import("./components/products/ProductsListing"),
  },
  {
    path: "/products/add",
    alias: "/products/add",
    component: () => import("./components/products/ProductAdd"),
  },
  {
    path: "/products/edit/:id",
    component: () => import("./components/products/ProductAdd"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
