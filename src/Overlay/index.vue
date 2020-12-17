<template>
  <a-layout id="components-layout-demo-top-side-2">
    <app-header/>
    <sidebar/>
  </a-layout>
</template>

<script>
import AppHeader from '@/Overlay/Header/index.vue'
import Sidebar from '@/Overlay/Sidebar/index'

export default {
  name: "index",
  components: {
    AppHeader,
    Sidebar
  }
}
</script>

<style scoped>
</style>