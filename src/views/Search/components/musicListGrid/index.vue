<template>
  <div class="music_list_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="music_list_block">
          <img :src="item.coverImgUrl + '?param=80y80'">
          <div class="music_list_name">
            <p>{{ item.name }}</p>
            <p style="color: #acacac;font-size: 13px">{{ item.trackCount }}首</p>
            <p style="color: #acacac;font-size: 13px">by {{ item.creator.nickname }}</p>
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
.music_list_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:after {
    width: 250px;
    content: "";
  }

  .music_list_block {
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

    .music_list_name {
      margin-left: 10px;

      p {
        width: 150px;
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