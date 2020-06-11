<template>
  <div class="home-page">
    <div class="user-section">
      <el-row :gutter="40">
        <el-col :lg="12">
          <div class="grid-content">
            <h3 class="sub-title">能力简介</h3>
            <ul class="user-power">
              <li class="capability" v-for="(item, index) in capability" :key="index">
                <p>{{ index+1 }}、</p>
                <p>{{ item.content }}</p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="grid-content">
            <h3 class="sub-title">技能清单</h3>
            <ul class="user-power">
              <li class="skill" v-for="(item, index) in skills" :key="index">
                {{item.title + "："}}
                <el-tag size="small" v-for="(tag, tagIndex) in item.content" :key="tagIndex">{{tag}}</el-tag>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="work-section">
      <h3 class="sub-title">项目经验</h3>
      <div class="block">
        <div class="row">
          <div class="row-item" v-for="(item, index) in leftItems" :key="index">
            <div class="grid-content">
              <el-card>
                <h4 class="card-title">
                  {{ (item || {}).name }}
                </h4>
                <p class="card-text">
                  <span>工作期间：</span>
                  {{ (item || {}).date | joinArray}}
                </p>
                <p class="card-text">
                  <span>项目地址：</span>
                  <a>{{ (item || {}).address }}</a>
                </p>
                <p class="card-text">
                  <span>项目描述：</span>
                  {{ (item || {}).description }}
                </p>
                <p class="card-text">
                  <span>我的职能：</span>
                  <span class="function" v-for="(func, funcIndex) in (item || {}).function" :key="funcIndex">- {{ func }}</span>
                </p>
                <div class="card-text">
                  <span>相关技术：</span>
                  <div>
                    <el-tag size="small" v-for="(tag, tagIndex) in (item || {}).tech" :key="tagIndex">{{tag}}</el-tag>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-item" v-for="(item, index) in rightItems" :key="index">
            <div class="grid-content">
              <el-card>
                <h4 class="card-title">
                  {{ (item || {}).name }}
                </h4>
                <p class="card-text">
                  <span>工作期间：</span>
                  {{ (item || {}).date | joinArray}}
                </p>
                <p class="card-text">
                  <span>项目地址：</span>
                  <a>{{ (item || {}).address }}</a>
                </p>
                <p class="card-text">
                  <span>项目描述：</span>
                  {{ (item || {}).description }}
                </p>
                <p class="card-text">
                  <span>我的职能：</span>
                  <span class="function" v-for="(func, funcIndex) in (item || {}).function" :key="funcIndex">- {{ func }}</span>
                </p>
                <div class="card-text">
                  <span>相关技术：</span>
                  <div>
                    <el-tag size="small" v-for="(tag, tagIndex) in (item || {}).tech" :key="tagIndex">{{tag}}</el-tag>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    capability:{
      type: Array,
      default: function() {
        return [];
      }
    },
    items:{
      type: Array,
      default: function() {
        return [];
      }
    },
    skills:{
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed:{
    leftItems(){
      return this.items.filter((data,index) => { 
        if(index%2 === 0){
          return data
        }
      })
    },
    rightItems(){
      return this.items.filter((data,index) => {
        if(index%2 !== 0){
          return data
        }
      })
    }
  },
  filters: {
    joinArray(val){
      let data = val || [];
      if(data[0] === data[1]){
        return data[0]
      }else {
        return data.join(" ~ ")
      }
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
@media screen and (max-width: 720px) {
  .block {
    display: block !important;
    .row {
      width: 100% !important;
      padding: 0 !important;
    }
  }
}
.home-page {
  padding: 40px;
  .sub-title {
    font-size: 18px;
    margin-bottom: 16px;
  }
  .card-title {
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
  }
  .card-text {
    font-size: 14px;
    color: #666;
    margin: 8px 0;
    span {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      display: block;
    }
    a {
      font-size: 14px;
      color: #409EFF;
      font-weight: bold;
    }
    .function {
      font-size: 14px;
      color: #666;
      font-weight: normal;
      line-height: 18px;
      margin: 2px 0 6px 6px;
    }
    .el-tag {
      margin-top: 6px;
      display: inline-block;
      height: 32px;
      padding: 0 10px;
      line-height: 30px;
      font-size: 12px;
      color: #409EFF;
    }
  }
  .user-power {
    list-style: none;
    padding: 0;
    .capability {
      display: flex;
      margin-bottom: 2px;
      p {
        line-height: 22px;
        margin: 0;
      }
    }
    .skill {
      margin-bottom: 5px;
    }
  }
  .grid-content {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 2;
  }
  .el-tag {
    margin-right: 8px;
  }
  .el-timeline {
    padding: 0;
  }
  .block {
    display: flex;
    .row {
      width: 50%;
      padding: 0 10px;
    }
  }
}
</style>
