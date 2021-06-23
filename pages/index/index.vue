<template>
	<view class="content">
		<view class="header-box">
			<!-- 背景随轮播图模糊变色 -->
			<view class="blur-bg">
				<view class="blur-bg-con" :style="'background-image: url('+bgImage+');'"></view>
			</view>			
			<!-- 搜索框  u-sticky为吸顶 -->
			
			<!-- <u-sticky bg-color="transparent" @fixed="changebg" @unfixed="hidebg"> -->
				<view class="search-box flex justify-between text-white" :class="showBg?'search-bg':'hide-bg'">
					<view class="flex location text-hidden" @tap="toLocation">
						<text class="cuIcon-locationfill"></text>
						<view class="text-hidden cityname">{{cityName}}</view>
					</view>
					<view class="search-con flex-sub flex text-white">
						<text class="cuIcon-search"></text>
						<input type="text" class="flex-sub" v-model="keyword" confirm-type="search" placeholder="请输入关键字" placeholder-class="placeholder" @confirm="toSearch" />
					</view>
					<view class="icon-box flex">
						<!-- <u-icon name="server-fill"></u-icon> -->
						<u-icon name="scan" @tap="scan"></u-icon>
					</view>
				</view>
			<!-- </u-sticky> -->
			
			<!-- 天气信息 -->
			<view class="weather-box text-white flex justify-between align-center">
				<view class="flex align-center" v-show="weatherMsg">
					<view class="text-center flex align-start" style="margin:0 10rpx;">
						<text class="tem">{{weatherMsg.tem}}</text>
						<text style="font-size: 20rpx;">℃</text>
					</view>
					<view class="">
						<view>{{weatherMsg.wea}}</view>
						<view class="">湿度：{{weatherMsg.humidity}} 温度{{weatherMsg.tem2}}-{{weatherMsg.tem1}}℃ {{weatherMsg.air}}{{weatherMsg.air_level}}</view>
					</view>
				</view>
				<view class="text-right" v-show="weatherMsg">
					<view class="">{{lunarDate}}</view>
					<view class="">{{weatherMsg.date}} {{weatherMsg.week}}</view>
				</view>
			</view>

			<!-- 轮播图 -->
			<swiper class="swiper-box screen-swiper square-dot" :circular="true" :autoplay="true" interval="5000" duration="500"
			 @change="changeSwiper">
				<swiper-item v-for="(item,index) in swipers" :key="index" @tap="toDeitail(item.goodsId,item.activityUrl)">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		
		<!-- 分类导航 -->
		<view class="navbar-box flex">
			<scroll-view scroll-x class="bg-white nav" style="width: 610rpx;background-color: transparent;"
			 scroll-with-animation>
				<view class="cu-item" v-for="(item,index) in cateList" :key="index" @tap="toClassify(index,item.id)">
					<view class="flex flex-direction justify-center align-center" style="height: 90rpx;">
						<image :src="item.icon" mode="widthFix"></image>
						<view class="" style="font-size: 22rpx;">{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="flex flex-direction justify-center align-center" style="width: 100rpx;" @tap="toClassify()">
				<image :src="IMAGE_URL+'/icon.png'" mode="widthFix"></image>
				<view class="" style="font-size: 22rpx;">分类</view>
			</view>
		</view>

		<view class="classify-box bg-white flex justify-around">
			<view class="cla-item text-center" v-for="(item,index) in options" :key="index" @tap="toPage(index,item.page)">
				<image :src="item.icon" mode="widthFix"></image>
				<view class="cla-txt">{{item.text}}</view>
			</view>
		</view>



		<!-- 四张海报活动入口 -->
		<view class="ad-box">
			<view class="ad-item" v-if="IMAGE_URL+posts.a.logoUrl">
				<image :src="IMAGE_URL+posts.a.logoUrl" style="width: 100%;" mode="widthFix" @click="toWebview(posts.a.website)"></image>
			</view>
			<view class="flex justify-between" style="margin: 10rpx 0;">
				<view class="ad-item flex-sub" style="margin-right: 10rpx;">
					<image :src="IMAGE_URL+posts.b.logoUrl" style="width: 100%;" mode="widthFix" @click="toWebview(posts.b.website)"></image>
				</view>
				<view class="ad-item flex-sub">
					<image :src="IMAGE_URL+posts.c.logoUrl" style="width: 100%;" mode="widthFix" @click="toWebview(posts.c.website)"></image>
				</view>
			</view>
			<view class="ad-item">
				<image :src="IMAGE_URL+posts.d.logoUrl" style="width: 100%;" mode="widthFix" @click="toWebview(posts.d.website)"></image>
			</view>
		</view>


		<!-- 首页推荐商品列表 -->
		<view class="recommend-box" v-if="promotion.length!=0">
			<view class="flex justify-center" style="padding: 20rpx 0;">
				<image :src="IMAGE_URL+'/rec.png'" style="width: 232rpx;" mode="widthFix"></image>
			</view>
			
			<!-- 活动时间段导航  u-sticky为吸顶-->
			<!-- <u-sticky offset-top="250" bg-color="transparent" @fixed="changebg" @unfixed="hidebg"> -->
				<scroll-view scroll-x class="bg-white nav" :class="showBg?'white-bg':'hide-bg'" scroll-with-animation :scroll-left="scrollLeft">
					<view class="time-item flex flex-direction justify-center text-center" v-for="(item,index) in promotion" :key="index"
					 @tap="tabSelect" :data-id="item.id" :data-index="index" :class="TabCur==index?'now':index<nowIndex?'before':'after'">
						<view class="time">{{getActTime(item.startTime)}}</view>
						<view class="status">{{item.showName}}</view>
					</view>
				</scroll-view>
			<!-- </u-sticky> -->

			<!-- 商品列表组件 -->
			<template v-if="goodsList.length!=0">
				<goods-list :goodsList="goodsList" :hideShareBtn="roleLevel==500" @shareBtn='shareBtn'></goods-list>
				<u-loadmore status="nomore" margin-bottom="40" />
			</template>
		</view>

		<!-- 分享弹出框 -->
		<u-popup v-model="isShow" mode="bottom" border-radius="15">
			<view class="share-box flex justify-between">
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" open-type="share" >
						<image class="share-icon" :src="IMAGE_URL + '/mine/wx.png'" mode="widthFix"></image>
						<view class="txt">微信好友</view>
					</button>
				</view>
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center"  @tap="copyLink">
						<image class="share-icon" :src="IMAGE_URL + '/mine/wx.png'" mode="widthFix"></image>
						<view class="txt">复制链接</view>
					</button>
				</view>
		<!-- 		<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" @tap="postShare">
						<image class="share-icon" src="/static/mine/post.png" mode="widthFix"></image>
						<view class="txt">二维码海报</view>
					</button>
				</view> -->
			</view>
			<view class="cancle" @tap="hideModel">取消</view>
		</u-popup>
	</view>
</template>

<script>
	let calendar = require('@/utils/calendar.js');
	export default {
		data() {
			return {
				onShareData:{},
				TabCur: -1, //选中的时段
				nowIndex: -1, //当前的时段
				scrollLeft: 0,
				goodsList: [],
				keyword: "",
				swipers: [],
				options: [],
				options1: [{
						text: "瑞库制品",
						page: "/pages/hotRanking/hotRanking?fromView=ruiku",
						icon: this.IMAGE_URL + "/index06.png"
					},
					{
						text: "家居生活",
						page: "/pages/hotRanking/hotRanking?fromView=jiaju",
						icon: this.IMAGE_URL + "/index07.png"
					},
					{
						text: "数码家电",
						page: "/pages/hotRanking/hotRanking?fromView=shuma",
						icon: this.IMAGE_URL + "/index08.png"
					},
					{
						text: "热销榜单",
						page: "/pages/hotRanking/hotRanking?fromView=rexiao",
						icon: this.IMAGE_URL + "/index04.png"
					},
					{
						text: "全部分类",
						page: "/pages/classify/classify",
						icon: this.IMAGE_URL + "/index05.png"
					},
				],
				options2: [{
						text: "我的权益",
						page: "/pages/myEquity/myEquity",
						icon: this.IMAGE_URL + "/index01.png"
					},
					{
						text: "一键邀请",
						icon: this.IMAGE_URL + "/index02.png"
					},
					{
						text: "我的店铺",
						page: "/pages/shop/shop",
						icon: this.IMAGE_URL + "/index03.png"
					},
					{
						text: "热销榜单",
						page: "/pages/hotRanking/hotRanking?fromView=rexiao",
						icon: this.IMAGE_URL + "/index04.png"
					},
					{
						text: "全部分类",
						page: "/pages/classify/classify",
						icon: this.IMAGE_URL + "/index05.png"
					},
				],
				posts: null,
				IMAGE_URL: this.IMAGE_URL,
				promotionId: null,
				promotion: [],
				cateList: [],
				bgImage: "",
				isShow: false,
				roleLevel: 500,
				weatherMsg: null,
				currentCity: '', //当前城市，
				cityName: "",
				lunarDate: "", //农历信息
				showBg: false,
				
			}
		},
		computed: {
			selectCity() {
				return this.$store.state.selectCity
			}
		},
		watch: {
			isShow: function(val) {
				if (val) {
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}
			},
			selectCity: function(val) {
				console.log("你已切换城市为==========", val)
				this.cityName = val
				this.getWeather()
			}
		},
		onLoad() {
			// uni.getStorageSync("userInfo").id
			
			let pages = getCurrentPages() // 获取加载的页面
			let currentPage = pages[pages.length - 1] // 获取当前页面的对象
			let url = currentPage.route // 当前页面url
			let options = currentPage.options // 如果要获取url中所带的参数可以查看options
			console.log(options)
			
			  
			if(options.invite){
				console.log(options)
				this.$store.commit('setinvite', options.invite);
			}
			
			if (uni.getStorageSync("localCity")) {
				//已授权定位
				this.currentCity = this.cityName = uni.getStorageSync("localCity")
			} else {
				//未授权定位，进入默认先请求一个显示城市的天气，
				//用户同意授权定位后再更新用户当前城市的天气信息
				this.cityName = "深圳"
				this.getCityName()
			}
			this.getWeather()
			if (uni.getStorageSync("userInfo").roleLevel) {
				this.roleLevel = uni.getStorageSync("userInfo").roleLevel
			}
			if (this.roleLevel == 500) {
				this.options = this.options1
			} else {
				this.options = this.options2
			}
			this.getSwiper()
			this.getCateList()
			this.getPost()
			this.getActivity()
		},
		methods: {
			// 子组件分享按钮 获取分享内容 打开分享面板
			shareBtn(data){
				this.isShow = true
				this.onShareData = data
			},
			hideModel() {
				this.isShow = false
			},
			// 分享面板 复制链接
			copyLink(){
				const that = this
				// /pages/goodsDetail/goodsDetail?id=' + this.onShareData.id 
				// https://h5.reecook.cn/#/goods/detail/14337/R7M1V9
				let url = `${this.H5_BASE_URL}/#/goods/detail/${this.onShareData.id}/${this.$store.state.invitationNo}`
				uni.setClipboardData({
				    data: url,
				    success: function () {
				        that.copyLink()
				    }
				});
			},
			// 分享海报
			postShare() {
				// this.$u.toast("功能暂未开放，敬请期待~");
				uni.navigateTo({
					url:'/pages/poster/poster'
				})
			},
			// 获取用户当前城市
			getCityName() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						// console.log('当前位置的经度：' + res.longitude);
						// console.log('当前位置的纬度：' + res.latitude);
						let longitude = res.longitude
						let latitude = res.latitude
						wx.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/',
							data: {
								"key": this.MAP_KEY,
								"location": latitude + ',' + longitude
							},
							method: 'GET',
							success: (res) => {
								// console.log('用户位置信息', res.data.result);
								let result = res.data.result
								let cityName = result.ad_info.city
								if (cityName.substring(cityName.length - 1) == "市") {
									cityName = cityName.substr(0, cityName.length - 1);
								}
								this.currentCity = this.cityName = cityName
								uni.setStorageSync("localCity", cityName)
								this.getWeather()
							}
						});
					}
				});
			},
			//请求天气信息
			getWeather() {
				this.$u.post('/api/v1/region/weather', {
					// cityId:this.cityCode,
					cityZh: this.cityName
				}).then(res => {
					// console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					// console.log(JSON.parse(res.data.data))
					this.weatherMsg = JSON.parse(res.data.data)
					console.log()
					// 日期转农历格式
					let year = new Date().getFullYear()
					let lunar = calendar.getLunarDate();
					let lunarDetail = calendar.getLunarDateString(lunar);
					// console.log(lunarDetail)
					this.lunarDate = lunarDetail.tg + lunarDetail.dz + lunarDetail.year + "年(" + year + ") " + lunarDetail.month +
						"月" + lunarDetail.day
					console.log(this.lunarDate)
				});
			},

		
			// 轮播图切换
			changeSwiper(e) {
				let index = e.detail.current
				this.bgImage = this.swipers[index].url
			},
			// 获取轮播图
			getSwiper() {
				this.$u.post('/api/v1/diamond_show/list').then(res => {
					// console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.swipers = res.data.data
					console.log(res)
					this.swipers.map(item => {
						item.url = this.IMAGE_URL + item.url
					})
					this.bgImage = this.swipers[0].url
				});
			},
			// 获取三个特卖入口图片
			getPost() {
				this.$u.post('/api/v1/activity/list/query').then(res => {
					// console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.posts = res.data.data
					console.log(res)
				});
			},
			// 获取活动时间段
			getActivity() {
				this.$u.post('/api/v1/goods/list/promotion').then(res => {
					// console.log(res.data);
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
						// console.log(nowTime,new Date(this.promotion[i].startTime.replace(/-/g, "/")))
						// console.log(i, nowTime >= new Date(this.promotion[i].startTime.replace(/-/g, "/")), nowTime <= new Date(this.promotion[i].endTime))
						// 找出当前的时间段
						if (nowTime <= new Date(this.promotion[i].startTime.replace(/-/g, "/"))) {
							let index = i - 1
							if (index < 0) {
								return
							}
							this.promotionId = this.promotion[index].id
							this.nowIndex = this.TabCur = index
							this.scrollLeft = (index - 2) * 75
							break;
						}
					}
					if (!this.promotionId) {
						this.promotionId = this.promotion[0].id
						this.nowIndex = this.TabCur = 0
					}
					this.getGoodsList()
				});
			},
			// 获取商品分类信息
			getCateList() {
				this.$u.post('/api/v1/goods/categories/first').then(res => {
					// console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.cateList = res.data.data
					for (let i = 0; i < this.cateList.length; i++) {
						switch (this.cateList[i].name) {
							case "分类":
								this.cateList[i].icon =this.IMAGE_URL + "/index/icon.png"
								break;
							case "医疗保健":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon01.png"
								break;
							case "休闲美食":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon02.png"
								break;
							case "美妆护肤":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon03.png"
								break;
							case "母婴用品":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon04.png"
								break;
							case "鞋靴箱包":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon05.png"
								break;
							case "图文教育":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon06.png"
								break;
							case "个护清洁":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon07.png"
								break;
							case "服饰内衣":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon08.png"
								break;
							case "日用百货":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon09.png"
								break;
							case "家用电器":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon10.png"
								break;
							case "有机食品":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon11.png"
								break;
							case "家具饰品":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon12.png"
								break;
							case "进口专区":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon13.png"
								break;
							case "会员专享":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon14.png"
								break;
							case "手机数码":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon15.png"
								break;
							case "柴米油盐":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon16.png"
								break;
							case "运动旅行":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon17.png"
								break;
							case "蔬果生鲜":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon18.png"
								break;
							case "酒饮冲调":
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon19.png"
								break;
							default:
								this.cateList[i].icon = this.IMAGE_URL + "/index/icon19.png"
								break;
						}

					}
				});
			},
			// 获取首页抢购活动商品列表
			getGoodsList() {
				this.$u.post('/api/v1/goods/list/promotion/goods', {
					TimeItemID: this.promotionId
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.data.code == "FAIL") {
						// this.$u.toast(res.data.msg);
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
			
			
			// 扫码
			scan() {
				let that = this
				uni.scanCode({
					success: function(res) {
						console.log(res)
						let code = res.result
						that.$u.post('/api/v1/goods/code/search', {code: code}).then(res => {
							console.log(res)
							if (res.code === 'FAIL') {
								return
							}
							if (res.data.code === 'FAIL') {
								uni.reLaunch({
									url: "/packageA/scan/scanFail?code=" + code
								})
							}
							uni.navigateTo({
								url: "/pages/goodsDetail/goodsDetail?id=" + res.data.data.goodsId
							})
						});
					}
				});
			},
			
			
			toDeitail(id,src){
				if(src !== ''){
					let data = {
						dataSrc:src
					}
						uni.navigateTo({
							// url: "../webview/webview?src=" + src
							url:"/pages/webview/webview?dataSrc="+ encodeURIComponent(JSON.stringify(data))
						})
				}else{
					uni.navigateTo({
						url: "/pages/goodsDetail/goodsDetail?id=" + id
					})
				}
				
			},
			// 跳转webview网页
			toWebview(src) {
				uni.navigateTo({
					url:'/pages/webview/webview?src='+src
				})
			},
			// 跳转城市索引页面
			toLocation() {
				uni.navigateTo({
					url: "../location/location?currentCity=" + this.currentCity
				})
			},
			// 选择时间段
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.index;
				this.promotionId = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.index - 2) * 75
				this.getGoodsList()
			},
			//跳转商品分类页
			toClassify(index, id) {
				if (id) {
					uni.navigateTo({
						url: "/pages/classify/classify?index=" + index
					})
				} else {
					uni.navigateTo({
						url: "/pages/classify/classify"
					})
				}
			},
			toPage(idx, url) {
				if (this.roleLevel == 500) {
					uni.navigateTo({
						url: url
					})
				} else {
					switch (idx) {
						case 0:
							this.$u.toast("功能暂未开放，敬请期待~");
							return;
						case 1:
							this.isShow = true
							break;
						case 2:
							uni.navigateTo({
								url: "../shop/shop"
							})
							return;
						default:
							break;
					}
					uni.navigateTo({
						url: url
					})
				}
			},
			//跳转搜索页面
			toSearch() {
				console.log("跳转搜索")
				uni.navigateTo({
					url: "../search/search?keyword=" + this.keyword,
					success: () => {
						this.keyword = ""
					}
				})
			},
			changebg() {
				this.showBg = true
			},
			hidebg() {
				this.showBg = false
			}
		},
		onPullDownRefresh() {
			this.getGoodsList()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return  {
					title: "我在买" + this.onShareData.name + ",快来看看吧！",
					path: '/pages/goodsDetail/goodsDetail?id=' + this.onShareData.id + "&type=share&invite=" + this.$store.state.invitationNo,
					imageUrl: this.IMAGE_URL + this.onShareData.url
				}
			} 
			// let shareObj = {
			// 	title: '',
			// 	path: "/pages/index/index?invite=" + this.$store.state.invitationNo,
			// 	imageUrl: ''
			// }
			// if (res.from === 'button') { // 来自页面内分享按钮
			// 	console.log(res)
			// 	if (res.target.dataset.title) {
			// 		shareObj = {
			// 			title: "我在买" + res.target.dataset.title + ",快来看看吧！",
			// 			path: '/pages/goodsDetail/goodsDetail?id=' + res.target.dataset.id + "&type=share&invite=" + this.$store.state.invitationNo,
			// 			imageUrl: this.IMAGE_URL + res.target.dataset.url
			// 		}
			// 	} else {
			// 		shareObj = {
			// 			title: uni.getStorageSync("userInfo").nickname + '正在邀请您加入瑞库客，0成本带您玩转副业',
			// 			path: '/pages/login/login?type=share&invite=' + this.$store.state.invitationNo,
			// 			imageUrl: this.STATIC_URL + 'invite.jpg'
			// 		}
			// 	}
			// } else {
				
			// }
			// console.log(shareObj)
			// return shareObj
		},
	}
