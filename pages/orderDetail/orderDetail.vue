<template>
	<view>
		<view class="isLoading bg-white flex flex-direction justify-center align-center"
			style="height: 100vh;width: 100vw;" v-if="showLoading">
			<image :src="IMAGE_URL+'/wxapp/loading-white.gif'" mode="widthFix" style="width:500upx"></image>
		</view>
		<view class="" v-else>
			<view class="waitpay text-white" v-if="orderDetail.status==0">
				<view style="font-size: 36rpx;">等待付款</view>
				<view class="" v-if="countdownTime>0">倒计时：<u-count-down :timestamp="countdownTime" :show-days="false"
						separator-color="#fff" separator="zh" bg-color="transparent" color="#fff"></u-count-down>
				</view>
				<view class="" v-else>支付到期时间：{{orderDetail.expireTime}}</view>
			</view>
			<view class="waitpay text-white" v-else>
				<view style="font-size: 36rpx;">{{title}}</view>
				<view style="font-size: 28rpx;">{{subTitle}}</view>
			</view>
			<view class="box flex align-center address-box">
				<image :src="IMAGE_URL+'/wxapp/add.png'" style="width: 50rpx;" mode="widthFix"></image>
				<view class="flex-sub address-con">
					<view class=""><text class="text-black"
							style="font-size: 32rpx;margin-right: 15rpx;font-weight: 900;">{{orderDetail.addr.receiverName}}</text>{{orderDetail.addr.mobile}}
					</view>
					<view class="address-detail">
						{{orderDetail.addr.province+orderDetail.addr.city+orderDetail.addr.district+orderDetail.addr.address}}
					</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="box goods-msg-box" v-if="orderDetail">
				<view v-for="(shop,shopIndex) in orderDetail.brands" :key="shopIndex">
					<view class="shop-msg flex align-center">
						<image :src="IMAGE_URL+shop.brandLogoUrl" style="width: 36rpx;margin-right: 10rpx;"
							mode="widthFix"></image>
						<view class="">{{shop.brandName}}</view>
					</view>
					<!-- orderDetail.status -->
					<!-- <order-goods :goodsList="shop.goods" :orderType="1"  ></order-goods> -->
					<view class="goods-box">
						<view v-for="(item,index) in shop.goods" :key="index">
							<view class="goods-item flex">
								<view class="">
									<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId"
										hover-stop-propagation @tap.stop="" class="goods-pic" hover-class=“none”>
										<view class="goods-pic-image">
											<u-lazy-load threshold="-100" :image="judgeCover(item.mainPhotoUrl)"
												:index="index" height="200" border-radius="10"
												:loading-img="IMAGE_URL + '/wxapp/null05.png'"
												:error-img="IMAGE_URL + '/wxapp/null05.png'" img-mode="aspectFill">
											</u-lazy-load>
										</view>
										<view class="goods-pic-flex">
											<view class="goods-con flex-sub flex flex-direction justify-between">
												<view class="">
													<view class="goods-name two-line">{{item.goodsName}}</view>
													<view class="goods-spec-con flex justify-between">
														<view class="goods-spec text-hidden">{{item.skuName}}</view>
														<view class="goods-num">×{{item.quantity}}</view>
														<!-- <view class="goods-num" style="color:#aaa;">×{{item.quantity}}</view> -->
													</view>
													<view class="flex align-center" style="margin:10rpx 0;">
														<view class="align-center justify-start" v-if="item.isFerme">
															<view class="tab_ferme">包税</view>
														</view>
														<view class="" style="font-size: 20rpx;color: #FA6400;"
															v-if="item.storehouse">
															<text>不支持7天无理由退换货</text>
														</view>
													</view>
												</view>
												<view class="flex justify-between"
													style="font-size: 28rpx;color: #FA6400;">
													<view class="flex">￥{{item.unitPrice - item.coinAmount | toFixed(2)}}<text>(折后价)</text> </view>
													<!-- <view class="">
														<view v-if="item.rStatus !=='待发货' && item.rStatus !=='已发货'">
															<button v-if="item.rStatus"
																style="color: #FA6400;height: 40rpx;font-size: 28rpx;"
																class="cu-btn lines-gray text-gray round"
																hover-stop-propagation
																@click="toAfterSaleDetail(item.goodsDetailId)">{{item.rStatus}}</button>
														</view>
														<view v-else="item.rStatus">{{item.rStatus}}</view>
													</view> -->
												</view>
											</view>
										</view>
									</navigator>
								</view>
							</view>
							<view class="goods-bottom flex justify-end">
							<view class="goods-bottom flex justify-end"
								style="font-size: 28rpx;color: #FA6400;">
								<view class="flex"></view>
								<view class="">
									<view v-if="item.rStatus !=='待发货' && item.rStatus !=='已发货'">
										<button v-if="item.rStatus"
											style="color: #FA6400;height: 40rpx;font-size: 28rpx;"
											class="cu-btn lines-gray text-gray round"
											hover-stop-propagation
											@click="toAfterSaleDetail(item.goodsDetailId)">{{item.rStatus}}</button>
									</view>
									<view v-else="item.rStatus">{{item.rStatus}}</view>
								</view>
							</view>
							<view class="goods-bottom flex justify-end" style="margin: 10rpx 0;"
								v-if="item.rStatus=='待发货' && orderDetail.status !== 2">
								<button class="cu-btn lines-gray text-gray round" hover-stop-propagation
									@tap.stop="returnMoney(item.goodsDetailId)">申请退款</button>
							</view>
							<view class="goods-bottom flex justify-end" style="margin: 10rpx 0;"
								v-if="item.rStatus=='已发货' && orderDetail.status !== 2">
								<button class="cu-btn lines-gray text-gray round" hover-stop-propagation
									@tap.stop="toChooseType(item)">申请售后</button>
							</view>
						</view>
						</view>
					</view>

				</view>
				<view class="total-msg flex justify-end text-black"
					style="line-height: 80rpx;border-top:1rpx solid #EEEEEE;">
					<view style="margin-right: 20rpx;">共{{goodsTotal.totalNumber}}件商品</view>
					<view>合计{{goodsTotal.totalPrice | toFixed(2)}}元</view>
				</view>
			</view>
			<view class="pay-msg bg-white">
				<view class="item flex justify-between">
					<view class="">商品金额</view>
					<view class="">￥{{orderDetail.goodsTotalAmount | toFixed(2)}}</view>
				</view>
				<view class="more-con" :class="isShow?'showMore':''">
					<view class="item flex justify-between">
						<view class="">运费</view>
						<view class="">+￥{{orderDetail.expressTotalFee | toFixed(2)}}</view>
					</view>
					<view class="item flex justify-between">
						<view class="">优惠券</view>
						<view class="">
							-￥{{(orderDetail.universeCouponTotalAmount+orderDetail.brandCouponTotalAmount) | toFixed(2)}}
						</view>
					</view>
			<!-- 		<view class="item flex justify-between">
						<view class="">省</view>
						<view class="">瑞币抵扣</view>
						<view class="">-￥{{orderDetail.coinTotalAmount | toFixed(2)}}</view>
					</view> -->
				</view>
				<view class="item flex justify-between"
					style="border-top: 1rpx solid #f1f1f1;font-size: 30rpx;line-height: 80rpx;">
					<view class="text-black">实付款</view>
					<view class="text-red">￥{{orderDetail.actualTotalAmount | toFixed(2)}}</view>
				</view>
				<view class="item text-center flex align-center justify-center" @tap="showMore">
					<view class="">{{isShow?'收起':'查看更多'}}</view>
					<text :class="isShow?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
				</view>
			</view>
			<view class="box order-msg">
				<view class="item flex">
					<view class="span">订单编号</view>
					<view class="num flex align-center">{{orderDetail.id}}<text class="copy" @tap="copy">复制</text>
					</view>
				</view>
				<view class="item flex">
					<view class="span">下单时间</view>
					<view class="num">{{orderDetail.createdAt}}</view>
				</view>
				<view class="item flex" v-if="orderDetail.payTime">
					<view class="span">付款时间</view>
					<view class="num">{{orderDetail.payTime}}</view>
				</view>
				<view class="item flex">
					<view class="span">买家留言</view>
					<view class="num">{{orderDetail.buyerMessage}}</view>
				</view>
				<!-- <view class="item flex">
					<view class="span">销售额 <text class="cuIcon-question" style="padding-left: 8rpx;" @click="queston"></text></view>
					<view class="text-black">￥{{orderDetail.salesVolume | toFixed(2)}}</view>
				</view> -->
				<!-- <button open-type='contact' class='customer-service'> -->
				<button @tap.stop="startChat()" class='customer-service' >
					<view class="item flex justify-center">
						<view class="text-black" style="font-size: 28rpx;">
							<u-icon name="server-fill" size="28" class="text-black" style="padding-right: 20rpx;">
							</u-icon>联系客服
						</view>
					</view>
				</button>
			</view>
			<view class="" style="height: 120rpx;"></view>
			<view class="bottom-box flex align-center justify-end bg-white">

				<template v-if="orderDetail.status==0">
					<button class="cu-btn round lines-gray" style="margin-right: 20rpx;"
						@tap="cancelOrder">取消订单</button>
					<button class="cu-btn round lines-red" @tap="toOrderPay">继续支付</button>
				</template>
				<template v-if="orderDetail.status==1&&orderDetail.expressStatus!=0">
					<button class="cu-btn round lines-gray" style="margin-right: 20rpx;"
						@tap="checkExpress">查看物流</button>
					<button class="cu-btn round lines-red" @tap="confirmGet">确认收货</button>
				</template>
				<template v-if="orderDetail.status==2||orderDetail.status==3||orderDetail.status==5">
					<button class="cu-btn round  lines-red" @tap="deleteOrder">删除订单</button>
				</template>
				<template v-if="orderDetail.status==4">
					<button class="cu-btn round lines-gray" @tap="evaluate">立即评价</button>
				</template>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				orderId: null,
				orderDetail: [],
				showLoading: true,
				isShow: false,
				countdownTime: 0,
				title: "",
				subTitle: "",
				workGroupWid:"2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
			};
		},
		computed: {
			// 商品数量和商品金额合计
			goodsTotal() {
				let goosData = {
					totalPrice: 0,
					totalNumber: 0
				}
				if (!this.orderDetail.brands) {
					return
				}
				this.orderDetail.brands.map(item => {
					goosData.totalNumber += item.brandGoodsTotalCount
					goosData.totalPrice += item.brandGoodsTotalAmount
				})
				return goosData
			}
		},
		methods: {
			startChat () {
			  // console.log('start chat')
			  uni.navigateTo({
			  	url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=联系客服'
			  });
			},
			queston() {

			},
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
			//跳转详情
			// OrdersDetails(id,index){
			// 	uni.navigateTo({
			// 		url:"/pages/goodsDetail/goodsDetail?goodsId=" + id
			// 	})
			// }
			//未发货申请退款
			returnMoney(id) {
				uni.showModal({
					title: '提示',
					content: '确认申请退款吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/refund', {
								userId: uni.getStorageSync("userInfo").id,
								orderGoodsIDs: [id],

							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								this.getOrderDetail()
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 售后详情
			toAfterSaleDetail(id) {
				console.log(id)
				// uni.navigateTo({
				// 	url: "/pages/chooseAftersaleType/chooseAftersaleType"
				// })
				uni.navigateTo({
					url: "/pages/afterSaleDetail/afterSaleDetail?orderGoodsId=" + id
				})
			},
			toChooseType(obj) {
				this.$store.commit('setReturnGoodsMsg', obj);
				uni.navigateTo({
					url: "/pages/chooseAftersaleType/chooseAftersaleType"
				})
			},
			showMore() {
				this.isShow = !this.isShow
			},

			getOrderDetail() {
				this.$u.post('/api/v1/order/detail', {
					userId: uni.getStorageSync("userInfo").id,
					orderId: this.orderId,
				}).then(res => {
					console.log(res.data);
					this.showLoading = false
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.orderDetail = res.data.data
					switch (this.orderDetail.status) {
						case 0:
							let finishTime = new Date(this.orderDetail.expireTime).getTime()
							let nowTime = new Date().getTime()
							this.countdownTime = (finishTime - nowTime) / 1000
							break;
						case 1:
							switch (this.orderDetail.expressStatus) {
								case 0:
									this.title = "买家已付款"
									this.subTitle = "等待卖家发货"
									break;
								case 1:
									this.title = "部分商品已发货"
									this.subTitle = "商品正在赶往您的路上哦"
									break;
								case 2:
									this.title = "全部商品已发货"
									this.subTitle = "商品正在赶往您的路上哦"
									break;
							}
							break;
						case 2:
							this.title = "订单已取消"
							this.subTitle = "请重新购买"
							break;
						case 3:
							this.title = "订单已过期"
							this.subTitle = "请重新购买"
							break;
						case 4:
							this.title = "订单已完成"
							this.subTitle = "请重新购买"
							break;
						case 5:
							this.title = "订单已关闭"
							this.subTitle = ""
							break;
						default:
							break;
					}
				});
			},
			toOrderPay() {
				// 跳转支付页面携带参数（支付价格，创建时间）
				// uni.navigateTo({
				// 	url: "../orderPay/orderPay?orderId=" + this.orderId
				// })
				let orderId = this.orderId
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
							console.log(res3)
							this.$u.toast('支付完成！', 2000);
							uni.reLaunch({
								url: "../paySuccess/paySuccess?orderId=" + orderId
							})
						},
						fail: (err) => {
							console.log(err)
							this.$u.toast('支付失败！', 2000);
							// this.$u.toast(err);
						}
					})

				});
			},
			//取消订单
			cancelOrder() {
				uni.showModal({
					title: '提示',
					content: '确认要取消该订单吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/cancel', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: this.orderId,
							}).then(res => {
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.showToast({
									title: "订单已取消",
									mask: true,
									success: () => {
										setTimeout(function() {
											uni.navigateBack()
											uni.$emit("cancelOrderSuccess", {
												msg: '订单已取消',
											});
										}, 1000)
									}
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//确认收货
			confirmGet() {
				uni.showModal({
					title: '提示',
					content: '确认收货吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/receipt/confirm', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: this.orderId,
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.showToast({
									title: "已确认收货",
									mask: true,
									success: () => {
										setTimeout(function() {
											uni.navigateBack()
										}, 1000)
									}
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//删除订单
			deleteOrder() {
				uni.showModal({
					title: '提示',
					content: '确认删除该订单吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/delete', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: this.orderId,
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.showToast({
									title: "订单已删除",
									mask: true,
									success: () => {
										setTimeout(function() {
											uni.$emit("cancelOrderSuccess", {
												msg: '订单已删除',
											});
											uni.navigateBack()
										}, 1000)
									}
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//查看物流
			checkExpress() {
				uni.navigateTo({
					url: "../logisticsList/logisticsList?orderId=" + this.orderId
				})
			},
			evaluate() {
				this.$u.toast("暂未开放");
			},
			copy() {
				uni.setClipboardData({
					data: this.orderDetail.id.toString(),
					success: function() {
						console.log('success');
					}
				})
			}
		},
		onLoad(options) {
			console.log(options)

			if (options.orderId) {
				this.orderId = parseInt(options.orderId)
			}
		},
		onShow() {
			this.getOrderDetail()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.customer-service {

		margin: 0;
		padding: 0;
		line-height: 0;
		border: none;
		background-color: rgba(0, 0, 0, 0);
		border-radius: 0;
		border: none;
		color: #FFFFFF;

		// &button{
		// 	margin:0;
		// 	padding: 0;
		// 	line-height: 0;
		// }
		// &button
		&::after {
			border: none;
		}
	}

	.tab_ferme {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 64rpx;
		height: 28rpx;
		background: #FFE5ED;
		border-radius: 15rpx;
		margin-right: 20rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #CC1B4F;
	}

	.goods-box {
		padding: 10rpx 0;

		.goods-item {
			line-height: 40rpx;
			padding: 10rpx 0;

			.goods-pic {
				// width: 200rpx;
				display: flex;


				.goods-pic-image {
					width: 300rpx;
					display: block;
					height: 200rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}

				.goods-pic-flex {
					margin-right: 20rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.goods-name {
				color: #000;
				font-size: 28rpx;
				margin-bottom: 10rpx;
				font-size: 32rpx;
				color: #000;
			}

			.goods-spec {
				background-color: #EFF1F6;
				font-size: 20rpx;
				padding: 0 10rpx;
				border-radius: 10rpx;
				color: #aaa;
			}

			.goods-num {
				font-size: 24rpx;
				color: #aaa;
			}
		}

		.goods-bottom {
			.cu-btn {
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 15rpx;
				font-size: 26rpx;
			}
		}
	}


	.waitpay {
		padding: 30rpx;
		line-height: 50rpx;
		background-image: linear-gradient(to right, #CE2727, #EE5250);
	}

	.pay-msg {
		padding: 20rpx 30rpx 0;
		margin-bottom: 20rpx;

		.item {
			line-height: 60rpx;
			font-size: 26rpx;
			color: #888888;
		}

		.more-con {
			transition: 0.4s;
			height: 0;
			overflow: hidden;
		}

		.showMore {
			height: 180rpx;
			transition: 0.4s;
		}

	}

	.box {
		margin-bottom: 20rpx;
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

		.num {
			// font-size: 24rpx;
			color: #AAAAAA;
		}

		&.coupon-box {
			padding: 20rpx 30rpx;
			line-height: 70rpx;
			font-size: 28rpx;
		}

		&.order-msg {
			padding: 20rpx 30rpx 0;

			.item {
				line-height: 40rpx;
				padding: 15rpx;

				.span {
					width: 200rpx;
				}

				.num {
					flex: 1;
				}

				&:last-child {
					line-height: 80rpx;
					border-top: 1rpx solid #f1f1f1;
				}
			}

			.copy {
				padding: 0 10rpx;
				line-height: 30rpx;
				border-radius: 10rpx;
				background-color: #f1f1f1;
				font-size: 20rpx;
				margin-left: 10rpx;
				color: #666666;
			}
		}
	}

	.bottom-box {
		position: fixed;
		width: 100%;
		// height: 100rpx;
		padding: 20rpx 30rpx;
		bottom: 0;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}
</style>
