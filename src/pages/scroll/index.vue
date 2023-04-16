<template>
  <view class="root">
    <scroll-view class="scroll-wrap" scroll-x>
      <view class="item" v-for="item in data" :key="item" :style="{ background: item }"></view>
    </scroll-view>

    <view
      class="scroll-wrap"
      :style="{
        transform: `translateX(${offsetX}rpx)`,
      }"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <view class="item" v-for="item in data" :key="item" :style="{ background: item }">{{ item }}</view>
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
      offsetX: 0,
      dx: 0,
      speedX: 0,
      speedY: 0,
      positions: [],
      timerId: 0,
      isLoading: false,
      scrollWidth: 0,
      listWidth: 0,
      loadWidth: 0,
      scrollMode: 1, // 1 触摸， 2 惯性
      maxDist: 0,
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
      this.maxDist = this.listWidth - this.scrollWidth - this.loadWidth;
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
      const x = e.changedTouches[0].clientX;
      console.log('start', x);
      this.dx = x;
      this.scrollMode = 1;
      // 表格惯性初始点
      this.positions = [];
      this.positions.push({
        x,
        time: new Date().valueOf(),
      });
    },
    touchMove(e) {
      const x = e.changedTouches[0].clientX;
      const offsetX = x - this.dx;
      this.offsetX = Math.max(Math.min(this.offsetX + offsetX, 0), -this.maxDist);
      this.dx = x;
      console.log('move', this.offsetX);
      // 表格惯性 - 拖拽路径记录
      this.positions.push({
        x,
        time: new Date().valueOf(),
      });
      if (this.positions.length > 40) {
        this.positions.shift();
      }
    },
    touchEnd(e) {
      const x = e.changedTouches[0].clientX;
      console.log('end', x);

      // 惯性计算
      this.positions.push({
        x,
        time: new Date().valueOf(),
      });
      const endPosition = this.positions[this.positions.length - 1];
      let startPosition;
      for (let i = this.positions.length - 1; i >= 0; i--) {
        if (endPosition.time - this.positions[i].time > 1000 || i === 0) {
          startPosition = this.positions[i];
          break;
        }
      }
      const timeDiff = (endPosition.time - startPosition.time) / 1000;
      this.speedX = (endPosition.x - startPosition.x) / timeDiff;
      this.speedY = (endPosition.y - startPosition.y) / timeDiff;
      clearInterval(this.timerId);
      const computeScroll = () => {
        const resistance = 0.5; // 惯性衰减速度
        this.speedX *= resistance;

        this.offsetX += this.speedX
        if (Math.abs(this.speedX) < 1) this.speedX = 0;
        if (this.speedX === 0) clearInterval(this.timerId);
      };
      computeScroll();
      this.timerId = setInterval(computeScroll, 30);
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
    margin-bottom: 20rpx;

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
