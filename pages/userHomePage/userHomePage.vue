<template>
	<view class="">
		<view class="top-container bg-white">
			<view class="top-info-box flex align-center">
				<view class="avatar">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+info.headImgUrl" :index="index1" :error-img="IMAGE_URL + '/null05.png'" 
					 borderRadius="60" height="120" img-mode="aspectFill"></u-lazy-load>
				</view>
				<view class="flex-sub name text-hidden">{{info.nickname}}</view>
				<view v-if="showBtn" class="btn bg-red shadow text-white" :class="isFollow==0?'':'isFollow'" @tap="addFollow">{{isFollow==0?'+关注':'已关注'}}</view>
				<view v-else class="btn bg-red shadow text-white" @tap="toAnchorCenter">主播中心</view>
			</view>
			<view class="top-data-box flex justify-center">
				<view class="item">
					<view class="num">{{info.follows}}</view>
					<view class="txt">关注</view>
				</view>
				<view class="item">
					<view class="num">{{info.fans}}</view>
					<view class="txt">粉丝</view>
				</view>
				<view class="item">
					<view class="num">{{info.praise}}</view>
					<view class="txt">获赞</view>
				</view>
			</view>
			<view class="" style="height: 20rpx;background-color: #f5f5f5;"></view>
		</view>
		<u-sticky>
			<view class="sub-navbar-con flex bg-white">
				<view class="" style="margin-right: 50rpx;" :class="currentIndex==0?'active':''" @tap="chooseNav(0)">动态</view>
				<view class="" :class="currentIndex==1?'active':''" @tap="chooseNav(1)">直播回放</view>
			</view>
		</u-sticky>
		<view class="dynamic-container bg-white" v-if="currentIndex==0">
			<view class="null flex flex-direction align-center" style="margin-top: 150rpx;" v-if="isNull1">
				<image :src="IMAGE_URL + '/null05.png'"  style="width: 200rpx;" mode="widthFix"></image>
				<view class="" style="margin-top: 10rpx;color: #AAAAAA;font-size: 28rpx;">暂无动态</view>
			</view>
			<view class="" v-else>
				<view class="item" v-for="(item,index) in dynamics" :key="index">
					<view class="date">{{item.date}}</view>
					<view class="flex justify-between">
						<view class="time">{{item.time}}</view>
						<view class="flex-sub clear item-con">
							<navigator url="/pages/videoDetail/videoDetail" class="cover-pic" @tap="getVideoDetail(item)">
								<u-lazy-load threshold="-100" :image="item.short.cover_url" :index="index" borderRadius="10" :error-img="IMAGE_URL + '/null05.png'"  :loading-img="IMAGE_URL + '/null05.png'" ></u-lazy-load>
								<view class="mask flex flex-direction justify-center align-center">
									<text class="cuIcon-videofill text-white"></text>
								</view>
							</navigator>
							<view class="content">{{item.content}}</view>
							<view class="goods-container flex justify-between" @tap="toDetail(item.goods.id)">
								<view class="goods-pic">
									<u-lazy-load threshold="-100" :image="IMAGE_URL+item.goods.mainPhotoURL" :index="index" borderRadius="10"
									 height="120" :error-img="IMAGE_URL + '/null05.png'"  :loading-img="IMAGE_URL + '/null05.png'"  img-mode="aspectFill"></u-lazy-load>
								</view>
								<view class="goods-name flex-sub flex flex-direction justify-center clear">
									<view class="name text-hidden">{{item.goods.name}}</view>
									<view class="price">￥{{item.goods.price}}</view>
								</view>
								<view class="goods-share flex flex-direction justify-center" @tap.stop="">
									<button class="btn" open-type="share" :data-goods="item.goods"><i class="iconfont iconzhuanfa"></i></button>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadStatus1" margin-top="10" margin-bottom="20"/>
			</view>
		</view>
		
		<view class="video-container bg-white" v-if="currentIndex==1">
			<view class="null flex flex-direction align-center" style="margin-top: 150rpx;" v-if="isNull2">
				<image :src="IMAGE_URL + '/null05.png'"  style="width: 200rpx;" mode="widthFix"></image>
				<view class="" style="margin-top: 10rpx;color: #AAAAAA;font-size: 28rpx;">暂无直播回放</view>
			</view>
			<view class="" v-else>
				<view class="item" v-for="(item,index) in videos" :key="index">
					<view class="date">{{item.date}}</view>
					<view class="flex justify-between">
						<view class="time">{{item.time}}</view>
						<view class="flex-sub clear item-con">
							<view class="flex justify-start">
								<view class="video-type flex text-white">
									<text class="cuIcon-playfill"></text>
									<view class="txt">回放</view>
								</view>
							</view>
							<view class="video-title">{{item.title}}</view>
							<view class="flex look-con">
								<view class="">{{item.look}}人观看</view>
								<view style="padding: 0 10rpx;">|</view>
								<view class="">{{item.goodsCount}}个宝贝</view>
							</view>
							<!-- uni.navigateTo({
					url:`/pages/livePlayback/livePlayback?id=${id}&isLive=${isLive}`
					// url: "/pages/livePlayback/livePlayback?id=" + id
				}) -->
							<view class="cover-pic" @tap="toLivePlayback(item.id)">
								<u-lazy-load threshold="-100" :image="IMAGE_URL+item.cover" :index="index" borderRadius="10" :error-img="IMAGE_URL + '/null05.png'"  :loading-img="IMAGE_URL + '/null05.png'" ></u-lazy-load>
								<view class="mask flex flex-direction justify-center align-center">
									<text class="cuIcon-videofill text-white"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadStatus2" margin-top="10" margin-bottom="20"/>
			</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: 0,
				IMAGE_URL: this.IMAGE_URL,
				info: {},
				currentIndex: 0,
				page1: 1,
				limit1: 15,
				stopLoad1: false,
				isNull1: false,
				loadStatus1:'loadmore',
				
				dynamics: [],
				page2: 1,
				limit2: 15,
				stopLoad2: false,
				isNull2: false,
				loadStatus2:'loadmore',
				videos: [],
				triggered: false,
				showBtn:false,
				isFollow:0
			};
		},
		onLoad(options) {
			if(options.isFollow){
				this.isFollow = options.isFollow
			}
			if(options.userId){
				this.userId = parseInt(options.userId)
				this.showBtn = true
			}else{
				this.userId = uni.getStorageSync("userInfo").id
			}
			this.getInfo()
			this.getDynamic()
			this.getVideos()
			this.handleTime()
		},
		methods: {
		
			toLivePlayback(id){
				uni.navigateTo({
					url:`/pages/livePlayback/livePlayback?id=${id}&isLive=0`
				})
			},
			toAnchorCenter() {
				uni.navigateTo({
					url: "../anchorCenter/anchorCenter"
				})
			},
			chooseNav(i) {
				this.currentIndex = i
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?id=" + id
				})
			},
			changeCurrent(e) {
				this.currentIndex = e.detail.current
			},
			//获取用户基本信息
			getInfo() {
				this.$u.post("/api/v1/live/user/baseinfo", {
					findUserId: this.userId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.info = res.data.data
				});
			},
			// 获取用户动态列表
			getDynamic() {
				if (this.stopLoad1) {
					return
				}
				this.loadStatus1 = "loading"
				let sendData = {
					userId: this.userId,
					page: this.page1,
					limit: this.limit1
				}
				this.page1++
				this.$u.post("/api/v1/live/user/trend/list", sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.list
					if (list.length == 0) {
						this.stopLoad1 = true
						this.loadStatus1 = "nomore"
						if(this.page1==2){
							this.isNull1 = true
						}
						return
					}
					// 处理成和小视频列表相同的数据格式，点击进入视频详情时需要用到
					list.map(item => {
						let month = item.updatedAt.split(" ")[0].split("-")[1]
						let day = item.updatedAt.split(" ")[0].split("-")[2]
						item.date = month + '/' + day
						let hour = item.updatedAt.split(" ")[1].split(":")[0]
						let minute = item.updatedAt.split(" ")[1].split(":")[1]
						item.time = hour + ':' + minute
						item.mediaUrl = item.short.media_url
						item.coverUrl = item.short.cover_url
						item.trendId = item.id
						item.nickname = this.info.nickname
						item.headImgUrl = this.info.headImgUrl
					})
					this.dynamics.push(...list)
				});
			},
			//获取用户直播回放列表
			getVideos() {
				if (this.stopLoad2) {
					return
				}
				this.loadStatus2 = "loading"
				let sendData = {
					userId: this.userId,
					page: this.page2,
					limit: this.limit2
				}
				this.page2++
				this.$u.post("/api/v1/live/user/live/list", sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.lists

					if (list.length == 0) {
						this.stopLoad2 = true
						this.loadStatus2 = "nomore"
						if(this.page2==2){
							this.isNull2 = true
						}
						return
					}
					list.map(item=>{
						let timeObj = this.handleTime(item.startAt)
						item.date = timeObj.month+'/'+timeObj.day
						item.time = timeObj.hour+':'+timeObj.minute
					})
					this.videos.push(...list)
				});
			},
			handleTime(time){
				let date = new Date(time*1000)
				return {
					month:(date.getMonth()+1).toString().padStart(2,'0'),
					day:date.getDate().toString().padStart(2,'0'),
					hour:date.getHours().toString().padStart(2,'0'),
					minute:date.getMinutes().toString().padStart(2,'0')
				}
			},
			getVideoDetail(obj){
				this.$store.commit("setVideoDetail",obj)
			},
			//添加关注
			addFollow(){
				let reqUrl = ""
				if(this.isFollow==0){
					reqUrl = '/api/v1/live/user/follow/add'
				}else{
					reqUrl = '/api/v1/live/user/follow/cancel'
				}
				this.$u.post(reqUrl, {
					followUserId: this.userId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					if(this.isFollow==0){
						this.$u.toast("关注成功");
						this.isFollow = 1
					}else{
						this.$u.toast("已取消关注");
						this.isFollow = 0
					}
				});
			}
		},
		onReachBottom() {
			switch (this.currentIndex){
				case 0:
				this.getDynamic()
					break;
				case 1:
				this.getVideos()
					break;
				default:
					break;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.top-info-box {
		height: 120rpx;
		padding: 0 30rpx;

		.avatar {
			height: 120rpx;
			width: 120rpx;
		}
		.name{
			font-size: 34rpx;
			font-weight: 700;
			color: #000000;
			margin: 0 15rpx;
		}

		.btn {
			line-height: 50rpx;
			width: 200rpx;
			text-align: center;
			border-radius: 5rpx;
		}
		.isFollow{
			background-color: #888888 !important;
		}
	}

	.top-data-box {
		padding: 50rpx 0;

		.item {
			width: 200rpx;
			text-align: center;
			line-height: 40rpx;

			.num {
				font-size: 36rpx;
				color: #000000;
			}

			.txt {
				font-size: 24rpx;
			}
		}
	}

	.sub-navbar-con {
		line-height: 80rpx;
		padding: 0 30rpx;

		.active {
			position: relative;
		}

		.active::after {
			content: "";
			position: absolute;
			bottom: 10rpx;
			width: 100%;
			left: 0;
			height: 6rpx;
			background-color: red;
		}
	}

	.dynamic-container {
		.item {
			padding: 20rpx 30rpx 30rpx;

			.date {
				font-size: 36rpx;
				color: #000000;
				line-height: 50rpx;
			}

			.time {
				width: 80rpx;
				font-size: 24rpx;
				color: #AAAAAA;
			}

			.item-con {
				.cover-pic {
					width: 100%;
					position: relative;

					.mask {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						border-radius: 10rpx;
						background-color: rgba(0, 0, 0, 0.3);

						.cuIcon-videofill {
							font-size: 48rpx;
						}
					}
				}

				.content {
					padding: 20rpx 0;
				}

				.goods-container {
					background-color: #F5F5F5;
					padding: 10rpx;

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
			}
		}
	}
	.video-container{
		.item{
			padding: 20rpx 30rpx 30rpx;
			.date {
				font-size: 36rpx;
				color: #000000;
				line-height: 50rpx;
			}
			
			.time {
				width: 80rpx;
				font-size: 24rpx;
				color: #AAAAAA;
			}
			.video-type{
				line-height: 40rpx;
				font-size: 24rpx;
				border-radius: 10rpx;
				overflow: hidden;
				.cuIcon-playfill{
					width: 40rpx;
					text-align: center;
					background-color: rgba(0,0,0,0.3);
				}
				.txt{
					padding: 0 8rpx;
					background-color: rgba(0,0,0,0.1);
				}
			}
			.video-title{
				padding: 10rpx 0;
				font-weight: 700;
				color: #000000;
			}
			.look-con{
				font-size: 20rpx;
				color: #AAAAAA;
				margin-bottom: 20rpx;
			}
			.cover-pic {
				width: 100%;
				position: relative;
			
				.mask {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border-radius: 10rpx;
					background-color: rgba(0, 0, 0, 0.3);
			
					.cuIcon-videofill {
						font-size: 60rpx;
					}
				}
			}
		}
		
	}
</style>
