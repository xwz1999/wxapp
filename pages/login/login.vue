<template>
	<view>
		<view v-if="type !== 'share'" style="position: absolute; top: 25px; right: 16px;" @tap="toMobileLogin">手机号登录</view>
		<view class="logo-box flex flex-direction align-center">
			<image :src="IMAGE_URL+'/logo.png'" mode="widthFix"></image>
			<view class="">享受指尖的购物乐趣</view>
		</view>
		<view class="btn-box">
			<button class="wxlogin-btn text-white shadow flex justify-center cu-btn lg block" style="background-color: #1AB663;"
			 open-type="getUserInfo" @getuserinfo="wxLogin">
				<text class="cuIcon-weixin"></text>
				<view class="">微信登录</view>
			</button>
			<view class="text-center" style="font-size: 24rpx;color: #999;margin-top: 20rpx;">登录代表您已阅读并同意<text class="text-red">《用户协议和隐私政策》</text></view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				type: true,
				IMAGE_URL: this.IMAGE_URL
			};
		},
		onLoad (options) {
			if (options.type) {
				this.type = options.type
			}
		},
		methods: {
			toMobileLogin() {
				uni.navigateTo({
					url: "../mobileLogin/mobileLogin"
				})
			},
			wxLogin() {
				uni.showLoading({
					title: "登录中"
				})
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes);
						let code = loginRes.code
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								console.log(infoRes);
								let encryptedData = infoRes.encryptedData
								let iv = infoRes.iv
								// return
								this.$u.post('/api/v1/users/profile/wx/mini/loginv2', {
									code: code,
									encryptedData: encryptedData,
									iv: iv,
									wxType: "recook-weapp"
								}).then(res => {
									console.log(res);
									if(res.data.code=="FAIL"){
										this.$u.toast(res.data.msg);
										return
									}
									let wxUnionId = res.data.data.info.wxUnionId
									if (res.data.data.status == 0) {
										uni.navigateTo({
											url: "../mobileLogin/mobileLogin?wxUnionId=" + wxUnionId
										})
									} else if (res.data.data.status == 2) {
										this.bindInvitation(wxUnionId)
									}else{
										let result = res.data.data
										this.$store.commit('setinvitationNo', result.info.invitationNo);
										uni.setStorageSync("auth",result.auth)
										uni.setStorageSync("userInfo",result.info)
										uni.showToast({
											title:"登录成功",
											success: () => {
												let that = this
												setTimeout(function(){
													if (that.$store.state.url) {
														let url = that.$store.state.url
														console.log(url)
														uni.navigateTo({
															url: url
														})
														that.$store.commit('removeUrl')
													} else {
														uni.reLaunch({
															url:"../index/index"
														})
													}
												},1000)
											}
										})
									}
								})
							},
							fail() {
								uni.hideLoading()
							}
						})
					}
				});
			},
			bindInvitation(wxUnionId) {
				this.$u.post('/api/v1/users/profile/wx/invitation', {
					wxUnionId: wxUnionId,
					invitationNo:"000000"
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.showToast({
						title:"登录成功",
						success: () => {
							setTimeout(function(){
								uni.reLaunch({
									url:"../index/index"
								})
							},1000)
						}
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.logo-box {
		margin-top: 158rpx;
		font-size: 34rpx;
		font-weight: 700;

		image {
			width: 160rpx;
			box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
			margin-bottom: 30rpx;
			border-radius: 30rpx;
		}

	}

	.btn-box {
		position: fixed;
		bottom: 120rpx;
		width: 100%;

		button {
			margin: 20rpx 30rpx;
			border-radius: 44rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #FFFFFF;

			&::after {
				content: none;
			}

			text {
				margin-right: 10rpx;
				font-size: 46rpx;
			}
		}
	}
</style>
