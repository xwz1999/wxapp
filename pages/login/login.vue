<template>
	<view>
		<!-- <view v-if="type !== 'share'" style="position: absolute; top: 25px; right: 16px;" @tap="toMobileLogin">手机号登录</view> -->
		<view class="logo-box flex flex-direction align-center">
			<image :src="IMAGE_URL+'/wxapp/jyy.png'" mode="widthFix"></image>
			<view class="">跟着英子去开店</view>
		</view>
		<view class="btn-box">
			<view class="text-center" style="font-size: 24rpx;color: #999;margin-top: 20rpx;">
				<checkbox :value="agreement" class="checkbox" checked="true" @tap="checkboxChange" />
				登录代表您已阅读并同意
				<text>《</text>
				<text class="text-black" @click="webviewNav(1)">用户服务协议</text>
				<text>和</text>
				<text class="text-black" @click="webviewNav(2)">用户隐私政策</text>
				<text>》</text>
			</view>
			<button class="wxlogin-btn text-white shadow flex justify-center cu-btn lg block"
				style="background-color: #1AB663;" open-type="getUserInfo" @getuserinfo="wxLogin">
				<text class="cuIcon-weixin"></text>
				<view class="">微信登录</view>
			</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				type: true,
				IMAGE_URL: this.IMAGE_URL,
				agreement: true
			};
		},
		onLoad(options) {
			if (options.type) {
				this.type = options.type
			}
			// 别人传进来的邀请id
			console.log('login页面参数：', options)
			console.log(options.invite)
			if (options.q !== undefined) {
				let url = decodeURIComponent(options.q)
				if (url.split("/")[6] != undefined) {
					this.$store.commit('setinvite', url.split("/")[6]);
					uni.setStorageSync("invite", url.split("/")[6])
					console.log(uni.getStorageSync('invite'));
				}
			}
			if (options.invite) {
				this.$store.commit('setinvite', options.invite);
			}
			console.log(uni.getStorageSync("auth").token)
			if (uni.getStorageSync("auth").token) {
				this.$store.state.isLogin = true
				console.log(12345)
				// uni.reLaunch({
				// 	url:"../index/index"
				// })
				this.back()
			}
		},
		methods: {
			checkboxChange() {
				this.agreement = !this.agreement
			},
			webviewNav(index) {
				let src = ''
				switch (index) {
					case 1:
						src = 'https://jyycdn.reecook.cn/privacy.html'
						break
					case 2:
						src = 'https://jyycdn.reecook.cn/protocol.html'
						break
				}
				uni.navigateTo({
					// url: "../webview/webview?src=" + src
					url: "/pages/webview/webview?src=" + encodeURIComponent(JSON.stringify(src))
				})
			},
			back() {
				var pages = getCurrentPages()
				if (pages.length > 1) {
					var prePage = pages[pages.length - 2];
					prePage.onLoad(prePage.options)
					uni.navigateBack()
					return
				}
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			toMobileLogin() {
				uni.navigateTo({
					url: "../mobileLogin/mobileLogin"
				})
			},
			wxLogin() {
				if (!this.agreement) {
					uni.showToast({
						title: "请勾选用户协议政策",
					})
					return
				}
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
									if (res.data.code == "FAIL") {
										this.$u.toast(res.data.msg);
										return
									}
									let wxUnionId = res.data.data.info.wxUnionId
									if (res.data.data.status == 0) {
										uni.navigateTo({
											url: "../mobileLogin/mobileLogin?wxUnionId=" +
												wxUnionId
										})
									} else if (res.data.data.status == 2) {
										this.bindInvitation(wxUnionId)
									} else {
										let result = res.data.data
										this.$store.commit('setinvitationNo', result.info
											.invitationNo);
										uni.setStorageSync("auth", result.auth)
										uni.setStorageSync("userInfo", result.info)
										this.$store.state.isLogin = true
										uni.showToast({
											title: "登录成功",
											success: () => {
												let that = this
												setTimeout(function() {
													if (that.$store
														.state.url) {
														console.log(1)
														let url = that
															.$store
															.state.url
														console.log(
															url)
														// uni.reLaunch({
														// 	url: url
														// })
														let pages =
															getCurrentPages();
														let prevPage =
															pages[pages
																.length -
																2
																]; //刷新上一个页面
														prevPage
															.onLoad(
																prevPage
																.options
																)
														uni.navigateBack()


														that.$store
															.commit(
																'removeUrl'
															)
													} else {
														console.log(2)
														that.back()
													}
												}, 500)
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
				let that = this
				this.$u.post('/api/v1/users/profile/wx/invitation', {
					wxUnionId: wxUnionId,
					invitationNo: "000000"
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.$store.state.isLogin = true
					uni.showToast({
						title: "登录成功",
						success: () => {
							setTimeout(function() {
								// uni.reLaunch({
								// 	url:"../index/index"
								// })
								that.back()
							}, 1000)
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

	.checkbox {
		transform: scale(0.9);

		.wx-checkbox-input {
			border-radius: 50%;
		}
	}
</style>
