<template>
  <div class="new_song_content">
    <div class="title">
      <h2>推荐新歌</h2>
    </div>
    <div class="songs_content">
      <div class="blocks" v-for="(item, index) in newSong" :key="index">
        <img :src="item.picUrl">
        <div class="name_content">
          <p class="name_format song_name">{{ item.name }}</p>
<!--          <p class="name_format artists_name">{{ getArtists(item) }}</p>-->
          <p class="name_format artists_name" v-for="(info, index) in item.song.artists" :key="index">
            <a>{{ info.name }}</a>
            <span v-if="item.song.artists.length > 1 && index !== item.song.artists.length">/</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    newSong: {
      type: Array
    }
  },
  methods: {
    getArtists(item) {
      let l = []
      for (let i = 0; i < item.song.artists.length; i++) {
        l.push(item.song.artists[i].name);
      }
      return l.join('/')
    }
  }
}
</script>

<style scoped lang="scss">
.new_song_content {
  margin-top: 20px;

  .songs_content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .blocks {
      display: flex;
      width: 250px;
      height: 50px;
      margin-bottom: 14px;

      &:hover {
        background-color: rgba(145, 145, 145, 0.2);
        border-radius: 6px;
      }

      img {
        width: 49px;
        height: 49px;
        border-radius: 6px;
        border: 1px solid #eeeeee;
      }

      .name_content {
        width: 200px;
        padding: 6px;

        .song_name {
          margin-bottom: 0;
        }

        .artists_name {
          font-size: 12px;
          color: #acacac;
          display: inline-block;
        }

        .name_format {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>