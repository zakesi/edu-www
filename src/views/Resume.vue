<template>
  <div class="setting-page" v-loading="loading">
    <div class="container-1080">
      <div class="page-mainer">
        <div class="page-mainer-sider">
          <SettingSiderMenu default-active="/resume" />
        </div>
        <div class="page-mainer-content">
          <div class="card-box">
            <div class="card-box-title">
              <p>简历中心</p>
              <div class="size">
                <p @click="inputSize = 'medium'">大</p>
                <p @click="inputSize = 'small'">中</p>
                <p @click="inputSize = 'mini'">小</p>
              </div>
            </div>
            <div class="card-box-content">
              <el-form :model="form" label-width="100px" style="width:530px;">
                <el-form-item label="应聘岗位">
                  <el-input
                    :size="inputSize"
                    v-model="form.name"
                    placeholder="请输入岗位名称"
                  />
                </el-form-item>
                <el-form-item label="意向城市">
                  <el-select
                    :size="inputSize"
                    v-model="form.city"
                    multiple
                    placeholder="请选择意向城市"
                  >
                    <el-option
                      v-for="item in cityOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="工作经历">
                  <div
                    class="experience-list"
                    v-for="(item, index) in form.experience"
                    :key="index"
                  >
                    <el-date-picker
                      :size="inputSize"
                      class="item"
                      v-model="item.date"
                      type="monthrange"
                      range-separator="至"
                      start-placeholder="开始月份"
                      end-placeholder="结束月份"
                    >
                    </el-date-picker>
                    <el-input
                      :size="inputSize"
                      class="item"
                      v-model="item.company"
                      placeholder="请输入公司名称"
                    />
                    <el-input
                      :size="inputSize"
                      class="item"
                      v-model="item.content"
                      type="textarea"
                      :maxlength="200"
                      :rows="3"
                      placeholder="请输入工作内容"
                    />
                    <div
                      v-show="index > 0"
                      class="del-experience"
                      @click="form.experience.splice(index, 1)"
                    >
                      <i class="el-icon-remove-outline"></i>
                    </div>
                  </div>
                  <div class="add-experience" @click="handleAddExperience">
                    <i class="el-icon-circle-plus-outline"></i>
                  </div>
                </el-form-item>
                <el-form-item label="能力简介">
                  <div
                    class="capability-list"
                    v-for="(item, index) in form.capability"
                    :key="index"
                  >
                    <span class="index">{{ index + 1 }}.</span>
                    <el-input
                      :size="inputSize"
                      class="item"
                      v-model="item.content"
                      placeholder="请输入能力简介"
                    />
                    <div
                      v-show="index === form.capability.length - 1"
                      class="add-capability"
                      @click="handleAddCapability"
                    >
                      <i class="el-icon-circle-plus-outline"></i>
                    </div>
                    <div
                      v-show="index > 0"
                      class="del-capability"
                      @click="form.capability.splice(index, 1)"
                    >
                      <i class="el-icon-remove-outline"></i>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="技能清单">
                  <el-input
                    :size="inputSize"
                    v-model="skillList"
                    class="add-skill-list"
                    placeholder="请输入技能领域 例: 前端框架"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-plus"
                      @click="handleAddSkill"
                    ></el-button>
                  </el-input>
                  <div
                    class="skill-list"
                    v-for="(item, index) in form.skills"
                    :key="index"
                  >
                    <div class="title">{{ item.title }}</div>
                    <el-tag
                      :size="inputSize"
                      v-for="(tag, tagIndex) in item.content"
                      :key="tagIndex"
                      closable
                      @close="form.skills[index].content.splice(tagIndex, 1)"
                      :disable-transitions="false"
                    >
                      {{ tag }}
                    </el-tag>
                    <el-input
                      size="mini"
                      class="skill-new-tag"
                      v-if="item.skillTagVisible"
                      v-model="item.skillTage"
                      ref="skillTageInput"
                      @keyup.enter.native="handleAddSkillItem(index)"
                      @blur="handleAddSkillItem(index)"
                    >
                    </el-input>
                    <el-button
                      v-else
                      :size="inputSize"
                      class="button-new-tag"
                      @click="skillTagShow(index)"
                    >
                      Add Tag
                    </el-button>
                    <el-button
                      :size="inputSize"
                      class="button-new-tag del"
                      @click="handleDelSkill(index)"
                    >
                      Del All
                    </el-button>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    :size="inputSize"
                    style="margin-top:30px"
                    type="primary"
                    @click="handleSubmit"
                    >保存</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import SettingSiderMenu from "@/components/SettingSiderMenu.vue";
