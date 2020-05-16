<template>
  <div class="my-page" v-loading="loading">
    <div class="container-1080">
      <div class="page-setting">
        <div class="page-setting-sider">
          <SettingSiderMenu default-active="/my" />
        </div>
        <div class="page-setting-content">
          <div class="card-box">
            <div class="card-box-title">
              个人资料
            </div>
            <div class="card-box-content">
              <el-form
                ref="elForm"
                :model="userInfo"
                :rules="rules"
                label-width="100px"
                style="width:430px;"
              >
                <el-form-item label="头像">
                  <upload-image
                    class="userInfo-avatar"
                    :image-path.sync="userInfo.avatar_url"
                    @upload-success="handleUploadAvatar"
                  />
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="userInfo.name" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="userInfo.sex" placeholder="请选择性别">
                    <el-option
                      v-for="item in sex"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="生日">
                  <el-date-picker
                    v-model="userInfo.birthday"
                    type="date"
                    placeholder="请选择出生日期"
                  />
                </el-form-item>
                <el-form-item label="个人简介">
                  <el-input
                    v-model="userInfo.introduction"
                    style="width:340px;height: 120px;"
                    type="textarea"
                    :maxlength="200"
                    :rows="5"
                    placeholder="一句话啊介绍一下自己吧，让别人更了解你"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSubmit"
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
import uploadImageAvatar from "@/components/UploadImageAvatar.vue";
import SettingSiderMenu from "@/components/SettingSiderMenu.vue";
import userService from "@/globals/service/user.js";

export default {
  components: {
    SettingSiderMenu,
    "upload-image": uploadImageAvatar
  },
  data() {
    return {
      loading: true,
      userInfo: {
        sex: "",
        name: "",
        birthday: "",
        introduction: ""
      },
      sex: [
        { id: 0, name: "保密" },
        { id: 1, name: "男" },
        { id: 2, name: "女" }
      ],
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      }
    };
  },
  created() {
    userService
      .userInfo()
      .then(res => {
        this.userInfo = res.userInfo;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    handleUploadAvatar() {
      this.$message.success("头像上传成功，请保存生效！");
    },
    handleSubmit() {
      const { userInfo } = this;
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          userService
            .updateUserInfo({
              name: userInfo.name,
              sex: userInfo.sex,
              introduction: userInfo.introduction,
              birthday: userInfo.birthday,
              avatar_url: userInfo.avatar_url
            })
            .then(() => {
              this.$message.success("用户信息更新成功！");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.my-page {
  padding: 20px 0;
}
.page-setting {
  display: flex;
  .page-setting-sider {
    flex: none;
    margin-right: 20px;
    background-color: #ffffff;
    width: 240px;
  }
  .page-setting-content {
    position: relative;
    flex: 1;
  }
  .card-box {
    background-color: #fff;
    min-height: 436px;
    padding: 30px 30px 60px 50px;
    .card-box-title {
      height: 33px;
      margin-bottom: 30px;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 33px;
    }
    .card-box-content {
      position: relative;
      padding: 45px 30px 0;
      border-top: 1px solid #d8d8d8;
    }
  }
  .userInfo-avatar {
    width: 50px;
    height: 50px;
    position: relative;
    top: -2px;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
