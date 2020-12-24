<template>
  <a-layout id="components-layout-demo-top-side-2">
    <app-header/>
    <a-layout-content ref="drawer_container">
      <sidebar/>
      <app-main/>
    </a-layout-content>
    <player-widget/>
  </a-layout>
</template>

<script>
import AppHeader from '@/Overlay/Header/index.vue'
import Sidebar from '@/Overlay/Sidebar/index'
import AppMain from "@/Overlay/AppMain";
import PlayerWidget from '@/Overlay/PlayerWidget'
import {mapGetters} from 'vuex'

export default {
  name: "index",
  components: {
    AppHeader,
    Sidebar,
    AppMain,
    PlayerWidget,
  },
  computed: {
    ...mapGetters([
      'listStatus'
    ])
  }
}
</script>

<style scoped lang="scss">
#components-layout-demo-top-side-2 {
  background: #ffffff !important;

  /deep/ .ant-layout-content {
    display: flex;
    height: calc(100vh - 120px);
    min-width: 822px;
  }
}
</style>