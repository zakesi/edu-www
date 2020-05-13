// const PREFIX_API = "https://neon.jiker.vip/api";
const PREFIX_API = "http://127.0.0.1:7001/api";

export default {
  smsSend: `${PREFIX_API}/sms/send`,
  smsLogin: `${PREFIX_API}/sms/login`,
  socialWechat: `${PREFIX_API}/auth/social/wechat`,
  socialWechatUrl: `${PREFIX_API}/auth/social/wechat/url`
};
