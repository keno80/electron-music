<template>
  <div>
    <a-layout-header class="header">
      <div class="header_left">
        <div class="left_content">
          <img src="../../../public/logo.png" width="30px" height="30px" style="margin-top: 15px">
          <div class="logo">Electron</div>
<!--          <navigation/>-->
          <head-search/>
        </div>
      </div>
      <div class="header_right">
        <div class="right_content">
          <login/>
          <tools/>
          <a-divider type="vertical" style="margin-top: 24px;height: 16px"/>
          <window/>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import {Navigation, Login, Tools, Window} from '@/Overlay/Header'
import HeadSearch from '@/components/HeadSearch'

export default {
  name: "index",
  components: {
    Navigation,
    HeadSearch,
    Login,
    Tools,
    Window
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.header {
  background-color: #ec4141;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;

  -webkit-app-region: drag;
}

.header_left {
  float: left;
  height: 60px;

  .left_content {
    display: flex;

    .logo {
      width: 120px;
      margin: 0 28px 16px 0;
      text-align: left;
      color: #ffffff;
      font-size: 20px;
    }
  }
}

.header_right {
  float: right;

  .right_content {
    display: flex;
  }
}
</style>