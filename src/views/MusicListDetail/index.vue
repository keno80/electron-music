<template>
  <div class="music_list_content">
    <div class="music_list_detail_block">
      <img :src="detail.coverImgUrl + '?param=184y184'" v-if="detailTag === '歌单'">
      <img :src="detail.picUrl + '?param=184y184'" v-else>
      <div class="music_list_detail">
        <div class="title">
          <a-tag color="red" style="vertical-align: text-bottom">{{ detailTag }}</a-tag>
          <span class="music_list_name">{{ detail.name }}</span>
        </div>
        <div class="creator">
          <!--          歌单信息-->
          <a v-if="detailTag === '歌单'">
            <img :src="detail.creator.avatarUrl + '?param=26y26'">
            <span>{{ detail.creator.nickname }}</span>
            <span class="createTime">{{ detail.createTime | formatDate }}</span>
          </a>

          <!--          电台信息-->
          <a v-else>
            <img :src="detail.dj.avatarUrl + '?param=26y26'">
            <span>{{ detail.dj.nickname }}</span>
            <span class="createTime">{{ detail.createTime | formatDate }}</span>
          </a>
        </div>
        <div class="options">
          <a-button-group>
            <a-button type="primary" class="group_style" @click="addOrPlay('play')">
              <a-icon type="caret-right"/>
              播放全部
            </a-button>
            <a-button type="primary" class="group_plus" @click="addOrPlay('add')">
              <a-icon type="plus"/>
            </a-button>
          </a-button-group>
          <a-button type="primary" shape="round">
            <!--          歌单为收藏、电台为订阅-->
            <template v-if="detailTag === '歌单'">
              <a-icon type="star"/>
              收藏({{ detail.subscribedCount | countFormat }})
            </template>
            <template v-else>
              <a-icon type="star"/>
              订阅({{ detail.subCount | countFormat }})
            </template>
          </a-button>
          <a-button type="primary" shape="round">
            <a-icon type="share-alt"/>
            分享({{ detail.shareCount | countFormat }})
          </a-button>
          <a-button type="primary" shape="round" v-if="detailTag === '歌单'">
            <a-icon type="cloud-download"/>
            下载全部
          </a-button>
        </div>
        <div class="misc">
          <template v-if="detailTag === '歌单'">
            <p>标签：
              <a-tag v-for="(item, index) in detail.tags" :key="index" color="red" style="margin-right: 6px">
                {{ item }}
              </a-tag>
            </p>
            <p>
              <span style="margin-right: 16px">歌曲：{{ detail.trackCount }}</span>
              <span>播放：{{ detail.playCount | countFormat }}</span>
            </p>
            <p class="default" :class="{description: ellipsis}">简介：{{ detail.description }}</p>
            <a class="caret" @click="showEllipsis">
              <a-icon type="caret-down" v-if="ellipsis"/>
              <a-icon type="caret-up" v-else/>
            </a>
          </template>
          <template v-else>
            <p>
              <a-tag color="red" style="margin-right: 6px">
                {{ detail.category }}
              </a-tag>
              {{ detail.desc }}
            </p>
          </template>
        </div>
      </div>
    </div>
    <div class="music_list">
      <a-tabs :active-key="key" @change="keyCB">
        <a-tab-pane key="1" :tab="firstTag">
          <template v-if="list.length !== 0">
            <music-list-table :data="list" @rowDbClick="rowDbClick" v-if="detailTag === '歌单'"/>
            <dj-programs-table v-else :data="list"/>
          </template>
          <div class="spin" v-else>
            <a-spin tip="请稍后...">
              <a-icon slot="indicator" type="loading" style="font-size: 24px" spin/>
            </a-spin>
          </div>

        </a-tab-pane>
        <a-tab-pane key="2" :tab="'评论(' + detail.commentCount + ')' " v-if="detailTag === '歌单'">
          <comments :hotComments="comments.hotComments" :normalComments="comments.normalComments"
                    :total="comments.total"/>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="thirdTag">
          <user-grid :data="subscribers"/>
        </a-tab-pane>
        <a-input slot="tabBarExtraContent" v-if="key === '1' && detailTag === '歌单'" size="small" placeholder="搜索歌单音乐">
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
import djProgramsTable from "@/views/Discover/components/tab3-dj/djProgramsTable";
import Comments from '@/components/Comments'
import UserGrid from '@/components/UserGrid'
import global_api from "@/utils/global_api";
import api from '@/views/Discover/api'
import {concatPlayListAndMusicList} from "@/utils/playerFn";

