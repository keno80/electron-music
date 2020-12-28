<template>
  <div class="search_content">
    <a-page-header
      title="搜索"
      :sub-title="'找到 ' + searchResponse.songCount + ' 首单曲'"
      @back="() => null"
    />
    <div class="search_tab">
      <template v-for="(item, index) in tabType">
        <a class="tab_item" :class="[searchInfo.searchType === item.value ? 'tab_active' : '']">{{ item.name }}</a>
      </template>
    </div>

    <div class="search_block">
      <songs-table :data="searchResponse.songs"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import songsTable from './components/songsTable'

export default {
  name: "index",
  components: {
    songsTable
  },
  computed: {
    ...mapGetters([
      'searchInfo',
      'searchResponse'
    ])
  },
  data() {
    return {
      tabType: [
        {
          name: '单曲',
          value: 1
        },
        {
          name: '歌手',
          value: 100
        },
        {
          name: '专辑',
          value: 10
        },
        {
          name: '视频',
          value: 1014
        },
        {
          name: '歌单',
          value: 1000
        },
        {
          name: '歌词',
          value: 1006
        },
        {
          name: '用户',
          value: 1002
        }],
    }
  }
}
</script>

<style scoped lang="scss">
.search_content {
  width: 100%;

  .ant-page-header {
    padding: 10px 0 14px 0;
  }

  .search_tab {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 8px;

    .tab_item {
      margin-right: 30px;
      color: #222222;

      &:hover {
        color: #ec4141;
      }
    }

    .tab_active {
      color: #ec4141;
    }
  }

  .search_block {
    /deep/ .el-table {
      .el-table__header-wrapper {
        .el-table__header {
          .has-gutter {
            tr {
              th {
                padding: 4px 0;
                font-size: 13px;
                .cell {
                  padding: 0 4px;
                }
              }
            }
          }
        }
      }

      .el-table__body-wrapper {
        .el-table__body {
          .el-table__row {
            td {
              padding: 4px 0;
              font-family: PingFang Thin SC,sans-serif;
              font-size: 13px;

              .cell {
                white-space: nowrap;
                padding: 0 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>