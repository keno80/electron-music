<template>
  <div>
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
/deep/ .ant-page-header {
  padding: 10px 0 14px 0;

  .ant-page-header-heading {
    .ant-page-header-back {
      .ant-page-header-back-button:hover {
        color: #ec4141;
      }
    }
  }
}
</style>