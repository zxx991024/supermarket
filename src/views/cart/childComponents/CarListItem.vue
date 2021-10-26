<template>
  <div class="car-list-item">
    <!--    购物车前的按钮-->
      <div class="item-check">
        <check-button :is-checked="itemInfo.checked" @click.native="changeChecked"/>
      </div>
    <!--    购物车中的图片-->
    <div class="item-img ">
      <img :src="itemInfo.image" alt="" >
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{itemInfo.price}}</div>
        <div class="item-count">x{{itemInfo.count}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import CheckButton from "components/common/checkButtton/CheckButton";
export default {
  name: "CarListItem",
  props: {
    itemInfo: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    changeChecked() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
}
</script>

<style scoped>
.car-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-title {
  font-size: 20px;
}

.item-check {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: #42b983;*/
}
.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
}
.item-price {
  flex: 1;
  color: var(--color-high-text);
}
</style>
