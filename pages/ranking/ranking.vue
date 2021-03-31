<template>
	<view>
		<u-navbar back-icon-size="48" back-icon-color="#ffffff" immersive :border-bottom="false" :background="{background:'transparent'}"></u-navbar>
		<view class="" style="position: relative;">
			<image :src="STATIC_URL+bgImage" style="width: 100%;" mode="widthFix"></image>
			<view class="hot-pic flex justify-center">
				<image :src="STATIC_URL+titleImage" style="width: 280rpx;" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view class="goods-box">
				<goods-list :goodsList="goodsList" :isHot="true" :hideShareBtn="roleLevel==500" @shareBtn='shareBtn'></goods-list>
			</view>
		</scroll-view>
		<!-- 分享弹出框 -->
		<u-popup v-model="isShow" mode="bottom" border-radius="15">
			<view class="share-box flex justify-between">
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" open-type="share" >
						<image class="share-icon" src="/static/mine/wx.png" mode="widthFix"></image>
						<view class="txt">微信好友</view>
					</button>
				</view>
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center"  @tap="copyLink">
						<image class="share-icon" src="/static/mine/wx.png" mode="widthFix"></image>
						<view class="txt">复制链接</view>
					</button>
				</view>
			<!-- 	<view class="flex-sub flex justify-center">
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
	export default {
		data() {
			return {
				STATIC_URL: this.STATIC_URL,
				goodsList: [],
				type: null,
				bgImage: "",
				titleImage: "",
				roleLevel:500,
				isShow:false,
				onShareData:null,
			};
		},
		onLoad(options) {
			if (uni.getStorageSync("userInfo").roleLevel) {
				this.roleLevel = uni.getStorageSync("userInfo").roleLevel
			}
			let requestUrl
			requestUrl = "/api/v1/goods/hot_sell/list"
			this.bgImage = "t-bg01.png"
			this.titleImage = "t-01.png"
		this.getList(requestUrl)
		},
		methods: {
			shareBtn(data){
				this.isShow = true
				this.onShareData = data
			},
			hideModel(){
				this.isShow = false
			},
			copyLink(){
				const that =  this
				let url = `${this.H5_BASE_URL}/#/goods/detail/${this.onShareData.id}/${this.$store.state.invitationNo}`
				uni.setClipboardData({
				    data: url,
				    success: function () {
				        console.log('success');
						that.hideModel()
				    }
				});
			},
			// 分享海报
			postShare() {

				uni.navigateTo({
					url:'/pages/poster/poster'
				})
			},
			getList(url) {
				this.$u.post(url).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goodsList = res.data.data
					for (let i = 0; i < this.goodsList.length; i++) {
						this.goodsList[i].totalSalesVolume = this.goodsList[i].salesVolume
						this.goodsList[i].price = this.goodsList[i].discountPrice
						this.goodsList[i].primePrice = this.goodsList[i].originalPrice
						this.goodsList[i].goodsId = this.goodsList[i].id
					}

				});
			}
		},
		watch: {
			isShow: function(val) {
				if (val) {
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return  {
					title: "我在买" + this.onShareData.name + ",快来看看吧！",
					path: '/pages/goodsDetail/goodsDetail?id=' + this.onShareData.id + "&type=share&invite=" + this.$store.state.invitationNo,
					imageUrl: this.IMAGE_URL + this.onShareData.url
				}
			} 
			
		},
	}
</script>

<style lang="scss" scoped>
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
	
	.hot-pic {
		position: absolute;
		width: 100%;
		top: 150rpx;
		left: 0;
		z-index: 10;
	}

	.scroll {
		position: fixed;
		width: 100%;
		top: 280rpx;
		bottom: 0;
	}

	.goods-box {
		z-index: 100;

	}
</style>
