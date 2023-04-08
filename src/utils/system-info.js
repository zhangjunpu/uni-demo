/**
 * 管理关于当前设备的机型系统信息
 */
const systemInfo = function () {
  // 所有平台共有的系统信息
  const info = uni.getSystemInfoSync();
  const scaleFactor = 750 / info.windowWidth; // 机型适配比例系数
  const windowHeight = info.windowHeight * scaleFactor; // 当前机型-屏幕高度 rpx
  const windowWidth = info.windowWidth * scaleFactor; //当前机型-屏幕宽度 rpx
  const statusBarHeight = info.statusBarHeight * scaleFactor; // 状态栏高度 rpx

  let navHeight = 0; // 导航栏高度 rpx 注意：此导航栏高度只针对微信小程序有效 其他平台如自定义导航栏请使用：状态栏高度+自定义文本高度

  // 微信小程序头部胶囊信息
  // #ifdef MP-WEIXIN
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
  const menuButtonWidth = menuButtonInfo.width * scaleFactor; // 胶囊宽度 rpx
  const menuButtonHeight = menuButtonInfo.height * scaleFactor; // 胶囊高度 rpx
  const menuButtonTop = menuButtonInfo.top * scaleFactor; // 胶囊上边界的坐标 rpx
  const menuButtonRight = menuButtonInfo.right * scaleFactor; // 胶囊右边界的坐标 rpx
  const menuButtonBottom = menuButtonInfo.bottom * scaleFactor; // 胶囊下边界的坐标 rpx
  const menuButtonLeft = menuButtonInfo.left * scaleFactor; // 胶囊左边界的坐标 rpx

  // 微信小程序中导航栏高度 = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
  navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2;
  // #endif

  // #ifdef MP-WEIXIN
  return {
    scaleFactor,
    windowHeight,
    windowWidth,
    statusBarHeight,
    menuButtonHeight,
    menuButtonWidth,
    menuButtonTop,
    menuButtonRight,
    menuButtonBottom,
    menuButtonLeft,
    navHeight,
  };
  // #endif

  // #ifndef MP-WEIXIN
  return {
    scaleFactor,
    windowHeight,
    windowWidth,
    statusBarHeight,
  };
  // #endif
};

export { systemInfo };
