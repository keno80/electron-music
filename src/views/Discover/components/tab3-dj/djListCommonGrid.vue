<template>
  <div class="dj_program_list_common">
    <template v-for="(item, index) in data">
      <a>
        <div class="dj_program_item">
          <img :src="item.picUrl + '?param=140y140'"/>
          <div>
            <p class="radios_name">{{ item.name }}</p>
            <div class="desc_sub">
              <p class="rcmd_p">{{ item.rcmdtext }}</p>
              <span>节目：{{ item.programCount }}</span>
              <span>订阅：{{ item.subCount | formatCount }}</span>
            </div>
          </div>
        </div>
      </a>
    </template>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "djListCommonGrid",
  props: {
    data: Array
  },
  filters: {
    formatCount(val) {
      return val / 10000 >= 10 ? lodash.floor(val / 10000) + '万' : val
    }
  }
}
</script>

<style scoped lang="scss">
.dj_program_list_common {
  display: flex;
  flex-wrap: wrap;

  .dj_program_item {
    width: 380px;
    display: flex;
    margin-bottom: 16px;
    align-items: center;

    img {
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      margin-right: 10px;
    }

    .radios_name {
      color: #4c4c4c;
      font-family: PingFang Thin SC, sans-serif;
      font-size: 13px;
      width: 100%;
    }

    .desc_sub {
      font-family: PingFang Thin SC, sans-serif;
      font-size: 13px;
      color: #acacac;

      .rcmd_p {
        margin-bottom: 4px;
      }

      span {
        margin-right: 20px;
      }
    }
  }
}
</style>