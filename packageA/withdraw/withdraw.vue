<template>
	<view>
		<view class="mask" v-if="!canWithdrawn">
			<view class="top-msg flex justify-between">
				<view><text class="cuIcon-notification" style="margin-right: 5rpx;"></text>请先做实名认证再提现</view>
				<view @tap="toRealname">去认证<text class="cuIcon-right"></text></view>
			</view>
		</view>
		<view class="bg-white text-black" style="padding: 30rpx;">
			<view class="flex justify-between" style="margin-bottom: 20rpx;line-height: 40rpx;">
				<view class="" style="font-size: 32rpx;">提现金额(元)</view>
				<view class="" @tap="toWithdrawRecord">提现记录<text class="cuIcon-right"></text></view>
			</view>
			<view class="input-box flex justify-between">
				<text style="font-size: 48rpx;">￥</text>
				<input class="flex-sub" v-model="money" type="digit" value="" :placeholder="'本次最多可提现'+balance+'元'" @blur='balanceBlur'
				 placeholder-class="place" />
				<view class="text-red" @tap="allBalance">全部</view>
			</view>
			<view class="" style="padding-left: 48rpx;" v-if="errorShow && msgError">
				<text class="text-red" style="font-size: 24rpx;">{{msgError}}</text>
			</view>
		</view>
		<u-radio-group v-model="checkPlain" active-color="red" @change="radioGroupChange">
			<view class="where flex">
				<view class="flex-sub flex justify-center" v-for="(item, index) in list" :key="index">
					<u-radio :name="item.name">提现到{{item.name}}</u-radio>
				</view>
			</view>
		</u-radio-group>
		<view class="center-con">
			<view class="flex align-center" style="height: 80rpx;">姓名：{{name}}</view>
			<input class="center-input" v-model="content" value="" type="number" :placeholder="'请输入'+checkPlain+'账号(提现仅供本人账户)'" />
			<!-- <view class="bank-num" style="margin-bottom: 40rpx;">2047 3729 2822 0453</view> -->
			<view class="center-tip">
				提现小助手<text class="cuIcon-question" @tap="tipModel(true)"></text>
			</view>
			<view class="intro">
				现在申请提现，将在
				<text class="text-black">每月10号,每月25号</text>
				审核，审核成功后，预计
				<text class="text-black">3</text>
				个工作日到账，实际到账时间以落地处理结果为准。
			</view>
			<button class="btn bg-red cu-btn block lg" :class="errorShow?'prevent':''" @tap="withdraw" >申请提现</button>
			<view class="center-bottom flex align-center">
				<text :class="isAgree?'cuIcon-squarecheckfill text-red':'cuIcon-square'" @tap="setAgree"></text>
				请同意<text class="text-red" @tap="toPage">《共享经济合作伙伴协议》</text>后进行提现
			</view>
		</view>


		<!-- 支付键盘 -->
		<u-keyboard default="" ref="uKeyboard" mode="number" :mask="true" :mask-close-able="false" :dot-enabled="false"
		 v-model="showPwdModel" :safe-area-inset-bottom="true" :tooltip="false" @change="onChange" @backspace="onBackspace">
			<view class="keyboard">
				<view class="u-text-center u-padding-20 money" style="line-height: 60rpx;position: relative;">
					<view>请输入密码</view>
					<text class="cuIcon-close keyboard-close" @tap="hidePayModel"></text>
				</view>
				<view class="u-flex u-row-center">
					<u-message-input mode="box" :maxlength="6" :dot-fill="true" v-model="password" :disabled-keyboard="true" @finish="finish"></u-message-input>
				</view>
				<view class="u-text-right u-padding-top-20 u-padding-bottom-40 u-padding-right-30 tips text-red"><text class="cuIcon-question"
					 @click="setPwd"></text>忘记密码</view>
			</view>
		</u-keyboard>

		<!-- 是否设置密码提醒弹框 -->
		<u-modal v-model="showModel" content="您当前未设置密码，请先设置密码" confirm-text="设置密码" confirm-color="red" :show-cancel-button="true"
		 @confirm="setPwd"></u-modal>

		<!-- 提现助手弹框 -->
		<u-popup v-model="showTipModel" mode="center" border-radius="10" :mask-close-able="false">
			<view class="tip-model">
				<view class="bg-box text-center text-white">
					<image :src="STATIC_URL+'wd-bg.png'" style="width: 100%;" mode="widthFix"></image>
					<view class="bg-con flex flex-direction justify-center">
						<view style="font-size: 32rpx;">谨记小助手提示</view>
						<view style="font-size: 36rpx;margin-top: 20rpx;">大幅提升提现成功率</view>
					</view>
				</view>
				<view class="tip-con" style="padding: 40rpx 30rpx 20rpx;">
					<view class="tip-item flex align-start">
						<image :src="IMAGE_URL + '/mine/t-tip.png'" mode="widthFix"></image>
						<view class="flex-sub clear">
							<view class="">提现需要审核，每个月的<text class="text-red">10日和25日</text>，是提现审核日</view>
							<view class="text-red">审核日当天17:00前提交申请，可在当天审核</view>
						</view>
					</view>
					<view class="tip-item flex align-start">
						<image :src="IMAGE_URL + '/mine/t-tip.png'" mode="widthFix"></image>
						<view class="flex-sub clear">
							<view class="">提现可以选择储蓄卡。收款账户信息需要和您的会员名称保持一致</view>
							<view class="text-red">(您的会员名称：{{name}})</view>
						</view>
					</view>
					<view class="tip-item flex align-start">
						<image :src="IMAGE_URL + '/mine/t-tip.png'" mode="widthFix"></image>
						<view class="flex-sub clear">
							<view class="">审核成功后，需要等待3个工作日，资金才会到达账户</view>
							<view class="text-red">(您的会员名称：{{name}})</view>
						</view>
					</view>
					<view class="tip-item flex align-start">
						<image :src="IMAGE_URL + '/mine/t-tip.png'" mode="widthFix"></image>
						<view class="flex-sub clear">
							<view class="">单笔金额需<text class="text-red">大于10元</text>以上才可提现</view>
						</view>
					</view>
				</view>
				<view style="padding: 30rpx;">
					<button class="text-white bg-red" style="border-radius: 50rpx;" @tap="tipModel(false)">我知道了</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				errorShow: true,
				msgError: null,
				balanceAmount: 0,
				STATIC_URL: this.STATIC_URL,
				canWithdrawn: true, //是否认证
				showPwdModel: false,
				password: '',
				showTipModel: false,
				money: "",
				balance: 0,
				content: "",
				isSetPwd: false,
				sendData: {},
				showModel: false,
				name: "",
				isAgree: false,
				list: [{
						name: '支付宝'
					},
					{
						name: '银行卡'
					}
				],
				checkPlain: ""
			}
		},
		onShow() {
			this.canWithdrawn = uni.getStorageSync("userInfo").realInfoStatus
			this.name = uni.getStorageSync("userInfo").realName
			this.isAgree = uni.getStorageSync("withdrawAgree")
			// 查询用户是否设置密码及余额信息
			this.checkPwd()
		},
		methods: {
			balanceBlur() {
				this.money = parseFloat(this.money)
				this.money = this.money.toFixed(2)
				let re = /^[0-9]+.?[0-9]*/;
				if (!re.test(this.money)) {
					this.errorShow = true
					this.msgError = '请输入可提现金额'
					return
				}
				if (this.money < 10) {
					this.errorShow = true
					this.msgError = '低于10元不能提现'
					return
				} else if (this.money > this.balance) {
					this.errorShow = true
					this.msgError = '提现金额不能大于能提现总金额'
					return
				} else {
					this.errorShow = false
					this.msgError = ''
					return
				}


			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
				this.checkPlain = e
			},
			setAgree() {
				this.isAgree = !this.isAgree
				uni.setStorageSync("withdrawAgree", this.isAgree)
			},
			toPage(){
				// 	<navigator  url="../../packageA/goodsCart/index" style="width: 100rpx;text-align: center;">
				// https://h5.reecook.cn/agreement.html
				let src = 'https://h5.reecook.cn/agreement.html'
				uni.navigateTo({
					url:'../../packageA/agreement/share?src='+src
				})
			},
			//点击全部
			allBalance() {
				if (this.balance == 0) {
					this.$u.toast("当前账户没有可提现余额");
					return
				}
				this.money = this.balance
				this.balanceBlur()
			},
			toRealname() {
				uni.navigateTo({
					url: "/packageA/realname/realname"
				})
			},
			toWithdrawRecord() {
				uni.navigateTo({
					url: "/packageA/withdrawRecord/withdrawRecord"
				})
			},
			onChange(val) {
				if (this.password.length < 6) {
					this.password += val;
				}

				if (this.password.length >= 6) {
					// 输入密码完成自动关闭键盘
					this.showPwdModel = false
					this.sendData.password = this.password
					this.pay();
				}
			},
			onBackspace(e) {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			},
			pay() {
				uni.showLoading({
					title: '申请中'
				})
				this.$u.post('/api/v1/wallet/balance/balance_withdraw', this.sendData).then(res => {
					console.log(res.data);
					//密码输入完成，密码置空
					uni.hideLoading();
					this.password = ""
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					// this.showPwdModel = false;
					this.money = ""
					uni.navigateTo({
						url: "/packageA/withdrawProgress/withdrawProgress"
					})
				});
			},
			pwdModel(flag) {
				this.password = '';
				this.showPwdModel = flag;
			},
			finish() {
				console.log(11111)
			},
			withdraw() {
				// console.log(this.money)
				if (!this.money) {
					this.$u.toast("请输入提现金额");
					return
				}
				if (!this.checkPlain) {
					this.$u.toast("请选择一种提现方式");
					return
				}
				this.sendData = {
					userID: uni.getStorageSync("userInfo").id,
					amount: parseFloat(this.money)
				}
				// 下面选择提现银行卡时
				if (this.checkPlain == "银行卡") {
					if (!this.content) {
						this.$u.toast("请输入银行卡号");
						return
					}
					this.sendData.bankAccount = this.content
				}


				// 下面选择提现支付宝时
				if (this.checkPlain == "支付宝") {
					if (!this.content) {
						this.$u.toast("请输入支付宝账号");
						return
					}
					this.sendData.alipay = this.content
				}


				if (!this.isAgree) {
					this.$u.toast("请先阅读并勾选协议");
					return
				}
				//判断是否设置密码
				if (this.isSetPwd) {
					//设置了密码则弹出密码输入键盘
					this.showPwdModel = true
				} else {
					//没密码弹框提示设置密码
					this.showModel = true
				}
			},
			//用户点击设置密码
			setPwd() {
				uni.navigateTo({
					url: "../authentication/authentication"
				})
			},
			hidePayModel() {
				this.showPwdModel = false
			},
			//判断是否设置密码
			checkPwd() {
				this.$u.post('/api/v1/pay/recookpay/fund/query', {
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.isSetPwd = res.data.data.havePassword
					this.balance = res.data.data.amount
				});
			},
			tipModel(flag) {
				this.showTipModel = flag
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
.prevent{
	pointer-events:none
}
	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.6);
		z-index: 10;

		.top-msg {
			line-height: 80rpx;
			background-color: #FFF5E1;
			color: #E9A213;
			padding: 0 30rpx;
		}
	}

	.input-box {
		line-height: 100rpx;
		font-size: 32rpx;

		input {
			height: 100rpx;
			font-size: 60rpx;
			padding: 0 10rpx;
		}

		.place {
			font-size: 30rpx;
			color: #DDDDDD;
		}
	}

	.where {
		padding: 30rpx 0;
		// border-top: 1rpx solid #f1f1f1;
		// border-bottom: 1rpx solid #f1f1f1;

		.nocheck {
			color: #999;
		}
	}

	.btn {
		color: #FFFFFF;
		margin: 15rpx 0 10rpx;
	}

	.tips {
		color: $u-tips-color;
	}

	.tip-model {
		width: 670rpx;

		.bg-box {
			position: relative;

			.bg-con {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
		}

		.tip-item {
			padding: 15rpx 0;
			line-height: 36rpx;

			image {
				width: 34rpx;
			}
		}
	}

	.my-model {
		width: 550rpx;

		.title {
			padding-top: 30rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #333;
		}

		.content {
			padding: 30rpx 50rpx;

		}
	}

	.keyboard {
		.keyboard-close {
			position: absolute;
			right: 0;
			line-height: 60rpx;
			top: 0;
			width: 60rpx;
			font-size: 48rpx;
		}
	}

	.center-con {
		margin: 0 30rpx;

		.center-input {
			margin-bottom: 40rpx;
			// border-bottom: 1rpx solid #f1f1f1;
			height: 80rpx;
		}

		.center-tip {
			line-height: 40rpx;
			margin-bottom: 60rpx;
			font-size: 26rpx;
		}

		.intro {
			font-size: 24rpx;
			color: #999999;
		}

		.center-bottom {
			font-size: 24rpx;
			color: #999999;
			line-height: 60rpx;
		}
	}
</style>
