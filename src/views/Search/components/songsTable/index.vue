<template>
  <el-table :data="data" stripe @row-dblclick="dbcPlayMusic">
    <el-table-column type="index" width="50px" align="center"></el-table-column>
    <el-table-column width="50px" align="center">
      <template slot-scope="{row}">
        <a-icon type="heart" style="margin-right: 8px;font-size: 14px;color: #ababab"/>
        <a-icon type="download" style="font-size: 14px;color: #ababab"/>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="音乐标题" width="240"></el-table-column>
    <el-table-column prop="ar" label="歌手" width="124">
      <template slot-scope="{row}">
        <span v-for="(item, index) in row.ar">
          <a class="ar_style">{{ item.name }}</a>
          <span v-if="row.ar.length > 1 && index !== row.ar.length - 1">/</span>
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="al" label="专辑" width="150">
      <template slot-scope="{row}">
        <span>{{ row.al.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="dt" label="时长" width="60px">
      <template slot-scope="{row}">
        <span>{{ row.dt | formatDt }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="pop" label="热度" width="100">
      <template slot-scope="{row}">
        <a-progress :percent="row.pop" size="small" :show-info="false"
                    :stroke-color="{'0%': '#ffbcbc','100%': '#ec4141'}"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {numberToTime} from "@/utils/playerFn";

export default {
  name: "index",
  props: {
    data: Array
  },
  filters: {
    formatDt(val) {
      return numberToTime(val)
    }
  },
  data() {
    return {}
  },
  methods: {
    dbcPlayMusic(row) {
      this.$store.dispatch('playerWidget/nowPlayMusicId', row.id)
    }
  }
}
</script>

<style scoped lang="scss">
</style>