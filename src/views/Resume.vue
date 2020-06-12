<template>
  <div class="container" v-loading="loading">
    <el-container class="h100" v-if="pc">
      <el-container class="sider-pc">
        <Sider
          :job="resumeInfo.job"
          :city="resumeInfo.city"
          :experience="resumeInfo.experience"
          :userInfo="userInfo"
        />
      </el-container>
      <el-container class="content-pc">
        <el-header class="page-header" height="64px">
          <Header>
            <template #header-ft>
              <el-dropdown :hide-on-click="false" :hide-timeout="300">
                <img
                  class="pdf-download"
                  src="@/assets/images/pdf.png"
                  alt="pdf"
                />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div class="pdf-dropdown-item">
                      <p>选择主题</p>
                      <el-color-picker
                        v-model="theme"
                        size="mini"
                      ></el-color-picker>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="pdf-dropdown-item">
                      <p>是否分页</p>
                      <el-checkbox v-model="paging" size="mini"
                        >分页</el-checkbox
                      >
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="pdf-dropdown-item">
                      <el-button
                        class="pdf-download-btn"
                        size="mini"
                        type="primary"
                        @click="handleDownloadPdf"
                        >下载</el-button
                      >
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </Header>
        </el-header>
        <el-main class="page-mainer">
          <Content
            :capability="resumeInfo.capability"
            :items="resumeInfo.items"
            :skills="resumeInfo.skills"
          />
        </el-main>
        <Footer />
      </el-container>
    </el-container>
    <swiper class="mobile h100" v-else :options="swiperOption" ref="mySwiper">
      <swiper-slide class="mobile-item slide">
        <div class="slide-container">
          <Sider
            :job="resumeInfo.job"
            :city="resumeInfo.city"
            :experience="resumeInfo.experience"
            :userInfo="userInfo"
          />
          <div class="swiper-tips">
            <div class="tips-cn">左右滑动</div>
            <div class="more">
              <div class="more-ball"></div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="mobile-item">
        <el-header class="page-header" height="64px">
          <Header></Header>
        </el-header>
        <el-main class="page-mainer">
          <Content
            :capability="resumeInfo.capability"
            :items="resumeInfo.items"
            :skills="resumeInfo.skills"
          />
        </el-main>
        <Footer />
      </swiper-slide>
    </swiper>
    <pdf
      v-if="downloadPdf"
      :resumeInfo="resumeInfo"
      :userInfo="userInfo"
      :theme="theme"
      :paging="paging"
      @handleDownloadDone="
        downloadPdf = false;
        loading = false;
      "
    />
  </div>
</template>

<script>
import Header from "@/components/ResumeHeader.vue";
import Footer from "@/components/ResumeFooter.vue";
import Sider from "@/components/ResumeSider.vue";
import Content from "@/components/ResumeContent.vue";
import Pdf from "@/components/ResumePdf.vue";
import userService from "@/globals/service/user.js";

export default {
  data() {
    return {
      loading: false,
      pc: true,
      swiperOption: {
        loop: true
      },
      theme: "#6186ff",
      paging: false,
      downloadPdf: false,
      resumeInfo: {},
      userInfo: {}
    };
  },
  created() {
    window.addEventListener("pageshow", this.mobileFunc);
    window.addEventListener("resize", this.mobileFunc);
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let id = this.$route.params.id;
      userService
        .showResume(id)
        .then(res => {
          if (res.resume) {
            for (let key in res.resume) {
              if (key !== "job") res.resume[key] = JSON.parse(res.resume[key]);
            }
            this.resumeInfo = res.resume;
          }
          this.userInfo = res.userInfo;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    mobileFunc() {
      let width = document.documentElement.clientWidth;
      if (width < 720) {
        this.pc = false;
      } else if (width >= 720) {
        this.pc = true;
      }
    },
    handleDownloadPdf() {
      this.downloadPdf = true;
      this.loading = true;
    }
  },
  components: {
    Header,
    Footer,
    Sider,
    Content,
    Pdf
  }
};
</script>

<style type="text/css" lang="less">
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media screen and (max-width: 720px) {
  .page-header {
    padding: 0 10px;
  }
}
.h100 {
  height: 100vh;
}
.mobile {
  width: 100%;
  height: 100%;
  .mobile-item {
    width: 100%;
    height: auto;
  }
  .slide {
    background-color: #17a8aa;
  }
  .slide-container {
    height: 100vh;
    position: relative;
    .swiper-tips {
      font-size: 13px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .more {
        border: 2px solid #fff;
        height: 6px;
        width: 25px;
        border-radius: 12px;
        padding: 7px;
        display: block;
        position: relative;
        margin-left: 8px;
        .more-ball {
          position: absolute;
          border: 1px solid #fff;
          background-color: #fff;
          height: 8px;
          width: 8px;
          border-radius: 20px;
          top: 26%;
          animation: slideiconleft 2s 1s linear infinite;
        }
        @keyframes slideiconleft {
          0% {
            opacity: 1;
            left: 70%;
          }
          100% {
            opacity: 0;
            left: 10%;
          }
        }
      }
    }
  }
}
.sider-pc {
  width: 25%;
}
.content-pc {
  width: 75%;
}
.pdf-download {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 10px;
}
.pdf-dropdown-item {
  display: flex;
  align-items: center;
  p {
    font-size: 13px;
    margin-right: 10px;
  }
  .pdf-download-btn {
    margin: 4px auto;
    width: 100%;
  }
}
.page-header {
  box-shadow: 6px 2px 8px #eae5c9;
  position: relative;
  z-index: 10;
  height: 64px;
  .page-header-title {
    font-size: 20px;
  }
}
.page-sider {
  position: relative;
  background-color: #17a8aa;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  .el-menu {
    border-right: none;
  }
}
.page-mainer {
  padding: 0 !important;
}
</style>

<style lang="less">
.pdf-dropdown-item {
  .el-checkbox__label {
    padding-left: 5px;
    font-size: 13px;
  }
}
</style>
