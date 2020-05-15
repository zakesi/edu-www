<template>
  <div class="setting-page">
    <div class="container-1080">
      <div class="page-mainer">
        <div class="page-mainer-sider">
          <SettingSiderMenu default-active="/setting" />
        </div>
        <div class="page-mainer-content">
          <div class="card-box">
            <div class="card-box-title font-semibold">
              账号安全
            </div>
            <div class="card-box-content">
              <div class="security-list">
                <div class="item">
                  <span class="name">手机号</span>
                  <span class="state">{{
                    userInfo.phone_number ? userInfo.phone_number : "未绑定"
                  }}</span>
                  <span class="operation" @click="handleOpenDialog">{{
                    userInfo.phone_number ? "修改手机号" : "绑定手机"
                  }}</span>
                </div>
                <div class="item">
                  <span class="name">微信</span>
                  <span class="state">{{
                    userInfo.has_bind_wechat ? "已绑定" : "未绑定"
                  }}</span>
                  <span class="operation" @click="handleToggleWechat()">
                    {{ userInfo.has_bind_wechat ? "解绑" : "绑定" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :title="userInfo.phone_number ? '修改手机号' : '绑定手机'"
        :visible.sync="phoneVerifyDialog"
        :center="true"
        :before-close="handleCloseDialog"
        width="360px"
      >
        <el-form ref="phoneVerifyFrom" :model="phoneVerifyFrom" :rules="rules">
          <el-form-item prop="phone_number">
            <el-input
              v-model="phoneVerifyFrom.phone_number"
              type="number"
              autocomplete="off"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item prop="code" class="code-line">
            <el-input
              v-model="phoneVerifyFrom.code"
              type="number"
              autocomplete="off"
              placeholder="请输入验证码"
            />
            <el-button :disabled="countDownDisable" @click="handlePhoneMessage">
              {{ countDownText }}
            </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="medium"
            type="primary"
            :loading="btnLoading"
            :disabled="btnLoading"
            @click="handlePhoneVerify"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 手机验证身份弹窗 -->
      <el-dialog
        title="验证身份"
        :visible.sync="authVerifyDialog"
        width="500px"
        height="340px"
        :center="true"
        :before-close="handleCloseDialog"
      >
        <div class="dialog-tip">
          为了保证你的帐号安全，请验证身份。验证成功后进行下一步操作。
        </div>
        <el-form ref="authVerifyFrom" :model="authVerifyFrom" :rules="rules">
          <el-form-item>
            <el-input
              :value="userInfo.phone_number"
              type="number"
              autocomplete="off"
              disabled
            />
          </el-form-item>
          <el-form-item prop="code" class="code-line">
            <el-input
              v-model="authVerifyFrom.code"
              type="number"
              autocomplete="off"
              placeholder="请输入验证码"
            />
            <el-button :disabled="countDownDisable" @click="handleAuthMessage">
              {{ countDownText }}
            </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="btnLoading"
            :disabled="btnLoading"
            @click="handleAuthVerify"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import SettingSiderMenu from "@/components/SettingSiderMenu.vue";

export default {
  components: {
    SettingSiderMenu
  },
  data() {
    return {
      userInfo: {},
      countDownText: "获取验证码",
      countDownInterval: null,
      countDownDisable: false,
      phoneVerifyDialog: false,
      authVerifyDialog: false,
      btnLoading: false,
      phoneVerifyFrom: {
        phone_number: "",
        code: ""
      },
      authVerifyFrom: {
        code: ""
      },
      rules: {
        phone_number: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 绑定手机打开对话框
    handleOpenDialog() {
      if (this.userInfo.phone_number) {
        this.authVerifyDialog = true;
      } else {
        this.phoneVerifyDialog = true;
      }
    },
    // 关闭绑定手机对话框
    handleCloseDialog(done) {
      this.authVerifyFrom.code = "";
      this.countDownText = "获取验证码";
      this.countDownDisable = false;
      this.$refs.phoneVerifyFrom && this.$refs.phoneVerifyFrom.resetFields();
      this.$refs.authVerifyFrom && this.$refs.authVerifyFrom.resetFields();
      this.countDownInterval && window.clearInterval(this.countDownInterval);
      done();
    },
    // 发送修改手机验证码
    handlePhoneMessage() {
      this.$refs.phoneVerifyFrom.validateField("phone_number", errMsg => {
        if (errMsg) {
          return;
        }
        this.countDownDisable = true;
        this.countDownInterval = this._countDown();
      });
    },
    // 发送身份认证验证码
    handleAuthMessage() {
      this.countDownDisable = true;
      this._countDown();
    },
    // 验证码倒计时
    _countDown() {
      let time = 60;
      this.countDownText = `(${time})秒重新发送`;
      this.countDownInterval = window.setInterval(() => {
        time -= 1;
        this.countDownText = `(${time})秒重新发送`;
        if (time <= 0) {
          this.countDownText = "重新发送";
          this.countDownDisable = false;
          window.clearInterval(this.countDownInterval);
        }
      }, 1000);
    },
    // 进行身份验证
    handleAuthVerify() {
      this.$refs.authVerifyFrom.validateField("code", errMsg => {
        if (errMsg) {
          return;
        }
        // const params = this.authVerifyFrom
        this.btnLoading = true;

        this.btnLoading = false;
        this.authVerifyDialog = false;
        this.phoneVerifyDialog = true;
        this.$message.success("身份验证成功！");
        this.handleCloseDialog();
      });
    },
    // 进行手机修改验证
    handlePhoneVerify() {
      this.$refs.phoneVerifyFrom.validate(valid => {
        if (valid) {
          // const params = this.phoneVerifyFrom
          this.btnLoading = true;

          this.phoneVerifyDialog = false;
          this.btnLoading = false;
          this.$message.success("绑定成功！");
          // this.userInfo.phone_number = res.phone_number;
          this.handleCloseDialog();
        }
      });
    },
    // 绑定微信
    handleToggleWechat() {
      if (this.userInfo.has_bind_wechat) {
        this.$confirm(
          "解绑后你将无法使用微信登录此账号，你确定要解绑吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        ).then(() => {
          this.handleUnBindWechat();
        });
      } else {
        this.handleBindWechat();
      }
    },
    handleBindWechat() {},
    handleUnBindWechat() {}
  }
};
</script>

<style type="text/css" lang="less" scoped>
.setting-page {
  padding: 20px 0;

  .dialog-tip {
    text-align: center;
    margin-bottom: 20px;
    color: #999;
  }
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
    .card-box-title {
      height: 33px;
      margin-bottom: 30px;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 33px;
    }
    .card-box-content {
      position: relative;
      border-top: 1px solid #d8d8d8;
      padding-top: 20px;
    }
  }
  .security-list {
    padding: 30px 45px;
    .item {
      display: flex;
      align-items: center;
      height: 80px;
      line-height: 80px;
      color: #333;
      font-size: 14px;
      .name {
        min-width: 42px;
        margin-right: 40px;
      }
      .state {
        color: #666;
        width: 282px;
        text-align: left;
      }
      .operation {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
/deep/.el-dialog__header {
  padding: 20px;
  font-size: 26px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 37px;
}
/deep/.el-dialog__body {
  padding: 0 80px;
}
/deep/.el-input__inner {
  border-radius: 0;
  font-size: 14px;
  color: rgba(213, 213, 213, 1);
}
.el-input {
  position: relative;
}
.setting-page .code-line .el-button {
  height: 100%;
  margin-left: 20px;
  position: absolute;
  right: 1px;
  top: 0px;
  outline: none;
  border: none;
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
  background-color: transparent;
}
/deep/.el-button--primary {
  width: 120px;
  height: 40px;
  background-color: #333333;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 0;
  letter-spacing: -2px;
}
/deep/.el-dialog__footer {
  padding: 0 0 43px;
}
/deep/.el-input__inner:focus {
  border-color: #0fc700;
  outline: 0;
}
</style>
