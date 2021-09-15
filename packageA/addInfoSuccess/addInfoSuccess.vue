<template>
	<view>
		<view class="box flex flex-direction align-center">
			<image :src="IMAGE_URL+'/default/officaillogo-1.png'" mode="widthFix"></image>
			<view style="margin: 30rpx 0;font-size: 40rpx;color: #333333;">提交成功</view>
			<view style="color: #999999;font-size: 28rpx;">您的资料已提交，请耐心等待审核，届时将有工作人员和您联系</view>
		</view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white" @tap="toIndex">进入首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL
			};
		},
		methods:{
			toIndex(){
				uni.switchTab({
					url:"../index/index"
				})
			}	
		}
	}
</script>

<style lang="scss">
.box{
	margin: 100rpx 30rpx;
	image{
		width: 160rpx;
		box-shadow: 5rpx 5rpx 10rpx 3rpx rgba(0, 0, 0, 0.3);
	}
}
.btn-box {
		position: fixed;
		width: 100%;
		bottom: 150rpx;
	}
</style>
