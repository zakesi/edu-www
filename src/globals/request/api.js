const PREFIX_API = "https://neon.jiker.vip/api";
// const PREFIX_API = "http://127.0.0.1:7001/api";

export default {
  smsSend: `${PREFIX_API}/sms/send`,
  smsLogin: `${PREFIX_API}/sms/login`,
  qiniuToken: `${PREFIX_API}/qiniu/token`,
  socialWechat: `${PREFIX_API}/auth/social/wechat`,
  socialWechatUrl: `${PREFIX_API}/auth/social/wechat/url`,
  userInfo: `${PREFIX_API}/user/user-info`,
  userWechatBind: `${PREFIX_API}/user/wechat-bind`,
  userPhoneBind: `${PREFIX_API}/user/phone-bind`,
  userResume: `${PREFIX_API}/user/resume`,
  userResumeInfo: id => `${PREFIX_API}/user/resume/${id}`,
  courseRecommand: `${PREFIX_API}/course/www-recommand`,
  courseItem: id => `${PREFIX_API}/course/${id}`,
  sectionItem: id => `${PREFIX_API}/section/${id}`,
  zhiye: `${PREFIX_API}/zhiye`,
  zhiyeRecommand: `${PREFIX_API}/zhiye/www-recommand`,
  zhiyeItem: id => `${PREFIX_API}/zhiye/${id}`,
  stack: `${PREFIX_API}/stack`,
  stackRecommand: `${PREFIX_API}/stack/www-recommand`,
  stackRandom: id => `${PREFIX_API}/stack/${id}/random`
};
