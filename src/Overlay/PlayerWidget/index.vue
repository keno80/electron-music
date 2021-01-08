<template>
  <a-layout-footer style="z-index: 1002" :class="[detailStatus && !listStatus ? 'custom_footer' : '']">
    <div class="player_content">
      <div class="song_info" v-if="haveSongInfo">
        <a-avatar shape="square" :size="50" icon="smile"/>
        <div class="blocks">
          <p class="song_name">当前没有音乐哦</p>
          <p class="artists">赶快去挑一首吧</p>
        </div>
      </div>

      <div class="song_info" v-else>
        <img :src="nowPlayMusic.al.picUrl" @click="showDetail">
        <div class="blocks">
          <p class="song_name">{{ nowPlayMusic.name }}</p>
          <p class="artists">
            <template v-for="(item, index) in nowPlayMusic.ar">
              <a class="artists_name" @click="toArtistPage(item.id)">{{ item.name }}</a>
              <span
                v-if="nowPlayMusic.ar.length > 1 && index !== nowPlayMusic.ar.length - 1">/</span>
            </template>
          </p>
        </div>
      </div>
      <div class="controller">
        <div class="play_widget">
          <icon-font type="icon-shunxubofang" class="cycle_style" v-if="playType === 0" @click="changePlayType(0)"/>
          <icon-font type="icon-liebiaoxunhuan" class="cycle_style" v-else-if="playType === 1"
                     @click="changePlayType(1)"/>
          <icon-font type="icon-danquxunhuan" class="cycle_style" v-else-if="playType === 2"
                     @click="changePlayType(2)"/>
          <icon-font type="icon-suiji" class="cycle_style" v-else-if="playType === 3" @click="changePlayType(3)"/>
          <a-icon type="step-backward" class="pre_icon" @click="previousAndNext('pre')"/>
          <a-icon type="pause" style="font-size: 20px" class="play_style" @click="play" v-if="playStatus"/>
          <a-icon type="caret-right" style="font-size: 20px" class="play_style" @click="play" v-else/>
          <a-icon type="step-forward" class="next_icon" @click="previousAndNext('next')"/>
          <icon-font type="icon-lyric" style="margin-left: 30px;vertical-align: 0" @click="showLyric"/>
        </div>
        <div class="progress_bar">
          <a-row>
            <a-col :span="2">
              <span class="progress_time">{{ currentTime }}</span>
            </a-col>
            <a-col :span="20">
              <a-slider id="test" :value="sliderVal" @change="handleSlider" :tipFormatter="null"/>
            </a-col>
            <a-col :span="2">
              <span class="progress_time">{{ totalTime }}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="tool_block">
        <a-icon type="sound" style="font-size: 22px"/>
        <a-slider :default-value="volumeVal" @change="setVolume"/>
        <a style="color: #3e3e3e;margin-top: 3px" @click="showMusicList">
          <a-icon type="bars" style="font-size: 22px"/>
        </a>
      </div>
    </div>

    <!--    音乐详情-->
    <a-drawer placement="bottom" :closable="false" :visible="detailStatus" height="670px" wrapClassName="detail_drawer">
      <music-detail/>
    </a-drawer>

    <!--    播放列表-->
    <a-drawer
      title="播放列表"
      placement="right"
      :closable="false"
      :visible="listStatus"
      :maskClosable="true"
      :z-index="1000"
      :width="420"
      :wrap-style="{ position: 'absolute', zIndex: 1001}"
      wrapClassName="play_list_drawer"
    >
      <play-list/>
    </a-drawer>

    <audio :src="songUrl" autoplay ref="audio"/>
  </a-layout-footer>
</template>

<script>
import global_api from "@/utils/global_api";
import {mapGetters} from 'vuex'
import {validArray, validObject} from "@/utils/validate";
import {timeToString, TimeToSeconds} from "@/utils/playerFn";
import MusicDetail from '@/components/MusicDetail'
import PlayList from './playList'
import lodash from "lodash";
import {Icon} from 'ant-design-vue'
import {createDeskLyricWindow} from '@/electron/lyricFloating'

