<template>
  <div class="search_tool">
    <a-input ref="userNameInput" v-model="search" placeholder="搜索" @focus="onFocus" @blur="onBlur" @change="onChange">
      <a-icon slot="prefix" type="search"/>
    </a-input>

        <HotSearchPanel v-show="showPanel === 1"/>
        <SuggestPanel :searchWord="search" :data="suggestData" v-show="showPanel === 2"/>
<!--    <SuggestPanel :searchWord="search" :data="suggestData"/>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from "./api";
import lodash from 'lodash'
import HotSearchPanel from "@/components/HeadSearch/HotSearchPanel";
import SuggestPanel from "@/components/HeadSearch/SuggestPanel";

export default {
  name: "search",
  components: {
    HotSearchPanel,
    SuggestPanel
  },
  computed: {
    ...mapGetters([
      'searchInfo'
    ])
  },
  watch: {
    '$store.state.headSearch.searchInfo.searchWord': function (val) {
      this.saveSearchData(val)
    }
  },
  data() {
    return {
      suggestData: {},
      showPanel: 0,  //展示热搜面板或搜索建议面板, 0 - 不展示 1 - 展示热搜  2- 展示搜索建议
      search: '',
      type: 1
    }
  },
  methods: {
    saveSearchData(val) {
      if (this.$route.path !== '/search') {
        this.$router.push({
          path: '/search'
        })
      }
      this.search = val
      this.$store.dispatch('headSearch/saveSearchInfo', {searchWord: this.search, searchType: this.type})
    },
    onChange(e) {
      this.showPanel = e.target.value.length === 0 ? 1 : 2

      if (this.showPanel === 2) {
        this.getSearchSuggest(e.target.value)
      }
    },
    onFocus() {
      this.showPanel = this.search.length === 0 ? 1 : 2

      if (this.search.length !== 0) {
        this.getSearchSuggest(this.search)
      }
    },
    onBlur() {
      setTimeout(() => {
        this.showPanel = 0
      }, 200)
    },
    getSearchSuggest: lodash.debounce(function (val) {
      api.getSearchSuggest(val).then(res => {
        if (res.data.code === 200) {
          this.suggestData = res.data.result
        }
      })
    }, 500)
  }
}
</script>

<style scoped lang="scss">
.search_tool {
  margin-right: 100px;
  margin-left: 30px;

  /deep/ .ant-input-affix-wrapper {
    -webkit-app-region: no-drag;

    .ant-input {
      background-color: rgb(225, 62, 62);
      border: none;
      border-radius: 15px;
      color: #ffffff;

      &:focus {
        border: none;
        box-shadow: none;
      }

      &::placeholder {
        color: rgba(255, 255, 255, .3)
      }
    }

    .ant-input-prefix {
      color: #ffffff;
    }

  }
}
</style>