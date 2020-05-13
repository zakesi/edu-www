import Home from "../views/Home.vue";
import AuthPhoneLogin from "../views/AuthPhoneLogin.vue";
import AuthSocialWechat from "../views/AuthSocialWechat.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "AuthPhoneLogin",
    component: AuthPhoneLogin
  },
  {
    path: "/social/wechat",
    name: "AuthSocialWechat",
    component: AuthSocialWechat
  }
];

export default routes;
