<template>
	<scroll-view scroll-y="true" style="height: 100vh;background-color:#3A3842;">
		<view class="step">
			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_recharge_bank_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">银行汇款</text>
			</view>

			<image :src="IMAGE_URL+'/wxapp/withdraw/ic_withdrawal_goto_red.png'" class="gotoImage" mode="widthFix">
			</image>

			<view class="flex-sub item">
				<image :src="IMAGE_URL+'/wxapp/withdraw/ic_recharge_red.png'" class="image" mode="widthFix">
				</image>
				<text class="text">充值提现</text>
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
			style="display:flex;background-color: #fff;padding: 32rpx;margin: 120rpx 48rpx 0 48rpx;border-radius: 16rpx;flex-direction: column;">
			<view style="display: flex;">
				<view>
					<text style="color: #333;font-size: 28rpx;">充值金额</text>
				</view>


			</view>

			<view style="display: flex;margin-top: 40rpx;">
				<text style="color: #D5101A;font-size: 56rpx;margin-top: 5rpx;margin-right: 20rpx;">¥</text>
				<input style="font-size: 72rpx;color: #D5101A;height: 70rpx;" type="text" v-model="amount"
					placeholder-class="pText" placeholder="请输入充值金额" />
			</view>
			<view style="background-color: #eee;height: 1rpx;margin-top: 5rpx;">
			</view>

			<view style="margin-top: 20rpx;">
				<text style="color: #999999;font-size: 24rpx;">请与汇款金额填写一致</text>
			</view>
		</view>


		<view
			style="display:flex;background-color: #fff;padding: 32rpx;margin: 40rpx 48rpx 0 48rpx;border-radius: 16rpx;flex-direction: column;">
			<view style="display: flex;">
				<view>
					<text style="color: #333;font-size: 28rpx;">汇款凭证</text>
				</view>


			</view>
			<view style="height: 20rpx;"></view>
			<u-upload ref="uUpload" :action="BASE_URL+upload_url" :auto-upload="true" @on-Success="success"
				@on-remove="remove" name="photo" :padding="false" maxCount="3" width="150" height="150"></u-upload>


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
				BASE_URL: this.BASE_URL,
				upload_url: '/api/v1/files/photo/upload',
				workGroupWid: "2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
				IMAGE_URL: this.IMAGE_URL,
				amount: "",
				uploadPicLists: [],
				licenseImages: "",
				time:""

			}
		},
		onLoad() {

		},
		methods: {
			success(data, index, lists, name) {
				this.uploadPicLists = lists
				console.log(this.uploadPicLists);

			},
			// 图片删除成功
			remove(index, lists, name) {
				this.uploadPicLists = lists
				console.log(this.uploadPicLists);
			},
			nextPage() {


				if (this.amount === "" || this.amount == null) {
					this.$u.toast("请先输入充值金额");
					return
				}
				for (let i = 0; i < this.uploadPicLists.length; i++) {
					if (i != this.uploadPicLists.length - 1) {
						this.licenseImages += this.uploadPicLists[i].file.path + ';'
					} else {
						this.licenseImages += this.uploadPicLists[i].file.path
					}
				}
				if (this.licenseImages == '') {
					this.$u.toast("请先上传汇款凭证");
					return
				}

				let sendData = {
					amount: this.amount,
					attach: this.licenseImages
				}
				
				let today = new Date()
				let Y = today.getFullYear()
				let M = today.getMonth() + 1
				let D = today.getDate()
				let H = today.getHours()
				let m = today.getMinutes()
				let s = today.getSeconds()
				if (M < 10) {
					M = '0' + M
				}
				this.time = Y + "-" + M + "-" + D + " " + H + ":" + m + ":" + s 
				console.log(this.time)
				
				
				console.log(sendData);
				




				this.$u.post('/api/v2/app/company/deposit', sendData).then(res => {
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
							url: "/package_pifa/depositRechargeThird/depositRechargeThird?amount=" +
								this.amount +'&time=' + this.time + '&licenseImages=' + this.licenseImages 
						})
					}

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
