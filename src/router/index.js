import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { requiresAuth: false },
    component: () => import("@/views/HomeView"),
    
  },
  {
    path: "/about",
    name: "about",
    meta: { requiresAuth: false },
    component: () => import("@/views/AboutPage"),
    
  },
  {
    path: "/sign-up",
    name: "sign-up",
    meta: { requiresAuth: false },
    component: () => import("@/components/Auth/SignUp"),
  },
  {
    path: "/sign-in",
    name: "sign-in",
    meta: { requiresAuth: false },
    component: () => import("@/components/Auth/SignIn"),
  },
  {
    path: "/member",
    name: "member",
    meta: { requiresAuth: true },
    component: () => import("@/views/MemberPage"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'sign-in' });
  } else if (!requiresAuth && isAuthenticated) {
    next();
}else {
    next();
  }
});

export default router;
