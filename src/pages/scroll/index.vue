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
      <view class="item" v-for="item in data" :key="item" :style="{ background: item }"></view>
      <view class="load-more">
        <text class="load-more-text">加载更多</text>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data() {
    return {
      data: ['#f00', '#0f0'],
      lastOffsetX: 0,
      offsetX: 0,
      dx: 0,
      dt: 0,
      isLoading: false,
      scrollWidth: 0,
      listWidth: 0,
      loadWidth: 0,
    };
  },
  mounted() {
    this.initBounds(['.scroll-wrap', '.item', '.load-more']).then(res => {
      console.log('initBounds', res);
      const [{ width }, { left }, { left: l, right: r }] = res;
      console.log(width);
      this.scrollWidth = width * 2;
      this.listWidth = (r - left) * 2;
      this.loadWidth = (r - l) * 2;
    });
  },
  methods: {
    initBounds(selectArr) {
      const selector = uni.createSelectorQuery().in(this);
      const arr = selectArr.map(item => {
        return new Promise(resolve => {
          selector
            .select(item)
            .boundingClientRect(res => resolve(res))
            .exec();
        });
      });
      return Promise.all(arr);
    },
    touchStart(e) {
      const { clientX } = e.changedTouches && e.changedTouches[0];
      console.log('start', clientX);
      this.lastOffsetX = this.offsetX;
      this.dx = clientX;
      this.dt = Date.now();
    },
    touchMove(e) {
      const { clientX } = e.changedTouches && e.changedTouches[0];
      const offsetX = clientX - this.dx + this.lastOffsetX;
      this.offsetX = Math.max(Math.min(offsetX, 0), -(this.listWidth - this.scrollWidth - this.loadWidth));
      console.log('move', this.offsetX);
    },
    touchEnd(e) {
      const { clientX } = e.changedTouches && e.changedTouches[0];
      console.log('end', clientX, e);
      // this.offsetX = 0;
      // this.isLoading = false;
    },
  },
});
</script>

<style scoped lang="scss">
.root {
  width: 100%;
  height: 100%;

  .scroll-wrap {
    white-space: nowrap;
    height: 400rpx;

    .item {
      display: inline-block;
      width: 750rpx;
      height: 100%;
      color: #fff;
    }
  }
}

.load-more {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100%;
  background-color: #0ff;
  vertical-align: top;

  .load-more-text {
    writing-mode: vertical-lr;
  }
}
</style>
