<template>
	<view>
		<view class="isLoading bg-white flex flex-direction justify-center align-center" style="height: 100vh;width: 100vw;" v-if="showLoading">
			<image src="/static/loading-white.gif" mode="widthFix" style="width:500upx"></image>
		</view>
		<view class="" v-else>
			<view class="null flex flex-direction justify-center align-center" v-if="isNull">
				<image :src="STATIC_URL+'null01.png'" style="width: 300rpx;" mode="widthFix"></image>
				<view style="font-size: 24rpx;color: #DDDDDD;margin-top: 10rpx;">暂无内容</view>
			</view>
			<view class="" v-else>
				<dynamics :list="dynamics" :showGoodsLink="true"></dynamics>
				<u-loadmore :status="loadStatus" margin-bottom="40" margin-top="20" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				STATIC_URL:this.STATIC_URL,
				page: 0,
				dynamics: [],
				stopLoad:false,
				loadStatus: "loadmore", //触底加载状态,
				isNull:false,
				showLoading:true
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				if(this.stopLoad){
					return
				}
				this.loadStatus = "loading"
				let sendData = {
					userId: uni.getStorageSync("userInfo").id,
					page: this.page
				}
				this.page++
				this.$u.post("/api/v1/attention/list/moment_copy", sendData).then(res => {
					console.log(res.data);
					this.showLoading = false
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let list = res.data.data
					if(list.length==0){
						this.loadStatus = "nomore"
						this.stopLoad = true
						if (this.page == 1) {
							console.log("没有数据")
							this.isNull = true
						}
						return
					}
					//为了防止第一页商品数量不够时scrollview不能触底导致底部一直显示正在加载
					if (list.length < 5) {
						this.loadStatus = "nomore"
					}
					this.dynamics.push(...list)
				})
			}
		},
		onReachBottom(){
			this.getList()
		},
		onShareAppMessage(res) {
			console.log("自定义分享信息")
			console.log(res)
			let goodsMsg = res.target.dataset.goods
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "我在买" + goodsMsg.name + ",快来看看吧！",
				path: '/pages/goodsDetail/goodsDetail?id=' + goodsMsg.id + "&type=share",
				imageUrl: this.IMAGE_URL + goodsMsg.mainPhotoURL
			}
		}
	}
</script>

<style lang="scss">
.null{
	height: 100vh;
	width: 100vw;
}
</style>
