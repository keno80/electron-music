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
          <comments :hotComments="comments.hotComments" :normalComments="comments.normalComments"
                    :total="comments.total"/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="收藏者">
          <user-grid :data="subscribers"/>
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
import UserGrid from '@/components/UserGrid'
import global_api from "@/utils/global_api";
import {concatPlayListAndMusicList} from "@/utils/playerFn";

export default {
  name: "index",
  components: {
    musicListTable,
    Comments,
    UserGrid
  },
  computed: {
    ...mapGetters([
      'playList',
      'nowPlayMusic',
      'musicList',
      'musicListDetail',
      'musicListIds',
      'playType'
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
        console.log('add');
        //如果为空，直接将歌单音乐添加到播放列表
        if (this.list.length === 0) {
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
        console.log('play');
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

      if (key === '3') {
        global_api.getMusicListSubscriber(this.musicListDetail.id).then(res => {
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