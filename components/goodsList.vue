<!-- 组件里面的本地图片路径要改成绝对路径，否则报错 -->
<template name="goodsList">
	<view class="goods-box">
		<view class="goods-item" v-for="(item,index) in goodsList" :key="index" @tap="goPage(item.goodsId)">
			<navigator hover-class="none" class="goods-item-con bg-white flex justify-between">
				<view class="goods-pic clear" v-if="item.mainPhotoUrl">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" height="260" border-radius="10"
					 loading-img="/static/null05.png" error-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
					<view class="goods-mask flex justify-center" v-if="item.inventory==0">
						<image :src="STATIC_URL+'sale_out.png'" mode="widthFix"></image>
					</view>
				</view>
				<view class="goods-msg flex-sub clear flex flex-direction justify-between">
					<view class="goods-msg-top flex align-start">

						<view class="" style="flex: 1;">
							<view class="goods-name two-line">
								<view class="text-center text-white" 
								style="display: inline-block; background: #CC1B4F;font-size: 20rpx; width:48rpx;height: 40rpx;line-height: 40rpx; border-radius: 6rpx;margin-right: 8rpx;"
								 v-if="item.isImport">
									<text>进口</text>
								</view> <text>{{item.goodsName}}</text>
							</view>
							<view class="goods-key-box text-hidden">{{item.description}}</view>
						</view>

					</view>
					<view class="goods-msg-bottom" style="font-size: 24rpx;">
						<view class="shop-msg flex align-center" style="margin: 16rpx 0;" @tap.stop="">
							<view class="shop-logo">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item.brandImg" :index="index" height="30" error-img="/static/null05.png"
								 img-mode="aspectFill"></u-lazy-load>
							</view>
							<navigator :url="'/pages/search/search?brandId='+item.brandId" hover-class="none" class="shop-name text-red text-hidden"
							 style="font-size: 24rpx;">{{item.brandName}}</navigator>
						</view>
						<view class="ticket-box flex justify-between align-center" style="margin-bottom: 5rpx;">
							<view class="ticket-con flex align-center">
								<view style="position: relative;margin-right: 10rpx;" v-if="item.coupon">
									<image class="tic-pic" src="/static/index/tic.png" mode="heightFix"></image>
									<view class="tic-txt text-white">{{item.coupon}}元券</view>
								</view>
								<view style="position: relative;" v-if="item.commissionDesc&&!hideShareBtn">
									<image class="tic-pic" src="/static/index/tic2.png" mode="heightFix"></image>
									<view class="tic-txt text-red">{{item.commissionDesc}}</view>
								</view>
							</view>
							<view style="color: #666;">已售{{item.totalSalesVolume}}件</view>
						</view>
						<view class="buy-btn-box flex justify-between">
							<view class="flex align-end" style="font-size: 24rpx;">
								<text class="text-orange">券后</text>
								<text class="text-red">￥</text>
								<text class="text-red" style="font-size: 36rpx;line-height: 36rpx;font-weight: 700;">{{item.price}}</text>
								<text class="text-gray" style="text-decoration: line-through;margin-left: 10rpx;">￥{{item.primePrice}}</text>
							</view>
							<view class="goods-btns flex align-end">
								<!-- IMAGE_URL+item.mainPhotoUrl -->
								<button v-if="!hideShareBtn" class="share-btn text-center" @tap.stop="" :data-url='item.mainPhotoUrl'
								 :data-title="item.goodsName" :data-id="item.goodsId" open-type="share">
									<view class="iconfont iconfenxiang"></view>
								</button>
								<view class="buy-btn text-white round" :class="item.inventory==0?'bg-aaa':'bg-red'">{{item.inventory==0?'已售完':'自购'}}</view>
							</view>
						</view>
					</view>
				</view>

			</navigator>
		</view>
	</view>
</template>

<script>
	export default {

		name: "goodsList",
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
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
			},
			hideShareBtn: {
				type: Boolean,
				value: true
			}
		},
		methods: {
			shareBtn(name, id, url) {
				let data = {
					name: name,
					id: id,
					url: url,
				}
				this.$emit('shareBtn', data)

			},
			goPage(id) {
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?id=" + id
				})
			}
		},
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
					overflow: hidden;

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
					line-height: 40rpx;
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
					height: 32rpx;
					width: auto;
				}

				.tic-txt {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					text-align: center;
					line-height: 32rpx;
					font-size: 22rpx;
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