// import { mapState } from "vuex";

export default {
  components: {
    SettingSiderMenu
  },
  computed: {},
  data() {
    return {
      loading: false,
      inputSize: "small",
      form: {
        job: "",
        city: [],
        experience: [
          {
            date: "",
            company: "",
            content: ""
          }
        ],
        capability: [
          {
            content: "",
            active: false
          }
        ],
        skills: []
      },
      skillList: "",
      cityOption: [
        { id: 1, name: "北京" },
        { id: 2, name: "上海" }
      ]
    };
  },
  methods: {
    // 增加工作经历
    handleAddExperience() {
      this.form.experience.push({
        date: "",
        company: "",
        content: ""
      });
    },
    // 增加能力简介
    handleAddCapability() {
      this.form.capability.push({
        content: ""
      });
    },
    // 增加技能领域
    handleAddSkill() {
      let title = this.skillList;
      if (!title.trim()) {
        this.$message.error("未输入内容");
        return;
      }
      this.form.skills.push({
        title,
        content: [],
        skillTage: "",
        skillTagVisible: false
      });
      this.skillList = "";
    },
    // 删除技能领域
    handleDelSkill(index) {
      this.$confirm("确认删除整条？").then(() => {
        this.form.skills.splice(index, 1);
      });
    },
    // 增加技能点
    handleAddSkillItem(index) {
      let tagValue = this.form.skills[index].skillTage;
      if (tagValue) {
        this.form.skills[index].content.push(tagValue);
      }
      this.form.skills[index].skillTagVisible = false;
      this.form.skills[index].skillTage = "";
    },
    // 展示技能点输入框
    skillTagShow(index) {
      this.form.skills[index].skillTagVisible = true;
      this.$nextTick(() => {
        this.$refs.skillTageInput[0].$refs.input.focus();
      });
    },
    handleSubmit() {
      let { form } = this;
      console.log(form);
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.setting-page {
  padding: 20px 0;
}
.page-mainer {
  display: flex;
  .page-mainer-sider {
    flex: none;
    margin-right: 20px;
    background-color: #ffffff;
    width: 240px;
  }
  .page-mainer-content {
    position: relative;
    flex: 1;
  }
  .card-box {
    background-color: #fff;
    min-height: 436px;
    padding: 30px 30px 50px 50px;
    .el-date-editor--monthrange.el-input__inner {
      width: 430px;
    }
    .card-box-title {
      height: 33px;
      margin-bottom: 30px;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 33px;
      position: relative;
      .size {
        display: flex;
        position: absolute;
        bottom: -40px;
        right: 30px;
        font-size: 14px;
        font-weight: 500;
        color: #409eff;
        p {
          margin-right: 4px;
          cursor: pointer;
        }
      }
    }
    .card-box-content {
      position: relative;
      border-top: 1px solid #d8d8d8;
      padding-top: 15px;
      .experience-list {
        width: 480px;
        padding-bottom: 5px;
        margin-bottom: 15px;
        position: relative;
        .item {
          margin-bottom: 10px;
          width: 430px;
        }
        .del-experience {
          position: absolute;
          right: 20px;
          top: 0;
          font-size: 20px;
          color: #f56c6c;
          cursor: pointer;
        }
      }
      .capability-list {
        display: flex;
        width: 500px;
        .index {
          font-size: 14px;
          width: 20px;
        }
        .item {
          margin: 0 10px 10px 10px;
          width: 400px;
        }
        .del-capability {
          font-size: 20px;
          color: #f56c6c;
          cursor: pointer;
        }
        .add-capability {
          font-size: 20px;
          color: #409eff;
          cursor: pointer;
          margin-right: 10px;
        }
      }
      .skill-list {
        display: flex;
        align-items: center;
        width: 500px;
        margin-top: 10px;
        flex-wrap: wrap;
        .title {
          font-size: 14px;
          margin-right: 15px;
          line-height: 20px;
        }
        .el-tag {
          margin: 5px 10px 5px 0;
        }
        .skill-new-tag {
          width: 100px;
          margin-right: 5px;
        }
        .button-new-tag {
          margin: 5px 5px 5px 0;
          line-height: 2;
          padding-top: 0;
          padding-bottom: 0;
          &.del {
            background: #fef0f0;
          }
        }
      }
      .add-experience {
        position: absolute;
        bottom: 20px;
        right: -30px;
        font-size: 20px;
        color: #409eff;
        cursor: pointer;
      }
      .add-skill-list {
        margin-top: 4px;
      }
    }
  }
}
</style>
