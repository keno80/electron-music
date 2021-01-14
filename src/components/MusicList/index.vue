<template>
  <div class="song_list_content">
    <div class="title">
      <h2 v-if="type !== 'hot'">推荐歌单</h2>
    </div>
    <div class="songs_content">
      <a class="blocks" v-for="(item, index) in songList" :key="index" @click="showPlayList(item.id)">
        <img :src="item.picUrl" v-if="item.picUrl">
        <img :src="item.coverImgUrl" v-else>
        <p class="songs_list_name">{{ item.name }}</p>
        <div class="play_count">
          <a-icon type="caret-right" theme="filled"/>
          {{ item.playCount | playCounts }}
        </div>
        <div class="play_icon">
          <a-icon type="caret-right" theme="filled" @click.stop="playListMusic"/>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import global_api from "@/utils/global_api";

export default {
  name: "index",
  props: {
    songList: {
      type: Array
    },
    type: String
  },
  filters: {
    playCounts(val) {
      return val / 10000 > 10 ? lodash.floor(val / 10000) + '万' : val
    }
  },
  methods: {
    showPlayList(id) {
      global_api.getMusicListDetail(id).then(res => {
        if (res.data.code === 200) {
          this.$store.dispatch('musicList/saveMusicListDetail', res.data.playlist)
          this.$store.dispatch('musicList/saveMusicListSongs', [])
          this.$store.dispatch('app/changeTag', '歌单')
          this.$router.push('/music_list')

          let arr = []
          for (let item of res.data.playlist.trackIds) {
            arr.push(item.id)
          }
          global_api.getMusicDetail(arr.join(',')).then(res => {
            if (res.data.code === 200) {
              this.$store.dispatch('musicList/saveMusicListSongs', res.data.songs)
            }
          })
        }
      })
    },
    playListMusic() {
      console.log('click');
    }
  }
}
</script>

<style scoped lang="scss">
.songs_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .blocks {
    width: 140px;
    position: relative;
    color: #5a5a5a;

    &:hover {
      .play_icon {
        display: block;
        position: absolute;
        right: 10px;
        color: #ec4141;
        top: 98px;
        background-color: rgba(255, 255, 255, .8);
        border-radius: 15px;
        font-size: 20px;
        padding: 0 4px 0 7px;
      }
    }

    .play_icon {
      display: none;
    }

    img {
      width: 138px;
      height: 138px;
      border-radius: 6px;
    }

    .songs_list_name {
      margin-top: 8px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .play_count {
      position: absolute;
      top: 2px;
      right: 8px;
      color: #ffffff;
      font-size: 11px;
    }
  }
}
</style>