<template>
	<view>
		<view class="box bg-white">
			<view class="goods-box flex">
				<view class="bg-img goods-pic" :style="'background-image: url('+ IMAGE_URL+ returnGoods.mainPhotoUrl+');'"></view>
				<view class="flex-sub flex flex-direction justify-between clear">
					<view class="">
						<view class="goods-name text-hidden text-black">{{returnGoods.goodsName}}</view>
						<view class="des">{{returnGoods.skuName}}</view>
					</view>
					<view class="flex justify-between" style="font-size: 28rpx;">
						<view class="">订单金额<text class="text-red" style="margin-left: 10rpx;">￥{{returnGoods.actualAmount}}</text></view>
						<view class="">购买数量<text class="text-black" style="margin-left: 10rpx;">{{returnGoods.quantity}}</text></view>
					</view>
				</view>
			</view>
			<view class="type-box">
				<navigator :url="'/packageA/returnGoods/returnGoods?type='+index" class="type-item flex" v-for="(item,index) in list" :key="index">
					<view class="flex-sub flex">
						<image :src="item.icon" mode="widthFix"></image>
						<view class="flex-sub flex justify-between item-right">
							<view class="flex-sub justify-between">
								<view class="text-black type">{{item.type}}</view>
								<view class="des">{{item.des}}</view>
							</view>
							<view class="flex flex-direction justify-center">
								<text class="cuIcon-right"></text>
							</view>	
						</view>					
					</view>				
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL,
				list:[
					{
						icon: this.IMAGE_URL + "/shop/a01.png",
						type:"我要退款(无需退货)",
						des:"没收到货，或与平台协商同意不用退货只退款"
					},
					{
						icon: this.IMAGE_URL + "/shop/a02.png",
						type:"我要退货退款",
						des:"已收到货，需要退还已收到的货物"
					}
					// {
					// 	icon: IMAGE_URL + "/shop/a03.png",
					// 	type:"我要换货",
					// 	des:"已收到货，需要更换已收到的货物"
					// }
				]
			};
		},
		computed: {
			returnGoods() {
				return this.$store.state.returnGoodsMsg
			}
		},
	}
</script>

<style lang="scss">
.box{
	border-radius: 10rpx;
	margin: 30rpx;
	.goods-box{
		padding: 20rpx;
		.goods-pic{
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.des{
			color: #aaa;
			margin-top: 15rpx;
			font-size: 26rpx;
		}
	}
	.type-box{
		border-top: 1rpx solid #F1F1F1;
		.type-item{
			padding: 30rpx;
			padding-bottom: 0;
			image{
				width: 40rpx;
				margin-right: 20rpx;
			}
			.type{
				font-weight: 900;
			}
			.des{
				font-size: 26rpx;
				margin-top: 10rpx;
				color: #AAAAAA;
			}
			.item-right{
				border-bottom: 1rpx dashed #f1f1f1;
				padding-bottom: 30rpx;
			}
			&:last-child .item-right{
				border: 0;
			}
			.cuIcon-right{
				color: #DDDDDD;
			}
		}
	}
}
</style>
