<!-- 组件里面的本地图片路径要改成绝对路径，否则报错 -->
<template name="goodsList">
	<view class="goods-box">
		<view class="goods-item" v-for="(item,index) in goodsList" :key="index">
			<view class="goods-item-con bg-white flex justify-between">
				<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId" class="goods-pic bg-img clear" v-if="item.mainPhotoUrl">
				 <image :src="IMAGE_URL+item.mainPhotoUrl" lazy-load style="height: 100%;width: 100%;" mode="aspectFill"></image>
					<view class="goods-mask flex justify-center" v-if="item.inventory==0">
						<image :src="STATIC_URL+'sale_out.png'" mode="widthFix"></image>
					</view>
				</navigator>
				<view class="goods-msg flex-sub clear flex flex-direction justify-between">
					<view class="goods-msg-top">
						<view class="goods-name two-line">{{item.goodsName}}</view>
						<view class="goods-key-box text-hidden">{{item.description}}</view>
						<view class="shop-msg flex align-center">
							<image class="shop-logo bg-img" lazy-load :src="IMAGE_URL+item.brandImg" v-if="item.brandImg" mode="aspectFill"></image>
							<view class="shop-name text-red text-hidden" style="font-size: 24rpx;">{{item.brandName}}</view>
						</view>
					</view>
					<view class="goods-msg-bottom" style="font-size: 24rpx;">
						<view class="ticket-box flex justify-between align-center" style="margin-bottom: 5rpx;">
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
							<view style="color: #666;">已售{{item.totalSalesVolume}}件</view>
						</view>
						<view class="buy-btn-box flex justify-between">
							<view class="flex align-end">
								<text class="text-red" style="font-size: 26rpx;">
									<text>券后￥</text>
									<text style="font-size: 36rpx;font-weight: 700;margin-right: 10rpx;">{{item.price}}</text> 
									<text style="text-decoration: line-through;color: #888888;">¥{{item.primePrice}}</text>
								</text>
							</view>
							<view class="goods-btns flex align-end">
								<button class="share-btn text-center">
									<view class="iconfont iconfenxiang"></view>
								</button>
								<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId" class="buy-btn text-white round" :class="item.inventory==0?'bg-aaa':'bg-red'">{{item.inventory==0?'已售完':'自购'}}</navigator>
							</view>
						</view>
					</view>
				</view>
				<!-- 排行榜列表左上角排名角标 -->
				<!-- <view class="rank-icon" v-if="isHot">
					<image v-if="index==0" src="../static/index/01.png" mode="widthFix"></image>
					<image v-if="index==1" src="../static/index/02.png" mode="widthFix"></image>
					<image v-if="index==2" src="../static/index/03.png" mode="widthFix"></image>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodsList",
		data() {
			return {
				STATIC_URL:this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL
			}
		},
		props: {
			goodsList: {
				type: Array,
				value: [],
			},
			isHot: {
				type: Boolean,
				value: false,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.goods-box {
		padding: 10rpx 0;

		.goods-item {
			padding: 10rpx 20rpx;

			.goods-item-con {
				padding: 15rpx;
				border-radius: 20rpx;
				position: relative;

				.rank-icon {
					position: absolute;
					top: 0;
					left: 15rpx;
					width: 40rpx;
				}

				.goods-pic {
					width: 260rpx;
					height: 260rpx;
					margin-right: 15rpx;
					border-radius: 10rpx;
					position: relative;

					.goods-mask {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.5);
						padding: 64rpx;
					}
				}

				.goods-name {
					font-size: 32rpx;
					color: #000;
				}

				.goods-key-box {
					color: #666;
					margin-top: 5rpx;
					font-size: 26rpx;
				}

				.shop-msg {
					line-height: 30rpx;
					margin-top: 5rpx;
				}

				.shop-logo {
					width: 30rpx;
					height: 30rpx;
					margin-right: 8rpx;
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

				.buy-btn-box {
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

					.bg-aaa {
						background-color: #AAAAAA !important;
					}

					.share-btn {
						height: 48rpx;
						line-height: 48rpx;
						width: 48rpx;
						background-color: transparent;
						margin: 0;
						padding: 0;
						color: #656565;
						font-size: 40rpx;
						margin-right: 5rpx;
					}

					.share-btn::after {
						content: none;
					}
				}
			}
		}
	}
</style>
