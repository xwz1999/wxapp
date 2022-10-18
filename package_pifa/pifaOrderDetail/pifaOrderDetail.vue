<template>
	<view>
		
		<view class="isLoading bg-white flex flex-direction justify-center align-center"
			style="height: 100vh;width: 100vw;" v-if="showLoading">
			<image :src="IMAGE_URL+'/wxapp/loading-white.gif'" mode="widthFix" style="width:500upx"></image>
		</view>
		<view class="" v-else>
			<view class="kefu" @tap="startChat">
				<u-icon name="server-fill"style=""  ></u-icon>
				<text style="color: #fff;font-size: 20rpx;">客服</text>
			</view>
			<view class="waitpay" style="margin: 20rpx;" v-if="orderDetail.status==0&&!orderDetail.can_pay">
				<image :src="IMAGE_URL+'/wxapp/wait_deal_img.png'" style="width: 50rpx;" mode="widthFix"></image>
				<view style="height: 20rpx;"></view>
				<view style="font-size: 28rpx;color: #333;">供应商正在确认物流费，预计一个工作日</view>
			</view>
			<view style="display: flex;flex-direction: column;background-color: #fff;border-radius: 10rpx; margin: 20rpx;padding: 20rpx 30rpx;" >
				<view class="box flex align-center address-box" >
					<image :src="IMAGE_URL+'/wxapp/add.png'" style="width: 60rpx;" mode="widthFix"></image>
					<view class="flex-sub address-con">
						<view class=""><text class="text-black"
								style="font-size: 32rpx;margin-right: 15rpx;font-weight: 900;">{{orderDetail.addr.receiverName}}</text>{{orderDetail.addr.mobile}}
						</view>
						<view style="height: 10rpx;"></view>
						<view class="address-detail">
							{{orderDetail.addr.province+orderDetail.addr.city+orderDetail.addr.district+orderDetail.addr.address}}
						</view>
					</view>
				</view>
				<view style="background-color: #eee;height: 1rpx;width: 100%;">
					
				</view>
				<view style="display: flex;color: #333;font-size: 24rpx;margin-top: 10rpx;">
					<text style="width: 180rpx;">买家留言：</text>
					<text style="white-space: nowrap;text-overflow:ellipsis;margin-top: 4rpx;overflow: hidden;">{{orderDetail.buyerMsg}}</text>
				</view>
			</view>
	
			
			<view class="box goods-msg-box" v-if="orderDetail">
				<view v-for="(shop,shopIndex) in orderDetail.brands" :key="shopIndex">
				
					<view class="goods-box">
						<view v-for="(item,index) in shop.goods" :key="index">
							<view class="goods-item flex">
								<view class="">
						
									<navigator :url="'/package_pifa/pifaGoodsDetail/pifaGoodsDetail?id='+item.goodsId"
										hover-stop-propagation @tap.stop="" class="goods-pic" hover-class=“none”>
										<view class="goods-pic-image">
											<u-lazy-load threshold="-100" :image="judgeCover(item.mainPhotoUrl)"
												:index="index" height="200" border-radius="10"
												:loading-img="IMAGE_URL + '/wxapp/null05.png'"
												:error-img="IMAGE_URL + '/wxapp/null05.png'" img-mode="aspectFill">
											</u-lazy-load>
										</view>
										<view class="goods-pic-flex" >
											<view class="goods-con flex-sub flex flex-direction justify-between">
												<view class="">
													<view class="goods-name two-line">{{item.goodsName}}</view>
													<view style="height: 40rpx;"></view>
													<view class="goods-spec-con flex justify-between">
														<view class="goods-spec text-hidden">{{item.skuName}}</view>
													</view>
												</view>
								
											</view>
										</view>
										<view style="">
											<view class="flex">￥{{item.unitPrice - item.coinAmount | toFixed(2)}}</view>
											<view class="goods-num" style="text-align: right;">×{{item.quantity}}</view>
										</view>
										
									</navigator>
								</view>
							</view>
						</view>
					</view>

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
				<view class="item flex" v-if="orderDetail.status!=0">
					<view class="span">支付方式</view>
					<view class="num" v-if="orderDetail.payMethod==0">余额支付</view>
					<view class="num" v-if="orderDetail.payMethod==1">微信支付</view>
					<view class="num" v-if="orderDetail.payMethod==2">支付宝支付</view>
					<view class="num" v-if="orderDetail.payMethod==4">小程序支付</view>
				</view>
				<view class="item flex" style="justify-content: space-between;align-items: center;">
					<view class="span">商品总价</view>
					
					<view style="display: flex;" v-if="orderDetail.status==0&&!orderDetail.can_pay">
						<view style="margin-right: 20rpx;color: #999;font-size: 24rpx;margin-top: 5rpx;">共{{goodsTotal.totalNumber}}件</view>
						<view style="color: #333;font-size: 24rpx;">合计：<text style="color: #C92219;font-size: 24rpx;font-weight: bold;">¥</text><text style="font-weight: bold;color: #C92219;font-size: 32rpx;">{{goodsTotal.totalPrice | toFixed(2)}}</text></view>
					</view>
					<view style="display: flex;" v-else>
						<view style="margin-right: 20rpx;color: #999;font-size: 24rpx;margin-top: 5rpx;">共{{goodsTotal.totalNumber}}件</view>
						<view style="color: #333;font-size: 24rpx;">合计：<text style="color: #333;font-size: 24rpx;font-weight: bold;">¥</text><text style="font-weight: bold;color: #333;font-size: 24rpx;">{{goodsTotal.totalPrice | toFixed(2)}}</text></view>
					</view>
			
				</view>
				<view class="item flex" style="justify-content: space-between;align-items: center;">
					<view class="span">物流费</view>
					<view v-if="orderDetail.status==0&&!orderDetail.can_pay">
						<text style="color: #333;font-size: 24rpx;" >待反馈</text>
					</view>
					<view v-else>
						<text style="color: #333;font-size: 24rpx;" >¥{{orderDetail.expressTotalFee | toFixed(2)}}</text>
					</view>
				</view>
				<view v-if="!(orderDetail.status==0&&!orderDetail.can_pay)" class="item flex" style="justify-content: space-between;align-items: center;">
					<view class="span">实付款</view>
					<view >
						<text style="color: #C92219;font-size: 24rpx;" >¥</text>
						<text style="color: #C92219;font-size: 32rpx;" >{{orderDetail.actualTotalAmount | toFixed(2)}}</text>
					</view>
				</view>
			</view>		
			<view class="" style="height: 120rpx;"></view>
			<view class="bottom-box flex align-center justify-end bg-white">
			
				<template v-if="orderDetail.status==0&&orderDetail.can_pay">
					<button class="cu-btn round lines-red" @tap="toOrderPay">去支付</button>
				</template>
				
				<template v-if="orderDetail.status==1&&orderDetail.canConfirm">
					<button class="cu-btn round lines-red" @tap="confirmGet">确认收货</button>
				</template>
				<template v-if="orderDetail.status==2">
					<button class="cu-btn round  lines-gray" @tap="deleteOrder">删除订单</button>
					<view style="width: 30rpx;"></view>
					<button class="cu-btn round  lines-red" @tap="goodsDetail()">再次购买</button>
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
			onLoad(options) {
				console.log(options)
			
				if (options.orderId) {
					this.orderId = parseInt(options.orderId)
				}
			},
			onShow() {
				this.getOrderDetail()
			},
			buy(){
				
			},
			startChat () {
			  // console.log('start chat')
			  if (!uni.getStorageSync("auth").token) {
			  	this.$u.toast("游客无法使用该功能，请登录");
			  	let pages = getCurrentPages();
			  	let currPage = null;
			  	if (pages.length) {
			  		currPage = pages[pages.length - 1];
			  	}
			  	console.log(currPage)
			  	let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
			  	this.$store.commit('setUrl', url)
			  	setTimeout(() => {
			  		uni.navigateTo({
			  			url: "../login/login"
			  		})
			  	}, 1000)
			  }else{
				 uni.navigateTo({
				 	url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=联系客服'
				 }); 
			  }
			 
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
			goodsDetail(){
				uni.navigateTo({
					url:"/package_pifa/pifaGoodsDetail/pifaGoodsDetail?id=" + this.orderDetail.brands[0].goods[0].goodsId
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
				uni.navigateTo({
					url: "/package_pifa/pifaOrderPay/pifaOrderPay?orderId=" + this.orderId
				})
				// let orderId = this.orderId
				// this.$u.post('/api/v1/pay/wxminipay/order/create', {
				// 	userId: uni.getStorageSync("userInfo").id,
				// 	orderId
				// 	// wxType:"recook-weapp"
				// }).then(res2 => {
				// 	console.log(res2);
				// 	if (res2.data.code == "FAIL") {
				// 		this.$u.toast(res2.data.msg);
				// 		return
				// 	}
				// 	let result = res2.data.data
				// 	wx.requestPayment({
				// 		timeStamp: result.timestamp,
				// 		nonceStr: result.noncestr,
				// 		package: result.package,
				// 		signType: 'MD5',
				// 		paySign: result.sign,
				// 		success: (res3) => {
				// 			console.log(res3)
				// 			this.$u.toast('支付完成！', 2000);
				// 			uni.reLaunch({
				// 				url: "../pifaPaySuccess/pifaPaySuccess?orderId=" + orderId
				// 			})
				// 		},
				// 		fail: (err) => {
				// 			console.log(err)
				// 			this.$u.toast('支付失败！', 2000);
				// 			// this.$u.toast(err);
				// 		}
				// 	})

				// });
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
			copy() {
				uni.setClipboardData({
					data: this.orderDetail.id.toString(),
					success: function() {
						console.log('success');
					}
				})
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}
	.kefu {
		display: flex;
		flex-direction: column; 
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 150rpx;
		right: 30rpx;
		width: 100rpx;
		height: 100rpx;
		line-height: 40rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50%;
		font-size: 40rpx;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
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
					width: 250rpx;
					display: block;
					height: 200rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}

				.goods-pic-flex {
					// margin-right: 20rpx;
					width: 300rpx;
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius:10rpx;
		background-color: #FFFFFF;
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

			border-radius:10rpx;
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
			margin: 20rpx;
			border-radius: 10rpx;
			.shop-msg {
				height: 60rpx;
			}
		}

		.num {
			font-size: 24rpx;
			color: #333;
		}

		&.coupon-box {
			padding: 20rpx 30rpx;
			line-height: 70rpx;
			font-size: 28rpx;
		}

		&.order-msg {
			margin: 20rpx;
			border-radius: 10rpx;
			padding: 10rpx 20rpx ;

			.item {
				line-height: 40rpx;
				padding: 15rpx;

				.span {
					width: 170rpx;
					font-size: 28rpx;
				}

				.num {
					flex: 1;
				}

				// &:last-child {
				// 	line-height: 80rpx;
				// 	border-top: 1rpx solid #f1f1f1;
				// }
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
