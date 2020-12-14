<template name="dynamics">
	<view class="find-container">
		<view class="dynamic-item" v-for="(item1,index1) in list" :key="index1">
			<view class="bg-white flex justify-between" style="padding: 30rpx;">
				<view class="avatar-left">
					<image class="avatar" lazy-load :src="IMAGE_URL+item1.headImgUrl" mode="aspectFill"></image>
				</view>
				<view class="finder-msg flex-sub flex flex-direction clear">
					<view class="avatar-right flex flex-direction justify-center">
						<view class="">{{item1.nickname}}</view>
						<view class="time">{{item1.createdAt}}</view>
					</view>
					<view class="dynamic-con">
						<view class="pic-con flex flex-wrap">
							<view class="pic-item bg-img" v-for="(item2,index2) in item1.photos" :key="index2">
								<image lazy-load style="width: 100%;height: 100%;" :src="IMAGE_URL+item2.url" mode="aspectFill" @tap="previewImage(index2,item1.photos)"></image>
							</view>
						</view>
						<view class="txt-con">{{item1.text}}</view>
					</view>

					<view class="goods-box flex justify-between" v-if="showGoodsLink">
						<view class="flex flex-sub clear align-center" @tap="toDetail(item1.goods.id)">
							<image class="goods-pic" lazy-load :src="IMAGE_URL+item1.goods.mainPhotoURL" mode="aspectFill"></image>
							<view class="goods-con flex-sub clear">
								<view class="goods-name text-hidden">{{item1.goods.name}}</view>
								<view class="goods-price">￥{{item1.goods.price}}</view>
							</view>
						</view>
						<view class="flex flex-direction justify-center">
							<button class="btn" open-type="share" :data-goods="item1.goods"><i class="iconfont iconzhuanfa"></i></button>
						</view>
					</view>

					<view class="btn-con flex">
						<view class="btn-item" @tap="downloadPic(item1.photos)">下载发圈</view>
						<view class="btn-item" @tap="copyWords(item1.text)">复制文字</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		wxSaveAuth,
		downloadImgs
	} from '../utils/download.js'
	export default {
		name: "dynamics",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL
			};
		},
		props: {
			list: {
				type: Array,
				value: [],
			},
			showGoodsLink: { //是否显示商品转发链接
				type: Boolean,
				value: false,
			}
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?id=" + id
				})
			},
			previewImage(index, images) {
				let picUrls = images.map(item => {
					return this.IMAGE_URL + item.url
				})
				console.log(picUrls)
				// return
				uni.previewImage({
					urls: picUrls,
					current: index,
					success: (res) => {
						console.log("success")
					}
				});
			},
			downloadPic(images) {
				let urls = images.map(item=>{return this.IMAGE_URL+item.url})
				// 获取保存到相册权限
				wxSaveAuth().then(res => {
					// 保存多张图片到相册
					downloadImgs(urls)
				})
			},
			copyWords(words){
				uni.setClipboardData({
					data:words,
					success: (res) => {
						console.log("success")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.dynamic-item {
		padding-top: 10rpx;

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		.avatar-right {
			height: 80rpx;
		}

		.time {
			font-size: 24rpx;
			margin-top: 6rpx;
			color: #888888;
		}

		.dynamic-con {
			.pic-con {
				padding: 20rpx 0 10rpx;
			}

			.pic-item {
				width: 190rpx;
				height: 190rpx;
				border-radius: 5rpx;
				margin-bottom: 10rpx;
				margin-right: 10rpx;
				overflow: hidden;

				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}

		.goods-box {
			background-color: #f5f5f5;
			padding: 10rpx;
			margin-top: 30rpx;
			border-radius: 5rpx;

			.goods-pic {
				width: 120rpx;
				height: 120rpx;
				border-radius: 5rpx;
				margin-right: 15rpx;
			}

			.goods-con {
				color: #666666;

				.goods-price {
					margin-top: 8rpx;
				}
			}

			.iconzhuanfa {
				padding: 0 15rpx;
				font-size: 40rpx;
				color: #333333;
			}

			.btn {
				background-color: transparent;
				border: 0;
				padding: 0;

				&::after {
					content: none;
				}
			}
		}

		.btn-con {
			padding: 30rpx 0 10rpx;

			.btn-item {
				background-color: #f1f1f1;
				font-size: 28rpx;
				width: 180rpx;
				line-height: 60rpx;
				border-radius: 35rpx;
				text-align: center;
				margin-right: 30rpx;
				color: #333333;
			}
		}
	}
</style>
