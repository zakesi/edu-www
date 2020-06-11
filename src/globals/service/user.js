import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const userService = {
  userInfo: function(params) {
    return request.get(API.userInfo, params);
  },
  updateUserInfo: function(params) {
    return request.put(API.userInfo, params);
  },
  updateResume: function(params) {
    return request.put(API.userResume, params);
  },
  showResume: function(id) {
    return request.get(API.userResumeInfo(id));
  }
};

export default userService;
