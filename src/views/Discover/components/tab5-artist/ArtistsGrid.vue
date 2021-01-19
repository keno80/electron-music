<template>
  <div class="artists_list_grid">
    <div class="artists_grid_item" v-for="(item, index) in list" :key="index">
      <a @click="toArtistDetail(item.id)"><img :src="item.img1v1Url + '?param=139y139'"/></a>
      <p @click="toArtistDetail(item.id)"><a>{{item.name}}</a></p>
      <a>
        <a-icon type="user" class="user_account" v-if="item.accountId"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistsGrid",
  props: {
    list: Array
  },
  methods: {
    toArtistDetail(id) {
      this.$emit('toArtistDetail', id)
    }
  }
}
</script>

<style scoped lang="scss">
.artists_list_grid {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .artists_grid_item {
    margin-bottom: 16px;
    position: relative;

    img {
      border-radius: 6px;
      border: 1px solid #f1f1f1;
    }

    p {
      margin: 6px 0 0 0;

      a {
        color: #393939;
      }
    }

    .user_account {
      position: absolute;
      top: 148px;
      right: 2px;
      background-color: #ec4141;
      color: #ffffff;
      padding: 2px;
      border-radius: 50%;
    }
  }
}
</style>