<template name="smallVideos">
	<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getVideos">
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 70vh;width: 100vw;">
			<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无动态</view>
		</view>
		<view class="" v-else>
			<view class="wrap" style="padding: 0 10rpx;">
				<u-waterfall v-model="flowList" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<navigator url="/pages/videoDetail/videoDetail" class="demo-warter" v-for="(item, index) in leftList" :key="index" @tap="getVideoDetail(item)">
							<!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
							<u-lazy-load threshold="-100" :image="item.coverUrl" :index="index" error-img="/static/null05.png"></u-lazy-load>			
							<view class="demo-con">
								<view class="demo-title two-line">{{ item.content }}</view>
								<view class="flex justify-between demo-bottom">
									<view class="demo-pic">
										<u-lazy-load threshold="-100" border-radius="20" :image="item.headImgUrl" :index="index" height="40" error-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
									</view>
									<view class="demo-name flex-sub text-hidden">{{item.nickname}}</view>
									<view class="flex demo-icon">
										<text class="cuIcon-like"></text>
										<view class="num">{{item.praise}}</view>
									</view>
								</view>
							</view>		
						</navigator>
					</template>
					<template v-slot:right="{ rightList }">
						<navigator url="/pages/videoDetail/videoDetail" class="demo-warter" v-for="(item, index) in rightList" :key="index" @tap="getVideoDetail(item)">
							<u-lazy-load threshold="-100" :image="item.coverUrl" :index="index" error-img="/static/null05.png"></u-lazy-load>		
							<view class="demo-con">
								<view class="demo-title two-line">{{ item.content }}</view>
								<view class="flex justify-between demo-bottom">
									<view class="demo-pic">
										<u-lazy-load threshold="-100" border-radius="20" :image="item.headImgUrl" :index="index" height="40" error-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
									</view>
									<view class="demo-name flex-sub text-hidden">{{item.nickname}}</view>
									<view class="flex demo-icon">
										<text class="cuIcon-like"></text>
										<view class="num">{{item.praise}}</view>
									</view>
								</view>
							</view>
						</navigator>
					</template>
				</u-waterfall>
			</view>
			<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20"/>
		</view>	
	</scroll-view>
</template>

<script>
	export default {
		name: "smallVideos",
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				flowList: [],
				page: 0,
				stopLoad: false,
				loadStatus:'loadmore',
				isNull:false
			};
		},
		mounted() {
			this.getVideos()
		},
		methods: {
			// refreshVideo(){
			// 	this.page = 0
			// 	this.stopLoad = false
			// 	this.getVideos()
			// },
			getVideos() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				let sendData = {
					page: this.page,
					limit: 20
				}
				this.page++
				this.$u.post('/api/v1/live/short/list', sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data.list
					if (list.length == 0) {
						this.stopLoad = true
						this.loadStatus = "nomore"
						if (this.page == 1) {
							console.log("没有数据")
							this.isNull = true
						}
						return
					}
					if (list.length < 20) {
						this.loadStatus = "nomore"
					}
					list.map(item=>{
						item.headImgUrl = this.IMAGE_URL+item.headImgUrl
					})
					this.flowList.push(...list)
				});
			},
			getVideoDetail(obj){
				this.$store.commit("setVideoDetail",obj)
			}
		}

	}
</script>

<style lang="scss">
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 15rpx;
		margin: 20rpx 12rpx;
		background-color: #ffffff;
		position: relative;
		overflow: hidden;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 10rpx;
	}
	
	.demo-con{
		padding:15rpx;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-bottom: 15rpx;
		font-weight: 700;
		color: $u-main-color;
		word-break: break-all;
	}

	.demo-pic {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
		border-radius: 50%;
	}

	.demo-bottom {
		line-height: 40rpx;
		font-size: 26rpx;
		color: #888888;
	}

	.demo-icon .num {
		margin-left: 5rpx;
	}
</style>
