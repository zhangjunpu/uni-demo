<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="list">
      <button v-for="item in list" :key="item.name" @click="handleItem(item.url)">{{ item.name }}</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '沉浸式',
          url: '/pages/custom-navbar/index',
        },
        {
          name: '动画',
          url: '/pages/animate/index',
        },
        {
          name: '评分',
          url: '/pages/rating/index',
        },
        {
          name: '左拉',
          url: '/pages/left-load/index',
        },
        {
          name: 'scroll',
          url: '/pages/scroll/index',
        },
      ],
    };
  },
  methods: {
    handleItem(url) {
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
