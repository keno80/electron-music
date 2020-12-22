<template>
  <a-layout id="components-layout-demo-top-side-2">
    <app-header/>
    <a-layout-content ref="drawer_container">
      <sidebar/>
      <app-main/>
      <a-drawer
        title="播放列表"
        placement="right"
        :closable="false"
        :visible="listStatus"
        :maskClosable="true"
        :z-index="1000"
        :width="420"
        :wrap-style="{ position: 'absolute' }"
      >
        <play-list/>
      </a-drawer>
    </a-layout-content>
    <player-widget/>
  </a-layout>
</template>

<script>
import AppHeader from '@/Overlay/Header/index.vue'
import Sidebar from '@/Overlay/Sidebar/index'
import AppMain from "@/Overlay/AppMain";
import PlayerWidget from '@/Overlay/PlayerWidget'
import PlayList from './PlayerWidget/playList'
import {mapGetters} from 'vuex'

export default {
  name: "index",
  components: {
    AppHeader,
    Sidebar,
    AppMain,
    PlayerWidget,
    PlayList
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
    height: calc(100vh - 118px);
    min-width: 822px;
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

/deep/ .ant-drawer-content {
  padding: 60px 0 75px 0;
  width: 500px;

  .ant-drawer-wrapper-body {
    .ant-drawer-header {
      text-align: center;
      border: none;

      .ant-drawer-title {
        font-size: 14px;
        color: #929292;
      }
    }

    .ant-drawer-body {
      padding: 10px 0;
    }
  }
}

.ant-drawer-right {
  overflow: hidden;
}
</style>