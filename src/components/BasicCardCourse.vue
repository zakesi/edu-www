<template>
  <div class="card-course">
    <div class="card-course-img-container">
      <img :src="data.image_url" class="card-course-img" />
    </div>
    <div class="card-course-content">
      <div class="card-course-title">{{ data.name }}</div>
      <div class="card-course-info">{{ data.short_name }}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        name: "课程名称",
        difficulty_level_label: "难度",
        short_name: "课程提示",
        image_url:
          "https://q2.cdn.youked.com/jingpin/2018/1224/RFah3LhRjuzG55LUBgzY5zhBm0S46ptkg0Q7aGSi.png"
      })
    }
  },
  methods: {}
};
</script>
<style type="text/css" lang="less" scoped>
.card-course {
  position: relative;
  display: inline-block;
  width: 258px;
  // height: 240px;
  border-radius: 5px;
  cursor: pointer;
  transition: all ease 0.3s;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.04);
  &:hover {
    box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.3);
  }
  .card-course-img-container {
    position: relative;
    width: 258px;
    height: 140px;
    overflow: hidden;
    .card-course-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }

  .card-course-content {
    padding: 12px 16px 18px;
    background: #fff;
    .card-course-title {
      margin-bottom: 18px;
      font-size: 15px;
      color: #333;
      line-height: 20px;
      height: 40px;
      text-align: left;
      overflow: hidden;
      letter-spacing: 1px;
    }
    .card-course-info {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
