<template>
	<view>
		<view class="isLoading bg-white flex flex-direction justify-center align-center"
			style="height: 100vh;width: 100vw;margin: 20rpx 0;background-color:rgb(240, 240, 240)" >
			<view class="flex flex-direction justify-center align-center" style="width: 100vw;height:80vh;">
				<image :src="IMAGE_URL+'/wxapp/uni-program/xx.jpg'" mode="widthFix" style="width:500upx"></image>
				<view class="text-center" style="color: #AAAAAA;font-size: 32rpx;margin-top: 10rpx;"></view>
			</view><!-- <image src="/static/loading-white.gif" mode="widthFix" style="width:500upx"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				STATIC_URL: this.STATIC_URL,
				isEdit: false
			};
		},
		onShow() {
		},
		onLoad() {

		},
		methods: {

		}
	
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.split_text {
		text-align: center;
	}

	.cart-top {
		position: fixed;
		width: 100%;
		padding: 0 30rpx;
		line-height: 80rpx;
		top: 0;
		z-index: 1000;
	}

	.cart-shop-item {
		margin: 20rpx;
		padding: 0 20rpx;
		border-radius: 15rpx;

		&:last-child {
			margin-bottom: 200rpx;
		}

		.shop-name-box {
			height: 80rpx;
			font-size: 28rpx;
			color: #0A0001;
			

			.shop-logo {
				width: 44rpx;
				border-radius: 10rpx;
				margin: 0 10rpx;
			}

			.shop-name {
				margin-left: 10rpx;
				font-size: 32rpx;
			}
		}

		.cart-goods-item {
			padding-bottom: 20rpx;

			.cart-goods-pic {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
				margin: 0 20rpx;
			}

			.msg-top {
				height: 200rpx;
			}

			.cart-goods-name {
				color: #0A0001;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				line-height: 40rpx;
			}

			.cart-goods-spec {
				padding: 0 10rpx;
				background-color: #EFF1F6;
				color: #666666;
				font-size: 20rpx;
				margin-top: 10rpx;
				display: inline-block;
				line-height: 40rpx;
				border-radius: 10rpx;
			}

			.tip {
				color: #CC1B4F;
				font-size: 18rpx;
				border-radius: 5rpx;
				border: 1rpx solid #CC1B4F;
				line-height: 28rpx;
				padding: 0 8rpx;
			}

			input {
				min-height: 36rpx;
			}
		}
	}

	.cart-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);
		z-index: 100;

		button {
			height: 76rpx;
			width: 180rpx;
		}
	}

	.u-checkbox__label.data-v-54acf820 {
		word-wrap: break-word;
		margin: 0 !important;
		color: #606266;
		font-size: 30rpx;
	}

	.cuIcon-roundcheckfill,
	.cuIcon-round {
		font-size: 50rpx;
	}
</style>
