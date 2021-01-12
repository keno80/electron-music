<template>
  <div class="dj_content">
    <carousel :banner="djBanner" :type="'dj'"/>

    <div class="dj_category">
      <template v-for="(item, index) in djCategory">
        <a class="dj_category_block">
          <img :src="item.pic56x56Url"/>
          <p>{{ item.name }}</p>
        </a>
      </template>
    </div>

    <div class="dj_personalize_recommend">
      <h2>电台个性推荐</h2>
      <dj-common-grid :data="djRecommend"/>
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
      djRecommend: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.djBanner().then(res => {
        if (res.data.code === 200) {
          this.djBanner = res.data.data
        }
      })

      api.djCategory().then(res => {
        if (res.data.code === 200) {
          this.djCategory = res.data.categories
        }
      })

      api.djRecommend().then(res => {
        if (res.data.code === 200) {
          this.djRecommend = res.data.data
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

  .dj_personalize_recommend {
    margin-top: 26px;

    h2 {
      font-weight: bolder;
      color: #353535;
    }
  }
}
</style>