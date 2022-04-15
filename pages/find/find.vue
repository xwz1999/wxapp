<template>
	<view>
		<view class="flex flex-direction" style="height: 100vh;">
	<!-- 		<view class="flex justify-between bg-white">
				<view class="flex-sub">
					<u-tabs :list="list" :is-scroll="false" height="90" :current="currentIndex" duration="0.2"
						bar-width="100" :bold="false" active-color="red" @change="chooseTabs"></u-tabs>
				</view>
			</view> -->

			<swiper class="flex-sub" :current="currentIndex" :duration="300" :indicator-dots="false" :autoplay="false"
				@change="changeCurrent">
				<!-- 直播回放列表 -->
				<swiper-item>
					<live-videos></live-videos>
				</swiper-item>
				<!-- 小视频列表 -->
				<swiper-item>
					<small-videos></small-videos>
				</swiper-item>
				<!-- 图文动态列表 -->
				<swiper-item>
					<dynamics :showGoodsLink="true"></dynamics>
				</swiper-item>
			</swiper>
		</view>
		<u-popup v-model="showPop" class="pop" @close="closePop" mode="bottom" border-radius="20">
			<view class="line">
				<template v-for="(item,index) in list">
					<navigator class="iconText" v-if="item.name!='直播'" :url=item.url>
						<image :src="IMAGE_URL+item.image" mode=""></image>
						<text>{{item.name}}</text>
					</navigator>
				</template>
			</view>
			<view class="cancel" @tap="closePop">取消</view>
		</u-popup>
	</view>
</template>

<script>
	// import liveVideos from 'components/liveVideos.vue'
	// import smallVideos from 'components/smallVideos.vue'
	import dynamics from 'components/dynamics.vue'
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				showMybtn: false,
				currentIndex: 2,
				list: [
					// {
					// 	name: '直播',
					// 	image: '/uni-program/icon/add_stream.png',
					// 	url:''
					// },
					// {
					// 	name: '视频',
					// 	image: '/uni-program/icon/add_video.png',
					// 	url:'./createImageArticle?_type=2'
					// },
					{
						name: '图文',
						image: '/wxapp/uni-program/icon/add_image.png',
						url:'./createImageArticle'
					}
				],
				showPop: false,
				onTabItemTapPop: false
			};
		},
		components: {
			// liveVideos,
			// smallVideos,
			dynamics
		},
		onTabItemTap(item) {
			if (this.onTabItemTapPop) {
				// uni.hideTabBar({})
				// this.showPop = true
				wx.navigateTo({
				url:'./createImageArticle'
				})
			}
			this.onTabItemTapPop = true
		},
		onLoad() {
			if (uni.getStorageSync("userInfo")) {
				this.showMybtn = true
			}
		},
		onShow() {
			this.showPop = false
			uni.setTabBarItem({
				index: 2,
				text: '发布',
				iconPath: "static/tabbar/recook_fab.png",
				selectedIconPath: "static/tabbar/recook_fab.png",
			})
		},
		onHide() {
			uni.setTabBarItem({
				index: 2,
				text: '发现',
				"iconPath": "static/tabbar/find.png",
				"selectedIconPath": "static/tabbar/find_.png",
			})
			this.onTabItemTapPop = false
		},
		methods: {
			toMyHomePage() {
				uni.navigateTo({
					url: "/packageA/userHomePage/userHomePage"
				})
			},
			chooseTabs(index) {
				this.currentIndex = index
			},
			changeCurrent(e) {
				this.currentIndex = e.detail.current
			},
			closePop() {
				this.showPop = false
				uni.showTabBar({})
			}
		},

		onShareAppMessage(res) {
			let pages = getCurrentPages() // 获取加载的页面
			let currentPage = pages[pages.length - 1] // 获取当前页面的对象
			let url = currentPage.route // 当前页面url
			let shareObj = {
				title: "",
				path: url + "?invite=" + this.$store.state.invitationNo,
				imageUrl: ''
			}
			console.log(res)
			// let goodsMsg = res.target.dataset.goods
			if (res.from === 'button') { // 来自页面内分享按钮
				shareObj = {
					title: "我在看" + res.target.dataset.goods.name + ",快来加入吧！",
					path: '/pages/goodsDetail/goodsDetail?id=' + res.target.dataset.goods.id + "&type=share&invite=" +
						this.$store.state
						.invitationNo,
					imageUrl: res.target.dataset.goods.mainPhotoURL
				}
			}
			console.log(shareObj)
			return shareObj
		}
	}
</script>

<style lang="scss">
	.pop{
		font-size: 24rpx;
		.line{
		display: flex;
		    justify-content: space-around;
		    margin: 40rpx 80rpx 80rpx 80rpx;
			.iconText{
				display: flex;
				    flex-direction: column;
					image{
						    width: 80rpx;
						    height: 80rpx;
					}
					text{
						text-align: center;
						margin-top: 10rpx;
					}
			}
		}
		.cancel{
			text-align: center;
			margin-bottom: 20rpx;
		}
	}

</style>
