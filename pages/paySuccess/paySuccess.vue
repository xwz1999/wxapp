<template>
	<view>
		<view class="flex flex-direction align-center" style="margin: 100rpx 0 50rpx;">
			<text class="cuIcon-roundcheckfill" style="font-size: 100rpx;color: green;"></text>
			<view class="text-black" style="margin: 20rpx 0 10rpx;font-size: 36rpx;">支付成功</view>
		</view>
		<button class="bg-red text-white" @tap="toIndex">返回首页</button>
		<button class="bg-white" @tap="toOrder">查看订单</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:0
			};
		},
		onLoad(options) {
			console.log(options)
			this.orderId = options.orderId
		},
		methods:{
			toIndex(){
				uni.switchTab({
					url:"../index/index"
				})
			},
			toOrder(){
				uni.reLaunch({
					url:"../orderDetail/orderDetail?orderId="+this.orderId
				})
			}
		}
	}
</script>

<style lang="scss">
	button{
		margin: 30rpx;
		&::after{
			border-color: #AAAAAA;
		}
	}
</style>
