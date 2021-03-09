<template name="liveVideos">
	<view class="flex flex-direction" style="height: 100%;">
		<!-- <view class="">
			这里是我关注的主播直播列表scroll-view
		</view> -->
		<scroll-view class="flex-sub" style="height: 0;" scroll-y="true" @scrolltolower="getVideos">
			<view class="live-container flex justify-between flex-wrap">
				<view class="live-item bg-white" v-for="(item,index) in liveVideos" :key="index">
					<view class="live-main-pic">
						<u-lazy-load threshold="-100" :image="item.cover" :index="index" :error-img="IMAGE_URL + '/null05.png'"  @click="toLiveDetail(item.id)"></u-lazy-load>
						<view class="icon text-white flex">
							<text class="cuIcon-playfill"></text>
							<text style="padding: 0 8rpx;">{{item.look}}人看过</text>
						</view>
					</view>
					<view class="live-con flex justify-between bg-white">
						<view class="flex flex-direction justify-between live-con-left flex-sub clear">
							<view class="live-title two-line">{{item.title}}</view>
							<view class="live-user-msg flex">
								<view class="avatar">
									<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" :error-img="IMAGE_URL + '/null05.png'"  height="40" border-radius="20" mg-mode="aspectFill"></u-lazy-load>
								</view>
								<view class="user-name text-hidden flex-sub">{{item.nickname}}</view>
							</view>
						</view>
						<view class="live-con-right">
							<view class="goods-pic">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" :error-img="IMAGE_URL + '/null05.png'" 
								 height="100" mg-mode="aspectFill"></u-lazy-load>
							</view>
							<view class="text-center price">￥{{item.originalPrice}}</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus2" margin-top="10" margin-bottom="20"/>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "liveVideos",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				page1: 1,
				limit1: 15,
				page2: 1,
				limit2: 15,
				stopLoad2: false,
				loadStatus2:'loadmore',
				liveVideos: [],
				followList: []
			};
		},
		props: {

		},
		mounted() {
			// this.getFollowList()
			this.getVideos()
		},
		methods: {
			getFollowList() {
				this.$u.post("/api/v1/live/live/follow_list", {
					page: this.page1,
					limit: this.limit1
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data
					this.followList.push(...list)
				});
			},
			getVideos() {
				if (this.stopLoad2) {
					return
				}
				this.loadStatus2 = "loading"
				let sendData = {
					page: this.page2,
					limit: this.limit2
				}
				this.page2++
				this.$u.post("/api/v1/live/live/list", sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data
					if (list.length == 0) {
						this.stopLoad2 = true
						this.loadStatus2 = "nomore"
						return
					}
					this.liveVideos.push(...list)
				});
			},
			toLiveDetail(id){
				uni.navigateTo({
					url:"/pages/livePlayback/livePlayback?id="+id
				})
			}
		}

	}
</script>

<style lang="scss">
	.live-container {
		padding: 10rpx 15rpx;

		.live-item {
			width: 340rpx;
			border-radius: 20rpx;
			overflow: hidden;
			margin: 12rpx 10rpx;

			.live-main-pic {
				width: 340rpx;
				height: 340rpx;
				position: relative;

				image {
					background-color: #FFFFFF;
				}

				.icon {
					position: absolute;
					top: 20rpx;
					left: 20rpx;
					border-radius: 8rpx;
					overflow: hidden;
					line-height: 32rpx;
					font-size: 20rpx;
					background-color: rgba(0, 0, 0, 0.2);

					.cuIcon-playfill {
						width: 32rpx;
						text-align: center;
						background-color: rgba(0, 0, 0, 0.3);
					}
				}
			}

			.live-con {
				padding: 20rpx;

				.live-title {
					font-size: 28rpx;
					color: #000000;
					// font-weight: 700;
				}

				.live-user-msg {
					line-height: 40rpx;
					font-size: 24rpx;

					.avatar {
						width: 40rpx;
						height: 40rpx;
						border-radius: 20rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.live-con-right {
			width: 100rpx;
			margin-left: 15rpx;
			background-color: #F9F9F9;
			border-radius: 10rpx;
			overflow: hidden;

			.goods-pic {
				width: 100rpx;
				height: 100rpx;
				background-color: #f1f1f1;
			}

			.price {
				font-size: 20rpx;
				color: #000000;
			}
		}
	}
</style>
