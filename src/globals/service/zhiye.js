import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const zhiyeService = {
  item: function(id, params) {
    return request.get(API.zhiyeItem(id), params);
  },
  recommand: function(params) {
    return request.get(API.zhiyeRecommand, params);
  },
  index: function(params) {
    return request.get(API.zhiye, params);
  }
};

export default zhiyeService;
