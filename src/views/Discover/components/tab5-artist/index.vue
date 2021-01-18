<template>
  <div class="artist_content">
    <artis-picker :area="area" :type="type" :letter="letter"/>
  </div>
</template>

<script>
import ArtisPicker from "@/views/Discover/components/tab5-artist/ArtisPicker";
import api from "@/views/Discover/api";
import {mapGetters} from 'vuex'

export default {
  name: "index",
  components: {
    ArtisPicker
  },
  computed: {
    ...mapGetters([
      'selectedType',
      'selectedArea',
      'selectedLetter'
    ]),
    letter() {
      let arr = []
      for (let i = 0; i < 26; i++) {
        arr.push({
          value: String.fromCharCode(97 + i),
          label: String.fromCharCode(65 + i)
        })
      }
      arr.unshift({
        value: -1,
        label: '热门'
      })
      arr.push({
        value: 0,
        label: '#'
      })
      return arr
    }
  },
  data() {
    return {
      area: [
        {value: -1, label: '全部'},
        {value: 7, label: '华语'},
        {value: 96, label: '欧美'},
        {value: 8, label: '日本'},
        {value: 16, label: '韩国'},
        {value: 0, label: '其他'}
      ],
      type: [
        {value: -1, label: '全部'},
        {value: 1, label: '男歌手'},
        {value: 2, label: '女歌手'},
        {value: 3, label: '乐队'}
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.artistsList(this.selectedType, this.selectedArea, this.selectedLetter).then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.artist_content {
  width: 774px;
}
</style>