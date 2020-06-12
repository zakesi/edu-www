<template>
  <el-aside class="page-sider" style="width:100%;height:100%">
    <div class="user-info">
      <div class="user-avatar">
        <img class="user-avatar-png" :src="userInfo.avatar_url" />
      </div>
      <p class="user-name">{{ userInfo.name }}</p>
      <p class="user-status">{{ userInfo.introduction }}</p>
    </div>
    <div class="user-info">
      <div class="user-info-title">个人信息</div>
      <div class="user-info-text" v-if="job">
        <i class="el-icon-wind-power"></i>
        <span>应聘职位：{{ job }}</span>
      </div>
      <div class="user-info-text" v-if="userInfo.birthday">
        <i class="el-icon-present"></i>
        <span>出生年月：{{ yyyymmdd(userInfo.birthday) }}</span>
      </div>
      <div class="user-info-text" v-if="city.length">
        <i class="el-icon-position"></i>
        <span>意向城市：{{ city | joinArray }}</span>
      </div>
      <div class="user-info-text" v-if="userInfo.phone">
        <i class="el-icon-mobile-phone"></i>
        <span>联系方式：{{ userInfo.phone }}</span>
      </div>
    </div>
    <div class="user-info" v-if="experience.length">
      <div class="user-info-title">实习经历</div>
      <div v-for="(item, index) in experience" :key="index">
        <div class="user-info-text">
          <i class="el-icon-office-building"></i>
          <span>{{ item.company }}</span>
        </div>
        <div class="user-info-text">
          <i class="el-icon-time"></i>
          <span>{{ (item.date || []).join("-") }}</span>
        </div>
        <div class="user-info-text content">
          <i class="el-icon-suitcase"></i>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script>
import moment from "@/utils/moment.js";

export default {
  name: "ResumeSider",
  mixins: [moment],
  props: {
    job: {
      type: String
    },
    city: {
      type: Array,
      default: function() {
        return [];
      }
    },
    experience: {
      type: Array,
      default: function() {
        return [];
      }
    },
    userInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  filters: {
    joinArray(val) {
      return val.join("、");
    }
  }
};
</script>

<style type="text/css" lang="less">
::-webkit-scrollbar {
  width: 10px;
  background-color: #c0c0c0;
}
::-webkit-scrollbar-thumb {
  background-color: #808080;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #808080;
}
::-webkit-scrollbar-thumb:active {
  background-color: #a0522d;
}
::-webkit-scrollbar-thumb:window-inactive {
  background-color: #808080;
}
.page-sider {
  position: relative;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: all 0.2s ease;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  .user-info {
    margin: 20px 0;
    width: 250px;
    .user-info-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .user-info-text {
      font-size: 14px;
      line-height: 2;
      i {
        margin-right: 8px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
      &.content {
        display: flex;
        margin-bottom: 15px;
        i {
          margin-top: 6px;
        }
        p {
          margin: 0;
        }
      }
    }
  }
  .user-avatar {
    .user-avatar-png {
      display: block;
      width: 110px;
      height: 110px;
      margin: 0 auto 20px;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
      border-radius: 50%;
      object-fit: contain;
    }
  }
  .user-name {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    line-height: 25px;
  }
  .user-status {
    margin: 8px 0 0 0;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
}
</style>
