<template>
	<view>
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 80vh;">
			<image :src="IMAGE_URL + '/null05.png'"  style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无评论</view>
		</view>
		<view v-else class="">
			<view class="comment-box">
				<view class="comment-item bg-white flex justify-between" v-for="(item1,index1) in comments" :key="index1">
					<view class="flex justify-between bg-white">
						<view class="avatar">
							<u-lazy-load threshold="-100" :image="IMAGE_URL+item1.headImgUrl" :index="index1" :error-img="IMAGE_URL + '/null05.png'" 
							 border-radius="30" height="60"></u-lazy-load>
						</view>
						<view class="right-con flex-sub">
							<view class="name-con flex flex-direction justify-center">
								<view class="name text-hidden">{{item1.nickname}}</view>
								<view class="time">{{item1.createdAt}}</view>
							</view>
							<view class="content">{{item1.content}}</view>
							<view class="pic-con flex flex-wrap">
								<view class="pic-item bg-img" v-for="(item2,index2) in item1.photos" :key="index2" @tap="previewImage(index2,item1.photos)">
									<u-lazy-load threshold="-100" :image="IMAGE_URL+item2.url" :index="index2" :error-img="IMAGE_URL + '/null05.png'" 
									 height="190" border-radius="5" img-mode="aspectFill"></u-lazy-load>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				id: 0,
				comments: [],
				stopLoad: false,
				isNull: false,
				page: 0,
				loadStatus:"loadmore"
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = parseInt(options.id)
				this.getComments()
			}
		},
		methods: {
			getComments() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				this.$u.post('/api/v1/goods/evaluations/list', {
					userId: uni.getStorageSync("userInfo").id,
					goodsId: this.id,
					page: this.page++
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data
					if (list.length == 0) {
						this.loadStatus = "nomore"
						this.stopLoad = true
						if (this.page == 1) {
							this.isNull = true
						}
						return
					}
					if(list.length < 10){
						this.loadStatus = "nomore"
					}
					this.comments.push(...list)
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
			}
		},
		onReachBottom() {
			this.getComments()
		}
	}
</script>

<style lang="scss">
	.comment-item {
		padding: 30rpx;
		margin-bottom: 20rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			overflow: hidden;
		}

		.name-con {
			height: 80rpx;

			.time {
				font-size: 22rpx;
				color: #888888;
				margin-top: 8rpx;
			}
		}

		.content {
			padding: 20rpx 0;
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
</style>
