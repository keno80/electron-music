<template>
  <div class="hot_search">

  </div>
</template>

<script>
import api from './api'

export default {
  name: "HotSearchPanel",
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getHotSearch().then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.hot_search {
  position: absolute;
  z-index: 1000;
  top: 50px;
  width: 352px;
  background-color: #ffffff;
  height: 300px;
  box-shadow: 0 4px 5px rgba(0,0,0,.07);
  border-radius: 4px;
}
</style>