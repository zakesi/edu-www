import Home from "../views/Home.vue";
import Zhiye from "../views/Zhiye.vue";
import ZhiyeItem from "../views/ZhiyeItem.vue";
import CourseItem from "../views/CourseItem.vue";
import CourseSection from "../views/CourseSection.vue";
import Project from "../views/Project.vue";
import Evaluation from "../views/Evaluation.vue";
import EvaluationItem from "../views/EvaluationItem.vue";
import My from "../views/My.vue";
import Setting from "../views/Setting.vue";
import ResumeSetting from "../views/ResumeSetting.vue";
import Resume from "../views/Resume.vue";
import AuthPhoneLogin from "../views/AuthPhoneLogin.vue";
import AuthSocialWechat from "../views/AuthSocialWechat.vue";
import AuthSocialWechatBind from "../views/AuthSocialWechatBind.vue";
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
        path: "/zhiye",
        name: "Zhiye",
        component: Zhiye
      },
      {
        path: "/zhiye/:id",
        name: "ZhiyeItem",
        component: ZhiyeItem
      },
      {
        path: "/course/:id",
        name: "CourseItem",
        component: CourseItem
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
        path: "/evaluation/:id",
        name: "EvaluationItem",
        component: EvaluationItem
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
      },
      {
        path: "/resume/setting",
        name: "ResumeSetting",
        component: ResumeSetting
      }
    ]
  },
  {
    path: "/course/:courseId/:chapterId/:sectionId",
    name: "CourseSection",
    component: CourseSection
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
  },
  {
    path: "/social/wechat-bind",
    name: "AuthSocialWechatBind",
    component: AuthSocialWechatBind
  },
  {
    path: "/resume/:id",
    name: "Resume",
    component: Resume
  }
];

export default routes;
