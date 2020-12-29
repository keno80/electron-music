<template>
  <div class="search_content">
    <a-page-header
      title="搜索"
      :sub-title="pageHeadTitle"
      @back="() => null"
    />
    <div class="search_tab">
      <template v-for="(item, index) in tabType">
        <a class="tab_item" :class="[searchInfo.searchType === item.value ? 'tab_active' : '']"
           @click="changeSearchType(item.value)">{{ item.name }}</a>
      </template>
    </div>

    <!--    单曲-->
    <div class="search_block" v-if="searchInfo.searchType === 1">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <template v-else>
        <songs-table :data="searchResponse.songs"/>
        <a-pagination size="small" v-model="page" :total="searchResponse.songCount" :pageSize="size"
                      @change="offsetChange"/>
      </template>
    </div>

    <!--    歌手-->
    <div class="artists_grid" v-else-if="searchInfo.searchType === 100">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <artists-grid :data="searchResponse.artists"/>
    </div>

    <!--    专辑-->
    <div class="artists_grid" v-else-if="searchInfo.searchType === 10">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <albums-grid :data="searchResponse.albums"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Pagination from '@/components/Pagination'
import songsTable from './components/songsTable'
import artistsGrid from './components/artistsGrid'
import albumsGrid from './components/albumsGrid'
import global_api from "@/utils/global_api";

export default {
  name: "index",
  components: {
    songsTable,
    artistsGrid,
    albumsGrid,
    Pagination
  },
  watch: {
    //搜索关键词
    '$store.state.headSearch.searchInfo': function (val) {
      this.page = 1
      this.offset = 0
      this.fetchData()
    }
    //搜索类型
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'searchInfo',
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
      pageHeadTitle: '找到 0 首单曲',
      searchResponse: {},
      offset: 0,  //搜索偏移量
      page: 1,
      size: 100,
      searchBlockReady: false,
    }
  },
  methods: {
    fetchData() {
      this.searchBlockReady = false
      global_api.search(this.offset, this.size, this.searchInfo.searchWord, this.searchInfo.searchType).then(res => {
        if (res.data.code === 200) {
          this.searchBlockReady = true
          this.searchResponse = res.data.result

          switch (this.searchInfo.searchType) {
            case 1: {
              this.pageHeadTitle = `找到 ${res.data.result.songCount} 首单曲`
              break;
            }
            case 100: {
              this.pageHeadTitle = `找到 ${res.data.result.artistCount} 位歌手`
              break
            }
            case 10: {
              this.pageHeadTitle = `找到 ${res.data.result.albumCount} 张专辑`
              break
            }
          }
        }
      })
    },
    changeSearchType(type) {
      this.$store.dispatch('headSearch/saveSearchInfo', {searchWord: this.searchInfo.searchWord, searchType: type})
    },
    offsetChange(page, pageSize) {
      this.page = page
      this.offset = (page - 1) * pageSize
      this.fetchData()
    }
  }
}
</script>

<style scoped lang="scss">
.search_content {
  width: 100%;

  .common_style {
    width: 774px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

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
              font-family: PingFang Thin SC, sans-serif;
              font-size: 13px;

              .cell {
                white-space: nowrap;
                padding: 0 4px;

                a {
                  color: #6b6b6b;
                }
              }
            }
          }
        }
      }
    }
  }

  .ant-pagination {
    padding: 20px 10px;
    text-align: center;

    /deep/ .ant-pagination-item-active {
      border-color: #ec4141;

      a {
        color: #ec4141;
      }
    }

    /deep/ .ant-pagination-item:hover {
      a {
        color: #ec4141;
      }
    }

    /deep/ .ant-pagination-next:hover {
      .ant-pagination-item-link {
        color: #ec4141;
      }
    }

    /deep/ .ant-pagination-jump-next-custom-icon {
      .ant-pagination-item-link {
        .ant-pagination-item-container {
          .ant-pagination-item-link-icon {
            color: #ec4141;
          }
        }
      }
    }
  }
}
</style>