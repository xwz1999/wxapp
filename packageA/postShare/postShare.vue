<template>
	<view class="">
		<view class="swiper">
			<view class="indicator_dsn">
				<view :class="['dot',  swiperCurrent==index ? 'active' : '']" v-for="(item,index) in postSharePic">
				</view>
			</view>
			<swiper class="swiperItem" indicator-dots="false"  @change="swiperChange">
				<block v-for="(item,index) in postSharePic">
					<swiper-item>
						<image :src="IMAGE_URL+item" class="img"  mode="widthFix">
						</image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="bottom "><button class="button " @click="save">保存海报图片到相册</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				postSharePic: ["/uni-program/postShare/postShare1.jpg", "/uni-program/postShare/postShare2.jpg",
					"/uni-program/postShare/postShare3.jpg"
				],
				current: 0,
				swiperCurrent: 0
			}

	},
	methods: {
		swiperChange: function swiperChange(e) {
			this.swiperCurrent = e.detail.current;
		},
		save: function save() {
			uni.downloadFile({
				url: this.IMAGE_URL + this.postSharePic[this.swiperCurrent],
				success: function success(res) {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function success() {
								uni.showToast({
									title: "保存成功",
									icon: "none"
								});

							},
							fail: function fail() {
								uni.showToast({
									title: "保存失败，请稍后重试",
									icon: "none"
								});

							}
						});

					}
				}
			});


		}
	}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		.swiperItem {
			height: 1200rpx;

			.img {
				margin: auto;
			}
		}

		.indicator_dsn {
			display: flex;
			justify-content: center;
			margin: 40rpx;

			.dot {
				margin: 0 8rpx;
				width: 12rpx;
				height: 12rpx;
				background: rgba(235, 237, 240, 0.3);
				opacity: 1;
				border: 2rpx solid #ff0087;
				border-radius: 8rpx;
			}

			.dot.active {
				background: #ff0087;
			}
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;

		.button {
			height: 50px;
			background: #d64713;
			width: 90%;
			border-radius: 50rpx;
			margin: 10rpx auto;
			color: #fff;
		}
	}
</style>
