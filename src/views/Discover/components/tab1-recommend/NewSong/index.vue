<template>
  <div class="new_song_content">
    <div class="title">
      <h2>推荐新歌</h2>
    </div>
    <div class="songs_content">
      <div class="blocks" v-for="(item, index) in newSong" :key="index">
        <a @click="addToNowPlay(item.id)">
          <img :src="item.picUrl">
          <div class="play_icon">
            <a-icon type="caret-right" class="play_icon_style"/>
          </div>
        </a>

        <div class="name_content">
          <p class="name_format song_name">{{ item.name }}</p>
          <p class="name_format artists_name" v-for="(info, index) in item.song.artists" :key="index">
            <a class="artists_name" @click="toArtistPage(info.id)">{{ info.name }}</a>
            <span v-if="item.song.artists.length > 1 && index !== item.song.artists.length - 1">/</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {validObject} from "@/utils/validate";
import global_api from "@/utils/global_api";

export default {
  name: "index",
  props: {
    newSong: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'nowPlayMusic'
    ])
  },
  methods: {
    addToNowPlay(id) {
      this.$store.dispatch('playerWidget/nowPlayMusicId', id)
    },
    //去歌手详情页
    toArtistPage(id) {
      console.log(id);
    }
  }
}
</script>

<style scoped lang="scss">
.new_song_content {
  margin-top: 20px;

  .songs_content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .blocks {
      display: flex;
      width: 250px;
      height: 50px;
      margin-bottom: 14px;
      position: relative;

      &:hover {
        background-color: rgba(145, 145, 145, 0.2);
        border-radius: 6px;
      }

      .play_icon {
        position: absolute;
        width: 49px;
        top: 50%;
        margin-top: -13px;
        text-align: center;

        .play_icon_style {
          font-size: 16px;
          color: #ec4141;
          padding: 4px 4px 4px 6px;
          background-color: rgba(255, 255, 255, .8);
          border-radius: 15px;
        }
      }

      img {
        width: 49px;
        height: 49px;
        border-radius: 6px;
        border: 1px solid #eeeeee;
      }

      .name_content {
        width: 200px;
        padding: 6px;

        .song_name {
          margin-bottom: 0;
        }

        .artists_name {
          font-size: 12px;
          color: #acacac;
          display: inline-block;
        }

        .name_format {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>