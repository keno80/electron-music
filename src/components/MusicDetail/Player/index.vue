<template>
  <div style="height: 100%">
    <div :style="{ backgroundImage: 'url('+ nowPlayMusic.picUrl +')'}" class="blurImg">
      <div class="blurbg"></div>
    </div>

    <div class="music_cover">
      <img :src="nowPlayMusic.picUrl + '?param=300y300'">
    </div>

    <div class="left_content">
      <div class="music_info_content">
        <p class="music_name">{{ nowPlayMusic.name }}</p>
        <div class="music_info">
          <p class="album_info">专辑：<a>{{nowPlayMusic.song.album.name}}</a></p>
          <p class="artists_info" v-for="(info, index) in nowPlayMusic.song.artists" :key="index">
            歌手：<a>{{info.name}}</a>
            <span v-if="nowPlayMusic.song.artists.length > 1 && index !== nowPlayMusic.song.artists.length - 1">/</span>
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
  created() {
    console.log('1');
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
    background-color: rgba(255, 255, 255, .74);
    z-index: -1;
  }
}

.left_content {
  position: absolute;
  top: 50px;
  right: 100px;

  .lyric_content {
    position: relative;
    top: 30px;
  }
}

.music_info_content {
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
    width: 100%;

    p {
      font-size: 12px;
      margin: 0;

      a {
        color: #e33030;
      }
    }

    .album_info {
      width: 130px;
      margin-right: 10px;
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