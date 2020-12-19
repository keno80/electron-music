<template>
  <div class="carousel_content">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(img, index) in imgList" :key="index">
        <img :src="img">
      </el-carousel-item>
    </el-carousel>
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
  }
}
</script>

<style scoped lang="scss">
.carousel_content {
  .el-carousel--horizontal {
    .el-carousel__container {
      .is-active {
        width: 513px;
        transform: translateX(129.5px) scale(1)!important;
        border-radius: 10px;

        img {
          height: 200px;
        }
      }

      .el-carousel__item--card {
        border-radius: 10px;

        .el-carousel__mask {
          border-radius: 10px;
        }

        img {
          height: 200px;
          width: 100%;
        }
      }
    }
  }
}

</style>