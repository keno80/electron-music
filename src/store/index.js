import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";

import navigation from "@/store/modules/navigation";
import playerWidget from "@/store/modules/playerWidget";
import headSearch from "@/store/modules/headSearch";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    navigation,
    playerWidget,
    headSearch
  },
  getters
})
