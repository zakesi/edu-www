import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import DataStore from "@/globals/storage/index";
import userService from "@/globals/service/user.js";
import Store from "@/store/index";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.firstInit = false;
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;
  const TOKEN = DataStore.getToken();
  // 已经登录的，登录页面自动去首页
  if (TOKEN && to.name === "AuthPhoneLogin") {
    next({ name: "Home", replace: true });
    NProgress.done();
    return;
  }
  if (TOKEN && !router.firstInit) {
    router.firstInit = true;
    try {
      const { userInfo } = await userService.userInfo();
      // 防止线上和本地的 jwt 解密的 Key 一样导致获取用户异常
      if (!userInfo) {
        DataStore.removeToken();
        window.location.reload();
      }
      Store.commit("USERINFO", userInfo || {});
    } catch {
      next();
    }
  }
  next();
});
// eslint-disable-next-line
router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
