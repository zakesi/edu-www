import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const courseService = {
  item: function(id, params) {
    return request.get(API.courseItem(id), params);
  },
  recommand: function(params) {
    return request.get(API.courseRecommand, params);
  },
  sectionItem: function(id, params) {
    return request.get(API.sectionItem(id), params);
  }
};

export default courseService;
