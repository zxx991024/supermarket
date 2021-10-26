<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
<!--    商品标题-->
    <div class="info-title">{{goods.title}}</div>
<!--    商品新旧价格-->
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
<!--    商品销量、收藏、退换货-->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
<!--    7天无理由退货以及72小时发货承诺等-->
    <div class="info-services">
      <span v-for="index in goods.services.length-1" :key="index" class="info-services-item">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods:{
      type: Object,
      default() {
        return {}
      }
    },
  },
}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .new-price {
    color: var(--color-high-text);
    font-size: 24px;
  }

  .info-price .old-price {
    font-size: 13px;
    text-decoration-line: line-through;
    margin-left: 10px;
  }

  .info-price .discount {
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    font-size: 12px;
    margin-left: 10px;
    border-radius: 8px;
    /*使用定位让 discount 中内容上移*/
    position: relative;
    top: -10px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-services {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-services-item img {
    height: 14px;
    width: 14px;
    position: relative;
    top: 2px;
  }

  .info-services-item span {
    font-size: 13px;
    color: #333;
  }
</style>
