<template>
  <div class="car-list">
    <scroll class="content" ref="scroll">
<!--      <div v-for="item in shopCarLength">{{item}}</div>-->
      <car-list-item v-for="item in carList" :key="item.iid" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>

import Scroll from "components/common/scroll/Scroll";

import CarListItem from "./CarListItem";

export default {
  name: "CarList",
  props: {
    carList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll,
    CarListItem
  },

  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.car-list {
  height: calc(100vh - 44px - 49px - 40px);
}

.content {
  height: calc(100vh - 135px);
  overflow: hidden;
}
</style>

