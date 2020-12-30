<template>
  <div class="common_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="common_block">
          <img :src="item.img1v1Url + '?param=80y80'" v-if="item.picUrl === null">
          <img :src="item.picUrl + '?param=80y80'" v-else>
          <div class="common_name">
            <p style="margin-bottom: 10px">{{ item.name }}</p>
            <p class="album_artists_name" v-for="(artist, index) in item.artists" :key="index">{{ artist.name }}</p>
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