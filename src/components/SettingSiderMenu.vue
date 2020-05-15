<template>
  <div>
    <el-menu
      :router="true"
      :default-active="defaultActive"
      class="el-menu-vertical"
    >
      <el-menu-item index="/my">
        <span slot="title">个人资料</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <span slot="title">账号安全</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    defaultActive: {
      type: String,
      default: ""
    }
  },
  computed: {}
};
</script>
<style type="text/css" lang="less" scoped>
.el-menu-vertical.el-menu {
  border-right: 0;
}
</style>
