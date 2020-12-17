<template>
  <div class="login_tool">
    <a-avatar :size="26" icon="user"/>
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        未登录
        <a-icon type="caret-down"/>
      </a>
    </a-dropdown>
  </div>
</template>

<script>
export default {
name: "login"
}
</script>

<style scoped lang="scss">
.login_tool {
  -webkit-app-region: no-drag;

  /deep/ .ant-dropdown-link {
    color: rgba(255, 255, 255, .8);
    font-size: 12px;
  }
}
</style>