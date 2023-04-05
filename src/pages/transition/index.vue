<template>
  <view class="animate">
    <view class="list">
      <view
        v-for="(item, index) in list"
        :key="item.name"
        :class="['item', animCls[Math.min(targetIndex(index), 3)]]"
        :style="'background:' + item.bg"
        @click="handleItem(index)"
        >{{ item.name }}</view
      >
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
      list: [
        { name: "item1", bg: "red" },
        { name: "item2", bg: "orange" },
        { name: "item3", bg: "yellow" },
        { name: "item4", bg: "green" },
        { name: "item5", bg: "skyblue" },
        { name: "item6", bg: "blue" },
        { name: "item7", bg: "purple" },
        { name: "item8", bg: "pink" },
      ],
      animCls: ["item0", "item1", "item2", "item3"],
      curIndex: 0,
    };
  },
  onLoad(options) {
    console.log(this);
  },
  methods: {
    targetIndex(index) {
      const size = this.list.length;
      return (index - this.curIndex + size) % size;
    },
    handleItem(index) {
      console.log("click", index);
    },
    handlePrev() {
      let index = this.curIndex - 1;
      if (index < 0) index = this.list.length - 1;
      this.curIndex = index;
    },
    handleNext() {
      let index = this.curIndex + 1;
      if (index >= this.list.length) index = 0;
      this.curIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
page {
  background-color: #f2f2f2;
}
.animate {
  .ctrl {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;

    .btn {
      width: 40%;
      margin: 20rpx;
    }
  }

  .list {
    position: relative;
    .item {
      position: absolute;
      width: 694rpx;
      height: 288rpx;
      line-height: 288rpx;
      border-radius: 30rpx;
      margin: 40rpx 16rpx;
      text-align: center;
      box-shadow: 0 0 8rpx #aaa;
      perspective: 500rpx;
      transition: all 300ms ease;
    }
  }
}

.item0 {
  transform: translate3d(0, 0, 0);
  z-index: 3;
  opacity: 1;
}

.item1 {
  transform: translate3d(10rpx, -10rpx, -10rpx);
  z-index: 2;
  opacity: 1;
}

.item2 {
  transform: translate3d(20rpx, -20rpx, -20rpx);
  z-index: 1;
  opacity: 1;
}

.item3 {
  transform: translate3d(20rpx, -20rpx, -20rpx);
  z-index: 0;
  opacity: 0;
}
</style>
