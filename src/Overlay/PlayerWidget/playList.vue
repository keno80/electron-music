<template>
  <div class="play_list_content">
    <div class="pl_title">
      <p>共 {{ list.length }} 首</p>
      <div>
        <a>
          <a-icon type="folder-add" class="icon_class"/>
          收藏全部
        </a>
      </div>
      <a-divider type="vertical"/>
      <div>
        <a @click="cleanPlayList">
          <a-icon type="delete" class="icon_class"/>
          清空
        </a>
      </div>
    </div>
    <div class="pl_list">
      <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{height: '60px'}" v-if="list.length <= 0">
        <span slot="description">播放列表还没有音乐哦~</span>
      </a-empty>
      <a-list bordered :data-source="list" v-else>
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="music_content" :class="[nowPlayId === item.id ? active : '']"
               @dblclick="playListDoubleClick(item, index)">
            <div class="name_content">
              <template v-if="nowPlayId === item.id">
                <a-icon type="caret-right" v-if="playStatus && nowPlayId === item.id"/>
                <a-icon type="pause" v-else/>
              </template>
              <span v-else style="margin-left: 14px"></span>
              <p>
                {{ item.name }}
              </p>
            </div>
            <div class="artist_content">
              <p v-for="(artist, index) in item.ar" :key="index">
                <a>{{ artist.name }}</a>
                <span v-if="item.ar.length > 1 && index !== item.ar.length - 1">/</span>
              </p>
            </div>
            <div class="time_content">
              {{ item.dt | musicDuration }}
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {timeToString} from "@/utils/playerFn";

export default {
  name: "playList",
  computed: {
    ...mapGetters([
      'list',
      'nowPlayMusic',
      'playStatus'
    ]),
    //用于突出显示正在播放的音乐
    nowPlayId() {
      return this.nowPlayMusic.id
    }
  },
  filters: {
    musicDuration(val) {
      return timeToString(val / 1000)
    }
  },
  data() {
    return {
      active: 'active'
    }
  },
  methods: {
    cleanPlayList() {
      this.$store.dispatch('playerWidget/cleanPlayList')
    },
    //播放列表双击事件
    playListDoubleClick(info, index) {
      //先判断当前双击的歌曲是不是正在播放
      if (info.id === this.nowPlayMusic.id) {
        if (!this.playStatus) {
          this.$store.dispatch('playerWidget/refreshPlayStatus', true)
        }
      } else {
        //如果不是当前播放的歌曲，将播放双击的歌曲
        let id = this.list[index].id
        this.$store.dispatch('playerWidget/nowPlayMusicId', id)
      }
    }
  },
}
</script>

<style scoped lang="scss">
.play_list_content {
  width: 420px;

  .pl_title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 24px;

    p {
      margin: 0;
      width: 60%;
      color: #acacac;
      font-size: 12px;
    }

    a {
      color: #3e3e3e;
    }

    .icon_class {
      font-size: 18px;
      vertical-align: -3px;
    }
  }

  .pl_list {
    .ant-empty {
      margin: 130px 8px 0 8px;
    }

    .ant-list-bordered {
      border-top: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
      border-radius: unset;

      .ant-list-item {
        padding: 8px 26px 6px 6px;
        font-size: 12px;

        .music_content {
          display: flex;

          .name_content {
            width: 224px;
            margin-right: 22px;
            display: flex;
            align-items: center;

            p {
              margin: 0;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }

          .artist_content {
            display: flex;
            width: 80px;
            margin-right: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            p {
              margin: 0;
            }

            a {
              color: #acacac;
            }
          }

          .time_content {
            width: 62px;
            color: #8e8e8e;
          }
        }

        .active {
          color: #ec4141;

          a {
            color: #ec4141 !important;
          }
        }
      }
    }
  }
}
</style>