<template>
	<view>
		<view v-if="status==1" class="flex flex-direction align-center">
			<image style="width: 136rpx;margin: 100rpx 0 20rpx;" :src="IMAGE_URL + '/mine/success.png'" mode="widthFix"></image>
			<view style="font-size: 36rpx;">恭喜你，认证成功！</view>
		</view>
		<view v-if="status==0" class="flex flex-direction align-center">
			<image style="width: 136rpx;margin: 100rpx 0 20rpx;" :src="IMAGE_URL + '/mine/fail.png'" mode="widthFix"></image>
			<view style="font-size: 36rpx;">认证失败！请<text class="text-red" @tap="back">重新认证</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:0
			};
		},
		onLoad(options) {
			this.status = options.status
		},
		methods:{
			back(){
				uni.redirectTo({
					url:"/packageA/realname/realname"
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
