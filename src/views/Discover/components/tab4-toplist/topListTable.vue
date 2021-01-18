<template>
  <div class="top_list_tab">
    <div class="top_list_tab_item" v-for="(item, index) in data" :class="[index%2 === 0 ? 'dark': '']">
      <p class="first">{{ item.first }}</p>
      <p class="second">{{ item.second }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "topListTable",
  props: {
    data: Array
  }
}
</script>

<style scoped lang="scss">
.top_list_tab {
  margin: 0 20px 0 14px;
  width: 100%;

  .top_list_tab_item {
    border-radius: 4px;
    padding: 6px;

    &:hover {
      background-color: #f3f3f3;
    }

    .first {
      margin-bottom: 2px;
    }

    .second {
      font-size: 12px;
      color: #acacac;
    }

    p {
      margin: 0;
    }
  }

  .dark {
    background-color: rgb(249, 249, 249);
  }
}
</style>