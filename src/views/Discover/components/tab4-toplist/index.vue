<template>
  <div class="top_list_block">
    <h2>官方榜</h2>
    <div class="top_list_content">
      <template v-for="(item, index) in topList" v-if="item.ToplistType">
        <div class="top_list_item">
          <img :src="item.coverImgUrl + '?param=159y159'"/>
          <p class="update_time">{{ item.updateTime | formatDate }}</p>
          <top-list-table :data="item.tracks"/>
          <a-icon type="caret-right" class="play_common"/>
        </div>
      </template>
    </div>
    <h2>全部榜单</h2>
    <div class="top_list_other">
      <template v-for="(item, index) in topList" v-if="index > 3">
        <div class="other_list_box">
          <img :src="item.coverImgUrl + '?param=140y140'"/>
          <p>{{ item.name }}</p>
          <p class="play_count">
            <a-icon type="caret-right"/>
            {{ item.playCount | countFormat }}
          </p>
          <a-icon type="caret-right" class="play_common"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/views/Discover/api'
import dayjs from "dayjs";
import lodash from "lodash";
import topListTable from "@/views/Discover/components/tab4-toplist/topListTable";

export default {
  name: "index",
  components: {
    topListTable
  },
  data() {
    return {
      topList: []
    }
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('MM月DD日') + '更新'
    },
    countFormat(val) {
      return val / 10000 > 10 ? lodash.floor(val / 10000, 0) + '万' : val
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.topListDesc().then(res => {
        if (res.data.code === 200) {
          this.topList = res.data.list
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.top_list_block {
  width: 774px;

  h2 {
    margin: 0;
    font-weight: bolder;
  }

  .top_list_content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-bottom: 10px;

    .top_list_item {
      width: 387px;
      display: flex;
      margin-bottom: 32px;
      position: relative;

      &:hover {
        .play_common {
          display: block;
          left: 62px;
          top: 58px;
        }
      }

      img {
        border-radius: 6px;
      }

      .update_time {
        position: absolute;
        margin-bottom: 0;
        left: 45px;
        top: 102px;
        color: #ffffff;
        font-size: 12px;
        font-family: PingFang Thin SC, sans-serif;
      }
    }
  }

  .top_list_other {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::after {
      content: " ";
      width: 141px;
    }

    img {
      border-radius: 6px;
      border: 1px solid #ececec;
    }

    .other_list_box {
      margin-bottom: 10px;
      width: 141px;
      position: relative;

      &:hover {
        .play_common {
          display: block;
        }
      }

      p {
        margin: 6px 0;
        color: #323232;
      }

      .play_count {
        position: absolute;
        margin: 0;
        top: 2px;
        right: 6px;
        color: #ffffff;
        font-size: 12px;
        font-family: PingFang Thin SC, sans-serif;
      }
    }
  }

  .play_common {
    position: absolute;
    top: 54px;
    left: 54px;
    color: #ec4141;
    font-size: 20px;
    background-color: rgba(255, 255, 255, .9);
    padding: 8px;
    border-radius: 50%;
    display: none;
  }
}

</style>