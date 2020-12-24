<template>
  <div class="search_tool">
    <a-auto-complete
        v-model="search"
        :data-source="dataSource"
        style="width: 200px"
        placeholder="搜索"
        @select="onSelect"
        @search="onSearch"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
    />
    <HotSearchPanel v-if="searchFocus"/>
  </div>
</template>

<script>
import HotSearchPanel from "@/components/HeadSearch/HotSearchPanel";

export default {
  name: "search",
  components: {
    HotSearchPanel
  },
  data() {
    return {
      search: '',
      dataSource: [],
      searchFocus: false  //搜索框是否获取了焦点
    }
  },
  methods: {
    onSelect() {

    },
    onSearch() {

    },
    onChange() {

    },
    onFocus() {
      this.searchFocus = true
    },
    onBlur() {
      this.searchFocus = false
    }
  }
}
</script>

<style scoped lang="scss">
.search_tool {
  margin-right: 100px;
  margin-left: 30px;

  /deep/ .ant-select-auto-complete {
    -webkit-app-region: no-drag;

    .ant-select-selection {
      background-color: #e13e3e;
    }

    .ant-select-selection--single {
      border-radius: 16px;

      .ant-input {
        border: none !important;
        background-color: #e13e3e;
        color: #ffffff;
        border-radius: 16px;

        &::placeholder {
          color: rgba(255, 255, 255, .4);
        }

        &:focus {
          border: none;
          box-shadow: none;
        }
      }
    }
  }
}
</style>