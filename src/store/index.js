import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";

import navigation from "@/store/modules/navigation";
import songs from "@/store/modules/songs";

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
    songs
  },
  getters
})
