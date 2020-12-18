<template>
  <div>
    <carousel :recommend="recommendBanner" v-if="bannerReady"/>
    <song-list :songList="songList" v-if="songListReady"/>
    <new-song :newSong="newSong" v-if="newSongReady"/>
  </div>
</template>

<script>
import Carousel from './Carousel'
import SongList from './SongList'
import NewSong from './NewSong'
import api from "@/views/Discover/api";

export default {
  name: "index",
  components: {
    Carousel,
    SongList,
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
          // console.log(res);
          this.songList = res.data.result
          this.songListReady = true
        }
      })

      api.recommendNewSong().then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.newSong = res.data.result
          this.newSongReady = true
        }
      })
    },
  }
}
</script>

<style scoped>

</style>