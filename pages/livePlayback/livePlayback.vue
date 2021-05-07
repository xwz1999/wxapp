<template>
	<view class="flex flex-direction container">
		<view class="top-box">
			<u-navbar :is-fixed="false" :is-back="false" background="transparent" :border-bottom="false"></u-navbar>
			<view class="flex justify-between text-white align-center top-con">
				<view class="flex align-center top-left round">
					<view class="avatar">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+videoDetail.headImgUrl" :index="index" height="70" border-radius="35"
						 :error-img="IMAGE_URL + '/null05.png'"  @click="toUserHomePage(videoDetail.userId,videoDetail.isFollow)"></u-lazy-load>
					</view>
					<view class="user-info">
						<view style="font-size: 26rpx;">{{videoDetail.nickname}}</view>
						<view style="font-size: 20rpx;">点赞数 {{videoDetail.praise}}</view>
					</view>
					<view class="btn round bg-red shadow" v-if="videoDetail.isFollow==0" @tap="addFollow">+关注</view>
				</view>
				<text class="cuIcon-close" style="font-size: 48rpx;" @tap="back"></text>
			</view>
		</view>
		<live-player v-if="isLive" class="video flex-sub" :src="videoDetail.playUrl" mode="RTC" autoplay/>
		<video v-else  class="video flex-sub" :src="videoDetail.playUrl" controls></video>
		<view class="flex justify-between align-end bottom">
			<image src="../../static/shop/more.png" style="width: 60rpx;" mode="widthFix"></image>
			<view class="" style="position: relative;" @tap="isShow = true">
				<image src="../../static/shop/pack.png" style="width: 90rpx;" mode="widthFix"></image>
				<view class="text-center goods-num">{{videoDetail.goodsLists.length}}</view>
			</view>
		</view>
		<u-popup v-model="isShow" mode="bottom" border-radius="20" height="60%">
			<view class="goods-container">
				<view class="item" v-for="(item,index) in videoDetail.goodsLists" :key="index">
					<view class="item-con flex justify-between">
						<view class="goods-pic">
							<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" height="200" border-radius="10" :error-img="IMAGE_URL + '/null05.png'"  @click="toGoodsDetail(item.id)"></u-lazy-load>
							<view class="no">{{index+1}}</view>
						</view>
						<view class="goods-con flex-sub flex flex-direction justify-between">
							<view class="">
								<view class="goods-name two-line">{{item.goodsName}}</view>
								<view class="goods-remark">{{item.description}}</view>
							</view>
							<view class="">
								<view class="flex justify-between">
									<view class="coupon text-white">
										<image src="../../static/index/tic.png" mode="heightFix"></image>
										<view class="coupon-price">{{item.coupon}}元券</view>
									</view>
									<view class="goods-store">剩余<text class="text-red">{{item.inventory}}</text>件</view>
								</view>
								<view class="right-bottom flex justify-between align-end">
									<view class="flex align-end" style="font-size: 24rpx;">
										<text class="text-orange">券后</text>
										<text class="text-red">￥</text>
										<text class="text-red" style="font-size: 36rpx;line-height: 36rpx;font-weight: 700;">85</text> 
										<text class="text-gray" style="text-decoration: line-through;margin-left: 10rpx;">￥125</text>
									</view>
									<view class="text-white bg-red round shadow buy" @tap="toGoodsDetail(item.id)">马上抢</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL:this.IMAGE_URL,
				id: 0,
				videoDetail: null,
				isShow:false,
				isLive:0, //是否是直播
			};
		},
		onHide() {
			console.log('21333333333333333')
		},
		onLoad(options) {
			console.log(options)
			if (options.id) {
				this.id = parseInt(options.id)
				this.isLive = parseInt(options.isLive)
				if(this.isLive){
					wx.enableAlertBeforeUnload({
					      message: "是否确认离开直播间？",
					      success: function (res) {
					        console.log("方法注册成功：", res);
					      },
					      fail: function (errMsg) {
					        console.log("方法注册失败：", errMsg);
					      },
					    });
				}
				this.getDetail()
			}
			
	
		},
		methods: {
			getDetail() {
				if(this.isLive){
					this.$u.post("/api/v1/live/live/live_info", {
						id: this.id
					}).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.videoDetail = res.data.data
					});
				}else{
					this.$u.post("/api/v1/live/live/video_info", {
						id: this.id
					}).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						this.videoDetail = res.data.data
					});
				}
				
				
			},
			back() {
				uni.navigateBack()
			},
			toUserHomePage(id,isFollow) {
				uni.navigateTo({
					url: "../userHomePage/userHomePage?userId=" + id+"&isFollow="+isFollow
				})
			},
			toGoodsDetail(id){
				uni.navigateTo({
					url:"../goodsDetail/goodsDetail?id="+id
				})
			},
			//添加关注
			addFollow() {
				this.$u.post('/api/v1/live/user/follow/add', {
					followUserId: this.videoDetail.userId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.$u.toast("关注成功");
					// this.videoDetail.isFollow==1
					this.$set(this.videoDetail,'isFollow', 1 )
				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #000000;
	}

	.container {
		position: fixed;
		height: 100vh;
		width: 100vw;
	}

	.top-box {
		position: fixed;
		width: 100%;
		top: 0;
		background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
		z-index: 100;

		.top-con {
			padding: 0 30rpx;

			.top-left {
				padding: 10rpx;
				overflow: hidden;
				background-color: rgba(0, 0, 0, 0.3);

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.user-info {
					margin: 0 15rpx;
					line-height: 35rpx;
				}

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.user-info {
					margin: 0 15rpx;
					line-height: 35rpx;
				}
			}

			.btn {
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 20rpx;
				text-align: center;
				font-size: 26rpx;
			}
		}
	}

	.video {
		width: 100%;
	}

	.bottom {
		padding: 0 30rpx 30rpx;
		height: 120rpx;
		.goods-num{
			position: absolute;width: 100%;
			bottom: 10rpx;
			color: #FFFFFF;
		}
	}
	.goods-container{
		padding: 30rpx 25rpx;
		.item{
			margin: 20rpx 0;
			.item-con{
				.goods-pic{
					width: 200rpx;
					height: 200rpx;
					margin-right: 15rpx;
					border-radius: 10rpx;
					overflow: hidden;
					position: relative;
					.no{
						position: absolute;
						left: 0;
						top: 0;
						line-height: 26rpx;
						font-size: 18rpx;
						color: #FFFFFF;
						text-align: center;
						width: 50rpx;
						background-color: rgba(0,0,0,0.3);
						border-top-left-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
					}
				}
				.goods-con{
					.goods-name{
						font-weight: 700;
						margin-bottom: 5rpx;
					}
					.goods-remark{
						color: #AAAAAA;
						font-size: 24rpx;
					}
					.coupon{
						position: relative;
						image{
							height: 35rpx;
							width: auto;
						}
						.coupon-price{
							position: absolute;
							line-height: 35rpx;
							top: 0;
							width: 100%;
							left: 0;
							font-size: 24rpx;
							text-align: center;
						}
					}
					.goods-store{
						line-height: 40rpx;
						font-size: 20rpx;
					}
				}
				.right-bottom{
					margin-top: 5rpx;
					.buy{
						padding: 0 20rpx;
					}
				}
			}
		}
	}
</style>
