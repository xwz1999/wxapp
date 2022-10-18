<template>
	<view>
		<view class="box flex align-center address-box" @tap="toAddressList">
			<image :src="IMAGE_URL+'/wxapp/add.png'" style="width: 50rpx;" mode="widthFix"></image>
			<view class="flex-sub address-con" v-if="preOrderMsg.Addr">
				<view class=""><text class="text-black" style="font-size: 32rpx;margin-right: 15rpx;font-weight: 900;">{{preOrderMsg.Addr.name}}</text>{{preOrderMsg.Addr.mobile}}</view>
				<view class="address-detail">{{preOrderMsg.Addr.province+preOrderMsg.Addr.city+preOrderMsg.Addr.district+preOrderMsg.Addr.address}}</view>
			</view>
			<view class="flex-sub address-con" v-else style="font-size: 30rpx;">请选择收货地址</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="box plain-box">
			<view class="item flex justify-between align-center">
				<view class="">买家留言</view>
				<input type="text" v-model="note" placeholder="留言(选填)" placeholder-class="placeholder" @blur="setNote" />
			</view>
		</view>
		<view class="box goods-msg-box">
		<!-- 	<view v-for="(goods,shopIndex) in preOrderMsg.sku_list" :key="shopIndex">
				<wholesaleOrderGoods :goodsList="goods"></wholesaleOrderGoods>
			</view> -->
			<wholesale-order-goods :isConfirm=true :goodsList="preOrderMsg.sku_list"  ></wholesale-order-goods>
		</view>

		<view class="box">
			<view class="flex justify-between" style="padding: 30rpx 40rpx ">
				<view class="">商品总价</view>
			
				<view class="num">	<text style="font-size: 22rpx;color: #999999;padding-right: 10rpx;padding-bottom: 5rpx;">共{{preOrderMsg.sku_list[0].quantity}}件</text>￥{{preOrderMsg.total  | toFixed(2)}}</view>
			</view>

		</view>

		<view class="" style="height: 200rpx;"></view>
		
		<view style="position: fixed;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		bottom: 100rpx;
		background-color:#F3E3E4 ;padding: 10rpx 20rpx;
		z-index: 1000;">
		<text style="color:#D5101A ;font-size: 24rpx;">温馨提示:1、提交订单后，物流费将由平台跟供应商确认并反馈\n</text>
		<text style="color:#D5101A ;font-size: 24rpx;padding-left: 100rpx;">2、节假日期间批发业务暂不处理。</text>
		</view>
		
		<view class="bottom-box flex justify-between align-center bg-white">
			<view class="flex align-center">
			</view>

			<block >
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
				canUseBalance: true, //是否禁用余额
				IMAGE_URL: this.IMAGE_URL,
				note: "",
				description: '重要提醒：请谨防网络及客服诈骗！瑞库客不会以订单异常、系统维护等情况为由，要求你进行退款操作',
				
			};
		},
		computed: {
			preOrderMsg() {
				console.log(this.$store.state.preOrderMsg)
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

		},
		onLoad() {
			console.log(this.$store.state.preOrderMsg)
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
				uni.setStorageSync("buyMessage", this.note)
				this.$u.post('/api/v2/app/order/update', {
					preview_id: this.preOrderMsg.preview_id,
					address_id: this.preOrderMsg.Addr.id,
					buyer_message:this.note
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					
				});
			},
			//提交订单
			submitOrder() {
			console.log(this.preOrderMsg)
				this.$u.post('/api/v1/order/submit', {
					userId: uni.getStorageSync("userInfo").id,
					previewOrderId: this.preOrderMsg.preview_id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg, 2000);
						return
					}
					let orderDetail = res.data.data
					let msg = res.data.msg
					uni.redirectTo({
						url: "../pifaOrderDetail/pifaOrderDetail?orderId=" + orderDetail.id
					})
				});
			},
			toAddressList() {
				uni.navigateTo({
					url: "/packageA/address/index?fromPage=pifaConfirmOrder"
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
			padding: 20rpx 30rpx 0 20rpx;

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
