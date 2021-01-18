<template>
  <div class="artist_picker">
    <p>语种：
      <template v-for="(item, index) in area">
        <a class="a_common" :class="[item.value === selectedArea ? 'active' : '']"
           @click="changeArea(item.value)">{{ item.label }}</a>
        <a-divider type="vertical" v-if="index !== area.length - 1"/>
      </template>
    </p>
    <p>分类：
      <template v-for="(item, index) in type">
        <a class="a_common" :class="[item.value === selectedType ? 'active' : '']"
           @click="changeType(item.value)">{{ item.label }}</a>
        <a-divider type="vertical" v-if="index !== type.length - 1"/>
      </template>
    </p>
    <div class="filter">
      <p class="filter_title">筛选：</p>
      <div>
        <template v-for="(item, index) in letter">
          <a class="a_common" :class="[item.value === selectedLetter ? 'active' : '']"
             @click="changeLetter(item.value)"><p>{{ item.label }}</p></a>
          <a-divider type="vertical" v-if="index !== letter.length - 1"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "ArtisPicker",
  props: {
    area: Array,
    type: Array,
    letter: Array
  },
  computed: {
    ...mapGetters([
      'selectedArea',
      'selectedType',
      'selectedLetter'
    ])
  },
  methods: {
    changeArea(val) {
      this.$store.dispatch('artistsList/changeArea', val)
    },
    changeType(val) {
      this.$store.dispatch('artistsList/changeType', val)
    },
    changeLetter(val) {
      this.$store.dispatch('artistsList/changeLetter', val)
    }
  }
}
</script>

<style scoped lang="scss">
.artist_picker {
  font-size: 12px;
  font-family: PingFang Thin SC, sans-serif;

  .filter {
    display: flex;
    justify-content: space-between;

    .filter_title {
      width: 75px;
    }

    p {
      display: inline-block;
    }
  }

  .a_common {
    color: #434343;
    padding: 1px 12px;
    margin-bottom: 10px;
    border-radius: 10px;

    &:hover {
      color: #ec4141;
    }
  }

  .active {
    background-color: rgba(236, 65, 65, .1);
    color: #ec4141;
  }
}
</style>