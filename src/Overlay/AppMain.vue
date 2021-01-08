<template>
  <el-scrollbar style="height: 100%" v-if="scrollBar">
  <a-layout style="background-color: #ffffff" class="test">

      <a-layout-content
        :style="{ background: '#fff', padding: '10px 24px', margin: 0 }"
      >
        <router-view/>
      </a-layout-content>

  </a-layout>
  </el-scrollbar>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "AppMain",
  computed: {
    ...mapGetters([
      'scrollBar'
    ])
  }
}
</script>

<style lang="scss">
.el-scrollbar {
  .el-scrollbar__wrap {
    overflow-x: hidden;

    .el-scrollbar__view {
      .ant-layout-content {
        background-color: #ffffff;
      }
    }
  }

  .is-horizontal {
    display: none;
  }

  .el-scrollbar__bar {
    bottom: 14px;
  }
}
</style>