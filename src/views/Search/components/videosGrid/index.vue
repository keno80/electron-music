<template>
  <div class="common_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="videos_block">
          <img :src="item.coverUrl + '?param=250y130'">
          <div class="videos_name">
            <p>{{ item.title }}</p>
            <span style="color: #acacac;font-size: 13px" v-for="(creator, index) in item.creator">
              <span>{{ creator.userName }}</span>
              <span v-if="item.creator.length > 1 && index !== item.creator.length - 1">/</span>
            </span>
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