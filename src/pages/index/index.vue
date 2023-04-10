<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="list">
      <button @click="handleItem(0)">沉浸式</button>
      <button @click="handleItem(1)">动画</button>
      <button @click="handleItem(2)">形变</button>
      <button @click="handleItem(3)">评分</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    handleItem(index) {
      let url;
      if (index === 0) {
        url = '/pages/custom-navbar/index';
      } else if (index === 1) {
        url = '/pages/animate/index';
      } else if (index === 2) {
        url = '/pages/transition/index';
      } else if (index === 3) {
        url = '/pages/rating/index';
      }
      uni.navigateTo({ url });
    },
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .list {
    width: 50%;
    display: flex;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: 40rpx;
    padding: 20rpx 0;

    button {
      width: 80%;
      margin: 10rpx auto;
    }
  }
}
</style>
