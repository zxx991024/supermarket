<template>
<div class="check-button" :class="{'check-active': isChecked}">
  <img src="~/assets/img/cart/tick.svg" alt="">
</div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type:Boolean,
      default: false
    }
  }

}
</script>

<style scoped>
.check-button {
  position: relative;
  margin: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}
.check-button img {
  height: 22px;
  width: 22px;
  border-radius: 50%;
}
.check-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
