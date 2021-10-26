<template>
<div class="login">
  <!--    用户头像-->
  <div class="per-img">
    <slot class="per-img">
      <i class="iconfont icon-geren"></i>
    </slot>
  </div>
  <div class="login-info">
    <div class="login-name"><slot class="login-name">登录/注册</slot></div>
    <div class="login-phone">
      <i class="iconfont icon-shouji"></i>
      <slot class="phone">暂无绑定手机号</slot>
    </div>
  </div>
  <div class="login-next">
    <slot class="next">
      <i class="iconfont icon-xiayibu"></i>
    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: "PersionLogin"
}
</script>

<style scoped>
  .login{
    background-color: var(--color-tint);
    display: flex;
    height: 80px;
    color: white;
  }
  .per-img{
    display: flex;
    flex: 3;
    justify-content: center;
    align-items: center;
  }
  .icon-geren{
    font-size: 45px;
  }
  .login-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 8;
  }
  .login-name{
    font-size: 20px;
    padding-bottom: 5px;
  }
  .login-phone{
    font-size: 15px;
  }
  .login-next{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .icon-xiayibu{
    font-size: 35px;
  }
</style>
