<template>
  <div class="music_list_content">
    <div class="music_list_detail_block">
      <img :src="musicListDetail.coverImgUrl + '?param=184y184'">
      <div class="music_list_detail">
        <div class="title">
          <a-tag color="red" style="vertical-align: text-bottom">歌单</a-tag>
          <span class="music_list_name">{{ musicListDetail.name }}</span>
        </div>
        <div class="creator">
          <a>
            <img :src="musicListDetail.creator.avatarUrl + '?param=26y26'">
            <span>{{ musicListDetail.creator.nickname }}</span>
            <span class="createTime">{{ musicListDetail.createTime | formatDate }}</span>
          </a>
        </div>
        <div class="options">
          <a-button type="primary" shape="round">
            <a-icon type="caret-right"/>
            播放全部
          </a-button>
          <a-button type="primary" shape="round">
            <a-icon type="star"/>
            收藏({{ musicListDetail.subscribedCount | countFormat }})
          </a-button>
          <a-button type="primary" shape="round">
            <a-icon type="share-alt"/>
            分享({{ musicListDetail.shareCount | countFormat }})
          </a-button>
          <a-button type="primary" shape="round">
            <a-icon type="cloud-download"/>
            下载全部
          </a-button>
        </div>
        <div class="misc">
          <p>标签：
            <a-tag v-for="(item, index) in musicListDetail.tags" :key="index" color="red" style="margin-right: 6px">
              {{ item }}
            </a-tag>
          </p>
          <p>
            <span style="margin-right: 16px">歌曲：{{ musicListDetail.trackCount }}</span>
            <span>播放：{{ musicListDetail.playCount | countFormat }}</span>
          </p>
          <p class="default" :class="{description: ellipsis}">简介：{{ musicListDetail.description }}</p>
          <a class="caret" @click="showEllipsis">
            <a-icon type="caret-down" v-if="ellipsis"/>
            <a-icon type="caret-up" v-else/>
          </a>
        </div>
      </div>
    </div>
    <div class="music_list">
      <a-tabs :active-key="key" @change="keyCB">
        <a-tab-pane key="1" tab="歌曲列表">
          <music-list-table :data="musicList"/>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="'评论(' + musicListDetail.commentCount + ')' ">
          <comments :hotComments="comments.hotComments" :normalComments="comments.normalComments" :total="comments.total"/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="收藏者">

        </a-tab-pane>
        <a-input slot="tabBarExtraContent" v-if="key === '1'" size="small" placeholder="搜索歌单音乐">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="search" style="color: rgba(0,0,0,.45)"/>
          </a-tooltip>
        </a-input>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import lodash from "lodash";
import dayjs from 'dayjs'
import musicListTable from "@/views/MusicListDetail/component/musicListTable";
import Comments from '@/components/Comments'
import global_api from "@/utils/global_api";

export default {
  name: "index",
  components: {
    musicListTable,
    Comments
  },
  computed: {
    ...mapGetters([
      'musicList',
      'musicListDetail'
    ])
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('YYYY-MM-DD') + '创建'
    },
    countFormat(val) {
      return val / 10000 > 1 ? lodash.floor(val / 10000, 0) + '万' : val
    }
  },
  data() {
    return {
      ellipsis: true,
      key: '1',
      comments: {
        normalComments: [],
        hotComments: [],
        total: 0
      }
    }
  },
  methods: {
    showEllipsis() {
      this.ellipsis = !this.ellipsis
    },
    keyCB(key) {
      this.key = key
      if (key === '2') {
        global_api.getMusicListComments(this.musicListDetail.id).then(res => {
          if (res.data.code === 200) {
            this.comments.normalComments = res.data.comments
            this.comments.hotComments = res.data.hotComments
            this.comments.total = res.data.total
          }
          console.log(res);
        })
      }
    }
  },
  created() {
    console.log(this.musicListDetail);
    console.log(this.musicList);
  }
}
</script>

<style scoped lang="scss">
.music_list_content {
  width: 100%;
  padding-top: 14px;

  .music_list_detail_block {
    display: flex;

    img {
      border: 1px solid #d4d4d4;
      border-radius: 4px;
      height: 184px;
    }

    .music_list_detail {
      margin-left: 20px;

      .music_list_name {
        font-weight: bolder;
        font-family: "PingFang ZhongCu SC", sans-serif;
        font-size: 18px;
      }

      .creator {
        margin-top: 10px;
        font-size: 12px;

        img {
          border-radius: 50%;
          margin-right: 6px;
          height: 26px;
        }

        .createTime {
          margin-left: 6px;
          color: #acacac;
        }
      }

      .options {
        margin-top: 10px;

        .ant-btn-primary {
          background-color: #ec4141;
          border-color: #ec4141;
          margin-right: 14px;
        }
      }

      .misc {
        margin-top: 20px;
        position: relative;

        p {
          margin-bottom: 4px;
        }

        .default {
          width: 540px;
          margin-right: 10px;
          display: inline-block;
        }

        .description {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .caret {
          position: absolute;
          color: rgb(89, 89, 89);
        }
      }
    }
  }

  .music_list {
    margin-top: 20px;
    width: 774px;

    /deep/ .ant-tabs-bar {
      border-bottom: none;
      margin-bottom: 10px;

      .ant-tabs-tab-active {
        color: #ec4141;
      }

      .ant-tabs-tab {
        padding: 12px 0;

        &:hover {
          color: #ec4141;
        }
      }

      .ant-tabs-ink-bar {
        background-color: #ec4141;
      }

      .ant-input-sm {
        border: none;
        border-radius: 12px;
        background-color: rgba(231, 231, 231, 0.2);
        font-size: 12px;

        &::placeholder {
          font-size: 12px;
          color: #cfcfcf;
        }

        &:focus {
          border: none;
          box-shadow: none;
        }
      }
    }

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
}
</style>