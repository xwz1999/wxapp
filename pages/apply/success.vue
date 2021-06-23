<template>
	<view class="">
		<view class="logo-box">
			<image :src="IMAGE_URL+'/logo.png'" mode="widthFix"></image>
		</view>
		<view class="txt-box">
			<view class="title">
				<text>提交成功</text>
			</view>
			<view class="txt">
				<text>您的资料已提交，工作人员将在3个工作日内与您联系，请耐心等待审核</text>
			</view>

		</view>
		<!-- https://h5.reecook.cn/app/autoopen.html -->
		<!-- <u-popup v-model="show" mode="center">
			<view>
				<image :src="IMAGE_URL + '/wx.png'" mode="widthFix" style="width: 400rpx;"></image>
			</view>
		</u-popup> -->
		<button class="btn" @click="toWebview">
			<text>去下载APP</text>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				show: false
			};
		},
		mounted() {

		},
// 		methods: {
// // 跳转webview网页
// 			toWebview() {
// 				this.show = true
// 				// uni.navigateTo({
// 				// 	url:'/pages/webview/webview?src='+'https://cdn.reecook.cn/website/www/activity/e.html'
// 				// })
// 			},
// 		}
	}
</script>


<style lang="scss" scoped>
	.logo-box {
		image {
			width: 30%;
			display: block;
			margin: 80rpx auto 0rpx;
		}
	}

	.txt-box {
		text-align: center;

		.title {
			margin-top: 80rpx;
			text-align: center;
			font-size: 50rpx;
			color: rgb(64, 64, 64);
		}

		.txt {
			margin: 0rpx auto;
			text-align: center;
			font-size: 26rpx;
			width: 80%;
		}
	}

	.btn {
		text-align: center;
		color: #fff;
		line-height: 90rpx;
		border-radius: 10rpx;
		font-size: 36rpx;
		background: #d5101a;
		-webkit-box-shadow: 2rpx 4rpx 6rpx #f1b1b4;
		box-shadow: 2rpx 4rpx 6rpx #f1b1b4;
		position: absolute;
		bottom: 120rpx;
		left: 40rpx;
		right: 40rpx;
	}
</style>
