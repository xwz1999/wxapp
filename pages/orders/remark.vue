<template>
	<view class="flex flex-direction" style="height: 100vh">
		<view class="bg-white">
			<view style="width: 400rpx;margin: 0 auto;">
				<u-tabs :list="list" :is-scroll="false" height="90" active-color='#DB2D2D' inactive-color='#333333'  :current="currentIndex" duration="0.2" bar-width="56" :bold="false"
				 @change="chooseTabs"></u-tabs>
			</view>
		</view>
		<swiper class="flex-sub" :current="currentIndex" :indicator-dots="false" :autoplay="false" @change="changeCurrent">
			<swiper-item v-for="(li,i) in list" :key='i'>
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="flex flex-direction justify-center align-center null" v-if="!remarkList.length" style="min-height: 60vh;">
						<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无订单</view>
					</view>
					<view v-else>
						<view v-for="(item,index) in remarkList" :key='index'>
							<view class="order-box">
								<view class="flex justify-between">
									<view class="lf bg-img" :style="'background-image: url('+IMAGE_URL+item.mainPhotoUrl+');'">
									</view>
									<view class="rg flex flex-wrap" style="align-content: space-between; flex: 1;">
										<view class="head" style="width: 100%;">
											<view class="black title">
												<text>{{item.goodsName}}</text>
											</view>
											<view class="pic">
												<text>规格型号 {{item.skuName}}</text>
											</view>
										</view>
										<view class="flex justify-between" style="width: 80%;">
											<text>订单金额<text class="black">￥{{item.goodsAmount}}</text></text>
											<text>购买数量<text class="black">{{item.quantity}}</text></text>
										</view>
									</view>
								</view>
								<view class="remark-btn flex justify-end">
									<view class="btn flex justify-center align-center">
										<view class="" @click="toPage(item)">
											<text v-if="currentIndex">已评价</text>
											<text v-else>查看评价</text>
										</view>
									</view>
								</view>
							</view>

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
					name: '待评价',
					goods: [],
					isNull: false
				}, {
					name: '已评价',
					goods: [],
					isNull: false
				}],
				remarkList: []
			};
		},
		
		onLoad() {
			this.getOrders()
		},
		methods: {
			// 跳转页面
			toPage(data){
				if(this.currentIndex){
					// 查看评价
					uni.navigateTo({
						url: './remarkDetails?data=' + encodeURIComponent(JSON.stringify(data))
					})
				}else{
					// 去发表页面
					uni.navigateTo({
						url:'./releaseRemark?data=' + encodeURIComponent(JSON.stringify(data))
					})
				}
		
			},
			//tab切换
			chooseTabs(index) {
				this.currentIndex = index
			},
			//切换页面
			changeCurrent(e) {
				this.currentIndex = e.detail.current
				this.getOrders()
			},
			// 获取订单数据
			getOrders() {
				this.sendData = {
					userId: uni.getStorageSync("userInfo").id,
					status: this.currentIndex
				}
				this.$u.post('/api/v1/order/evaluation/orderEvaluationList', this.sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
			
					this.remarkList = res.data.data ? res.data.data : []
					if(this.currentIndex === 0 && this.remarkList.length>0){
						this.list[0].name =  `待评价(${this.remarkList.length})`
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100vh;
		width: 100vw;
	}

	.order-box {
		margin: 30rpx;
		padding: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		background: #FFFFFF;
		border-radius: 16rpx;
		.lf {
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			overflow: hidden;
		}
		.rg{
			flex: 1;
			.head{
				.pic{
					font-size: 26rpx;
				}
			}
			.black{
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
		.remark-btn {
			margin-top: 40rpx;
			.btn {
				width: 152rpx;
				height: 56rpx;
				background: #FFFFFF;
				border-radius: 28rpx;
				border: 2rpx solid #DB2D2D;
				font-size: 28rpx;
				font-weight: 400;
				color: #DB2D2D;
			}
		}
	}

	
</style>
