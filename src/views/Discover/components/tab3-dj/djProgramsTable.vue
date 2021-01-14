<template>
  <div class="table_block">
    <div class="program_item" v-for="(item, index) in data" :key="index"
         :class="[(index + 1)%2 === 1 ? 'block_color': '']">
      <div class="program_item_index">
        <span>{{ index + 1 }}</span>
      </div>
      <div class="program_item_img">
        <img :src="item.coverUrl + '?param=60y60'"/>
      </div>
      <div class="program_item_name">
        <p>{{ item.name }}</p>
      </div>
      <div class="program_item_play_time common">
        <a-icon type="play-circle"/>
        <span>{{ item.listenerCount | formatCount }}</span>
      </div>
      <div class="program_item_like_count common">
        <a-icon type="like"/>
        <span>{{ item.likedCount | formatCount }}</span>
      </div>
      <div class="program_item_createTime common">
        <span>{{ item.createTime | formatTime }}</span>
      </div>
      <div class="program_item_duration common">
        <span>{{ item.duration | formatDuration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import dayjs from "dayjs";
import {numberToTime} from "@/utils/playerFn";

export default {
  name: "djProgramsTable",
  props: {
    data: Array
  },
  filters: {
    formatCount(val) {
      return val / 10000 > 10 ? lodash.floor(val / 10000) + '万' : val
    },
    formatTime(val) {
      return dayjs(val).format('YYYY-MM-DD')
    },
    formatDuration(val) {
      return numberToTime(val)
    }
  }
}
</script>

<style scoped lang="scss">
.program_item {
  display: flex;
  align-items: center;
  height: 80px;
  font-family: PingFang Thin SC, sans-serif;

  .program_item_index {
    color: #dbdbdb;
    font-size: 13px;
    width: 80px;
    text-align: center;
  }

  .program_item_img {
    img {
      border-radius: 4px;
      border: 1px solid #f1f1f1;
    }
  }

  .program_item_name {
    padding: 0 10px;
    width: 280px;

    p {
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 13px;
      color: #2f2f2f;
    }
  }

  .common {
    color: #acacac;
    width: 90px;
    text-align: center;

    span {
      margin-left: 4px;
      vertical-align: 1px;
      font-size: 12px;
    }
  }
}

.block_color {
  background-color: rgb(249, 249, 249);
}
</style>