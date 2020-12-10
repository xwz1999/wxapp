<template>
	<view>
		<view class="flex flex-direction align-center">
			<view style="font-size: 60rpx;margin: 60rpx 0 30rpx;">输入短信验证码</view>
			<view style="font-size: 34rpx;color: #888888;line-height: 50rpx;">我们将发送短信验证码到你的手机号</view>
			<view style="font-size: 48rpx;line-height: 60rpx;margin-bottom: 50rpx;">{{hidePhone}}</view>
			<u-message-input value="" @change="getCode"></u-message-input>
			<view class="text-red" style="padding: 20rpx;margin-top: 20rpx;" v-if="showBtn" @tap="sendCode">点击发送验证码</view>
			<view class="text-red" style="padding: 20rpx;margin-top: 20rpx;" v-else>{{time}}s以后重新发送</view>
			<!-- <u-keyboard ref="uKeyboard" mode="number" v-model="show"></u-keyboard> -->
			<view class="btn-box" style="padding: 30rpx;">
				<button class="bg-red text-white" @tap="next">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				time: 60,
				showBtn: true,
				phone:"",
				hidePhone:"",
				sms:""
			};
		},
		onLoad() {
			this.phone=uni.getStorageSync("userInfo").phone
			this.hidePhone = this.phone.substr(0,3)+"****"+this.phone.substr(7);
			console.log(this.phone,this.hidePhone)
		},
		methods: {
			showKeyboard() {
				this.show = true
			},
			//发送验证码
			sendCode() {
				this.$u.post('/api/v1/messages/verify/sms/send', {
					userID: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.showToast({
						title:"发送成功"
					})
					//发送成功开启倒计时
					this.countDown()
				});
			},
			//倒计时
			countDown(){
				let time = this.time
				this.showBtn = false
				this.time--
				let that = this
				console.log(this.time)
				let timer = setInterval(function() {
					that.time--
					if (that.time == 0) {
						clearInterval(timer)
						that.showBtn = true
						that.time = time
						return
					}
				}, 1000)
			},
			getCode(value){
				this.sms = value
			},
			next() {
				if(!this.sms){
					this.$u.toast("请输入验证码");
					return
				}
				this.$u.post('/api/v1/messages/verify/sms', {
					userID: uni.getStorageSync("userInfo").id,
					sms:this.sms
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					//验证成功则跳转下一步设置密码
					uni.redirectTo({
						url: "../setPassword/setPassword"
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
