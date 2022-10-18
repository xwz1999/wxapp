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
		<view
			style="display:flex;background-color: #fff;padding: 32rpx;margin: 100rpx 48rpx 0 48rpx;border-radius: 16rpx;flex-direction: column;">
			<view style="display: flex;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">结算金额</text>
				<text style="font-size: 28rpx;color: #D5101A; margin-top: 5rpx;">¥{{balance |toFixed(2)}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">到账金额</text>
				<text style="font-size: 28rpx;color: #D5101A;margin-top: 5rpx;">¥{{actual_amount |toFixed(2)}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">申请时间</text>
				<text style="font-size: 28rpx;color: #333;margin-top: 5rpx;">{{date}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">开票方式</text>
				<text style="font-size: 28rpx;color: #333;" v-if="openWay==1">电子发票</text>
				<text style="font-size: 28rpx;color: #333;" v-if="openWay==2">纸质发票</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;"  v-if="openWay==1">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">邮箱地址</text>
				<text style="font-size: 28rpx;color: #333;margin-top: 5rpx;">{{info.email}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;" v-if="openWay==2">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">快递公司</text>
				<text style="font-size: 28rpx;color: #333;">{{company}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;"  v-if="openWay==2">
				<text style="font-size: 28rpx;color: #333;min-width: 150rpx;">快递单号</text>
				<text style="font-size: 28rpx;color: #333;margin-top: 5rpx;">{{number}}</text>
			</view>
		</view>



		<view style="display:flex;padding: 32rpx;margin: 50rpx 48rpx 0 48rpx;flex-direction: column;">
			<view style="display: flex;">
				<text style="font-size: 32rpx;color: #fff;min-width: 150rpx;">收款账号信息</text>

			</view>
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #fff;min-width: 150rpx;">账户名</text>
				<text style="font-size: 28rpx;color: #fff;margin-top: 5rpx;">{{companyInfo.company_name}}</text>
			</view>
			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #fff;min-width: 150rpx;">开户银行</text>
				<text style="font-size: 28rpx;color: #fff;margin-top: 5rpx;">{{companyInfo.tax_bank}}</text>
			</view>

			<view style="display: flex;margin-top: 40rpx;">
				<text style="font-size: 28rpx;color: #fff;min-width: 150rpx;">银行账户</text>
				<text style="font-size: 28rpx;color: #fff;margin-top: 5rpx;">{{companyInfo.tax_number}}</text>
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
				openWay: 1,
				company: "",
				number: "",
				companyInfo: {
					company_name: "",
					tax_bank: "",
					tax_number: "",
				},
				balance: 0,
				actual_amount: 0,
				email: "",
				date: "",
				info:""
			}
		},
		onLoad(option) {
			
			if(option!=null){
				console.log(option)
				this.openWay = option.openWay
				this.company = option.company
				this.number = option.number
				this.balance = option.balance
				this.actual_amount = option.actualAmount
				this.date = option.date
			}
			this.getAmount()
			this.getCompanyInfo()
			this.getInfo()
		},
		methods: {
			getInfo() {
				//获取联系人信息
				this.$u.post('/api/v2/app/company/contact', {}).then(res => {
					console.log(res.data.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					this.info = res.data.data

				});
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
			getAmount() {
				this.$u.post('/api/v2/app/company/apply/all_amount', {}).then(res => {
					console.log(res.data.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					this.withdrawAmount = res.data.data

				});
			},
			getCompanyInfo() {
				this.$u.post('/api/v2/app/company/info', {}).then(res => {
					console.log(res.data.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					this.companyInfo = res.data.data

				});
			}
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
