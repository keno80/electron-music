<template>
  <div class="artist_detail_content">
    <div class="artist_info_block">
      <img :src="artistDetail.artist.cover + '?param=179y179'"/>
      <div class="artist_info_desc">
        <p class="artist_name">{{artistDetail.artist.name}}</p>
        <a-button shape="round" type="primary"><a-icon type="plus" /> 收藏</a-button>
        <p class="artist_info_misc">
          <span>单曲数：{{artistDetail.artist.musicSize}}</span>
          <span>专辑数：{{artistDetail.artist.albumSize}}</span>
          <span>MV数：{{artistDetail.artist.mvSize}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from "@/views/Discover/api";

export default {
  name: "index",
  computed: {
    ...mapGetters([
      'artistId'
    ])
  },
  data() {
    return {
      artistDetail: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.artistDetail(this.artistId).then(res => {
        if (res.data.code === 200) {
          this.artistDetail = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.artist_detail_content {
  width: 774px;
  padding-top: 20px;

  .artist_info_block {
    display: flex;

    .artist_info_desc {
      margin-left: 20px;

      .artist_name {
        font-size: 20px;
        margin-bottom: 8px;
        font-weight: bolder;
      }

      .ant-btn-primary {
        background-color: #ec4141;
        border-color: #ec4141;
        margin-right: 10px;
      }

      .artist_info_misc {
        margin-top: 16px;

        span {
          margin-right: 20px;
        }
      }
    }

    img {
      border-radius: 6px;
      border: 1px solid #f1f1f1;
    }
  }
}
</style>