<template>
  <div style="height: 100%" v-if="Object.keys(nowPlayMusic).length !== 0">
    <div :style="{ backgroundImage: 'url('+ nowPlayMusic.al.picUrl +')'}" class="blurImg">
      <div class="blurbg"></div>
    </div>

    <!--    <div class="music_cover">-->
    <!--      <img :src="nowPlayMusic.picUrl + '?param=300y300'">-->
    <!--    </div>-->

    <div class="collapse_button">
      <a-button icon="fullscreen-exit" size="large" @click="hideDetail"/>
    </div>

    <div class="left_content">
      <div class="music_info_content">
        <p class="music_name">{{ nowPlayMusic.name }}</p>
        <div class="music_info">
          <p class="album_info">专辑：<a>{{ nowPlayMusic.al.name }}</a></p>
          <p class="artists_info" v-for="(info, index) in nowPlayMusic.ar" :key="index">
            歌手：<a>{{ info.name }}</a>
            <span v-if="nowPlayMusic.ar.length > 1 && index !== nowPlayMusic.ar.length - 1">/</span>
          </p>
        </div>
      </div>

      <div class="lyric_content">
        <lyric/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Lyric from "@/components/MusicDetail/Player/Lyric";

export default {
  name: "index",
  components: {
    Lyric
  },
  computed: {
    ...mapGetters([
      'nowPlayMusic'
    ])
  },
  methods: {
    hideDetail() {
      this.$store.dispatch('playerWidget/toggleDetailStatus')
    }
  }
}
</script>

<style scoped lang="scss">
.blurImg {
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(10px);
  transition: all ease-in-out .4s;
  transform: scale(1.2) translateX(10px) translateY(-40px);

  .blurbg {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: rgba(255, 255, 255, .5);
    z-index: -1;
  }
}

.collapse_button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;

  .ant-btn-lg {
    background-color: rgba(255, 255, 255, .4);
    border: none;

    &:hover {
      color: #ec4141;
    }
  }
}

.left_content {
  position: absolute;
  top: 40px;
  //right: 100px;
  width: 100%;
  height: 535px;

  .lyric_content {
    position: relative;
    top: 40px;
    text-align: center;
    height: 400px;
    overflow: hidden;
  }
}

.music_info_content {
  text-align: center;

  .music_name {
    font-size: 22px;
    color: #444444;
    margin-bottom: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .music_info {
    display: flex;
    justify-content: center;
    width: 400px;
    margin: 0 auto;

    p {
      font-size: 12px;
      margin: 0;

      a {
        color: #e33030;
      }
    }

    .album_info {
      margin-right: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .artists_info {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.music_cover {
  position: absolute;
  top: 90px;
  left: 90px;

  img {
    border-radius: 6px;
    box-shadow: 0 0 14px 6px rgba(255, 255, 255, .4);
  }
}
</style>