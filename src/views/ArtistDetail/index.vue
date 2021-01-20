<template>
  <div class="artist_detail_content">
    <div class="artist_info_block" v-if="Object.keys(artistDetail).length !== 0">
      <img :src="artistDetail.artist.cover + '?param=179y179'"/>
      <div class="artist_info_desc">
        <p class="artist_name">{{ artistDetail.artist.name }}</p>
        <a-button shape="round" type="primary">
          <a-icon type="plus"/>
          收藏
        </a-button>
        <p class="artist_info_misc">
          <span>单曲数：{{ artistDetail.artist.musicSize }}</span>
          <span>专辑数：{{ artistDetail.artist.albumSize }}</span>
          <span>MV数：{{ artistDetail.artist.mvSize }}</span>
        </p>
      </div>
    </div>

    <div class="artist_misc_tab">
      <a-tabs :active-key="key" @change="keyCB">
        <a-tab-pane key="1" tab="专辑">
          <album-grid :artistAlbum="artistAlbum" :hotSong="artistHotSong"/>
          <!--          <div class="spin" v-else>-->
          <!--            <a-spin tip="请稍后...">-->
          <!--              <a-icon slot="indicator" type="loading" style="font-size: 24px" spin/>-->
          <!--            </a-spin>-->
          <!--          </div>-->

        </a-tab-pane>
        <a-tab-pane key="2" tab="MV">

        </a-tab-pane>
        <a-tab-pane key="3" tab="歌手详情">

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from "@/views/Discover/api";
import AlbumGrid from "@/views/ArtistDetail/AlbumGrid";

export default {
  name: "index",
  components: {
    AlbumGrid
  },
  computed: {
    ...mapGetters([
      'artistId'
    ])
  },
  data() {
    return {
      artistDetail: {},
      key: '1',
      artistAlbum: [],
      artistHotSong: []
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
          this.getInitData()
        }
      })
    },
    getInitData() {
      api.artistAlbum(this.artistId).then(res => {
        if (res.data.code === 200) {
          this.artistAlbum = res.data.hotAlbums
        }
      })
      api.artistHotSong(this.artistId).then(res => {
        if (res.data.code === 200) {
          this.artistHotSong = res.data.songs
        }
      })
    },
    keyCB(key) {
      this.key = key
      switch (key) {
        case '1':
          this.getInitData()
          break;
        case '2':
          break;
        case '3':
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/public";

.artist_detail_content {
  width: 774px;
  padding-top: 20px;

  .artist_info_block {
    display: flex;
    margin-bottom: 20px;

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