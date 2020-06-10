<template>
  <div class="page-content">
    <div class="container-1080">
      <div class="stack-section">
        <span class="stack-name">{{ stack.name }}</span>
        <img class="stack-img" v-if="stack.image_url" :src="stack.image_url" />
      </div>
      <div class="question-section" v-if="!finished">
        <div class="question-count">
          共 {{ currentIndex + 1 }}/{{ questions.length }} 题
        </div>
        <div class="question-stem" v-html="question.stem"></div>
        <div class="question-option-list">
          <div
            class="question-option-item"
            v-for="(item, index) in question.option"
            :key="index"
            @click="handleSelect(index)"
          >
            <div v-html="item"></div>
          </div>
        </div>
      </div>
      <div class="result-section">
        <div class="result-title">答对 {{ correctCount }} 题</div>
        <span class="result-btn" v-if="finished" @click="getData"
          >再测一次</span
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import stackService from "@/globals/service/stack.js";

export default {
  data() {
    return {
      finished: false,
      currentIndex: 0,
      stack: {
        name: "",
        image_url: ""
      },
      questions: []
    };
  },
  created() {
    this.getData();
  },
  computed: {
    question() {
      const question = this.questions[this.currentIndex] || {};
      question.option = question.option ? JSON.parse(question.option) : "";
      return question;
    },
    correctCount() {
      return this.questions.filter(data => data.correct === data.selectIndex)
        .length;
    }
  },
  methods: {
    getData() {
      const id = this.$route.params.id;
      stackService.random(id).then(res => {
        this.stack = res.stack;
        res.question.forEach(data => (data.selectIndex = ""));
        this.questions = res.question;
        this.finished = false;
        this.currentIndex = 0;
      });
    },
    handleSelect(index) {
      this.questions[this.currentIndex].selectIndex = index;
      if (this.currentIndex === this.questions.length - 1) {
        // 最后一题
        this.finished = true;
        return;
      }
      this.currentIndex = this.currentIndex + 1;
    }
  }
};
</script>

<style type="text/css" lang="less" scoped="">
.stack-section {
  padding: 20px 0;
  .stack-name {
    vertical-align: middle;
    margin-right: 8px;
    font-size: 14px;
    color: #333;
  }

  .stack-img {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: middle;
  }
}

.question-section {
  .question-count {
    text-align: right;
  }
  .question-stem {
    color: #333;
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .question-option-item {
    padding: 10px 20px;
    margin-top: 8px;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      transition: all 0.2s ease;
      background-color: #333;
      color: #fff;
    }
  }
}
.result-section {
  text-align: center;
  .result-title {
    font-size: 18px;
    color: #333;
    text-align: center;
    margin-top: 20px;
  }
  .result-btn {
    display: inline-block;
    margin-top: 16px;
    padding: 5px 8px;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
