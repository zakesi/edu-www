<template>
  <div class="page-content">
    <div class="container-1080">
      <div class="stack-section">
        <div class="stack-list">
          <div
            class="stack-item"
            v-for="item in stacks"
            :key="item.id"
            @click="handleLink(item.id)"
          >
            <span class="stack-item-name">{{ item.name }}</span>
            <img
              class="stack-item-img"
              v-if="item.image_url"
              :src="item.image_url"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import stackService from "@/globals/service/stack.js";

export default {
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
.stack-list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .stack-item {
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #e4e4e4;
    margin-right: 8px;
    margin-bottom: 8px;
    color: #333;
    cursor: pointer;

    .stack-item-name {
      vertical-align: middle;
      margin-right: 8px;
      font-size: 14px;
    }

    .stack-item-img {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }

    &:hover {
      background-color: #333;
      border: 1px solid #333;
      color: #fff;
    }
  }
}
</style>
