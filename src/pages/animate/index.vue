<template>
  <view class="animate">
    <view class="list">
      <view ref="item1" class="item item1" @click="handleItem(1)"></view>
      <view ref="item2" class="item item2" @click="handleItem(2)"></view>
      <view ref="item3" class="item item3" @click="handleItem(3)"></view>
    </view>

    <view class="ctrl">
      <button type="primary" class="btn prev" @click="handlePrev">Prev</button>
      <button type="primary" class="btn next" @click="handleNext">Next</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad(options) {
    console.log("init onLoad", options)
    console.log(this)
  },
  methods: {
    handlePrev() {
      console.log("prev");
    },
    handleNext() {
      console.log("next");
    },
    handleItem(index) {
      console.log("click", index)
    }
  },
};
</script>

<style scoped lang="scss">
page {
  background-color: #f2f3f4;
}
.animate {
  color: #ff0;

  .list {
    position: relative;
    .item {
      position: absolute;
      width: 670rpx;
      height: 400rpx;
      margin: 40rpx;
      border-radius: 20rpx;
      animation-duration: 500ms;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }

    .item1 {
      background-color: #f00;
      transform: perspective(500rpx) translate3d(40rpx, -40rpx, -40rpx);
      z-index: 1;
      /* animation-name: anim3; */
    }
    .item2 {
      background-color: #0f0;
      transform: perspective(500rpx) translate3d(20rpx, -20rpx, -20rpx);
      z-index: 2;
      /* animation-name: anim2; */
    }
    .item3 {
      background-color: #00f;
      transform: perspective(500rpx) translate3d(0, 0, 0);
      z-index: 3;
      /* animation-name: anim1; */
    }
  }

  .ctrl {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    .btn {
      margin: 20rpx;
    }
  }

  @keyframes anim3 {
    from {
      transform: perspective(500rpx) translate3d(40rpx, -40rpx, -40rpx);
      z-index: 1;
    }

    to {
      transform: perspective(500rpx) translate3d(20rpx, -20rpx, -20rpx);
      z-index: 2;
    }
  }
  @keyframes anim2 {
    from {
      transform: perspective(500rpx) translate3d(20rpx, -20rpx, -20rpx);
      z-index: 2;
    }

    to {
      transform: perspective(500rpx) translate3d(0, 0, 0);
      z-index: 3;
    }
  }
  @keyframes anim1 {
    from {
      transform: perspective(500rpx) translate3d(0, 0, 0);
      z-index: 3;
      opacity: 1;
    }

    to {
      transform: perspective(500rpx) translate3d(0, 400rpx, 0) rotate(-10deg);
      z-index: 1;
      opacity: 0;
    }
  }
}
</style>
