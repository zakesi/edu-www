import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const AuthService = {
  smsSend: function({ phone }) {
    return request.post(API.smsSend, {
      phone
    });
  },
  smsLogin: function({ phone, code }) {
    return request.post(API.smsLogin, {
      phone,
      code
    });
  },
  wechatAuthUrl: function(params) {
    return request.get(API.socialWechatUrl, params);
  },
  wechatAuth: function(params) {
    return request.get(API.socialWechat, params);
  }
};

export default AuthService;
