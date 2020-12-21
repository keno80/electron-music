<template>
  <div class="play_list_content">
    <div class="pl_title">
      <p>总33首</p>
      <div>
        <a>
          <a-icon type="folder-add" class="icon_class"/>
          收藏全部
        </a>
      </div>
      <a-divider type="vertical"/>
      <div>
        <a>
          <a-icon type="delete" class="icon_class"/>
          清空
        </a>
      </div>
    </div>
    <div class="pl_list">
      <a-list bordered :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="music_content">
            <a-icon type="caret-right"/>
            {{ item.song.name }}
          </div>
          <div class="artist_content">
            <p v-for="(artist, index) in item.song.artists" :key="index">
              <a>{{ artist.name }}</a>
              <span v-if="item.song.artists.length > 1 && index !== item.song.artists.length - 1">/</span>
            </p>
          </div>
          <div class="time_content">
            {{ item.song.duration | musicDuration }}
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
      'list'
    ]),
  },
  filters: {
    musicDuration(val) {
      return timeToString(val / 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.play_list_content {
  .pl_title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 24px;

    p {
      margin: 0;
      width: 60%;
      color: #acacac;
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
    .ant-list-bordered {
      border-top: 1px solid #d9d9d9;

      .ant-list-item {
        padding: 8px 26px 6px 6px;
        font-size: 12px;
        color: #000000;

        .music_content {
          width: 224px;
          margin-right: 22px;
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
        }

        .time_content {
          width: 62px;
          color: #acacac;
        }
      }
    }
  }
}
</style>