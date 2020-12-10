<template>
	<view>
		<view class="" style="position: relative;">
			<text class="text-white cuIcon-back back" @tap="back"></text>
			<image v-if="type=='rexiao'" src="../static/t-bg01.png" style="width: 100%;" mode="widthFix"></image>
			<image v-if="type=='ruiku'" src="../static/t-bg02.png" style="width: 100%;" mode="widthFix"></image>
			<image v-if="type=='shuma'" src="../static/t-bg03.png" style="width: 100%;" mode="widthFix"></image>
			<image v-if="type=='jiaju'" src="../static/t-bg04.png" style="width: 100%;" mode="widthFix"></image>
			<view class="hot-pic flex justify-center">
				<image v-if="type=='rexiao'" src="../static/t-01.png" style="width: 280rpx;" mode="widthFix"></image>
				<image v-if="type=='ruiku'" src="../static/t-02.png" style="width: 280rpx;" mode="widthFix"></image>
				<image v-if="type=='shuma'" src="../static/t-03.png" style="width: 280rpx;" mode="widthFix"></image>
				<image v-if="type=='jiaju'" src="../static/t-04.png" style="width: 280rpx;" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view class="goods-box">
				<goods-list :goodsList="goodsList" :isHot="true"></goods-list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				type: null
			};
		},
		onLoad(options) {
			console.log(options.fromView)
			this.type = options.fromView
			let requestUrl
			switch (options.fromView) {
				case "ruiku":
					requestUrl = "/api/v1/goods/recook_make/list"
					break;
				case "jiaju":
					requestUrl = "/api/v1/goods/home_live/list"
					break;
				case "shuma":
					requestUrl = "/api/v1/goods/digital/list"
					break;
				case "rexiao":
					requestUrl = "/api/v1/goods/hot_sell/list"
					break;
				default:
					break;
			}
			this.getList(requestUrl)
		},
		methods: {
			getList(url) {
				this.$u.post(url).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goodsList = res.data.data
					for (let i = 0; i < this.goodsList.length; i++) {
						this.goodsList[i].totalSalesVolume = this.goodsList[i].salesVolume
						this.goodsList[i].price = this.goodsList[i].discountPrice
						this.goodsList[i].primePrice = this.goodsList[i].originalPrice
						this.goodsList[i].goodsId = this.goodsList[i].id
					}

				});
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.hot-pic {
		position: absolute;
		width: 100%;
		top: 100rpx;
		left: 0;
		z-index: 10;
	}

	.back {
		position: absolute;
		left: 30rpx;
		top: 100rpx;
		font-size: 60rpx;
		z-index: 1000;
	}

	.scroll {
		position: fixed;
		width: 100%;
		top: 200rpx;
		bottom: 0;
	}

	.goods-box {
		z-index: 100;

	}
</style>
