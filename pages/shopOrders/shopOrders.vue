<template>
	<view class="flex flex-direction" style="height: 100vh;">
		<u-navbar>
			<view class="flex tab-con">
				<view class="tab flex">
					<view :class="currentIndex==0?'text-white':''" @tap="chooseNav(0)">线上订单</view>
					<view :class="currentIndex==1?'text-white':''" @tap="chooseNav(1)">门店订单</view>
					<view class="current bg-red" :class="currentIndex==0?'':'moveright'"></view>
				</view>
				<!-- <view class="btn" @tap="toInvoice">开发票</view> -->
			</view>
		</u-navbar>

		<u-tabs :list="navs" :is-scroll="false" height="90" :current="orderTypeIndex" duration="0.2" bar-width="100" :bold="false"
		 active-color="red" @change="chooseTabs"></u-tabs>

		<swiper class="flex-sub" :current="orderTypeIndex" :duration="300" :indicator-dots="false" :autoplay="false" @change="changeCurrent"
		 @animationfinish="initData">
			<swiper-item v-for="(item1,index1) in navs" :key="index1">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getOrders(orderTypeIndex)">
					<view class="flex flex-direction justify-center align-center null" v-if="item1.isNull" style="height: 60vh;">
						<image :src="IMAGE_URL + '/wxapp/null05.png'"  style="width: 300rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无订单</view>
					</view>
					<view class="" v-else>
						<view class="orders-box" style="padding: 10rpx 0;">
							<view v-for="(item2,index2) in item1.orders" :key="index2" style="padding: 10rpx 20rpx;">
								<navigator :url="'../orderDetail/orderDetail?orderId='+item2.id" class="order-item bg-white clear">
									<view class="order-item-top flex justify-between align-center">
										<view class="flex align-center">
											<view class="text-center text-white buy" style="">买</view>
											<view class="flex" style="font-size: 32rpx;color: #000000;">{{item2.createdAt}}<text class="cuIcon-right"
												 style="color: #ccc;"></text></view>
										</view>
										<view class="text-red" v-if="item2.status==0">未付款</view>
										<view class="text-red" v-if="item2.status==1">支付成功</view>
										<view class="text-red" v-if="item2.status==2">订单已取消</view>
										<view class="text-red" v-if="item2.status==3">订单已过期</view>
										<view class="text-red" v-if="item2.status==4">交易已完成</view>
										<view class="text-red" v-if="item2.status==5">交易已关闭</view>
									</view>
									<order-goods :goodsList="item2.goodsList"></order-goods>
									<view class="order-btn flex justify-between align-center" hover-stop-propagation>
										<view class="">
											<button v-if="item2.status==0" class="cu-btn lines-gray text-gray round" @tap.stop="cancelOrder(index2,item2.id)">取消订单</button>
											<button v-if="item2.status==1&&item2.expressStatus!=0" class="cu-btn lines-gray text-gray round" style="margin-right: 15rpx;" @tap.stop="checkExpress(item2.id)">查看物流</button>
											<button v-if="item2.status==1&&item2.expressStatus!=0" class="cu-btn lines-red text-red round" @tap.stop="confirmGet(index2,item2.id)">确认收货</button>
											<button v-if="item2.status==2||item2.status==3||item2.status==5" class="cu-btn lines-gray text-gray round" @tap.stop="deleteOrder(index2,item2.id)">删除订单</button>
											<button v-if="item2.status==4" class="cu-btn lines-gray text-gray round" @tap.stop="evaluate(index2,item2.id)">立即评价</button>
										</view>
										<view class="">共{{item2.totalGoodsCount}}件商品 总计<text class="text-red">￥{{item2.goodsTotalAmount | toFixed(2)}}</text></view>
									</view>
								</navigator>
							</view>
						</view>
						<u-loadmore :status="item1.loadStatus" margin-bottom="40" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				navs: [],
				nav1: ["全部", "待发货", "待收货", "已收货"],
				nav2: ["全部", "待自提", "已收货"],
				orderTypeIndex: 0,
				reqUrl: "",
				sendData: {},
			};
		},
		onLoad(options) {
			console.log(options)
			if (options.type) {
				this.orderTypeIndex = parseInt(options.type)
			}
			this.setNav()
		},
		methods: {
			// 线上订单/门店订单切换
			chooseNav(i) {
				this.currentIndex = i
				this.orderTypeIndex = 0
				this.setNav()
			},
			setNav() {
				this.navs = []
				if (this.currentIndex == 0) {
					for (let i = 0; i < this.nav1.length; i++) {
						this.navs.push({
							name: this.nav1[i],
							page: 0,
							stopLoad: false,
							orders: [],
							isNull: false,
							loadStatus: "loading"
						})
					}
				} else if (this.currentIndex == 1) {
					for (let i = 0; i < this.nav2.length; i++) {
						this.navs.push({
							name: this.nav2[i],
							page: 0,
							stopLoad: false,
							orders: [],
							isNull: false,
							loadStatus: "loading"
						})
					}
				}
				this.getOrders()
			},
			//点击订单类型切换
			chooseTabs(index) {
				this.orderTypeIndex = index
			},
			//swiper切换
			changeCurrent(e) {
				this.orderTypeIndex = e.detail.current
				this.getOrders()
			},
			//一旦用户有切换swiper的动作，就把不是当前页面的数据重置
			initData() {
				console.log(this.orderTypeIndex)
				for (let i = 0; i < this.navs.length; i++) {
					if (i != this.orderTypeIndex) {
						this.navs[i].page = 0
						this.navs[i].stopLoad = false
						this.navs[i].orders = []
						this.navs[i].isNull = false
						this.navs[i].loadStatus = "loading"
					}
				}
			},
			getOrders() {
				let index = this.orderTypeIndex
				if (this.navs[index].stopLoad) {
					console.log("没有更多了。。。。。。")
					return
				}
				this.sendData = {
					userId: uni.getStorageSync("userInfo").id,
					page: this.navs[index].page,
					orderType: this.currentIndex.toString()
				}
				this.navs[index].page++
				switch (index) {
					case 0: //全部
						this.reqUrl = "/api/v1/shop/secondary/order/list"
						break;
					case 1: //待发货
						if (this.currentIndex == 0) { //待发货
							this.reqUrl = "/api/v1/shop/secondary/order/undelivered/list"
						} else if (this.currentIndex == 1) { //门店订单待自提
							this.reqUrl = "/api/v1/order/list/receipt"
						}
						break;
					case 2:
						if (this.currentIndex == 0) { //待收货
							this.reqUrl = "/api/v1/shop/secondary/order/unreceive/list"
						} else if (this.currentIndex == 1) { //门店订单待评价
							this.reqUrl = "/api/v1/order/list/unevaluated"
						}
						break;
					case 3:
						this.reqUrl = "/api/v1/shop/secondary/order/receive/list"
						break;
				}
				this.$u.post(this.reqUrl, this.sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let order = res.data.data
					if (order.length == 0) {
						this.navs[index].stopLoad = true
						this.navs[index].loadStatus = "nomore"
						if (this.navs[index].page == 1) {
							console.log("没有此类订单")
							this.navs[index].isNull = true
						}
						return
					}
					//为了防止第一页商品数量不够时scrollview不能触底导致底部一直显示正在加载
					if (order.length < 5) {
						this.navs[index].loadStatus = "nomore"
					}
					this.navs[index].orders.push(...order)
					console.log(this.navs)
				});
			},
			toInvoice() {
				uni.redirectTo({
					url: "/packageA/invoice/invoice"
				})
			},
			//取消订单
			cancelOrder(index, id) {
				uni.showModal({
					title: '提示',
					content: '确认要取消该订单吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/cancel', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: id,
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								this.navs[this.orderTypeIndex].orders.splice(index, 1)
								uni.showToast({
									title: "订单已取消"
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//确认收货
			confirmGet(index, id) {
				uni.showModal({
					title: '提示',
					content: '确认收货吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/receipt/confirm', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: id,
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								this.navs[this.orderTypeIndex].orders.splice(index, 1)
								uni.showToast({
									title: "已确认收货"
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//删除订单
			deleteOrder(index, id) {
				uni.showModal({
					title: '提示',
					content: '确认删除该订单吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/order/delete', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: id,
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								this.navs[this.orderTypeIndex].orders.splice(index, 1)
								uni.showToast({
									title: "订单已删除"
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//查看物流
			checkExpress(id) {
				console.log(id)
				uni.navigateTo({
					url: "../logisticsList/logisticsList?orderId=" + id
				})
			},
			//立即评价
			evaluate() {
				this.$u.toast("暂未开放");
				return
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		width: 100vw;
	}

	.tab-con {
		.tab {
			border: 2rpx solid #DDDDDD;
			border-radius: 30rpx;
			position: relative;

			view {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-weight: 900;
				text-align: center;
			}

			.current {
				border-radius: 30rpx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -100;
				transition: 0.5s;
			}

			.moveright {
				transform: translateX(160rpx);
			}
		}

		.btn {
			margin-left: 10rpx;
			padding: 0 10rpx;
			line-height: 60rpx;
		}
	}

	.nav-box {
		line-height: 80rpx;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);

		.nav-item {
			flex: 1;
			text-align: center;
			font-weight: 700;
		}

		.active {
			position: relative;
			color: red;
		}

		.active::after {
			content: "";
			position: absolute;
			bottom: 5rpx;
			width: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			height: 6rpx;
			border-radius: 3rpx;
			background-color: red;
		}
	}

	.order-item {
		padding: 25rpx;
		border-radius: 10rpx;

		.order-item-top {
			line-height: 40rpx;
			padding: 10rpx 0;

			.buy {
				font-size: 28rpx;
				background-color: #FE3E27;
				border-radius: 5rpx;
				margin-right: 10rpx;
				width: 40rpx;
			}
		}

		.order-btn {
			margin: 30rpx 0 10rpx;

			button {
				padding: 0 15rpx;
				height: 60rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