</script>

<style lang="scss">
	.header-box {
		height: 600rpx;
		position: relative;
		background-color: rgba(0, 0, 0, 0.5);
		background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7));

		.blur-bg {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			z-index: -10;

			.blur-bg-con {
				width: 100%;
				height: 100%;
				filter: blur(100rpx);
				transform: scale(1.5);
			}
		}

		.search-box {
			line-height: 60rpx;
			padding: 180rpx 20rpx 15rpx;
			height: 250rpx;

			.location {
				max-width: 200rpx;
				font-size: 32rpx;

				.cityname {
					margin: 0 15rpx 0 5rpx;
					max-width: 150rpx;
					font-size: 36rpx;
				}
			}

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
				margin-left: 20rpx;
				font-size: 54rpx;
			}
		}

		.weather-box {
			font-size: 22rpx;
			padding: 0 20rpx;
			height: 70rpx;
			padding-bottom: 15rpx;

			.tem {
				font-size: 60rpx;
				line-height: 48rpx;
				font-weight: 700;
			}
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
			overflow: hidden;
			background-color: #F1F1F1;
		}
	}

	.recommend-box {
		.nav {
			background-color: transparent;
			padding: 20rpx 0;
		}

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

	.share-box {
		padding: 50rpx 0;

		.share-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-bottom: 10rpx;
		}

		.txt {
			font-size: 26rpx;
		}

		button {
			border: 0;
			padding: 0;
			background-color: #FFFFFF;
			line-height: normal;
		}

		button::after {
			content: none;
		}
	}

	.cancle {
		border-top: 1rpx solid #f1f1f1;
		line-height: 90rpx;
		text-align: center;
	}

	.search-bg {
		background-color: #C92219 !important;
	}

	.white-bg {
		background-color: #fff !important;
	}

	.hide-bg {
		background-color: transparent !important;
	}
</style>
