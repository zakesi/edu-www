<template>
  <div class="home-page">
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
              <basic-course class="course-item" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicCardCourse from "@/components/BasicCardCourse.vue";
export default {
  name: "Home",
  components: {
    "basic-course": BasicCardCourse
  },
  data() {
    return {
      courses: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
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
    justify-content: space-between;
  }
}
</style>
