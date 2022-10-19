<template>
	<view>
		<view class="flex flex-direction" style="height: 100vh;width:100vw;">
			<view class="top-nav">
				<image :src="IMAGE_URL+'/wxapp/mine/withdraw_bg.png'" mode="heightFix"
					style="width: 750rpx;height: 400rpx;"></image>
				<view class="top-nav-box">
					<view>
						<text style="color: #333333;font-size: 28rpx;">预存款金额(元)</text>
					</view>
					<view style="margin-top: 40rpx;">
						<text style="color: #333333;font-size: 64rpx;font-weight:bold;">{{deposit}}</text>
					</view>
					<view v-if="!isEnterprise" style="margin-top: 40rpx;">
						<button class="cu-btn round text-white"
							style="background-image: linear-gradient(to right, #E05346, #DB1E1E);width: 400rpx;height: 80rpx;"
							@tap="toDeposit">充值</button>
					</view>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;margin-top: 80rpx;">
				<view class="bottom-box" style="margin-left: 24rpx;display: flex;flex-direction: row;">
					<image style="width: 100rpx;width: 100rpx;" :src="IMAGE_URL + '/wxapp/mine/withdraw_detail.png'" mode="widthFix"></image>
					<view style="width: 40rpx;"></view>
					<view style="display: flex;flex-direction: column;"	@tap="toDepositDetail">
						<text style="color: #333333;font-size: 28rpx;font-weight:bold;">交易明细</text>
						<view style="height: 5rpx;"></view>
						<text style="color: #999999;font-size: 24rpx;">查看金额流水</text>
					</view>
				</view>
				<view style="width: 30rpx;"></view>
				<view class="bottom-box" style="margin-right: 24rpx;display: flex;flex-direction: row;">
					<image style="width: 100rpx;width: 100rpx;" :src="IMAGE_URL + '/wxapp/mine/withdraw_record.png'" mode="widthFix"></image>
						<view style="width: 40rpx;"></view>
					<view style="display: flex;flex-direction: column;"	@tap="toDepositRecord">
						<text style="color: #333333;font-size: 28rpx;font-weight:bold;">充值记录</text>
						<view style="height: 5rpx;"></view>
						<text style="color: #999999;font-size: 24rpx;">查看审核结果</text>
					</view>
				</view> 
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				deposit: "",
				isEnterprise:false
			}
		},
		onLoad(option) {
			if(option.isEnterprise!=null){
				isEnterprise = option.isEnterprise
			}
		},
		created() {
			console.log(this.$store.state.userBrief)
			this.deposit = this.$store.state.userBrief.deposit

		},
		methods: {
			toDeposit() {
				uni.navigateTo({
					url: "/package_pifa/depositRecharge/depositRecharge"
				})
			},
			toDepositDetail() {
				uni.navigateTo({
					url: "/package_pifa/depositDetail/depositDetail"
				})
			},
			toDepositRecord() {
				uni.navigateTo({
					url: "/package_pifa/depositRecord/depositRecord"
				})
			},
		}
	}
</script>

<style lang="scss">
	.top-nav {
		position: relative;
		z-index: 10;
		font-size: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.top-nav-box {
			//margin:0 24rpx;
			margin-top: 44rpx;
			position: absolute;
			top: 0;
			width: 95%;
			height: 400rpx;
			z-index: 100;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: white;

			.nav-box {
				height: 320rpx;
				margin: 20rpx 12rpx;
				background-size: 100% auto;
				padding: 42rpx 52rpx;

			}
		}
	}
	.bottom-box{
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		width: 100%;
		height: 152rpx;
		border: 1rpx solid #EEEEEE;
	}
</style>
