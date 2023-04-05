<template>
  <view class="container">
    <view class="header">
      <view class="status-bar"></view>
      <view class="title-bar">
        <text class="info">标题栏</text>
        <input class="search" placeholder="输入框" />
      </view>
    </view>
    <view class="content">
      <text>{{ statusBarHeight }}px</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: "",
    };
  },
  created() {
    console.log("----------create");
    uni.getSystemInfo({
      success: (e) => {
        console.log(e);
        let statusBar = 0; // 状态栏高度
        let customBar = 0; // 状态栏高度 + 导航栏高度
        let navbar = 0; // 自定义标题与胶囊对齐高度

        // #ifdef MP
        statusBar = e.statusBarHeight;
        customBar = e.statusBarHeight + 45;
        if (e.platform === "android") {
          this.$store.commit("SET_SYSTEM_IOSANDROID", false);
          customBar = e.statusBarHeight + 50;
        }
        // #endif

        // #ifdef MP-WEIXIN
        statusBar = e.statusBarHeight;
        const custom = wx.getMenuButtonBoundingClientRect();
        customBar = custom.bottom + custom.top - e.statusBarHeight;

        navbar = (custom.top - e.statusBarHeight) * 2 + custom.height;
        // #endif

        // #ifdef MP-ALIPAY
        statusBar = e.statusBarHeight;
        customBar = e.statusBarHeight + e.titleBarHeight;
        // #endif

        // #ifdef APP-PLUS
        console.log("app-plus", e);
        statusBar = e.statusBarHeight;
        customBar = e.statusBarHeight + 45;
        // #endif

        // #ifdef H5
        statusBar = 0;
        customBar = e.statusBarHeight + 45;
        // #endif

        console.log(statusBar, customBar, navbar);
      },
    });
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background: skyblue;
	min-height: 100vh;

  .header {
    background-image: linear-gradient(to right, #fff0f0, #66ff00);
    width: 750px;
    height: 60px;
    position: fixed;
    top: 0;

    .status-bar {
      height: var(--status-bar-height);
    }

    .title-bar {
      background-color: #ff0;

      .info {
        height: 44rpx;
        justify-content: center;
        align-items: center;
      }

      .search {
      }
    }
  }

  .content {
  }
}
.container ::v-deep .common-header .u-icon__icon {
  color: white !important;
}
.container ::v-deep .common-header .u-title {
  color: white !important;
}
.container ::v-deep .u-navbar {
  background: none !important;
}
.container ::v-deep .u-navbar::after {
  border-bottom: none;
}
</style>
