<template>
  <div class="page-content">
    <div class="container-1080">
      <div class="stack-section">
        <div class="stack-content">
          <template v-for="item in stacks">
            <router-link
              :key="item.id"
              class="stack-item"
              :to="{ name: 'EvaluationItem', params: { id: item.id } }"
            >
              <basic-stack :data="item" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import stackService from "@/globals/service/stack.js";
import BasicCardStack from "@/components/BasicCardStack.vue";

export default {
  components: {
    "basic-stack": BasicCardStack
  },
  data() {
    return {
      stacks: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      stackService
        .index({
          status: 1,
          page_size: 100
        })
        .then(res => {
          this.stacks = res.rows;
        });
    },
    handleLink(id) {
      this.$router.push({ name: "EvaluationItem", params: { id } });
    }
  }
};
</script>

<style type="text/css" scoped lang="less">
.stack-section {
  padding: 60px 0 80px;
  .stack-item {
    display: inline-block;
    margin-right: 8px;
    margin-top: 8px;
    &:nth-child(8n) {
      margin-right: 0;
    }
    &:nth-child(-n + 8) {
      margin-top: 8px;
    }
  }
}
</style>
