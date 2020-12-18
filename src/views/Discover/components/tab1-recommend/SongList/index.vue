<template>
  <div class="song_list_content">
    <div class="title">
      <h2>推荐歌单</h2>
    </div>
    <div class="songs_content">
      <div class="blocks" v-for="(item, index) in songList" :key="index">
        <img :src="item.picUrl">
        <p class="songs_list_name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    songList: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
.songs_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .blocks {
    width: 140px;

    img {
      width: 138px;
      height: 138px;
      border-radius: 6px;
    }

    .songs_list_name {
      margin-top: 8px;
      table-layout: fixed;
      word-wrap: break-word;
      word-break: normal;
      overflow: hidden;
    }
  }
}
</style>