<template name="wholesaleOrderGoods">
	<view class="goods-box">
		
		
		<view v-for="(item,index) in goodsList" :key="index" v-if="isConfirm">
			<view class="goods-item flex" >
			
				<view class="goods-pic">
					<u-lazy-load threshold="-100" :image="judgeCover(item.pic_url)" :index="index" height="200" border-radius="10" :loading-img="IMAGE_URL + '/wxapp/null05.png'" :error-img="IMAGE_URL + '/wxapp/null05.png'"  img-mode="aspectFill"></u-lazy-load>
				</view>
				<view class="goods-con flex-sub flex flex-direction justify-between">
					<view class="">
						<view class="goods-name two-line">{{item.goods_name}}</view>
						<view class="goods-spec-con flex justify-between">
							<view class="goods-spec text-hidden">{{item.sku_name}}</view>
						</view>
					</view>
					
				</view>
				<view style="">
					<view class="flex">￥{{item.sale_price  | toFixed(2)}}</view>
					<view style="height: 20rpx;"></view>
					<view  style="text-align: right;font-size: 24rpx;color: #aaa;">共{{item.quantity}}件</view>
				</view>
			</view>
		</view>
		
		<view v-for="(item,index) in goodsList" :key="index" v-if="!isConfirm">
			<view class="goods-item flex" >
	
				<view class="goods-pic">
					<u-lazy-load threshold="-100" :image="judgeCover(item.mainPhotoUrl)" :index="index" height="200" border-radius="10" :loading-img="IMAGE_URL + '/wxapp/null05.png'" :error-img="IMAGE_URL + '/wxapp/null05.png'"  img-mode="aspectFill"></u-lazy-load>
				</view>
				<view class="goods-con flex-sub flex flex-direction justify-between">
					<view class="">
						<view class="goods-name two-line">{{item.goodsName}}</view>
						<view class="goods-spec-con flex justify-between">
							<view class="goods-spec text-hidden">{{item.skuName}}</view>
						</view>
					</view>
					
				</view>
				<view style="">
					<view class="flex">￥{{item.unitPrice - item.coinAmount | toFixed(2)}}</view>
					<view style="height: 20rpx;"></view>
					<view  style="text-align: right;font-size: 24rpx;color: #aaa;">共{{item.quantity}}件</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "wholesaleOrderGoods",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL
			};
		},
		props: {
			goodsList: {
				type: Array,
				value: null,
			},
			orderType:{
				type:Number,
				value:0
			},
			isConfirm:{
				type:Boolean,
				value:false
			}
		},
		mounted() {
				console.log(this.goodsList)
		},
		methods:{
			//判断图片
			judgeCover(val) {
				if(!val){
					return
				}
				let arr = val.split('/')
				if (arr[0] === 'http:' || arr[0] === 'https:') {
					return val
				}
				return this.IMAGE_URL + val
			},
			toChooseType(obj){
				this.$store.commit('setReturnGoodsMsg',obj);
				uni.navigateTo({
					url:"/pages/chooseAftersaleType/chooseAftersaleType"
				})
			},
			
			toDetail(id){

				uni.navigateTo({
					url:"/package_pifa/pifaGoodsDetail/pifaGoodsDetail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab_ferme{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 64rpx;
		height: 28rpx;
		background: #FFE5ED;
		border-radius: 15rpx;
		margin-right: 20rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #CC1B4F;
	}
	.goods-box {
		border-bottom: 1rpx solid #EEEEEE;
		padding: 10rpx 0;

		.goods-item {
			line-height: 40rpx;
			padding: 10rpx 0;

			.goods-pic {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}

			.goods-name {
				color: #333;
				font-size: 28rpx;
				margin-bottom: 10rpx;
				
			}

			.goods-spec {
				background-color: #EFF1F6;
				font-size: 20rpx;
				padding: 0 10rpx;
				border-radius: 10rpx;
				color: #aaa;
			}
		}
		.goods-bottom{
			.cu-btn{
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 15rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
