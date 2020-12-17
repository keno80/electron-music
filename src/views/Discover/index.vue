<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Tab 1">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api from './api'

export default {
  name: "index",
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.discovery().then(res => {
        console.log(res);
      })
    },
    callback() {

    }
  }
}
</script>

<style scoped>

</style>