const {ipcRenderer} = window.require('electron')

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2274170_4yb5dpmt4z.js'
})

export default {
  name: "index",
  components: {
    MusicDetail,
    PlayList,
    IconFont
  },
  computed: {
    ...mapGetters([
      'nowPlayMusic',
      'listStatus',
      'playList',
      'playStatus',
      'detailStatus'
    ]),
    haveSongInfo() {
      return !validObject(this.nowPlayMusic)
    },
  },
  watch: {
    '$store.state.playerWidget.nowPlayMusicId': function (newVal) {
      if (newVal !== '') {
        this.getMusic(newVal)
      }

    },
    '$store.state.playerWidget.playList.list': function (newVal) {
      if (!validArray(newVal)) {
        this.songUrl = ''
        this.currentTime = '00:00'
        this.totalTime = '00:00'
        this.sliderVal = 0
      }
    },
    //用于播放列表双击事件
    '$store.state.playerWidget.playStatus': function (newVal) {
      let audio = this.$refs.audio
      if (newVal === true && this.songUrl !== '') {
        audio.play()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.audio.volume = this.volumeVal / 100
    })
  },
  data() {
    return {
      musicAvailable: false,  //音乐是否可用
      songUrl: '',  //音乐播放地址
      totalTime: '00:00',  //音乐总时长
      currentTime: '00:00',  //当前播放进度
      sliderVal: 0,  //播放条百分比
      volumeVal: 70,  //音量百分比
      lyric: [],  //歌词
      lyricIndex: 0,  //歌词index
      playType: 0  //播放模式  0 - 顺序播放 1 - 列表循环 2 - 单曲循环 3 - 随机
    }
  },
  methods: {
    //获取音乐地址
    getMusic(id) {
      //检查音乐是否可用
      let musicInfo = {}

      global_api.checkMusicAvailable(id).then(res => {
        if (res.data.success === true) {
          this.musicAvailable = true


          //获取音乐详情
          global_api.getMusicDetail(id).then(res => {
            if (res.data.code === 200) {
              musicInfo = res.data.songs[0]
              //存储到正在播放
              this.$store.dispatch('playerWidget/nowPlayMusic', musicInfo)

              //判断当前音乐再播放列表是否存在，不存在则存储，顺便增加uid(用于播放列表)
              setTimeout(() => {
                if (lodash.findIndex(this.playList, musicInfo) === -1) {
                  this.$store.dispatch('playerWidget/addPlayListMusic', musicInfo)
                }
              }, 400)
            }
          })

          //获取音乐播放地址
          global_api.getMusicUrl(id).then(res => {
            // console.log(res);
            if (res.data.code === 200) {
              this.songUrl = res.data.data[0].url
              this.getLyric(id)
              this.$store.dispatch('playerWidget/refreshPlayStatus', true)
              this.audioInit()
            }
          })
        } else {
          this.musicAvailable = false
        }
      })
    },
    //获取歌词
    getLyric(id) {
      global_api.getMusicLyric(id).then(res => {
        if (res.data.code === 200) {
          if (res.data.nolyric && res.data.nolyric === true) {
            this.lyric = []
            this.lyric.push({
              index: 0,
              lyric: '暂时没有歌词哟~',
              time: 0,
              uid: Math.random().toString().slice(6)
            })
            this.$store.dispatch('playerWidget/saveLyric', this.lyric)
          } else {
            this.handleLyric(res.data.lrc.lyric)
          }
        }
      })
    },
    //歌词处理
    handleLyric(lrc) {
      let lyricsObjArr = []
      const regNewLine = /\n/
      const lineArr = lrc.split(regNewLine)  //每行歌词的数组
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/

      lineArr.forEach((item) => {
        if (item === '') return
        const obj = {}
        const time = item.match(regTime)

        obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
        obj.time = time ? TimeToSeconds(time[0].slice(1, time[0].length - 1)) : 0
        obj.uid = Math.random().toString().slice(6)
        obj.lyric === '' ? console.log('这一行没有歌词') : lyricsObjArr.push(obj)
      })

      this.lyric = lyricsObjArr.map((item, index) => {
        item.index = index
        return {
          ...item
        }
      })

      this.$store.dispatch('playerWidget/saveLyric', this.lyric)
      localStorage.setItem('lyricFloating', JSON.stringify(this.lyric))
    },
    //显示桌面歌词
    showLyric() {
      // createDeskLyricWindow()
      // ipcRenderer.send('closeDesk')
      // localStorage.setItem('lyricFloating', JSON.stringify(this.lyric))


    },
    //每次播放音乐时初始化
    audioInit() {
      let audio = this.$refs.audio
      audio.addEventListener('canplay', () => {
        this.totalTime = timeToString(audio.duration)
        console.log(audio.duration);
      })

      audio.addEventListener('timeupdate', () => {
        this.currentTime = timeToString(audio.currentTime)
        this.sliderVal = (audio.currentTime / audio.duration).toFixed(2) * 100

        //歌词index
        let compareTime = audio.currentTime;
        for (let i = 0; i < this.lyric.length; i++) {
          if (compareTime > parseInt(this.lyric[i].time)) {
            const index = this.lyric[i].index;
            if (i === parseInt(index)) {
              this.lyricIndex = i;
              this.$store.dispatch('playerWidget/saveLyricIndex', this.lyricIndex)
            }
          }
        }

        //桌面歌词浮窗
        localStorage.setItem('audioCurrentTime', compareTime)
      })

      audio.addEventListener('ended', () => {
        this.$store.dispatch('playerWidget/refreshPlayStatus', false)
        let playIndex = lodash.findIndex(this.playList, this.nowPlayMusic)
        switch (this.playType) {
          case 0: //顺序播放
            playIndex + 1 >= this.playList.length ? console.log('播放完毕') : playIndex + 1
            break
          case 1: //列表循环
            this.playList.length === 1 ? this.getMusic(this.playList[playIndex].id) : playIndex = playIndex + 1 >= this.playList.length ? 0 : playIndex + 1
            break
          case 2: //单曲循环
            this.getMusic(this.playList[playIndex].id)
            break
          case 3: //随机
            playIndex = Math.floor(Math.random() * this.playList.length)
            break
        }
        this.$store.dispatch('playerWidget/nowPlayMusicId', this.playList[playIndex].id)
      })
    },
    //播放，暂停
    play() {
      let audio = this.$refs.audio
      //播放前先检查播放列表有无音乐
      if (this.playList.length !== 0) {
        if (this.playStatus) {
          this.$store.dispatch('playerWidget/refreshPlayStatus', false)
          audio.pause()
        } else {
          this.$store.dispatch('playerWidget/refreshPlayStatus', true)
          audio.play()
        }
      }
    },
    //更改播放模式
    changePlayType(type) {
      switch (type) {
        case 0:
          this.playType = 1
          break
        case 1:
          this.playType = 2
          break
        case 2:
          this.playType = 3
          break
        case 3:
          this.playType = 0
          break
      }
      this.$store.dispatch('playerWidget/savePlayType', this.playType)
    },
    //上一曲 - pre  下一曲 - next
    previousAndNext(type) {
      //先判断当前播放列表是否只有一首歌曲，如只有一首，则不执行操作
      if (this.playList.length > 1) {
        //如不止一首，则先获取该首歌曲在播放列表中的index
        let playIndex = lodash.findIndex(this.playList, this.nowPlayMusic)
        switch (this.playType) {
          case 3:
            playIndex = Math.floor(Math.random() * this.playList.length)
            break
          default:
            if (type === 'pre') {
              playIndex - 1 >= 0 ? playIndex-- : playIndex = this.playList.length - 1
            } else if (type === 'next') {
              playIndex + 1 >= this.playList.length ? playIndex = 0 : playIndex++
            }
            break
        }
        this.$store.dispatch('playerWidget/nowPlayMusicId', this.playList[playIndex].id)
      }
    },
    //拖动进度条改变播放进度
    handleSlider(val) {
      let audio = this.$refs.audio
      let newCurrentTime = audio.duration * (val / 100)
      audio.currentTime = newCurrentTime
      this.currentTime = timeToString(newCurrentTime)
    },
    //设置音量
    setVolume(val) {
      let audio = this.$refs.audio
      audio.volume = val / 100
    },
    //显示播放列表
    showMusicList() {
      this.listStatus ? this.$store.dispatch('playerWidget/closeMusicList') : this.$store.dispatch('playerWidget/openMusicList')
    },
    //显示音乐播放详情页
    showDetail() {
      this.$store.dispatch('playerWidget/toggleDetailStatus')
    },
    toArtistPage(id) {

    }
  }
}
</script>

