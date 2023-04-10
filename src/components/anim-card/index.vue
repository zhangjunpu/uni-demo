<template>
  <view class="anim-card">
    <view
      v-for="(item, index) in list"
      :key="item.name"
      :class="['item', targetItemCls(index), targetAnimCls(index)]"
      :style="{ background: item.bg }"
      @click="handleItem(index)"
      @touchstart="touchStart"
      @touchend="touchEnd">
      {{ item.name }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'anim-card',
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          { name: 'item1', bg: 'red' },
          { name: 'item2', bg: 'orange' },
          { name: 'item3', bg: 'yellow' },
          { name: 'item4', bg: 'green' },
          { name: 'item5', bg: 'skyblue' },
          { name: 'item6', bg: 'blue' },
          { name: 'item7', bg: 'purple' },
          { name: 'item8', bg: 'pink' },
        ];
      },
    },
    touchSlop: 20,
    prevDisable: false,
  },
  data() {
    return {
      animCls: ['item0', 'item1', 'item2', 'item3'],
      curIndex: 0,
      direction: 0, // 0 none，1 正向，2 反向
    };
  },
  methods: {
    targetItemCls(index) {
      const i = Math.min(this.targetIndex(index), 3);
      return this.animCls[i];
    },
    targetAnimCls(index) {
      const size = this.list.length;
      const i = this.targetIndex(index);
      if (this.direction === 1 && i === size - 1) {
        return 'anim-forward';
      } else if (this.direction === 2 && i === 0) {
        return 'anim-backward';
      }
      return '';
    },
    targetIndex(index) {
      const size = this.list.length;
      return (index - this.curIndex + size) % size;
    },
    handleItem(index) {
      console.log('click', index);
    },
    handlePrev() {
      if (this.prevDisable) {
        this.handleNext();
      } else {
        this.direction = 2;
        let index = this.curIndex - 1;
        if (index < 0) index = this.list.length - 1;
        this.curIndex = index;
      }
    },
    handleNext() {
      this.direction = 1;
      let index = this.curIndex + 1;
      if (index >= this.list.length) index = 0;
      this.curIndex = index;
    },
    touchStart(e) {
      const { clientX, clientY } = e.changedTouches && e.changedTouches[0];
      this.downX = clientX;
      this.downY = clientY;
    },
    touchEnd(e) {
      const { clientX, clientY } = e.changedTouches && e.changedTouches[0];
      const offsetX = clientX - this.downX;
      const offsetY = clientY - this.downY;
      let res = Math.abs(offsetX) > Math.abs(offsetY) ? offsetX : offsetY;
      if (Math.abs(res) <= 20) return;
      res >= 0 ? this.handleNext() : this.handlePrev();
    },
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style scoped lang="scss">
.anim-card {
  width: 100%;
  height: 348rpx;
  position: relative;

  .item {
    position: absolute;
    width: 694rpx;
    height: 288rpx;
    line-height: 288rpx;
    border-radius: 30rpx;
    margin: 40rpx 0 20rpx;
    text-align: center;
    box-shadow: 0 0 8rpx #bbb;
    perspective: 500rpx;
    transition: all 300ms ease;
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

.anim-forward {
  transition: none;
  animation: anim-forward 300ms linear 1 none;
}

.anim-backward {
  transition: none 300ms ease 300ms;
  animation: anim-backward 300ms linear 1 none;
}

@keyframes anim-forward {
  from {
    transform: translate3d(0, 0, 0);
    z-index: 4;
    opacity: 1;
  }

  70% {
    transform: translate3d(0, 200rpx, 0) rotate(-10deg);
    z-index: 4;
    opacity: 1;
  }

  to {
    transform: translate3d(20rpx, -20rpx, -20rpx);
    z-index: 0;
    opacity: 0;
  }
}

@keyframes anim-backward {
  from {
    transform: translate3d(20rpx, -20rpx, -20rpx);
    z-index: 0;
    opacity: 0;
  }

  50% {
    transform: translate3d(0, 100rpx, 0);
    z-index: 0;
    opacity: 1;
  }

  51% {
    transform: translate3d(0, 100rpx, 0);
    z-index: 3;
    opacity: 1;
  }

  to {
    transform: translate3d(0, 0, 0);
    z-index: 3;
    opacity: 1;
  }
}
</style>
