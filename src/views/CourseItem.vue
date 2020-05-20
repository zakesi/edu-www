<template>
  <div class="course-page">
    <div class="container-1080" v-loading="loading">
      <div class="course-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'Course' }"
            >视频课</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ course.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="course-information">
        <div class="course-information-left">
          <img class="course-img" :src="course.image_url" />
        </div>
        <div class="course-information-right">
          <div class="course-name">{{ course.name }}</div>
          <div class="course-description">{{ course.description }}</div>
        </div>
      </div>
      <div class="course-content">
        <div class="course-catelog" v-if="course.chapters">
          <div
            class="course-catelog-dl"
            v-for="item in course.chapters"
            :key="item.id"
          >
            <div class="course-catelog-dt">{{ item.name }}</div>
            <template v-for="data in item.sections">
              <div class="course-catelog-dd" :key="data.id">
                <div class="course-catelog-title">{{ data.name }}</div>
                <div class="course-catelog-ft">开始学习</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      course: {
        id: 1,
        name: "HTML",
        short_name: "HTML 基础",
        tips: "Web 入门必修课",
        description: "HTML 描述",
        status: 1,
        image_url:
          "https://q2.cdn.youked.com/jingpin/2018/1224/RFah3LhRjuzG55LUBgzY5zhBm0S46ptkg0Q7aGSi.png",
        chapters: [
          {
            id: 1,
            name: "第一章",
            sections: [
              {
                id: 1,
                name: "第一节"
              },
              {
                id: 2,
                name: "第二节"
              }
            ]
          },
          {
            id: 2,
            name: "第二章",
            sections: [
              {
                id: 3,
                name: "第三节"
              }
            ]
          }
        ]
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    getData() {}
  }
};
</script>

<style type="text/css" lang="less" scoped>
.course-page {
  padding-bottom: 20px;
}
.course-breadcrumb {
  padding: 20px 0;
}
.course-information {
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
  min-height: 240px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.04);

  .course-information-left {
    position: relative;
    margin-right: 20px;
    width: 300px;
    height: 200px;
    background-color: #f9f9f9f9;
    overflow: hidden;
    flex: none;
    .course-img {
      position: absolute;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .course-information-right {
    flex: 1;
    .course-name {
      margin-bottom: 18px;
      font-size: 20px;
      line-height: 20px;
      color: #333;
    }
    .course-description {
      font-size: 14px;
      color: #666;
      line-height: 24px;
      min-height: 80px;
      margin-bottom: 25px;
    }
  }
}
.course-content {
  display: flex;
  .course-catelog {
    flex: 1;
    .course-catelog-dl {
      margin-bottom: 16px;
      background: #fff;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.04);
      border-radius: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .course-catelog-dt {
      font-size: 16px;
      line-height: 16px;
      color: #666;
      padding: 20px;
    }
    .course-catelog-dd {
      position: relative;
      padding: 17px 20px;
      padding-left: 44px;
      font-size: 14px;
      line-height: 14px;
      color: #333;
      cursor: pointer;
      height: 48px;
      overflow: hidden;
      display: flex;
      align-items: center;
      &:hover {
        background: rgba(247, 247, 247, 1);

        .course-catelog-btn {
          display: inline-block;
        }

        .course-catelog-time {
          display: none;
        }
        .course-catelog-progress {
          visibility: hidden;
        }
      }
    }
    .course-catelog-title {
      flex: 1;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .course-catelog-progress {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -10px;
      // width: 350px;
    }
    .course-catelog-ft {
      text-align: right;
      width: 80px;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      > a {
        margin-right: 20px;
      }
    }
    .course-catelog-btn {
      display: inline-block;
      width: 80px;
      height: 20px;
      line-height: 20px;
      border-radius: 25px;
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      transition: all 0.2s ease;
      display: none;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
