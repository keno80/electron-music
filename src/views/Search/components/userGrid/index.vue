<template>
  <div class="user_content">
    <template v-for="(item, index) in data">
      <a>
        <div class="user_block">
          <img :src="item.avatarUrl + '?param=80y80'">
          <img :src="item.avatarDetail.identityIconUrl" v-if="item.avatarDetail !== null" class="avatar_corner">
          <div class="user_name">
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
.user_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:after {
    width: 380px;
    content: "";
  }

  .user_block {
    width: 380px;
    display: flex;
    align-items: center;
    border: 1px solid #efefef;
    margin: 6px 0;
    border-radius: 4px;
    padding: 2px;
    position: relative;

    &:hover {
      border: 1px solid #ec4141;
      box-shadow: 0 0 5px rgba(235, 65, 65, .7);
      transition: ease-in-out .4s;
    }

    .user_name {
      margin-left: 10px;

      p {
        margin: 0;
        line-height: 1.9;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #4c4c4c;
        width: 280px;
      }
    }

    img {
      border-radius: 50%;
      border: 1px solid #efefef;
    }

    .avatar_corner {
      border: none;
      position: absolute;
      width: 25px;
      height: 25px;
      bottom: 2px;
      left: 60px;
    }
  }
}
</style>