<template name="orderGoods">
	<view class="goods-box">
		<view v-for="(item,index) in goodsList" :key="index">
			<view class="goods-item flex">
				<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId" hover-stop-propagation @tap.stop="" class="goods-pic">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" height="200" border-radius="10" loading-img="/static/null05.png" error-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
				</navigator>
				<view class="goods-con flex-sub flex flex-direction justify-between">
					<view class="">
						<view class="goods-name two-line">{{item.goodsName}}</view>
						<view class="goods-spec-con flex justify-between">
							<view class="goods-spec text-hidden">{{item.skuName}}</view>
							<view class="goods-num" style="color:#aaa;">*{{item.quantity}}</view>
						</view>
					</view>
					<view class="flex justify-between" style="font-size: 28rpx;color: #FA6400;">
						<view class="">￥{{item.unitPrice | toFixed(2)}}</view>
						<view v-if="item.rStatus">{{item.rStatus}}</view>
					</view>
				</view>
			</view>
			<view class="goods-bottom flex justify-end" style="margin: 10rpx 0;" v-if="item.orderType==1&&item.rStatus=='待发货'">
				<button class="cu-btn lines-gray text-gray round" hover-stop-propagation @tap.stop="returnMoney(item.goodsDetailId)">申请退款</button>
			</view>
			<view class="goods-bottom flex justify-end" style="margin: 10rpx 0;" v-if="item.orderType==1&&item.rStatus=='已发货'">
				<button class="cu-btn lines-gray text-gray round" hover-stop-propagation @tap.stop="toChooseType(item)">申请售后</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orderGoods",
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
			}
		},
		methods:{
			//未发货申请退款
			returnMoney(id){
				uni.showModal({
				    title: '提示',
				    content: '确认申请退款吗？',
				    success: (res)=> {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this.$u.post('/api/v1/order/refund',{
								userId: uni.getStorageSync("userInfo").id,
								orderGoodsIDs:[id]
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								uni.navigateTo({
									url:"/pages/afterSaleDetail/afterSaleDetail?orderGoodsId="+id
								})
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			toChooseType(obj){
				this.$store.commit('setReturnGoodsMsg',obj);
				uni.navigateTo({
					url:"/pages/chooseAftersaleType/chooseAftersaleType"
				})
			}
		}
	}
</script>

<style lang="scss">
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
				color: #000;
				font-size: 28rpx;
				margin-bottom: 10rpx;
				font-size: 32rpx;
				color: #000;
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
