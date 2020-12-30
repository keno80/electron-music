<template>
  <div class="videos_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="videos_block">
          <img :src="item.coverUrl + '?param=250y130'">
          <div class="videos_name">
            <p>{{ item.title }}</p>
            <p style="color: #acacac;font-size: 13px" v-for="(creator, index) in item.creator">
              <span>{{ creator.userName }}</span>
              <span v-if="item.creator.length > 1 && index !== item.creator.length - 1">/</span>
            </p>
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
.videos_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:after {
    width: 250px;
    content: "";
  }

  .videos_block {
    width: 250px;
    margin: 6px 0;
    border-radius: 4px;

    .videos_name {
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