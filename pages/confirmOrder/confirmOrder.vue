<template>
	<view>
		<view class="tips flex align-center" v-if="tipsShow">
			<view class="flex align-center justify-between">
				<view class="tips-icon">
					<text class="cuIcon-notice"></text>
				</view>
				<view class="tips-center">
					<text>海关提醒：跨境订单订购人和支付人信息不一致，可能会影响订单通关，请务必认证</text>
				</view>
				<view class="tips-right" @click="toRealName">
					<text>去认证 > </text>
				</view>
			</view>
		</view>
		<view class="box flex align-center address-box" @tap="toAddressList">
			<image :src="IMAGE_URL+'/wxapp/add.png'" style="width: 50rpx;" mode="widthFix"></image>
			<view class="flex-sub address-con" v-if="preOrderMsg.addr">
				<view class=""><text class="text-black" style="font-size: 32rpx;margin-right: 15rpx;font-weight: 900;">{{preOrderMsg.addr.receiverName}}</text>{{preOrderMsg.addr.mobile}}</view>
				<view class="address-detail">{{preOrderMsg.addr.province+preOrderMsg.addr.city+preOrderMsg.addr.district+preOrderMsg.addr.address}}</view>
			</view>
			<view class="flex-sub address-con" v-else style="font-size: 30rpx;">请选择收货地址</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="box plain-box">
			<view class="item flex justify-between">
				<view class="">配送方式</view>
				<view class="flex" style="font-size: 26rpx;color: #AAAAAA;">
					快递配送<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="item flex justify-between align-center">
				<view class="">买家留言</view>
				<input type="text" v-model="note" placeholder="留言(选填)" placeholder-class="placeholder" @blur="setNote" />
			</view>
		</view>
		<view class="box goods-msg-box">
			<view v-for="(shop,shopIndex) in preOrderMsg.brands" :key="shopIndex">
				<view class="shop-msg flex align-center">
					<image :src="judgeCover(shop.brandLogoUrl)" style="width: 36rpx;margin-right: 10rpx;" mode="widthFix"></image>
					<view class="">{{shop.brandName}}</view>
				</view>
				<order-goods :goodsList="shop.goods"></order-goods>
				<view class="total-msg flex justify-end" style="line-height: 80rpx;">
					<view style="margin-right: 20rpx;color: #AAAAAA;">共{{shop.brandGoodsTotalCount}}件</view>
					<view style="color: #FA6400;margin-right: 20rpx;">合计{{shop.brandGoodsTotalAmount}}元 </view>
					<!-- <view style="color: #AAAAAA;">省：<text style="color: #FA6400;">{{shop.goods[0].coinAmount}} </text></view> -->
				</view>
			</view>
		</view>

