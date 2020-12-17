<template>
  <a-layout class="sider-layout">
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        mode="inline"
        :default-selected-keys="[0]"
        :style="{ height: '100%', borderRight: 0 }"
        theme="light"
      >
        <a-menu-item v-for="(route, index) in routes.children" :key="index">
          <app-link :to="resolvePath(route.path)">
            {{ route.meta.title }}
          </app-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <app-main/>
  </a-layout>
</template>

<script>
import AppMain from "@/Overlay/AppMain";
import AppLink from '@/Overlay/Sidebar/Link'
import {isExternal} from "@/utils/validate";
import path from "path";
import {mapGetters} from 'vuex'

export default {
  name: "index",
  components: {
    AppMain,
    AppLink
  },
  computed: {
    routes() {
      return this.$router.options.routes[0]
    },
    basePath() {
      return this.$router.options.routes[0].path
    },
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../style/sidebar";

</style>