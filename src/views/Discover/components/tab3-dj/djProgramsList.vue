<template>
  <div>
    <a-page-header
      :title="djRadiosList[0].category"
      @back="toDJHome"
    />

    <dj-list-common-grid :data="djRadiosList"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import djListCommonGrid from "./djListCommonGrid";

export default {
  name: "djDetail",
  components: {
    djListCommonGrid
  },
  computed: {
    ...mapGetters([
      'djRadiosList'
    ])
  },
  methods: {
    toDJHome() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/public";
</style>