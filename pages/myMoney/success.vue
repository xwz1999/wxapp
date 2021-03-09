<template>
	<view class="">
		<view class="">
			<view class="img">
				<image :src='IMAGE_URL+"/mine/success.png"' mode="widthFix"></image>
			</view>
			<view class="success-txt">
				<text>转出成功</text>
			</view>
			<view class="success-num">
				<text>成功转出{{money}}个瑞币至余额</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				money: 0,
			}
		},
		methods: {
		},
		onUnload: function() {
				uni.$emit("confirmWithdrawal", {
					msg: '提现',
				});
			//跳转指定页
			uni.navigateBack({
				delta: 1
			})

		},
		onLoad(options) {
			this.money = options.money
		}
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 137rpx;
		margin: 100rpx auto 0;

		image {
			width: 137rpx;
			height: 137rpx;
		}
	}

	.success-txt {
		margin-top: 22rpx;
		text-align: center;
		font-size: 48rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}

	.success-num {
		margin-top: 20rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
</style>
