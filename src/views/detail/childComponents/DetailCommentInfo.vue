<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
<!--    头部信息展示-->
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
<!--    用户头像名称内容展示-->
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
<!--    评论内容展示-->
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img v-for="(item,index) in commentInfo.images" src="item" alt="" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000);
      return formatDate(date,"yyyy-MM-dd");
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid rgba(0,0,0,.1);
  }

  .header-title {
    font-size: 15px;
    float: left;
  }

  .header-more {
    float: right;
    font-size: 13px;
    margin-right: 10px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .info-user span {
    font-size: 15px;
    position: relative;
    top: -15px;
    margin-left: 20px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
