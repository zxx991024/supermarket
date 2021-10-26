<template>
<div id="category">
  <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
  <div class="content">
    <category-title :categories="categories" @selectItem="selectItem"/>
    <scroll class="sortWrap">
      <div>
        <category-goods :goodsInfo="goodsInfo" />
      </div>
    </scroll>
  </div>
</div>
</template>

<script>
// 引用公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabcontrol/TabControl";
// 引用子组件
import CategoryTitle from "./childComponents/CategoryTitle";
import CategoryGoods from "./childComponents/CategoryGoods";

// 引用网络请求方法
import { getCategory, getSubcategory } from 'network/category'

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabControl,
    CategoryTitle,
    CategoryGoods,
  },
  data() {
    return {
      categories: [],
      goodsInfo: {}
    }
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },



  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list

        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.goodsInfo = res.data;
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    },
  }

}
</script>

<style scoped>
#category {
  height: 100vh;
  padding: 0;
  margin: 0;
}
.category-nav{
  background-color: var(--color-tint);
  color: white;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 70px;
  display: flex;
}
.sortWrap{
  position: absolute;
  right: 0;
  left: 100px;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
.title-nav {
  height: 42px;
  margin-top: 20px;
  background-color: #f6f6f6;
 }
</style>


