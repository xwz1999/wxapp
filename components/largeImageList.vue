<template name="largeImageList">
	<view class="goods-container flex flex-wrap justify-between">
		<view class="goods-item bg-white" v-for="(item,index) in goodsList" :key="index">
			<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId" class="goods-pic bg-img">
				<image :src="IMAGE_URL+item.mainPhotoUrl" lazy-load style="height: 100%;width: 100%;" mode="aspectFill"></image>
				<view class="goods-mask flex justify-center" v-if="item.inventory==0">
					<image :src="STATIC_URL+'sale_out.png'" mode="widthFix"></image>
				</view>
			</navigator>
			<view class="goods-name-box">
				<view class="goods-name two-line">{{item.goodsName}}</view>
			</view>
			<view class="ticket-con flex align-center">
				<view style="position: relative;margin-right: 10rpx;" v-if="item.coupon">
					<image class="tic-pic" src="/static/index/tic.png" mode="heightFix"></image>
					<view class="tic-txt text-white">{{item.coupon}}元券</view>
				</view>
				<view style="position: relative;" v-if="item.commissionDesc">
					<image class="tic-pic" src="/static/index/tic2.png" mode="heightFix"></image>
					<view class="tic-txt text-red">{{item.commissionDesc}}</view>
				</view>
			</view>
			<view class="price-con flex justify-between">
				<view style="color: #AAAAAA;text-decoration: line-through;">￥{{item.primePrice}}</view>
				<view style="color: #666666;">累计已售{{item.totalSalesVolume}}件</view>
			</view>
			<view class="flex justify-between align-end">
				<view class="text-red" style="font-size: 26rpx;">券后￥<text style="font-size: 36rpx;font-weight: 700;">{{item.price}}</text></view>
				<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId" class="buy-btn text-white round" :class="item.inventory==0?'bg-aaa':'bg-red'">{{item.inventory==0?'已售完':'自购'}}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "largeImageList",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL
			}
		},
		props: {
			goodsList: {
				type: Array,
				value: [],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.goods-container {
		padding: 20rpx;

		.goods-item {
			width: 348rpx;
			padding: 10rpx;
			border-radius: 10rpx;
			margin-bottom: 15rpx;

			.goods-pic {
				width: 328rpx;
				height: 328rpx;
				border-radius: 10rpx;
				position: relative;
				overflow: hidden;
				.goods-mask {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.5);
					padding: 100rpx;
				}
			}
			.goods-name-box{
				height: 100rpx;
			}

			.goods-name {
				font-size: 32rpx;
				color: #000;
				line-height: 40rpx;
				margin: 10rpx 0;
			}

			.tic-pic {
				height: 36rpx;
				width: auto;
			}

			.tic-txt {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				text-align: center;
				line-height: 36rpx;
				font-size: 24rpx;
			}

			.price-con {
				line-height: 50rpx;
				font-size: 26rpx;
			}

			.buy-btn {
				height: 50rpx;
				line-height: 50rpx;
				margin: 0;
				font-size: 30rpx;
				padding: 0 20rpx;
				&::after {
					content: none;
				}
			}
		}
	}
	.bg-aaa {
		background-color: #AAAAAA !important;
	}
</style>
