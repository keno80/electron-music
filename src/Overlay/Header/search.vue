<template>
  <div class="search_tool">
    <a-input ref="userNameInput" v-model="search" placeholder="搜索">
      <a-icon slot="prefix" type="search" style="color: #ffffff"/>
    </a-input>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
     search: ''
    }
  }
}
</script>

<style scoped lang="scss">
.search_tool {
  margin-right: 100px;

  /deep/ .ant-input {
    -webkit-app-region: no-drag;
    border-radius: 16px;
    background-color: #e13e3e;
    border: 0;
    color: #ffffff;

    &::placeholder {
      color: rgba(255, 255, 255, .4);
    }

    &:focus {
      border: none;
      box-shadow: none;
    }
  }
}
</style>