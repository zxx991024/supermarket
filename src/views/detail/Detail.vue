<template>
  <div id="detail">
      <!--    头部导航栏组件-->
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detail-nav" />
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
          <!--    详情页轮播图展示组件-->
          <detail-swiper :top-images="topImages"/>
          <!--    商品详细信息展示组件-->
          <detail-base-info :goods="goods"/>
          <!--    商家店铺信息展示组件-->
          <detail-shop-info :shop="shop"></detail-shop-info>
<!--          模特图片展示-->
          <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
<!--          尺码信息展示-->
          <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
<!--          用户评论信息展示-->
          <detail-comment-info :comment-info="commentInfo"  ref="comment"></detail-comment-info>
<!--          详情页推荐商品展示-->
          <h2 class="recommend-introduction">相关商品</h2>
          <goods-list :goods="recommends" class="recommend" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCar="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--        <toast :message="message" :is-show="isShow"/>-->
  </div>
</template>

<script>
// detail子组件
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

// 公共组件
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/common/backtop/BackTop";
// import Toast from "components/common/toast/Toast";

// 网络请求方面方法
import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";

// 公共方法
import {debounce} from "common/utils"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message: "",
      // isShow: false
    }
  },

  methods: {
    detailImageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 84)
      // // this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    },

    titleClick(index) {
      // 点击后在500ms后返回 -this.themeTopYs[index] 位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },

    // 滚动到相应的区域，顶部 navbar 随之切换
    contentScroll(position) {
      // 判断backtop是否起作用，能够实现点击返回顶部
      this.isShowBackTop = (-position.y) > 1000;

      // 存储滚动的竖向y坐标
      let positionY = -position.y
      for(let i=0; i<this.themeTopYs.length - 1; i++) {
        if(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
          // console.log(i);
          this.currentIndex = i;
          this.$refs["detail-nav"].currentIndex = this.currentIndex
        }
      }
    },

    backClick() {
      // console.log('111');
      this.$refs.scroll.scrollTo(0,0);
    },

    addToCart() {
      // console.log("------");
      const product = {};
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 此处 product 与 vuex 中参数 payload 相对应
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 2000)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   // console.log(res);
      //   this.message = res;
      //   this.isShow = true;
      //   setTimeout(()=>{
      //     this.isShow = false;
      //   },1000)
      // });
    }
  },

    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取轮播图图片
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取商家店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据(商品模特图片展示)
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息(尺码信息展示)
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        //
        setTimeout(() => {
          this.$nextTick(() => {
            this.getThemeTopY();
          })
        },1000)
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        // 获取推荐商品数据
        this.recommends = res.data.list;
      })

      // 4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        // console.log(111);
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 40)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      },500)
    },
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }

  .recommend-introduction {
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: var(--color-high-text);
  }
  /*.recommend {*/
  /*  margin-top: 20px;*/
  /*}*/
</style>
