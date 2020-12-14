<template>
	<view>
		<view class="isLoading bg-white flex flex-direction justify-center align-center" style="height: 100vh;width: 100vw;" v-if="showLoading">
			<image src="/static/loading-white.gif" mode="widthFix" style="width:500upx"></image>
		</view>
		<view class="" v-else>
			<view class="waitpay text-white" v-if="showWait">
				<view style="font-size: 34rpx;">等待付款</view>
				<view class="">倒计时:{{orderDetail.expireTime}}</view>
			</view>
			<view class="box flex align-center address-box">
				<image src="../../static/index/add.png" style="width: 50rpx;" mode="widthFix"></image>
				<view class="flex-sub address-con">
					<view class=""><text class="text-black" style="font-size: 32rpx;margin-right: 15rpx;font-weight: 900;">{{orderDetail.addr.receiverName}}</text>{{orderDetail.addr.mobile}}</view>
					<view class="address-detail">{{orderDetail.addr.province+orderDetail.addr.city+orderDetail.addr.district+orderDetail.addr.address}}</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="box goods-msg-box" v-if="orderDetail">
				<view v-for="(shop,shopIndex) in orderDetail.brands" :key="shopIndex">
					<view class="shop-msg flex align-center">
						<image :src="IMAGE_URL+shop.brandLogoUrl" style="width: 36rpx;margin-right: 10rpx;" mode="widthFix"></image>
						<view class="">{{shop.brandName}}</view>
					</view>
					<order-goods :goodsList="shop.goods" :showBtn="true"></order-goods>
					<view class="total-msg flex justify-end text-black" style="line-height: 80rpx;">
						<view style="margin-right: 20rpx;">共{{shop.brandGoodsTotalCount}}件</view>
						<view>合计{{shop.brandGoodsTotalAmount | toFixed(2)}}元</view>
					</view>
				</view>
			</view>
			
			<view class="pay-msg bg-white">
				<view class="item flex justify-between">
					<view class="">商品金额</view>
					<view class="">￥{{orderDetail.goodsTotalAmount | toFixed(2)}}</view>
				</view>
				<template v-if="isShow">
					<view class="item flex justify-between">
						<view class="">运费</view>
						<view class="">+￥{{orderDetail.expressTotalFee | toFixed(2)}}</view>
					</view>
					<view class="item flex justify-between">
						<view class="">优惠券</view>
						<view class="">-￥{{(orderDetail.universeCouponTotalAmount+orderDetail.brandCouponTotalAmount) | toFixed(2)}}</view>
					</view>
					<view class="item flex justify-between">
						<view class="">瑞币抵扣</view>
						<view class="">-￥{{orderDetail.coinTotalAmount | toFixed(2)}}</view>
					</view>
				</template>
				<view class="item flex justify-between" style="border-top: 1rpx solid #f1f1f1;font-size: 30rpx;line-height: 80rpx;">
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
					<view class="num flex align-center">{{orderDetail.id}}<text class="copy" @tap="copy">复制</text></view>
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
				<view class="item flex">
					<view class="span">销售额</view>
					<view class="text-black">￥{{orderDetail.actualTotalAmount}}</view>
				</view>
			</view>
			<view class="" style="height: 120rpx;"></view>
			<view class="bottom-box flex align-center justify-end bg-white">
				<template v-if="orderDetail.status==0">
					<button class="cu-btn round lines-gray" style="margin-right: 20rpx;" @tap="cancelOrder">取消订单</button>
					<button class="cu-btn round lines-red" @tap="toOrderPay">继续支付</button>
				</template>
				<template v-if="orderDetail.status==1">
					<button class="cu-btn round lines-gray" style="margin-right: 20rpx;" @tap="checkExpress">查看物流</button>
					<button class="cu-btn round lines-red" @tap="confirmGet">确认收货</button>
				</template>
				<template v-if="orderDetail.status==2||orderDetail.status==3||orderDetail.status==5">
					<button class="cu-btn round lines-gray" @tap="deleteOrder">删除订单</button>
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
				orderId:null,
				orderDetail:null,
				showWait:false,
				showLoading:true,
				isShow:false
			};
		},
		onLoad(options) {
			console.log(options)
			if(options.orderId){
				this.orderId = parseInt(options.orderId)
			}
			if(options.type=="waitPay"){
				this.showWait = true
			}
		},
		onShow(){
			this.getOrderDetail()
		},
		methods:{
			showMore(){
				this.isShow = !this.isShow
			},
			getOrderDetail(){
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
				});
			},
			toOrderPay(){
				// 跳转支付页面携带参数（支付价格，创建时间）
				uni.navigateTo({
					url:"../orderPay/orderPay?orderId="+this.orderId+"&finalPrice="+this.orderDetail.actualTotalAmount+"&time="+this.orderDetail.createdAt
				})
			},
			//取消订单
			cancelOrder(){
				uni.showModal({
				    title: '提示',
				    content: '确认要取消该订单吗？',
				    success: (res)=> {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this.$u.post('/api/v1/order/cancel', {
								userId: uni.getStorageSync("userInfo").id,
								orderId: this.orderId,
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.showToast({
									title:"订单已取消",
									mask:true,
									success: () => {
										setTimeout(function(){
											uni.navigateBack()
										},1000)
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
									title:"已确认收货",
									mask:true,
									success: () => {
										setTimeout(function(){
											uni.navigateBack()
										},1000)
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
									title:"订单已删除",
									mask:true,
									success: () => {
										setTimeout(function(){
											uni.navigateBack()
										},1000)
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
			checkExpress(){
				uni.navigateTo({
					url:"../logisticsList/logisticsList?orderId="+this.orderId
				})
			},
			evaluate(){
				this.$u.toast("暂未开放");
			},
			copy(){
				uni.setClipboardData({
					data:this.orderDetail.id.toString(),
					success: function() {
						console.log('success');
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}
	.waitpay{
		padding: 30rpx;
		line-height: 50rpx;
		background-image: linear-gradient(to right,#CE2727,#EE5250);
	}
	
	.pay-msg{
		padding: 20rpx 30rpx 0;
		margin-bottom: 20rpx;
		.item{
			line-height: 60rpx;
			font-size: 26rpx;
			color: #888888;
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
		.num{
			// font-size: 24rpx;
			color: #AAAAAA;
		}
		&.coupon-box {
			padding: 20rpx 30rpx;
			line-height: 70rpx;
			font-size: 28rpx;
		}
		&.order-msg{
			padding: 20rpx 30rpx 0;
			.item{
				line-height: 70rpx;
				.span{
					width: 200rpx;
				}
				&:last-child{
					line-height: 100rpx;
					border-top: 1rpx solid #f1f1f1;
				}
			}
			.copy{
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
	.bottom-box{
		position: fixed;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		bottom: 0;
		box-shadow: 0 0 15rpx 1rpx rgba(0,0,0,0.1);
		z-index: 1000;
	}
</style>
