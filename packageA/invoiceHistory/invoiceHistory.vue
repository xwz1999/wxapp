<template>
	<view>
		<view class="box">
			<view class="item bg-white" v-for="(item,index) in 6" :key="index" @tap="toDetail">
				<view class="item-top flex justify-between">
					<view class="flex">
						<text class="cuIcon-timefill" style="color: #FD8637;margin-right: 10rpx;"></text>
						<view class="">2020-03-20 12:23</view>
					</view>
					<text class="cuIcon-right" style="color: #DDDDDD;"></text>
				</view>
				<view class="item-center flex justify-between align-center">
					<view class="flex">
						<view class="">出行服务</view>
						<view class="tip">电子发票</view>
					</view>
					<view class="">
						<text style="font-size: 48rpx;color: #333;margin-right: 10rpx;">219</text>元
					</view>
				</view>
				<view class="item-bottom" :class="type==0?'text-gray':type==1?'text-green':type==2?'text-red':''">
					{{type==0?'已开票':type==1?'开票中':type==2?'开票失败':''}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1
			};
		},
		methods:{
			toDetail(){
				uni.navigateTo({
					url:"../invoiceDetail/invoiceDetail"
				})
			}
		}
	}
</script>

<style lang="scss">
.item{
	margin: 30rpx;
	border-radius: 16rpx;
	.item-top{
		line-height: 80rpx;
		padding: 0 25rpx;
		font-size: 30rpx;
	}
	.item-center{
		height: 100rpx;
		padding: 0 25rpx;
		padding-left: 50rpx;
		.tip{
			background-color: #E2F3FF;
			color: #63BCFF;
			border: 1rpx solid #63BCFF;
			border-radius: 10rpx;
			line-height: 40rpx;
			font-size: 22rpx;
			width: 110rpx;
			text-align: center;
			margin-left: 10rpx;
		}
	}
	.item-bottom{
		padding: 0 25rpx;
		line-height: 80rpx;
		border-top: 2rpx dashed #f1f1f1;
	}
}
</style>
