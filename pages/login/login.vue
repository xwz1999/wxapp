<template>
	<view>
		<view class="logo-box flex flex-direction align-center">
			<image src="../../static/logo.png" mode="widthFix"></image>
			<view class="">享受指尖的购物乐趣</view>
		</view>
		<view class="btn-box">
			<button class="wxlogin-btn text-white shadow flex justify-center cu-btn lg block" style="background-color: #1AB663;"
			 @tap="toMobileLogin">
				<text class="cuIcon-mobilefill"></text>
				<view class="">手机登录</view>
			</button>
			<button class="wxlogin-btn text-white shadow flex justify-center cu-btn lg block" style="background-color: #1AB663;" open-type="getUserInfo" @getuserinfo="wxLogin">
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
			toMobileLogin() {
				uni.navigateTo({
					url: "../mobileLogin/mobileLogin"
				})
			},
			wxLogin() {
				// uni.navigateTo({
				// 	url:"../whiteInfo/whiteInfo"
				// })
				uni.showLoading({
					title:"登陆中"
				})
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes);
						let code = loginRes.code
						 uni.getUserInfo({
						      provider: 'weixin',
						      success:  (infoRes)=> {
						        console.log(infoRes);
								let encryptedData = infoRes.encryptedData
								let iv = infoRes.iv
								// return
								this.$u.post('/api/v1/users/profile/wx/mini/loginv2', {
									code: code,
									encryptedData:encryptedData,
									iv:iv,
									wxType:"recook-weapp"
								}).then(res => {
									console.log(res);
									if(res.data.code=="SUCCESS"){
										uni.reLaunch({
											url:"../index/index"
										})
									}else{
										uni.navigateTo({
											url:"../mobileLogin/mobileLogin"
										})
									}
								});
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
