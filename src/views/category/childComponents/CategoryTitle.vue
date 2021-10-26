<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
      v-for="(item,index) in categories"
      :class="{isActive: index === currentIndex}"
      :key="index"
      @click="itemClick(index)"
      >
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import {getCategoryTitle} from "network/category";

export default {
  name: "CategoryTitle",
  components:{
    getCategoryTitle,
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },

  methods: {
    itemClick(index) {
      // console.log(index);
      this.currentIndex = index;
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>
#tab-menu {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f6f6f6;
  height: 104%;
  width: 100px;
  box-sizing: border-box;
  overflow: hidden;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.isActive{
  background-color: white;
}
</style>
