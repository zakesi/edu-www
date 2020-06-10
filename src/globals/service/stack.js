import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const userService = {
  index: function(params) {
    return request.get(API.stack, params);
  },
  random: function(id, params) {
    return request.get(API.stackRandom(id), params);
  }
};

export default userService;
