<template>
  <div class="common_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="common_block user_block">
          <img :src="item.avatarUrl + '?param=80y80'">
          <img :src="item.avatarDetail.identityIconUrl" v-if="item.avatarDetail !== null" class="avatar_corner">
          <div class="common_name user_name">
            <p>
              {{ item.nickname }}
              <a-icon type="man" style="color: #40a9ff" v-if="item.gender === 1"/>
              <a-icon type="woman" style="color: #ff40cf" v-else-if="item.gender === 2"/>
            </p>
            <p style="color: #acacac;font-size: 13px">粉丝数：{{ item.followeds }}</p>
            <template v-if="item.avatarDetail !== null">
              <p style="color: #acacac;font-size: 13px" v-if="item.avatarDetail.userType === 10">{{ item.description }}</p>
              <p style="color: #acacac;font-size: 13px" v-else-if="item.avatarDetail.userType === 4">网易音乐人</p>
            </template>
            <p style="color: #acacac;font-size: 13px" v-else-if="item.description !== ''">{{ item.description }}</p>
            <p style="color: #acacac;font-size: 13px" v-else-if="item.signature !== ''">{{ item.signature }}</p>
            <p style="color: #acacac;font-size: 13px" v-else>啥也没找到 ~</p>
          </div>
        </div>
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    data: Array
  }
}
</script>

<style scoped lang="scss">
@import "src/style/searchComponentsStyle";
</style>