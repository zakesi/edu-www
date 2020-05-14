import Home from "../views/Home.vue";
import Course from "../views/Course.vue";
import Project from "../views/Project.vue";
import Evaluation from "../views/Evaluation.vue";
import My from "../views/My.vue";
import Setting from "../views/Setting.vue";
import AuthPhoneLogin from "../views/AuthPhoneLogin.vue";
import AuthSocialWechat from "../views/AuthSocialWechat.vue";
import BasicLayout from "@/components/BasicLayout.vue";

const routes = [
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "Home" },
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/course",
        name: "Course",
        component: Course
      },
      {
        path: "/project",
        name: "Project",
        component: Project
      },
      {
        path: "/evaluation",
        name: "Evaluation",
        component: Evaluation
      },
      {
        path: "/my",
        name: "My",
        component: My
      },
      {
        path: "/setting",
        name: "Setting",
        component: Setting
      }
    ]
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
