<template>
<div class="car-bottom-bar">
  <div class="check-content">
    <check-button class="check-button" :is-checked="isSelectAll" @click.native="allCheck"/>
    <span>全选</span>
  </div>
  <div class="total-price">合计：{{totalPrice}}</div>
  <div class="calculate" @click="isCalculate">去结算({{carCount}})</div>
</div>
</template>

<script>
import CheckButton from "components/common/checkButtton/CheckButton";

export default {
  name: "CarBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return "￥" + this.$store.state.carList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      },0).toFixed(2);
    },
    carCount() {
      return this.$store.state.carList.filter(a => a.checked).length
    },
    isSelectAll() {
      // 1.filter判断购物车数组中是否含有未被选中的商品，若有则返回未被选中商品的数量，再取反作为函数返回值返回
      // return !(this.$store.state.carList.filter(item => !item.checked).length)

      // 2.find用于寻找购物车数组中是否含有未被选中的商品，若有则返回true，再取反作为函数返回值返回
      if(this.$store.state.carList.length === 0) return false
      return !(this.$store.state.carList.find(item => !item.checked))
    }
  },
  methods: {
    allCheck() {
      let isSelectAll = this.$store.state.carList.find(item => !item.checked);
      if(isSelectAll){
        this.$store.state.carList.forEach(item => {
          item.checked = true;
        });
      }else {
        this.$store.state.carList.forEach(item => {
          item.checked = false;
        });
      }
    },
    isCalculate() {
      if(!this.$store.state.carList.length){
        this.$toast.show("请选择要购买的商品",2000);
      }else {
        alert(11)
      }
    }
  }
}
</script>

<style scoped>
  .car-bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }
  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-left: 5px;

  }
  .check-content span {
    margin-left: 5px;
  }
  .total-price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    background-color: #5ea732;
    color: #fff;
    width: 100px;
    text-align: center;
  }
</style>
