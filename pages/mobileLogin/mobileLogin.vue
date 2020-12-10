<template>
	<view>
		<view class="box">
			<view class="item flex">
				<view class="span">手机号(+86)</view>
				<input class="flex-sub" v-model="mobile" maxlength="11" type="text" value="" placeholder="输入手机号" />
			</view>
			<view class="item flex">
				<view class="span">短信验证码</view>
				<input class="flex-sub" v-model="sms" type="text" value="" placeholder="请输入短信验证码" />
				<view class="text-red" v-if="showTime">剩余{{time}}s</view>
				<view class="text-red" v-else @tap="getCode">获取验证码</view>	
			</view>
		</view>
		<button class="text-white bg-red shadow cu-btn lg round block" style="margin: 30rpx;" @tap="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "15990279927",
				sms:"0716",
				time:60,
				showTime:false,
				timer:null,
				invitationNo:""
			};
		},
		onLoad(options) {
			console.log(options)
			//别人分享的邀请码
			if(options.invitationNo){
				this.invitationNo = options.invitationNo
			}	
		},
		methods: {
			getCode() {
				if(!this.mobile){
					this.$u.toast("请输入手机号");
					return
				}
				this.$u.post('/api/v1/messages/login/sms/send', {
					Mobile:this.mobile
				}).then(res => {
					console.log(res);
					if(res.data.code=="FAIL"){
						this.$u.toast(res.data.msg);
					}
					uni.showToast({
						title:"发送成功"
					})
					//发送验证码成功开启倒计时
					this.countDown()
				});
			},
			countDown(){
				let countdownTime = this.time
				this.showTime = true
				this.time--
				let that = this
				this.timer = setInterval(function(){
					if(that.time==0){
						that.showTime = false
						that.time = countdownTime
						clearInterval(that.timer)
						return
					}
					that.time--
				},1000)
			},
			login(){
				if(!this.mobile){
					this.$u.toast("请输入手机号");
					return
				}
				if(!this.sms){
					this.$u.toast("请输入验证码");
					return
				}
				uni.showLoading({
					title:"登录中"
				})
				this.$u.post('/api/v1/users/profile/mobile/login', {
					Mobile:this.mobile,
					SMS:this.sms
				}).then(res => {
					console.log(res);
					if(res.data.code=="FAIL"){
						this.$u.toast(res.data.msg);
						return
					}	
					if(res.data.data.status==0){
						// 该用户没有账号
						//注册账号
						this.regist()
						return
					}
					let result = res.data.data
					uni.setStorageSync("auth",result.auth)
					uni.setStorageSync("userInfo",result.info)
					// uni.redirectTo({
					// 	url:"../addInfoSuccess/addInfoSuccess"
					// })
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
			},
			regist(){
				this.$u.post('/api/v1/users/profile/mobile/register', {
					mobile:this.mobile,
					invitationNo:this.invitationNo
				}).then(res => {
					console.log(res);
					this.$u.toast(res.data.msg);
					if(res.data.code=="SUCCESS"){
						let result = res.data.data
						uni.setStorageSync("auth",result.auth)
						uni.setStorageSync("userInfo",result.info)
						// uni.redirectTo({
						// 	url:"../addInfoSuccess/addInfoSuccess"
						// })
						uni.showToast({
							title:"登录成功",
							success: () => {
								setTimeout(function(){
									uni.switchTab({
										url:"../index/index"
									})
								},1000)
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.box {
		padding: 0 30rpx;

		.item {
			line-height: 100rpx;
			font-size: 32rpx;

			.span {
				width: 200rpx;
			}

			input {
				height: 100rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
