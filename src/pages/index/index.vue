<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="list">
      <button @click="handleClick">沉浸式</button>
      <button @click="handleAnim">动画</button>
      <button @click="handleTransition">形变</button>
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
    handleClick() {
      uni.navigateTo({ url: "/pages/custom-navbar/index" });
    },
    handleAnim() {
      uni.navigateTo({ url: "/pages/animate/index" });
    },
    handleTransition() {
      uni.navigateTo({ url: "/pages/transition/index" });
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
