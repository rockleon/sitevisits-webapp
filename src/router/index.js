import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   redirect: "/events",
  //   meta: {
  //     requiresAuth: false,
  //   },
  // },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("../views/Projects.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: "/events/:eventId",
  //   name: "EventDetail",
  //   props: true,
  //   component: () => import("../views/User/EventDetail.vue"),
  //   meta: {
  //     requiresAuth: false,
  //   },
  // }
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
      next("/");
    }
  } else {
    next();
  }
});

export default router;
