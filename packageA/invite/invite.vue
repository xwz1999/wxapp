<template>
	<view class="">
		<view class="box">
			<!-- IMAGE_URL -->
			<image :src="`${IMAGE_URL}/wxapp/shop/invite.jpg`" mode="widthFix" style="width: 750rpx;"></image>
			<view class="tips" @tap='tipsShow'>

			</view>
			<u-popup v-model="show" mode="center" :closeable='true'>
				<view>
					<image :src="`${IMAGE_URL}/wxapp/shop/invite_tips.jpg`" mode="widthFix" style="width: 600rpx;"></image>
				</view>
			</u-popup>
			<button class="invite_btn" open-type="share">
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				show: false
			};
		},
		methods: {
			tipsShow() {
				this.show = true
					console.log(uni.getStorageSync("userInfo"))
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target.dataset)
			}
	
			let code = uni.getStorageSync("userInfo").introCode
			return {
				title: "瑞库客邀你玩转店铺，快来一起体验吧！",
				path: '/packageA/apply/apply?code=' + code + "&type=share"
			}
		},
		// onShareAppMessage(res) {
		// 	if (res.from === 'button') { // 来自页面内分享按钮
		// 		console.log(res.target.dataset)
		// 	}
		// 	return {
		// 		title: "我在买快来看看吧！",
		// 		path: '/pages/goodsDetail/goodsDetail?id=' + res.target.dataset.id + "&type=share",
		// 		imageUrl: this.IMAGE_URL + res.target.dataset.url
		// 	}
		// },
	}
</script>

<style lang="scss" scoped>
	.box {
		position: relative;

		.invite_btn {
			position: absolute;
			bottom: 75rpx;
			left: 10%;
			right: 10%;
			opacity: 0;
			height: 110rpx;
		}

		.tips {
			position: absolute;
			bottom: 235rpx;
			left: 34%;
			right: 37%;
			opacity: 0;
			height: 70rpx;
		}


	}
</style>
