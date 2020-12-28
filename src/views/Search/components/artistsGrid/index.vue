<template>
  <div class="artists_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="artist_block">
          <img :src="item.img1v1Url + '?param=80y80'" v-if="item.picUrl === null">
          <img :src="item.picUrl + '?param=80y80'" v-else>
          <div class="artist_name">
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
.artists_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .artist_block {
    width: 250px;
    display: flex;
    align-items: center;
    border: 1px solid #efefef;
    margin: 6px 0;
    border-radius: 4px;
    padding: 2px;

    &:hover {
      border: 1px solid #ec4141;
      box-shadow: 0 0 5px rgba(235, 65, 65, .7);
      transition: ease-in-out .4s;
    }

    .artist_name {
      margin-left: 10px;

      p {
        margin: 0;
        line-height: 1.9;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #4c4c4c;
      }
    }

    img {
      border-radius: 4px;
      border: 1px solid #efefef;
    }
  }
}
</style>