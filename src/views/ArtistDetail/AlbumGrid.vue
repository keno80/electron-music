<template>
  <div class="album_grid">
    <div class="hot_song">
      <img src="../../../public/img/hot50.png"/>
      <div class="hot_song_table">
        <span class="ti_text">热门50首</span>
        <a-icon type="play-circle" class="ti_icon"/>
        <a-icon type="folder-add" class="ti_icon"/>
        <div class="table">
          <div class="table_item" v-for="(item, index) in hotSong" :class="[index%2 !== 1 ? 'item_style': '']"
               v-if="index <= showAll">
            <span class="common_style" style="width: 40px;text-align: center">{{ index + 1 }}</span>
            <a-icon type="heart" class="common_style" style="padding-right: 10px"/>
            <a-icon type="cloud-download" class="common_style" style="padding-right: 10px"/>
            <span style="width: 450px">{{ item.name }}</span>
            <span class="common_style" style="text-align: right">{{ item.dt | formatDt }}</span>
          </div>
          <div class="item_style table_item" style="text-align: right;padding-right: 18px">
            <a style="width: 100%" class="common_style" @click="showMore" v-if="showAll === 9">查看全部50首 > </a>
            <a style="width: 100%" class="common_style" @click="showMore" v-else>仅查看前10首 > </a>
          </div>
        </div>
      </div>
    </div>
    <div class="album">
      <div class="album_item" v-for="(item, index) in artistAlbum">
        <img :src="item.picUrl + '?param=159y159'">
        <p>{{item.name}}</p>
        <span>{{item.publishTime | formatDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {numberToTime} from "@/utils/playerFn";
import dayjs from "dayjs";

export default {
  name: "AlbumGrid",
  props: {
    artistAlbum: Array,
    hotSong: Array
  },
  data() {
    return {
      showAll: 9,
    }
  },
  filters: {
    formatDt(val) {
      return numberToTime(val)
    },
    formatDate(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  methods: {
    showMore() {
      this.showAll === 9 ? this.showAll = 50 : this.showAll = 9
    }
  }
}
</script>

<style scoped lang="scss">
.album_grid {
  margin-top: 10px;

  .hot_song {
    display: flex;

    img {
      width: 150px;
      height: 150px;
    }

    .hot_song_table {
      margin-left: 30px;
      width: 100%;

      .ti_text {
        font-size: 16px;
        font-weight: bold;
      }

      .ti_icon {
        margin-left: 26px;
        font-size: 18px;
        vertical-align: -3px;
      }

      .table {
        margin: 10px 0;

        .table_item {
          display: flex;
          align-items: center;
          padding: 8px 0;

          .common_style {
            color: #c8c8c8;
          }
        }

        .item_style {
          background-color: #f7f7f7;
        }
      }
    }
  }

  .album {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .album_item {
      margin-bottom: 18px;

      img {
        border: 1px solid #f2f2f2;
        border-radius: 6px;
      }

      p {
        margin-bottom: 0;
        margin-top: 7px;
      }

      span {
        font-size: 13px;
        color: #acacac;
      }
    }
  }
}
</style>