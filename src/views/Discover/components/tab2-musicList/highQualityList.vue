<template>
  <div style="width: 774px">
    <a-page-header
      title="精品歌单"
      @back="toNormalList"
    />
    <music-list :songList="HQMusicList" :type="'hot'"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MusicList from '@/components/MusicList'

export default {
  name: "HighQualityList",
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'HQMusicList'
    ])
  },
  methods: {
    toNormalList() {
      this.$store.dispatch('musicList/switchNormalHQ', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/public";
</style>