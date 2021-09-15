<template name="largeImageList">
	<view class="goods-container flex flex-wrap justify-between">
		<view class="goods-item bg-white" v-for="(item,index) in goodsList" :key="index">
			<navigator :url="'/pages/goodsDetail/goodsDetail?id='+(situation==3?item.id:item.goodsId)" class="goods-pic bg-img">
				<u-lazy-load threshold="-100" :image="IMAGE_URL+(situation==2?item.main_photo_url:item.mainPhotoUrl)" :index="index" height="328" :loading-img='IMAGE_URL+"/null05.png"' :error-img='IMAGE_URL+"/null05.png"' img-mode="aspectFill"></u-lazy-load>
				<view class="goods-mask flex justify-center" v-if="item.inventory==0">
					<image :src="STATIC_URL+'sale_out.png'" mode="widthFix"></image>
				</view>
			</navigator>
			<view class="goods-name-box">
				<view class="goods-name two-line">
					<image v-if="item.isImport" :src="IMAGE_URL+item.country_icon"></image>
					<image v-else-if=country_icon :src="IMAGE_URL+country_icon" ></image>
					<text>{{situation==2?item.goods_name:item.goodsName}}</text>
				</view>
			</view>
			<view class="shop-msg flex align-center" style="margin: 16rpx 0;" @tap.stop="">
				<view class="shop-logo">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+(situation==2?item.brand_logo:item.brandImg)" :index="index"
						height="30" :error-img="IMAGE_URL + '/null05.png'" img-mode="aspectFill">
					</u-lazy-load>
				</view>
				<navigator :url="'/pages/search/search?brandId='+item.brandId" hover-class="none"
					class="shop-name text-red text-hidden" style="font-size: 24rpx;">{{situation==2?item.brand_name:item.brandName}}
				</navigator>
			</view>
			<view class="ticket-con flex align-center">
				<view style="position: relative;margin-right: 10rpx;" v-if="item.coupon">
					<image class="tic-pic" :src="IMAGE_URL+'/tic.png'" mode="heightFix"></image>
					<view class="tic-txt text-white">{{item.coupon}}元券</view>
				</view>
				<view style="position: relative;" v-if="(situation==2||situation==3)?item.commission:item.commissionDesc">
					<image class="tic-pic" :src="IMAGE_URL+'/tic2.png'" mode="heightFix"></image>
					<view class="tic-txt text-red">赚{{(situation==2||situation==3)?item.commission:item.commissionDesc}}</view>
				</view>
			</view>
			<view class="price-con flex justify-between">
				<view style="color: #AAAAAA;text-decoration: line-through;">￥{{situation==3?item.originalPrice:item.primePrice}}</view>
				<view style="color: #666666;">累计已售{{(situation==2||situation==3)?item.salesVolume:item.totalSalesVolume}}件</view>
			</view>
			<view class="flex justify-between align-end">
				<view class="text-red" style="font-size: 26rpx;">券后￥<text style="font-size: 36rpx;font-weight: 700;">{{situation==3?item.discountPrice:item.price}}</text></view>
				<navigator :url="'/pages/goodsDetail/goodsDetail?id='+(situation==3?item.id:item.goodsId)" class="buy-btn text-white round" :class="item.inventory==0?'bg-aaa':'bg-red'">{{item.inventory==0?'已售完':'自购'}}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "largeImageList",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				STATIC_URL:this.STATIC_URL
			}
		},
		props: {
			goodsList: {
				type: Array,
				value: [],
			},
			// situation :  不同场景接口返回的list字段名不同，因此按数据分为不同situation
			//    0  21/09月前开发场景使用
			//    1  发现-发布素材
			//    2  进口商品
			//    3  购物车-猜你喜欢
			situation:{
				type:Number,
				value:0
			},
			// 进口商品 名称前国家标识
			country_icon:{
				type:String,
				value:null
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
