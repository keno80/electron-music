<template>
  <div class="dj_content">
    <carousel :banner="djBanner" :type="'dj'"/>

    <div class="dj_category">
      <template v-for="(item, index) in djCategory">
        <a class="dj_category_block" @click="toProgramsList(item.id)">
          <img :src="item.pic56x56Url"/>
          <p>{{ item.name }}</p>
        </a>
      </template>
    </div>

    <div class="block_common">
      <h2>电台个性推荐</h2>
      <dj-common-grid :data="djRecommend" @getInfo="getRadioInfo"/>
    </div>

    <div class="block_common">
      <h2 @click="toProgramsList(2001)">
        <a>
          创作翻唱
          <a-icon type="right"/>
        </a>
      </h2>
      <dj-common-grid :data="type2001" @getInfo="getRadioInfo"/>
    </div>

    <div class="block_common">
      <h2 @click="toProgramsList(8)">
        <a>
          脱口秀
          <a-icon type="right"/>
        </a>
      </h2>
      <dj-common-grid :data="type8" @getInfo="getRadioInfo"/>
    </div>

    <div class="block_common">
      <h2 @click="toProgramsList(2)">
        <a>
          音乐故事
          <a-icon type="right"/>
        </a>
      </h2>
      <dj-common-grid :data="type2"/>
    </div>

    <div class="block_common">
      <h2 @click="toProgramsList(3001)">
        <a>
          声音恋人
          <a-icon type="right"/>
        </a>
      </h2>
      <dj-common-grid :data="type3001" @getInfo="getRadioInfo"/>
    </div>
  </div>
</template>

<script>
import api from '@/views/Discover/api'
import Carousel from '@/components/Carousel'
import djCommonGrid from "@/views/Discover/components/tab3-dj/djCommonGrid";

export default {
  name: "index",
  components: {
    Carousel,
    djCommonGrid
  },
  data() {
    return {
      djBanner: [],
      djCategory: [],
      djRecommend: [],
      type2001: [],  //创作翻唱
      type8: [],  //脱口秀
      type2: [],  //音乐故事
      type3001: [],  //声音恋人
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //banner
      api.djBanner().then(res => {
        if (res.data.code === 200) {
          this.djBanner = res.data.data
        }
      })

      //分类
      api.djCategory().then(res => {
        if (res.data.code === 200) {
          this.djCategory = res.data.categories
        }
      })

      //个性推荐
      api.djRecommend().then(res => {
        if (res.data.code === 200) {
          this.djRecommend = res.data.data
        }
      })

      //分类推荐  -  创作翻唱  -  2001
      api.djTypeRecommend(2001).then(res => {
        if (res.data.code === 200) {
          this.type2001 = res.data.djRadios
        }
      })

      //分类推荐  -  创作翻唱  -  8
      api.djTypeRecommend(8).then(res => {
        if (res.data.code === 200) {
          this.type8 = res.data.djRadios
        }
      })

      //分类推荐  -  创作翻唱  -  2
      api.djTypeRecommend(2).then(res => {
        if (res.data.code === 200) {
          this.type2 = res.data.djRadios
        }
      })

      //分类推荐  -  创作翻唱  -  3001
      api.djTypeRecommend(3001).then(res => {
        if (res.data.code === 200) {
          this.type3001 = res.data.djRadios
        }
      })
    },
    toProgramsList(type) {
      api.djTypeHot(type).then(res => {
        if (res.data.code === 200) {
          this.$store.dispatch('djProgram/saveRadioList', res.data.djRadios)
          this.$router.push({
            path: '/dj_programs_list'
          })
        }
      })
    },
    getRadioInfo(id) {
      api.djDetail(id).then(res => {
        if (res.data.code === 200) {
          this.$store.dispatch('app/changeTag', '电台')
          this.$store.dispatch('djProgram/saveRadioProgramsDetail', res.data.data)
          this.$router.push('/music_list')

          api.djPrograms(id).then(res => {
            if (res.data.code === 200) {
              this.$store.dispatch('djProgram/saveRadioProgramsList', res.data.programs)
              console.log(res.data.programs);
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dj_content {
  width: 774px;

  .dj_category {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 26px;

    .dj_category_block {
      text-align: center;

      p {
        margin: 6px 0 0 0;
        font-size: 13px;
        color: #3c3c3c;
      }
    }

    img {
      background-color: rgba(236, 65, 65, .1);
      padding: 10px;
      width: 50px;
      border-radius: 50%;

      &:hover {
        background-color: rgba(236, 65, 65, .2);
      }
    }
  }

  .block_common {
    margin-bottom: 20px;

    h2 {
      font-weight: bolder;
      color: #353535;

      a {
        color: #3e3e3e;

        &:hover {
          color: #111111;
        }
      }
    }
  }
}
</style>