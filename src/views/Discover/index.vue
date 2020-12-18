<template>
  <div class="tab">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="个性推荐">
        <tab1-recommend :recommend="recommend" v-if="recommendData"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="歌单">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="主播电台">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="4" tab="排行榜">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="5" tab="歌手">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="6" tab="最新音乐">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api from './api'
import {Tab1Recommend} from "@/views/Discover/components";

export default {
  name: "index",
  components: {
    Tab1Recommend
  },
  data() {
    return {
      recommendData: false,
      recommend: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.discovery().then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.recommend = res.data.data.blocks
          this.recommendData = true
        }
      })
    },
    callback() {

    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/tab";
</style>