<template>
	<view>
		<view class="" v-if="isShow">
			<view class="text-center" style="margin: 50rpx 0;color: #aaa;">请设置你的支付密码</view>
			<u-message-input value="" :maxlength="6" dot-fill @change="getPwd1"></u-message-input>
			<view style="padding: 30rpx;">
				<button class="bg-red" @tap="next">下一步</button>
			</view>
		</view>

		<view class="" v-else>
			<view class="text-center" style="margin: 50rpx 0;color: #aaa;">请确认你的支付密码</view>
			<u-message-input value="" :maxlength="6" dot-fill @change="getPwd2"></u-message-input>
			<view style="padding: 30rpx;">
				<button class="bg-red" @tap="sure">确定</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: true,
				pwd1: "",
				pwd2: ""
			};
		},
		methods: {
			getPwd1(value) {
				this.pwd1 = value
			},
			getPwd2(value) {
				this.pwd2 = value
			},
			next() {
				if (this.pwd1.length != 6) {
					this.$u.toast("密码需要设置六位数")
					return
				}
				this.isShow = false
			},
			sure() {
				console.log(this.pwd1, this.pwd2)
				if (this.pwd2.length != 6) {
					this.$u.toast("密码需要设置六位数")
					return
				}
				if (this.pwd1 != this.pwd2) {
					this.$u.toast("两次密码不一致，请重新设置", 2000);
					this.isShow = true
					return
				}
				this.$u.post('/api/v1/wallet/pay/password/save', {
					userID: uni.getStorageSync("userInfo").id,
					password:this.pwd2
				}).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					// let info = uni.getStorageSync("userInfo")
					// info.isSetPayPwd = true
					// uni.setStorageSync("userInfo",info)
					uni.showToast({
						title: "设置成功",
						success: () => {
							setTimeout(function() {
								uni.navigateBack()
							}, 1500)
						}
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
</style>
