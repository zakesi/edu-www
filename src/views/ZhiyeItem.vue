<template>
  <div class="plan-page" v-loading="loading">
    <div class="banner-section">
      <div class="banner-title">
        {{ zhiye.name }}
      </div>
      <div class="banner-description">{{ zhiye.description }}</div>
    </div>
    <div class="path-section container-1080">
      <div class="path-content">
        <div class="path-content-title">学习路线</div>
        <div class="path-list" v-if="false">
          <div class="path-item">
            <div class="path-item-point active"></div>
            <div class="path-item-title">实习工程师</div>
            <div class="path-item-description">
              它的要求是基本的编程能力。基本的编程能力就是熟练地用计算机编程语言表达任何逻辑的能力。
            </div>
            <div class="path-courses-container">
              <div class="course-card">
                <div class="course-card-hd">
                  <div class="course-card-title">HTML</div>
                </div>
                <div class="course-card-bd">
                  <div class="course-card-desc">
                    HTML
                    全称超文本标记语言，它是网页构成的基础，我们见过的网页都离不开
                    HTML
                    代码。本课程从HTML代码的结构写法入手，了解常见的HMTL标签和属性，了及各类HTML标签的用法。通过案例结合，达到学以致用。
                  </div>
                </div>
              </div>
              <div class="course-card">
                <div class="course-card-hd">
                  <div class="course-card-title">HTML</div>
                </div>
                <div class="course-card-bd">
                  <div class="course-card-desc">
                    HTML
                    全称超文本标记语言，它是网页构成的基础，我们见过的网页都离不开
                    HTML
                    代码。本课程从HTML代码的结构写法入手，了解常见的HMTL标签和属性，了及各类HTML标签的用法。通过案例结合，达到学以致用。
                  </div>
                </div>
              </div>
              <div class="course-card">
                <div class="course-card-hd">
                  <div class="course-card-title">HTML</div>
                </div>
                <div class="course-card-bd">
                  <div class="course-card-desc">
                    HTML
                    全称超文本标记语言，它是网页构成的基础，我们见过的网页都离不开
                    HTML
                    代码。本课程从HTML代码的结构写法入手，了解常见的HMTL标签和属性，了及各类HTML标签的用法。通过案例结合，达到学以致用。
                  </div>
                </div>
              </div>
              <div class="course-card">
                <div class="course-card-hd">
                  <div class="course-card-title">HTML</div>
                </div>
                <div class="course-card-bd">
                  <div class="course-card-desc">
                    HTML
                    全称超文本标记语言，它是网页构成的基础，我们见过的网页都离不开
                    HTML
                    代码。本课程从HTML代码的结构写法入手，了解常见的HMTL标签和属性，了及各类HTML标签的用法。通过案例结合，达到学以致用。
                  </div>
                </div>
              </div>
              <div class="course-card">
                <div class="course-card-hd">
                  <div class="course-card-title">HTML</div>
                </div>
                <div class="course-card-bd">
                  <div class="course-card-desc">
                    HTML
                    全称超文本标记语言，它是网页构成的基础，我们见过的网页都离不开
                    HTML
                    代码。本课程从HTML代码的结构写法入手，了解常见的HMTL标签和属性，了及各类HTML标签的用法。通过案例结合，达到学以致用。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="path-list">
          <template v-for="path in paths">
            <div class="path-item" :key="path.id" v-if="path.courses.length">
              <div class="path-item-point"></div>
              <div class="path-item-title">
                {{ path.name }}
                <span class="path-item-description">{{
                  path.description
                }}</span>
              </div>
              <div class="path-courses-container">
                <template v-for="item in path.courses">
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
          </template>
        </div>
      </div>
      <div class="path-sider">
        <div class="path-nav-list" v-if="false">
          <div class="path-nav-item active">实习工程师</div>
          <div class="path-nav-item">初级工程师</div>
          <div class="path-nav-item">中级工程师</div>
          <div class="path-nav-item">高级工程师</div>
        </div>
        <div class="path-nav-list">
          <div class="path-nav-item" v-for="path in paths" :key="path.id">
            {{ path.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import zhiyeService from "@/globals/service/zhiye";
import BasicCardCourse from "@/components/BasicCardCourse.vue";
export default {
  name: "Home",
  components: {
    "basic-course": BasicCardCourse
  },
  data() {
    return {
      loading: true,
      zhiye: {},
      paths: []
    };
  },
  created() {
    const id = this.$route.params.id;
    zhiyeService
      .item(id)
      .then(res => {
        this.zhiye = res.zhiye;
        this.paths = res.zhiye.zhiye_paths;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style type="text/css" lang="less" scoped>
.plan-page {
  background-color: #f5f7f8;
}
.banner-section {
  height: 280px;
  background: #252321 url(~@/assets/images/common/banner/banner-combat.jpg)
    no-repeat center top;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .banner-title {
    height: 40px;
    line-height: 40px;
    font-size: 60px;
    font-weight: 500;
    color: #fff;
  }
  .banner-description {
    width: 818px;
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
}
.path-section {
  display: flex;
  padding: 20px 0;
  .path-content {
    flex: 1;
    margin-right: 20px;
    padding: 40px 20px 100px 20px;
    background: #fff;
    border-radius: 8px;

    .path-content-title {
      position: relative;
      padding-left: 15px;
      font-size: 18px;
      font-weight: 500;
      color: #333;
      &:after {
        content: "";
        position: absolute;
        top: 6px;
        left: 0;
        width: 3px;
        height: 18px;
        background: #000;
      }
    }
  }
  .course-item {
    display: inline-block;
    margin-right: 12px;
    margin-top: 12px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  .path-sider {
    position: sticky;
    top: 20px;
    width: 236px;
    height: 30px;
    .path-nav-list {
      width: 100%;
      margin-bottom: 30px;
      padding: 32px 20px;
      background: #fff;
      border-radius: 8px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .path-nav-item {
      height: 37px;
      line-height: 37px;
      padding: 0 20px 0 10px;
      font-size: 13px;
      font-weight: 500;
      color: #4c4c4c;
      border-radius: 5px;
      cursor: pointer;
      &.active {
        background: #000;
        color: #fff;
      }
    }
  }
  .path-list {
    margin-top: 20px;
    .path-item {
      position: relative;
      padding-bottom: 14px;
    }
    .path-item-point {
      position: absolute;
      left: -4px;
      top: 15px;
      width: 11px;
      height: 11px;
      border: 3px solid #333;
      border-radius: 50%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      &:after {
        content: "";
        position: absolute;
        z-index: 10;
        top: -7px;
        left: -7px;
        width: 19px;
        height: 19px;
        border: 4px solid #f1f1f1;
        border-radius: 50%;
        box-sizing: border-box;
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.3s linear,
          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      &.active {
        &:after {
          opacity: 0;
          transform: scale(2);
        }
      }
    }
    .path-item-title {
      margin-left: 28px;
      padding: 7px 20px;
      background: #f6f7fb;
      border-radius: 21px;
      cursor: pointer;
      user-select: none;
      font-size: 16px;
      font-weight: 500;
      color: #353535;
    }
    .path-item-description {
      margin-left: 12px;
      font-size: 14px;
      font-weight: 400;
      color: #4c4c4c;
      &:before {
        content: "/";
        margin-right: 12px;
      }
    }
  }
  .path-courses-container {
    // padding-left: 8px;

    .course-card {
      margin-top: 12px;
      margin-left: 12px;
    }
  }
}

.course-card {
  display: inline-block;
  width: 250px;
  background-color: #fff;
  border: 1px solid #333;
  cursor: pointer;

  .course-card-hd {
    height: 90px;
    padding: 25px 15px;
    overflow: hidden;
    background: url(~@/assets/images/common/course-bg.png) no-repeat center /
      cover;
  }
  .course-card-title {
    font-size: 24px;
    line-height: 40px;
    overflow: hidden;
    color: #fff;
  }
  .course-card-bd {
    padding: 15px;
  }
  .course-card-desc {
    font-size: 14px;
    color: #666;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }
}
</style>
