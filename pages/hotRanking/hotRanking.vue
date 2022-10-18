<template>
	<view>
		<u-navbar back-icon-size="48" back-icon-color="#ffffff" immersive :border-bottom="false"
			:background="{background:'transparent'}"></u-navbar>
		<view class="" style="position: relative;">
			<image :src="STATIC_URL+bgImage" style="width: 100%;" mode="widthFix"></image>
			<view class="hot-pic flex justify-center">
				<image :src="STATIC_URL+titleImage" style="width: 280rpx;" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view class="goods-box">
				<goods-list :goodsList="goodsList" :isHot="true" :hideShareBtn="roleLevel==500"></goods-list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				goodsList: [],
				type: null,
				bgImage: "",
				titleImage: "",
				roleLevel: 500
			};
		},
		onLoad(options) {
			console.log(options.fromView)
			this.type = options.fromView
			if (uni.getStorageSync("userInfo").roleLevel) {
				this.roleLevel = uni.getStorageSync("userInfo").roleLevel
			}
			let requestUrl
			switch (options.fromView) {
				case "rexiao":
					requestUrl = "/api/v1/goods/hot_sell/list"
					this.bgImage = "t-bg01.png"
					this.titleImage = "t-01.png"
					break;
				case "ruiku":
					requestUrl = "/api/v1/goods/recook_make/list"
					this.bgImage = "t-bg02.png"
					this.titleImage = "t-02.png"
					break;
				case "shuma":
					requestUrl = "/api/v1/goods/digital/list"
					this.bgImage = "t-bg03.png"
					this.titleImage = "t-03.png"
					break;
				case "jiaju":
					requestUrl = "/api/v1/goods/home_live/list"
					this.bgImage = "t-bg04.png"
					this.titleImage = "t-04.png"
					break;
				case "tehui":
					requestUrl = "/api/v1/goods/recommend/list"
					this.bgImage = "goods_preferential_list_title_bg.png"
					this.titleImage = ""
					break;
				case "gaoyong":
					requestUrl = "/api/v1/goods/recommend/list"
					this.bgImage = "goods_high_commisson_list_title_bg.png"
					this.titleImage = ""
					break;
				default:
					break;
			}
			console.log(this.bgImage );
			console.log(this.titleImage );
			
			this.getList(requestUrl)
		},
		methods: {
			getList(url) {
				if(url==="/api/v1/goods/recommend/list"){
					let status = 1
					if(this.bgImage ==="goods_high_commisson_list_title_bg.png"){
						status = 1
					}else{
						status = 2
					}
					this.$u.post(url, {
							user_id: uni.getStorageSync("userInfo").id,
							status:status
						}).then(res => {
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
				}else{
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
				}
		
			}
		}
	}
</script>

<style lang="scss">
	.hot-pic {
		position: absolute;
		width: 100%;
		top: 150rpx;
		left: 0;
		z-index: 10;
	}

	.scroll {
		position: fixed;
		width: 100%;
		top: 280rpx;
		bottom: 0;
	}

	.goods-box {
		z-index: 100;

	}
</style>