<!-- 		<view class="box coupon-box">
			<view class="item flex justify-between">
				<view class="">优惠券</view>
				<view class="flex num">-￥0.00<text class="cuIcon-right"></text></view>
			</view>
			<view class="item flex justify-between">
				<view class="">瑞币</view>
				<view class="flex-sub flex justify-between" style="padding: 0 20rpx;color: #888;font-size: 24rpx;">
					<view>可用:￥{{preOrderMsg.coinStatus.coin}}</view>
					<view v-if="canUseMoney">本次可抵￥{{preOrderMsg.coinTotalAmount | toFixed(2)}}</view>
						<view v-else>不可用</view>
				</view>
				<u-switch v-model="preOrderMsg.coinStatus.isUseCoin" :disabled="!canUseMoney" active-color="red"
				 inactive-color="#F5F5F5" size="36" @change="changeUseCoin"></u-switch>
			</view>
		</view> -->

		<view class="box order-msg">
			<view class="item flex justify-between">
				<view class="">商品金额</view>
				<view class="num">￥{{preOrderMsg.goodsTotalAmount | toFixed(2)}}</view>
			</view>
			<view class="item flex justify-between">
				<view class="">运费</view>
				<view class="num">+￥{{preOrderMsg.expressTotalFee | toFixed(2)}}</view>
			</view>
			<view class="item flex justify-between">
				<view class="">优惠券</view>
				<view class="num">-￥{{(preOrderMsg.universeCouponTotalAmount+preOrderMsg.brandCouponTotalAmount) | toFixed(2)}}</view>
			</view>
			<view class="item flex justify-between">
				<view class="">省</view>
				<!-- <view class="">瑞币抵扣</view> -->
				<view class="num">-￥{{preOrderMsg.coinTotalAmount | toFixed(2)}}</view>
			</view>
			<view class="item flex justify-between">
				<view class="">实付款</view>
				<view class="text-red">￥{{preOrderMsg.actualTotalAmount | toFixed(2)}}</view>
			</view>
		</view>
		<view class="agree_box" v-if="preOrderMsg.isImport">
			<u-checkbox-group>
				<u-checkbox v-model="agree" shape="circle" active-color="red">同意并接受 </u-checkbox><text style="color: #007AFF;"
				 @click="toPage">《跨境商品用户通知协议》</text>
			</u-checkbox-group>
		</view>
		<view class="" style="height: 200rpx;"></view>
		<view class="bottom-box flex justify-between align-center bg-white">
			<view class="flex align-center">
				<text>实付款</text>
				<text class="text-red" style="font-size: 32rpx;font-weight: 900;">￥{{preOrderMsg.actualTotalAmount | toFixed(2)}}</text>
			</view>
			<block v-if="preOrderMsg.isImport">
				<button class="cu-btn round text-white" :class="agree?'':'prevent'" @tap="submitOrder">提交订单</button>
			</block>
			<block v-else>
				<button class="cu-btn round text-white" @tap="submitOrder">提交订单</button>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree: false, //是否接受协议
				useBalance: false, //是否使用余额
				canUseMoney: true, //是否禁用瑞币
				canUseBalance: true, //是否禁用余额
				IMAGE_URL: this.IMAGE_URL,
				note: "",
				tipsShow: false,
				RealList: [], // 过滤商品不为国内仓和无
				
			};
		},
		computed: {
			preOrderMsg() {

				return this.$store.state.preOrderMsg
			}
		},
		mounted() {},
		watch: {
			preOrderMsg: function(val) {
				console.log("预览订单信息发生改变", this.preOrderMsg)
			}
		},
		onShow() {
			let realInfoStatus = uni.getStorageSync("userInfo").realInfoStatus			
			let newArr = [];
			// 循环过滤
			this.$store.state.preOrderMsg.brands.forEach((value, index) => {
					newArr[index] = value.goods;
					newArr[index] = newArr[index].filter(
						// 过滤商品不为国内仓和无 1和0
						item => item.storehouse !== 0 && item.storehouse !== 1)
			})
			this.canUseMoney = Boolean(newArr[0].length==0)
				// 未实名认证 判断是否需要实名认证
			if (!realInfoStatus) {
				// 过滤商品不为国内仓和无 则需要实名认证
				newArr.map(item => {
					if (item.length) {
						this.tipsShow = true
					}
				})
				// 过滤商品不为国内仓和无
				this.RealList = newArr
			} else {
				// 已实名认证
				this.tipsShow = false
			}

		},
		methods: {
			//判断图片
			judgeCover(val) {
				if(!val){
					return
				}
				let arr = val.split('/')
				if (arr[0] === 'http:' || arr[0] === 'https:') {
					return val
				}
				return this.IMAGE_URL + val
			},
			toPage() {
				uni.navigateTo({
					url: '/packageA/agreement/goods'
				})
			},
			toRealName() {
				uni.navigateTo({
					url: "/packageA/realname/realname"
				})
			},
			// 设置买家留言信息
			setNote() {
				this.$u.post('/api/v1/order_preview/buyer_message/update', {
					userId: uni.getStorageSync("userInfo").id,
					orderId: this.preOrderMsg.id,
					message: this.note
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
				});
			},
			//切换瑞币抵扣开关
			changeUseCoin(value) {
				console.log(value)
				this.$u.post('/api/v1/order_preview/coin_onoff', {
					userId: uni.getStorageSync("userInfo").id,
					previewOrderId: this.preOrderMsg.id,
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let preViewMsg = res.data.data
					this.$store.commit('updatePreOrderMsg', preViewMsg);
				});
			},
			//提交订单
			submitOrder() {
				let submitBool = true
				let realInfoStatus = uni.getStorageSync("userInfo").realInfoStatus
				if (!realInfoStatus) {
					// 用户未实名认证
					this.RealList.map(item => {
						// 未实名认证时 包含国内仓商品和无 商品  不能提交订单
						if (item.length) {
							submitBool = false
						}
					})
				}
				if (!submitBool) {
					// 未实名认证 并且商品包含国内仓商品和无 
					this.$u.toast('请先实名认证', 2000);
					return
				}
				this.$u.post('/api/v1/order/submit', {
					userId: uni.getStorageSync("userInfo").id,
					previewOrderId: this.preOrderMsg.id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					let orderDetail = res.data.data
					let msg = res.data.msg
					// this.$store.commit('setOrderDetail',orderDetail);
					//提交成功
					// uni.redirectTo({
					// 	url: "../orderPay/orderPay?orderId=" + orderDetail.id+"&canUseMoney="+this.canUseMoney,
					// 	success: (res) => {
					// 		this.$u.toast(msg);
					// 	}
					// })
					let orderId =  res.data.data.id
					this.$u.post('/api/v1/pay/wxminipay/order/create', {
						userId: uni.getStorageSync("userInfo").id,
						orderId
						// wxType:"recook-weapp"
					}).then(res2 => {
						console.log(res2);
						if (res2.data.code == "FAIL") {
							this.$u.toast(res2.data.msg);
							return
						}
						let result = res2.data.data
						wx.requestPayment({
							timeStamp: result.timestamp,
							nonceStr: result.noncestr,
							package: result.package,
							signType: 'MD5',
							paySign: result.sign,
							success: (res3) => {
								this.$u.toast('支付完成！', 2000);
								console.log(res3)
								uni.reLaunch({
									url: "../paySuccess/paySuccess?orderId=" + orderId
								})
							},
							fail: (err) => {
								console.log(err)
								this.$u.toast('支付失败！', 2000);
								// this.$u.toast(err);
								// uni.reLaunch({
								// 	url: "/pages/orders/orders?orderId=" + orderId
								// })
							}
						})
					});
				});
			},
			toAddressList() {
				uni.navigateTo({
					url: "/packageA/address/index?fromPage=confirmOrder"
				})
			}
		}
	}
