<template>
  <a-layout id="components-layout-demo-top-side-2">
    <app-header/>
    <a-layout-content>
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

export default {
  name: "index",
  components: {
    AppHeader,
    Sidebar,
    AppMain,
    PlayerWidget
  }
}
</script>

<style scoped lang="scss">
#components-layout-demo-top-side-2 {
  background: #ffffff !important;

  /deep/ .ant-layout-content {
    display: flex;
    height: calc(100vh - 118px);
  }

  .ant-layout-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(236, 65, 65, 0.5);
    padding: 10px;
    background-color: #f6f6f8;
  }
}
</style>