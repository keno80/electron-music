<template>
  <div class="table_block">
    <div class="program_item" v-for="(item, index) in data" :key="index"
         :class="[(index + 1)%2 === 1 ? 'block_color': '']">
      <div class="program_item_index">
        <span>{{ index }}</span>
      </div>
      <div class="program_item_img">
        <img :src="item.coverUrl + '?param=60y60'"/>
      </div>
      <div class="program_item_name">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "djProgramsTable",
  props: {
    data: Array
  }
}
</script>

<style scoped lang="scss">
.program_item {
  display: flex;
  align-items: center;
  height: 80px;
  font-family: PingFang Thin SC, sans-serif;

  .program_item_index {
    color: #dbdbdb;
    padding: 30px;
    font-size: 13px;
  }

  .program_item_img {
    img {
      border-radius: 4px;
      border: 1px solid #f1f1f1;
    }
  }

  .program_item_name {
    padding: 0 10px;
    width: 300px;

    p {
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 13px;
      color: #2f2f2f;
    }
  }
}

.block_color {
  background-color: rgb(249, 249, 249);
}
</style>