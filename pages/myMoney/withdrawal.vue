<template>
	<view class="">
		<view class="box">
			<view class="tip">
				<text>转出瑞币(个)</text>
			</view>

			<view class="input-box flex justify-between">
				<text style="font-size: 48rpx;">￥</text>
				<input class="flex-sub" v-model="money" type="digit" :placeholder="'本次最多可提现'+balance+'元'" />
				<view class="text-red" @tap="allBalance">全部</view>
			</view>
		</view>
		<view class="btn" :class="money?'btn-color':''" @click="confirm">
			<text>确认转入</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: null,
				balance: null,
			}
		},
		methods: {
			allBalance() {
				this.money = this.balance
			},
			confirm() {
				if (!this.money) {
					return
				}
				this.$u.post('/api/v1/wallet/coin/coin_to_balance', {
					userId: uni.getStorageSync("userInfo").id,
					coinNum: this.money
				}).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.navigateTo({
						url: "/pages/myMoney/success?money=" + this.money
					})
				
				})
			}
		},
		watch: {
			money: {
				handler(newValue) {
					console.log(newValue)
				},
				immediate: true
			}
		},
		onLoad(options) {
			console.log(options)
			this.balance = parseFloat(options.coinTotal)

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 750rpx;
		height: 240rpx;
		background: #FEFEFE;
		padding: 38rpx 30rpx 38rpx 34rpx;

		.input-box {
			line-height: 100rpx;
			font-size: 32rpx;

			input {
				height: 100rpx;
				padding: 0 10rpx;
			}

			.place {
				font-size: 30rpx;
				color: #DDDDDD;
			}
		}


	}


	.btn {
		width: 690rpx;
		height: 93rpx;
		margin: 42rpx auto;
		text-align: center;
		line-height: 93rpx;
		background: #E7E7E7;
		border-radius: 5rpx;

		font-size: 35rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;

		&.btn-color {
			background: #C92219;
			color: #FFFFFF;
		}
	}
</style>
