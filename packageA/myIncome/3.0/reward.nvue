<template>
	<view>
		<view class="box bg-white" style="margin-top: 20rpx;">
			<view class="item flex justify-between" @tap="toBuyInvoice">
				<view class="text-black">平台消费开票</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="item flex justify-between" @tap="toInviteTitle">
				<view class="text-black">常用开票抬头</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="item flex justify-between" @tap="toInvoiceHistory">
				<view class="text-black">开票历史</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toBuyInvoice(){
					uni.navigateTo({
						url:"../buyInvoice/buyInvoice"
					})
				},
				toInviteTitle(){
					uni.navigateTo({
						url:"../invoiceTitle/invoiceTitle"
					})
				},
				toInvoiceHistory(){
					uni.navigateTo({
						url:"../invoiceHistory/invoiceHistory"
					})
				}
			};
		}
	}
</script>

<style lang="scss">
	.item{
		line-height: 105rpx;
		margin: 0 20rpx;
		font-size: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
		&:last-child{
			border: 0;
		}
		.cuIcon-right{
			color: #AAAAAA;
			font-size: 30rpx;
		}
	}
</style>
