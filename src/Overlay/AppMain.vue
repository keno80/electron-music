<template>
  <a-layout style="background-color: #ffffff">
    <el-scrollbar>
      <a-layout-content
        :style="{ background: '#fff', padding: '10px 24px', margin: 0 }"
      >
        <router-view/>
      </a-layout-content>
    </el-scrollbar>
  </a-layout>
</template>

<script>
export default {
  name: "AppMain",
}
</script>

<style lang="scss">
.el-scrollbar {
  height: 100%;

  .el-scrollbar__wrap {
    .el-scrollbar__view {
      .ant-layout-content {
        //height: calc(100vh - 44px) !important;
        background-color: #ffffff;
      }
    }
  }

  .is-horizontal {
    display: none;
  }

  .el-scrollbar__bar {
    bottom: 20px;
  }
}
</style>