</script>

<style lang="scss">
	.tips {
		margin: 20rpx 30rpx 20rpx 10rpx;
		height: 120rpx;
		padding: 20rpx;
		border-radius: 10rpx 120rpx 120rpx 10rpx;
		background-color: #fff2cb;
		color: #d1893f;
		font-size: 28rpx;

		.tips-icon {
			font-size: 44rpx;
		}

		.tips-center {
			width: 75%;
		}

		// .tips-right{
		// 	width: 180rpx;
		// }
	}

	.prevent {
		color: #C8C9CC !important;
		background: #AAAAAA !important;
		pointer-events: none;
	}

	page {
		background-color: #f3f3f3;
	}

	.agree_box {
		margin: 20rpx 30rpx;
	}

	.box {
		margin: 20rpx 30rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;

		&.address-box {
			padding: 30rpx;
		}

		.address-con {
			font-size: 26rpx;
			color: #666;
			margin: 0 15rpx;

			.address-detail {
				line-height: normal;
				margin-top: 10rpx;
			}
		}

		&.plain-box {
			line-height: 70rpx;
			padding: 20rpx 30rpx;

			input {
				height: 60rpx;
				margin-left: 30rpx;
				text-align: right;
				padding: 0 10rpx;
			}

			.placeholder {
				color: #AAAAAA;
				font-size: 26rpx;
			}
		}

		.cuIcon-right {
			color: #DDDDDD;
			font-size: 36rpx;
		}

		&.goods-msg-box {
			padding: 20rpx 30rpx;

			.shop-msg {
				height: 60rpx;
			}
		}

		// .num {
		// 	font-size: 24rpx;
		// }

		&.coupon-box {
			padding: 20rpx 30rpx;
			line-height: 70rpx;
			font-size: 28rpx;
		}

		&.order-msg {
			padding: 20rpx 30rpx 0;

			.item {
				line-height: 60rpx;

				&:last-child {
					line-height: 100rpx;
					border-top: 1rpx solid #f1f1f1;
				}
			}
		}
	}

	.bottom-box {
		position: fixed;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		bottom: 0;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);
		z-index: 1000;

		button {
			background-image: linear-gradient(to right, #F37211, #F84A06);
		}
	}
</style>
