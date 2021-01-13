<template>
  <div class="grid_common">
    <template v-for="(item, index) in data" v-if="index <5">
      <a class="grid_item">
        <img :src="item.picUrl + '?param=140y140'"/>
        <div class="grid_text_block">
          <p>{{ item.name }}</p>
        </div>
        <p class="rcmd_text" v-if="item.rcmdText">{{ item.rcmdText }}</p>
        <p class="rcmd_text" v-else>{{ item.rcmdtext }}</p>
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: "djCommonGrid",
  props: {
    data: Array
  }
}
</script>

<style scoped lang="scss">
.grid_common {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;

  .grid_item {
    position: relative;
    width: 140px;

    .rcmd_text {
      color: #3e3e3e;
      font-family: PingFang Thin SC, sans-serif;
      font-size: 13px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:hover {
        color: #151515;
      }
    }

    img {
      border-radius: 6px;
      border: 1px solid #efefef;
      box-shadow: inset 0 0 0 #ec4141;
      margin-bottom: 14px;
    }

    .grid_text_block {
      width: 142px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .6));
      position: absolute;
      top: 115px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      padding: 4px 8px;

      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0;
        color: #ffffff;
        font-size: 12px;
      }
    }
  }
}
</style>