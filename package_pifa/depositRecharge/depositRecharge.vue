<template>
	<scroll-view scroll-y="true" style="height: 100vh;background-color:#3A3842;">
		<view class="step">
			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_recharge_bank_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">银行汇款</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto_red.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_recharge.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">充值提现</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step3.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">平台审核</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step4.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">打款到账</text>
			</view>
			<view @tap.stop="kefu()"
				style="position: absolute;left: 0;right: 0;top: 170rpx;backdrop-filter: blur(30rpx) saturate(150%);
			background-color: rgba(255, 255, 255, 0.2);padding: 30rpx 30rpx ;display: flex;justify-content: space-between;align-items: center;">
				<text style="color: #FFF;font-size: 30rpx;">如有疑问，点击联系客服</text>
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_kefu.png'" style="width: 64rpx;" mode="widthFix">
				</image>
			</view>

		</view>

		<view style="margin: 0 24rpx;border-radius: 16rpx;background-color: #D4363E;height: 24rpx;margin-top: 120rpx;">
		</view>
		<view style="position: absolute;top: 340rpx;left:42rpx;right:42rpx; ">

			<view style="background-color: #fff;padding: 50rpx 0rpx;border-radius: 10rpx 10rpx 20rpx 20rpx ;">
				<view style="display: flex;justify-content: space-between;padding: 0 30rpx;">
					<text style="color: #333;font-size: 32rpx;">收款账户信息</text>
					<view></view>
				</view>


				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">账户名</view>
					<text style="color: #333;font-size: 28rpx;">浙江京耀云供应链管理有限公司</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">开户银行</view>
					<text style="color: #333;font-size: 28rpx;">上海浦东发展银行宁波鄞州支行</text>
				</view>

				<view style="display: flex;padding: 0 30rpx;margin-top: 40rpx;">
					<view style="color: #999;font-size: 28rpx;min-width: 140rpx;">银行账户</view>
					<text style="color: #333;font-size: 28rpx;">94170078801800002166</text>
				</view>

				<view @tap="copy()" style="display: flex;width: 100%;justify-content: center;margin-top: 40rpx;">
					<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_copy.png'" style="width: 40rpx;"
						mode="widthFix">
					</image>
					<text style="color:#D5101A;font-size: 28rpx;margin-left: 10rpx;">复制开票信息</text>
				</view>





			</view>

			<view @tap="nextPage()"
				style="background-color: #D5101A;height: 80rpx;border-radius:36rpx;width: 100%;margin-top: 50rpx;display: flex;justify-content: center;align-items: center;">
				<text style="color: #fff;">已汇款，下一步</text>
			</view>

			<view style="height: 180rpx;"></view>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				workGroupWid: "2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
				IMAGE_URL: this.IMAGE_URL,
			}
		},
		onLoad() {
		
		},
		methods: {
			nextPage(){
				uni.navigateTo({
					url: "/package_pifa/depositRechargeSecond/depositRechargeSecond"
				})
			},

			copy() {
				uni.setClipboardData({
					data: "浙江京耀云供应链管理有限公司\n上海浦东发展银行宁波鄞州支行\n94170078801800002166",
					success: function() {
						console.log('success');
					}
				});
			},
			copyStr(text) {
				uni.setClipboardData({
					data: text,
					success: function() {
						console.log('success');
					}
				});
			},
			rule() {
				console.log('123123');
				uni.navigateTo({
					url: "/packageA/withdraw/withdrawRule"
				})
			},
			kefu() {
				if (!uni.getStorageSync("auth").token) {
					this.$u.toast("游客无法使用该功能，请登录");
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
				} else {
					uni.navigateTo({
						url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid +
							'&type=workGroup&aid=&title=联系客服'
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.step {
		display: flex;
		background-color: #fff;
		padding: 40rpx 20rpx 60rpx 20rpx;
		margin: 0 48rpx;
		border-radius: 16rpx;

		.gotoImage {
			width: 20rpx;
			margin-top: 20rpx;
		}

		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.image {
				width: 65rpx;
				height: 65rpx;
			}

			.text {
				color: #333;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
