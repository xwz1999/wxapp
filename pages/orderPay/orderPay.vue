<template>
	<view>
		<view class="flex flex-direction align-center" style="margin-top: 80rpx;">
			<view>￥<text style="font-size: 60rpx;font-weight: 900;">{{finalPrice}}</text></view>
			<view style="color: #AAAAAA;line-height: 60rpx;">创建时间：{{time}}</view>
		</view>
		<view class="payment-box">
			<view class="plain-item flex justify-between" v-for="(item,index) in payment" :key="index" @tap="choosePayment(index)">
				<view class="flex flex-direction justify-center">
					<image :src="item.icon" style="width: 60rpx;" mode="widthFix"></image>
				</view>
				<view class="flex-sub flex justify-between" style="margin-left: 20rpx;border-bottom: 1rpx solid #f1f1f1;">
					<view class="flex-sub">{{item.text}}<text v-if="index==0" style="color: #AAAAAA;font-size: 26rpx;">(可用余额:￥{{balance}})</text></view>
					<text class="check" :class="currentIndex==index?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"></text>
				</view>
			</view>
		</view>
		<button class="pay-btn bg-red" @tap="orderPay">确认支付</button>

		<!-- 支付键盘 -->
		<u-keyboard default="" ref="uKeyboard" mode="number" :mask="true" :mask-close-able="false" :dot-enabled="false"
		 v-model="showPwdModel" :safe-area-inset-bottom="true" :tooltip="false" @change="onChange" @backspace="onBackspace">
			<view>
				<view class="u-text-center u-padding-20" style="line-height: 60rpx;position: relative;">
					<view>请输入密码</view>
					<text class="cuIcon-close" style="position: absolute;
					right: 0;line-height: 60rpx;top: 0;width: 60rpx;font-size: 48rpx;"
					 @tap="hidePayModel"></text>
				</view>
				<view class="u-flex u-row-center">
					<u-message-input mode="box" :maxlength="6" :dot-fill="true" v-model="password" :disabled-keyboard="true" @finish="finish"></u-message-input>
				</view>
				<view class="u-text-right u-padding-top-20 u-padding-bottom-40 u-padding-right-30 tips text-red"><text class="cuIcon-question"></text>忘记密码</view>
			</view>
		</u-keyboard>
		
		<!-- 是否设置密码提醒弹框 -->
		<u-modal v-model="showModel" content="您当前未设置支付密码，请先设置支付密码，或更换支付方式。" cancel-text="设置密码" confirm-text="更换支付方式" cancel-color="red" confirm-color="red" :show-cancel-button="true" :show-title="false" @cancel="setPwd"></u-modal>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payment: [{
						text:"余额支付",
						icon:"/static/mine/pay01.png"
					},{
						text:"微信支付",
						icon:"/static/mine/pay02.png"
					}
				],
				currentIndex: -1,
				showPwdModel: false,
				password: '',
				orderId: 0,
				finalPrice: 0,
				time: "",
				balance: 0,
				isSetPwd:false,
				showModel:false
			};
		},
		onLoad(options) {
			if (options.orderId) {
				this.orderId = parseInt(options.orderId)
				this.finalPrice = parseFloat(options.finalPrice).toFixed(2)
				this.time = options.time
			}	
		},
		onShow() {
			this.getBalance()
		},
		methods: {
			//查询用户余额，判断用户是否设置支付密码
			getBalance() {
				this.$u.post('/api/v1/pay/recookpay/fund/query', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.balance = res.data.data.amount
					this.isSetPwd = res.data.data.havePassword
				});
			},
			//选择支付方式
			choosePayment(i) {
				this.currentIndex = i
			},
			//输入支付密码
			onChange(val) {
				if (this.password.length < 6) {
					this.password += val;
				}

				if (this.password.length >= 6) {
					// 输入密码完成自动关闭键盘
					this.showPwdModel = false
					this.pay();
				}
			},
			//用户点击设置密码
			setPwd(){
				uni.navigateTo({
					url:"../authentication/authentication"
				})
			},
			onBackspace(e) {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			},
			pay() {
				uni.showLoading({
					title: '支付中'
				})
				this.$u.post('/api/v1/pay/recookpay/order/create', {
					userId: uni.getStorageSync("userInfo").id,
					orderId: this.orderId,
					password: this.password
				}).then(res => {
					console.log(res.data);
					//支付完成，密码置空
					this.password = ""
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.reLaunch({
						url:"../paySuccess/paySuccess?orderId="+this.orderId
					})
				});
			},
			//关闭密码支付弹框
			hidePayModel(){
				this.password = ""
				this.showPwdModel = false
			},
			//选择支付方式后点击确认支付按钮
			orderPay() {
				if(this.currentIndex==-1){
					this.$u.toast("请选择支付方式");
					return
				}
				//余额支付
				if (this.currentIndex == 0) {
					// 余额支付判断是否设置支付密码
					if (this.isSetPwd) {
						// 有密码则弹出支付弹框
						this.showPwdModel = true
					} else {
						//没密码弹框提示设置密码/换方式支付
						this.showModel = true
					}
				} else if (this.currentIndex == 1) {//微信支付
					this.$u.post('/api/v1/pay/wxminipay/order/create', {
						userId: uni.getStorageSync("userInfo").id,
						orderId: this.orderId,
						// wxType:"recook-weapp"
					}).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						let result = res.data.data
						wx.requestPayment({
							timeStamp: result.timestamp,
							nonceStr: result.noncestr,
							package: result.package,
							signType: 'MD5',
							paySign: result.sign,
							success: (res) => {
								console.log(res)
								uni.reLaunch({
									url:"../paySuccess/paySuccess?orderId="+this.orderId
								})
							},
							fail: (err) => {
								console.log(err)
								// this.$u.toast(err);
							}
						})

					});


				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.payment-box {
		margin: 200rpx 30rpx 0;

		.plain-item {
			height: 100rpx;
			line-height: 100rpx;
		}

		.check {
			font-size: 36rpx;
		}
	}

	.pay-btn {
		margin: 200rpx 150rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
	}
	.my-model{
		width: 550rpx;
		.content{
			padding: 40rpx 50rpx;
			
		}
		.model-bottom{
			line-height: 80rpx;
			border-top: 1rpx solid #f1f1f1;
		}
	}
</style>
