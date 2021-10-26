<template>
  <div class="profile">
    <nav-bar class="per-nav"><div slot="center">个人中心</div></nav-bar>
    <persion-login></persion-login>
    <div class="my-info">
      <div class="my-balance">
        <div class="num">
          <span>0.00</span>元
        </div>
        <div class="message">我的余额</div>
      </div>
      <div class="my-discount">
        <div class="num">
          <span>0</span>个
        </div>
        <div class="message">我的优惠</div>
      </div>
      <div class="my-integral">
        <div class="num">
          <span>0</span>分
        </div>
        <div class="message">我的积分</div>
      </div>
    </div>
    <div class="list-a">
      <div class="my-message">
        <i class="iconfont icon-xinxi"></i>
        <span>我的消息</span>
      </div>
      <div class="integral-mall">
        <i class="iconfont icon-jifen"></i>
        <span>积分商城</span>
      </div>
      <div class="member-card">
        <i class="iconfont icon-huiyuanka"></i>
        <span>会员卡</span>
      </div>
    </div>
    <div class="list-b">
      <div class="my-shop-car">
        <i class="iconfont icon-qicheqianlian-"></i>
        <span>我的购物车</span>
      </div>
      <div class="download-app">
        <i class="iconfont icon-shaogouwu"></i>
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>

<script>
  // 引用公共组件
  import NavBar from "components/common/navbar/NavBar";

  // 引用子组件
  import PersionLogin from "./childComponents/PersionLogin";
  export default {
    name: "Profile",
    components:{
      NavBar,
      PersionLogin
    }
  }
</script>

<style scoped>
  .per-nav {
  background-color: var(--color-tint);
  color: #fff;
  border-bottom: 1px solid white;
  }

  .my-info{
    display: flex;
    height: 100px;
    border-bottom: 15px solid #f2f2f2;
  }
  .my-balance{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
  }
  .my-discount{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
  }
  .my-integral{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
  }
  .num{
    padding-bottom: 5px;
  }
  .num span{
    font-size: 25px;
    color: var(--color-tint);
  }
  .message{
    font-size: 13px;
  }

  .list-a div,.list-b div{
    height: 45px;
    border-bottom: 2px solid #f2f2f2;
  }
  .list-a{
    border-bottom: 15px solid #f2f2f2;
  }

  .my-message,.integral-mall,.member-card,.my-shop-car,.download-app{
    line-height: 45px;
  }
  .icon-xinxi,.icon-jifen,.icon-huiyuanka,.icon-qicheqianlian-,.icon-shaogouwu{
    color: var(--color-tint);
    margin: 15px;
    font-size: 20px;
  }
</style>
