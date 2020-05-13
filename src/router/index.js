import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import DataStore from "@/globals/storage/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;
  const TOKEN = DataStore.getToken();
  // 已经登录的，登录页面自动去首页
  if (TOKEN && to.name === "Login") {
    next({ name: "Home", replace: true });
    NProgress.done();
    return;
  }
  next();
});

// eslint-disable-next-line
router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
