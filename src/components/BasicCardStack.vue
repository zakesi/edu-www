<template>
  <div class="stack-card-item">
    <img :src="data.image_url" class="stack-card-item_image" />
    <div class="stack-card-item_name">{{ data.name }}</div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        id: null,
        name: "统计学",
        image_url:
          "https://q2.cdn.prodegree.com/stacks/2020/0603/4fkWCz4qrsRiDNJgtEsvAq0a9SzrF3S6bTCcQ50g.jpg"
      })
    }
  },
  methods: {}
};
</script>
<style type="text/css" lang="less" scoped>
.stack-card-item {
  display: inline-block;
  padding-top: 18px;
  width: 128px;
  height: 128px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid #fff;
  border-radius: 4px;

  &:hover {
    border-color: #35b558;
  }

  .stack-card-item_image {
    display: block;
    width: 40px;
    height: 40px;
    margin: 20px auto 0;
  }

  .stack-card-item_name {
    line-height: 30px;
    color: #555;
    font-size: 12px;
    font-weight: 400;
  }
}
</style>
