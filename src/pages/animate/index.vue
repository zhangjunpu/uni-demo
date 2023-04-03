<template>
  <view class="animate">
    <view class="list">
      <view ref="item1" :class="anims[0]" @click="handleItem(1)"></view>
      <view ref="item2" :class="anims[1]" @click="handleItem(2)"></view>
      <view ref="item3" :class="anims[2]" @click="handleItem(3)"></view>
      <view ref="item4" :class="anims[3]" @click="handleItem(4)"></view>
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
    return {
      items: null,
      curIndex: 0,
      anims: ["item item1", "item item2", "item item3", "item item4"],
    };
  },
  onLoad(options) {
    console.log("init onLoad", options);
    console.log(this);
  },
  methods: {
    handlePrev() {
      console.log("prev");
    },
    handleNext() {
      if (!this.items) this.items = [this.$refs.item1, this.$refs.item2, this.$refs.item3, this.$refs.item4];
      this.anims = this.items.map((item, i) => `item item${i + 1} anim${i + 1}`);
      console.log(this.anims);
    },
    handleItem(index) {
      console.log("click", index);
    },
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
      width: 694rpx;
      height: 288rpx;
      border-radius: 30rpx;
      margin: 40rpx 16rpx;
      animation-duration: 500ms;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      perspective: 500rpx;
      /* transition: all 1s linear; */
    }

    .item1 {
      background-color: #f00;
      transform: translate3d(0, 0, 0);
      z-index: 3;
    }
    .item2 {
      background-color: #0f0;
      transform: translate3d(10rpx, -10rpx, -10rpx);
      z-index: 2;
    }
    .item3 {
      background-color: #00f;
      transform: translate3d(20rpx, -20rpx, -20rpx);
      z-index: 1;
    }
    .item4 {
      background-color: #f0f;
      transform: translate3d(20rpx, -20rpx, -20rpx);
      z-index: 0;
      opacity: 0;
    }

    .anim1 {
      animation-name: anim1;
    }
    .anim2 {
      animation-name: anim2;
    }
    .anim3 {
      animation-name: anim3;
    }
    .anim4 {
      animation-name: anim4;
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

  @keyframes anim1 {
    from {
      transform: translate3d(0, 0, 0);
      z-index: 3;
      opacity: 1;
    }

    to {
      transform: translate3d(0, 288rpx, 0) rotate(-10deg);
      z-index: 1;
      opacity: 0;
    }
  }
  @keyframes anim2 {
    from {
      transform: translate3d(10rpx, -10rpx, -10rpx);
      z-index: 2;
    }

    to {
      transform: translate3d(0, 0, 0);
      z-index: 3;
    }
  }
  @keyframes anim3 {
    from {
      transform: translate3d(20rpx, -20rpx, -20rpx);
      z-index: 1;
    }

    to {
      transform: translate3d(10rpx, -10rpx, -10rpx);
      z-index: 2;
    }
  }
  @keyframes anim4 {
    from {
      z-index: 0;
      opacity: 0;
    }

    to {
      z-index: 1;
      opacity: 1;
    }
  }
}
</style>
