<template name="liveVideos">
	<view class="flex flex-direction" style="height: 100%;">

		<scroll-view class="flex-sub" style="height: 0;" @scrolltolower="getVideos"  scroll-y="true" :refresher-threshold="100" :refresher-enabled='refresherEnabled'
		 @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"
		 :refresher-triggered="triggered">
			<view class="live-container flex justify-between flex-wrap">
				<!-- 	<view class="">
					这里是我关注的主播直播列表scroll-view
				</view> -->
				<view class="live-item bg-white" v-for="(item,index) in liveVideos" :key="index">
					<view class="live-main-pic">
						<u-lazy-load threshold="-100" :image="judgeCover(item.cover)"  :loading-img="IMAGE_URL + '/wxapp/null05.png'" :index="index" :error-img="IMAGE_URL + '/wxapp/null05.png'" @click="toLiveDetail(item.id,item.isLive)"></u-lazy-load>
						<view class="icon text-white flex">
							<image class="liveStatus" v-if="item.isLive === 1" :src="IMAGE_URL +'/play.gif'"></image>
							<text class="cuIcon-playfill" v-else></text>
							<text style="padding: 0 8rpx;">{{item.look}}人看过</text>
						</view>
					</view>
					<view class="live-con flex justify-between bg-white">
						<view class="flex flex-direction justify-between live-con-left flex-sub clear">
							<view class="live-title two-line">{{item.title}}</view>
							<view class="live-user-msg flex">
								<view class="avatar">
									<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" :error-img="IMAGE_URL + '/wxapp/null05.png'"
									 height="40" border-radius="20" mg-mode="aspectFill"></u-lazy-load>
								</view>
								<view class="user-name text-hidden flex-sub">{{item.nickname}}</view>
							</view>
						</view>
						<view class="live-con-right">
							<view class="goods-pic">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" :error-img="IMAGE_URL + '/wxapp/null05.png'"
								 height="100" mg-mode="aspectFill"></u-lazy-load>
							</view>
							<view class="text-center price">￥{{item.originalPrice}}</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus2" margin-top="10" margin-bottom="20" />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "liveVideos",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				// 开启下拉
				refresherEnabled: true,
				//
				triggered: false,

				page1: 1,
				limit1: 15,
				page2: 1,
				limit2: 5,
				stopLoad2: false,
				loadStatus2: 'loadmore',
				liveVideos: [],
				followList: []
			};
		},
		props: {

		},
		mounted() {
			this.getFollowList()
			this.getVideos()
		},
		methods: {
			//下拉过程的函数
			onPulling(e) {
			},
			//松手后执行下拉事件的函数
			onRefresh() {
				console.log('onRefresh')
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.page1  = 1
				this.stopLoad2 = false
				this.page2  = 1
				this.liveVideos = []
				 this.getVideos()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			//结束下拉函数
			onAbort() {
				console.log('onAbort')
			},
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
				console.log(sendData)
				this.page2++
				this.$u.post("/api/v1/live/live/list", sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data
					if (list.length < this.limit2) {
						this.stopLoad2 = true
						this.loadStatus2 = "nomore"
						this.liveVideos.push(...list)
						return
					}
					this.liveVideos.push(...list)
					console.log(this.liveVideos)
				});
			},
			toLiveDetail(id,isLive) {
				uni.navigateTo({
					url:`/packageA/livePlayback/livePlayback?id=${id}&isLive=${isLive}`
					// url: "/pages/livePlayback/livePlayback?id=" + id
				})
			},
			
			judgeCover (val) {
				let arr = val.split('/')
				if (arr[0] === 'http:' || arr[0] === 'https:') {
					return val
				}
				return this.IMAGE_URL + val
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
				.liveStatus{
					width: 32rpx;
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
