import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";

import app from "@/store/modules/app";
import navigation from "@/store/modules/navigation";
import playerWidget from "@/store/modules/playerWidget";
import headSearch from "@/store/modules/headSearch";
import musicList from "@/store/modules/musicList";
import djProgram from "@/store/modules/djProgram";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    navigation,
    playerWidget,
    headSearch,
    musicList,
    djProgram
  },
  getters
})
