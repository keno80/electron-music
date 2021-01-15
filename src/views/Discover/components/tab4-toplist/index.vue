<template>
  <div class="top_list_content">
    <template v-for="(item, index) in topList" v-if="item.ToplistType">
      <div class="top_list_item">
        <img :src="item.coverImgUrl + '?param=170y170'"/>
        <top-list-table/>
      </div>
    </template>
  </div>
</template>

<script>
import api from '@/views/Discover/api'
import topListTable from "@/views/Discover/components/tab4-toplist/topListTable";

export default {
  name: "index",
  components: {
    topListTable
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.allTopList().then(res => {
        if (res.data.code === 200) {
          this.topList = res.data.list
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.top_list_content {
  width: 774px;

  .top_list_item {
    display: flex;
    margin-top: 20px;
    margin-bottom: 40px;

    img {
      border-radius: 6px;
    }
  }
}
</style>