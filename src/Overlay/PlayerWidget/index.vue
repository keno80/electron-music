<template>
  <a-layout-footer>
    <div class="player_content">
      <div class="song_info" v-if="haveSongInfo">
        <a-avatar shape="square" :size="50" icon="smile"/>
        <div class="blocks">
          <p class="song_name">当前没有音乐哦</p>
          <p class="artists">赶快去挑一首吧</p>
        </div>
      </div>
      <div class="song_info" v-else>
        <img :src="nowPlayMusic.picUrl">
        <div class="blocks">
          <p class="song_name">{{ nowPlayMusic.song.name }}</p>
          <p class="artists">
            <template v-for="(item, index) in nowPlayMusic.song.artists">
              <a class="artists_name" @click="toArtistPage(item.id)">{{ item.name }}</a>
              <span
                v-if="nowPlayMusic.song.artists.length > 1 && index !== nowPlayMusic.song.artists.length - 1">/</span>
            </template>
          </p>
        </div>
      </div>
      <div class="controller">
        <div class="play_widget">
          <a-icon type="step-backward" style="font-size: 20px"/>
          <a-icon type="pause" style="font-size: 20px" class="play_style" @click="play" v-if="playing"/>
          <a-icon type="caret-right" style="font-size: 20px" class="play_style" @click="play" v-else/>
          <a-icon type="step-forward" style="font-size: 20px"/>
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
        <a-slider :default-value="volumeVal" :tipFormatter="null" @change="setVolume"/>
        <a style="color: #3e3e3e;margin-top: 3px" @click="showMusicList">
          <a-icon type="bars" style="font-size: 22px"/>
        </a>
      </div>
    </div>

    <audio :src="songUrl" autoplay ref="audio"/>
  </a-layout-footer>
</template>

<script>
import global_api from "@/utils/global_api";
import {mapGetters} from 'vuex'
import {validObject} from "@/utils/validate";
import {timeToString} from "@/utils/playerFn";

export default {
  name: "index",
  computed: {
    ...mapGetters([
      'nowPlayMusic'
    ]),
    haveSongInfo() {
      return !validObject(this.nowPlayMusic)
    },
  },
  watch: {
    '$store.state.songs.nowPlayMusic': function (newVal) {
      console.log(newVal);
      this.getMusic(newVal.id)
    }
  },
  data() {
    return {
      playing: false,  //是否正在播放
      songUrl: '',  //音乐播放地址
      totalTime: '00:00',  //音乐总时长
      currentTime: '00:00',  //当前播放进度
      sliderVal: 0,  //播放条百分比
      volumeVal: 70  //音量百分比
    }
  },
  methods: {
    //获取音乐地址
    getMusic(id) {
      global_api.getMusicUrl(id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.songUrl = res.data.data[0].url
          this.playing = true
          this.audioInit()
        }
      })
    },
    //每次播放音乐时初始化
    audioInit() {
      let audio = this.$refs.audio
      audio.addEventListener('timeupdate', () => {
        this.totalTime = timeToString(audio.duration)
        this.currentTime = timeToString(audio.currentTime)

        this.sliderVal = (audio.currentTime / audio.duration).toFixed(2) * 100
      })

      audio.addEventListener('ended', () => {
        console.log('播放完毕');
        this.playing = false
      })
    },
    //播放，暂停
    play() {
      let audio = this.$refs.audio
      if (this.playing) {
        this.playing = false
        audio.pause()
      } else {
        this.playing = true
        audio.play()
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
      .play_style {
        background: #eee;
        border-radius: 18px;
        padding: 7px;
        margin: 0 30px;
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
</style>