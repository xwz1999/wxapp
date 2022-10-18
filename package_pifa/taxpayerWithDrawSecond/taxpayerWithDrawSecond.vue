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
		<view
			style="display:flex;background-color: #fff;padding: 32rpx;margin: 120rpx 48rpx 0 48rpx;border-radius: 16rpx;align-items: center;">
			<view style="display: flex;flex-direction: column;" class="flex-sub">
				<text style="color: #333;font-size: 28rpx;">结算金额</text>
				<text
					style="color: #333;font-weight:bold;font-size: 36rpx;margin-top: 10rpx;">¥{{withdrawAmount.balance |toFixed(2)}}</text>
			</view>
			<view style="width: 2rpx;height: 50rpx;background-image: linear-gradient(#EEEEEE,#E8E8E8,#EEEEEE);"></view>
			<view style="display: flex;flex-direction: column;margin-left: 20rpx;" class="flex-sub">
				<text style="color: #333;font-size: 28rpx;">到账金额</text>
				<text
					style="color: #D5101A;font-weight:bold;font-size: 36rpx;margin-top: 10rpx;">¥{{withdrawAmount.actual_amount|toFixed(2)}}</text>
			</view>
		</view>

		<view
			style="display:flex;background-color: #fff;padding: 32rpx;margin: 40rpx 48rpx 0 48rpx;border-radius: 16rpx;flex-direction: column;">
			<view style="display: flex;">
				<view>
					<text style="color: #333;font-size: 28rpx;">开票方式</text>
				</view>

				<view style="display: flex;margin-left: 50rpx;" @tap="chooseWay(1)">
					<text :class="openWay==1?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"
						style="margin-top: 5rpx;"></text>
					<text style="color: #333;font-size: 28rpx;margin-left: 15rpx;">电子发票</text>
				</view>

				<view style="display: flex;margin-left: 50rpx;" @tap="chooseWay(2)">
					<text :class="openWay==2?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"
						style="margin-top: 5rpx;"></text>
					<text style="color: #333;font-size: 28rpx;margin-left: 15rpx;">纸质发票</text>
				</view>
			</view>

			<view style="display: flex;flex-direction: column;" v-if="openWay==2">
				<view style="display: flex;margin-top: 40rpx;">
					<text style="color: #333;font-size: 28rpx;">快递公司</text>
					<view style="width: 40rpx;"></view>
					<input type="text" v-model="company" placeholder-class="pText" placeholder="请输入快递公司" />
				</view>
				<view style="display: flex;margin-top: 40rpx;">
					<text style="color: #333;font-size: 28rpx;">快递单号</text>
					<view style="width: 40rpx;"></view>
					<input type="text" v-model="number" placeholder-class="pText" placeholder="请输入快递单号" />
				</view>
			</view>

		</view>
		<view @tap="nextPage()"
			style="display: flex;background-color: #D5101A;height: 80rpx;border-radius:36rpx;position: absolute;bottom: 100rpx;left: 48rpx;right: 48rpx;justify-content: center;align-items: center;">
			<text style="color: #fff;">提交申请</text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				workGroupWid: "2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
				IMAGE_URL: this.IMAGE_URL,
				withdrawAmount: {
					balance: 0,
					actual_amount: 0
				},
				openWay: 1,
				company: "",
				number: "",
				dateString:""
			}
		},
		onLoad() {
			this.getAmount()
		},
		methods: {
			dateFormat() {
				let date = new Date()
				let year = date.getFullYear();
				// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				this.dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
				
			},
			nextPage() {
				console.log("123");
				this.dateFormat()
				if(this.openWay==2){
					if(this.company===""||this.number===""||this.company==null||this.number==null){
						this.$u.toast("请先完善快递信息");
						return
					}
				}
		
				let sendData = {}
				if (this.openWay == 0) {
					this.$u.toast("请先选择开票方式");
					return
				}
				if (this.withdrawAmount.balance > 0) {
					this.$u.toast("余额不足，无法提现");
				} else {
					if (this.openWay == 2) {
						if (this.company == "" || this.company == null || this.number == "" || this.number == null) {
							this.$u.toast("请先完善快递信息");
							return
						}


						sendData = {
							amount: this.withdrawAmount.balance,
							tax: this.openWay,
							logistics_name: this.company,
							waybill_code: this.number
						}
					} else {
						sendData = {
							amount: this.withdrawAmount.balance,
							tax: this.openWay,
						}
					}
					this.$u.post('/api/v2/app/company/apply', sendData).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg, 2000);
							return
						} else {
							this.$u.toast("提交成功");
							uni.navigateBack({
								delta: 2,
							})
							uni.navigateTo({
								url: "/package_pifa/taxpayerWithDrawThird/taxpayerWithDrawThird?openWay=" + this.openWay +
									'&company=' + this.company +
									'&number=' + this.number + '&balance=' + this.withdrawAmount.balance + '&actualAmount=' + this.withdrawAmount
									.actual_amount + 
									'&date=' + this.dateString 
							})
						}


					});

				}

			},
			chooseWay(index) {
				if (this.openWay != index) {
					this.openWay = index
				} else {
					this.openWay = 0
				}
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
				
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					this.withdrawAmount = res.data.data
						console.log(this.withdrawAmount);

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
