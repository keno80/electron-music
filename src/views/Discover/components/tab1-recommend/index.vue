<template>
  <div style="width: 774px">
    <div class="carousel_spin common_style" v-if="!bannerReady">
      <a-spin tip="Banner加载中...">
        <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true" />
      </a-spin>
    </div>
    <carousel :banner="recommendBanner" type="'recommend'" v-else/>

    <div class="song_list_spin common_style" v-if="!songListReady">
      <a-spin tip="推荐歌单加载中...">
        <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true" />
      </a-spin>
    </div>
    <music-list :songList="songList" v-else/>

    <div class="new_song_spin common_style" v-if="!newSongReady">
      <a-spin tip="推荐新歌加载中...">
        <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true" />
      </a-spin>
    </div>
    <new-song :newSong="newSong" v-else/>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import NewSong from './NewSong'
import MusicList from '@/components/MusicList'
import api from "@/views/Discover/api";

export default {
  name: "index",
  components: {
    Carousel,
    MusicList,
    NewSong
  },
  data() {
    return {
      bannerReady: false,
      recommendBanner: [],
      songListReady: false,
      songList: [],
      newSongReady: false,
      newSong: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.discovery().then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          this.recommendBanner = res.data.data.blocks
          this.bannerReady = true
        }
      })

      api.recommendSongList().then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.songList = res.data.result
          this.songListReady = true
        }
      })

      api.recommendNewSong().then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          this.newSong = res.data.result
          this.newSongReady = true
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.carousel_spin {
  height: 232px;
}

.song_list_spin {
  height: 446px;
}

.new_song_spin {
  height: 298px;
}

.common_style {
  width: 774px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>