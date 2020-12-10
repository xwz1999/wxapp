<template>
	<view class="content">
		<view class="header-box">
			<view class="blur-bg">
				<!-- <image :src="bgImage" style="width: 100%;transform: scale(20);" mode="widthFix"></image> -->
				<view class="blur-bg-con" :style="'background-image: url('+bgImage+');'"></view>
			</view>
			<view class="search-box flex justify-between text-white">
				<view class="flex location text-hidden" @tap="toLocation">
					<text class="cuIcon-locationfill"></text>
					<view style="margin: 0 15rpx 0 5rpx;">宁波</view>
				</view>
				<view class="search-con flex-sub flex text-white">
					<text class="cuIcon-search"></text>
					<input type="text" class="flex-sub" v-model="keyword" confirm-type="search" placeholder="请输入关键字" placeholder-class="placeholder" @confirm="toSearch" />
				</view>
				<view class="icon-box flex">
					<u-icon name="server-fill"></u-icon>
					<u-icon name="scan" @tap="scan"></u-icon>
				</view>
			</view>
			<view class="weather-box flex justify-between align-center text-white">
				<view class="flex align-center">
					<view class="text-center" style="width: 80upx;font-size: 48upx;">30</view>
					<view class="">
						<view class="">℃阴</view>
						<view class="">湿度：74% 温度25-30℃ 29优</view>
					</view>
				</view>
				<view class="text-right">
					<view class="">庚子年(2020)五月十九</view>
					<view class="">2020.7.9 星期四</view>
				</view>
			</view>
			<!-- 轮播图 -->
			<swiper class="swiper-box screen-swiper square-dot" :circular="true" :autoplay="true" interval="5000" duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in swipers" :key="index">
					<image :src="IMAGE_URL+item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类导航 -->
		<view class="navbar-box flex">
			<scroll-view scroll-x class="bg-white nav" style="width: 610rpx;background-color: transparent;"
			 scroll-with-animation>
				<view class="cu-item" v-for="(item,index) in cateList" :key="index" @tap="toClassify(index,item.id)">
					<view class="flex flex-direction justify-center align-center" style="height: 90rpx;">
						<image src="../../static/index/icon02.png" mode="widthFix"></image>
						<view class="" style="font-size: 22rpx;">{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="flex flex-direction justify-center align-center" style="width: 100rpx;" @tap="toClassify()">
				<image src="../../static/index/icon.png" mode="widthFix"></image>
				<view class="" style="font-size: 22rpx;">分类</view>
			</view>
		</view>


		<view class="classify-box bg-white flex justify-around">
			<view class="cla-item text-center" v-for="(item,index) in options" :key="index" @tap="toPage(item.page)">
				<image src="../../static/logo.png" mode="widthFix"></image>
				<view class="cla-txt">{{item.text}}</view>
			</view>
		</view>


		<!-- 四张海报活动入口 -->
		<view class="ad-box">
			<image class="ad-item" v-if="posts.a" :src="IMAGE_URL+posts.a.logoUrl" style="width: 100%;" mode="widthFix" @tap="toWebview(posts.a.website)"></image>
			<view class="flex justify-between" style="margin: 10rpx 0;">
				<image class="ad-item" v-if="posts.b" :src="IMAGE_URL+posts.b.logoUrl" mode="widthFix" style="margin-right: 10rpx;"
				 @tap="toWebview(posts.b.website)"></image>
				<image class="ad-item" v-if="posts.c" :src="IMAGE_URL+posts.c.logoUrl" mode="widthFix" @tap="toWebview(posts.c.website)"></image>
			</view>
			<image class="ad-item" v-if="posts.d" :src="IMAGE_URL+posts.d.logoUrl" style="width: 100%;" mode="widthFix" @tap="toWebview(posts.d.website)"></image>
		</view>


		<!-- 首页推荐商品列表 -->
		<view class="recommend-box" v-if="promotion.length!=0">
			<view class="flex justify-center" style="padding: 20rpx 0;">
				<image src="../../static/index/rec.png" style="width: 232rpx;" mode="widthFix"></image>
			</view>

			<!-- 活动时间段导航 -->
			<scroll-view scroll-x class="bg-white nav" style="background-color: transparent;margin: 20rpx 0;"
			 scroll-with-animation :scroll-left="scrollLeft">
				<view class="time-item flex flex-direction justify-center text-center" v-for="(item,index) in promotion" :key="index"
				 @tap="tabSelect" :data-id="item.id" :data-index="index" :class="TabCur==index?'now':index<nowIndex?'before':'after'">
					<view class="time">{{getActTime(item.startTime)}}</view>
					<view class="status">{{item.showName}}</view>
				</view>
			</scroll-view>


			<!-- 商品列表组件 -->
			<template v-if="goodsList.length!=0">
				<goods-list :goodsList="goodsList"></goods-list>
				<u-loadmore status="nomore" margin-bottom="40"/>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: -1, //选中的时段
				nowIndex: -1, //当前的时段
				scrollLeft: 0,
				goodsList: null,
				keyword:"",
				swipers:[],
				options: [{
						text: "瑞库制品",
						page: "/packageA/hotRanking/hotRanking?fromView=ruiku"
					},
					{
						text: "家居生活",
						page: "/packageA/hotRanking/hotRanking?fromView=jiaju"
					},
					{
						text: "数码家电",
						page: "/packageA/hotRanking/hotRanking?fromView=shuma"
					},
					{
						text: "热销榜单",
						page: "/packageA/hotRanking/hotRanking?fromView=rexiao"
					},
					{
						text: "全部分类",
						page: "/packageA/classify/classify"
					},
				],
				posts: null,
				IMAGE_URL: this.IMAGE_URL,
				promotionId: null,
				promotion: [],
				cateList: [],
				bgImage:"",
				icons:[
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
					"../../static/index/icon02.png",
				]
			}
		},
		onLoad() {
			this.getSwiper()
			this.getCateList()
			this.getPost()
			this.getActivity()
		},
		methods: {
			changeSwiper(e){
				let index = e.detail.current
				this.bgImage = this.IMAGE_URL+ this.swipers[index].url
			},
			getSwiper() {
				this.$u.post('/api/v1/diamond_show/list').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.swipers = res.data.data
					this.bgImage = this.IMAGE_URL+ this.swipers[0].url
				});
			},
			// 获取三个特卖入口图片
			getPost() {
				this.$u.post('/api/v1/activity/list/query').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.posts = res.data.data
				});
			},
			getActivity() {
				this.$u.post('/api/v1/goods/list/promotion').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.promotion = res.data.data
					if (this.promotion.length == 0) {
						return
					}
					let nowTime = new Date()

					for (let i = 0; i < this.promotion.length; i++) {
						// console.log(i, nowTime >= new Date(this.promotion[i].startTime), nowTime <= new Date(this.promotion[i].endTime))
						// 当前时间在某个时间段之前
						if (nowTime >= new Date(this.promotion[i].startTime) && nowTime <= new Date(this.promotion[i].endTime)) {
							this.promotionId = this.promotion[i].id
							this.nowIndex = this.TabCur = i
							this.scrollLeft = (i - 2) * 75
							// break
						}
						//凌晨有段时间不会满足上面的条件故加了下面的判断
						// console.log(i,nowTime >= new Date(this.promotion[i].endTime),nowTime <= new Date(this.promotion[i+1].startTime))
						if ( nowTime <= new Date(this.promotion[i].startTime)) {
							this.promotionId = this.promotion[i].id
							this.nowIndex = this.TabCur = i
							this.scrollLeft = (i - 2) * 75
							break;
						}
					}
					this.getGoodsList()
				});
			},
			getCateList() {
				this.$u.post('/api/v1/goods/categories/first').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.cateList = res.data.data
				});
			},
			// 获取首页抢购活动商品列表
			getGoodsList() {
				this.$u.post('/api/v1/goods/list/promotion/goods', {
					TimeItemID: this.promotionId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goodsList = res.data.data.goodsList
					for (let i = 0; i < this.goodsList.length; i++) {
						this.goodsList[i].mainPhotoUrl = this.goodsList[i].picture.url
					}
				});
			},
			// 截取活动时间的时分
			getActTime(timestr) {
				let H = timestr.split(" ")[1].split(":")[0]
				let M = timestr.split(" ")[1].split(":")[1]
				return H + ":" + M
			},
			scan() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			toWebview(src) {
				uni.navigateTo({
					url: "../webview/webview?src=" + src
				})
			},
			toLocation() {
				uni.navigateTo({
					url: "../location/location"
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.index;
				this.promotionId = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.index - 2) * 75
				this.getGoodsList()
			},
			toClassify(index, id) {
				console.log(index, id)
				if (id) {
					uni.navigateTo({
						url: "/packageA/classify/classify?index=" + index + "&id=" + id
					})
				} else {
					uni.navigateTo({
						url: "/packageA/classify/classify"
					})
				}
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			toSearch() {
				uni.navigateTo({
					url: "../search/search?keyword="+this.keyword,
					success: () => {
						this.keyword = ""
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-box {
		height: 600rpx;
		padding-top: 180rpx;
		position: relative;
		background-color: rgba(0,0,0,0.5);
		background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.7));
		.blur-bg{
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			z-index: -10;
			
			.blur-bg-con{
				width: 100%;
				height: 100%;
				filter: blur(100rpx);
				transform: scale(1.5);
			}
		}
		
		.location {
			max-width: 200rpx;
			font-size: 32rpx;
		}

		.search-box {
			margin: 0 20rpx;
			line-height: 60rpx;

			.search-con {
				border-radius: 30rpx;
				overflow: hidden;
				padding: 0 20upx;
				background-color: rgba(255, 255, 255, 0.5);

				input {
					height: 60rpx;
					padding-left: 20upx;
				}

				.placeholder {
					color: #fff;
				}
			}

			.icon-box u-icon {
				padding: 0 15upx;
				font-size: 48rpx;
			}
		}

		.weather-box {
			font-size: 20rpx;
			padding: 0 20rpx;
			height: 100rpx;
		}

		.swiper-box {
			border-radius: 20rpx;
			margin: 0 20rpx;
			min-height: 300rpx;
			overflow: hidden;
		}
	}

	.navbar-box {
		margin: 70rpx 20rpx 20rpx;
		background-color: transparent !important;

		.cu-item {
			line-height: normal;
			padding: 0;
			margin: 0;
			width: 102rpx;
		}

		image {
			width: 50rpx;
		}
	}

	.classify-box {
		margin: 0 20rpx;
		padding: 20rpx 0;
		font-size: 24rpx;
		border-radius: 20rpx;

		image {
			width: 96rpx;
			margin-bottom: 10rpx;
			border-radius: 20rpx;
		}
	}

	.ad-box {
		margin: 20rpx;

		.ad-item {
			border-radius: 10rpx;
			height: 192rpx;
			background-color: #F1F1F1;
		}
	}

	.recommend-box {
		.time-item {
			display: inline-block;
			// padding: 0 30rpx;
			text-align: center;
			width: 150rpx;

			.time {
				font-size: 36rpx;
				font-weight: 900;
			}

			.status {
				font-size: 20rpx;
			}
		}

		.before {
			color: #AAAAAA;
		}

		.now {
			color: #D03D3D;
		}

		.after {
			color: #000000;
		}

	}
</style>
