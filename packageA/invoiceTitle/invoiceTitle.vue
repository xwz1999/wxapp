<template>
	<view>
		<view class="box bg-white">
			<view class="item flex justify-between align-center" v-for="(item,index) in 3" :key="index">
				<view class="flex">
					<view class="">阿库</view>
					<view class="default">默认</view>
				</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white" @tap="toAddInvoiceTitle">添加发票抬头</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toAddInvoiceTitle(){
					uni.navigateTo({
						url:"../addInvoiceTitle/addInvoiceTitle"
					})
				}
			};
		}
	}
</script>

<style lang="scss">
.box{
	margin-top: 20rpx;
	.item{
		padding: 0 30rpx;
		height: 100rpx;
		border-bottom: 1rpx solid #f5f5f5;
		&:last-child{
			border: 0;
		}
		.default{
			font-size: 24rpx;
			color: #FA6400;
			border: 1rpx solid #FA6400;
			border-radius: 5rpx;
			margin-left: 5rpx;
			padding: 0 5rpx;
		}
	}
}
.btn-box{
	position: fixed;
	width: 100%;
	bottom: 0;
}
</style>
