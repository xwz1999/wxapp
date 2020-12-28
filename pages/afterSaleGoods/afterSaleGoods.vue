<template>
	<view class="flex flex-direction" style="height: 100%;">
		<u-tabs :list="list" :is-scroll="false" height="90" :current="currentIndex" duration="0.2" bar-width="100" :bold="false"
		 active-color="red" @change="chooseTabs"></u-tabs>

		<swiper class="flex-sub" :current="currentIndex" :indicator-dots="false" :autoplay="false" @change="changeCurrent" @animationfinish="initData">
			<swiper-item v-for="(item1,index1) in list" :key="index1">
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="flex flex-direction justify-center align-center null" v-if="item1.isNull" style="height: 60vh;">
						<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无订单</view>
					</view>
					<view class="order-box" v-else>
						<view v-for="(item2,index2) in item1.goods" :key="index2" style="padding: 10rpx 30rpx;">
							<navigator :url="'../afterSaleDetail/afterSaleDetail?orderGoodsId='+item2.orderGoodsId+'&asId='+item2.asId"
							 class="order-item bg-white">
								<view class="item-top flex justify-between" style="line-height: 60rpx;">
									<view class="item-no">售后编号<text class="text-black" style="margin-left: 10rpx;">{{item2.asId}}</text></view>
									<view class="item-status text-red">{{item2.asDesc}}</view>
								</view>
								<view class="item-con flex justify-between">
									<view class="goods-pic bg-img" :style="'background-image: url('+IMAGE_URL+item2.mainPhotoUrl+');'"></view>
									<view class="flex-sub clear">
										<view class="goods-name-con">
											<view class="goods-name text-black two-line">{{item2.goodsName}}</view>
											<view class="des text-hidden">{{item2.skuName}}</view>
										</view>
										<view class="goods-bottom">
											<view class="flex justify-between">
												<view class="">退款金额<text class="text-red" style="margin-left: 10rpx;">￥{{item2.refundAmount}}</text></view>
												<view class="">退款数量<text class="text-black" style="margin-left: 10rpx;">{{item2.quantity}}</text></view>
											</view>

											<view class="time">申请时间:{{item2.createdAt}}</view>
										</view>
									</view>
								</view>
							</navigator>
						</view>
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
				IMAGE_URL: this.IMAGE_URL,
				currentIndex: 0,
				list: [{
					name: '售后中',
					goods: [],
					isNull: false
				}, {
					name: '已完成',
					goods: [],
					isNull: false
				}]
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			changeCurrent(e) {
				this.currentIndex = e.detail.current
				this.getList()
			},
			initData() {
				for (let i = 0; i < this.list.length; i++) {
					if (i != this.currentIndex) {
						this.list[i].page = 0
						this.list[i].goods = []
						this.list[i].isNull = false
					}
				}
			},
			chooseTabs(index) {
				this.currentIndex = index
			},
			getList() {
				let index = this.currentIndex
				let sendData = {
					userId: uni.getStorageSync("userInfo").id
				}
				switch (index) {
					case 0:
						sendData.type = 1
						break;
					case 1:
						sendData.type = 2
						break;
					default:
						break;
				}
				this.$u.post('/api/v1/order/after_sales/goods/list', sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let goods = res.data.data
					if (goods.length == 0) {
						this.list[index].isNull = true
						return
					}
					this.list[index].goods.push(...goods)
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		width: 100vw;
	}

	.order-box {
		padding: 10rpx 0;

		.order-item {
			padding: 20rpx;
			border-radius: 10rpx;

			.goods-pic {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.goods-name-con {
				height: 160rpx;
				border-bottom: 1rpx solid #F1F1F1;
				padding-top: 10rpx;

				.des {
					color: #999999;
					font-size: 26rpx;
					padding-top: 15rpx;
				}
			}

			.goods-bottom {
				line-height: 50rpx;
				font-size: 28rpx;
				padding-top: 10rpx;
				color: #999999;
			}

			.time {
				font-size: 24rpx;
				color: #AAAAAA;
			}
		}
	}
</style>
