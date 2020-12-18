<template>
  <div class="carousel_content">
    <a-carousel dot-position="bottom" autoplay>
      <div v-for="(img, index) in imgList" :key="index" class="imgStyle">
        <img :src="img">
      </div>
    </a-carousel>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    recommend: {
      type: Array
    }
  },
  computed: {
    imgList() {
      let list = []
      for (let i = 0; i < this.recommend[0].extInfo.banners.length; i++) {
        list.push(this.recommend[0].extInfo.banners[i].pic)
      }
      return list
    },
  },
  methods: {
    getImgUrl(i) {
      const image = this.imgList
      return image[i]
    }
  }
}
</script>

<style scoped lang="scss">
.carousel_content {
  height: 230px;

  /deep/.ant-carousel {
    .slick-slide {
      height: 230px;
      line-height: 160px;
      background: #364d79;
    }

    .slick-list {
      border-radius: 10px;
    }

    .imgStyle {

      img {
        width: 100%;
        height: 230px;
      }
    }
  }
}

</style>