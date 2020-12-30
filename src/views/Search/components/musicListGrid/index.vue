<template>
  <div class="common_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="common_block">
          <img :src="item.coverImgUrl + '?param=80y80'">
          <div class="common_name">
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
@import "src/style/searchComponentsStyle";
</style>