<style scoped lang="scss">
.player_content {
  display: flex;
  height: 54px;

  .song_info {
    width: 250px;
    display: flex;

    img {
      height: 50px;
      width: 50px;
      border-radius: 4px;
    }

    .blocks {
      padding: 4px;
      margin-left: 6px;
      width: 200px;

      .song_name {
        margin-bottom: 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .artists {
        margin: 0;
        font-size: 13px;

        .artists_name {
          color: #6b6b6b;
          display: inline-block;
        }
      }
    }
  }

  .controller {
    width: 500px;
    text-align: center;
    padding: 0 10px;

    .play_widget {
      .cycle_style {
        vertical-align: 0;
        margin-right: 30px;

        &:hover {
          color: #ec4141;
        }
      }

      .pre_icon {
        font-size: 20px;

        &:hover {
          color: rgb(237, 101, 102);
        }
      }

      .next_icon {
        font-size: 20px;

        &:hover {
          color: rgb(237, 101, 102);
        }
      }

      .play_style {
        background: #eee;
        border-radius: 18px;
        padding: 7px;
        margin: 0 30px;

        &:hover {
          background: #e0e0e0;
        }
      }
    }

    .progress_bar {
      .progress_time {
        font-size: 12px;
      }

      .ant-slider {
        margin: 5px;

        /deep/ .ant-slider-rail {
          background-color: #e9e9e9;
        }

        /deep/ .ant-slider-track {
          background-color: #ec4141;
        }

        /deep/ .ant-slider-handle {
          border: solid 2px #ec4141;
          width: 10px;
          height: 10px;
          margin-top: -2.8px;

          &:focus {
            box-shadow: 0 0 5px rgba(236, 65, 65, .7);
          }
        }
      }
    }
  }

  .tool_block {
    display: flex;
    align-items: center;
    padding: 0 10px 0 20px;
    width: 252px;

    .ant-slider {
      width: 58px;
      margin: 0 20px 0 10px;

      /deep/ .ant-slider-rail {
        background-color: #e9e9e9;
      }

      /deep/ .ant-slider-track {
        background-color: #ec4141;
      }

      /deep/ .ant-slider-handle {
        border: solid 2px #ec4141;
        width: 10px;
        height: 10px;
        margin-top: -2.8px;

        &:focus {
          box-shadow: 0 0 5px rgba(236, 65, 65, .7);
        }
      }

    }
  }
}

//footer样式
.ant-layout-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(172, 172, 172, 0.5);
  padding: 10px;
  background-color: #f7f7f7;
}

.custom_footer {
  background-color: rgba(230, 230, 230, 0.48);
  transition: all ease-in-out 1s;
}

//播放列表抽屉样式
.ant-drawer-right {
  overflow: hidden;

  /deep/ .ant-drawer-content {
    padding: 5px 0 75px 0;
    width: 420px;

    .ant-drawer-wrapper-body {
      overflow-x: hidden;

      .ant-drawer-header {
        text-align: center;
        border: none;

        .ant-drawer-title {
          font-size: 14px;
          color: #929292;
        }
      }

      .ant-drawer-body {
        padding: 10px 0;
      }
    }
  }
}

//播放抽屉样式
.detail_drawer {
  /deep/ .ant-drawer-content-wrapper {
    //margin-bottom: 75px;

    .ant-drawer-wrapper-body {
      overflow: hidden;
    }

    .ant-drawer-body {
      height: 100%;
      padding: 0;
    }
  }
}
</style>