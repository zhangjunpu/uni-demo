<template>
  <view class="root">
    <view
      class="scroll-wrap"
      :style="{
        transform: `translateX(${offsetX}rpx)`,
      }"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <scroll-view class="scroll" scroll-x :enhanced="true" :bounces="false">
        <view class="scroll-content">
          <view class="item item0">A</view>
          <view class="item item1">B</view>
        </view>
      </scroll-view>
      <view class="load-more">
        <text class="load-more-text">加载更多</text>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';
// import inobounce from '@/utils/inobounce.js'
export default Vue.extend({
  data() {
    return {
      offsetX: 0,
      dx: 0,
      isLoading: false,
    };
  },
  mounted() {
    // require('../../utils/inobounce.js')
    // console.log(document.body);
    // document.body.style['overflow-x'] = 'hidden';
    // console.log(document.documentElement)
  },
  mounted() {},
  created() {
    // inobounce.enable();
  },
  beforeDestroy() {
    // inobounce.disable();
  },
  methods: {
    scroll(e) {
      console.log('scroll', e);
    },
    touchStart(e) {
      const x = e.changedTouches[0].clientX;
      this.dx = x;
    },
    touchMove(e) {
      const slop = -100;
      const x = e.changedTouches[0].clientX;
      const offsetX = x - this.dx;
      this.offsetX = Math.max(Math.min(this.offsetX + offsetX, 0), slop);
      this.dx = x;
      if (this.offsetX === slop && !this.isLoading) {
        console.log('load more');
        this.isLoading = true;
      }
    },
    touchEnd() {
      this.offsetX = 0;
      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
}

.scroll-wrap {
  white-space: nowrap;
  height: 300rpx;
  transition: transform 100ms;

  .scroll {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    height: 100%;
  }
}

.scroll-content {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  /* overflow-x: scroll; */
  /* -webkit-overflow-scrolling: touch; */

  .item {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 300rpx;
    vertical-align: top;
  }
  .item0 {
    background-color: #f00;
  }
  .item1 {
    background-color: #0f0;
  }
}

.load-more {
  vertical-align: top;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100%;
  background-color: #0ff;

  .load-more-text {
    writing-mode: vertical-lr;
  }
}
</style>
