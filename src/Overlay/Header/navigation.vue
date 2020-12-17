<template>
  <div class="navigation_tool">
    <a-button type="primary" shape="circle" icon="left" size="small" style="margin-right: 8px" :disabled="backDisable"
              @click="back"/>
    <a-button type="primary" shape="circle" icon="right" size="small" :disabled="forwardDisable" @click="forward"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {validArray} from '@/utils/validate'

export default {
  name: "navigation",
  data() {
    return {
      backDisable: true,
      forwardDisable: true
    }
  },
  computed: {
    ...mapGetters([
      'cachedHistory',
      'cachedHistoryIndex'
    ]),
    canForward() {
      if (validArray(this.cachedHistory)) {

      }
    },
    canBack() {
      if (validArray(this.cachedHistory)) {
        if (this.cachedHistoryIndex === this.cachedHistory.length) {

        } else {

        }
      }
    }
  },
  methods: {
    back() {

    },
    forward() {

    }
  }
}
</script>

<style scoped lang="scss">
.navigation_tool {
  .ant-btn-primary {
    -webkit-app-region: no-drag;
    border: none;
    background-color: #d93b3b;
    margin-right: 10px;

    &:after {
      border: none;
      opacity: 0;
    }
  }
}
</style>