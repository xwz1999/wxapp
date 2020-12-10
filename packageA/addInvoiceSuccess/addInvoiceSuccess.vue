<template>
	<view>
		<view class="flex flex-direction align-center" style="margin: 100rpx 0 50rpx;">
			<text class="cuIcon-roundcheckfill" style="font-size: 100rpx;color: #FA873A;"></text>
			<view class="text-black" style="margin: 20rpx 0 10rpx;font-size: 36rpx;">提交成功</view>
			<view style="font-size: 26rpx;color: #AAAAAA;">您的发票预计将在24小时内开出，请注意查收</view>
		</view>
		<button class="bg-red text-white" @tap="toInvoiceIndex">发票首页</button>
		<button class="bg-white" @tap="toInvoiceHistory">开票历史</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toInvoiceIndex(){
				uni.navigateBack()
			},
			toInvoiceHistory(){
				uni.redirectTo({
					url:"../invoiceHistory/invoiceHistory"
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
