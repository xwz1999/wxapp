<template name="dynamics">
	<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getList">
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 70vh;width: 100vw;">
			<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无动态</view>
		</view>
		<view class="find-container" v-else>
			<view class="dynamic-item" v-for="(item1,index1) in dynamics" :key="index1">
				<view class="bg-white flex justify-between" style="padding: 30rpx;">
					<view class="avatar">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+item1.headImgUrl" :index="index1" error-img="/static/null05.png" height="80" border-radius="40" img-mode="aspectFill"></u-lazy-load>		
					</view>
					<view class="finder-msg flex-sub flex flex-direction clear">
						<view class="avatar-right flex flex-direction justify-center">
							<view class="">{{item1.nickname}}</view>
							<view class="time">{{item1.createdAt}}</view>
						</view>
						<view class="dynamic-con">
							<view class="pic-con flex flex-wrap">
								<view class="pic-item bg-img" v-for="(item2,index2) in item1.photos" :key="index2" @tap="previewImage(index2,item1.photos)">
									<u-lazy-load threshold="-100" border-radius="5" :image="IMAGE_URL+item2.url" :index="index2" error-img="/static/null05.png" height="190" img-mode="aspectFill"></u-lazy-load>
								</view>
							</view>
							<view class="txt-con">{{item1.text}}</view>
						</view>
						<view class="goods-container flex justify-between" v-if="showGoodsLink" @tap="toDetail(item1.goods.id)">
							<view class="goods-pic">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item1.goods.mainPhotoURL" :index="index" borderRadius="10" height="120" error-img="/static/null05.png" loading-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
							</view>
							<view class="goods-name flex-sub flex flex-direction justify-center clear">
								<view class="name text-hidden">{{item1.goods.name}}</view>
								<view class="price">￥{{item1.goods.price}}</view>
							</view>
							<view class="goods-share flex flex-direction justify-center" @tap.stop="">
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
			<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20"/>
		</view>
	</scroll-view>
</template>

<script>
	import {
		wxSaveAuth,
		downloadImgs
	} from '@/utils/download.js'
	export default {
		name: "dynamics",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				reqUrl: "",
				sendData: {},
				page: 0,
				isNull: false,
				dynamics: [],
				stopLoad: false,
				loadStatus:'loadmore'
			};
		},
		props: {
			goodsId: {
				type: Number,
				value: 0
			},
			showGoodsLink: { //是否显示商品转发链接(发现页面含有链接，详情页没有)
				type: Boolean,
				value: false,
			}
		},
		mounted() {
			console.log(this.goodsId)
			this.getList()
		},
		methods: {
			// 获取该商品发圈素材列表
			getList() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				if (this.goodsId) {
					this.reqUrl = "/api/v1/goods/detail/moments_copy/list"
					this.sendData = {
						goodsId: this.goodsId
					}
				} else {
					this.reqUrl = "/api/v1/attention/list/moment_copy"
					this.sendData = {
						userId: uni.getStorageSync("userInfo").id,
						page: this.page
					}
				}
				this.page++
				this.$u.post(this.reqUrl, this.sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data
					if (list.length == 0) {
						this.stopLoad = true
						this.loadStatus = "nomore"
						if (this.page == 1) {
							console.log("没有数据")
							this.isNull = true
						}
						return
					}
					// 为了防止第一页商品数量不够时scrollview不能触底导致底部一直显示正在加载
					if (list.length < 5) {
						this.loadStatus = "nomore"
					}
					this.dynamics.push(...list)
				})
			},
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
				let urls = images.map(item => {
					return this.IMAGE_URL + item.url
				})
				// 获取保存到相册权限
				wxSaveAuth().then(res => {
					// 保存多张图片到相册
					downloadImgs(urls)
				})
			},
			copyWords(words) {
				uni.setClipboardData({
					data: words,
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
			overflow: hidden;
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

		.goods-container {
			background-color: #F5F5F5;
			padding: 10rpx;
			margin-top: 30rpx;
		
			.goods-pic {
				width: 120rpx;
				height: 120rpx;
				margin-right: 10rpx;
		
				image {
					background-color: #F5F5F5;
				}
			}
		
			.goods-share {
				.btn {
					background-color: transparent;
					border: 0;
					padding: 0 20rpx;
		
					&::after {
						content: none;
					}
				}
		
				.iconfont {
					font-size: 40rpx;
					color: #888888;
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
