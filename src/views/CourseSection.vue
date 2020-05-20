<template>
  <div class="plus-platfrom-section">
    <BasicPlatformLayout
      :menu-routes="menuRoutes"
      :default-active="defaultActive"
    >
      <template v-slot:sider-hd>
        <el-tooltip :content="course.name" placement="right">
          <div class="platform-sider-header">{{ course.name }}</div>
        </el-tooltip>
      </template>
      <template v-slot:content-header-middle>
        <div class="platform-header-middle">{{ section.name }}</div>
      </template>
      <template v-slot:content-mainer>
        <div class="platform-content-mainer" v-loading="loading">
          <BasicVideoPlay v-if="section.video_url" :url="section.video_url" />
          <markdown-it :md="section.content"></markdown-it>
        </div>
      </template>
    </BasicPlatformLayout>
  </div>
</template>

<script>
import BasicPlatformLayout from "@/components/BasicPlatformLayout.vue";
import BasicVideoPlay from "@/components/BasicVideoPlay.vue";
import MarkdownIt from "@jiker/markdown-it/MarkdownIt.vue";

export default {
  components: {
    MarkdownIt,
    BasicPlatformLayout,
    BasicVideoPlay
  },
  data() {
    return {
      loading: false,
      menuRoutes: [],
      courseId: null,
      chapterId: null,
      sectionId: null,
      defaultActive: "",
      course: {
        id: 1,
        name: "HTML",
        short_name: "HTML 基础",
        tips: "Web 入门必修课",
        description: "HTML 描述"
      },
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
      ],
      section: {
        name: "DTD",
        content: "# #内容",
        video_url:
          "https://s3.pstatp.com/aweme/resource/web/static/image/index/tvc-v3_0b9db49.mp4"
      }
    };
  },
  created() {
    this.courseId = Number(this.$route.params.courseId);
    this.chapterId = Number(this.$route.params.chapterId) || "";
    this.sectionId = Number(this.$route.params.sectionId) || "";
    this.getData();
  },
  watch: {
    $route() {
      this.chapterId = Number(this.$route.params.chapterId) || "";
      this.sectionId = Number(this.$route.params.sectionId) || "";
      this.getDataSection();
    }
  },
  methods: {
    getData() {
      this.setMenuRoutes();
    },
    getDataCourse() {},
    getDataSection() {},
    setMenuRoutes() {
      const { courseId, chapterId, sectionId, chapters } = this;
      this.defaultActive = `${chapterId}-${sectionId}`;
      this.menuRoutes = chapters.map(data => {
        return {
          id: data.id,
          title: data.name,
          children: data.sections.map(item => {
            return {
              id: item.id,
              title: item.name,
              path: `/course/${courseId}/${chapterId}/${sectionId}`,
              name: "CourseSection",
              params: {
                courseId,
                chapterId,
                sectionId
              }
            };
          })
        };
      });
    }
  }
};
</script>
<style type="text/css" lang="less" scoped>
.plus-platfrom-section {
  min-width: 1080px;
  /deep/.el-scrollbar__wrap,
  /deep/.platform-layout .el-scrollbar__wrap {
    overflow-x: auto !important;
  }
  /deep/.el-scrollbar__view {
    position: relative;
    min-height: 100%;
  }
  /deep/.el-submenu__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.platform-sider-header {
  height: 60px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  padding: 20px 0;
  text-indent: 16px;
  z-index: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0 2px 6px 0 rgba(21, 21, 21, 0.45);
}
.platform-header-middle {
  text-align: center;
}
.platform-content-mainer {
  max-width: 846px;
  padding: 60px 48px;
  margin: 0 auto;
  min-height: 500px;
}
.platform-video-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 60px;
  z-index: 999;

  .video-close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }

  .platform-video-element {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #333;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