export default {
  name: "index",
  components: {
    musicListTable,
    djProgramsTable,
    Comments,
    UserGrid
  },
  computed: {
    ...mapGetters([
      'playList',  //播放列表
      'nowPlayMusic',  //正在播放的音乐
      'musicList',  //歌单包含的音乐
      'musicListDetail',  //歌单详情
      'musicListIds',  //歌单的id
      'playType',  //播放模式
      'detailTag',  //详情页tag
      'programList',  //电台节目列表
      'programDetail'  //电台详情
    ]),
    detail() {
      console.log(this.programDetail);
      return this.detailTag === '歌单' ? this.musicListDetail : this.programDetail
    },
    list() {
      return this.detailTag === '歌单' ? this.musicList : this.programList
    },
    firstTag() {
      return this.detailTag === '歌单' ? '歌曲列表' : '节目(' + this.programDetail.programCount + ')'
    },
    thirdTag() {
      let sub = this.programDetail.subCount / 10000 > 10 ? lodash.floor(this.programDetail.subCount / 10000, 0) + '万' : this.programDetail.subCount
      return this.detailTag === '歌单' ? '收藏者' : '订阅者(' + sub + ')'
    }
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('YYYY-MM-DD') + '创建'
    },
    countFormat(val) {
      return val / 10000 > 10 ? lodash.floor(val / 10000, 0) + '万' : val
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
      },
      subscribers: []
    }
  },
  methods: {
    playAll() {
      this.$store.dispatch('playerWidget/cleanPlayList')
      this.$store.dispatch('musicList/cleanPlayListState')

    },
    addOrPlay(type) {
      //如果是添加到播放列表，先判断当前播放列表是否为空
      if (type === 'add') {
        //如果为空，直接将歌单音乐添加到播放列表
        if (this.playList.length === 0) {
          this.$store.dispatch('playerWidget/addMultiToPlayListMusic', this.musicList)
          this.$store.dispatch('musicList/saveMusicListIds', this.musicListDetail.id)
          this.emptyListFunction()
        } else {
          //如果播放列表不为空，则先判断当前歌单的id是否存在于存储的id中，存在则不进行操作
          //不存在的话则将歌曲插入正在播放的歌曲后面
          if (this.musicListIds.indexOf(this.musicListDetail.id) === -1) {
            //获取当前播放的音乐所在播放列表的index
            let index = lodash.findIndex(this.playList, this.nowPlayMusic)
            let newPlayList = concatPlayListAndMusicList(this.playList, this.musicList, index)

            this.$store.dispatch('playerWidget/addMultiToPlayListMusic', newPlayList)
          }
        }
      } else {
        if (this.playList.length === 0) {
          this.$store.dispatch('playerWidget/addMultiToPlayListMusic', this.musicList)
          this.$store.dispatch('musicList/saveMusicListIds', this.musicListDetail.id)
          this.emptyListFunction()
        } else {
          //如果播放列表不为空，则直接清除播放列表状态与存储的歌单id
          this.$store.dispatch('musicList/cleanPlayListState')
          this.$store.dispatch('playerWidget/cleanPlayList')
          //清除之后，重新存储当前播放的歌单id
          this.$store.dispatch('musicList/saveMusicListIds', this.musicListDetail.id)
          setTimeout(() => {
            //将当前歌单的歌曲赋值给正在播放列表
            this.$store.dispatch('playerWidget/addMultiToPlayListMusic', this.musicList)
            this.emptyListFunction()
          }, 100)
        }
      }
    },
    //当播放列表为空时的操作，同时适用于添加和播放全部
    emptyListFunction() {
      //添加到播放列表以后，判断当前的播放模式来自动播放音乐，随机模式与其他模式处理不相同
      let playIndex = null
      if (this.playType === 3) {
        playIndex = Math.floor(Math.random() * this.playList.length)
      } else {
        playIndex = 0
      }
      this.$store.dispatch('playerWidget/nowPlayMusicId', this.playList[playIndex].id)
    },
    //音乐列表双击事件
    rowDbClick(id) {
      if (this.playList.length === 0) {
        this.$store.dispatch('playerWidget/addMultiToPlayListMusic', this.musicList)
        this.$store.dispatch('musicList/saveMusicListIds', this.musicListDetail.id)
        this.$store.dispatch('playerWidget/nowPlayMusicId', id)
      } else {
        this.$store.dispatch('playerWidget/nowPlayMusicId', id)
      }
    },
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
        })
      }

      if (key === '3' && this.detailTag === '歌单') {
        global_api.getMusicListSubscriber(this.musicListDetail.id).then(res => {
          if (res.data.code === 200) {
            this.subscribers = res.data.subscribers
          }
        })
      } else {
        api.djSubscriber(this.programDetail.id).then(res => {
          if (res.data.code === 200) {
            this.subscribers = res.data.subscribers
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/musicListDeatil";
</style>