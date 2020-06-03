<template>
  <div class="home-page">
    <div class="banner-section">
      <div class="container container-1080">
        <div class="banner-img">
          <img src="@/assets/images/vip/banner-bg.png" />
        </div>
        <div class="banner-title">
          零基础，轻松入门编程
        </div>
        <div class="banner-sub-title">
          编程就像旅行，不能带你走遍全世界，但能带你走出内心的孤寂。
        </div>
        <div class="banner-desc">
          养成每天有学习、有进步的习惯，无论你是新入职场，还是在职提升，<br />通过我们提供的内容和服务，刻意训练、持续进步、成就自我。
        </div>
        <div class="feature-list">
          <div class="feature-item">
            <div class="item-num">
              最新
            </div>
            <div class="item-desc">
              内容实时更新
            </div>
          </div>
          <div class="feature-item">
            <div class="item-num">
              最全
            </div>
            <div class="item-desc">
              渐进学习体系
            </div>
          </div>
          <div class="feature-item">
            <div class="item-num">
              最真
            </div>
            <div class="item-desc">
              企业项目拆解
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="plan-section">
      <div class="container-1080">
        <div class="plan-title">成长学习计划</div>
        <div class="plan-list">
          <div
            class="plan-item plan-card"
            v-for="zhiye in zhiyes"
            :key="zhiye.id"
          >
            <div class="plan-card-hd">
              <img :src="zhiye.image_url" :alt="zhiye.name" />
            </div>
            <div class="plan-card-bd">
              <div class="plan-card-title">{{ zhiye.name }}</div>
              <div class="plan-card-description">{{ zhiye.description }}</div>
            </div>
            <span
              @click="handleLinktoZhiyeItem(zhiye)"
              :class="['plan-card-btn', { wait: !zhiye.status }]"
            >
              {{ zhiye.status ? "查看详情" : "敬请期待" }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-w1200">
      <Partner />
    </div>
  </div>
</template>

<script>
import zhiyeService from "@/globals/service/zhiye";
import Partner from "@/components/BasicPartner.vue";
export default {
  name: "home",
  components: {
    Partner
  },
  data() {
    return {
      zhiyes: []
    };
  },
  created() {
    zhiyeService.index().then(res => {
      this.zhiyes = res.rows;
    });
  },
  methods: {
    handleLinktoZhiyeItem(zhiye) {
      if (zhiye.status) {
        this.$router.push({
          name: "ZhiyeItem",
          params: {
            id: zhiye.id
          }
        });
      }
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.banner-section {
  background-color: #fff;
  padding: 110px 0;
  .container {
    position: relative;
    .banner-img {
      position: absolute;
      top: -82px;
      right: 0;
      width: 628px;
      height: 450px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .banner-title {
      height: 84px;
      margin-bottom: 16px;
      font-size: 60px;
      line-height: 84px;
      font-weight: 600;
      color: #333333;
    }
    .banner-sub-title {
      height: 25px;
      margin-bottom: 31px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
    }
    .banner-desc {
      width: 557px;
      margin-bottom: 31px;
      font-size: 16px;
      color: #333333;
      line-height: 30px;
    }
    .feature-list {
      position: absolute;
      top: 277px;
      left: 0;
      display: flex;
      align-items: center;
      .feature-item {
        margin-right: 50px;
        .item-num {
          height: 45px;
          font-size: 32px;
          font-weight: 600;
          color: #333333;
          line-height: 45px;
        }
        .item-desc {
          height: 22px;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
.plan-section {
  padding-top: 80px;
  padding-bottom: 180px;
  position: relative;
  background: url("~@/assets/images/common/radius-bg.89f75b3.png") top/100%
      100px,
    linear-gradient(#f7f7fb, #f7f7fb);
  background-repeat: no-repeat;

  .plan-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 600;
    color: #333;
    padding: 50px 0 0;
    background: radial-gradient(
          circle,
          #48f4cb 0,
          #48f4cb 25px,
          transparent 0,
          transparent 100%
        )
        calc(50% - 60px) 8px,
      radial-gradient(
          circle,
          #fdc82f 0,
          #fdc82f 12px,
          transparent 0,
          transparent 100%
        )
        calc(50% + 68px) 30px;
    background-repeat: no-repeat;

    &:before,
    &:after {
      content: "";
      display: block;
      width: 20px;
      height: 4px;
      border-radius: 2px;
      background-color: #31285d;
    }
    &:before {
      margin-right: 16px;
    }
    &:after {
      margin-left: 16px;
    }
  }

  .plan-list {
    margin-top: 80px;
  }

  .plan-item {
    margin-top: 32px;

    &:first-child {
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: -28px;
        right: 125px;
        z-index: 0;
        width: 216px;
        height: 28px;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTYiIGhlaWdodD0iMTI1IiB2aWV3Qm94PSIwIDAgMjE2IDEyNSI+CiAgICA8ZyBmaWxsPSIjNkM0OEU5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xMTkiPgogICAgICAgIDxwYXRoIGQ9Ik01Mi4zOCAwTDAgMTI1aDM0LjYxOEw4NyAwek0xMTYuMzgxIDBMNjQgMTI1aDM0LjYxOUwxNTEgMHpNMTgxLjM4MSAwTDEyOSAxMjVoMzQuNjE5TDIxNiAweiIvPgogICAgPC9nPgo8L3N2Zz4K")
          no-repeat;
      }
    }
  }

  .plan-card {
    display: flex;
    position: relative;
    height: 240px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 2px 81px 0 rgba(56, 35, 219, 0.09);
    .plan-card-hd {
      width: 400px;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 16px 0 0 16px;
      }
    }
    .plan-card-bd {
      flex: 1;
      padding: 40px;
    }
    .plan-card-ft {
      width: 200px;
    }
    .plan-card-title {
      font-size: 26px;
      font-weight: 600;
      color: #333;
    }
    .plan-card-label {
      display: inline-block;
      padding: 3px 16px;
      margin-left: 16px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 13px;
      background-color: #f1eff5;
    }
    .plan-card-description {
      margin-top: 20px;
      opacity: 0.5;
      line-height: 28px;
      color: #1b1243;
      text-align: justify;
    }
    .plan-card-badge {
      position: absolute;
      right: -3px;
      top: -3px;
      display: block;
      width: 100px;
      height: 100px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgogICAgPGRlZnM+CiAgICAgICAgPHJlY3QgaWQ9ImEiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHVzZSBmaWxsPSIjRDhEOEQ4IiBmaWxsLW9wYWNpdHk9IjAiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPHBhdGggZmlsbD0iI0IzMkE3OSIgZD0iTTk3IDkyaDN2OGgtM3pNMCAwaDN2M0gweiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxnIGZpbGw9IiNGRjY2OTQiIG1hc2s9InVybCgjYikiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuNDU2LTMwbDExMi40MyAxMTIuNDMtMjUuNDU2IDI1LjQ1NkwtNC00LjU0NHoiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=);
      .plan-card-badge_text {
        position: absolute;
        top: 27px;
        left: 31px;
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    .plan-card-btn {
      position: absolute;
      right: 40px;
      bottom: 20px;
      border: none;
      padding: 8px 28px;
      border-radius: 24px;
      background: #111;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      text-align: center;
      line-height: 24px;
      transform: all 0.2s ease;
      &:hover {
        opacity: 0.8;
      }
      &.wait {
        background-color: #1f0d62 !important;
        opacity: 0.2;
        cursor: not-allowed;
      }
    }
  }
}
</style>
