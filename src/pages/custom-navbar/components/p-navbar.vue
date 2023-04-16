<template>
  <view>
    <view class="p-nav" :style="{ height: `${navHeight}rpx` }">
      <view
        class="nav-search"
        :style="{
          height: `${navbarHeight}rpx`,
          top: `${statusBarHeight}rpx`,
          right: `${windowWidth - menubarLeft}rpx`,
        }">
        <image class="logo" src="../../../static/logo.png" mode="aspectFit" />
        <view class="search" @click="clickSearch">
          <image class="search-logo" src="../../../static/home/ic_home_search.png" mode="scaleToFill" />
          <text class="search-placeholder">搜索功能、内容</text>
        </view>
      </view>

      <view
        class="menubar"
        :style="{
          left: `${menubarLeft}rpx`,
          top: `${menubarTop}rpx`,
          right: `${windowWidth - menubarRight}rpx`,
          bottom: `${navHeight - menubarBottom}rpx`,
        }">
      </view>
    </view>
  </view>
</template>

<script>
import { systemInfo } from '@/utils/system-info.js';
export default {
  name: 'HeadView',
  props: {
    // 文本区内容
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      windowWidth: 0, // 当前设备的屏幕宽度
      navHeight: 0, // 头部导航栏总体高度
      statusBarHeight: 0, // 状态栏高度
      navbarHeight: 0, // 导航栏高度
      menubarWidth: 0,
      menubarHeight: 0, // 胶囊高度
      menubarLeft: 0, // 胶囊定位的左边left
      menubarTop: 0,
      menubarRight: 0,
      menubarBottom: 0,
    };
  },
  methods: {
    clickSearch() {
      this.$emit('clickSearch');
    },
  },
  created() {
    const sysInfo = uni.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    console.log(sysInfo);
    console.log(menuButtonInfo);
    /* 获取设备信息 */
    const info = systemInfo();
    /* 通用平台 */
    this.windowWidth = info.windowWidth; // 当前设备的屏幕宽度
    this.statusBarHeight = info.statusBarHeight; // 状态栏高度
    /* 微信小程序平台 */
    // #ifdef MP-WEIXIN
    this.navHeight = info.navHeight + info.statusBarHeight; // 头部导航栏总高度
    this.navbarHeight = info.navHeight; // 头部导航栏高度
    this.menubarHeight = info.menuButtonHeight; // 胶囊高度
    this.menubarLeft = info.menuButtonLeft; // 胶囊左边界距离左上角的距离
    this.menubarTop = info.menuButtonTop;
    this.menubarRight = info.menuButtonRight;
    this.menubarBottom = info.menuButtonBottom;
    // #endif
  },
};
</script>

<style scoped lang="scss">
.p-nav {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(-35deg, #613a19 0%, #6f4e2b 100%);

  .menubar {
    position: absolute;
    background-color: rgba(0, 255, 255, 0.3);
  }

  .nav-search {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 20rpx 0 33rpx;
    background-color: #777;

    .logo {
      width: 50rpx;
      height: 50rpx;
      margin-right: 20rpx;
    }

    .search {
      width: 367rpx;
      flex: 1;
      height: 58rpx;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 30rpx;
      display: flex;
      align-items: center;

      .search-logo {
        width: 40rpx;
        height: 40rpx;
        margin: 0 15rpx 0 20rpx;
      }

      .search-placeholder {
        line-height: 28rpx;
        font-size: 28rpx;
        color: #97aac5;
      }
    }
  }
}
</style>
