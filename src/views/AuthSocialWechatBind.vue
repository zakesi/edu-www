<template>
  <div class="social-wecaht">
    {{ message }}
  </div>
</template>

<script type="text/javascript">
import authService from "@/globals/service/auth";
export default {
  data() {
    return {
      message: "..."
    };
  },
  created() {
    const code = this.$route.query.code;
    authService
      .wechatAuthBind({ code })
      .then(res => {
        this.$message.success("微信绑定成功！");
        this.$store.commit("UPDATA_UNIONID", res.unionid);
      })
      .finally(() => {
        this.$router.replace({ name: "Setting" });
      });
  },
  methods: {}
};
</script>
