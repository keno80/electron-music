<template>
  <div class="window_control">
    <a>
      <a-icon type="line" class="control_style" @click="min"/>
    </a>
    <a>
      <a-icon type="border" class="control_style" @click="max"/>
    </a>
    <a>
      <a-icon type="close" class="control_style" @click="close"/>
    </a>
  </div>
</template>

<script>
const {ipcRenderer} = window.require('electron')

export default {
  name: "window",
  methods: {
    min() {
      ipcRenderer.send('window-min')
    },
    max() {
      ipcRenderer.send('window-max')
    },
    close() {
      ipcRenderer.send('window-close')
    }
  }
}
</script>

<style scoped lang="scss">
.window_control {
  -webkit-app-region: no-drag;

  .control_style {
    color: #ffffff;
    margin: 0 10px;
  }
}
</style>