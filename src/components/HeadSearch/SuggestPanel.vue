<template>
  <div class="search_suggest">
    <el-scrollbar style="height: 100%">
      <div class="to_search_page">
        <a>搜"<span style="color: #40a9ff">{{ searchWord }}</span>"相关的结果 ></a>
      </div>

      <div class="song_content" v-if="data.songs">
        <div class="common">
          <icon-font type="icon-yinle"/>
          <p>单曲</p>
        </div>
        <div class="common_block" v-for="(item, index) in data.songs" :key="index">
          <a @click="doSuggestAction('song', item)">
            <span>
              {{ item.name }}
              <span v-if="item.alias.length !== 0" style="font-size: 12px;color: #acacac">({{ item.alias[0] }})</span> -
            </span>
            <span v-for="(artist, index) in item.artists">
              <span class="artists_name">{{ artist.name }}</span>
              <span v-if="item.artists.length > 1 && index !== item.artists.length - 1">/</span>
            </span>
          </a>
        </div>
      </div>

      <div class="artists_content" v-if="data.artists">
        <div class="common">
          <icon-font type="icon-yonghutouxiang"/>
          <p>歌手</p>
        </div>
        <div class="common_block" v-for="(item, index) in data.artists" :key="index">
          <a>{{ item.name }}</a>
        </div>
      </div>

      <div class="album_content" v-if="data.albums">
        <div class="common">
          <icon-font type="icon-zhuanji"/>
          <p>专辑</p>
        </div>
        <div class="common_block" v-for="(item, index) in data.albums" :key="index">
          <a>
            <span>{{ item.name }} - </span>
            <span class="artists_name">{{ item.artist.name }}</span>
          </a>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {Icon} from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2274170_fzk9y3uzdu.js'
})

export default {
  name: "suggestPanel",
  props: {
    searchWord: String,
    data: Object
  },
  components: {
    IconFont
  },
  methods: {
    //根据type来执行操作
    doSuggestAction(type) {
      switch (type) {
        case 'song':

      }
    }
  }
}
</script>

<style scoped lang="scss">
.search_suggest {
  position: absolute;
  z-index: 1000;
  top: 50px;
  width: 352px;
  background-color: #ffffff;
  height: 430px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, .07);
  border-radius: 4px;
  overflow: hidden;
  line-height: 1;

  .to_search_page {
    padding: 8px;

    a {
      color: #a0a0a0;
      font-size: 12px;
      font-family: PingFang Thin SC, sans-serif;

      &:hover {
        color: #505050;
      }
    }
  }

  .common {
    background-color: rgb(245, 245, 247);
    padding: 8px;
    display: flex;

    p {
      font-size: 13px;
      font-family: PingFang Thin SC, sans-serif;
      color: #222222;
      margin: 0 0 0 4px;
    }
  }

  .common_block {
    display: flex;
    padding: 7px 6px 7px 25px;

    &:hover {
      background-color: rgb(245, 245, 247);
    }

    a {
      width: 100%;
      font-size: 12.5px;
      color: #6b6b6b;
      font-family: PingFang Thin SC, sans-serif;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .el-scrollbar {
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    /deep/ .el-scrollbar__bar {
      bottom: 2px;
    }
  }
}
</style>