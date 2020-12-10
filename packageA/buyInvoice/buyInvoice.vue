<template>
	<view class="flex flex-direction" style="height: 100%;">
		<view class="flex justify-between" style="line-height: 80rpx;padding: 0 30rpx;font-size: 32rpx;border-bottom: 1rpx solid #f1f1f1;">
			<view class="">可开具订单</view>
			<view class=""><text class="cuIcon-filter"></text>订单筛选</view>
		</view>
		<scroll-view class="flex-sub" scroll-y="true" style="height: 0;margin-bottom: 150rpx;">
			<view class="invoice-box">
				<view class="invoice-item flex justify-between align-center" v-for="(item,index) in 20" :key="index">
					<view class="flex align-center">
						<text class="cuIcon-roundcheckfill text-red check"></text>
						<view style="max-width: 400rpx;margin-left: 30rpx;">
							<view class="">2020-08-02 20:05</view>
							<view class="goods-name">商品名称</view>
						</view>
					</view>

					<view class="text-red"><text style="font-size: 48rpx;">293</text>元</view>
				</view>
			</view>
			<!-- <view class="null flex flex-direction align-center" style="margin-top: 260rpx;">
				<image src="../../static/mine/null.png" style="width: 288rpx;" mode="widthFix"></image>
				<view class="" style="font-size: 24rpx;">您还没有可开发票的订单</view>
			</view> -->
		</scroll-view>
		<view class="bottom bg-white">
			<view style="padding: 0 30rpx;line-height: 50rpx;font-size: 24rpx;"><text class="text-red">1</text>笔订单，共<text class="text-red">83</text>元</view>
			<view class="bottom-con flex justify-between align-center">
				<view class=""><text class="cuIcon-round check"></text>全选</view>
				<view class="bg-red text-white next" @tap="next">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			next(){
				uni.navigateTo({
					url:"../addInvoice/addInvoice"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
	}
	.check{
		font-size: 36rpx;
	}
	.invoice-box {
		.invoice-item {
			border-bottom: 1rpx solid #f1f1f1;
			padding: 0 30rpx;
			height: 160rpx;
			.goods-name {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 30rpx;
				margin-top: 10rpx;
			}
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		box-shadow: 0 0 15rpx 1rpx rgba(0, 0, 0, 0.1);

		.bottom-con {
			height: 100rpx;
			padding: 0 30rpx;
			border-top: 1rpx solid #f1f1f1;

			.next {
				height: 56rpx;
				width: 144rpx;
				line-height: 56rpx;
				text-align: center;
				border-radius: 5rpx;
			}
		}
	}
</style>
