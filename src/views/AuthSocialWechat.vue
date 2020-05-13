<template>
  <div class="social-wecaht">
    social-wechat
  </div>
</template>

<script type="text/javascript">
import authService from "@/globals/service/auth";
export default {
  data() {
    return {};
  },
  created() {
    const code = this.$route.query.code;
    authService.wechatAuth({ code }).then(() => {
      this.$router.replace({ name: "Home" });
    });
  },
  methods: {}
};
</script>
