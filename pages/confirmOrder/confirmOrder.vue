<template>
	<view>
		<view class="box flex align-center address-box" @tap="toAddressList">
			<image src="../../static/index/add.png" style="width: 50rpx;" mode="widthFix"></image>
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
			<view class="item flex justify-between">
				<view class="">买家留言</view>
				<input type="text" value="" placeholder="留言(选填)" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="box goods-msg-box">
			<view v-for="(shop,shopIndex) in preOrderMsg.brands" :key="shopIndex">
				<view class="shop-msg flex align-center">
					<image :src="IMAGE_URL+shop.brandLogoUrl" style="width: 36rpx;margin-right: 10rpx;" mode="widthFix"></image>
					<view class="">{{shop.brandName}}</view>
				</view>
				<order-goods :goodsList="shop.goods"></order-goods>
				<view class="total-msg flex justify-end" style="line-height: 80rpx;">
					<view style="margin-right: 20rpx;color: #AAAAAA;">共{{shop.brandGoodsTotalCount}}件</view>
					<view style="color: #FA6400;">合计{{shop.brandGoodsTotalAmount}}元</view>
				</view>
			</view>
		</view>

		<view class="box coupon-box">
			<view class="item flex justify-between">
				<view class="">优惠券</view>
				<view class="flex num">-￥0.00<text class="cuIcon-right"></text></view>
			</view>
			<view class="item flex justify-between">
				<view class="">瑞币</view>
				<view class="flex-sub flex justify-between" style="padding: 0 20rpx;color: #888;font-size: 24rpx;">
					<view>可用:￥{{preOrderMsg.coinStatus.coin}}</view>
					<view>本次可抵￥{{preOrderMsg.coinTotalAmount | toFixed(2)}}</view>
				</view>
				<u-switch v-model="preOrderMsg.coinStatus.isUseCoin" active-color="red" inactive-color="#F5F5F5" size="36" @change="changeUseCoin"></u-switch>
			</view>
			<!-- <view class="item flex justify-between">
				<view class="">余额</view>
				<view class="flex-sub flex justify-between" style="padding: 0 20rpx;color: #888;font-size: 24rpx;">
					<view>可用:￥5.00</view>
					<view>本次可抵￥5.00</view>
				</view>
				<u-switch v-model="useBalance" :disabled="canUseBalance" active-color="red" inactive-color="#F5F5F5" size="36"></u-switch>
			</view> -->
		</view>

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
				<view class="">瑞币抵扣</view>
				<view class="num">-￥{{preOrderMsg.coinTotalAmount | toFixed(2)}}</view>
			</view>
			<!-- <view class="item flex justify-between">
				<view class="">余额抵扣</view>
				<view class="num">-￥0.00</view>
			</view> -->
			<view class="item flex justify-between">
				<view class="">实付款</view>
				<view class="text-red">￥{{preOrderMsg.actualTotalAmount | toFixed(2)}}</view>
			</view>
		</view>
		<view class="" style="height: 200rpx;"></view>
		<view class="bottom-box flex justify-between align-center bg-white">
			<view class="flex align-center">
				<text>实付款</text>
				<text class="text-red" style="font-size: 32rpx;font-weight: 900;">￥{{preOrderMsg.actualTotalAmount | toFixed(2)}}</text>
			</view>
			<button class="cu-btn round text-white" @tap="submitOrder">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				useBalance: false, //是否使用余额
				canUseMoney: true, //是否禁用瑞币
				canUseBalance: true, //是否禁用余额
				IMAGE_URL: this.IMAGE_URL
			};
		},
		computed: {
			preOrderMsg() {
				return this.$store.state.preOrderMsg
			}
		},
		watch: {
			preOrderMsg: function(val) {
				console.log("预览订单信息发生改变")
			}
		},
		onShow() {
			console.log(this.preOrderMsg)
		},
		methods: {
			changeUseCoin(value){
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
					uni.redirectTo({
						url: "../orderDetail/orderDetail?orderId=" + orderDetail.id + "&type=waitPay",
						success: (res) => {
							this.$u.toast(msg);
						}
					})
				});

			},
			toAddressList() {
				uni.navigateTo({
					url: "../address/index?fromPage=confirmOrder"
				})
			},
			getAddress() {
				this.$u.post('/api/v1/users/address/list', {
					UserID: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let addresslist = res.data.data
					if (addresslist.length == 0) {
						//没有地址
						return
					}
					for (let i = 0; i < addresslist.length; i++) {
						if (addresslist[i].isDefault == 1) {
							// 用户的地址列表里面设置了默认地址
							this.addressMsg = addresslist[i]
							break
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
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
				max-height: 500rpx;
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
