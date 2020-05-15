<template>
  <div class="setting-page" v-loading="loading">
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
                    userInfo.phone ? userInfo.phone : "未绑定"
                  }}</span>
                  <span class="operation" @click="handleOpenDialog">{{
                    userInfo.phone ? "修改手机号" : "绑定手机"
                  }}</span>
                </div>
                <div class="item">
                  <span class="name">微信</span>
                  <span class="state">{{
                    userInfo.unionid ? "已绑定" : "未绑定"
                  }}</span>
                  <span class="operation" @click="handleToggleWechat()">
                    {{ userInfo.unionid ? "解绑" : "绑定" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :title="userInfo.phone ? '修改手机号' : '绑定手机'"
        :visible.sync="phoneVerifyDialog"
        :center="true"
        :before-close="handleCloseDialog"
        width="360px"
      >
        <el-form ref="phoneVerifyFrom" :model="phoneVerifyFrom" :rules="rules">
          <el-form-item prop="phone">
            <el-input
              v-model="phoneVerifyFrom.phone"
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
    </div>
  </div>
</template>

<script type="text/javascript">
import SettingSiderMenu from "@/components/SettingSiderMenu.vue";
import authService from "@/globals/service/auth";
import { mapState } from "vuex";
export default {
  components: {
    SettingSiderMenu
  },
  created() {},
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      loading: false,
      countDownText: "获取验证码",
      countDownInterval: null,
      countDownDisable: false,
      phoneVerifyDialog: false,
      btnLoading: false,
      phoneVerifyFrom: {
        phone: "",
        code: ""
      },
      rules: {
        phone: [
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
      this.phoneVerifyDialog = true;
    },
    // 关闭绑定手机对话框
    handleCloseDialog(done) {
      this.countDownText = "获取验证码";
      this.countDownDisable = false;
      this.$refs.phoneVerifyFrom && this.$refs.phoneVerifyFrom.resetFields();
      this.countDownInterval && window.clearInterval(this.countDownInterval);
      done();
    },
    // 发送修改手机验证码
    handlePhoneMessage() {
      this.$refs.phoneVerifyFrom.validateField("phone", errMsg => {
        if (errMsg) {
          return;
        }
        this.countDownDisable = true;
        authService
          .smsSend({
            phone: this.phoneVerifyFrom.phone
          })
          .then(res => {
            const code = res.code;
            if (code) {
              this.$message.success({
                message: "验证码：" + code,
                duration: 9000
              });
            }
            this.countDownInterval = this._countDown();
          })
          .catch(() => {
            this.countDownDisable = false;
          });
      });
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
    // 进行手机修改验证
    handlePhoneVerify() {
      this.$refs.phoneVerifyFrom.validate(valid => {
        if (valid) {
          const { code, phone } = this.phoneVerifyFrom;
          this.btnLoading = true;
          authService
            .phoneBind({ code, phone })
            .then(() => {
              this.phoneVerifyDialog = false;
              this.$message.success("绑定成功！");
              this.$store.commit("UPDATA_PHONE", phone);
              this.handleCloseDialog();
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    },
    // 绑定微信
    handleToggleWechat() {
      if (this.userInfo.unionid) {
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
    handleBindWechat() {
      authService
        .wechatAuthUrl({
          redirect_url: "http://edu-www.aitschool.com/social/wechat-bind"
        })
        .then(res => {
          window.location.href = res.redirect;
        });
    },
    handleUnBindWechat() {
      this.loading = true;
      authService
        .wechatAuthUnBind()
        .then(() => {
          this.$message.success("微信解绑成功！");
          this.$store.commit("UPDATA_UNIONID", "");
        })
        .finally(() => (this.loading = false));
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
</style>
