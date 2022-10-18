<template>
	<view class="flex flex-direction" style="height: 100vh;">
		<u-navbar>
			<view class="slot-wrap justify-center">
				<view class="flex tab-con justify-center">
					<view class="tab flex justify-center" v-if="roleLevel==10">
						<view :class="currentIndex==0?'text-white':''" @tap="chooseNav(0)">自购订单</view>
						<view :class="currentIndex==1?'text-white':''" @tap="chooseNav(1)">VIP店铺订单</view>
						<view class="current bg-red" :class="currentIndex==0?'':'moveright'"></view>
					</view>
				</view>
			</view>
		</u-navbar>
		<u-tabs :list="navs" :is-scroll="false" height="90" :current="orderTypeIndex" duration="0.2" bar-width="100"
			:bold="false" active-color="red" @change="chooseTabs"></u-tabs>

		<u-alert-tips icon='volume-up' :show="show" @close="closedTips" :close-able="true" :show-icon="true"
			type="warning" :title="description"></u-alert-tips>

		<swiper class="flex-sub" :current="orderTypeIndex" :duration="300" :indicator-dots="false" :autoplay="false"
			@change="changeCurrent" @animationfinish="initData">
			<swiper-item v-for="(item1,index1) in navs" :key="index1">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getOrders(orderTypeIndex)">
					<view class="flex flex-direction justify-center align-center null" v-if="item1.isNull"
						style="height: 60vh;">
						<!-- <image :src="IMAGE_URL + '/wxapp/null05.png'"  style="width: 300rpx;" mode="widthFix"></image> -->
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无订单</view>
					</view>
					<view class="" v-else>
						<view class="orders-box" style="padding: 10rpx 0;" v-if="currentIndex==0">
							<view v-for="(item2,index2) in item1.orders" :key="index2" style="padding: 10rpx 20rpx;"
								@click="OrdersDetails(item2.id,index2)">
								<view class="order-item bg-white clear">

									<view class="order-item-top flex justify-between align-center">
										<view class="flex align-center">
											<view class="text-center text-white buy" style="">批</view>
											<view v-if="currentIndex === 0" class="flex"
												style="font-size: 32rpx;color: #000000;">{{item2.createdAt}}</view>
											<view v-else class="flex" style="font-size: 32rpx;color: #000000;">
												{{timeFormat(item2.createdAt, 'yyyy-mm-dd hh:MM:ss')}}
											</view>
										</view>
										<view class="text-red" v-if="item2.status==0&&item2.can_pay">待付款</view>
										<view class="text-red" v-if="item2.status==0&&!item2.can_pay">待处理</view>
										<view class="text-red" v-if="item2.status==1">
											<view class="text-red" v-if="item2.expressStatus==0">待发货</view>
											<view class="text-red" v-if="item2.expressStatus==1">已发货</view>
											<view class="text-red" v-if="item2.expressStatus==2">已发货</view>
										</view>
										<view class="text-red" v-if="item2.status==2">已取消</view>
										<view class="text-red" v-if="item2.status==3">已过期</view>
										<view class="text-red" v-if="item2.status==4">已完成</view>
										<view class="text-red" v-if="item2.status==5">已关闭</view>
									</view>
									<wholesale-order-goods :goodsList="item2.goodsList"></wholesale-order-goods>
									

									<view class="flex justify-between order-btn">
										<view></view>
										<view>共{{item2.totalGoodsCount}}件商品 总计<text
												class="text-red">￥{{item2.actualTotalAmount | toFixed(2)}}</text></view>
									</view>

									<view class="order-btn flex justify-end align-center" hover-stop-propagation
										v-if="currentIndex === 0">
										<view class="">

											<template v-if="item2.status==0&&item2.can_pay">
												<button class="cu-btn round lines-red" @tap.stop="toOrderPay(item2.id)">去支付</button>
											</template>

											<template v-if="item2.status==1&&item2.canConfirm">
												<button class="cu-btn round lines-red" @tap.stop="confirmGet(index2,item2.id)">确认收货</button>
											</template>
											<template v-if="item2.status==2">
												<button class="cu-btn round  lines-black"
													@tap.stop="deleteOrder(index2,item2.id)">删除订单</button>
												<view style="width: 30rpx;"></view>
												<button class="cu-btn round  lines-red"
													@tap="goodsDetail(item2.goodsList[0].goodsId)">再次购买</button>
											</template>
										</view>


									</view>
								</view>
							</view>
						</view>
						
						<view class="orders-box" style="padding: 10rpx 0;" v-if="currentIndex==1">
							<view v-for="(item2,index2) in item1.orders" :key="index2" style="padding: 10rpx 20rpx;"
								@click="OrdersDetails(item2.id,index2)">
								<view class="order-item bg-white clear">
						
									<view class="order-item-top flex justify-between align-center">
										<view class="flex align-center">
											<view class="text-center text-white buy" style="">批</view>
											<view v-if="currentIndex === 0" class="flex"
												style="font-size: 32rpx;color: #000000;">{{item2.createdAt}}</view>
											<view v-else class="flex" style="font-size: 32rpx;color: #000000;">
												{{timeFormat(item2.createdAt, 'yyyy-mm-dd hh:MM:ss')}}
											</view>
										</view>
										<view class="text-red" v-if="item2.status==0">未支付</view>
										
										<view class="text-red" v-if="item2.status==1">
											已支付
										</view>
										<view class="text-red" v-if="item2.status==2">已取消</view>
										<view class="text-red" v-if="item2.status==3">已过期</view>
										<view class="text-red" v-if="item2.status==4">已完成</view>
										<view class="text-red" v-if="item2.status==5">已关闭</view>
									</view>
								
									<wholesale-order-goods :goodsList="item2.goods" ></wholesale-order-goods >
						
									<view class="flex justify-between order-btn">
										<view></view>
										<view>共{{item2.totalGoodsCount}}件商品 总计<text
												class="text-red">￥{{item2.goodsTotalAmount | toFixed(2)}}</text></view>
									</view>
					
								</view>
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
	import guideOrderGoods from '@/components/guideOrderGoods.vue'
	export default {
		components: {
			guideOrderGoods
		},
		data() {
			return {
				show: true, // 提醒文案是否显示

				description: '重要提醒：请谨防网络及客服诈骗！瑞库客不会以订单异常、系统维护等情况为由，要求你进行退款操作',
				currentIndex: 0,
				navs: [],
				nav1: ["全部", "待处理", "待付款", "待发货", "待收货"],
				nav2: ["全部", "待处理", "待付款", "已发货", "已收货"],
				orderTypeIndex: 0,
				reqUrl: "",
				sendData: {},
				roleLevel: 0
			};
		},
		onLoad(options) {
			console.log(options)
			if (options.type) {
				this.orderTypeIndex = parseInt(options.type)
			}
			this.setNav()
			// 订单详情页取消订单或者删除订单成功后
			uni.$off('cancelOrderSuccess');
			uni.$on("cancelOrderSuccess", res => {
				console.log(res)
				this.setNav()
			})
			this.roleLevel = this.$store.state.userBrief.level
		},
		created() {
			let that = this
			wx.getStorage({
				key: 'errorTips',
				success(res) {
					that.show = res.data
				},
				fail() {
					console.log('fail')
					wx.setStorage({
						key: "errorTips",
						data: true
					})
				}
			})
		},
		methods: {
			timeFormat(timestamp, fmt) {
				// 其他更多是格式化有如下:
				// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
				timestamp = parseInt(timestamp);
				// 如果为null,则格式化当前时间
				if (!timestamp) timestamp = Number(new Date());
				// 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
				if (timestamp.toString().length == 10) timestamp *= 1000;
				let date = new Date(timestamp);
				let ret;
				let opt = {
					"y+": date.getFullYear().toString(), // 年
					"m+": (date.getMonth() + 1).toString(), // 月
					"d+": date.getDate().toString(), // 日
					"h+": date.getHours().toString(), // 时
					"M+": date.getMinutes().toString(), // 分
					"s+": date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
			},
			//跳转详情
			goodsDetail(id){
				console.log('dianjile')
				uni.navigateTo({
					url:"/package_pifa/pifaGoodsDetail/pifaGoodsDetail?id=" + id
				})
			},
			OrdersDetails(id, index) {

				uni.navigateTo({
					url: "../pifaOrderDetail/pifaOrderDetail?orderId=" + id
				})

			},
			toOrderPay(id) {
				// 跳转支付页面携带参数（支付价格，创建时间）
				// uni.navigateTo({
				// 	url: "../orderPay/orderPay?orderId=" + id
				// })
				let orderId = id
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
			// 关闭 提示
			closedTips() {
				this.show = false
				wx.setStorage({
					key: "errorTips",
					data: false
				})
			},
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
				if(this.currentIndex == 0){
					let index = this.orderTypeIndex
					if (this.navs[index].stopLoad) {
						console.log("没有更多了。。。。。。")
						return
					}
					
					this.sendData = {
						userId: uni.getStorageSync("userInfo").id,
						page: this.navs[index].page,
						is_sale: true,
						orderType: null
					}
					this.navs[index].page++
					switch (index) {
						case 0: //全部
							this.reqUrl = "/api/v1/order/list/all"
							break;
						case 1:
							this.reqUrl = "/api/v1/order/list/undeal"
							break;
						case 2: //待付款
							this.reqUrl = "/api/v1/order/list/unpaid"
							break;
						case 3:
							this.reqUrl = "/api/v1/order/list/undelivered"
							break;
						case 4:
							this.reqUrl = "/api/v1/order/list/receipt"
							break;
					
						default:
							break;
					}
					console.log(this.reqUrl, this.sendData)
					
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
				}else{
					let index = this.orderTypeIndex
					if (this.navs[index].stopLoad) {
						console.log("没有更多了。。。。。。")
						return
					}
					let status = 0;
					if(index==0){
						status = 0
					}else if (index==1){
						status = 4
					}else if(index ==2){
						status = 1
					}else if(index ==3){
						status = 2
					}else if(index ==4){
						status = 3
					}
					
					this.sendData = {
						userId: uni.getStorageSync("userInfo").id,
						page: this.navs[index].page,
						is_sale: true,
						status: status
					}
					console.log(this.sendData)
					this.navs[index].page++
					
					this.$u.post("/api/v2/app/order/guide_lists", this.sendData).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						let order = res.data.data.list
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
					
					
				}



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

<style lang="scss" scoped>
	page {
		height: 100vh;
		width: 100vw;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}

	.tab-con {
		.tab {
			border: 2rpx solid #DDDDDD;
			border-radius: 30rpx;
			position: relative;

			view {
				width: 180rpx;
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
				transform: translateX(180rpx);
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

	/deep/.u-alert-tips {
		.u-alert-content {
			.u-alert-title {
				padding: 0px 10rpx;
				color: #fcbd71 !important;
				font-size: 24rpx;
			}
		}

		.u-close-icon {
			top: 50% !important;
			transform: translateY(-50%);

			.u-icon__icon {
				font-size: 12px !important;
			}
		}
	}
</style>
