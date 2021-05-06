import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    const token = localStorage.getItem("SITEVISITS_TOKEN");
    if (token && token !== "undefined") {
      next();
    } else {
      next("login");
    }
  } else {
    next();
  }
});

export default router;
