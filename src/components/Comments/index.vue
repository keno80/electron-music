<template>
  <div class="comments">
    <div class="hot_comments" v-if="hotComments.length !== 0">
      <p class="comments_type">精彩评论</p>
      <template v-for="(item, index) in hotComments">
        <div class="comments_content">
          <a-avatar :src="item.user.avatarUrl" :size="40"/>
          <div>
            <p class="comments_detail"><a>{{ item.user.nickname }}</a>：{{ item.content }}</p>
            <p class="comments_time">{{ item.time | formatDate }}</p>
          </div>
        </div>
        <a-divider v-if="index !== hotComments.length - 1"/>
      </template>
    </div>

    <div class="normal_comments" v-if="normalComments.length !== 0">
      <p class="comments_type">最新评论({{total}})</p>
      <template v-for="(item, index) in normalComments">
        <div class="comments_content">
          <a-avatar :src="item.user.avatarUrl" :size="40"/>
          <div>
            <p class="comments_detail"><a>{{ item.user.nickname }}</a>：{{ item.content }}</p>
            <p class="comments_time">{{ item.time | formatDate }}</p>
          </div>
        </div>
        <a-divider v-if="index !== normalComments.length - 1"/>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "index",
  props: {
    normalComments: Array,
    hotComments: Array,
    total: Number
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style scoped lang="scss">
.comments {

  .hot_comments {
    margin-bottom: 50px;
  }

  .normal_comments {
    margin-bottom: 50px;
  }

  .comments_type {
    font-weight: bolder;
    font-family: "PingFang ZhongCu SC", sans-serif;

  }

  .comments_content {
    display: flex;

    .comments_detail {
      margin: 0 0 0 10px;
      font-size: 12px;
      color: #434141;

      a {
        color: #1f7fbf;
      }
    }

    .comments_time {
      margin: 10px 0 0 10px;
      color: #acacac;
      font-size: 11px;
    }
  }

  .ant-divider-horizontal {
    margin: 16px 0;
  }
}
</style>