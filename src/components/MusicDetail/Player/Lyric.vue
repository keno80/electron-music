<template>
  <div class="inner_lyric_content">
      <div>
<!--        <div class="lyric_item">-->
        <div class="lyric_item" :style="lyricScroll">
          <template v-if="lyric.length > 0">
            <p v-for="(item, index) in lyric" :key="index" :class="[lyricIndex === index ? 'active_lyc' : '']">
              {{ item.lyric }}</p>
          </template>
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Lyric",
  data() {
    return {
      top: 0,
      lineHeight: 30,
    }
  },
  computed: {
    ...mapGetters([
      'lyric',
      'lyricIndex'
    ]),
    lyricScroll() {
      if ((0 - this.lineHeight) * (this.lyricIndex - this.top) <= -150) {
        return `transform :translate3d(0, ${(0 - this.lineHeight) * (this.lyricIndex - this.top) + 140}px, 0);transition: all 2s;line-height: ${this.lineHeight}px;`;
      }
    }
  },
}
</script>

<style scoped lang="scss">
.inner_lyric_content {
  height: 330px;
  width: 380px;
  overflow: hidden;

  p {
    margin: 0;
    line-height: 30px;
  }

  .lyric_item {
    //text-align: center;
  }
}

.active_lyc {
  color: #ec4141;
  font-size: 16px;

}
</style>