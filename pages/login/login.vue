<template>
	<view>
		<!-- <view class="flex justify-end" style="font-size: 32rpx;padding: 0 30rpx;">
			<view class="">手机号登录</view>
		</view> -->
		<view class="logo-box flex flex-direction align-center">
			<image src="../../static/logo.png" mode="widthFix"></image>
			<!-- <image :src="IMAGE_URL+'/default/officaillogo-1.png'" mode="widthFix"></image> -->
			<view class="">享受指尖的购物乐趣</view>
		</view>
		<view class="btn-box">
			<button class="wxlogin-btn text-white shadow flex justify-center cu-btn lg block" style="background-color: #1AB663;"
			 @tap="toMobileLogin">
				<text class="cuIcon-mobilefill"></text>
				<view class="">手机登录</view>
			</button>
			<button class="wxlogin-btn text-white shadow flex justify-center cu-btn lg block" style="background-color: #1AB663;"
			 open-type="getUserInfo" @tap="wxLogin" @getuserinfo="getInfo">
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
				IMAGE_URL: this.IMAGE_URL
			};
		},
		methods: {
			getInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log('用户昵称为：' + infoRes.userInfo.nickName);
					}
				});
			},
			toMobileLogin() {
				uni.navigateTo({
					url: "../mobileLogin/mobileLogin"
				})
			},
			wxLogin() {
				// uni.navigateTo({
				// 	url:"../whiteInfo/whiteInfo"
				// })
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes);
						let code = loginRes.code
					
						
						this.$u.get('https://api.weixin.qq.com/sns/jscode2session?appid=wxf95835be72b5373c&secret=1153b31349a1791f56bd542181beeab1&js_code='+code+'&grant_type=authorization_code').then(res=>{
							console.log(res)
						})
						
						
						return
						this.$u.post('/api/v1/users/profile/wx/login', {
							code: code,
							wxType:"recook-weapp"
						}).then(res => {
							console.log(res);
							if (res.code == 1000) {
								uni.switchTab({
									url: "../index/index",
									success: () => {
										uni.showToast({
											title: "登录成功"
										})
									}
								})
							}
						});
					}
				});
				return

			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.logo-box {
		margin-top: 158rpx;

		image {
			width: 160rpx;
			box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
			margin-bottom: 30rpx;
		}

	}

	.btn-box {
		position: fixed;
		bottom: 120rpx;
		width: 100%;

		button {
			margin: 20rpx;
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
