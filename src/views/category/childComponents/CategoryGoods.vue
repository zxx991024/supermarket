<template>

    <div class="goods">
      <div class="goods-item" v-for="(item,index) in goodsInfo.list" :key="index">
        <a :href="item.link">
          <div><img :src="item.image" alt="" class="item-img"></div>
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </div>

</template>

<script>
// import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryGoods",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    // Scroll,
  },
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
}
.goods-item{
  width: 33.33%;
}

.item-img{
  width: 100%;padding:15px;
  box-sizing: border-box;
}
.item-text{
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  text-align: center;
}
.right{
  position: absolute;
  top: 0;
  left: 100px;
  background-color: #f6f6f6;
  height: 104%;
  width: 100px;
  overflow: hidden;
}
</style>
