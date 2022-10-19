<template>
	<scroll-view scroll-y="true" style="height: 100vh;background-color:#3A3842;">
		<view class="step">
			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step1_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">开发票</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto_red.png'" class="gotoImage" mode="widthFix">
			</image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step2_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">申请提现</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto_red.png'" class="gotoImage" mode="widthFix">
			</image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step3_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">平台审核</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto.png'" class="gotoImage" mode="widthFix"></image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_step4.png'" class="image" mode="widthFix"></image>
				<text class="text" style="color: #cdcdcd;">充值成功</text>
			</view>
			<view @tap.stop="kefu()"
				style="position: absolute;left: 0;right: 0;top: 170rpx;backdrop-filter: blur(30rpx) saturate(150%);
			background-color: rgba(255, 255, 255, 0.2);padding: 30rpx 30rpx ;display: flex;justify-content: space-between;align-items: center;">
				<text style="color: #FFF;font-size: 30rpx;">如有疑问，点击联系客服</text>
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_kefu.png'" style="width: 64rpx;" mode="widthFix">
				</image>
			</view>



		</view>
		<view
			style="display:flex;background-color: #fff;padding: 32rpx;margin: 100rpx 48rpx 0 48rpx;border-radius: 16rpx;flex-direction: column;">
			<view style="display: flex;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">充值金额</text>
				<text style="font-size: 28rpx;color: #D5101A; margin-top: 5rpx;">¥{{amount |toFixed(2)}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">汇款凭证</text>
				<view v-for="(item,index) in images" :key="index">
					<image :src="item" style="width: 150rpx;" mode="widthFix">
					</image>
				</view>
			</view>
	
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">申请时间</text>
				<text style="font-size: 28rpx;color: #333;margin-top: 5rpx;">{{time}}</text>
			</view>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				workGroupWid: "2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
				IMAGE_URL: this.IMAGE_URL,
				licenseImages: "",
				time: "",
				amount:"",
				images:[]
				
			}
		},
		onLoad(option) {
			
			if(option!=null){
				console.log(option)
				this.amount = option.amount
				this.time = option.time
				this.licenseImages = option.licenseImages
				
				this.images = this.licenseImages.split(';');
				console.log(this.images)
				
			}
	
		},
		methods: {

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
	.pText {
		color: #CCCCCC;
		font-size: 28rpx;
	}

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
