<template>
  <div class="platform-layout">
    <div
      class="platform-menu-container"
      :style="[{ width: siderWidth, backgroundColor: backgroundColor }]"
    >
      <div class="platform-menu-sider">
        <div class="platform-menu-header">
          <slot name="sider-hd"></slot>
        </div>
        <div class="platform-menu-body">
          <el-scrollbar class="scrollbar-section">
            <el-menu
              class="platform-menu-content"
              :router="true"
              :default-openeds="defaultOpends"
              :default-active="defaultActive"
              :background-color="backgroundColor"
              :text-color="textColor"
              :active-text-color="activeTextColor"
            >
              <template v-for="route in filterRoutes(menuRoutes)">
                <el-submenu
                  :title="`${route.title}${startAtText(route)}`"
                  v-if="hasNavChildren(route)"
                  :key="route.name + '-' + route.id"
                  :index="route.name + '-' + route.id"
                  :disabled="route.disabled"
                >
                  <template slot="title" class="chapter-title">
                    <i v-if="route.icon" :class="route.icon"></i>
                    <span slot="title">{{ route.title }}</span>
                  </template>

                  <template v-if="!route.disabled">
                    <el-menu-item
                      :title="routeItem.title"
                      v-for="routeItem in filterRoutes(route.children)"
                      :key="routeItem.name + '-' + routeItem.id"
                      :index="route.id + '-' + routeItem.id"
                      :route="{
                        name: routeItem.name,
                        params: routeItem.params,
                        query: routeItem.query
                      }"
                      :disabled="routeItem.disabled || route.disabled"
                    >
                      <i v-if="routeItem.icon" :class="routeItem.icon"></i>
                      <span slot="title">{{ routeItem.title }}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>

                <el-menu-item
                  v-else
                  :title="route.title"
                  :key="route.name + '-' + route.id"
                  :index="route.id + '-'"
                  :disabled="route.disabled"
                  :route="{
                    name: route.name,
                    params: route.params,
                    query: route.query
                  }"
                >
                  <i v-if="route.icon" :class="route.icon"></i>
                  <span slot="title">{{ route.title }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="platform-content-container">
      <div
        class="platform-content-header"
        :style="[{ backgroundColor: backgroundColor }]"
      >
        <div class="platform-content-header-left">
          <div class="collapse-icon" @click="handleCollapse">
            <i :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
          </div>
        </div>
        <div class="platform-content-header-middle">
          <slot name="content-header-middle"></slot>
        </div>
        <div class="platform-content-header-right"></div>
      </div>
      <div class="platform-content-body">
        <el-scrollbar class="scrollbar-section">
          <slot name="content-mainer"></slot>
        </el-scrollbar>
        <slot name="content-other"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultActive: {
      type: String
    },
    backgroundColor: {
      type: String,
      default: "#545c64"
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    activeTextColor: {
      type: String,
      default: "#35b558"
    },
    menuRoutes: {
      type: Array,
      default: () => []
      // {
      //   id: 1,
      //   title: '第一章',
      //   children: [{
      //     id: 1,
      //     title: '第一节',
      //     icon: 'el-icon-video-play',
      //     path: '/plus/1/platform',
      //     name: 'PlusPlatform',
      //     params: { id: 1 },
      //   }]
      // },{
      //   id: 2,
      //   title: '第二章',
      //   children: [{
      //     id: 2,
      //     title: '第一节',
      //     icon: 'el-icon-video-play',
      //     path: '/plus/2/platform',
      //     name: 'PlusPlatform',
      //     params: { id: 2 },
      //   },{
      //     id: 3,
      //     title: '第二节',
      //     icon: 'el-icon-video-play',
      //     path: '/plus/3/platform',
      //     name: 'PlusPlatform',
      //     params: { id: 3 },
      //   }]
      // },{
      //   id: 3,
      //   title: '作业',
      //   path: '/course/1',
      //   name: 'CourseItem',
      //   params: { id: 1 },
      // }
    }
  },
  data() {
    return {
      defaultOpends: [],
      collapse: false
    };
  },
  created() {
    this.initDefaultOpends();
  },
  mounted() {},
  computed: {
    siderWidth() {
      return this.collapse ? "0px" : "246px";
    }
  },
  methods: {
    initDefaultOpends() {
      this.defaultOpends = this.menuRoutes.map(
        data => `${data.name}-${data.id}`
      );
    },
    handleCollapse() {
      this.collapse = !this.collapse;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.length;
    },
    filterRoutes(routes) {
      return routes;
    },
    startAtText(route) {
      return route.start_at ? "\n项目开启时间：" + route.start_at : "";
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.platform-layout {
  height: 100vh;
  display: flex;

  .scrollbar-section {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
      min-height: 100%;
    }
    .el-scrollbar__view {
      min-height: 100%;
    }
  }

  .el-menu-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-submenu {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .platform-menu-container {
    width: 246px;
    flex: none;
    background-color: #545c64;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;

    .platform-menu-sider {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .platform-menu-header {
        flex: none;
        z-index: 1;
      }

      .platform-menu-body {
        flex: 1;
        height: 0;
        overflow: auto;
      }
    }

    .platform-menu-content {
      border-right: 0;

      .el-menu-item {
        padding: 0 20px !important;
      }
    }
  }
  .platform-content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .platform-content-header {
      flex: none;
      position: relative;
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      padding: 0 60px;
      font-weight: 400;
      color: #fff;
      background-color: #545c64;
      display: flex;
      .platform-content-header-middle {
        flex: 1;
      }
      .collapse-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        font-size: 22px;
        cursor: pointer;
      }
    }
    .platform-content-body {
      position: relative;
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
