<template>
  <a-layout>
    <a-layout-content
      :style="{ background: '#fff', padding: '10px 24px', margin: 0, minHeight: '280px' }"
    >
      <router-view/>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "AppMain"
}
</script>

<style scoped>

</style>