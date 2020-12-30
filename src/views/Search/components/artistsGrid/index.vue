<template>
  <div class="common_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="common_block">
          <img :src="item.img1v1Url + '?param=80y80'" v-if="item.picUrl === null">
          <img :src="item.picUrl + '?param=80y80'" v-else>
          <div class="common_name">
            <p>{{ item.name }}</p>
            <p style="color: #acacac;font-size: 13px">专辑数：{{ item.albumSize }}</p>
            <p style="color: #acacac;font-size: 13px">MV数：{{ item.mvSize }}</p>
          </div>
        </div>
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    data: Array
  }
}
</script>

<style scoped lang="scss">
@import "src/style/searchComponentsStyle";
</style>