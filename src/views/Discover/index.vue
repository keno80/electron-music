<template>
  <div class="tab">
    <a-tabs :default-active-key="tabIndex" @change="callback">
      <a-tab-pane key="1" tab="个性推荐">
        <tab1-recommend/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="歌单">
        <high-quality-music-list v-if="normalOrHQ"/>
        <tab2-music-list v-else/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="主播电台">
        <tab3-d-j/>
      </a-tab-pane>
      <a-tab-pane key="4" tab="排行榜">
        <tab4-top-list/>
      </a-tab-pane>
      <a-tab-pane key="5" tab="歌手">
        <tab5-artist/>
      </a-tab-pane>
      <a-tab-pane key="6" tab="最新音乐">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {
  Tab1Recommend,
  Tab2MusicList,
  Tab3DJ,
  Tab4TopList,
  Tab5Artist,
  HighQualityMusicList
} from "@/views/Discover/components";
import {mapGetters} from 'vuex'

export default {
  name: "index",
  components: {
    Tab1Recommend,
    Tab2MusicList,
    Tab3DJ,
    Tab4TopList,
    Tab5Artist,
    HighQualityMusicList
  },
  computed: {
    ...mapGetters([
      'normalOrHQ',
      'tabIndex'
    ])
  },
  methods: {
    callback(key) {
      this.$store.dispatch('app/changeTabIndex', key)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/tab";
</style>