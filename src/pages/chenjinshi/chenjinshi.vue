<template>
	<view class="page-searchList">
		<view class="header">
			<view class="statusBar"></view><!-- 状态栏占位 -->
			<view class="title-bar">
				<text class="info">标题栏</text>
				<input class="uni-input" placeholder="输入框" />
			</view>
		</view>
		<view class="content">
			<text>{{statusBarHeight}}px</text> <!-- 打印状态栏高度 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: ''
			}
		},
		created() {
			console.log("----------create")
			uni.getSystemInfo({
				success: (e) => {
					console.log(e);
					let statusBar = 0 // 状态栏高度
					let customBar = 0 // 状态栏高度 + 导航栏高度  
					let navbar = 0 // 自定义标题与胶囊对齐高度

					// #ifdef MP
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45
					if (e.platform === 'android') {
						this.$store.commit('SET_SYSTEM_IOSANDROID', false)
						customBar = e.statusBarHeight + 50
					}
					// #endif


					// #ifdef MP-WEIXIN
					statusBar = e.statusBarHeight
					const custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight

					navbar = (custom.top - e.statusBarHeight) * 2 + custom.height
					// #endif


					// #ifdef MP-ALIPAY
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + e.titleBarHeight
					// #endif


					// #ifdef APP-PLUS
					console.log('app-plus', e)
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45
					// #endif


					// #ifdef H5
					statusBar = 0
					customBar = e.statusBarHeight + 45
					// #endif
					
					console.log(statusBar, customBar, navbar);
				}
			});
		}
	};
</script>

<style scoped>
	.statusBar {
		height: var(--status-bar-height);
	}

	.header {}

	.title-bar {
		background-color: #ff0;
	}

	.page-searchList {
		background-color: #8f8f94;
		justify-content: center;
		align-items: center;
	}

	.header {
		background-image: linear-gradient(to right, #fff0f0, #66ff00);
		width: 750px;
		height: 60px;
		position: fixed;
		top: 0;
	}

	.info {
		height: 44rpx;
		justify-content: center;
		align-items: center;
	}
</style>