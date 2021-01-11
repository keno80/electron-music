<template>
  <div class="music_list_block">
    <div class="ml_bg">
      <div class="high_quality_music_list_banner"
           :style="{ backgroundImage: 'url('+ highQualityFirst.coverImgUrl +')'}">
        <div :style="{ backgroundImage: 'url('+ highQualityFirst.coverImgUrl +')'}" class="blurImg"/>
      </div>

      <div class="music_list_des">
        <div>
          <img :src="highQualityFirst.coverImgUrl"/>
        </div>
        <div class="description">
          <a-button shape="round" ghost>
            <a-icon type="crown"/>
            精品歌单
          </a-button>
          <p class="name">{{ highQualityFirst.name }}</p>
          <p class="des">{{ highQualityFirst.copywriter }}</p>
        </div>

      </div>

    </div>

    <div class="music_list_category">
      <div class="tags_content">
        <a-button shape="round" @click="showCategoryModal">
          {{ cat }}
          <a-icon type="right"/>
        </a-button>
        <div class="tags">
          <a v-for="(item, index) in hotCats" :key="index"
             :class="[item.name === cat ? 'active_tag' : '']" @click="changeCategory(item)">{{ item.name }}</a>
        </div>
      </div>
      <div class="music_list_grid">
        <div class="music_list_spin" v-if="!listReady">
          <a-spin tip="歌单加载中...">
            <a-icon type="star" slot="indicator" style="font-size: 24px" :spin="true"/>
          </a-spin>
        </div>
        <music-list :songList="musicList" :type="'hot'" v-else/>
      </div>
    </div>

    <div class="category_modal" v-if="categoryModal">
      <div class="all">
        <a>全部歌单</a>
      </div>
        <div class="category">
          <div class="category_box" v-for="(item, index) in cats" :key="index">
            <div class="category_name">
              <a-icon :type="index | iconFilter" style="font-size: 22px;color: #989898"/>
              <span>{{ item }}</span>
            </div>
            <div>
              <template v-for="(sub, subIndex) in subCats">
                <span v-if="sub.category.toString() === index">{{sub.name}}</span>
              </template>
            </div>
          </div>
<!--          <div class="category_name">-->
<!--            <a-icon type="skin" style="font-size: 22px;color: #989898"/>-->
<!--            <span>{{ cats[1] }}</span>-->
<!--          </div>-->
<!--          <div class="category_name">-->
<!--            <a-icon type="car" style="font-size: 22px;color: #989898"/>-->
<!--            <span>{{ cats[2] }}</span>-->
<!--          </div>-->
<!--          <div class="category_name">-->
<!--            <a-icon type="smile" style="font-size: 22px;color: #989898"/>-->
<!--            <span>{{ cats[3] }}</span>-->
<!--          </div>-->
<!--          <div class="category_name">-->
<!--            <a-icon type="appstore" style="font-size: 22px;color: #989898"/>-->
<!--            <span>{{ cats[4] }}</span>-->
<!--          </div>-->
        </div>
    </div>
  </div>
</template>

<script>
import api from '@/views/Discover/api'
import MusicList from '@/components/MusicList'
import lodash from "lodash";

export default {
  name: "index",
  components: {
    MusicList
  },
  data() {
    return {
      HQCats: [],  //精品歌单分类
      hotCats: [],  //热门歌单分类
      cats: {},  //歌单主分类
      subCats: [],  //歌单主分类所属分类
      cat: '流行',  //选中的分类
      limit: 50,
      order: 'hot',  //热门为hot，最新为new
      musicList: [],  //歌单列表
      highQuality: {},  //精品歌单列表
      highQualityFirst: {},  //精品歌单列表首个歌单信息
      listReady: false,
      categoryModal: false,
    }
  },
  filters: {
    iconFilter(cat) {
      const catMap = {
        '0': 'global',
        '1': 'skin',
        '2': 'car',
        '3': 'smile',
        '4': 'appstore',
      }
      return catMap[cat]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.hotMusicListTag().then(res => {
        if (res.data.code === 200) {
          this.hotCats = res.data.tags
          this.getMusicList(this.cat)
        }
      })
    },
    //获取歌单列表
    getMusicList(name) {
      this.listReady = false
      api.musicList(name, this.limit, this.order).then(res => {
        if (res.data.code === 200) {
          this.musicList = res.data.playlists
          this.listReady = true
        }
      })

      let index = lodash.findIndex(this.hotCats, {name})
      this.checkHighQuality(index)
    },
    changeCategory(item) {
      this.cat = item.name
      this.getMusicList(item.name)
    },
    //检查当前tag是否有精品歌单
    checkHighQuality(index) {
      if (this.hotCats[index].playlistTag.highQuality === 1) {
        api.HQMusicList(this.cat, this.limit).then(res => {
          if (res.data.code === 200) {
            this.highQualityFirst = res.data.playlists[0]
            this.highQuality = res.data.playlists
          }
        })
      }
    },
    showCategoryModal() {
      this.categoryModal = !this.categoryModal
      api.musicListTags().then(res => {
        if (res.data.code === 200) {
          this.cats = res.data.categories
          this.subCats = res.data.sub
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.music_list_block {
  .ml_bg {
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 14px;
    position: relative;

    .music_list_des {
      position: absolute;
      top: 13px;
      left: 13px;
      display: flex;
      align-items: center;

      img {
        width: 134px;
        height: 134px;
        border-radius: 6px;
      }

      .description {
        margin-left: 10px;

        .ant-btn-background-ghost {
          color: rgb(231, 170, 90);
          border-color: rgb(231, 170, 90);
        }

        .name {
          color: #ffffff;
          margin-bottom: 4px;
          margin-top: 20px;
        }

        .des {
          color: #d7d7d7;
          font-size: 12px;
          margin: 0;
        }
      }
    }

    .high_quality_music_list_banner {
      height: 160px;
      width: 100%;
      overflow: hidden;
      background-size: cover;
      background-position: 50%;
      transform: scale(2.4);
      transition: all ease-in-out .4s;

      .blurImg {
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        transform: scale(2.4);
        filter: blur(10px) brightness(70%);
        background-position: 50%;
        transition: all ease-in-out .4s;
      }
    }
  }

  .music_list_category {
    .tags_content {
      display: flex;
      align-items: center;
      margin-bottom: 14px;

      .ant-btn-round {
        width: 112px;

        &:hover {
          color: #ec4141;
          border-color: #ec4141;
        }

        &:focus {
          color: #ec4141;
          border-color: #ec4141;
        }
      }

      .tags {
        margin-left: 160px;

        a {
          font-size: 13px;
          font-family: PingFang Thin SC, sans-serif;
          color: #888888;
          padding: 1px 8px;

          &:hover {
            color: #ec4141;
          }
        }

        .active_tag {
          color: #ec4141;
          background: rgba(236, 65, 65, .1);
          border-radius: 10px;
        }
      }
    }

    .music_list_grid {
      .music_list_spin {
        width: 100%;
        text-align: center;
        margin-top: 80px;
      }
    }
  }

  .category_modal {
    width: 600px;
    background-color: #ffffff;
    position: absolute;
    top: 240px;
    left: 120px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(76, 76, 76, 0.4);
    font-family: PingFang Thin SC, sans-serif;

    a {
      color: #888888;
    }

    .all {
      padding: 10px 20px;
      border-bottom: 1px solid #e3e3e3;
    }

    .category {
      padding: 10px 20px;

      .category_box {
        padding: 14px 0;
        display: flex;

        span {
          color: #d2d2d2;
          margin-left: 10px;
          vertical-align: 3px;
        }
      }
    }
  }
}
</style>