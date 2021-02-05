<template>
	<view>
		<camera device-position="back" mode="scanCode" flash="off" @error="error" @scancode='scancode'  style="width: 100%; height: 500px;">
			<!-- <cover-image class='cover-corner cover-left-top' src='/images/left-top.png'></cover-image>
			<cover-image class='cover-corner cover-right-top' src='/images/right-top.png'></cover-image>
			<cover-image class='cover-corner cover-left-bottom' src='/images/left-bottom.png'></cover-image>
			<cover-image class='cover-corner cover-right-bottom' src='/images/right-bottom.png'></cover-image> -->
		  
			<!-- <cover-view class="">
				<cover-view>图片</cover-view>
				<cover-view>......</cover-view>
			</cover-view> -->
		</camera>
			<view>
				<view>图片</view>
				<view>手动输入</view>
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src:""
		}
	},
	methods: {
		scancode(e){
			// 校验扫描结果，并处理
		    let res = e.detail.result
			
		    console.log(e)
		},
		error(e) {
			console.log(e.detail);
		}
	}
}
</script>

<style lang="scss">
</style>
