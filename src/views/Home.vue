<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-section">
      <div class="container-1080">
        <el-carousel height="320px">
          <el-carousel-item v-for="item in banners" :key="item.id">
            <a
              class="banner-carousel-item"
              target="_blank"
              :href="item.redirect_url"
              :style="{
                backgroundImage: 'url(' + item.cover_file_path + ')'
              }"
            ></a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="course-section">
      <div class="container-1080">
        <div class="section-title">最新课程</div>
        <div class="section-description">最新的课程是最好的课程</div>
        <div class="course-content">
          <template v-for="item in courses">
            <router-link
              :key="item.id"
              class="course-item"
              :to="{ name: 'CourseItem', params: { id: item.id } }"
            >
              <basic-course :data="item" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
    <div class="stack-section">
      <div class="container-1080">
        <div class="section-title">技能测评</div>
        <div class="section-description">测评每天刷一刷</div>
        <div class="stack-content">
          <template v-for="item in stacks">
            <router-link
              :key="item.id"
              class="stack-item"
              :to="{ name: 'EvaluationItem', params: { id: item.id } }"
            >
              <basic-stack :data="item" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseService from "@/globals/service/course.js";
import stackService from "@/globals/service/stack.js";
import BasicCardCourse from "@/components/BasicCardCourse.vue";
import BasicCardStack from "@/components/BasicCardStack.vue";

export default {
  name: "Home",
  components: {
    "basic-course": BasicCardCourse,
    "basic-stack": BasicCardStack
  },
  data() {
    return {
      loading: true,
      courses: [],
      stacks: [],
      banners: [
        {
          id: 1,
          redirect_url: "https://www.jiker.com",
          cover_file_path:
            "https://assets.jiker.com/_for_plus_sub_project/2020/0331/admin/2rU8Lcm35OOpApzdzLuHkH3gKZZqxyIqRp6MKBvQ.png"
        },
        {
          id: 2,
          redirect_url: "https://www.jiker.com",
          cover_file_path:
            "https://vip-assets.jiker.com/_for_plus_sub_project/2020/0324/admin/DPMXDSg6Xij7jS9UGvFoAbirTl5gbRwHh3DLIGGX.jpg"
        },
        {
          id: 3,
          redirect_url: "https://www.jiker.com",
          cover_file_path:
            "https://assets.jiker.com/_for_plus_sub_project/2020/0318/admin/HI5e00CUKRQy5QBgRwqf4zeniVFNglSAInctR0XI.jpg"
        }
      ]
    };
  },
  created() {
    Promise.all([
      courseService.recommand(),
      stackService.recommand({ count: 16 })
    ])
      .then(([courseRes, stackRes]) => {
        this.courses = courseRes.courses;
        this.stacks = stackRes.stacks;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  padding: 20px 0 80px;
}
.section-title {
  font-size: 20px;
  color: #333;
  line-height: 20px;
  margin-top: 40px;
  margin-bottom: 10px;
}
.section-description {
  font-size: 14px;
  color: #666;
  line-height: 14px;
  margin-bottom: 20px;
}
.banner-section {
  .banner-carousel-item {
    height: 100%;
    display: block;
    background-color: #f1f1f1;
    background-position: center;
    // background-repeat: no-repeat;
    background-size: cover;
  }
}
.course-section {
  .course-content {
    display: flex;
    flex-wrap: wrap;
  }
  .course-item {
    margin-right: 16px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-child(n + 5) {
      margin-top: 16px;
    }
  }
}
.stack-section {
  .stack-item {
    display: inline-block;
    margin-right: 8px;
    margin-top: 8px;
    &:nth-child(8n) {
      margin-right: 0;
    }
    &:nth-child(-n + 8) {
      margin-top: 8px;
    }
  }
}
</style>
