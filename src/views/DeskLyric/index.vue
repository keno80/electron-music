<template>
  <div class="ds_blocks">
    <p v-for="(item, index) in lyric" :key="index" class="normal_style" v-if="lyricIndex === index">{{ item.lyric }}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const {ipcRenderer, webContents, remote} = window.require('electron')

export default {
  name: "index",
  computed: {
    ...mapGetters([
      'lyric',
    ]),
  },
  data() {
    return {
      lyricIndex: null,
      overStyle: false,
    }
  },
  mounted() {
    let _this = this
    _this.$store.dispatch('playerWidget/saveLyric', JSON.parse(localStorage.getItem('lyricFloating')))

    window.onstorage = function (e) {
      if (e.key === 'lyricFloatingIndex') {
        if (e.newValue !== null) {
          _this.$store.dispatch('playerWidget/saveLyricIndex', JSON.parse(localStorage.getItem('lyricFloatingIndex')))
        }
      }

      if (e.key === 'audioCurrentTime') {
        for (let i = 0; i < _this.lyric.length; i++) {
          if (e.newValue > parseInt(_this.lyric[i].time)) {
            const index = _this.lyric[i].index;
            if (i === parseInt(index)) {
              _this.lyricIndex = i;
            }
          }
        }
      }

      if (e.key === 'lyricFloating') {
        _this.$store.dispatch('playerWidget/saveLyric', JSON.parse(e.newValue))
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.ds_blocks {
  -webkit-app-region: drag;
  text-align: center;
  height: 76px;
  overflow: hidden;
  width: 700px;

  //&:hover {

  //  background-color: rgba(114, 114, 114, 0.1);
  //  border: 1px solid #bfbfbf;
  //}

  .normal_style {
    font-size: 38px;
    font-weight: bolder;
    background: linear-gradient(to bottom, #FF8C00, #FF0080);
    -webkit-background-clip: text;
    -webkit-text-stroke: .1px rgba(26, 26, 26, 0.9);
    font-family: "PingFang ZhongCu SC", sans-serif;
    -webkit-text-fill-color: transparent;
    color: transparent;
    margin: 0;
    line-height: 2;
  }
}

</style>