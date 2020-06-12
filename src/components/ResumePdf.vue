<template>
  <div class="pdf-container" id="pdf-container">
    <div class="pdf-sider" :style="{ background: theme }">
      <div class="user-info">
        <div class="user-avatar">
          <img class="user-avatar-png" :src="userInfo.avatar_url" />
        </div>
        <p class="user-name">{{ userInfo.name }}</p>
        <p class="user-status">{{ resumeInfo.job }}</p>
      </div>
      <div class="user-info">
        <div class="user-info-title">个人信息</div>
        <div class="user-info-text" v-if="userInfo.birthday">
          <i class="el-icon-present"></i>
          <span>{{ yyyymmdd(userInfo.birthday) }}</span>
        </div>
        <div
          class="user-info-text"
          v-if="resumeInfo.city && resumeInfo.city.length"
        >
          <i class="el-icon-position"></i>
          <span>{{ resumeInfo.city | joinYear }}</span>
        </div>
        <div class="user-info-text" v-if="userInfo.phone">
          <i class="el-icon-mobile-phone"></i>
          <span>{{ userInfo.phone }}</span>
        </div>
      </div>
      <div
        class="user-info"
        v-if="resumeInfo.experience && resumeInfo.experience.length"
      >
        <div class="user-info-title">实习经历</div>
        <div v-for="(item, index) in resumeInfo.experience" :key="index">
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
    </div>
    <div class="pdf-content">
      <div class="title" :style="{ color: theme }">capability</div>
      <ul class="user-power">
        <li
          class="capability"
          v-for="(item, index) in resumeInfo.capability || []"
          :key="index"
        >
          <p>{{ item.content }}</p>
        </li>
      </ul>
      <div class="title" :style="{ color: theme }">experience</div>
      <div class="items-container">
        <el-steps direction="vertical" :style="{ color: theme }">
          <el-step
            v-for="(item, index) in resumeInfo.items || []"
            :key="index"
            :title="item.name"
            icon="el-icon-star-off"
          >
            <template #description>
              <div class="items">
                <p class="items-title">项目时间：</p>
                <span class="item-text">{{ item.date | joinTime }}</span>
              </div>
              <div class="items">
                <p class="items-title">项目地址：</p>
                <span class="item-text">{{ item.address }}</span>
              </div>
              <div class="items">
                <p class="items-title">项目描述：</p>
                <span class="item-text">{{ item.description }}</span>
              </div>
              <div class="items">
                <p class="items-title">我的职能：</p>
                <ol>
                  <li
                    v-for="(func, funcIndex) in (item || {}).function"
                    :key="funcIndex"
                  >
                    {{ func }}
                  </li>
                </ol>
              </div>
              <div class="items">
                <p class="items-title">相关技术：</p>
                <div>
                  <el-tag
                    :color="theme"
                    size="small"
                    v-for="(tag, tagIndex) in (item || {}).tech"
                    :key="tagIndex"
                    >{{ tag }}</el-tag
                  >
                </div>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "@/utils/moment.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "ResumePdf",
  mixins: [moment],
  props: {
    resumeInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    theme: {
      type: String,
      default: "#6186ff"
    },
    userInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    paging: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.createPdf();
  },
  methods: {
    createPdf() {
      const container = document.getElementById("pdf-container");
      html2canvas(container, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        dpi: "192"
      }).then(canvas => {
        // 分页
        if (this.paging) {
          let contentWidth = canvas.width;
          let contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = (contentWidth / 592.28) * 841.89;
          //未生成pdf的html页面高度
          let leftHeight = contentHeight;
          //页面偏移
          let position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28;
          let imgHeight = (592.28 / contentWidth) * contentHeight;
          let pageData = canvas.toDataURL("image/jpeg", 1.0);
          let pdf = new jsPDF("", "pt", "a4");
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save("resume.pdf");
          this.$emit("handleDownloadDone");
        } else {
          // 不分页
          let { width, height } = canvas;
          let url = canvas.toDataURL("image/jpeg", 1.0);
          let pdfWidth = ((width + 10) / 2) * 0.75;
          let pdfHeight = (height / 2) * 0.75;
          let displayWidth = pdfWidth;
          let displayHeight = (height / 2) * 0.75;
          let pdf = new jsPDF("", "pt", [pdfWidth, pdfHeight]);
          pdf.addImage(url, "jpeg", 0, 0, displayWidth, displayHeight);
          pdf.save("resume.pdf");
          this.$emit("handleDownloadDone");
        }
      });
    }
  },
  filters: {
    joinYear(val) {
      let data = val || [];
      return data.join("、");
    },
    joinTime(val) {
      let data = val || [];
      if (data[0] === data[1]) {
        return data[0];
      } else {
        return data.join(" ~ ");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pdf-container {
  width: 685px;
  display: flex;
  .pdf-sider {
    width: 195px;
    padding: 25px 0;
    .user-info {
      margin: 20px auto;
      width: 145px;
      color: #fff;
      .user-info-title {
        font-size: 14px;
        font-weight: 600;
        margin-top: 60px;
        margin-bottom: 8px;
      }
      .user-info-text {
        font-size: 12px;
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
      .user-name {
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        line-height: 20px;
        margin-bottom: 10px;
      }
      .user-status {
        font-size: 13px;
        font-weight: 500;
        text-align: center;
      }
    }
    .user-avatar {
      .user-avatar-png {
        display: block;
        width: 72px;
        height: 72px;
        margin: 0 auto 20px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
  .pdf-content {
    width: 490px;
    background: #fff;
    padding: 30px;
    .title {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 400;
      color: #6186ff;
      margin-top: 20px;
    }
    .user-power {
      padding-left: 10px;
      font-size: 13px;
      list-style-type: none;
      .capability {
        p {
          font-size: 12px;
          margin: 8px 0;
          color: #666;
        }
      }
    }
    .items-container {
      padding: 10px 0;
      color: #555;
      p {
        margin: 0;
      }
      .items {
        display: flex;
        align-items: flex-start;
        margin: 8px 0;
        .items-title {
          width: 60px;
          flex: none;
          color: #555;
        }
        .item-text {
          word-break: break-word;
          color: #666;
        }
        ol {
          padding-left: 13px;
          margin: 0;
          color: #666;
        }
        .el-tag {
          color: #fff;
          margin: 0 5px 5px 0;
          opacity: 0.9;
          border-color: unset;
        }
      }
    }
  }
}
</style>

<style lang="less">
.pdf-container {
  .el-step__head.is-wait {
    color: inherit;
  }
  .el-step__title.is-wait {
    color: inherit;
    font-size: 13px;
    font-weight: normal;
    line-height: 28px !important;
    padding-bottom: 4px !important;
  }
  .el-step__description.is-wait {
    color: #555;
    padding: 0 !important;
  }
}
</style>
