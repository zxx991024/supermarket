<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
<!--      轮播图组件-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
<!--      精品推荐组件-->
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  // 引用子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  // 引用公共组件
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/common/backtop/BackTop";
  // 引用方法，额外的一些数据
  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentType: "pop",
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        // 用来存储页面切换的历史记录，保证下一次切换回来后还在原先的位置
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    // 返回时将之前保存的savaY的值，传给页面，以便能够达到历史位置
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      // this.$refs.scroll.refresh()
    },
    // 离开时获取滚动位置的值，并保存在saveY中
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    // 组件创建之后执行
    created() {
      // 1.请求 轮播图以及 featureView 展示的图片
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    // mounted() {
    //   1.图片加载完成的事件监听
    //   const refresh = this.debounce(this.$refs.scroll.refresh, 50)
    //   this.$bus.$on('itemImageLoad', () => {
    //     this.refresh()
    //   })
    // },

    methods: {
      // 事件监听方面的函数方法
      tabClick(index) {
        // 判断点击的是哪个分类，从而展示不同的图片数据
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // console.log(this.$refs.tabControl1)
        // 使用 this.$refs.tabControl1.currentIndex 获取用户点击后现在所停留的块级作用域现在的索引值
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },


      contentScroll(position) {
        // this.$emit("contentScroll",position)
        // 用于判断backTop是否显示
        // (-position.y) 是用来判断在y轴上滚动的平移量
        this.isShowBackTop = (-position.y) > 1000;
        // 用于判断tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      // 返回顶部按钮效果
      backClick() {
        // console.log('111');
        this.$refs.scroll.scrollTo(0,0);
      },
      // contentScroll(position) {
      //   // 1.判断BackTop是否显示
      //   this.isShowBackTop = (-position.y) > 1000
      //
      //   // 2.决定tabControl是否吸顶(position: fixed)
      //   this.isTabFixed = (-position.y) > this.tabOffsetTop
      // },
      // loadMore() {
      //   this.getHomeGoods(this.currentType)
      // },
      swiperImageLoad() {
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        // 用于获取tabControl距离顶部的距离
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      // 网络请求方面的函数方法
      getHomeMultidata() {
        // 获取图片数据
        getHomeMultidata().then(res => {
          // this.result = res;
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        // 为实现上拉加载更多，获取更多的图片，将后面的数据push到最先展示的图片里
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          // 不调用此方法，pullingUp只会作用一次，也就是只会比之前多加载一页图片
          this.$refs.scroll.finishPullUp()
        })
      },
    },
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .content {
    overflow: hidden;
    /*height: 200px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>

