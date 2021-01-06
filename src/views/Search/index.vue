<template>
  <div class="search_content">
    <a-page-header
      title="搜索"
      :sub-title="pageHeadTitle"
      @back="toDiscovery"
    />
    <div class="search_tab">
      <template v-for="(item, index) in tabType">
        <a class="tab_item" :class="[searchInfo.searchType === item.value ? 'tab_active' : '']"
           @click="changeSearchType(item.value)">{{ item.name }}</a>
      </template>
    </div>

    <!--    单曲-->
    <div class="search_block" v-if="searchInfo.searchType === 1">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <template v-else>
        <songs-table :data="searchResponse.songs"/>
        <a-pagination size="small" v-model="page" :total="searchResponse.songCount" :pageSize="size"
                      @change="offsetChange"/>
      </template>
    </div>

    <!--    歌手-->
    <div class="artists_grid" v-else-if="searchInfo.searchType === 100">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <artists-grid :data="searchResponse.artists"/>
    </div>

    <!--    专辑-->
    <div class="albums_grid" v-else-if="searchInfo.searchType === 10">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <albums-grid :data="searchResponse.albums"/>
    </div>

    <!--    视频-->
    <div class="videos_grid" v-else-if="searchInfo.searchType === 1014">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <videos-grid :data="searchResponse.videos"/>
    </div>

    <!--    歌单-->
    <div class="music_list_grid" v-else-if="searchInfo.searchType === 1000">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <music-list-grid :data="searchResponse.playlists"/>
    </div>

    <!--    歌词-->
    <div class="search_block lyric_table" v-else-if="searchInfo.searchType === 1006">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <lyric-table :data="searchResponse.songs"/>
    </div>

    <!--    用户-->
    <div class="search_block lyric_table" v-else-if="searchInfo.searchType === 1002">
      <div class="common_style" v-if="!searchBlockReady">
        <a-spin tip="努力搜索中...">
          <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
        </a-spin>
      </div>
      <user-grid :data="searchResponse.userprofiles"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Pagination from '@/components/Pagination'
import songsTable from './components/songsTable'
import artistsGrid from './components/artistsGrid'
import albumsGrid from './components/albumsGrid'
import videosGrid from './components/videosGrid'
import musicListGrid from './components/musicListGrid'
import lyricTable from './components/lyricTable'
import userGrid from '@/components/UserGrid'
import global_api from "@/utils/global_api";
import PlayList from "@/Overlay/PlayerWidget/playList";

export default {
  name: "index",
  components: {
    PlayList,
    songsTable,
    artistsGrid,
    albumsGrid,
    videosGrid,
    musicListGrid,
    lyricTable,
    userGrid,
    Pagination
  },
  watch: {
    //搜索关键词
    '$store.state.headSearch.searchInfo': function (val) {
      this.page = 1
      this.offset = 0
      this.fetchData()
    }
    //搜索类型
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'searchInfo',
    ])
  },
  data() {
    return {
      tabType: [
        {
          name: '单曲',
          value: 1
        },
        {
          name: '歌手',
          value: 100
        },
        {
          name: '专辑',
          value: 10
        },
        {
          name: '视频',
          value: 1014
        },
        {
          name: '歌单',
          value: 1000
        },
        {
          name: '歌词',
          value: 1006
        },
        {
          name: '用户',
          value: 1002
        }],
      pageHeadTitle: '找到 0 首单曲',
      searchResponse: {},
      offset: 0,  //搜索偏移量
      page: 1,
      size: 100,
      searchBlockReady: false,
    }
  },
  methods: {
    fetchData() {
      this.searchBlockReady = false
      global_api.search(this.offset, this.size, this.searchInfo.searchWord, this.searchInfo.searchType).then(res => {
        if (res.data.code === 200) {
          this.searchBlockReady = true
          this.searchResponse = res.data.result

          switch (this.searchInfo.searchType) {
            case 1: {
              this.pageHeadTitle = `找到 ${res.data.result.songCount} 首单曲`
              break;
            }
            case 100: {
              this.pageHeadTitle = `找到 ${res.data.result.artistCount} 位歌手`
              break
            }
            case 10: {
              this.pageHeadTitle = `找到 ${res.data.result.albumCount} 张专辑`
              break
            }
            case 1014: {
              this.pageHeadTitle = `找到 ${res.data.result.videoCount} 个视频`
              break
            }
            case 1000: {
              this.pageHeadTitle = `找到 ${res.data.result.playlistCount} 个歌单`
              break
            }
            case 1006: {
              this.pageHeadTitle = `找到 ${res.data.result.songCount} 首包含搜索歌词的单曲`
              break
            }
            case 1002: {
              this.pageHeadTitle = `找到 ${res.data.result.userprofileCount} 位用户`
              break
            }
          }
        }
      })
    },
    changeSearchType(type) {
      this.$store.dispatch('headSearch/saveSearchInfo', {searchWord: this.searchInfo.searchWord, searchType: type})
    },
    offsetChange(page, pageSize) {
      this.page = page
      this.offset = (page - 1) * pageSize
      this.fetchData()
    },
    toDiscovery() {}
  }
}
</script>

<style scoped lang="scss">
@import "src/style/searchIndexStyle";
</style>