<template>
	<view>
		<view class="flex flex-direction" style="height: 100vh;">
			<view class="flex justify-between bg-white">
				<!-- <view class="flex flex-direction justify-center mine align-center" style="width: 90rpx;" v-if="showMybtn" @tap="toMyHomePage">
					<text class="cuIcon-my" style="font-size: 48rpx;color: #888888;"></text>
				</view> -->
				<view class="flex-sub">
					<u-tabs :list="list" :is-scroll="false" height="90" :current="currentIndex" duration="0.2" bar-width="100" :bold="false"
					 active-color="red" @change="chooseTabs"></u-tabs>
				</view>
			</view>

			<swiper class="flex-sub" :current="currentIndex" :duration="300" :indicator-dots="false" :autoplay="false" @change="changeCurrent">
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
	</view>
</template>

<script>
	import liveVideos from 'components/liveVideos.vue'
	import smallVideos from 'components/smallVideos.vue'
	import dynamics from 'components/dynamics.vue'
	export default {
		data() {
			return {
				showMybtn: false,
				currentIndex: 0,
				list: [{
						name: '直播'
					},
					{
						name: '视频'
					},
					{
						name: '图文'
					}
				]
			};
		},
		components: {
			liveVideos,
			smallVideos,
			dynamics
		},
		onLoad() {
			if (uni.getStorageSync("userInfo")) {
				this.showMybtn = true
			}
		},
		methods: {
			toMyHomePage() {
				uni.navigateTo({
					url: "../userHomePage/userHomePage"
				})
			},
			chooseTabs(index) {
				this.currentIndex = index
			},
			changeCurrent(e) {
				this.currentIndex = e.detail.current
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
					path: '/pages/goodsDetail/goodsDetail?id=' + res.target.dataset.goods.id + "&type=share&invite=" + this.$store.state
						.invitationNo,
					imageUrl: this.IMAGE_URL + res.target.dataset.goods.mainPhotoURL
				}
			}
			console.log(shareObj)
			return shareObj
		}
	}
</script>

<style lang="scss">
</style>
