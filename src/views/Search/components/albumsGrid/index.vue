<template>
  <div class="albums_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="albums_block">
          <img :src="item.img1v1Url + '?param=80y80'" v-if="item.picUrl === null">
          <img :src="item.picUrl + '?param=80y80'" v-else>
          <div class="albums_name">
            <p style="margin-bottom: 10px">{{ item.name }}</p>
            <p class="artist_name" v-for="(artist, index) in item.artists" :key="index">{{ artist.name }}</p>
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
.albums_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:after {
    width: 250px;
    content: "";
  }

  .albums_block {
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

    .albums_name {
      margin-left: 10px;
      width: 150px;

      p {
        margin: 0;
        line-height: 1.9;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #4c4c4c;
      }

      .artist_name {
        line-height: 1.5;
        font-size: 12px;
        color: #acacac;
      }
    }

    img {
      border-radius: 4px;
      border: 1px solid #efefef;
    }
  }
}
</style>