<template>
  <div class="hot_search">
    <el-scrollbar style="height: 100%">
      <p class="title">热搜榜</p>
      <div class="hot_search_block">
        <a-list item-layout="horizontal" :data-source="hotSearch">
          <a-list-item slot="renderItem" slot-scope="item, index" @click="saveSearchWord(item.searchWord)">
            <p class="rank_num" :class="[index + 1 <= 3 ? 'top3_num' : '']">{{index + 1}}</p>
            <a style="width: 100%">
              <a-list-item-meta
                :description="item.content"
              >
                <p slot="title" style="margin: 0">
                  {{ item.searchWord }}
                  <img :src="item.iconUrl" :class="[item.iconType === 1 || item.iconType === 0 ? 'icon1' : 'icon5']"
                       v-if="item.iconUrl !== null">
                  <span style="margin-left: 10px;font-size: 11px;color: rgb(218,218,218)">{{ item.score }}</span>
                </p>
              </a-list-item-meta>
            </a>
          </a-list-item>
        </a-list>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import api from './api'

export default {
  name: "HotSearchPanel",
  data() {
    return {
      hotSearch: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getHotSearch().then(res => {
        if (res.data.code === 200) {
          this.hotSearch = res.data.data
        }
      })
    },
    saveSearchWord(searchWord) {
      console.log(searchWord);
      this.$store.dispatch('headSearch/saveSearchInfo', {searchWord, searchType: 1})
    }
  }
}
</script>

<style scoped lang="scss">
.hot_search {
  position: absolute;
  z-index: 1000;
  top: 50px;
  width: 352px;
  background-color: #ffffff;
  height: 430px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, .07);
  border-radius: 4px;
  overflow: hidden;

  .title {
    line-height: 1;
    margin-top: 16px;
    margin-left: 16px;
    margin-bottom: 6px;
  }

  .hot_search_block {
    padding: 4px 0;

    .ant-list {
      .ant-list-item {
        padding: 6px 16px;
        border-bottom: none;
        display: flex;

        &:hover {
          background-color: #f3f3f3;
        }

        .rank_num {
          margin-bottom: 0;
          margin-right: 22px;
          font-size: 16px;
          color: #c7c6c6;
        }

        .top3_num {
          color: #ec4141;
        }

        .ant-list-item-meta-title {
          margin-bottom: 0;
          font-size: 13px;
          font-weight: bold;
        }

        .ant-list-item-meta-description {
          font-size: 12px;
        }
      }
    }
  }

  .icon1 {
    width: 24px;
  }

  .icon5 {
    width: 12px;
  }

  .el-scrollbar {
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    /deep/ .el-scrollbar__bar {
      bottom: 2px;
    }
  }
}
</style>