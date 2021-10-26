<template>
  <div id="cart">
<!--    购物车顶部模块-->
    <nav-bar  class="shop-car">
      <div slot="center">购物车({{shopCarLength}})</div>
    </nav-bar>
<!--    列表展示模块-->
      <car-list :carList="carList"/>
<!--    底部全选购物车以及计算总金额-->
      <car-bottom-bar/>
  </div>
</template>

<script>

// 引用公共组件
import NavBar from "components/common/navbar/NavBar";


// 引用子组件
import CarList from "./childComponents/CarList";
import CarBottomBar from "./childComponents/CarBottomBar";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CarList,
      CarBottomBar
    },
    computed: {
      shopCarLength() {
        return this.$store.state.carList.length
      },
      carList() {
        return this.$store.state.carList
      }
    }
  }
</script>

<style scoped>
  cart {
   height: 100vh;
  }

  .shop-car {
    background-color: var(--color-tint);
    color: #eeeeee;
  }

</style>
